<template>
    <Layout :headerTitle="$t('KEY_RED_INDEX_TITLE')" :hasHeader="true">
        <view class="red-view">
            <view class="red-header-space"></view>
            <view class="red-header-box">
                <view class="red-header-content">
                    <view class="banner" v-if="isShowBanner">
                        <image
                            src="@/static/activity/red-package/banner.png"
                            class="w-full h-full"
                        ></image>
                    </view>
                    <view class="broadcast">
                        <swiper
                            class="w-full h-full"
                            id="broadcaseSwiper"
                            circular
                            :indicator-dots="false"
                            :autoplay="autoplay"
                            :interval="2000"
                            :duration="500"
                            :vertical="true"
                            @animationfinish="animationfinish"
                        >
                            <swiper-item
                                v-for="(item, index) in withdrawRecords"
                            >
                                <view
                                    class="broadcast-item"
                                    :style="styles[index]"
                                    @transitionend="nextSwiper"
                                    v-html="
                                        $t('KEY_RED_WITHDRAW_GET')
                                            ?.replace(
                                                '#USERNAME#',
                                                item.userName
                                            )
                                            .replace('#BONUS#', item.amount)
                                    "
                                ></view>
                            </swiper-item>
                        </swiper>
                    </view>

                    <view class="price">R$ {{ numberWithCommas(price) }}</view>
                    <view class="progress-box">
                        <view class="progress-bg">
                            <view
                                class="progress-bg-inner"
                                :style="progressStyle"
                            ></view>
                        </view>
                        <view class="progress-val">{{ progressVal }}%</view>
                    </view>
                    <view class="steps-box">
                        <view class="step-names">
                            <view
                                :class="{ 'font-bold': step === 1 }"
                                v-html="$t('KEY_RED_INVITE_SPINE')"
                            ></view>
                            <view
                                :class="{ 'font-bold': step === 2 }"
                                v-html="$t('KEY_RED_INVITE_SIGN')"
                            ></view>
                            <view v-html="$t('KEY_RED_INVITE_WIN')"></view>
                        </view>
                        <view class="step-bgs">
                            <view v-show="step >= 1" class="dot"></view>
                            <view v-show="step >= 2" class="hor"></view>
                            <view v-show="step >= 2" class="dot"></view>
                            <view v-show="step >= 3" class="hor"></view>
                            <view v-show="step >= 3" class="dot"></view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="red-loop">
                <Turntable
                    :fetch="getNumber"
                    v-model="count"
                    @on-success="sus"
                    :is-first="true"
                ></Turntable>
                <view
                    class="rule-btn"
                    @click="toRule"
                    v-html="$t('KEY_RED_WITHDRAW_RULE')"
                ></view>
            </view>
        </view>
        <win-box
            :price="winPrice"
            v-if="isShowWin"
            :is-gold="true"
            @on-btn-click="onBtnClick"
            :showMask="true"
        ></win-box>
        <BindMobile
            ref="bindMobileRef"
            :is-show-close="false"
            :is-register="true"
            @registe-success="regSus"
        ></BindMobile>
    </Layout>
