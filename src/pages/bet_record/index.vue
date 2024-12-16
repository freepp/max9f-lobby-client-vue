<template>
    <Layout :header-title="data.title">
        <view class="fund-record-view">
            <BetDetail :betDetail="data.betDetail" />
            <view class="date-picker-view">
                <DateTab @dateTabChange="dateTabChange" />
                <view>
                    <DatePicker @datePickerChange="datePickerChange" :min="minDate" :max="maxDate" />
                </view>
            </view>
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
                        <view class="card-detail">
                            <view class="detail-list">
                                <view
                                    class="list-items"
                                    style="margin-bottom: 30rpx"
                                >
                                    <view class="name">
                                        {{ $t('KEY_RECORD_BET') }}
                                    </view>
                                    <view>
                                        {{ item.date }}
                                    </view>
                                </view>
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
                        <view
                            class="see-all"
                            @click="() => seeAll(getLocalDayTime(item.date))"
                        >
                            <view>{{ $t('KEY_BETRECORDSEEALL') }}</view>
                            <view class="icon">
                                <img
                                    src="@/static/icon/arrow_right_white.png"
                                    alt=""
                                />
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
    import DatePicker from '@/lib/components/DatePicker.vue'
    import DateTab from './DateTab.vue'
    import NoData from '@/lib/components/NoData.vue'
    import { format } from 'date-fns'
    import { api as lobbyApi } from '@/NET/lobby'
    import moment from 'moment'

    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Data {
        title: string
        moreStatus: string
        betDetail: any
        pageType: number
        recordData: any
        pageIndex: number
        pageSize: number
        hasMore: boolean
        listParams: any
        dateParam: number
        dateData: any
        startDate: string
        endDate: string
    }
    const data = reactive<Data>({
        title: $t('KEY_PAGETITLE_BETRECORD'),
        moreStatus: 'more',
        pageType: 0,
        betDetail: {},
        recordData: [],
        dateParam: 0,
        pageIndex: 1,
        pageSize: 10,
        hasMore: true,
        listParams: {
            date: [],
        },
        dateData: {},
        startDate: '',
        endDate: '',
    })

    const minDate = moment().subtract(2, 'days').format('YYYY-MM-DD')
    const maxDate = moment().startOf('day').format('YYYY-MM-DD')

    const getList = async () => {
        data.moreStatus = 'loading'

        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
                startDate: data.startDate,
                endDate: data.endDate,
            },
            store.commonParams
        )
        let res = await lobbyApi.profile.betRecordsDay(params, {cancelToken: 'lobbyApi.profile.betRecordsDay'})
        if (res.success) {
            data.betDetail = {
                totalBet: res.result.totalBet,
                totalRewardReturn: res.result.totalRewardReturn,
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
            ErrorHandler(res, 'getBetRecordsDay')
        }
    }

    const reload = () => {
        data.pageIndex = 1
        data.recordData = []
        data.hasMore = true
        getList()
    }

    const dateTabChange = (tabdata) => {
        data.dateParam = tabdata.type
        switch (data.dateParam) {
            case 0:
                data.startDate = data.dateData.thisWeek.start
                data.endDate = data.dateData.thisWeek.end
                break
            case 1:
                data.startDate = data.dateData.lastWeek.start
                data.endDate = data.dateData.lastWeek.end
                break
            case 2:
                data.startDate = data.dateData.thisMonth.start
                data.endDate = data.dateData.thisMonth.end
                break
            default:
        }
        reload()
    }

    const datePickerChange = (pickerdata) => {
        // console.log(pickerdata)
        // reload()

        let chooseDate = getLocalDayTime(pickerdata)
        seeAll(chooseDate)
    }

    const loadmore = () => {
        if (data.hasMore) {
            data.pageIndex++
            getList()
        }
    }

    const seeAll = (item) => {
        uni.navigateTo({
            url: `/pages/bet_record_more/index?start=${item.start}&end=${item.end}`,
        })
    }

    const getUTCWeekAndMonthTime = () => {
        let currentDate = new Date()
        let currentDay = currentDate.getDay()

        // 获取本周开始时间
        let startOfWeek = new Date(currentDate)
        startOfWeek.setDate(
            currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)
        )
        startOfWeek.setHours(0, 0, 0, 0)

        // 获取本周结束时间
        let endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 6)
        endOfWeek.setHours(23, 59, 59, 999)

        // 获取上周开始时间
        let startOfLastWeek = new Date(currentDate)
        startOfLastWeek.setDate(currentDate.getDate() - currentDay - 6)
        startOfLastWeek.setHours(0, 0, 0, 0)

        // 获取上周结束时间
        let endOfLastWeek = new Date(startOfLastWeek)
        endOfLastWeek.setDate(startOfLastWeek.getDate() + 6)
        endOfLastWeek.setHours(23, 59, 59, 999)

        // 获取本月的开始时间
        let startOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        )
        startOfMonth.setHours(0, 0, 0, 0)

        //获取本月的结束时间
        let nextMonth =
            currentDate.getMonth() === 11
                ? new Date(currentDate.getFullYear() + 1, 0, 1)
                : new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth() + 1,
                      1
                  )

        let endOfMonth = new Date(nextMonth.getTime() - 1)

        data.dateData = {
            thisWeek: {
                start: startOfWeek.toISOString(),
                end: endOfWeek.toISOString(),
            },
            lastWeek: {
                start: startOfLastWeek.toISOString(),
                end: endOfLastWeek.toISOString(),
            },
            thisMonth: {
                start: startOfMonth.toISOString(),
                end: endOfMonth.toISOString(),
            },
        }
    }
    getUTCWeekAndMonthTime()
    console.log(data.dateData)
    data.startDate = data.dateData.thisWeek.start
    data.endDate = data.dateData.thisWeek.end

    const getLocalDayTime = (date) => {
        let startOfDay = new Date(date)
        startOfDay.setHours(0, 0, 0, 0)

        let endOfDay = new Date(date)
        endOfDay.setHours(23, 59, 59, 999)

        return {
            start: startOfDay.toISOString(),
            end: endOfDay.toISOString(),
        }
    }

    onLoad((options) => {
        data.pageType = options.page_type ? Number(options.page_type) : 0
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
        title: $t('KEY_PAGETITLE_BETRECORD'),
    })

    onMounted(() => {
        initData()
    })
