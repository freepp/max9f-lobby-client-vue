<template>
    <view class="activity-view">
        <view class="absolute w-full h-full">
            <image
                src="@/static/activity/weekly-card/bg.jpg"
                class="w-full h-full"
            ></image>
        </view>
        <view class="card-box">
            <view class="vip-day" :class="computedClass2"></view>
            <view class="vip-price">
                <view
                    v-for="item in computedClass"
                    class="num"
                    :class="item"
                ></view>
            </view>
            <view class="days">
                <view class="days-list">
                    <view
                        class="day"
                        v-for="item in info?.items"
                        :class="{
                            disabled: item.status === 0,
                            able: item.status === 1,
                            got: item.status === 2,
                        }"
                    >
                        <view class="first-part"></view>
                        <view class="mid-part"></view>
                        <view class="end-part"></view>
                    </view>
                </view>
                <view class="info-list">
                    <view
                        class="info"
                        v-for="(item, index) in info?.items"
                        @click="collect(item)"
                        :class="{
                            disabled: item.status === 0,
                            able: item.status === 1,
                            got: item.status === 2,
                        }"
                    >
                        <view class="info-day">
                            {{ index + 1
                            }}{{
                                index === 0
                                    ? $t('KEY_WEEK_CARD_DAY')
                                    : $t('KEY_WEEK_CARD_DAYS')
                            }}
                        </view>
                        <view class="info-bonus">R${{ item.bonus }}</view>
                    </view>
                </view>
            </view>
            <view v-if="!info.isBuyWeeklyCard" class="buy" @click="buy">
                {{ $t('KEY_WEEK_CARD_BUY') }} R$ {{ info.payAmount }}
            </view>
            <view
                v-if="info.isBuyWeeklyCard"
                class="collect"
                :class="{ disabled: collectDisabled }"
                @click="collectFist"
                v-html="$t('KEY_WEEK_CARD_COLLECT')"
            ></view>
        </view>
        <view class="privilege-box">
            <view
                class="title"
                v-html="$t('KEY_WEEK_CARD_PRIVILEGE_TITLE')"
            ></view>
            <view class="privileges">
                <view class="privilege">
                    <image
                        v-if="info.isBuyWeeklyCard"
                        src="@/static/activity/weekly-card/privilege1.png"
                    ></image>
                    <image
                        v-else
                        src="@/static/activity/weekly-card/privilege1_disabled.png"
                    ></image>
                    <view
                        class="text"
                        v-html="$t('KEY_WEEK_CARD_PRIVILEGE1')"
                    ></view>
                </view>
                <view class="privilege">
                    <image
                        v-if="info.isBuyWeeklyCard"
                        src="@/static/activity/weekly-card/privilege2.png"
                    ></image>
                    <image
                        v-else
                        src="@/static/activity/weekly-card/privilege2_disabled.png"
                    ></image>
                    <view
                        class="text"
                        v-html="$t('KEY_WEEK_CARD_PRIVILEGE2')"
                    ></view>
                </view>
                <view class="privilege">
                    <image
                        v-if="info.isBuyWeeklyCard"
                        src="@/static/activity/weekly-card/privilege2.png"
                    ></image>
                    <image
                        v-else
                        src="@/static/activity/weekly-card/privilege2_disabled.png"
                    ></image>
                    <view
                        class="text"
                        v-html="$t('KEY_WEEK_CARD_PRIVILEGE3')"
                    ></view>
                </view>
            </view>
        </view>
        <view class="rule-box">
            <view class="title">{{ $t('KEY_WEEK_CARD_RULE_TITLE') }}</view>
            <view class="rule" v-html="$t('KEY_WEEK_CARD_RULE_TEXT')"></view>
        </view>
        <PopupBottom
            ref="RefPopup"
            :height="data.popupHeight"
            :background="'var(--UI-BG)'"
            :noBorder="true"
            @mask-click="maskClose"
        >
            <view class="popup-title">
                {{ $t('KEY_TABBAR_DEPOSIT') }}
                <!-- {{ $t('KEY_WEEK_CARD_BUY') }} R$ {{ info.payAmount }} -->
            </view>
            <view class="scroll-view" v-if="data.pixCode !== ''">
                <qrCode :amount="data.amount" :pixCode="data.pixCode" />
            </view>
        </PopupBottom>
    </view>
