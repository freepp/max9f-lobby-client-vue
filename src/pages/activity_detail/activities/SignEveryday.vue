<template>
    <view class="activity-view">
        <view class="loading" v-if="isLoading">
            <Loading />
        </view>
        <view class="banner">
            <image
                src="@/static/activity/sign_everyday_banner.jpg"
                mode="widthFix"
            />
        </view>
        <view class="detail">
            <view class="days-box">
                <view class="flex day-line">
                    <view
                        class="flex-1 top-left-corner"
                        :class="signList?.[0]?.status"
                        @click="goCheckIn(signList?.[0]?.status)"
                    >
                        <image
                            src="@/static/activity/check_in_prev.png"
                            mode="widthFix"
                            class="gift"
                        ></image>
                        <image
                            src="@/static/activity/check_in_prev_open.png"
                            mode="widthFix"
                            class="gift open-gift"
                        ></image>
                        <view
                            class="bottom-desc"
                            v-html="signList?.[0]?.amount || days.day1"
                        ></view>
                    </view>
                    <view
                        class="flex-1"
                        :class="signList?.[1]?.status"
                        @click="goCheckIn(signList?.[1]?.status)"
                    >
                        <image
                            src="@/static/activity/check_in_prev.png"
                            mode="widthFix"
                            class="gift"
                        ></image>
                        <image
                            src="@/static/activity/check_in_prev_open.png"
                            mode="widthFix"
                            class="gift open-gift"
                        ></image>
                        <view
                            class="bottom-desc"
                            v-html="signList?.[1]?.amount || days.day2"
                        ></view>
                    </view>
                    <view
                        class="flex-1"
                        :class="signList?.[2]?.status"
                        @click="goCheckIn(signList?.[2]?.status)"
                    >
                        <image
                            src="@/static/activity/check_in_mid.png"
                            mode="widthFix"
                            class="gift"
                        ></image>
                        <image
                            src="@/static/activity/check_in_mid_open.png"
                            mode="widthFix"
                            class="gift open-gift"
                        ></image>
                        <view
                            class="bottom-desc"
                            v-html="signList?.[2]?.amount || days.day3"
                        ></view>
                    </view>
                    <view
                        class="flex-1 top-right-corner"
                        :class="signList?.[3]?.status"
                        @click="goCheckIn(signList?.[3]?.status)"
                    >
                        <image
                            src="@/static/activity/check_in_mid.png"
                            mode="widthFix"
                            class="gift"
                        ></image>
                        <image
                            src="@/static/activity/check_in_mid_open.png"
                            mode="widthFix"
                            class="gift open-gift"
                        ></image>
                        <view
                            class="bottom-desc"
                            v-html="signList?.[3]?.amount || days.day4"
                        ></view>
                    </view>
                </view>
                <view class="flex day-line day-line2">
                    <view
                        class="flex-1 bottom-left-corner"
                        :class="signList?.[4]?.status"
                        @click="goCheckIn(signList?.[4]?.status)"
                    >
                        <image
                            src="@/static/activity/check_in_mid.png"
                            mode="widthFix"
                            class="gift"
                        ></image>
                        <image
                            src="@/static/activity/check_in_mid_open.png"
                            mode="widthFix"
                            class="gift open-gift"
                        ></image>
                        <view
                            class="bottom-desc bottom-left-corner"
                            v-html="signList?.[4]?.amount || days.day5"
                        ></view>
                    </view>
                    <view
                        class="flex-1"
                        :class="signList?.[5]?.status"
                        @click="goCheckIn(signList?.[5]?.status)"
                    >
                        <image
                            src="@/static/activity/check_in_mid.png"
                            mode="widthFix"
                            class="gift"
                        ></image>
                        <image
                            src="@/static/activity/check_in_mid_open.png"
                            mode="widthFix"
                            class="gift open-gift"
                        ></image>
                        <view
                            class="bottom-desc"
                            v-html="signList?.[5]?.amount || days.day6"
                        ></view>
                    </view>
                    <view
                        class="large bottom-right-corner"
                        :class="signList?.[6]?.status"
                        @click="goCheckIn(signList?.[6]?.status)"
                    >
                        <image
                            src="@/static/activity/check_in_last.png"
                            mode="widthFix"
                            class="gift"
                        ></image>
                        <image
                            src="@/static/activity/check_in_last_open.png"
                            mode="widthFix"
                            class="gift open-gift"
                        ></image>
                        <view
                            class="bottom-desc bottom-right-corner"
                            v-html="signList?.[6]?.amount || days.day7"
                        ></view>
                    </view>
                </view>
            </view>
            <view class="btn">
                <view
                    v-if="!checkInDisabled"
                    class="normal-btn bg-primary"
                    v-html="$t('KEY_ACTIVITY_CHECK_IN_BTN')"
                    @click="checkIn"
                ></view>
                <view
                    v-if="checkInDisabled"
                    class="normal-btn bg-primary disabled"
                    v-html="$t('KEY_ACTIVITY_CHECK_IN_BTN')"
                ></view>
            </view>
            <view class="days-table">
                <view class="tr">
                    <view
                        class="th"
                        v-html="$t('KEY_ACTIVITY_CHECK_IN_TH1')"
                    ></view>
                    <view
                        class="th"
                        v-html="$t('KEY_ACTIVITY_CHECK_IN_TH2')"
                    ></view>
                </view>
                <view class="tr">
                    <view
                        class="td"
                        v-html="$t('KEY_ACTIVITY_CHECK_IN_DAY1')"
                    ></view>
                    <view class="td">
                        {{ signLevelList[0]?.minMoney }}-{{
                            signLevelList[0]?.maxMoney
                        }}
                    </view>
                </view>
                <view class="tr">
                    <view
                        class="td"
                        v-html="$t('KEY_ACTIVITY_CHECK_IN_DAY2')"
                    ></view>
                    <view class="td">
                        {{ signLevelList[1]?.minMoney }}-{{
                            signLevelList[1]?.maxMoney
                        }}
                    </view>
                </view>
                <view class="tr">
                    <view
                        class="td"
                        v-html="$t('KEY_ACTIVITY_CHECK_IN_DAY3')"
                    ></view>
                    <view class="td">
                        {{ signLevelList[2]?.minMoney }}-{{
                            signLevelList[2]?.maxMoney
                        }}
                    </view>
                </view>
                <view class="tr">
                    <view
                        class="td"
                        v-html="$t('KEY_ACTIVITY_CHECK_IN_DAY4')"
                    ></view>
                    <view class="td">
                        {{ signLevelList[3]?.minMoney }}-{{
                            signLevelList[3]?.maxMoney
                        }}
                    </view>
                </view>
                <view class="tr">
                    <view
                        class="td"
                        v-html="$t('KEY_ACTIVITY_CHECK_IN_DAY5')"
                    ></view>
                    <view class="td">
                        {{ signLevelList[4]?.minMoney }}-{{
                            signLevelList[4]?.maxMoney
                        }}
                    </view>
                </view>
                <view class="tr">
                    <view
                        class="td"
                        v-html="$t('KEY_ACTIVITY_CHECK_IN_DAY6')"
                    ></view>
                    <view class="td">
                        {{ signLevelList[5]?.minMoney }}-{{
                            signLevelList[5]?.maxMoney
                        }}
                    </view>
                </view>
                <view class="tr">
                    <view
                        class="td"
                        v-html="$t('KEY_ACTIVITY_CHECK_IN_DAY7')"
                    ></view>
                    <view class="td">
                        {{ signLevelList[6]?.minMoney }}-{{
                            signLevelList[6]?.maxMoney
                        }}
                    </view>
                </view>
            </view>
            <view class="statement" v-html="statement"></view>
            <view class="empty-space"></view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { onMounted, reactive, ref, watch } from 'vue'
    import { i18n } from '@/common/i18nConfig'
    import { useUsersStore } from '@/store/userStore'
    import { api as lobbyApi } from '@/NET/lobby'
    import Loading from '@/lib/components/Loading.vue'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { onShow } from '@dcloudio/uni-app'
    import { modal } from '@/lib/components/Modal'
    import { ga } from '@/common/common'
    import { getPlatform } from '@/common/init'
    const { t: $t } = i18n.global
    const store = useUsersStore()
    // 接口梳理
    const checkInDisabled = ref(true)
    const RefDepositAlert = ref(null)
    const isLoading = ref(false)
    const data = reactive({
        alertType: 1,
        alertConfig: {
            title: '',
            content: ``,
            btnText: '',
        },
    })
    const days = reactive({
        day1: $t('KEY_ACTIVITY_CHECK_IN_DAY1'),
        day2: $t('KEY_ACTIVITY_CHECK_IN_DAY2'),
        day3: $t('KEY_ACTIVITY_CHECK_IN_DAY3'),
        day4: $t('KEY_ACTIVITY_CHECK_IN_DAY4'),
        day5: $t('KEY_ACTIVITY_CHECK_IN_DAY5'),
        day6: $t('KEY_ACTIVITY_CHECK_IN_DAY6'),
        day7: $t('KEY_ACTIVITY_CHECK_IN_DAY7'),
    })
    const unit = $t('KEY_ACTIVITY_CHECK_IN_UNIT')
    const openDialog = () => {
        const type = data.alertType === 1 ? 'success' : 'warning'
        modal({
            type,
            width: '485rpx',
            title: data.alertConfig.title,
            content: data.alertConfig.content,
            confirmText: data.alertConfig.btnText,
            showCancel: false,
            onConfirm: DialogSuccess,
        })
    }
    let closeFnFlush = null
    const signList = ref([])
    const signLevelList = ref<any>([
        {
            minMoney: 1,
            maxMoney: 20,
        },
        {
            minMoney: 1,
            maxMoney: 20,
        },
        {
            minMoney: 1,
            maxMoney: 50,
        },
        {
            minMoney: 1,
            maxMoney: 50,
        },
        {
            minMoney: 1,
            maxMoney: 100,
        },
        {
            minMoney: 1,
            maxMoney: 100,
        },
        {
            minMoney: 1,
            maxMoney: 200,
        },
    ])
    onMounted(() => {
        
    })
    const getSignLevel = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                bannerID: '7',
            },
            store.commonParams
        )
        const res = await lobbyApi.activitys.getSigninLevel(params)
        if (res.success) {
            if (res.result) {
                signLevelList.value = res.result
            }
        }
    }
    const statement = ref('')
    const getFlowMultip = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                bannerID: '7',
            },
            store.commonParams
        )
        const res = await lobbyApi.activitys.getFlowMultip(params)
        if (res.result) {
            const stat = $t('KEY_ACTIVITY_CHECK_IN_STATEMEMT', {domain: getPlatform() })
            const suffix =
                res.result === 1
                    ? $t('KEY_ACTIVITY_CHECK_IN_STATEMEMT_TIME')
                    : $t('KEY_ACTIVITY_CHECK_IN_STATEMEMT_TIMES')
            statement.value = stat.replace(
                '#timesStr#',
                String(res.result) + ' ' + suffix
            )
        }
    }
    const getSignList = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                bannerID: '7',
            },
            store.commonParams
        )
        const res = await lobbyApi.activitys.getSignlist(params)
        if (res.success) {
            const tempSignList = res.result.signlist
            // 接口返回的是倒序 先正序
            tempSignList.reverse()
            // 将上一轮的签到结果剔除
            const index = tempSignList.findLastIndex((item) => item.level === 3)
            if (index !== -1 && index !== tempSignList.length - 1) {
                tempSignList.splice(0, index + 1)
            }

            const currentDate = res.result.currentDate
            // 接口返回数据过多 剔除
            if (tempSignList.length > 7) {
                tempSignList.splice(0, tempSignList.length - 7)
                // 接口返回数据小于7条 则填充 每次 dayId +1  flag: false
            } else if (tempSignList.length < 7) {
                // 如果接口返回[] 初始化第一天
                if (tempSignList.length === 0) {
                    tempSignList.push({
                        dayId: new Date(currentDate).toJSON(),
                        flag: false,
                        amount: 0,
                    })
                }

                const last = tempSignList[tempSignList.length - 1]
                const length = tempSignList.length
                // 循环填充数据
                for (let i = 0; i < 7 - length; i++) {
                    const baseDate = new Date(last.dayId)
                    tempSignList.push({
                        dayId: new Date(
                            baseDate.setDate(baseDate.getDate() + i + 1)
                        ).toJSON(),
                        flag: false,
                    })
                }
            }
            const currentDay = new Date(currentDate)
            // 根据dayId,当前日期,是否已领取 获取箱子的状态open:已开启 | active: 可开启 | '': 不可开启:
            const getStatus = (dayId, flag) => {
                const vsDay = new Date(dayId)
                const vsDayNum = parseInt(
                    vsDay.getFullYear() +
                        ('0' + vsDay.getMonth()).slice(-2) +
                        ('0' + vsDay.getDate()).slice(-2)
                )
                const currDayNum = parseInt(
                    currentDay.getFullYear() +
                        ('0' + currentDay.getMonth()).slice(-2) +
                        ('0' + currentDay.getDate()).slice(-2)
                )
                if (currDayNum - vsDayNum === 0 && flag === false) {
                    checkInDisabled.value = false
                    return 'active'
                } else if (currDayNum - vsDayNum === 0 && flag === true) {
                    checkInDisabled.value = true
                    return 'open'
                } else if (flag) {
                    return 'open'
                } else {
                    return ''
                }
            }
            signList.value = tempSignList.map((item) => {
                return {
                    status: getStatus(item.dayId, item.flag),
                    ...item,
                }
            })
        } else {
            ErrorHandler(res, 'getListByLabel')
        }
    }
    // 今日游戏币是否下注大于50
    // const checkDisabled = async () => {
    //     let params = Object.assign(
    //         {
    //             userId: store.userInfo.userId,
    //             bannerID: '7',
    //         },
    //         store.commonParams
    //     )
    //     const res = await lobbyApi.activitys.isCanSign(params)
    //     console.log(res)
    // }
    const initData = () => {
        if (store.userInfo) {
            if (store.userInfo?.userMode === 1) {
                uni.navigateTo({
                    url: '/pages/login/index',
                })
            } else {
                // 2023/8/9 lengyang 前端显示和后端赠送不同配置
                //getSignLevel()
                getSignList()
                getFlowMultip()
            }
        }
    }
    onShow(() => {
        console.log(store.userInfo, store.userInfo?.userMode)
        initData()
    })
    watch(
        () => store.userInfo,
        () => {
            initData()
        }
    )
    const checkIn = async () => {
        isLoading.value = true
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                bannerID: '7',
            },
            store.commonParams
        )
        const res = await lobbyApi.activitys.signin(params)
        if (!res.success) {
            ErrorHandler(res, 'checkIn')
            // data.promoionsData[0].isValid = false
        }
        isLoading.value = false
        closeFnFlush = null
        // 领取成功
        if (res.result.status === 2) {
            data.alertType = 1
            const content = $t('KEY_ACTIVITY_CHECK_IN_SUCCESS_TEXT')
            const bonus = res.result.rewardAmount
            days.day1 = `${unit} ${bonus}`
            data.alertConfig = {
                title: '',
                content: content.replaceAll('$bonus$', bonus + ''),
                btnText: $t('KEY_ACTIVITY_CHECK_IN_SUCCESS_BTN'),
            }
            getSignList()
            // 下注未达到50
        } else if (res.result.status === -1) {
            data.alertType = 2
            const warningText = $t('KEY_ACTIVITY_CHECK_IN_WARNING_TEXT')

            data.alertConfig = {
                title: '',
                content: warningText.replace(
                    'R$50',
                    'R$' + res.result?.pettingAmount
                ),
                btnText: $t('KEY_ACTIVITY_CHECK_IN_WARNING_BTN'),
            }
            closeFnFlush = () => {
                uni.switchTab({
                    url: '/pages/index/index',
                })
            }
            // 签到失败 0 签到失败 1 签到成功, 奖励赠送失败
        } else {
            data.alertType = 2
            data.alertConfig = {
                title: '',
                content: $t('KEY_ACTIVITY_CHECK_IN_ERROR_TEXT'),
                btnText: $t('KEY_ACTIVITY_CHECK_IN_ERROR_BTN'),
            }
        }
        openDialog()
    }
    const goCheckIn = (status) => {
        if (status === 'active') {
            checkIn()
        }
    }
    const DialogSuccess = () => {
        closeFnFlush && closeFnFlush()
    }
