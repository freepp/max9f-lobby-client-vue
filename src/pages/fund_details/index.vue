<template>
    <Layout :header-title="data.title">
        <view class="fund-record-view">
            <RecordCheckbox
                @checkboxChange="checkboxChange"
                :pageType="data.pageType"
            />
            <view class="date-picker-view">
                <DateTab
                    :dateParam="data.dateParam"
                    @dateTabChange="dateTabChange"
                />
                <view class="datepicker-view">
                    <view
                        class="datePick absolute"
                        v-show="data.searchDate"
                        @click="openPicker"
                    >
                        {{ data.searchDate }}
                    </view>
                    <DatePicker
                        ref="RefDatePicker"
                        @datePickerChange="datePickerChange"
                    />
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
                <view
                    class="record-list"
                    v-else-if="Number(data.pageType) === 1"
                >
                    <view
                        class="record-card"
                        v-for="(item, index) in data.recordData"
                        :key="index"
                    >
                        <view class="card-title">
                            <view>
                                {{ $t('KEY_TABBAR_DEPOSIT') }}
                            </view>
                            <view class="text-white-100">
                                <text
                                    v-if="store.baseConfig.countryId === 'BRA'"
                                >
                                    R$
                                </text>
                                <text v-else>$</text>
                                {{ item.amount }}
                            </view>
                        </view>
                        <!-- <view class="bonus-tips">
                            <view>
                                {{ $t('KEY_FUNDDETAILS_ROLLOVER') }}:
                                {{ item.flowMultip }}x
                            </view>
                            <view>
                                {{ item.completedFlowMoney }}/{{
                                    item.requireFlowMoney
                                }}
                            </view>
                        </view> -->
                        <view class="bonus-tips">
                            <view class="list-items flex">
                                {{ $t('KEY_RECORD_ORDERNO') }}:

                                {{ item.orderId }}
                            </view>
                        </view>
                        <view class="card-detail">
                            <view class="detail-list">
                                <view class="list-items flex items-center">
                                    <view class="name">
                                        {{ $t('KEY_PAY_CHANNEL') }}:
                                    </view>
                                    <view>{{ item.channelName }}</view>
                                </view>
                                <view class="list-items">
                                    {{
                                        format(
                                            new Date(
                                                new Date(
                                                    item.applyTime
                                                        ? item.applyTime
                                                        : item.recDate
                                                ).toLocaleString()
                                            ),
                                            'dd/MM/yyyy HH:mm:ss'
                                        )
                                    }}
                                </view>
                            </view>
                            <view class="card-type" v-if="item.status == 2">
                                {{ $t('KEY_RECORD_SUCCESS') }}
                            </view>
                            <view
                                class="card-type"
                                v-else-if="item.status == 1"
                            >
                                {{ $t('KEY_RECORD_PROCESS') }}
                            </view>
                            <view class="card-type fail" v-else>
                                {{ $t('KEY_RECORD_FAILED') }}
                            </view>
                        </view>
                    </view>
                </view>
                <view
                    class="record-list"
                    v-else-if="Number(data.pageType) === 2"
                >
                    <view
                        class="record-card"
                        v-for="(item, index) in data.recordData"
                        :key="index"
                    >
                        <view class="card-title">
                            <view>
                                {{ $t('KEY_TABBAR_WITHDRAW') }}
                            </view>
                            <view>
                                <text
                                    v-if="store.baseConfig.countryId === 'BRA'"
                                >
                                    R$
                                </text>
                                <text v-else>$</text>
                                {{ item.amount }}
                            </view>
                        </view>
                        <view class="bonus-tips">
                            <view class="list-items flex">
                                {{ $t('KEY_RECORD_ORDERNO') }}:

                                {{ item.orderId }}
                            </view>
                        </view>
                        <view class="card-detail">
                            <view class="detail-list">
                                <view class="list-items flex">
                                    <view class="name">
                                        {{ $t('KEY_PAY_CHANNEL') }}:
                                    </view>
                                    <view>{{ item.channelName }}</view>
                                </view>
                                <view class="list-items">
                                    {{
                                        format(
                                            new Date(
                                                item.applyTime
                                                    ? item.applyTime
                                                    : item.recDate
                                            ),
                                            'dd/MM/yyyy HH:mm:ss'
                                        )
                                    }}
                                </view>
                            </view>
                            <view class="card-type" v-if="item.status == 2">
                                {{ $t('KEY_RECORD_SUCCESS') }}
                            </view>
                            <view
                                class="card-type"
                                v-else-if="item.status == 1"
                            >
                                {{ $t('KEY_RECORD_PROCESS') }}
                            </view>
                            <view
                                class="card-type"
                                v-else-if="item.status == 100"
                            >
                                {{ $t('KEY_RECORD_REVIEW') }}
                            </view>
                            <view class="card-type fail" v-else>
                                {{ $t('KEY_RECORD_FAILED') }}
                            </view>
                        </view>
                    </view>
                </view>
                <view
                    class="record-list"
                    v-else-if="Number(data.pageType) === 3"
                >
                    <view
                        class="record-card pb-0"
                        v-for="(item, index) in data.recordData"
                        :key="index"
                    >
                        <view class="card-title">
                            <view>
                                {{
                                    item.isBonus === 1
                                        ? $t('KEY_FUNDDETAILS_BONUS')
                                        : $t('KEY_FUNDDETAILS_CASH')
                                }}
                            </view>
                            <view>
                                <text
                                    v-if="store.baseConfig.countryId === 'BRA'"
                                >
                                    R$
                                </text>
                                <text v-else>$</text>
                                {{ item.amount }}
                            </view>
                        </view>
                        <!-- <view class="bonus-tips">
                            <view>
                                {{ $t('KEY_FUNDDETAILS_ROLLOVER') }}:
                                {{ item.flowMultip }}x
                            </view>
                            <view>
                                {{ item.completedFlowMoney }}/{{
                                    item.requireFlowMoney
                                }}
                            </view>
                        </view> -->
                        <view class="bonus-tips">
                            <view class="list-items flex">
                                {{ $t('KEY_RECORD_ORDERNO') }}:

                                {{ item.orderId }}
                            </view>
                        </view>
                        <view class="card-detail">
                            <view class="detail-list">
                                <view class="list-items" style="margin: 0">
                                    {{
                                        format(
                                            new Date(
                                                item.applyTime
                                                    ? item.applyTime
                                                    : item.recDate
                                            ),
                                            'dd/MM/yyyy HH:mm:ss'
                                        )
                                    }}
                                </view>
                            </view>
                            <view class="card-type" v-if="item.status == 2">
                                {{ $t('KEY_RECORD_SUCCESS') }}
                            </view>
                            <view
                                class="card-type"
                                v-else-if="item.status == 1"
                            >
                                {{ $t('KEY_RECORD_PROCESS') }}
                            </view>
                            <view class="card-type gray" v-else>
                                {{ $t('KEY_FUNDDETAIL_END') }}
                            </view>
                            <!-- <view class="card-type" v-else>Ongoing</view> -->
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
                    @click="loadmore"
                />
            </scroll-view>
        </view>
    </Layout>
