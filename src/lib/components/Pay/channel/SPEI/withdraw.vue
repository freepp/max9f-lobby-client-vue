<template>
    <view class="channel-view">
        <CardSelect
            :pay-type="1"
            :page-type="2"
            :payParams="data.payParams"
            :checkCards="true"
            ref="RefCardSelect"
            class="card-select"
        />
        <AmountSelect
            :pay-type="1"
            :payParams="data.payParams"
            ref="RefAmountSelect"
            class="amount-select"
        />
        <view class="normal-btn bg-primary disabled" v-if="!canSubmit">
            {{ $t('KEY_COMMON_CONFIRM') }}
        </view>
        <view class="normal-btn bg-primary" v-else @click="confirm">
            {{ $t('KEY_COMMON_CONFIRM') }}
        </view>
        <MoreList class="more-list" :list-data="getListData" />
        <view class="attention">
            <view>
                {{ $t('KEY_PAY_INFORMATION1') }}
            </view>
            <view>
                {{ $t('KEY_PAY_INFORMATION2') }}
            </view>
            <view>
                {{ $t('KEY_PAY_INFORMATION3') }}
            </view>
            <view>
                {{ $t('KEY_PAY_INFORMATION4') }}
            </view>
        </view>
    </view>
    <PayLoading
        ref="RefPayLoading"
        :successBtnText="$t('KEY_COMMON_OK')"
        :title="data.LoadingTitle"
        :orderId="data.orderId"
        @on-success="loadingOk"
        @pay-success="loadingEnd"
        @pay-faild="loadingFaild"
    />
    <WithdrawConfirm
        ref="RefWithdrawConfirm"
        :alert-data="data.withdrawConfirmData"
        @on-success="confirmOk"
        @on-faild="confirmCancel"
    />
    <PaySuccessAlert
        ref="RefPaySuccessAlert"
        :alert-data="data.successAlertData"
        @on-success="paySuccessOk"
        @on-faild="paySuccessCancel"
    />
    <PayFaildAlert
        ref="RefPayFaildAlert"
        :alert-data="data.faildAlertData"
        @on-success="payFaildOk"
        @on-faild="payFaildCancel"
    />
    <CardErrorAlert
        ref="RefCardErrorAlert"
        :title="data.LoadingTitle"
        @on-success="cardErrorOk"
        @on-faild="cardErrorCancel"
    />
</template>