</script>

<style lang="scss">
    .activity-view {
        min-height: 100%;
        .banner {
            @apply w-full;
            image {
                @apply w-full;
            }
        }
        .detail {
            padding: 0rpx 42rpx;
            .days-box {
                padding-top: 42rpx;
                .day-line {
                    height: 135rpx;
                    > view {
                        width: 158rpx;
                        margin-left: 5rpx;
                        margin-right: 6rpx;
                        background: #384047;
                        position: relative;
                        border-radius: 3rpx;
                        //border-radius: 3px 14px 3px 3px;
                        .gift {
                            @apply absolute;
                            width: 119rpx;
                            top: -15rpx;
                            left: 21rpx;
                        }
                        .open-gift {
                            display: none;
                        }
                        .bottom-desc {
                            @apply absolute font-bold left-0 bottom-0 w-full text-center;
                            height: 35rpx;
                            line-height: 37rpx;
                            font-size: 21rpx;
                            background: #5c6974;
                        }
                        &.open {
                            .gift {
                                display: none;
                            }
                            .open-gift {
                                display: block;
                            }
                            .bottom-desc {
                                background: #83b198;
                            }
                        }
                        &.active {
                            background-color: #ffae22;
                            border: 1px solid #fffa7b;
                            box-shadow: inset 0px 0px 10px 7px
                                rgba(255, 234, 0, 0.78);
                            .bottom-desc {
                                background: #723811;
                                box-shadow: inset 0px 0px 3px 2px
                                    rgba(255, 234, 0, 0.78);
                            }
                        }
                    }
                    .top-left-corner {
                        border-radius: 14px 3px 3px 3px;
                    }
                    .top-right-corner {
                        border-radius: 3px 14px 3px 3px;
                    }
                    .bottom-left-corner {
                        border-radius: 3px 3px 3px 14px;
                    }
                    .bottom-right-corner {
                        border-radius: 3px 3px 14px 3px;
                    }
                    .large {
                        width: 320rpx;
                        .gift {
                            left: 93rpx;
                        }
                    }
                }
                .day-line2 {
                    margin-top: 14rpx;
                }
            }
            .btn {
                margin-top: 65rpx;
            }
            .days-table {
                @apply table text-black font-bold text-center;
                margin: 50rpx auto 0;
                font-size: 33rpx;
                border-collapse: collapse;
                border-radius: 7rpx;
                overflow: hidden;
                .tr {
                    @apply table-row;

                    .th,
                    .td {
                        @apply table-cell bg-white;
                        width: 334rpx;
                        height: 90rpx;
                        line-height: 90rpx;
                        border: 1px solid #000;
                    }
                    .th {
                        @apply text-white-100;
                        background: linear-gradient(0deg, #282a2d, #39424a);
                        border-top-width: 0;
                    }
                }
                .tr .th:first-child,
                .tr .td:first-child {
                    border-left-width: 0;
                }
                .tr .th:last-child,
                .tr .td:last-child {
                    border-right-width: 0;
                }
                .tr:last-child .td {
                    border-bottom-width: 0;
                }
            }
            .statement {
                @apply text-white-90;
                margin-top: 48rpx;
                font-size: 28rpx;
                font-weight: 400;
                line-height: 35rpx;
            }
            .empty-space {
                height: 105rpx;
            }
        }
    }
</style>
