<template>
    <view class="search-modal"></view>
    <MaskModal ref="RefModal" @maskClick="maskClick"></MaskModal>
    <SlideTransition>
        <view class="search-view" @click.stop="() => {}" v-show="data.isShow">
            <view class="search-input">
                <input
                    type="text"
                    v-model="data.searchValue"
                    @input="inputChange"
                />
                <view class="search-icon">
                    <img src="@/static/icon/search_white.png" alt="" />
                </view>
            </view>
            <view class="category-scroll">
                <view
                    class="search-category"
                    v-for="(item, index) in data.categoryData"
                    :key="index"
                >
                    <view class="category-title">{{ item.kcName }}</view>
                    <view class="category-view">
                        <view
                            class="category-btn bg-theme-80"
                            :class="{ choosed: items.choosed }"
                            v-for="(items, indexs) in item.keywords"
                            :key="indexs"
                            @click="() => categoryClick(items)"
                        >
                            {{ items.title }}
                            <view class="choosed-icon" v-show="items.choosed">
                                <img
                                    src="@/static/icon/checked_float.png"
                                    alt=""
                                />
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <view class="search-footer" v-if="data.searchValue">
                <view class="btn bg-info" @click="() => changeIsShow(false)">
                    {{ $t('KEY_RECORD_BACK') }}
                </view>
                <view class="btn search-btn bg-primary" @click="search">
                    {{ $t('KEY_INDEX_SEARCH') }}
                </view>
            </view>
            <view class="search-footer" v-else>
                <view class="btn bg-info" @click="() => changeIsShow(false)">
                    {{ $t('KEY_RECORD_BACK') }}
                </view>
                <view class="btn search-btn btn-disabled bg-primary">
                    {{ $t('KEY_INDEX_SEARCH') }}
                </view>
            </view>
        </view>
    </SlideTransition>
</template>

<script lang="ts" setup>
    import { reactive, ref, onMounted, watch, nextTick } from 'vue'
    import MaskModal from '@/lib/components/MaskModal/index.vue'
    import SlideTransition from '@/lib/components/Transition/SlideTransition.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { onHide } from '@dcloudio/uni-app'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    const store = useUsersStore()
    interface Data {
        isShow: boolean
        searchValue: string
        chooseItem: any
        categoryData: any
    }
    const data = reactive<Data>({
        isShow: false,
        searchValue: '',
        chooseItem: null,
        categoryData: [],
    })
    const RefModal = ref()

    const getSearchKey = async () => {
        let params = Object.assign(store.commonParams, {
            userId: store.userInfo.userId,
        })
        let res = await lobbyApi.home.keywords(params)
        if (res.success) {
            data.categoryData = res.result
        } else {
            ErrorHandler(res, 'getSearchKey')
        }
    }
    const categoryClick = (item) => {
        if (item.choosed) {
            item.choosed = false
            clear()
            return
        }
        initData()
        item.choosed = true
        data.searchValue = item.title
        data.chooseItem = item
    }

    const clear = () => {
        data.searchValue = ''
        data.chooseItem = null
        initData()
    }

    const initData = () => {
        data.categoryData.forEach((item) => {
            item.keywords.forEach((items) => {
                items.choosed = false
            })
        })
    }

    const search = () => {
        let pageType = 4
        let condition = data.searchValue
        let headerTitle = data.searchValue
        if (data.chooseItem) {
            pageType = 2
            condition = data.chooseItem.keywordId
            headerTitle = data.chooseItem.title
        }
        let localPath = getCurrentPages()
        let localRoute = localPath[localPath.length - 1].route
        if (localRoute === 'pages/gamelist/index') {
            uni.reLaunch({
                url: `/pages/gamelist/index?pageType=${pageType}&condition=${condition}&headerTitle=${headerTitle}`,
            })
        } else {
            uni.navigateTo({
                url: `/pages/gamelist/index?pageType=${pageType}&condition=${condition}&headerTitle=${headerTitle}`,
            })
        }

        changeIsShow(false)
    }
    const maskClick = () => {
        changeIsShow(false)
    }

    const changeIsShow = (isShow: boolean) => {
        RefModal.value.changeModal(isShow)
        data.isShow = isShow
    }

    const inputChange = () => {
        data.chooseItem = null
        initData()
    }

    watch(
        () => store.userInfo,
        () => {
            initKey()
        }
    )

    const initKey = () => {
        if (store.userInfo) {
            getSearchKey()
        }
    }

    onMounted(() => {
        initKey()
    })

    onHide(() => {
        nextTick(() => {
            changeIsShow(false)
        })
    })

    defineExpose({
        changeIsShow,
    })
</script>

<style lang="scss">
    .modal-view {
        @apply absolute left-0 right-0 bottom-0 top-0 z-30;
    }
    .search-view {
        @apply relative z-30;
        background: var(--UI-BG);
    }

    .search-input {
        padding: 28rpx;
        input {
            height: 72rpx;
            background: #272727;
            border-radius: 14rpx;
            text-align: center;
            font-size: 28rpx;
            padding: 0 90rpx;
            &:focus {
                border-bottom: 2rpx solid #ffffff;
            }
        }
    }

    .search-icon {
        @apply absolute;
        width: 42rpx;
        top: 44rpx;
        right: 54rpx;
        img {
            @apply w-full;
        }
    }
    .category-scroll {
        @apply overflow-y-auto;
        height: 650rpx;
        margin-bottom: 100rpx;
    }
    .search-category {
        padding: 0 18rpx 0 28rpx;
        margin-bottom: 35rpx;
        color: rgba(255, 255, 255, 0.2);
        .category-title {
            font-size: 28rpx;
            margin: 8rpx 0;
        }

        .category-view {
            @apply flex flex-wrap;
            .category-btn {
                @apply flex justify-center items-center box-border;
                width: 220rpx;
                height: 72rpx;
                margin-bottom: 15rpx;
                border-radius: 8rpx;
                color: #dee3e0;
                font-size: 25rpx;
                margin-right: 14rpx;
                background: #000;
                border: 2rpx solid #5d5d5e;
                position: relative;
                .choosed-icon {
                    @apply absolute right-0 bottom-0;
                    width: 25rpx;
                    height: 25rpx;
                    img {
                        @apply w-full h-full;
                    }
                }
            }
            .choosed {
                border-color: var(--primary-color);
            }
        }
    }
    .search-footer {
        @apply flex justify-between items-center;
        .btn {
            @apply flex-1 flex justify-center items-center;
            height: 74rpx;
            font-size: 28rpx;
            color: #181818;
        }

        .btn-disabled {
            opacity: 0.3;
        }
        .search-btn {
            color: #ffffff;
        }
    }
</style>
