<template>
    <!-- <view class="banner">
        <BannerImg :position="5"></BannerImg>
    </view> -->
    <view class="channel-view">
        <ChannelSelect
            :pay-type="0"
            :payParams="data.payParams"
            :channelList="data.channelList"
            :bonusChoosed="data.bonusChoosed"
            :channels="data.channels"
            ref="RefChannelSelect"
            class="amount-select"
        />

        <!-- <BonusTabs @tab-change="tabChange" :tab-data="data.bonusTabs" /> -->

        <!-- <PhoneSelect :payParams="data.payParams" class="amount-select" /> -->

        <AmountSelect
            :pay-type="0"
            :payParams="data.payParams"
            :amountList="data.amountList"
            :bonusChoosed="data.bonusChoosed"
            :channels="data.channels"
            ref="RefAmountSelect"
            class="amount-select"
        />

        <uni-view class="bonus-power-box">
          <uni-view>
            {{ $t('KEY_RECEBER_DEPOSIT_BONUS') }}
          </uni-view>
          <uni-view class="switch">
            <uni-view class="switch-innner" :class="{on: !data.bonusChoosed}" @click="switchChange">
              {{ !data.bonusChoosed ? $t('KEY_FUNDDETAILS_BONUS') : $t('KEY_PAY_NOBONUS') }}
            </uni-view>
          </uni-view>
        </uni-view>

        <view v-if="!data.btnloading">
            <view class="normal-btn bg-primary disabled" v-if="!canSubmit">
                {{ $t('KEY_PAGETITLE_DEPOSIT') }}
            </view>
            <view class="normal-btn bg-primary" v-else @click="confirm">
                {{ $t('KEY_PAGETITLE_DEPOSIT') }}
            </view>
        </view>

        <view class="normal-btn bg-primary disabled" v-if="data.btnloading">
            <img src="@/static/icon/button_loading.gif" alt="" />
        </view>

        <view class="tips">
            <view class="tips-title">{{ $t('KEY_PAY_BONUSTERMS') }}</view>
            <view v-html="$t('KEY_PIX_TIPS1')"></view>
        </view>

        <!-- <view class="service-position" @click="openChat">
            <img src="@/static/pay/chat.png" alt="" />
        </view> -->

        <MoreList class="more-list" :list-data="data.listData" />
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
        <PopupMessage ref="RefMessage" />
        <PopupBottom
            ref="RefPopup"
            :height="data.popupHeight"
            :background="'var(--UI-BG)'"
            :noBorder="true"
            :zIndex="zIndex"
            @mask-click="maskClose"
        >
            <view class="popup-title">
                {{ $t('KEY_TABBAR_DEPOSIT') }}
            </view>
            <view class="scroll-view" v-if="data.pixCode !== ''">
                <qrCode :amount="data.amount" :pixCode="data.pixCode" :orderId="data.orderId" :payChannel="data.payChannel" />
            </view>
        </PopupBottom>
        <Assistanter
            ref="assistanterRef"
            :z-index="1500"
            @on-close="onAssistanterClose"
            :content="
                commonStore.assistanterList.find((item) => item.tipsId === 2)
                    ?.template
            "
        ></Assistanter>
    </view>
</template>