</template>

<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    import RecordCheckbox from './RecordCheckbox.vue'
    import DatePicker from '@/lib/components/DatePicker.vue'
    import DateTab from './DateTab.vue'
    import NoData from '@/lib/components/NoData.vue'
    import { format } from 'date-fns'
    import { api as lobbyApi } from '@/NET/lobby'

    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Data {
        title: string
        moreStatus: string
        pageType: number
        recordData: any
        pageIndex: number
        pageSize: number
        hasMore: boolean
        listParams: any
        dateParam: number
        searchDate: string
        dateData: any
        startDate: string
        endDate: string
    }
    const data = reactive<Data>({
        title: $t('KEY_PAGETITLE_FUNDDETAILS'),
        moreStatus: 'more',
        pageType: 1,
        recordData: [],
        dateParam: 1,
        pageIndex: 1,
        pageSize: 5,
        hasMore: true,
        listParams: {
            date: [],
        },
        searchDate: '',
        dateData: {},
        startDate: '',
        endDate: '',
    })

    const RefDatePicker = ref()
    const openPicker = () => {
        RefDatePicker.value.openPicker()
    }

    const getList = async () => {
        data.moreStatus = 'loading'
        if (data.pageType == 1) {
            payRecords()
        } else if (data.pageType == 2) {
            cashRecords()
        } else {
            discountRecords()
        }
    }

    const payRecords = async () => {
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
        let res = await lobbyApi.profile.payRecords(params, {cancelToken: 'lobbyApi.profile.payRecords'})
        if (res.success) {
            res.result = res.result ? res.result : []
            if (res.result.length < data.pageSize) {
                data.hasMore = false
                data.moreStatus = 'no-more'
            } else {
                data.moreStatus = 'more'
            }
            data.recordData = [...data.recordData, ...res.result]
        } else {
            ErrorHandler(res, 'payRecords')
        }
    }

    const cashRecords = async () => {
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
        let res = await lobbyApi.profile.cashRecords(params, {cancelToken: 'lobbyApi.profile.cashRecords'})
        if (res.success) {
            res.result = res.result ? res.result : []
            if (res.result.length < data.pageSize) {
                data.hasMore = false
                data.moreStatus = 'no-more'
            } else {
                data.moreStatus = 'more'
            }
            data.recordData = [...data.recordData, ...res.result]
        } else {
            ErrorHandler(res, 'cashRecords')
        }
    }

    const discountRecords = async () => {
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
        let res = await lobbyApi.profile.bonusRecords(params, {cancelToken: 'lobbyApi.profile.bonusRecords'})
        if (res.success) {
            res.result = res.result ? res.result : []
            if (res.result.length < data.pageSize) {
                data.hasMore = false
                data.moreStatus = 'no-more'
            } else {
                data.moreStatus = 'more'
            }
            data.recordData = [...data.recordData, ...res.result]
        } else {
            ErrorHandler(res, 'depositWithDrawRecords')
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
            case 1:
                data.startDate = data.dateData.today.start
                data.endDate = data.dateData.today.end
                break
            case 2:
                data.startDate = data.dateData.last7Days.start
                data.endDate = data.dateData.last7Days.end
                break
            case 3:
                data.startDate = data.dateData.last30Days.start
                data.endDate = data.dateData.last30Days.end
                break
            default:
        }
        data.searchDate = ''
        reload()
    }

    const checkboxChange = (checkdata) => {
        data.pageType = checkdata
        reload()
    }

    const datePickerChange = (pickerdata) => {
        data.dateParam = 4
        let chooseDate = getLocalDayTime(pickerdata)
        data.startDate = chooseDate.start
        data.endDate = chooseDate.end
        data.searchDate = format(new Date(pickerdata), 'yyyy-MM-dd')
        reload()
    }

    const getUTCTime = () => {
        const now = new Date()

        // 获取当天UTC开始时间
        let startOfDay = new Date()
        startOfDay.setHours(0, 0, 0, 0)
        startOfDay.toISOString()

        // 获取当天UTC结束时间
        let endOfDay = new Date()
        endOfDay.setHours(23, 59, 59, 999)
        endOfDay.toISOString()

        // 获取过去七天UTC开始时间
        let startOfLast7Days = new Date(now)
        startOfLast7Days.setDate(startOfLast7Days.getDate() - 6)
        startOfLast7Days.setHours(0, 0, 0, 0)
        startOfLast7Days.toISOString()

        // 获取过去七天UTC结束时间
        const endOfLast7Days = endOfDay

        // 获取过去三十天UTC开始时间
        let startOfLast30Days = new Date(now)
        startOfLast30Days.setDate(startOfLast30Days.getDate() - 29)
        startOfLast30Days.setHours(0, 0, 0, 0)
        startOfLast30Days.toISOString()

        // 获取过去三十天UTC结束时间
        const endOfLast30Days = endOfDay

        data.dateData = {
            today: {
                start: startOfDay,
                end: endOfDay,
            },
            last7Days: {
                start: startOfLast7Days,
                end: endOfLast7Days,
            },
            last30Days: {
                start: startOfLast30Days,
                end: endOfLast30Days,
            },
        }
    }

    getUTCTime()
    data.startDate = data.dateData.today.start
    data.endDate = data.dateData.today.end

    const getLocalDayTime = (date) => {
        let startOfDay = new Date(date)
        startOfDay.setHours(0, 0, 0, 0)
        startOfDay.toISOString()

        let endOfDay = new Date(date)
        endOfDay.setHours(23, 59, 59, 999)
        endOfDay.toISOString()

        return {
            start: startOfDay.toISOString(),
            end: endOfDay.toISOString(),
        }
    }

    const loadmore = () => {
        if (data.hasMore) {
            data.pageIndex++
            getList()
        }
    }

    onLoad((options) => {
        data.pageType = options.page_type
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

    onMounted(() => {
        initData()
    })

    uni.setNavigationBarTitle({
        title: $t('KEY_PAGETITLE_FUNDDETAILS'),
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
        top: 200rpx;
    }

    .record-list {
        padding: 20rpx 40rpx;
    }

    .record-card {
        @apply bg-black-80 border-black rounded-7;
        margin-bottom: 20rpx;
        color: #454545;
        padding: 20rpx;
        .card-title {
            @apply flex justify-between items-center text-white-80 border-black-80;
            height: 70rpx;
            font-size: 28rpx;
            font-weight: bold;
            border-bottom-width: 2rpx;
            border-bottom-style: solid;
        }
        .card-detail {
            @apply flex justify-between items-center;
            min-height: 80rpx;
        }
        .detail-list {
            @apply text-white-60;
            font-size: 21rpx;
            line-height: 21rpx;
            opacity: 0.8;
            .list-items {
                margin-top: 20rpx;
                .name {
                    width: 120rpx;
                    line-height: 30rpx;
                }
                &:first-child {
                    // margin-top: 0;
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
        .gray {
            color: #d1d1d1;
        }
    }
    .orderId {
        width: 280rpx;
        line-height: 30rpx;
    }
    .datepicker-view {
        height: 50px;
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .datePick {
        @apply box-border flex justify-center items-center;
        height: 100rpx;
        font-size: 28rpx;
        font-weight: bold;
        color: #ffffff;
        border-bottom: 8rpx solid #ffa922;
        padding: 0 0.375rem;
        background-color: rgba(27, 28, 28, var(--tw-bg-opacity));
    }
    .nodata {
        padding-top: 200rpx;
    }
    .bonus-tips {
        @apply list-items flex justify-between  text-white-60;
        margin-top: 18rpx;
        font-size: 21rpx;
        line-height: 21rpx;
        opacity: 0.8;
    }
</style>