</script>

<style lang="scss">
    .fund-record-view {
    }

    .date-picker-view {
        @apply flex items-center justify-between z-20 relative bg-black-80 border-black-80;
        padding: 0 40rpx;
        box-shadow: 0px 9rpx 20rpx 0rpx rgba(0, 0, 0, 0.14);
        height: 100rpx;
        border-bottom-width: 2rpx;
        border-bottom-style: solid;
    }
    .scroll-list {
        @apply absolute left-0 right-0 bottom-0;
        top: 250rpx;
    }

    .record-list {
        padding: 20rpx 40rpx;
    }

    .record-card {
        @apply bg-black-60 border-black rounded-7;
        margin-bottom: 20rpx;
        color: #454545;
        padding: 20rpx;
        padding-bottom: 0;
        .card-detail {
            @apply flex justify-between items-center w-full;
        }
        .detail-list {
            @apply w-full text-white-60;
            font-size: 21rpx;
            line-height: 21rpx;
            opacity: 0.8;
            .list-items {
                @apply flex justify-between items-center text-white-60;
                margin-bottom: 20rpx;
                .name {
                    @apply text-white-80;
                    font-size: 28rpx;
                    font-weight: bold;
                }
            }
        }
        .see-all {
            @apply flex justify-between items-center text-black-60;
            height: 70rpx;
            border-top: 2rpx solid rgba(0, 0, 0, 0.5);
            font-size: 21rpx;
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