</template>

<script lang="ts" setup>
    import { getAFid } from '@/common/common'
    import share from '@/pages/agent/components/share.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { numberWithCommas } from '@/common/common'
    import PopupBottom from '@/lib/components/PopupBottom/index.vue'
    import qrCode from '@/lib/components/Pay/channel/PIX/qrCode.vue'
    import loadingBtn from '@/lib/components/Button/LoadingBtn.vue'
import { JSONStringify } from 'lib/tool'
    const { t: $t } = i18n.global
    const store = useUsersStore()

    const data = reactive<any>({
        pixCode: '',
        qrcode: '',
        amount: 0,
    })
    const RefPopup = ref(null)
    const info = ref<any>({})
    const collectDisabled = ref(false)
    const checkPay = async () => {
        if (orderId) {
            let params = Object.assign(
                {
                    orderId,
                    userId: store.userInfo.userId,
                    syncTypes: [2],
                },
                store.commonParams
            )
            let res = await lobbyApi.home.sync(params)
            if (res.success) {
                if (res.result.order.status === 2) {
                    await getActivityInfo()
                }
            } else {
                ErrorHandler(res, 'sync')
            }
        }
    }
    let timer = null
    const setTimer = () => {
        timer = setInterval(() => {
            checkPay()
        }, 10000)
    }
    const removeTimer = () => {
        if (timer) {
            clearInterval(timer)
        }
    }
    onHide(() => {
        removeTimer()
    })
    let orderId = ''
    const maskClose = () => {
        getActivityInfo()
        setTimer()
        data.pixCode = ''
    }
    let collecting = false
    const collect = async (item) => {
        if (collecting) {
            return
        }
        collecting = true
        if (item.status !== 1) {
            return
        }
        let params = Object.assign(
            {},
            {
                userId: store.userInfo.userId,
            },
            store.commonParams,
            {
                dateNumber: item.dateNumber,
            }
        )
        const res = await lobbyApi.weeklyCard.execute(params)
        if (res.success) {
            if (res.result.status) {
                modal({
                    width: '500rpx',
                    title: $t('KEY_WEEK_CARD_GET_SUS').replaceAll(
                        '#money#',
                        res.result.bonus + ''
                    ),
                    confirmText: $t('KEY_COMMON_OK'),
                    showCancel: false,
                })
            }
            collecting = false
            await getActivityInfo()
        } else {
            ErrorHandler(res, 'collect weeklyCard.execute')
        }
        collecting = false
    }
    const collectFist = async (item) => {
        if (info.value.items?.length <= 0) {
            return
        }
        const items = info.value.items
        const firstItem = items.find((item) => item.status === 1)
        if (firstItem) {
            collect(firstItem)
        }
    }
    const buy = async () => {
        let meta = {
            //clickid: localStorage.getItem('click_id'),
			 clickid: uni.getStorageSync('click_id'),
            AFID: getAFid(),
        }
        // @ts-ignore
        // if (window.android) {
        //     // @ts-ignore
        //     meta.AFID = window.android.requestValue('AFID', '')
        //     console.log(meta.AFID)
        // }
        let params = Object.assign(
            {},
            {
                userId: store.userInfo.userId,
            },
            store.commonParams,
            {
                meta,
            }
        )
        const res = await lobbyApi.weeklyCard.braDeposit(params)
        if (res.success) {
            data.pixCode = res.result.qrCode
            data.amount = info.value.payAmount
            orderId = res.result.orderId
            RefPopup.value.changeIsShow(true)
        } else {
            ErrorHandler(res, 'weeklyCard.braDeposit')
        }
    }
    const getActivityInfo = async () => {
        let params = Object.assign(
            {},
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        const res = await lobbyApi.weeklyCard.load(params)
        if (res.success) {
            const result = res.result.data["1"]
            info.value = result
            collectDisabled.value = !result.items?.find(
                (item) => item.status === 1
            )
            if (res.result.isBuyWeeklyCard) {
                removeTimer()
            }
        } else {
            ErrorHandler(res, 'getActivityInfo')
        }
    }
    const computedClass2 = computed(() => {
        return 'num' + info.value.cycle
    })
    const computedClass = computed(() => {
        const str = numberWithCommas(info.value.sumBonus) + ''
        let arr = str?.split('')
        arr = arr?.map((item) => {
            let className = item
            if (item === '.') {
                className = 'q'
            } else if (item === ',') {
                className = 'd'
            }
            return 'num' + className
        })
        return arr
    })
    const initData = () => {
        if (store.userInfo) {
            getActivityInfo()
        }
    }
    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    onMounted(() => {
        let systemInfo = uni.getSystemInfoSync()
        if (systemInfo.windowWidth > 960) {
          data.popupHeight = systemInfo.safeArea.height * 2
        } else {
          data.popupHeight = systemInfo.safeArea.height * (750 / systemInfo.safeArea.width)
        }
        initData()
    })
</script>

<style lang="scss">
    .activity-view {
        @apply h-full;
        overflow: hidden;
        padding-bottom: 42rpx;
        position: relative;
        min-height: 1400rpx;
        .card-box {
            @apply relative box-border;
            width: 668rpx;
            height: 575rpx;
            background: linear-gradient(0deg, #39229e, #5228ab);
            border-radius: 14px;
            margin: 0 auto;
            padding-top: 140rpx;
            z-index: 2;
            background: url('@/static/activity/weekly-card/box_bg.png');
            background-size: 100% 100%;
            margin-top: 62rpx;
            padding-top: 277rpx;
            .vip-day {
                position: absolute;
                width: 20rpx;
                height: 28rpx;
                top: 240rpx;
                left: 244rpx;
                z-index: 5;
                background: url('@/static/activity/weekly-card/num.png');
                background-size: auto 100%;
            }
            .vip-price {
                @apply absolute flex justify-start;
                width: 300rpx;
                height: 28rpx;
                top: 240rpx;
                left: 554rpx;
                // background-color: red;
                z-index: 5;
                .num {
                    height: 28rpx;
                    background: url('@/static/activity/weekly-card/num.png');
                    background-size: auto 100%;
                    &.num1 {
                        width: 16rpx;
                    }
                    &.num0,
                    &.num2,
                    &.num3,
                    &.num4,
                    &.num5,
                    &.num6,
                    &.num7,
                    &.num8,
                    &.num9 {
                        width: 20rpx;
                    }
                    &.numq,
                    &.numd {
                        width: 14rpx;
                    }
                    &.numd {
                        width: 12rpx;
                    }
                }
                // background: url('@/static/activity/weekly-card/num.png');
                // background-size: auto 100%;
            }
            .vip-price,
            .vip-day {
                .num1 {
                    background-position: 0 0;
                }
                .num2 {
                    background-position: -22rpx 0;
                }
                .num3 {
                    background-position: -47rpx 0;
                }
                .num4 {
                    background-position: -74rpx 0;
                }
                .num5 {
                    background-position: -99rpx 0;
                }
                .num6 {
                    background-position: -127rpx 0;
                }
                .num7 {
                    background-position: -152rpx 0;
                }
                .num8 {
                    background-position: -178rpx 0;
                }
                .num9 {
                    background-position: -204rpx 0;
                }
                .num0 {
                    background-position: -230rpx 0;
                }
                .numq {
                    background-position: -254rpx 0;
                }
                .numd {
                    background-position: -268rpx 0;
                }
            }
            .days {
                @apply relative rounded-7 flex justify-center items-center;
                width: 628rpx;
                height: 149rpx;
                background: #ffffff;
                background: #261571;
                box-shadow: 0px 2rpx 0px 0px #947df5, 0px 4rpx 4rpx 0px #4525a4;
                margin: 0 auto;
                .days-list {
                    @apply relative h-full rounded-7 flex justify-center items-center;
                    width: 610rpx;
                    height: 134rpx;
                }
                .day {
                    @apply flex;
                    flex: 1;
                    height: 134rpx;
                    // background: url('@/static/activity/weekly-card/day_able_mid.png');
                    // background-size: 100% 100%;
                    .mid-part {
                        @apply flex-1;
                        background-position: -100% 0;
                        background-size: 300% 100%;
                    }
                    .first-part {
                        width: 30rpx;
                        background-position: 0 0;
                        background-size: auto 100%;
                    }
                    .end-part {
                        width: 30rpx;
                        background-position: 30rpx 0;
                        background-size: auto 100%;
                    }
                    &.able {
                        .mid-part {
                            background-image: url('@/static/activity/weekly-card/day_able_first.png');
                        }
                        .first-part {
                            background-image: url('@/static/activity/weekly-card/day_able_mid.png');
                        }
                        .end-part {
                            background-image: url('@/static/activity/weekly-card/day_able_mid.png');
                        }
                        &:first-child {
                            .first-part {
                                background-image: url('@/static/activity/weekly-card/day_able_first.png');
                            }
                            .end-part {
                                background-image: url('@/static/activity/weekly-card/day_able_first.png');
                            }
                        }
                        &:last-child {
                            .first-part {
                                background-image: url('@/static/activity/weekly-card/day_able_last.png');
                            }
                            .end-part {
                                background-image: url('@/static/activity/weekly-card/day_able_last.png');
                            }
                        }
                    }
                    &.disabled {
                        .mid-part {
                            background-image: url('@/static/activity/weekly-card/day_disabled_mid.png');
                        }
                        .first-part {
                            background-image: url('@/static/activity/weekly-card/day_disabled_mid.png');
                        }
                        .end-part {
                            background-image: url('@/static/activity/weekly-card/day_disabled_mid.png');
                        }
                        &:first-child {
                            .first-part {
                                background-image: url('@/static/activity/weekly-card/day_disabled_first.png');
                            }
                            .end-part {
                                background-image: url('@/static/activity/weekly-card/day_disabled_first.png');
                            }
                        }
                        &:last-child {
                            .first-part {
                                background-image: url('@/static/activity/weekly-card/day_disabled_last.png');
                            }
                            .end-part {
                                background-image: url('@/static/activity/weekly-card/day_disabled_last.png');
                            }
                            .mid-part {
                                background-image: url('@/static/activity/weekly-card/day_disabled_last.png');
                            }
                        }
                    }
                    &.got {
                        .mid-part {
                            background-image: url('@/static/activity/weekly-card/day_got_mid.png');
                        }
                        .first-part {
                            background-image: url('@/static/activity/weekly-card/day_got_mid.png');
                        }
                        .end-part {
                            background-image: url('@/static/activity/weekly-card/day_got_mid.png');
                        }
                        &:first-child {
                            .first-part {
                                background-image: url('@/static/activity/weekly-card/day_got_first.png');
                            }
                            .end-part {
                                background-image: url('@/static/activity/weekly-card/day_got_first.png');
                            }
                        }
                        &:last-child {
                            .first-part {
                                background-image: url('@/static/activity/weekly-card/day_got_last.png');
                            }
                            .end-part {
                                background-image: url('@/static/activity/weekly-card/day_got_last.png');
                            }
                            .mid-part {
                                background-image: url('@/static/activity/weekly-card/day_got_last.png');
                            }
                        }
                    }
                }
                .info-list {
                    @apply absolute h-full rounded-7 flex justify-center items-center;
                    width: 610rpx;
                    height: 134rpx;
                    top: 7rpx;
                    left: 9rpx;
                    .info {
                        flex: 1;
                        height: 134rpx;
                        .info-day {
                            height: 67rpx;
                            line-height: 67rpx;
                            text-align: center;
                            font-size: 24rpx;
                            font-family: Anton;
                            font-weight: bold;
                            color: #ffffff;
                            transform: scale(0.9);
                        }
                        .info-bonus {
                            height: 67rpx;
                            line-height: 67rpx;
                            text-align: center;
                            font-size: 24rpx;
                            font-family: Anton;
                            font-weight: bold;
                            color: #afd9f7;
                            text-shadow: 0px 1px 0px #484bf6;
                        }
                        &.got {
                            .info-day {
                                color: #661e1e;
                            }
                            .info-bonus {
                                color: #661e1e;
                                text-shadow: 0px 1px 0px #d97d5d;
                            }
                        }
                        &.able {
                            .info-day {
                                color: #ffffff;
                            }
                            .info-bonus {
                                color: #afd9f7;
                                text-shadow: 0px 1px 0px #484bf6;
                            }
                        }
                        &.disabled {
                            .info-day {
                                color: #c5ced5;
                            }
                            .info-bonus {
                                color: #c5ced5;
                                text-shadow: 0px 1px 0px #6c6a6f;
                            }
                        }
                    }
                }
            }
            .collect,
            .buy {
                width: 612rpx;
                height: 85rpx;
                background: linear-gradient(0deg, #116a05, #40a015, #5ae31d);
                box-shadow: 2rpx 4rpx 19rpx 1rpx rgba(0, 0, 0, 0.5);
                border-radius: 42rpx;
                margin: 35rpx auto 0;
                color: #ffffff;
                line-height: 85rpx;
                font-size: 35rpx;
                font-family: Alfa Slab One;
                text-align: center;
                text-shadow: 0px 3rpx 0px rgba(0, 0, 0, 0.5);
                font-weight: bold;
            }
            .collect {
                background: linear-gradient(0deg, #ce495b, #e07c07, #f19528);
                &.disabled {
                    background: linear-gradient(
                        0deg,
                        #656565,
                        #9d9d9d,
                        #9d9d9d
                    );
                }
            }
        }
        .privilege-box {
            @apply relative;
            z-index: 2;
            width: 667rpx;
            height: 214rpx;
            background: rgba(0, 0, 0, 0.5);
            box-shadow: 0px 0px 11rpx 0px rgba(255, 255, 255, 0.85);
            border-radius: 14rpx;
            margin: 22rpx auto 0;
            .title {
                height: 52rpx;
                line-height: 52rpx;
                font-size: 22rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #ffffff;
                text-align: center;
            }
            .privileges {
                @apply flex justify-around;
                margin-top: 10rpx;
                padding: 0rpx 2rpx 0;
                .privilege {
                    @apply flex-1;
                    image {
                        width: 89rpx;
                        height: 89rpx;
                        display: block;
                        margin: 0 auto;
                    }
                    .text {
                        @apply flex justify-center items-center;
                        height: 48rpx;
                        font-size: 20rpx;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #ffffff;
                        line-height: 24rpx;
                        text-align: center;
                        margin-top: 6rpx;
                        transform: scale(0.88);
                    }
                }
            }
        }
        .rule-box {
            @apply relative;
            z-index: 2;
            width: 667rpx;
            background: rgba(255, 255, 255, 0);
            box-shadow: 0px 0px 11rpx 0px rgba(255, 255, 255, 0.85);
            border-radius: 14rpx;
            margin: 20rpx auto 0;
            padding-top: 10rpx;
            .title {
                height: 35rpx;
                font-size: 22rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #ffffff;
                height: 35rpx;
                text-align: center;
            }
            .rule {
                width: 610rpx;
                font-size: 22rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #ffffff;
                line-height: 28rpx;
                margin: 6rpx auto 0;
                padding-bottom: 30rpx;
            }
        }
        .item {
            height: 35rpx;
            line-height: 35rpx;
            margin-top: 5rpx;
            color: black;
            &.disabled {
                background-color: #efefef;
            }
            &.able {
                background-color: yellow;
            }
            &.got {
                background-color: red;
            }
        }
    }
    .popup-title {
        @apply flex items-center justify-center text-white-100;
        font-size: 33rpx;
        font-weight: bold;
        height: 100rpx;
    }
</style>