</template>
<script lang="ts" setup>
    import { ref, computed, watch, nextTick, onMounted } from 'vue'
    import { useUsersStore } from '@/store/userStore'
    import Layout from '@/lib/layout/Base.vue'
    import Turntable from '@/lib/components/RedPackage/turntable.vue'
    import WinBox from '@/lib/components/RedPackage/win_box.vue'
    import { numberWithCommas } from '@/common/common'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as activityApi } from '@/NET/activity'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { onShow, onHide } from '@dcloudio/uni-app'
    import BindMobile from '@/lib/components/BindMobile/index.vue'
    import { modal } from '@/lib/components/Modal'
    import { i18n } from '@/common/i18nConfig'
    const { t: $t } = i18n.global

    let modalRef = null
    const openPayFaild = () => {
        modalRef = modal({
            width: '485rpx',
            type: 'guest',
            zIndex: 201,
            title: $t('KEY_PAY_POPMESSAGE2'),
            content: $t('KEY_PAY_POPMESSAGE3'),
            confirmText: $t('KEY_FORMBTN_LOGIN'),
            cancelText: $t('KEY_FORMBTN_REGISTER'),
            maskClosable: false,
            onConfirm() {
                payFaildOk()
            },
            onCancel() {
                payFaildCancel()
            },
        })
        //RefPayFaildAlert.value.changeIsShow(true)
    }
    const payFaildOk = () => {
        uni.navigateTo({
            url: `../../pages/login/index?login_mode=2`,
        })
        console.log('ok')
    }
    const payFaildCancel = () => {
        uni.navigateTo({
            url: `../../pages/register/index?login_mode=2`,
        })
        console.log('cancel')
    }

    const bindMobileRef = ref(null)
    const store = useUsersStore()
    const count = ref(0)
    const price = ref(0)
    const total = ref(10000)
    const step = ref(2)
    // 显示赢奖弹窗
    const isShowWin = ref(false)
    // 显示banner
    const isShowBanner = ref(true)
    const winPrice = ref(0)
    const sus = (val) => {
        if (val > 0) {
            price.value += val
            winPrice.value = val
            isShowWin.value = true
        }
        isShowBanner.value = false
    }
    const withdrawRecords = ref([])
    const getWithdrawRecord = async () => {
        let params = Object.assign(
            {},
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        // const res = await lobbyApi.redpack.redpackRecord(params)
        const res = await activityApi.redpack.redpackRedpackRecordCreate(params)
        if (res.success) {
            withdrawRecords.value = res.result
        } else {
            ErrorHandler(res, 'getWithdrawRecord')
        }
    }
    const regSus = () => {
        uni.setStorageSync('redPackageRolled', '1')
    }
    const toRule = () => {
        uni.navigateTo({
            url: '/pages/red_package/rule',
        })
    }
    const getNumber = async (): Promise<number> => {
        let params = Object.assign(
            {},
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        const res = await activityApi.redpack.redpackRaffleCreate(params);
        if (res.success) {
            return res.result.prizeAmount
            // drawableAmount.value = 1
        } else {
            ErrorHandler(res, 'getNumber')
        }
    }
    const onBtnClick = async () => {
        isShowWin.value = false
        isShowBanner.value = false
        await getInfo()
        //openPayFaild();
        //bindMobileRef.value.openDialog(true)
    }
    const progress = computed(() => {
        return Number(
            Math.min((price.value / total.value) * 100, 100).toFixed(2)
        )
    })
    const progressVal = computed(() => {
        return numberWithCommas(progress.value)
    })
    const progressStyle = computed(() => {
        return {
            width: progress.value + '%',
        }
    })
    const getInfo = async () => {
        let params = Object.assign(
            {},
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        // const res = await lobbyApi.redpack.packInfo(params)
        const res = await activityApi.redpack.redpackPackInfoCreate(params)
        if (res.success) {
            price.value = res.result.amount
            count.value = res.result.remainingNum
            total.value = res.result.packAmount
            // 首次进来显示banner 抽奖后不显示
            if (!(res.result.amount === 0 && res.result.remainingNum === 1)) {
                isShowBanner.value = false
                if (store.userInfo?.userMode === 1) {
                    //bindMobileRef.value.openDialog(true)
                    nextTick(() => {
                        openPayFaild()
                    })
                }
            }
        } else {
            ErrorHandler(res, 'getInfo')
        }
    }
    const initData = () => {
        // 至少需要有用户id
        if (store.userInfo?.userId) {
            getInfo()
            getWithdrawRecord()
        }
    }
    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )
    onMounted(() => {
        initData()
    })
    const autoplay = ref(true)
    // 横向transition动画结束回调 切换autoplay的值
    const nextSwiper = () => {
        // console.log('autoplay')
        autoplay.value = true
    }
    const styles = ref<any>([])
    const rects = ref<any>([])
    let swiperWidth = 0
    const calcedstyles = ref<any>([])
    // 计算每项需要横向滚动的像素
    const calcStyles = () => {
        calcedstyles.value = []
        rects.value?.forEach((item, index) => {
            const itemWidth = rects.value?.[index]?.width
            let dis = -1
            if (swiperWidth && itemWidth) {
                dis = swiperWidth - itemWidth
            }
            calcedstyles.value.push({
                transform: `translateX(${dis}px)`,
            })
        })
    }
    const animationfinish = (current, source) => {
        // autoplay.value = false
        const index = current.detail.current
        // console.log('animationfinish', source)
        if (index + 1 > calcedstyles.value.length) {
            styles.value[0] = {}
        } else {
            styles.value[index + 1] = {}
        }
        styles.value[index] = calcedstyles.value[index]
        styles.value[index] = calcedstyles.value[index]
    }
    const initScroll = () => {
        // 查询总宽度 以及每项的宽度
        const query = uni.createSelectorQuery().in(this)
        query.select('#broadcaseSwiper').boundingClientRect((data: any) => {
            swiperWidth = data?.width
        })
        query.selectAll('.broadcast-item').boundingClientRect((data) => {
            rects.value = data
        })
        query.exec()
        nextTick(() => {
            calcStyles()
            styles.value[0] = calcedstyles.value[0]
        })
    }
    watch(
        () => withdrawRecords.value,
        (val) => {
            nextTick(() => {
                initScroll()
            })
        }
    )
    const mounted = ref(false)
    onShow(() => {
        if (mounted.value) {
            nextSwiper()
        }
    })

    onHide(() => {
        modalRef && modalRef.close()
    })


</script>
<style lang="scss">
    .yellow {
        color: #ffd800;
    }
    .red-view {
        height: 100%;
        min-height: 1100rpx;
        background: radial-gradient(circle, #fe3752, #ed3b4b, #4c3b92, #270a41);
        .red-header-box {
            @apply relative;
            width: 750rpx;
            height: 398rpx;
            background: url(@/static/activity/red-package/invite_bg.png);
            background-size: 100% 100%;
            margin: 0 auto;

            .red-header-content {
                @apply box-border;
                width: 667rpx;
                height: 309rpx;
                border-radius: 14rpx;
                margin: 0 auto;
                position: relative;
                padding-top: 22rpx;
                .banner {
                    width: 603rpx;
                    height: 244rpx;
                    position: absolute;
                    top: 82rpx;
                    left: 32rpx;
                    z-index: 5;
                }
                .broadcast {
                    width: 495rpx;
                    height: 44rpx;
                    font-size: 22rpx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #ffffff;
                    line-height: 44rpx;
                    text-align: center;
                    margin-left: 110rpx;
                    .broadcast-item {
                        display: inline-block;
                        height: 100%;
                        min-width: 497rpx;
                        transition: transform 2.5s linear;
                        white-space: nowrap;
                    }
                }
                .price {
                    height: 67rpx;
                    font-size: 67rpx;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: #ffd800;
                    line-height: 70rpx;
                    text-shadow: 2rpx 3rpx 3rpx rgba(1, 0, 26, 0.35);
                    text-align: center;
                    margin-top: 14rpx;
                }
                .progress-box {
                    width: 409rpx;
                    margin: 24rpx auto 0;
                    @apply relative flex justify-center items-center;
                    .progress-val {
                        @apply absolute top-0;
                        font-size: 22rpx;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #ffffff;
                        line-height: 24rpx;
                        padding-left: 12rpx;
                        right: 0;
                        transform: translate3d(100%, 0, 0);
                    }
                    .progress-bg {
                        width: 409rpx;
                        height: 21rpx;
                        box-shadow: 1rpx 2rpx 0px 0px rgba(255, 255, 255, 0.66);
                        background: rgba(0, 0, 0, 0.5);
                        border-radius: 11px;
                        .progress-bg-inner {
                            width: 341rpx;
                            height: 21rpx;
                            background: linear-gradient(
                                180deg,
                                #ffe400,
                                #b16c00
                            );
                            border-radius: inherit;
                            transition: width 0.5s linear;
                        }
                    }
                }
                .steps-box {
                    margin-top: 43rpx;
                    .step-names {
                        @apply relative;
                        width: 428rpx;
                        height: 26rpx;
                        font-size: 22rpx;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #ffffff;
                        line-height: 26rpx;
                        margin: 0 auto;
                        view:nth-child(1) {
                            position: absolute;
                            top: 0;
                            left: 0;
                            transform: translate3d(-38%, 0, 0);
                        }
                        view:nth-child(2) {
                            position: absolute;
                            top: 0;
                            left: 50%;
                            transform: translate3d(-50%, 0, 0);
                        }
                        view:nth-child(3) {
                            position: absolute;
                            top: 0;
                            right: 0;
                            transform: translate3d(38%, 0, 0);
                        }
                    }
                    .step-bgs {
                        @apply flex justify-start items-center;
                        width: 428rpx;
                        height: 38rpx;
                        background: url(@/static/activity/red-package/invite_progress.png);
                        background-size: 100% 100%;
                        margin: 11rpx auto 0;
                        padding-right: 6rpx;
                        .dot {
                            width: 26rpx;
                            height: 26rpx;
                            background: linear-gradient(
                                180deg,
                                #f2f047,
                                #1ed94f
                            );
                            border-radius: 50%;
                            margin-left: -4rpx;
                            &:first-child {
                                margin-left: 5rpx;
                            }
                        }
                        .hor {
                            width: 180rpx;
                            height: 14rpx;
                            background: linear-gradient(
                                180deg,
                                #f2f047,
                                #1ed94f
                            );
                            margin-left: -4rpx;
                        }
                    }
                }
                .share-btn {
                    width: 601rpx;
                    height: 77rpx;
                    line-height: 77rpx;
                    background: linear-gradient(
                        0deg,
                        #d40e29,
                        #f82e49,
                        #ff3a54
                    );
                    box-shadow: 2rpx 2rpx 11rpx 0rpx rgba(0, 0, 0, 0.5);
                    border-radius: 14rpx;
                    font-size: 28rpx;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: #ffffff;
                    text-shadow: 2rpx 2rpx 0rpx rgba(0, 0, 0, 0.5);
                    text-align: center;
                    margin: 12rpx auto 0;
                }
                .withdraw-btn {
                    width: 141rpx;
                    height: 57rpx;
                    line-height: 57rpx;
                    text-align: center;
                    background: linear-gradient(
                        0deg,
                        #d40e29,
                        #f82e49,
                        #ff3a54
                    );
                    border-radius: 29rpx;
                    position: absolute;
                    top: 26rpx;
                    right: 17rpx;
                    font-size: 22rpx;
                    font-weight: bold;
                    color: #ffffff;
                }
            }
        }
        .red-loop {
            @apply relative;
            width: 718rpx;
            height: 690rpx;
            margin: -30rpx auto 0;
            .rule-btn {
                @apply absolute underline text-right;
                width: 180rpx;
                height: 30rpx;
                font-size: 28rpx;
                font-weight: 400;
                color: #ffffff;
                line-height: 30rpx;
                text-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.35);
                right: 45rpx;
                top: 610rpx;
                text-align: right;
            }
        }
    }
</style>
