<template>
    <Layout :headerTitle="$t('KEY_AGENT_COMMISSION_DETAILS_TITLE')">
        <scroll-view
            class="commission-detail-view"
            :scroll-y="true"
            @scrolltolower="scrolltolower"
        >
            <view class="commission-detail-list">
                <no-data
                    class="no-data"
                    v-if="commissionDetailList.length === 0"
                    :message="$t('KEY_AGENT_NO_RECORDS')"
                ></no-data>
                <view class="detail-item" v-for="item in commissionDetailList">
                    <view class="item title">
                        <view
                            class="item-name"
                            @click="setClip(item.mobile || item.userName)"
                        >
                            <text class="item-account">
                                {{ item.mobile || item.userName }}
                            </text>
                            <image
                                class="copy-icon"
                                src="@/static/icon/copy.png"
                            ></image>
                        </view>
                        <view class="item-value">
                            {{ formatDate(query.startTime) }}
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-name">
                            {{ $t('KEY_AGENT_COMMISSION_TYPE') }}
                        </view>
                        <view class="item-value">
                            {{ getTypeNameByTypeValue(item.promoterType) }}
                        </view>
                    </view>
                    <view class="item">
                        <view class="item-name">
                            {{ $t('KEY_AGENT_COMMISSION_PERFORMANCE') }}
                        </view>
                        <view class="item-value">{{ item.perf }}</view>
                    </view>
                    <view class="item">
                        <view class="item-name">
                            {{ $t('KEY_AGENT_COMMISSION_COMMISSION') }}
                        </view>
                        <view class="item-value yellow">{{ item.comm }}</view>
                    </view>
                </view>
            </view>
        </scroll-view>
    </Layout>
</template>
<script lang="ts" setup>
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { format } from 'date-fns'
    import Layout from '@/lib/layout/Base.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as commonApi } from '@/NET/common'
    import { PromoteCommDetailDto } from '@/NET/lobby/data-contracts'
    import { onLoad } from '@dcloudio/uni-app'
    import { onMounted, ref, watch } from 'vue'
    import { typeList } from './typeList'
    import NoData from '@/lib/components/NoData.vue'
    import { i18n } from '@/common/i18nConfig'
    import { modal } from '@/lib/components/Modal'
    import { useUsersStore } from '@/store/userStore'
    import { ga } from '@/common/common'
    const store = useUsersStore()
    const { t: $t } = i18n.global
    let query: Record<string, string> = {}
    const setClip = (str: string) => {
        uni.setClipboardData({
            data: str,
            showToast: false,
            success: function () {
                modal({
                    width: '485rpx',
                    title: $t('KEY_PAY_COPYSUCCESS'),
                    showCancel: false,
                    showConfirm: false,
                    maskClosable: true,
                })
            },
        })
    }
    const formatDate = (dateStr): string => {
        return dateStr ? format(new Date(dateStr), 'dd/MM/yyyy') : ''
    }
    const getTypeNameByTypeValue = (value) => {
        return typeList.find((item) => item.value === value)?.name
    }
    const pager = {
        pageIndex: 0,
        pageSize: 10,
    }
    const loading = ref(false)
    const hasMore = ref(true)
    const commissionDetailList = ref<Array<PromoteCommDetailDto>>([])
    const scrolltolower = async () => {
        if (loading.value) {
            return
        }
        if (!hasMore.value) {
            return
        }
        loading.value = true
        await getCommissionDetail()
        loading.value = false
    }
    const getCommissionDetail = async () => {
        if (store.userInfo?.userMode !== 2) {
            return
        }
        // const res = await lobbyApi.promote.commissionDetail({
        //     startTime: query.startTime?.replaceAll('/', '-'),
        //     endTime: query.endTime?.replaceAll('/', '-'),
        //     promoterType: Number(query.promoterType),
        //     pageIndex: pager.pageIndex,
        //     pageSize: pager.pageSize,
        // })
        console.log("1111");
        const res = await commonApi.promote.promoteCommissionDetailCreate({
            startTime: query.startTime?.replaceAll('/', '-'),
            endTime: query.endTime?.replaceAll('/', '-'),
            promoterType: Number(query.promoterType),
            pageIndex: pager.pageIndex,
            pageSize: pager.pageSize,
        })
        if (res.success) {
            const total = res.result.total
            commissionDetailList.value = res.result.rows.concat(
                commissionDetailList.value
            )

            if (commissionDetailList.value.length >= total) {
                hasMore.value = false
            } else {
                pager.pageIndex++
            }
        } else {
            ErrorHandler(res, 'getCommissionDetail')
        }
    }
    onLoad((option) => {
        query = option
    })
    const initData = () => {
        getCommissionDetail()
    }
    watch(
        () => store.userInfo,
        () => {
            initData()
        }
    )
    onMounted(() => {
        
        uni.setNavigationBarTitle({
            title: $t('KEY_AGENT_COMMISSION_DETAILS_TITLE'),
        })
        initData()
    })
</script>
<style lang="scss">
    .yellow {
        color: #f2ac35 !important;
    }
    .commission-detail-view {
        height: 100%;
    }
    .commission-detail-list {
        width: 708rpx;
        margin: 0 auto;
        padding-top: 20rpx;
    }
    .detail-item {
        @apply bg-black-80 rounded-14 overflow-hidden;
        margin-top: 20rpx;
        &:first-child {
            margin: 0rpx;
        }
    }
    .item {
        @apply flex items-center justify-center box-border;
        height: 72rpx;
        border-bottom: 2rpx solid #475464;
        padding: 0 40rpx 0 20rpx;
        font-size: 24rpx;
        .item-name {
            @apply text-left flex flex-1 items-center overflow-hidden;
            color: #7590ab;
            .item-account {
                @apply inline-block overflow-ellipsis overflow-hidden whitespace-nowrap;
                max-width: calc(100% - 52rpx);
            }
        }
        .item-value {
            @apply flex-1 text-right flex items-center justify-end text-white-100;
        }
        .icon-right {
            height: 28rpx;
            margin-left: 20rpx;
        }
        .copy-icon {
            width: 28rpx;
            height: 33rpx;
            margin-left: 24rpx;
        }
        &.title {
            @apply rounded-14;
            border: none;
            background-color: #272727;
            .item-name,
            .item-value {
                @apply text-white-100;
            }
        }
        &:last-child {
            border: none;
        }
    }
    .no-data {
        padding-top: 100rpx;
    }
</style>
