<template>
  <view class="center_box">
    <view v-for="(item, idx) in list" :key="idx" class="center_tab" :class="{'scaleAnimation': idx === current}" @click="current = idx">
      <view :class="`center_tab_bg center_tab_bg${idx}`"></view>
      <view class="unit unit_left">
        <text class="stroke">{{ 'BRL' }}</text>
        <text class="text" :text="'BRL'">{{ 'BRL' }}</text>
      </view>
      <view class="unit unit_bottom">
        <text class="stroke">{{ 'BRL' }}</text>
        <text class="text" :text="'BRL'">{{ 'BRL' }}</text>
      </view>
      <view class="left_info">
        <view class="money_left" :text="item.payAmout || 0">{{ item.payAmout || 0 }}</view>
        <image class="dy" src="/static/activity/bankruptcyBenefits/dy.png"></image>
      </view>
      <view class="money_bottom" :text="_.floor(item.totalAmount || 0)">{{ _.floor(item.totalAmount || 0) }}</view>
      <view class="money_right" :class="{'money_right_0': (item.counponRate >= 1 && !idx), 'money_right_1': (item.counponRate >= 1 && idx === 1), 'money_right_2': (item.counponRate >= 1 && idx === 2)}">
        <view class="money_right_big" :class="`money_right_big${idx}`">
          <view class="money_right_big_num">
            <text class="stroke">+{{ _.floor((item.counponRate || 0) * 100) }}</text>
            <text class="text" :text="`+${_.floor((item.counponRate || 0) * 100)}`">+{{ _.floor((item.counponRate || 0) * 100) }}</text>
            <view class="money_right_big_p" :class="{'money_right_big_p_3': item.counponRate >= 1}">
              <text class="stroke">%</text>
              <text class="text" text="%">%</text>
            </view>
            <view class="money_right_small">
              <text class="stroke">{{ $t('KEY_BANKRUPTCYBENEFITS_HOT').toLocaleUpperCase() }}</text>
              <text class="text" :text="$t('KEY_BANKRUPTCYBENEFITS_HOT').toLocaleUpperCase()">{{ $t('KEY_BANKRUPTCYBENEFITS_HOT').toLocaleUpperCase() }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="hot" v-if="idx === 2">
      </view>
    </view>
  </view>
  <view v-if="!btnloading" class="btn" @click="confirm">{{ $t('KEY_BANKRUPTCYBENEFITS_RECHARGE') }}</view>
  <view v-else class="btn disabled">
    <img src="@/static/icon/button_loading.gif" alt="" />
  </view>
  <view class="tips" :class="isGame && 'tips_width'">{{ $t('KEY_BANKRUPTCYBENEFITS_TILS') }}</view>
  <PopupBottom
    ref="RefPopup"
    :height="popupHeight"
    :background="'var(--UI-BG)'"
    :noBorder="true"
    :zIndex="3003"
    @mask-click="pixCode = ''"
  >
    <view class="popup-title">
      {{ $t('KEY_TABBAR_DEPOSIT') }}
    </view>
    <view class="scroll-view" v-if="pixCode !== ''">
      <qrCode :amount="amount" :pixCode="pixCode" />
    </view>
  </PopupBottom>
</template>

<script lang="ts" setup>
import PopupBottom from '@/lib/components/PopupBottom/index.vue'
import qrCode from '@/lib/components/Pay/channel/PIX/qrCode.vue'
import { getAFid, queryURLParams } from '@/common/common'
import { api as lobbyApi } from '@/NET/lobby'
import _ from 'lodash'

interface Props {
  isGame?: boolean
}

const props = defineProps<Props>()
const isGame = toRef(props, 'isGame')

const emit = defineEmits(['close'])

const { t: $t } = i18n.global
const store = useUsersStore()

const defaultList = ref([
  {
    "payAmout": 0,
    "casAmount": 0,
    "level": 0,
    "bounsAmout": 0,
    "totalAmount": 0,
    "counponRate": 0
  },
  {
    "payAmout": 0,
    "casAmount": 0,
    "level": 0,
    "bounsAmout": 0,
    "totalAmount": 0,
    "counponRate": 0
  },
  {
    "payAmout": 0,
    "casAmount": 0,
    "level": 0,
    "bounsAmout": 0,
    "totalAmount": 0,
    "counponRate": 0
  },
])

const list = ref(defaultList.value)

const RefPopup = ref()
const current = ref<any>(2)
const pixCode = ref<string>('')
const amount = ref<number>(0)
const popupHeight = ref()
const btnloading = ref(false)

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

async function confirm() {
  if (!list.value[current.value].payAmout) return
  btnloading.value = true
  const param = queryURLParams()
  const fbc = getCookie('_fbc')
  const fbp = getCookie('_fbp')
  const bbg = param.bbg || getCookie('_bge_bbg')
  const meta = {
      clickid: uni.getStorageSync('click_id'),
      AFID: getAFid(),
      fbc,
      fbp,
      bbg
  }
  const params = Object.assign(
    {
      userId: store.userInfo.userId,
      channels: 5,
      amount: list.value[current.value].payAmout,
      receiveBonus: 1,
      meta,
    },
    store.commonParams
  )
  let res = await lobbyApi.couponPackage.couponPackageBraDeposit(params)
  if (res.success) {
    pixCode.value = res.result.qrCode
    amount.value = list.value[current.value].payAmout
    RefPopup.value.changeIsShow(true)
  } else {
    ErrorHandler(res, 'pixDeposit')
    let content = res.message
    if (res.code === 'RS_PAY_ERROR') {
      content = $t('KEY_RS_PAY_ERROR')
    }
    modal({
        type: 'warning',
        width: '485rpx',
        title: $t('KEY_MESSAGE_ERRORCODE17'),
        content,
        confirmText: $t('KEY_COMMON_OK'),
        showCancel: false,
    })
  }
  getLoad()
  btnloading.value = false
}

async function getLoad() {
  try {
    list.value = defaultList.value
    const params = Object.assign({ userId: store.userInfo.userId }, store.commonParams)
    const res = await lobbyApi.couponPackage.couponPackageLoad(params)
    if (res.success) {
      list.value = res.result || defaultList.value
    } else {
      ErrorHandler(res, 'couponPackageLoad')
    }
  } catch (error) {
    console.error(error);
  }
}

const initData = () => {

  if (store.userInfo?.userMode === 2) {
    getLoad()
  }
}

watch(
  () => store.userInfo,
  () => {
    initData()
  }
)

onMounted(() => {
  initData()
  let systemInfo = uni.getSystemInfoSync()
  if (systemInfo.windowWidth > 960) {
    popupHeight.value = systemInfo.safeArea.height * 2
  } else {
    popupHeight.value = systemInfo.safeArea.height * (750 / systemInfo.safeArea.width)
  }
})

</script>

<style lang="scss" scoped>
@keyframes scaleAnimation { // 动画设置
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}
view {
  box-sizing: border-box;
}
.popup-title {
  @apply flex items-center justify-center text-white-100;
  font-size: 33rpx;
  font-weight: bold;
  height: 100rpx;
}
.center_box {
  min-height: 489rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.center_tab {
  position: relative;
  width: 560rpx;
  height: 153rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 80rpx;
  margin-bottom: 15rpx;
  animation-duration: 1s; // 动画时长
  animation-iteration-count: infinite; // 永久动画
  transition-timing-function: linear; // 动画过渡
  &.scaleAnimation {
    animation-name: scaleAnimation; // 动画名
  }
  .center_tab_bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 153rpx;
  }
  .center_tab_bg0 {
    background: url('/static/activity/bankruptcyBenefits/tab0.png') no-repeat;
    background-size: 100% 100%;
    width: 513rpx;
  }
  .center_tab_bg1 {
    background: url('/static/activity/bankruptcyBenefits/tab1.png') no-repeat;
    background-size: 100% 100%;
    width: 537rpx;
  }
  .center_tab_bg2 {
    background: url('/static/activity/bankruptcyBenefits/tab2.png') no-repeat;
    background-size: 100% 100%;
    width: 560rpx;
  }
  .unit {
    position: absolute;
    font-weight: 600;
    font-size: 25rpx;
    display: inline-block;
    font-style: initial;
    z-index: 1;
    &.unit_left {
      bottom: 16rpx;
      left: 62rpx;
    }
    &.unit_bottom {
      bottom: 4rpx;
      left: 50%;
      transform: translateX(-50%);
      font-size: 16rpx;
    }
    .stroke {
      -webkit-text-stroke: 6rpx #871B02;
      text-shadow: 0rpx 0rpx 0rpx #871B02;
    }
    .text {
      padding-right: 0 !important;
      &::before {
        padding-right: 0 !important;
      }
    }
  }
  .left_info {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 187rpx;
    text-align: right;
  }
  .money_left {
    padding-right: 8rpx;
    font-weight: 900;
    font-size: 60rpx;
    font-style: italic;
    position: relative;
    -webkit-text-stroke: 6rpx #871B02;
    filter: drop-shadow(0 3rpx 0 #871B02);
    &::before {
      padding-right: 8rpx;
      content: attr(text);
      position: absolute;
      background: linear-gradient(10deg, #E19D16 0%, #F9DD1D 50.5126953125%, #FFF8AF 52.001953125%, #FFF8AF 69.287109375%, #F9DD1D 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-text-stroke: 0;
    }
  }
  .stroke {
    -webkit-text-stroke: 6rpx #871B02;
    text-shadow: 0rpx 8rpx 0rpx #871B02;
  }
  .text {
    padding-right: 8rpx;
    color: #FFE44C;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    &::before {
      padding-right: 8rpx;
      content: attr(text);
      position: absolute;
      color: #FFF21B;
      background: linear-gradient(10deg, #E19D16 0%, #F9DD1D 50.5126953125%, #FFF8AF 52.001953125%, #FFF8AF 69.287109375%, #F9DD1D 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .dy {
    width: 36rpx;
    height: 35rpx;
    margin-top: 10rpx;
    flex-shrink: 0;
  }
  .money_bottom {
    position: absolute;
    bottom: 16rpx;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 900;
    font-size: 40rpx;
    color: #FDDE21;
    -webkit-text-stroke: 6rpx #000000;
    filter: drop-shadow(0 3rpx 0 #000000);
    &::before {
      content: attr(text);
      position: absolute;
      -webkit-text-stroke: 0;
    }
  }
  .money_right {
    position: relative;
    top: -20rpx;
    left: 40rpx;
    min-width: 150rpx;
    &.money_right_0 {
      left: 10rpx;
    }
    &.money_right_1{
      left: 10rpx;
    }
    &.money_right_2 {
      left: 20rpx;
    }
    .money_right_big {
      min-height: 64rpx;
      position: relative;
      font-weight: 400;
      font-size: 36rpx;
      color: #FFFEFE;
      font-family: Impact;
      &.money_right_big0 {
        .money_right_big_num {
          .stroke {
            -webkit-text-stroke: 14rpx #C27132;
            text-shadow: 0rpx 0rpx 0rpx #C27132;
          }
        }
        .money_right_big_p {
          .stroke {
            -webkit-text-stroke: 8rpx #C27132;
            text-shadow: 0rpx 0rpx 0rpx #C27132;
          }
        }
      }
      &.money_right_big1 {
        .money_right_big_num {
          .stroke {
            -webkit-text-stroke: 14rpx #0033C2;
            text-shadow: 0rpx 0rpx 0rpx #0033C2;
          }
        }
        .money_right_big_p {
          .stroke {
            -webkit-text-stroke: 8rpx #0033C2;
            text-shadow: 0rpx 0rpx 0rpx #0033C2;
          }
        }
      }
      .money_right_big_num {
        position: absolute;
        font-weight: 400;
        font-size: 76rpx;
        color: #FFFEFE;
        left: 0;
        font-family: Impact;
        .stroke {
          font-family: Impact;
          -webkit-text-stroke: 14rpx #DD0101;
          text-shadow: 0rpx 0rpx 0rpx #DD0101;
        }
        .text {
          font-family: Impact;
          color: #FFFEFE;
          padding-right: 0 !important;
          &::before {
            font-family: Impact;
            padding-right: 0 !important;
            color: #FFFEFE;
            background: none;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
      .money_right_big_p {
        position: absolute;
        font-weight: 400;
        font-size: 40rpx;
        color: #FFFEFE;
        right: -25rpx;
        bottom: 5rpx;
        font-family: Impact;
        &.money_right_big_p_3 {
          right: -25rpx;
        }
        .stroke {
          font-family: Impact;
          -webkit-text-stroke: 8rpx #DD0101;
          text-shadow: 0rpx 0rpx 0rpx #DD0101;
        }
        .text {
          font-family: Impact;
          color: #FFFEFE;
          padding-right: 0 !important;
          &::before {
            font-family: Impact;
            padding-right: 0 !important;
            color: #FFFEFE;
            background: none;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
    .money_right_small {
      font-family: Impact;
      font-weight: 400;
      font-size: 22rpx;
      color: #FFE400 !important;
      position: absolute;
      left: calc(50%);
      transform: translateX(calc(-50% + 12rpx));
      bottom: -18rpx;
      min-width: 180rpx;
      .stroke {
        -webkit-text-stroke: 8rpx #7C0000 !important;
        text-shadow: 0rpx 0rpx 0rpx #7C0000 !important;
      }
      .text {
        color: #FFE400 !important;
        padding-right: 0 !important;
        &::before {
          padding-right: 0 !important;
          color: #FFE400 !important;
          background: none;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }
  .hot {
    position: absolute;
    top: -30rpx;
    right: -48rpx;
    background: url('/static/activity/bankruptcyBenefits/hot.png') no-repeat;
    background-size: 100% 100%;
    width: 113rpx;
    height: 101rpx;
    padding: 15rpx 0 0 0rpx;
    z-index: 2;
    text-align: left;
    .hot_n {
      position: relative;
      left: 10rpx;
      top: 10rpx;
      font-family: Impact;
      font-weight: 400;
      font-size: 42rpx;
      color: #FFFFFF;
      transform: rotate(25deg);
      .hot_p {
        font-size: 25rpx;
      }
    }
    .hot_t {
      font-family: Impact;
      font-weight: 400;
      font-size: 14rpx;
      color: #FFE400;
      transform: rotate(25deg);
      .stroke {
        -webkit-text-stroke: 4rpx #7C0000;
        text-shadow: 0rpx 0rpx 0rpx #7C0000;
      }
      .text {
        color: #FFE400;
        padding-right: 0 !important;
        &::before {
          padding-right: 0 !important;
          color: #FFE400 !important;
          background: none;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }
}
.btn {
  width: 349rpx;
  height: 90rpx;
  background: linear-gradient(0deg, #D6112C, #F83C54);
  border-radius: 14rpx;
  // font-family: Franklin Gothic Demi Cond;
  font-weight: 600;
  font-size: 40rpx;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 13rpx auto 15rpx;
  &.disabled {
    opacity: .8;
    img {
      width: 80rpx;
      height: 80rpx;
    }
  }
}
.tips {
  // font-family: Arial;
  font-weight: 400;
  font-size: 19rpx;
  color: #FB9697;
  line-height: 21rpx;
  &.tips_width {
    width: 600rpx;
    margin: 0 auto;
  }
}
</style>
