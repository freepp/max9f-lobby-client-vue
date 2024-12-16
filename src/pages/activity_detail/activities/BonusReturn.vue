<template>
    <view class="activity-view">
        <image
            class="w-full"
            src="@/static/activity/return-day.jpg"
            mode="widthFix"
            v-if="pageType === 1"
        ></image>
        <image
            class="w-full"
            src="@/static/activity/return-week.jpg"
            mode="widthFix"
            v-if="pageType === 2"
        ></image>
        <image
            class="w-full"
            src="@/static/activity/return-month.jpg"
            mode="widthFix"
            v-if="pageType === 3"
        ></image>
        <view class="detail">
            <view class="card">
                <view class="card-detail">
                    <view class="card-item">
                        <view class="cash">
                            R$
                            {{
                                numberWithCommas(
                                    _.ceil(
                                        data.rebateWater.totalBetAmount
                                            ? data.rebateWater.totalBetAmount
                                            : 0,
                                        2
                                    )
                                )
                            }}
                        </view>
                        <view class="tips" v-if="pageType === 1">
                            {{ $t('KEY_ACTIVITY_RETURN_TOTAL') }}
                        </view>
                        <view class="tips" v-if="pageType === 2">
                            {{ $t('KEY_ACTIVITY_RETURN_TOTAL_WEEK') }}
                        </view>
                        <view class="tips" v-if="pageType === 3">
                            {{ $t('KEY_ACTIVITY_RETURN_TOTAL_MONTH') }}
                        </view>
                        <img
                            class="bg-icon"
                            src="@/static/activity/bet_icon.png"
                            alt=""
                        />
                    </view>
                    <view class="card-item">
                        <view class="cash text-yellow">
                            R$
                            {{
                                numberWithCommas(
                                    data.rebateWater.rebateAmount
                                        ? data.rebateWater.rebateAmount
                                        : 0
                                )
                            }}
                        </view>
                        <view class="tips" v-if="pageType === 1">
                            {{ $t('KEY_ACTIVITY_RETURN_RECEIVEBONUS') }}
                        </view>
                        <view class="tips" v-if="pageType === 2">
                            {{ $t('KEY_ACTIVITY_RETURN_RECEIVEBONUS_WEEK') }}
                        </view>
                        <view class="tips" v-if="pageType === 3">
                            {{ $t('KEY_ACTIVITY_RETURN_RECEIVEBONUS_MONTH') }}
                        </view>
                        <img
                            class="bg-icon"
                            src="@/static/activity/bonus_icon.png"
                            alt=""
                        />
                    </view>
                </view>
                <view class="time" v-if="pageType === 1">
                    {{ $t('KEY_ACTIVITY_RETURN_TIME') }}: 24:00:00
                </view>
                <view class="time" v-if="pageType === 2">
                    {{ $t('KEY_ACTIVITY_RETURN_TIME') }}: {{ data.date }}
                </view>
                <view class="time" v-if="pageType === 3">
                    {{ $t('KEY_ACTIVITY_RETURN_TIME') }}: {{ data.date }}
                </view>
            </view>
            <view class="btn-view">
                <view class="normal-btn bg-default" @click="goDetail">
                    {{ $t('KEY_ACTIVITY_RETURN_DETAIL') }}
                </view>
                <view class="normal-btn bg-primary" @click="goBet">
                    {{ $t('KEY_ACTIVITY_RETURN_LIST') }}
                </view>
            </view>

            <view class="rules">
                <view class="rules-title">
                    <view class="line"></view>
                    <view class="title">
                        {{ $t('KEY_ACTIVITY_RETURN_RULE') }}
                    </view>
                    <view class="line"></view>
                </view>
                <view
                    v-if="pageType === 1"
                    class="rules-content"
                    v-html="$t('KEY_ACITVITY_BETRETURN_TIPS')"
                ></view>
                <view
                    v-if="pageType === 2"
                    class="rules-content"
                    v-html="$t('KEY_ACITVITY_BETRETURN_TIPS_WEEK')"
                ></view>
                <view
                    v-if="pageType === 3"
                    class="rules-content"
                    v-html="$t('KEY_ACITVITY_BETRETURN_TIPS_MONTH')"
                ></view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { ga, numberWithCommas } from '@/common/common'
    import { onMounted, watch, reactive, mergeProps } from 'vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as activityApi } from '@/NET/activity'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { format } from 'date-fns'
    import _ from 'lodash'

    const store = useUsersStore()

    interface Props {
        pageType?: number
    }
    const props = withDefaults(defineProps<Props>(), {
        pageType: 1,
    })

    interface Data {
        rebateWater: any
        date: string
    }

    const data = reactive<Data>({
        rebateWater: {},
        date: '',
    })
    const getRebateWater = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                frequency: props.pageType,
            },
            store.commonParams
        )
        // let res = await lobbyApi.activitys.getRebateWater(params)
        let res = await activityApi.rebate.rebateGetRebateWaterCreate(params)
        if (res.success) {
            data.rebateWater = res.result
        } else {
            ErrorHandler(res, 'getRebateWater')
        }
    }

    const goDetail = () => {
        uni.navigateTo({
            url: '/pages/bet_record/index',
        })
    }

    const goBet = () => {
        let searchParam = 'slots'
        uni.navigateTo({
            url: `/pages/gamelist/index?pageType=4&condition=${data.rebateWater.searchKey}&headerTitle=${data.rebateWater.searchKey}`,
        })
    }

    const nextSunday = () => {
        let today = new Date()
        let currentDay = today.getDay()
        let remainingDays = 7 - currentDay
        let nextSunday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + remainingDays
        )
        nextSunday.setHours(24, 0, 0, 0)
        data.date = format(nextSunday, 'yyyy-MM-dd HH:ss')
    }

    const lastDayOfMonth = () => {
        var today = new Date()
        var currentMonth = today.getMonth()
        var nextMonthFirstDay = new Date(
            today.getFullYear(),
            currentMonth + 1,
            1
        )
        var lastDayOfMonth = new Date(nextMonthFirstDay.getTime() - 86400000)
        lastDayOfMonth.setHours(24, 0, 0, 0)
        data.date = format(lastDayOfMonth, 'yyyy-MM-dd HH:ss')
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    const initData = () => {
        if (props.pageType === 2) {
            nextSunday()
        } else if (props.pageType === 3) {
            lastDayOfMonth()
        }
        if (store.userInfo) {
            getRebateWater()
        }
    }

    onMounted(() => {
        initData()
        
    })
</script>

<style lang="scss">
    .activity-view {
        min-height: 100%;
        .detail {
            padding: 40rpx;
            .card {
                @apply w-full bg-black-80 relative;
                height: 244rpx;
                border-radius: 8rpx;
                margin-bottom: 35rpx;
                .card-detail {
                    @apply flex items-center justify-between;
                    .card-item {
                        @apply flex-1 flex flex-col items-center relative justify-center;
                        height: 200rpx;
                        .cash {
                            font-size: 44rpx;
                            font-weight: bold;
                            margin-bottom: 10rpx;
                            z-index: 10;
                        }
                        .tips {
                            font-size: 22rpx;
                            color: #ffffff;
                            line-height: 28rpx;
                            opacity: 0.8;
                            z-index: 10;
                        }
                        .bg-icon {
                            @apply absolute;
                            width: 120rpx;
                            z-index: 1;
                        }
                    }
                }
                .time {
                    @apply flex items-center justify-center absolute bottom-0 box-border truncate;
                    // width: 400rpx;
                    height: 48rpx;
                    background-color: #272727;
                    border-radius: 42rpx 42rpx 0px 0px;
                    left: 50%;
                    padding: 0 50rpx;
                    transform: translate(-50%);
                }
            }
            .btn-view {
                @apply flex items-center justify-between;
                .normal-btn {
                    width: 326rpx;
                    font-size: 28rpx;
                }
            }
            .rules {
                @apply text-white-90;
                margin-top: 50rpx;

                .rules-title {
                    @apply flex justify-center items-center;
                    margin-bottom: 30rpx;
                    .title {
                        font-size: 28rpx;
                        font-weight: bold;
                        color: #7c7c7c;
                        margin: 0 36rpx;
                    }
                    .line {
                        width: 120rpx;
                        height: 3rpx;
                        background: #878789;
                    }
                }
                .rules-content {
                    color: #7c7c7c;
                    line-height: 28rpx;
                    ::v-deep p {
                        color: #7c7c7c;
                        line-height: 28rpx;
                    }
                }
            }
        }
    }
</style>
