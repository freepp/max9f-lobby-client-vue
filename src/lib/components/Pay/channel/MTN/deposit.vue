<template>
    <view class="channel-view">
        <PhoneSelect :payParams="data.payParams" class="amount-select" />
        <AmountSelect
            :pay-type="0"
            :payParams="data.payParams"
            ref="RefAmountSelect"
            class="amount-select"
        />
        <view class="primary-btn-disabled" v-if="!canSubmit">
            {{ $t('KEY_COMMON_CONFIRM') }}
        </view>
        <view class="primary-btn" v-else @click="confirm">
            {{ $t('KEY_COMMON_CONFIRM') }}
        </view>
        <MoreList class="more-list" :list-data="data.listData" />
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
    />
    <PaySuccessAlert
        ref="RefPaySuccessAlert"
        @on-success="paySuccessOk"
        @on-faild="paySuccessCancel"
    />
    <PayFaildAlert
        ref="RefPayFaildAlert"
        @on-success="payFaildOk"
        @on-faild="payFaildCancel"
    />
    <CardErrorAlert
        ref="RefCardErrorAlert"
        @on-success="cardErrorOk"
        @on-faild="cardErrorCancel"
    />
</template>

<script lang="ts" setup>
    import { reactive, ref, watch, computed } from 'vue'
    import AmountSelect from '@/lib/components/Pay/common/AmountSelect.vue'
    import PhoneSelect from '@/lib/components/Pay/common/PhoneSelect.vue'
    import MoreList from '@/lib/components/Pay/common/MoreList.vue'
    import FundDetailImg from '@/static/me/chongzhijilu-me.png'
    import FAQImg from '@/static/me/faq-me.png'
    import PayLoading from '@/lib/components/Pay/common/payLoading.vue'
    import PaySuccessAlert from '../../common/PaySuccessAlert.vue'
    import PayFaildAlert from '../../common/PayFaildAlert.vue'
    import CardErrorAlert from '../../common/CardErrorAlert.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { i18n } from '@/common/i18nConfig'
    import { ga } from '@/common/common'
    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Props {
        pageType?: number
        channel?: string
    }
    const props = withDefaults(defineProps<Props>(), {
        pageType: 0, //0: deposit 1: withdraw
        channel: '',
    })

    interface Data {
        listData?: any
        payParams: any
        LoadingTitle: string
        orderId: string
    }
    const data = reactive<Data>({
        payParams: {
            mobile: store.userInfo?.mobile,
            amount: 0,
        },
        listData: [
            {
                items: [
                    {
                        icon: FundDetailImg,
                        name: $t('KEY_PAGETITLE_FUNDDETAILS'),
                        path: '/pages/fund_details/index?page_type=1',
                    },
                    // {
                    //     icon: FAQImg,
                    //     name: $t('KEY_PAGETITLE_FAQ'),
                    //     path: '/pages/FAQ/index',
                    // },
                ],
            },
        ],
        LoadingTitle: '',
        orderId: '',
    })

    watch(
        () => store.userInfo,
        (val) => {
            data.payParams.mobile = store.userInfo?.mobile
        }
    )

    const RefAmountSelect = ref()

    const canSubmit = computed(() => {
        let amount = data.payParams.amount
        if (amount < 50 || amount > 50000) return false
        return true
    })

    const confirm = () => {
        data.LoadingTitle = `${$t('KEY_TABBAR_DEPOSIT')} ${
            store.baseConfig.countryId === 'BRA' ? 'R$' : '$'
        } ${data.payParams.amount}`
        hubtelDeposit()
    }

    const hubtelDeposit = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                channel: props.channel,
                amount: data.payParams.amount,
            },
            store.commonParams
        )
        let res = await lobbyApi.profile.hubtelDeposit(params)
        if (res.success) {
        } else {
            ErrorHandler(res, 'hubtelDeposit')
        }
        openLoading()
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
    const loadingEnd = () => {
        openPaySuccess()
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
        // RefCardSelect.value.openPop(true)
    }

    // 卡片异常弹框function
    const RefCardErrorAlert = ref()
    const openCardError = () => {
        RefCardErrorAlert.value.changeIsShow(true)
    }
    const cardErrorOk = () => {}
    const cardErrorCancel = () => {
        // RefCardSelect.value.openPop(true)
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
