<!-- 包赔活动 -->
<template>
    <view class="activity-view">
        <image
            class="w-full"
            src="@/static/activity/return-day.jpg"
            mode="widthFix"
        ></image>
        <view class="detail">
            <view class="card">
                <view class="card-detail">
                    <view class="card-item" style="background-color: aquamarine;">
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
                        <view class="tips">
                            {{ $t('KEY_ACTIVITY_RETURN_TOTAL') }}
                        </view>
                    </view>
                    <view class="card-item" style="background-color: bisque;" @click="goDetail">
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
                        <view class="tips">
                            {{ $t('KEY_ACTIVITY_RETURN_RECEIVEBONUS') }}
                        </view>
                    </view>
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
                    class="rules-content"
                    v-html="$t('KEY_ACITVITY_BETRETURN_TIPS')"
                ></view>
            </view>
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
            </view>
            <view class="scroll-view" v-if="data.pixCode !== ''">
                <qrCode :amount="data.amount" :pixCode="data.pixCode" />
            </view>
        </PopupBottom>
    </view>
</template>

<script lang="ts" setup>

    import { getAFid, numberWithCommas } from '@/common/common'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as activityApi } from '@/NET/activity'
    import _ from 'lodash'
    import PopupBottom from '@/lib/components/PopupBottom/index.vue'
    import qrCode from '@/lib/components/Pay/channel/PIX/qrCode.vue'
    const { t: $t } = i18n.global

    const store = useUsersStore()

    interface Data {
        rebateWater: any
        payParams: any
        taxId: string
        pixCode: string
        channels: number
        alertType: number
        alertConfig: any
        btnloading: boolean
        popupHeight: number
        amount: any
    }

    const data = reactive<Data>({
        rebateWater: {},
        payParams: {
            mobile: '',
            amount: 0,
            channelSelect: 0,
        },
        taxId: '',
        pixCode: 'https://www.baidu.com',
        channels: 5,
        alertType: 1,
        alertConfig: {},
        btnloading: false,
        popupHeight: 0,
        amount: 0,
    })

    const RefPopup = ref()

    const getRebateWater = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                // frequency: props.pageType,
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

    const pixDeposit = async () => {
        data.btnloading = true
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
            {
                userId: store.userInfo.userId,
                channels: data.channels,
                amount: data.payParams.amount,
                receiveBonus: 0,
                meta,
            },
            store.commonParams
        )
        let res = await lobbyApi.profile.braDeposit(params)
        if (res.success) {
            data.pixCode = res.result.qrCode
            data.amount = data.payParams.amount
            // uni.navigateTo({
            //     url: `/pages/pix_qrcode/index?pixCode=${data.pixCode}&amount=${data.payParams.amount}`,
            // })
            openPop(true)
        } else {
            ErrorHandler(res, 'pixDeposit')

            data.alertType = 2
            data.alertConfig = {
                title: `${$t('KEY_MESSAGE_ERRORCODE17')}`,
                content: res.message,
                btnText: `${$t('KEY_COMMON_OK')}`,
            }
            // openDialog()
        }
        data.btnloading = false
    }

    const goDetail = () => {
        console.log('goDetail')
        // show deposite dialog
        RefPopup.value.changeIsShow(true)
    }

    const openPop = (type) => {
        RefPopup.value.changeIsShow(type)
    }

    const maskClose = () => {
        data.pixCode = 'sssd'
    }

    const openDialog = () => {
        const type = data.alertType === 2 ? 'warning' : 'success'
        modal({
            type,
            width: '485rpx',
            title: data.alertConfig.title,
            content: data.alertConfig.content,
            confirmText: data.alertConfig.btnText,
            showCancel: false,
        })
    }

    watch(
        () => store.userInfo,
        () => {
            initData()
        }
    )

    const initData = () => {
        if (store.userInfo) {
            getRebateWater()
        }
    }

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
    .popup-title {
        @apply flex items-center justify-center text-white-100;
        font-size: 33rpx;
        font-weight: bold;
        height: 100rpx;
    }
    .scroll-view {
        @apply absolute left-0 right-0 bottom-0 overflow-y-auto;
        top: 100rpx;
    }
</style>
