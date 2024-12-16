<template>
    <view class="channel-view">
        <BalanceBoard />
        <CardSelect
            :pay-type="1"
            :page-type="2"
            :payParams="data.payParams"
            :checkCards="true"
            ref="RefCardSelect"
            class="card-select"
        />
        <WithdrawAmountSelect
          v-if="withdrawTempInfo.isOpenTempCash === true"
          :payParams="data.payParams"
          :amountList="withdrawTempInfo.cashAmonts"
          ref="RefAmountSelect"
          class="amount-select"
        />
        <template v-else-if="withdrawTempInfo.isOpenTempCash === false">
          <AmountAll
              :pay-type="1"
              :payParams="data.payParams"
              ref="RefAmountSelect"
              class="amount-select"
          />
          <view v-if="!hideAmountInfo" class="flex justify-between amount_info">
            <text>{{ $t('KEY_WITHDRAWAL_LIMIT') }}</text>
            <text>{{ store?.userInfo?.allowCashAmount || 0 }}</text>
          </view>
          <view v-if="!hideAmountInfo" class="flex justify-between amount_info">
            <text>{{ $t('KEY_WITHDRAWAL_TIMES') }}</text>
            <text>{{ store?.userInfo?.allowCashNum || 0 }}</text>
          </view>
          <view v-if="!hideAmountInfo" class="flex justify-between amount_info">
            <text>{{ $t('KEY_WITHDRAWAL_FEE') }}</text>
            <text>{{ _.floor((store?.userInfo?.cashRate || 0) * 100, 2) }}%</text>
          </view>
        </template>

        <view v-if="!data.btnloading">
          <view class="normal-btn bg-primary disabled" v-if="!canSubmit">
              {{ $t('KEY_COMMON_CONFIRM') }}
          </view>
          <view class="normal-btn bg-primary" v-else @click="confirm">
              {{ $t('KEY_COMMON_CONFIRM') }}
          </view>
        </view>
        <view class="normal-btn bg-primary disabled" v-if="data.btnloading">
            <img src="@/static/icon/button_loading.gif" alt="" />
        </view>

        <view class="tips">
            <view class="tips-title">{{ $t('KEY_PAY_BONUSTERMS') }}</view>
            <view v-html="$t('KEY_PIX_TIPS1')"></view>
        </view>
        <!-- <view class="service-view" @click="openChat">
            <img src="@/static/me/help-me.png" alt="" />
            <span>{{ $t('KEY_LOGIN_SUPPORT') }}</span>
        </view> -->
        <MoreList class="more-list" :list-data="getListData" />
        <!-- <view class="attention">
            <view>
                {{ $t('KEY_PIX_INFORMATION1') }}
            </view>
            <view>
                {{ $t('KEY_PIX_INFORMATION2') }}
            </view>
            <view>
                {{ $t('KEY_PIX_INFORMATION3') }}
            </view>
            <view>
                {{ $t('KEY_PIX_INFORMATION4') }}
            </view>
        </view> -->
    </view>
    <BindMobile
        ref="RefBindMobile"
        :showIcon="false"
        @bindSuccess="bindSuccess"
    ></BindMobile>
    <PayLoading
        ref="RefPayLoading"
        :successBtnText="$t('KEY_COMMON_OK')"
        :title="data.LoadingTitle"
        :orderId="data.orderId"
        @on-success="loadingOk"
        @pay-success="loadingEnd"
        @pay-faild="loadingFaild"
    />
    <!-- <WithdrawConfirm
        ref="RefWithdrawConfirm"
        :alert-data="data.withdrawConfirmData"
        @on-success="confirmOk"
        @on-faild="confirmCancel"
    /> -->
    <!-- <PaySuccessAlert
        ref="RefPaySuccessAlert"
        :alert-data="data.successAlertData"
        @on-success="paySuccessOk"
        @on-faild="paySuccessCancel"
    /> -->
    <!-- <PayFaildAlert
        ref="RefPayFaildAlert"
        :alert-data="data.faildAlertData"
        @on-success="payFaildOk"
        @on-faild="payFaildCancel"
    /> -->
    <CardErrorAlert
        ref="RefCardErrorAlert"
        :title="data.LoadingTitle"
        @on-success="cardErrorOk"
        @on-faild="cardErrorCancel"
    />
