<template>
    <Layout :headerTitle="$t('KEY_EMAIL_TITLE')">
        <view>
            <view class="tabs flex">
                <view
                    class="tab relative flex items-center justify-center flex-1"
                    :class="{ active: currentTab === 0 }"
                    @click="toggleTab(0)"
                >
                    <view
                        class="tab-text"
                        v-html="$t('KEY_EMAIL_TAB_SYSTEM')"
                    ></view>
                    <view
                        class="unread-count"
                        v-show="getTabUnreadCount(0) > 0"
                    >
                        <view
                            v-html="
                                getTabUnreadCount(0) > 99
                                    ? '99+'
                                    : getTabUnreadCount(0)
                            "
                        ></view>
                    </view>
                </view>
                <view
                    class="tab relative flex items-center justify-center flex-1"
                    :class="{ active: currentTab === 1 }"
                    @click="toggleTab(1)"
                >
                    <view
                        class="tab-text"
                        v-html="$t('KEY_EMAIL_TAB_LASTEST')"
                    ></view>
                    <view
                        class="unread-count"
                        v-show="getTabUnreadCount(1) > 0"
                    >
                        <view
                            v-html="
                                getTabUnreadCount(1) > 99
                                    ? '99+'
                                    : getTabUnreadCount(1)
                            "
                        ></view>
                    </view>
                </view>
                <view
                    class="tab relative flex items-center justify-center flex-1"
                    :class="{ active: currentTab === 2 }"
                    @click="toggleTab(2)"
                >
                    <view
                        class="tab-text"
                        v-html="$t('KEY_EMAIL_TAB_AWARD')"
                    ></view>
                    <view
                        class="unread-count"
                        v-show="getTabUnreadCount(2) > 0"
                    >
                        <view
                            v-html="
                                getTabUnreadCount(2) > 99
                                    ? '99+'
                                    : getTabUnreadCount(2)
                            "
                        ></view>
                    </view>
                </view>
            </view>
            <view class="loading" v-if="isLoading">
                <Loading />
            </view>
        </view>
        <view class="tabs-content">
            <view class="tab-content">
                <scroll-view
                    class="email-list"
                    :class="{ ' is-edit': isEdit && list?.length > 0 }"
                    :scroll-y="true"
                    @scrolltolower="onScollBottom"
                >
                    <view class="email-box">
                        <NoData
                            v-show="!isLoading && list?.length === 0"
                            class="no-data"
                            :message="$t('KEY_EMAIL_NO_DATA')"
                        ></NoData>
                        <view
                            class="email-item flex"
                            v-for="(item, index) in list"
                            :key="item.messageId"
                            @click="goDetail(item)"
                        >
                            <view class="selector">
                                <uni-data-checkbox
                                    multiple
                                    v-model="item.checked"
                                    class="checkbox"
                                    :localdata="[{ value: item.messageId }]"
                                ></uni-data-checkbox>
                            </view>
                            <view class="email-box flex">
                                <view class="email-logo">
                                    <img
                                        src="@/static/email/email.png"
                                        mode="widthFix"
                                        v-if="item.status === 0"
                                    />
                                    <view
                                        class="unread"
                                        v-if="item.status === 0"
                                    ></view>
                                    <img
                                        v-if="item.status === 1"
                                        src="@/static/email/email_read.png"
                                        mode="widthFix"
                                    />
                                </view>
                                <view class="email-info">
                                    <view class="title">{{ item.title }}</view>
                                    <view class="content">
                                        {{ formatDate(item.recDate) }}
                                    </view>
                                </view>
                                <view class="email-attachment">
                                    <!-- receiveStatus 未领取-->
                                    <img
                                        v-show="
                                            item.receiveStatus === 0 &&
                                            item.displayTag === 2
                                        "
                                        src="@/static/email/attachment.png"
                                    />
                                </view>
                                <view class="email-more">
                                    <img
                                        v-show="!isEdit"
                                        src="@/static/email/arrow_right.png"
                                    />
                                </view>
                            </view>
                        </view>
                    </view>
                    <view style="height: 20rpx"></view>
                </scroll-view>
            </view>
        </view>
        <view class="bar">
            <view
                v-show="isEdit"
                class="flex justify-between items-center edit-bar"
            >
                <view
                    class="select-all"
                    :class="{ disabled: list?.length === 0 }"
                    @click="selectAll"
                >
                    <view v-html="$t('KEY_EMAIL_BAR_SELECT_ALL')"></view>
                </view>
                <view
                    class="del"
                    :class="{ disabled: selectList?.length === 0 }"
                    @click="delSelection"
                    v-html="$t('KEY_EMAIL_BAR_DEL')"
                ></view>
                <view
                    class="cancel"
                    @click="cancel"
                    v-html="$t('KEY_EMAIL_BAR_CANCEL')"
                ></view>
            </view>
            <view
                v-show="!isEdit"
                class="flex justify-between normal-bar items-center"
            >
                <view
                    class="read-all"
                    :class="{ disabled: list?.length === 0 && !isLoading }"
                    @click="readAll"
                    v-html="$t('KEY_EMAIL_BAR_READ_ALL')"
                ></view>
                <view
                    class="normal-btn bg-primary"
                    :class="{
                        'normal-btn bg-primary disabled':
                            list?.length === 0 && !isLoading,
                    }"
                    @click="editBar"
                    v-html="$t('KEY_EMAIL_BAR_EDIT')"
                ></view>
            </view>
        </view>
    </Layout>
