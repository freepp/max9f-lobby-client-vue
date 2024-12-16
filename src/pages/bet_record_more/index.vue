<template>
    <Layout :header-title="data.title">
        <view class="fund-record-view">
            <BetDetail v-if="data.betDetail" :betDetail="data.betDetail" />
            <scroll-view
                class="scroll-list"
                scroll-y="true"
                @scrolltolower="loadmore"
            >
                <view
                    v-if="
                        data.recordData.length === 0 &&
                        data.moreStatus !== 'loading'
                    "
                >
                    <NoData class="nodata" :message="$t('KEY_COMMON_NODATA')" />
                </view>
                <view class="record-list">
                    <view
                        class="record-card"
                        v-for="(item, index) in data.recordData"
                        :key="index"
                    >
                        <view class="card-title">
                            <view>{{ item.appName }}</view>
                            <view class="date">
                                {{
                                    format(
                                        new Date(
                                            new Date(
                                                item.recDate
                                            ).toLocaleString()
                                        ),
                                        'dd/MM/yyyy HH:mm:ss'
                                    )
                                }}
                            </view>
                        </view>
                        <view class="card-detail">
                            <view class="detail-list">
                                <view class="list-items">
                                    <view>{{ item.bet }}</view>
                                    <view
                                        class="card-type"
                                        v-if="item.reward > item.bet"
                                    >
                                        {{ $t('KEY_RECORD_REWARD') }}
                                        {{ item.reward }}
                                    </view>
                                    <view class="card-type fail" v-else>
                                        {{ $t('KEY_RECORD_REWARD') }}
                                        {{ item.reward }}
                                    </view>
                                </view>
                                <view class="list-items" v-if="item.betBonus">
                                    <view>
                                        {{ item.betBonus }}
                                        {{ $t('KEY_PAY_BONUS') }}
                                    </view>
                                    <view
                                        class="card-type"
                                        v-if="item.winBonus > item.betBonus"
                                    >
                                        {{ $t('KEY_PAY_BONUS') }}
                                        {{ $t('KEY_RECORD_REWARD') }}
                                        {{ item.winBonus }}
                                    </view>
                                    <view class="card-type fail" v-else>
                                        {{ $t('KEY_PAY_BONUS') }}
                                        {{ $t('KEY_RECORD_REWARD') }}
                                        {{ item.winBonus }}
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <uni-load-more
                    v-if="data.moreStatus !== 'no-more'"
                    :status="data.moreStatus"
                    :contentText="{
                        contentdown: $t('KEY_COMMON_LOADMORE'),
                        contentrefresh: $t('KEY_COMMON_LOADING'),
                        contentnomore: $t('KEY_COMMON_NOMORE'),
                    }"
                />
            </scroll-view>
        </view>
    </Layout>
</template>

<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    import BetDetail from './BetDetail.vue'
    import NoData from '@/lib/components/NoData.vue'
    import { format } from 'date-fns'
    import { api as lobbyApi } from '@/NET/lobby'

    import _ from 'lodash'
    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Data {
        title: string
        moreStatus: string
        start: string
        end: string
        betDetail: any
        recordData: any
        pageIndex: number
        pageSize: number
        hasMore: boolean
        listParams: any
    }
    const data = reactive<Data>({
        title: $t('KEY_PAGETITLE_BETRECORD'),
        moreStatus: 'more',
        start: '',
        end: '',
        recordData: [],
        betDetail: null,
        pageIndex: 1,
        pageSize: 10,
        hasMore: true,
        listParams: {
            date: [],
        },
    })

    const getList = async () => {
        data.moreStatus = 'loading'

        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                startDate: data.start,
                endDate: data.end,
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
            },
            store.commonParams
        )
        let res = await lobbyApi.profile.betRecordsDetail(params)
        if (res.success) {
            data.betDetail = {
                totalBet: res.result.totalBet,
                totalRewardReturn: res.result.totalRewardReturn,
                year: format(new Date(data.start), 'yyyy'),
                date: format(new Date(data.start), 'MM/dd'),
            }
            setTimeout(() => {
                if (res.result.items.length < data.pageSize) {
                    data.hasMore = false
                    data.moreStatus = 'no-more'
                } else {
                    data.moreStatus = 'more'
                }
                data.recordData = [...data.recordData, ...res.result.items]
            }, 100)
        } else {
            ErrorHandler(res, 'betRecordsDetail')
        }
    }

    const reload = () => {
        data.pageIndex = 1
        data.recordData = []
        data.hasMore = true
        getList()
    }

    const loadmore = () => {
        if (data.hasMore) {
            data.pageIndex++
            getList()
        }
    }

    onLoad((options) => {
        data.start = options.start ? options.start : ''
        data.end = options.end ? options.end : ''
        initData()
    })

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    const initData = () => {
        if (store.userInfo) {
            getList()
        }
    }

    uni.setNavigationBarTitle({
        title: $t('KEY_PAGETITLE_ALLBETRECORD'),
    })
</script>

<style lang="scss">
    .fund-record-view {
    }

    .date-picker-view {
        @apply flex items-center justify-between z-20 relative;
        padding: 0 40rpx;
        background: rgba(238, 238, 238);
        box-shadow: 0px 9rpx 20rpx 0rpx rgba(0, 0, 0, 0.14);
        height: 100rpx;
    }
    .scroll-list {
        @apply absolute left-0 right-0 bottom-0;
        top: 150rpx;
    }

    .record-list {
        padding: 20rpx 40rpx;
    }

    .record-card {
        @apply bg-black-60 border-black rounded-7;
        margin-bottom: 20rpx;
        color: #454545;
        padding: 20rpx;
        .card-title {
            @apply flex justify-between items-center  text-white-80 border-black-80;
            // height: 50rpx;
            font-size: 30rpx;
            font-weight: bold;
            margin-bottom: 20rpx;
            .date {
                font-size: 21rpx;
                line-height: 21rpx;
                opacity: 0.8;
                font-weight: 400;
            }
        }
        .card-detail {
            @apply flex justify-between items-center;
        }
        .detail-list {
            @apply w-full text-white-60;
            font-size: 21rpx;
            opacity: 0.8;
            .list-items {
                @apply flex justify-between items-center;
                margin-bottom: 14rpx;
                .name {
                    margin-right: 30rpx;
                }
                &:last-child {
                    margin: 0;
                }
            }
        }
        .see-all {
            @apply flex justify-between items-center;
            height: 70rpx;
            border-top: 2rpx solid rgba(0, 0, 0, 0.35);
            font-size: 21rpx;
            color: #454545;
            line-height: 21rpx;
            opacity: 0.8;
            .icon {
                width: 32rpx;
                img {
                    @apply w-full;
                }
            }
        }
        .card-type {
            @apply text-green;
            font-size: 33rpx;
            font-weight: bold;
        }
        .fail {
            @apply text-red;
        }
    }
    .nodata {
        padding-top: 200rpx;
    }
</style>
