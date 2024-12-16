<template>
  <view class="channel-view">
      <BalanceBoard :amountToWithdraw="amountToWithdraw" />
      <CardSelect
          :pay-type="1"
          :page-type="2"
          :payParams="data.payParams"
          :checkCards="true"
          :noCashLoad="true"
          ref="RefCardSelect"
          class="card-select"
      />
    <AmountAll
          :pay-type="1"
          :payParams="data.payParams"
          :amountToWithdraw="amountToWithdraw"
          ref="RefAmountSelect"
          class="amount-select"
      />
      <view class="normal-btn bg-primary" @click="confirm">
          {{ $t('KEY_COMMON_CONFIRM') }}
      </view>
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
      :zIndex="9999"
      @on-success="loadingOk"
      @pay-success="loadingEnd"
      @pay-faild="loadingFaild"
  />
  <CardErrorAlert
      ref="RefCardErrorAlert"
      :title="data.LoadingTitle"
      :zIndex="9999"
      @on-success="cardErrorOk"
      @on-faild="cardErrorCancel"
  />
</template>

<script lang="ts" setup>
  import BalanceBoard from './BalanceBoard.vue'
  import CardSelect from '@/lib/components/Pay/common/CardSelect.vue'
  import AmountAll from './AmountAll.vue'
  import BindMobile from '@/lib/components/BindMobile/index.vue'
  // import MoreList from '@/lib/components/Pay/common/MoreList.vue'
  import FundDetailImg from '@/static/me/chongzhijilu-me.png'
  import CardImg from '@/static/icon/card_info.png'
  import PayLoading from '@/lib/components/Pay/common/payLoading.vue'
  import CardErrorAlert from '@/lib/components/Pay/common/CardErrorAlert.vue'
  import { api as lobbyApi } from '@/NET/lobby'
  import { PayErrorCode } from '@/common/ErrorHandler'
  import { numberWithCommas } from '@/common/common'
  import { format } from 'date-fns'
  import _ from 'lodash'

  const { t: $t } = i18n.global
  const store = useUsersStore()
  const commonStore = useCommonStore()

  interface Props {
      channel?: string
      amountToWithdraw: number
      refresh: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
      channel: '',
      amountToWithdraw: 0,
      refresh: false
  })

  const emit = defineEmits(['refreshData'])

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
  const RefBindMobile = ref()

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
    if (!data.payParams.amount || data.payParams.amount <= 0 || data.payParams.amount > props.amountToWithdraw) return
    if (data.payParams.bankType === 1) {
        openCardError()
    } else {
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
              withDrawType: 1
          },
          store.commonParams
      )
      let res = await lobbyApi.profile.cashConfirm(params)
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
              withDrawType: 1
          },
          store.commonParams
      )

      let res = await lobbyApi.profile.braWithDraw(params)
      if (res.success) {
          if (res.result.isAudit) {
              modal({
                  type: 'success',
                  width: '485rpx',
                  title: `${$t('KEY_WITHDRAW_POPUPTITLE')}`,
                  content: `${$t('KEY_WITHDRAW_POPUPCONTENT')}`,
                  cancelText: 'cancel',
                  confirmText: `OK`,
                  showCancel: false,
                  onConfirm: () => {
                    emit('refreshData')
                  },
              })
          } else {
              data.orderId = res.result.orderId
              openLoading()
              nextTick(() => {
                emit('refreshData')
              })
          }
          getBalance()
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

  const bindSuccess = () => {
      getBalance()
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
    } */ else {
      data.faildAlertData.detail = PayErrorCode[res.code]
        ? PayErrorCode[res.code]
        : $t('KEY_MESSAGE_ERRORCODE17')
      openPayFaild()
    }
  }



  watch(() => props.refresh, (v) => {
    if (v) {
      RefCardSelect?.value?.initData()
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

  .normal-btn,
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