</template>

<script lang="ts" setup>
    import Loading from '@/lib/components/Loading.vue'
    import Layout from '@/lib/layout/Base.vue'
    // import { modal } from '@/lib/components/Modal/index'
    import NoData from '@/lib/components/NoData.vue'
    // import image from '@/static/icon/warning.png'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as commonApi } from '@/NET/common'
    import { format } from 'date-fns'

    const store = useUsersStore()
    const { t: $t } = i18n.global
    const isEdit = ref(false)
    const list = ref([])
    const tabCounts = ref([
        {
            displayTag: 0,
            count: 0,
        },
        {
            displayTag: 0,
            count: 0,
        },
        {
            displayTag: 0,
            count: 0,
        },
    ])
    let pageIndex = 1
    let isLoadDone = false
    const reset = () => {
        isEdit.value = false
        list.value = []
        isLoadDone = false
        pageIndex = 1
    }
    const getTabUnreadCount = (tabType) => {
        return tabCounts.value.filter((item) => item.displayTag === tabType)[0]
            ?.count
    }
    const formatDate = (dateStr): string => {
        return dateStr ? format(new Date(dateStr), 'dd/MM/yyyy HH:mm:ss') : ''
    }
    onMounted(() => {

    })
    const mergeCommonParams = (params) => {
        return Object.assign(
            {
                userId: store.userInfo?.userId,
            },
            store.commonParams,
            params
        )
    }

    const getEmailList = async (type) => {
        // return lobbyApi.message.getLatestMessage(
        //     mergeCommonParams({
        //         type,
        //         pageIndex: pageIndex,
        //     })
        // )
        return commonApi.email.emailGetLatestMessageCreate(
            mergeCommonParams({
                type,
                pageIndex: pageIndex,
            })
        )
    }

    const goDetail = (item) => {
        if (isEdit.value) {
            return
        }
        // 未读 就调用一下置为已读接口
        if (!(item.status === 1)) {
            commonApi.email.emailReadMessageCreate(
                mergeCommonParams({
                    ids: [item.messageId],
                })
            )
        }
        uni.navigateTo({
            url: `/pages/email/detail?messageId=${item.messageId}`,
        })
    }
    const selectAll = () => {
        list.value?.forEach((item) => {
            item.checked = [item.messageId]
        })
    }
    const unselectAll = () => {
        list.value?.forEach((item) => {
            item.checked = []
        })
    }
    const selectList = computed(() => {
        return list.value.filter(
            (item) => item.checked && item.checked.length > 0
        )
    })
    //1取消 判断有没有勾选 有勾选则清除  没有勾选则返回初始状态
    const cancel = () => {
        if (selectList.value && selectList.value.length > 0) {
            unselectAll()
        } else {
            isEdit.value = false
        }
    }
    const readAll = async () => {
        const ids = list.value.map((item) => item.messageId)
        //.join(seperator)
        if (ids && ids.length > 0) {
            const res = await commonApi.email.emailReadMessageCreate(
                mergeCommonParams({
                    ids,
                })
            )
            if (!res.success) {
                ErrorHandler(res, 'readMessage')
            }
            toggleTab(currentTab.value)
        }
    }
    const editBar = () => {
        if (list.value && list.value.length === 0) {
            return
        }
        unselectAll()
        isEdit.value = true
    }
    type tabKeys = 0 | 1 | 2
    const isLoading = ref(false)

    const currentTab = ref<tabKeys>(0)
    const getList = async (tabKey: tabKeys) => {
        const result = (await getEmailList(tabKey)).result
        const respList = result.messages
        tabCounts.value = result.maps as any
        if (respList.length < 20) {
            isLoadDone = true
        }
        if (currentTab.value === tabKey) {
            list.value = list.value.concat(respList)
        } else {
            list.value = respList
        }
        currentTab.value = tabKey
        console.log('list.value', list.value)
        isLoading.value = false
    }
    const hasUnreceiveAward = (deleteList: Array<any>) => {
        return deleteList.some((item) => {
            return item.receiveStatus === 0 && item.displayTag === 2
        })
    }
    const delSelection = async () => {
        const deleteList = list.value.filter(
            (item) => item.checked && item.checked.length > 0
        )
        const hasUnreceive = hasUnreceiveAward(deleteList)
        if (hasUnreceive) {
            modal({
                width: 485,
                type: 'warning',
                title: $t('KEY_EMAIL_MODAL_DEL_CONFIRM'),
                content: $t('KEY_EMAIL_MODAL_DEL_FORBID'),
                confirmText: $t('KEY_COMMON_OK'),
                cancelText: $t('KEY_COMMON_CANCEL'),
            })
            return
        }
        if (deleteList.length === 0) {
            return
        }
        const ids = deleteList.map((item) => item.messageId)
        // 删除api
        if (ids && ids.length > 0) {
            const res = await commonApi.email.emailDeleteMessageCreate(
                mergeCommonParams({
                    ids,
                })
            )
            if (!res.success) {
                ErrorHandler(res, 'deleteMessage')
                return
            }
            toggleTab(currentTab.value)
        }
    }
    const toggleTab = async (tabKey: tabKeys) => {
        reset()
        isLoading.value = true
        if (store.userInfo?.userMode === 2) {
            getList(tabKey)
        }
    }
    const onScollBottom = () => {
        if (isLoadDone) {
            return
        }
        console.log('onScollBottom')
        pageIndex++
        isLoading.value = true
        getList(currentTab.value)
    }
    watch(
        () => store.userInfo,
        () => {
            toggleTab(0)
        }
    )
    onShow(() => {
        toggleTab(currentTab.value)
    })
    uni.setNavigationBarTitle({
        title: $t('KEY_EMAIL_TITLE'),
    })
    // toggleTab(0)