<script lang="ts" setup>
    import { reactive, ref, computed } from 'vue'
    import CardSelect from '@/lib/components/Pay/common/CardSelect.vue'
    import AmountSelect from '@/lib/components/Pay/common/AmountSelect.vue'
    import MoreList from '@/lib/components/Pay/common/MoreList.vue'
    import FundDetailImg from '@/static/me/chongzhijilu-me.png'
    import CardImg from '@/static/icon/card_info.png'
    import FAQImg from '@/static/me/faq-me.png'
    import PayLoading from '@/lib/components/Pay/common/payLoading.vue'
    import PaySuccessAlert from '../../common/PaySuccessAlert.vue'
    import PayFaildAlert from '../../common/PayFaildAlert.vue'
    import CardErrorAlert from '../../common/CardErrorAlert.vue'
    import WithdrawConfirm from '../../common/WithdrawConfirm.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler, PayErrorCode } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { ga } from '@/common/common'
    import { i18n } from '@/common/i18nConfig'
    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Props {
        pageType?: number
        channel?: string
    }
    const props = withDefaults(defineProps<Props>(), {
        pageType: 1, //0: deposit 1: withdraw
        channel: '',
    })

    interface Data {
        payParams: any
        LoadingTitle: string
        orderId: string
        successAlertData: any
        faildAlertData: any
        withdrawConfirmData: any
    }
    const data = reactive<Data>({
        payParams: {
            amount: 0,
        },
        LoadingTitle: '',
        orderId: '',
        faildAlertData: {
            title: $t('KEY_PAY_WITHFAILD'),
            detail: $t('KEY_PAY_ERRORMESSAGE'),
        },
        successAlertData: {},
        withdrawConfirmData: {},
    })

    const getListData = computed(() => {
        let listData = [
            {
                items: [
                    {
                        icon: CardImg,
                        name: $t('KEY_PAGETITLE_CARDINFO'),
                        path: '/pages/card_list/index',
                    },
                    {
                        icon: FundDetailImg,
                        name: $t('KEY_PAGETITLE_FUNDDETAILS'),
                        path: '/pages/fund_details/index?page_type=2',
                    },
                    // {
                    //     icon: FAQImg,
                    //     name: $t('KEY_PAGETITLE_FAQ'),
                    //     path: '/pages/FAQ/index',
                    // },
                ],
            },
        ]
        return listData
    })

    const RefAmountSelect = ref()
    const RefCardSelect = ref()

    const canSubmit = computed(() => {
        let amount = data.payParams.amount
        if (amount < 100 || amount > 50000) return false
        if (!data.payParams.cardNo) return false
        return true
    })

    const confirm = () => {
        data.LoadingTitle = `${$t('KEY_TABBAR_WITHDRAW')} ${
            store.baseConfig.countryId === 'BRA' ? 'R$' : '$'
        } ${data.payParams.amount}`
        if (data.payParams.bankType === 1) {
            openCardError()
        } else {
            cashConfirm()
        }
    }

    // SPEI 预下单
    const cashConfirm = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                channel: props.channel,
                amount: data.payParams.amount,
                bankNumber: data.payParams.cardNo,
                name: data.payParams.userName,
                address: '',
                birthday: '',
                city: '',
                bankCode: data.payParams.bankCode,
            },
            store.commonParams
        )
        let res = await lobbyApi.profile.cashConfirm(params)
        if (res.success) {
            data.withdrawConfirmData = {
                channelName: props.channel,
                amount: data.payParams.amount,
                bankName: data.payParams.bankName,
                bankNumber: data.payParams.cardNo,
                name: data.payParams.userName,
                address: '',
                birthday: '',
                city: '',
                bankCode: data.payParams.bankCode,
                serviceCharge: res.result.serviceCharge,
            }
            openConfirm()
            // data.orderId = res.result.orderId
            // openLoading()
        } else {
            ErrorHandler(res, 'cashConfirm')
            data.faildAlertData.detail = PayErrorCode[res.message]
                ? PayErrorCode[res.message]
                : $t('KEY_MESSAGE_ERRORCODE17')
            openPayFaild()
        }
    }

    // SPEI 提现
    const speiWithdraw = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                channel: props.channel,
                amount: data.payParams.amount,
                bankNumber: data.payParams.cardNo,
                name: data.payParams.userName,
                address: '',
                birthday: '',
                city: '',
                bankCode: data.payParams.bankCode,
            },
            store.commonParams
        )
        
        let res = await lobbyApi.profile.speiWithdraw(params)
        if (res.success) {
            data.orderId = res.result.orderId
            openLoading()
        } else {
            
            ErrorHandler(res, 'speiWithdraw')
            data.faildAlertData.detail = PayErrorCode[res.message]
                ? PayErrorCode[res.message]
                : $t('KEY_MESSAGE_ERRORCODE17')
            openPayFaild()
        }
    }

    // 支付loading弹框function
    const RefPayLoading = ref()
    const openLoading = () => {
        RefPayLoading.value.changeIsShow(true)
    }
    const loadingOk = () => {
        // console.log('OK')
        openPaySuccess()
    }
    const loadingEnd = (res) => {
        data.successAlertData = res
        console.log(data.successAlertData)
        openPaySuccess()
    }

    const loadingFaild = (res) => {
        data.faildAlertData.detail = PayErrorCode[res.message]
            ? PayErrorCode[res.message]
            : $t('KEY_MESSAGE_ERRORCODE17')
        openPayFaild()
    }

    // 支付成功弹框function
    const RefPaySuccessAlert = ref()
    const openPaySuccess = () => {
        RefPaySuccessAlert.value.changeIsShow(true)
    }
    const paySuccessOk = () => {}
    const paySuccessCancel = () => {}

    // 支付失败弹框function
    const RefPayFaildAlert = ref()
    const openPayFaild = () => {
        RefPayFaildAlert.value.changeIsShow(true)
    }
    const payFaildOk = () => {}
    const payFaildCancel = () => {
        RefCardSelect.value.openPop(true)
    }

    // 卡片异常弹框function
    const RefCardErrorAlert = ref()
    const openCardError = () => {
        RefCardErrorAlert.value.changeIsShow(true)
    }
    const cardErrorOk = () => {}
    const cardErrorCancel = () => {
        RefCardSelect.value.openPop(true)
    }

    // 提款确认
    const RefWithdrawConfirm = ref()
    const openConfirm = () => {
        RefWithdrawConfirm.value.changeIsShow(true)
    }
    const confirmOk = () => {
        speiWithdraw()
    }
    const confirmCancel = () => {
        RefWithdrawConfirm.value.changeIsShow(false)
    }

    
</script>

<style lang="scss">
    .channel-view {
        padding: 0 40rpx;
    }

    .card-select {
        margin-top: 30rpx;
    }

    .amount-select {
        margin-top: 30rpx;
    }

    .primary-btn,
    .primary-btn-disabled {
        margin-top: 80rpx;
    }

    .more-list {
        margin-top: 80rpx;
    }

    .attention {
        margin: 50rpx 0;
        font-size: 20rpx;
        color: #7c7c7c;
        line-height: 28rpx;
    }
</style>