<script lang="ts" setup>
    import ChannelSelect from '@/lib/components/Pay/common/ChannelSelect.vue'
    import AmountSelect from '@/lib/components/Pay/common/DepositAmountSelect.vue'
    import PopupBottom from '@/lib/components/PopupBottom/index.vue'
    import MoreList from '@/lib/components/Pay/common/MoreList.vue'
    // import BonusTabs from '@/lib/components/Pay/common/BonusTabs.vue'
    import qrCode from './qrCode.vue'
    import FundDetailImg from '@/static/me/chongzhijilu-me.png'
    // import FAQImg from '@/static/me/faq-me.png'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as activityApi } from '@/NET/activity'

    import { formRules, pageConfig } from './fromConfig'
    import { getAFid,queryURLParams } from '@/common/common'
    import { currentActivity, getCurrentActivity } from '@/common/activity'
    import BannerImg from '@/lib/components/BannerImg.vue'
    import Assistanter from '@/lib/components/Assistanter/index.vue'

    const { t: $t } = i18n.global
    const store = useUsersStore()
    const commonStore = useCommonStore()

    interface Props {
        pageType?: number
        channel?: string
        zIndex?: number
    }

    const props = withDefaults(defineProps<Props>(), {
        pageType: 0, //0: deposit 1: withdraw
        channel: '',
        zIndex: 2035
    })

    interface Data {
        listData?: any
        payParams: any
        pageType: string
        taxId: string
        pixCode: string
        payChannel: string
        orderId: string
        qrcode: string
        formConfig: any
        formData: any
        formRules: any
        channels: number
        allChannels: any
        channelList: any
        amountList: any
        alertType: number
        alertConfig: any
        btnloading: boolean
        popupHeight: number
        bonusChoosed: number
        bonusTabs: any
        bannerData: any
        amount: any
        payChannels?: string | number
    }
    const data = reactive<Data>({
        payParams: {
            mobile: '',
            amount: 0,
            channelSelect: 0,
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
        formConfig: pageConfig['braPIX'].formConfig,
        formData: {
            accName: '',
            taxId: '',
            key: '',
        },
        formRules,
        pageType: 'input',
        taxId: '',
        pixCode: '',
        payChannel: '',
        orderId: '',
        qrcode: '',
        channels: 5,
        allChannels: {},
        channelList: [],
        amountList: [],
        alertType: 1,
        alertConfig: {},
        btnloading: false,
        popupHeight: 0,
        bonusChoosed: 0,
        bannerData: {},
        bonusTabs: [
            {
                id: 0,
                name: $t('KEY_PAY_BONUS'),
            },
            {
                id: 1,
                name: $t('KEY_PAY_NOBONUS'),
            },
        ],
        amount: 0,
        payChannels: '',
    })
    const RefForm = ref()
    const RefMessage = ref()
    const RefChannelSelect = ref()
    const RefAmountSelect = ref()
    const RefPopup = ref()
    const assistanterRef = ref(null)

    const onAssistanterClose = () => {

    }
    const maskClose = () => {
        data.pixCode = ''
        data.orderId = ''
        data.payChannel = ''
    }

    const getCookie = (cookieName) => {
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            const cookieParts = cookie.split('=')
            const name = decodeURIComponent(cookieParts[0])
            if (name === cookieName) {
                if (cookieParts.length === 2) {
                    const value = decodeURIComponent(cookieParts[1])
                    return value
                }
            }
        }
    }

    const pixDeposit = async () => {
        var param = queryURLParams()
        var fbc = getCookie('_fbc')
        var fbp = getCookie('_fbp')
        var bbg = param.bbg || getCookie('_bge_bbg')
        let meta = {
            // clickid: localStorage.getItem('click_id'),
            clickid: uni.getStorageSync('click_id'),
            AFID: getAFid(),
            fbc: fbc,
            fbp: fbp,
            bbg: bbg
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
                receiveBonus: data.bonusChoosed === 0 ? 1 : 0,
                meta,
                payChannels: data.payChannels
            },
            store.commonParams
        )
        data.btnloading = true
        let res = await lobbyApi.profile.braDeposit(params)
        if (res.success) {
            data.pixCode = res.result.qrCode
            data.orderId = res.result.orderId
            data.payChannel = res.result.payChannel
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
            openDialog(res)
        }
        data.btnloading = false
    }

    const getBanner = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                recommendType: 5,
            },
            store.commonParams
        )
        const res = await lobbyApi.profile.getCurrentActivity(params)
        if (res.success) {
            data.bannerData = res.result
        } else {
            ErrorHandler(res, 'getBanner')
        }
    }

    const getPayAmounts = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                channels: data.channels,
                receiveBonus: 1,
            },
            store.commonParams
        )
        let res = await lobbyApi.home.getPayAmounts(params)
        if (res.success) {
            data.allChannels = res.result.data
            data.channelList = Object.values(res.result.data)
            data.amountList = data.channelList[0]
            data.payChannels = data.amountList?.channels || ''
            // console.log('data.channelList', data.channelList)
        } else {
            ErrorHandler(res, 'pixDeposit')
        }
    }

    const openDialog = (res: any) => {
        const type = data.alertType === 2 ? 'warning' : 'success'
        let content = data.alertConfig.content
        if (res.code === 'RS_PAY_ERROR') {
          content = $t('KEY_RS_PAY_ERROR')
        }
        modal({
            type,
            width: '485rpx',
            title: data.alertConfig.title,
            content,
            confirmText: data.alertConfig.btnText,
            showCancel: false,
        })
    }

    const navTo = (banner) => {
        if (banner.linkUrl) {
            uni.navigateTo({
                url: `${banner.linkUrl}`,
                fail() {
                    uni.switchTab({
                        url: `${banner.linkUrl}`,
                    })
                },
            })
        }
    }

    const confirm = () => {

        pixDeposit()
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    watch(
        () => data.payParams.channelSelect,
        (val) => {
            data.amountList = data.allChannels[val + 1]
            data.payChannels = data.amountList?.channels || ''
        }
    )

    const canSubmit = computed(() => {
        if (!store.userInfo?.payLimit?.length) return false
        let amount = data.payParams.amount
        if (
            amount < store.userInfo?.payLimit?.[data?.payParams?.channelSelect || 0]?.minAmount ||
            amount > store.userInfo?.payLimit?.[data?.payParams?.channelSelect || 0]?.maxAmount
        )
            return false
        // if (!data.payParams.cardNo) return false
        return true
    })
    const getTaskTips = async () => {
        let params = Object.assign(
            {
                DeviceId: commonStore.deviceInfo?.deviceId,
            },
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        // let res = await lobbyApi.task.getTaskTips(params)
        let res = await activityApi.task.taskGetTaskTipsCreate(params)
        if (res.success) {
            commonStore.assistanterList = res.result
            // drawableAmount.value = 1
        } else {
            ErrorHandler(res, 'getTaskTips')
        }
        if (commonStore.assistanterList.find((item) => item.tipsId === 2)) {
            assistanterRef.value.show()
            setTimeout(() => {
                assistanterRef.value.close()
            }, 3500)

        }
    }
    const getBannersByType = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                position: [5],
            },
            store.commonParams
        )
        let res = await lobbyApi.sCommon.banner(params)
        if (res.success && commonStore.bannerData) {
            commonStore.bannerData = Object.assign(
                commonStore.bannerData,
                res.result
            )
        } else {
            ErrorHandler(res, 'getBannersByType')
        }
    }

    const getBalance = async () => {
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

    const initData = () => {
        if (store.userInfo) {
            // pixDeposit()
            getPayAmounts()
            // getBanner()
            // getBannersByType()
            if (store.userInfo.userMode === 2) {
                getTaskTips()
                getBalance()
            }
        }
    }

    const openChat = () => {
        // @ts-ignore
        $crisp.push(['do', 'chat:show'])
        // @ts-ignore
        $crisp.push(['do', 'chat:open'])
        return
    }

    const openPop = (type) => {
        RefPopup.value.changeIsShow(type)
    }

    const tabChange = (item) => {
        data.bonusChoosed = item.id
    }

    const switchChange = () => {
      data.bonusChoosed = data.bonusChoosed ? 0 : 1
    }

    onMounted(() => {

        let systemInfo = uni.getSystemInfoSync()
        if (systemInfo.windowWidth > 960) {
          data.popupHeight = systemInfo.safeArea.height * 2
        } else {
          data.popupHeight = systemInfo.safeArea.height * (750 / systemInfo.safeArea.width)
        }

        // if (store.commonParams?.operatorId === 'own_lobby_bra2') {
        //     data.bonusChoosed = 1
        // }
    })

    onShow(async () => {
        initData()
    })
</script>

<style lang="scss">
    .banner {
        width: 100%;
        height: 224rpx;
        margin-bottom: 30rpx;
        img {
            @apply w-full h-full;
            object-fit: cover;
        }
    }
    .qrcode-view {
        width: 350rpx;
        height: 350rpx;
        padding: 18rpx;
        background: #fff;
        border-radius: 14rpx;
        margin: 53rpx auto 0;
    }
    .channel-view {
        padding: 0 40rpx;
    }

    .card-select {
        margin-top: 30rpx;
    }
    .amount-select {
        margin-top: 30rpx;
    }

    .normal-btn {
        margin-top: 80rpx;
    }

    .normal-btn.disabled {
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

    .input-view {
        margin-top: 20rpx;
    }

    ::v-deep uni-input {
        height: 90rpx !important;
        background-color: #fff;
        padding: 0 30rpx;
        border-radius: 8rpx;
        font-size: 28rpx;
        color: #414141;
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

    .service-position {
        @apply absolute;
        right: 30rpx;
        top: 30rpx;
        width: 120rpx;
        height: 120rpx;
        img {
            @apply w-full h-full;
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
    .bonus-power-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 1.46875rem;
      line-height: 1.46875rem;
      font-size: .78125rem;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #7c7c7c;
      margin-top: .75rem;
      .switch {
        box-sizing: border-box;
        width: 6.59375rem;
        height: 1.46875rem;
        background: rgba(255, 255, 255, 0);
        border: .0625rem solid #777b83;
        border-radius: .75rem;
        margin-left: .25rem;
        .switch-innner {
          width: 5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          background: #7c7c7c;
          border-radius: .65625rem;
          text-align: center;
          font-size: .6875rem;
          font-weight: 700;
          color: #fff;
          transition: color, transform .3s;
          &.on {
            background: linear-gradient(0deg, #d40e29, #f82e49, #ff3a54);;
            transform: translate3d(1.5rem, 0, 0);
          }
        }
      }
    }
</style>