</script>

<style lang="scss">
    $barHeight: 117rpx;
    ::v-deep
        .uni-data-checklist
        .checklist-group
        .checklist-box
        .checkbox__inner {
        border-radius: 50% !important;
        background: transparent !important;
        border: 4rpx solid #fff !important;
    }
    ::v-deep
        .uni-data-checklist
        .checklist-group
        .checklist-box
        .checkbox__inner
        .checkbox__inner-icon {
        @apply bg-primary;
        width: 18rpx;
        height: 18rpx;
        border: none;
        border-radius: 50%;
        top: 50%;
        left: 50%;
    }
    ::v-deep
        .uni-data-checklist
        .checklist-group
        .checklist-box.is--default.is-checked
        .checkbox__inner
        .checkbox__inner-icon {
        transform: translate(-50%, -50%);
    }
    .tabs {
        @apply font-bold text-center bg-black-80 border-black-80 text-white-80;
        height: 99rpx;
        border-bottom-width: 2rpx;
        border-bottom-style: solid;
        .tab {
            font-size: 28rpx;
            &.active {
                @apply text-white-100;
            }
            .tab-text {
                @apply relative flex items-center justify-center h-full w-min;
            }
            &.active .tab-text::after {
                @apply absolute bg-primary;
                bottom: 3rpx;
                left: 50%;
                transform: translate3d(-50%, 0, 0);
                content: '';
                width: 103rpx;
                height: 7rpx;
                border-radius: 3rpx;
            }
            .unread-count {
                @apply bg-primary text-white-100;
                min-width: 30rpx;
                max-width: 45rpx;
                height: 30rpx;
                line-height: 30rpx;
                text-align: center;
                font-size: 30rpx;
                margin-top: -17px;
                border-radius: 15rpx 15rpx 15rpx 3rpx;
                // position: absolute;
                // left: 44rpx;
                // top: 0rpx;
                view {
                    letter-spacing: -1px;
                    transform: scale(0.66);
                    transform-origin: center;
                }
            }
        }
    }
    .tabs-content {
        height: calc(100% - 99rpx - $barHeight);
        overflow-y: auto;
        overflow-x: hidden;
        .tab-content {
            height: 100%;
        }
    }
    .email-list {
        height: 100%;
        padding-top: 1rpx;
        .no-data {
            margin-top: 70rpx;
        }
        .email-box {
            padding-top: 1px;
        }
        .email-item {
            margin-top: 19rpx;
            .selector {
                width: 8rpx;
                padding-top: 42rpx;
                .checkbox {
                    display: none;
                }
            }
            .email-box {
                @apply bg-black-80 rounded-7;
                margin-left: 32rpx;
                width: 668rpx;
                height: 122rpx;
                .email-logo {
                    @apply relative;
                    width: 60rpx;
                    height: 100%;
                    margin: 0rpx 31rpx 0rpx 30rpx;
                    padding-top: 18rpx;
                    box-sizing: border-box;
                    img {
                        width: 60rpx;
                    }
                    .unread {
                        @apply bg-primary;
                        width: 15rpx;
                        height: 15rpx;
                        border-radius: 50%;
                        position: absolute;
                        top: 28rpx;
                        left: 52rpx;
                    }
                }
                .email-info {
                    @apply flex-1;
                    .title {
                        @apply font-bold overflow-hidden whitespace-nowrap overflow-ellipsis;
                        width: 390rpx;
                        font-size: 28rpx;
                        color: var(--main-color);
                        line-height: 30rpx;
                        padding-top: 27rpx;
                    }
                    .content {
                        @apply flex-1 text-white-60;
                        font-size: 21rpx;
                        margin-top: 18rpx;
                        font-weight: 400;
                        line-height: 21rpx;
                    }
                }
                .email-attachment {
                    @apply flex items-center;
                    width: 84rpx;
                    img {
                        width: 35rpx;
                        height: 32rpx;
                    }
                }
                .email-attachment {
                    @apply flex items-center;
                    width: 84rpx;
                    img {
                        width: 35rpx;
                        height: 32rpx;
                    }
                }
                .email-more {
                    @apply flex items-center;
                    width: 55rpx;
                    image,
                    img {
                        width: 17rpx;
                    }
                }
            }
        }
        &.is-edit {
            width: 786rpx;
            .selector {
                width: 32rpx;
                margin-left: 34rpx;
                .checkbox {
                    display: block;
                }
            }
        }
    }
    .bar {
        @apply fixed flex left-0 bottom-0 w-full bg-black-80 border-black-80;
        height: $barHeight;
        padding: 0px 40rpx;
        box-sizing: border-box;
        border-top-width: 2rpx;
        border-top-style: solid;
        @media (width > 960px) {
          position: absolute;
        }
        > view {
            width: 100%;
            > view {
                @apply text-center font-bold;
                height: 82rpx;
                // line-height: 82rpx;
                border-radius: 14rpx;
                font-size: 33rpx;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        .edit-bar {
            > view {
                width: 218rpx;
                margin: 0px 16rpx;
            }
            .select-all {
                @apply box-border select-none flex justify-center items-center bg-info;
                color: #181818;
                font-size: 25rpx;
                background: #d1d1d9;
                &.disabled {
                    background: #49494c;
                }
                view {
                    line-height: 26rpx;
                }
            }
            .del {
                color: #181818;
                background: #d1d1d9;
                &.disabled {
                    background: #49494c;
                }
            }
            .cancel {
                @apply bg-primary;
                color: #ffffff;
            }
        }
        .normal-bar {
            > view {
                width: 326rpx;
            }
            .read-all {
                color: #181818;
                background: #d1d1d9;
                &.disabled {
                    background: #49494c;
                }
            }
            .edit {
                @apply bg-primary;
                color: #ffffff;
            }
        }
    }

    @media (width > 960px) {
        .bar {
            width: 375px;
        }
    }
</style>