</template>

<script lang="ts" setup>
    import BalanceBoard from '@/lib/components/Pay/common/BalanceBoard.vue'
    import CardSelect from '@/lib/components/Pay/common/CardSelect.vue'
    import AmountAll from '@/lib/components/Pay/common/AmountAll.vue'
    import BindMobile from '@/lib/components/BindMobile/index.vue'
    import MoreList from '@/lib/components/Pay/common/MoreList.vue'
    import FundDetailImg from '@/static/me/chongzhijilu-me.png'
    import CardImg from '@/static/icon/card_info.png'
    // import FAQImg from '@/static/me/faq-me.png'
    import PayLoading from '@/lib/components/Pay/common/payLoading.vue'
    // import PayFaildAlert from '../../common/PayFaildAlert.vue'
    import CardErrorAlert from '../../common/CardErrorAlert.vue'
    // import WithdrawConfirm from '../../common/WithdrawConfirm.vue'
    // import { modal } from '@/lib/components/Modal/index'
    import { api as lobbyApi } from '@/NET/lobby'
    import { PayErrorCode } from '@/common/ErrorHandler'
    import { numberWithCommas } from '@/common/common'
    import { format } from 'date-fns'
    import _ from 'lodash'
    import { getPlatform } from "@/common/init"
    import WithdrawAmountSelect from '@/lib/components/Pay/common/WithdrawAmountSelect.vue'

    const { t: $t } = i18n.global
    const store = useUsersStore()
    const commonStore = useCommonStore()

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
        btnloading: boolean
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
        btnloading: false,
    })

    const withdrawTempInfo = ref<any>({
      cashAmonts: [],
      isOpenTempCash: null
    })

    const domain = getPlatform()
    const hideAmountInfo = computed(() => domain === 'max9f' && store.baseConfig.operatorId === 'own_lobby_bra999')

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
    const RefBindMobile = ref()

    const canSubmit = computed(() => {
        // if (!store.userInfo?.cashLimit) return false
        // let amount = data.payParams.amount
        // if (
        //     amount < store.userInfo?.cashLimit.minAmount ||
        //     amount > store.userInfo?.cashLimit.maxAmount
        // )
        //     return false
        // if (!data.payParams.cardNo) return false
        // if (store.userInfo?.requireFlowMoney > 0) return false
        return true
    })

    const getLang = (name) => {
        console.log(name)
        switch (name) {
            case 'minAmount':
                return $t('KEY_PIX_MINWITHDRAW')?.replace(
                    '#minAmount#',
                    store.userInfo?.cashLimit.minAmount
                )
                break
            case 'maxAmount':
                return $t('KEY_PIX_MAXWITHDRAW')?.replace(
                    '#maxAmount#',
                    store.userInfo?.cashLimit.maxAmount
                )
                break
            case 'flowMoney':
                return $t('KEY_PIX_FLOWMONEY')?.replace(
                    '#flowMoney#',
                    store.userInfo?.requireFlowMoney
                )
            default:
                return ''
        }
    }

    const confirm = () => {
        if (!data.payParams.cardNo) {
          return payFaildCancel()
        }
        let amount = data.payParams.amount
        if (withdrawTempInfo.value.isOpenTempCash === null) return
        if (withdrawTempInfo.value.isOpenTempCash) {
          if (!amount || amount <= 0) return
        }
        // console.log('amount', amount)
        // const isPay =
        //     amount < store.userInfo?.cashLimit.minAmount ||
        //     amount > store.userInfo?.cashLimit.maxAmount
        // console.log('isPay', isPay)
        if (
            // amount < store.userInfo?.cashLimit.minAmount ||
            amount > store.userInfo?.cashLimit.maxAmount
        ) {
            modal({
                width: '500rpx',
                type: 'warning',
                title: $t('KEY_POPUP_TIPS'),
                content:
                    amount < store.userInfo?.cashLimit.minAmount
                        ? getLang('minAmount')
                        : getLang('maxAmount'),
                cancelText: $t('KEY_ALERT_DEPOSIT_CANCEL'),
                confirmText: 'OK',
                showCancel: false,
                onConfirm: () => {},
                onCancel: () => {},
            })
            return
        }

        if (store.userInfo?.requireFlowMoney > 0 && !withdrawTempInfo.value.isOpenTempCash) {
            modal({
                width: '500rpx',
                type: 'warning',
                title: $t('KEY_POPUP_TIPS'),
                content: getLang('flowMoney'),
                cancelText: $t('KEY_ALERT_DEPOSIT_CANCEL'),
                confirmText: 'OK',
                showCancel: false,
                onConfirm: () => {},
                onCancel: () => {},
            })
            return
        }

        data.LoadingTitle = `${$t('KEY_TABBAR_WITHDRAW')} R$${
            data.payParams.amount
        }`
        if (data.payParams.bankType === 1) {
            openCardError()
        } else {
          if (withdrawTempInfo.value.isOpenTempCash) {
            data.withdrawConfirmData = {
                channelName: props.channel,
                amount: data.payParams.amount,
                bankName: data.payParams.bankName,
                bankNumber: data.payParams.cardNo,
                name: data.payParams.accName,
                address: '',
                birthday: '',
                city: '',
                bankCode: data.payParams.bankCode,
                serviceCharge: 0,
            }
            openConfirm()
            return
          }
            cashConfirm()
        }
    }

    const openModal = (cash) => {
        modal({
            width: '500rpx',
            type: 'warning',
            title: $t('KEY_POPUP_TIPS'),
            content: `${$t('KEY_ALERT_DEPOSIT_TIPS')}`.replace(
                '#bonus#',
                numberWithCommas(_.floor(cash, 2))
            ),
            cancelText: $t('KEY_ALERT_DEPOSIT_CANCEL'),
            confirmText: $t('KEY_ALERT_DEPOSIT_CONFIRM'),
            onConfirm: () => {
                commonStore.depositTab = 0
                uni.switchTab({
                    url: '/pages/deposit/index',
                })
            },
            onCancel: () => {},
        })
    }

    const openErrModal = (key, obj = {}, url?: string) => {
      modal({
          width: '500rpx',
          type: 'warning',
          title: $t('KEY_POPUP_TIPS'),
          content: $t(key, obj),
          cancelText: $t('KEY_ALERT_DEPOSIT_CANCEL'),
          confirmText: 'OK',
          showCancel: false,
          onConfirm: () => {
            if (url) {
              uni.navigateTo({
                  url,
                  fail() {
                      uni.switchTab({
                          url,
                      })
                  },
              })
            }
          },
          onCancel: () => {},
      })
    }

    // PIX 预下单
    const cashConfirm = async () => {
        data.btnloading = true
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                channel: props.channel,
                amount: data.payParams.amount,
                bankNumber: data.payParams.cardNo,
                name: data.payParams.accName,
                address: '',
                birthday: '',
                city: '',
                bankCode: data.payParams.bankCode,
            },
            store.commonParams
        )
        let res = await lobbyApi.profile.cashConfirm(params)
        data.btnloading = false
        if (res.success) {
            if (!res.result.data?.isMinPay) {
                openModal(res.result.data?.minPay)
                return
            }
            data.withdrawConfirmData = {
                channelName: props.channel,
                amount: data.payParams.amount,
                bankName: data.payParams.bankName,
                bankNumber: data.payParams.cardNo,
                name: data.payParams.accName,
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
            allPayErrorCode(res)
        }
    }

    // PIX 提现
    const braWithDraw = async () => {
        console.log(data.payParams)
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                channel: props.channel,
                amount: data.payParams.amount,
                userBankId: data.payParams.userBankID,
                channels: data.payParams.channels ? data.payParams.channels : 5,
            },
            store.commonParams
        )

        let res = await lobbyApi.profile.braWithDraw(params)
        if (res.success) {
            if (withdrawTempInfo.value.isOpenTempCash) {
              commonStore.refreshCashLoad++
              modal({
                  type: 'success',
                  width: '485rpx',
                  title: `${$t('KEY_WITHDRAW_POPUPTITLE')}`,
                  content: `${$t('KEY_PLEASE_WAIT')}`,
                  cancelText: 'cancel',
                  confirmText: `OK`,
                  showCancel: false,
                  onConfirm: () => {},
              })
            } else if (res.result.isAudit) {
                modal({
                    type: 'success',
                    width: '485rpx',
                    title: `${$t('KEY_WITHDRAW_POPUPTITLE')}`,
                    content: `${$t('KEY_WITHDRAW_POPUPCONTENT')}`,
                    cancelText: 'cancel',
                    confirmText: `OK`,
                    showCancel: false,
                    onConfirm: () => {},
                })
            } else {
                data.orderId = res.result.orderId
                openLoading()
            }
            getBalance()
            getVipInfo()
        } else {
            ErrorHandler(res, 'braWithdraw')
            allPayErrorCode(res)
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
      allPayErrorCode(res)
    }

    // 支付成功弹框function
    const RefPaySuccessAlert = ref()
    const openPaySuccess = () => {
        modal({
            type: 'success',
            width: '550rpx',
            title: $t('KEY_PAY_SUCCESSWITHDRAW'),
            content: `<view class="alert-detail">
                            ${data.successAlertData.channelName ? `<view class="flex justify-between items-center">
                                <view class="title">
                                    ${$t('KEY_PAY_CHANNEL')}
                                </view>
                                <view class="detail">
                                    ${data.successAlertData.channelName}
                                </view>
                            </view>` : ''}
                            <view class="flex justify-between items-center">
                                <view class="title">
                                    ${$t('KEY_PAY_REFERENCIA')}
                                </view>
                                <view class="detail">${
                                    data.successAlertData.orderId
                                }</view>
                            </view>
                            <view class="flex justify-between items-center">
                                <view class="title">${$t('KEY_PAY_TOTAL')}</view>
                                <view class="detail">${
                                    data.successAlertData.amount
                                }</view>
                            </view>
                            <view class="flex justify-between items-center">
                                <view class="title">${$t('KEY_PAY_TIME')}</view>
                                <view class="detail">
                                    ${format(
                                        new Date(data.successAlertData.recDate),
                                        'yyyy-MM-dd HH:mm'
                                    )}
                                </view>
                            </view>
                        </view>`,
            confirmText: $t('KEY_PAY_REDEPOSIT'),
            cancelText: $t('KEY_COMMON_OK'),
        })
        // RefPaySuccessAlert.value.changeIsShow(true)
    }

    // 支付失败弹框function
    const RefPayFaildAlert = ref()
    const openPayFaild = () => {
        modal({
            type: 'warning',
            width: '485rpx',
            title: data.faildAlertData.title,
            content: data.faildAlertData.detail,
            confirmText: $t('KEY_PAY_REPLACE'),
            cancelText: `+ ${$t('KEY_PAY_ADDCARD')}`,
            onCancel: payFaildCancel,
        })
        //RefPayFaildAlert.value.changeIsShow(true)
    }
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
    const openConfirm = () => {
        modal({
            type: 'cash',
            width: '485rpx',
            title: $t('KEY_PAY_POPMESSAGE1'),
            content: `<view class="alert-detail">
                            <view class="flex justify-between items-center">
                                <view class="title">
                                    ${$t('KEY_PAY_BANK')}
                                </view>
                                <view class="detail">
                                    ${data.withdrawConfirmData.bankName}
                                </view>
                            </view>
                            <view class="flex justify-between items-center">
                                <view class="title">
                                    ${$t('KEY_PAY_NO')}
                                </view>
                                <view class="detail">
                                    ${data.withdrawConfirmData.bankNumber}
                                </view>
                            </view>
                            <view class="flex justify-between items-center">
                                <view class="title">${$t('KEY_PAY_TOTAL')}</view>
                                <view class="detail">${
                                    data.withdrawConfirmData.amount
                                }</view>
                            </view>
                            <view class="flex justify-between items-center">
                                <view class="title">
                                    ${$t('KEY_PAY_DEDUCTION')}
                                </view>
                                <view class="detail">
                                    ${data.withdrawConfirmData.serviceCharge}
                                </view>
                            </view>
                        </view>`,
            confirmText: $t('KEY_COMMON_OK'),
            cancelText: $t('KEY_COMMON_REVISE'),
            onConfirm: confirmOk,
        })
    }
    const confirmOk = () => {
        braWithDraw()
    }

    const getBalance = async () => {
        if (!store.userInfo) return
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.initLobby.getBalance(params)
        if (res.success) {
            store.userInfo = Object.assign(store.userInfo, res.result)
        } else {
            ErrorHandler(res, 'getBalance')
        }
    }

    const getVipInfo = async () => {
        if (!store.userInfo) return
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.vip.vipGetVipInfoCreate(params)
        if (res.success) {
            store.userInfo = Object.assign(store.userInfo, res.result)
        } else {
            ErrorHandler(res, 'getVipInfo')
        }
    }

    const bindSuccess = () => {
        getBalance()
        getVipInfo()
    }

    const openChat = () => {
        // @ts-ignore
        $crisp.push(['do', 'chat:show'])
        // @ts-ignore
        $crisp.push(['do', 'chat:open'])
        return
    }

    function allPayErrorCode(res: any) {
      if (res.code === 'RS_CASH_NOTEXISTSMOBILE') {
          RefBindMobile.value.openDialog()
      } else if (res.code === 'RS_NOT_PAYLIMIT') {
        openErrModal('KEY_RS_NOT_PAYLIMIT', { domain: res.result })
      } else if (res.code === 'RS_BET_FLOW_NOT_COMPLETE') {
        openErrModal('KEY_RS_BET_FLOW_NOT_COMPLETE')
      } else if (res.code === 'RS_CASH_AMOUNT_MINLIMIT') {
        openErrModal('KEY_RS_CASH_AMOUNT_MINLIMIT', { domain: res.result })
      } else if (res.code === 'RS_DAY_CASH_AMOUNT_LIMIT' || res.code === 'RS_CASH_NUM_LIMIT') {
        openErrModal('KEY_RS_DAY_CASH_AMOUNT_LIMIT_RS_CASH_NUM_LIMIT')
      }/*  else if (res.code === 'RS_DAY_CASH_AMOUNT_LIMIT') {
        openErrModal('KEY_RS_DAY_CASH_AMOUNT_LIMIT', {}, '/pages/vip/index')
      } else if (res.code === 'RS_CASH_NUM_LIMIT') {
        openErrModal('KEY_RS_CASH_NUM_LIMIT', {}, '/pages/vip/index')
      } */ else if (res.code === 'RS_NOT_PAY') {
        openErrModal('KEY_RS_NOT_PAY')
      } else {
        data.faildAlertData.detail = PayErrorCode[res.code]
          ? PayErrorCode[res.code]
          : $t('KEY_MESSAGE_ERRORCODE17')
        openPayFaild()
      }
    }

    watch(() => commonStore.withdrawTempInfo, (e) => {
      if (e.cashAmonts) {
        withdrawTempInfo.value.isOpenTempCash = e?.isOpenTempCash || false
        withdrawTempInfo.value.cashAmonts = e?.cashAmonts || []
      }
    }, {
      deep: true,
      immediate: true
    })


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

    .amount_info {
      font-size: .875rem;
      color: #a8a8a8;
      margin-top: .9375rem;
    }

    .normal-btn,
    .primary-btn-disabled {
        margin-top: 80rpx;
        img {
            width: 50rpx;
            height: 50rpx;
        }
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
    .service-view {
        @apply flex items-center justify-center;
        img {
            width: 50rpx;
            height: 50rpx;
            margin-right: 10rpx;
            color: #17362d;
            margin-top: 20rpx;
        }
    }
    .tips {
        margin: 50rpx 0;
        font-size: 24rpx;
        color: #7c7c7c;
        line-height: 26rpx;
        // text-align: center;
        .tips-title {
            font-size: 26rpx;
            font-weight: 400;
            margin-bottom: 18rpx;
        }
    }
</style>
