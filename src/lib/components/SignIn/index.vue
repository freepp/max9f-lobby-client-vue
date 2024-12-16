<template>
  <view class="signin">
    <image class="main_bg" :class="{openMainBg: openMain}" src="/static/activity/signin/signin_bg.png" @click="closeFn(false)"></image>
    <view class="main" :class="{openMain}">
      <image class="signin_titile_bg" src="/static/activity/signin/signin_titile_bg.png"></image>
      <image class="signin_titile" :src="languageStore.local.id === 'en' ? '/static/activity/signin/signin_titile_en.png' : '/static/activity/signin/signin_titile.png'"></image>
      <image class="signin_beauty" src="/static/activity/signin/signin_beauty.png"></image>
      <image class="gold1" src="/static/activity/signin/gold1.png"></image>
      <image class="gold2" src="/static/activity/signin/gold3.png"></image>
      <image class="gold3" src="/static/activity/signin/gold2.png"></image>
      <image class="close" src="/static/activity/bankruptcyBenefits/close.png" @click="closeFn(true)"></image>
      <view v-if="isMissing" class="signin_text">
        {{ $t('KEY_SIGNIN_TIPS') }}
      </view>
      <view class="signin_content">
        <view class="box" :class="{'box_today': list?.[i - 1]?.status === 2}" v-for="i in 6" :key="i" @click="execute(list?.[i - 1])">

          <view v-if="list?.[i - 1]?.status === 3" class="signed">
            <image class="interruptions" src="/static/activity/signin/interruptions.png"></image>
            <view class="interruptions_tips">
              <view class="interruptions_t">{{ $t('KEY_SIGNIN_INTERRUPT1').toLocaleUpperCase() }}</view>
              <view class="interruptions_b">{{ $t('KEY_SIGNIN_INTERRUPT2').toLocaleUpperCase() }}</view>
            </view>
          </view>

          <view v-if="list?.[i - 1]?.status === 1" class="signed">
            <image class="signin_yes" src="/static/activity/signin/signin_yes.png"></image>
          </view>

          <view v-if="list?.[i - 1]?.status === 2" class="today" >
            <image class="signin_light" src="/static/activity/signin/signin_light.png"></image>
          </view>
          <view v-if="list?.[i - 1]?.status === 2" class="today_bg"></view>
          <image v-if="list?.[i - 1]?.status === 2" class="signin_dayyesbg" src="/static/activity/signin/signin_dayyesbg.png"></image>

          <view class="title">{{ $t('KEY_SIGNIN_DAY') }}{{ i }}</view>
          <image class="signin_gold" :class="`signin_gold${i}`" :src="`/static/activity/signin/signin_${i}.png`"></image>
          <view class="num">
            <text class="num_max" :text="$t('KEY_SIGNIN_MAX')">{{ $t('KEY_SIGNIN_MAX') }}</text>
            {{ list?.[i - 1]?.reward || 0 }} R$
          </view>
        </view>
      </view>
      <view>
        <view class="box box7" :class="{'box_today': list?.[6]?.status === 2}" @click="execute(list?.[6])">

          <view v-if="list?.[6]?.status === 3" class="signed">
            <image class="interruptions" src="/static/activity/signin/interruptions.png"></image>
            <view class="interruptions_tips">
              <view class="interruptions_t">{{ $t('KEY_SIGNIN_INTERRUPT1').toLocaleUpperCase() }}</view>
              <view class="interruptions_b">{{ $t('KEY_SIGNIN_INTERRUPT2').toLocaleUpperCase() }}</view>
            </view>
          </view>

          <view v-if="list?.[6]?.status === 1" class="signed">
            <image class="signin_yes" src="/static/activity/signin/signin_yes.png"></image>
          </view>

          <view v-if="list?.[6].status === 2" class="today">
            <image class="signin_light" src="/static/activity/signin/signin_light.png"></image>
          </view>
          <view v-if="list?.[6]?.status === 2" class="today_bg"></view>
          <image v-if="list?.[6]?.status === 2" class="signin_dayyesbg" src="/static/activity/signin/signin_day7yesbg.png"></image>

          <view class="title">{{ $t('KEY_SIGNIN_DAY') }}7</view>
          <image class="signin_gold" :src="`/static/activity/signin/signin_7.png`"></image>
          <view class="num">
            <text class="num_max" :text="$t('KEY_SIGNIN_MAX')">{{ $t('KEY_SIGNIN_MAX') }}</text>
            {{ list?.[6]?.reward || 0 }} R$
          </view>
        </view>
        <loadingBtn
          v-if="isMissing"
          class="btn missing"
          :loading="btnloading"
          @loadData="execute(list?.[isSelectedIdx - 1])"
        >
          {{ $t('KEY_SIGNIN_RESET') }}
        </loadingBtn>
        <view v-else-if="countDown > 0" class="btn countDown" :class="{'enSize': languageStore.local.id === 'en'}">
          <view>{{ $t('KEY_SIGNIN_NEXT') }}</view>
          <view class="countDowns">{{ moment.utc(countDown * 1000).format('HH:mm:ss') }}</view>
        </view>
        <loadingBtn
          v-else-if="list?.[isSelectedIdx - 1]?.dateNumber"
          class="btn"
          :loading="btnloading"
          @loadData="execute(list?.[isSelectedIdx - 1])"
        >
          {{ $t('KEY_VIP_RECEIVE') }}
        </loadingBtn>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { api as activityApi } from '@/NET/activity'
import moment from 'moment'
import loadingBtn from '@/lib/components/Button/LoadingBtn.vue'

interface Props {
  manualOpen: boolean
}

const props = defineProps<Props>()
const manualOpen = toRef(props, 'manualOpen')

const emit = defineEmits(['close', 'closeManualOpen', 'closePopUp'])

const { t: $t } = i18n.global
const store = useUsersStore()
const languageStore = i18nStore()

const defaultList = ref([
  {status: 4, reward: 0, dateNumber: 0},
  {status: 4, reward: 0, dateNumber: 0},
  {status: 4, reward: 0, dateNumber: 0},
  {status: 4, reward: 0, dateNumber: 0},
  {status: 4, reward: 0, dateNumber: 0},
  {status: 4, reward: 0, dateNumber: 0},
  {status: 4, reward: 0, dateNumber: 0},
])
const list = ref<any>(defaultList.value)
const countDown = ref(0)
const isMissing = ref(false)
const isSelectedIdx = ref(1)
const timer = ref(null)
const btnloading = ref(false)
const openMain = ref(false)

async function getLoad() {
  try {
    clearCountDown()
    const params = Object.assign({ userId: store.userInfo.userId }, store.commonParams)
    const res = await activityApi.signin.signinLoadCreate(params)
    if (res.success) {
      btnloading.value = false
      isMissing.value = false
      countDown.value = 0
      list.value = res.result?.items?.map(item => {
        if (item?.status === 3) {
          isMissing.value = true
        }
        if (item?.isSelected) {
          isSelectedIdx.value = item.dateNumber
        }
        return item
      }) || defaultList.value
      countDown.value = res.result.countDown || 0
      if (countDown.value > 0) {
        document?.addEventListener('visibilitychange', getHiddenStatus, true);
        setCountDown()
      }
    } else {
      ErrorHandler(res, 'signinLoadCreate')
    }
  } catch (error) {
    console.error(error);
    btnloading.value = false
  }
}

function setCountDown() {
  timer.value = setInterval(() => {
    if (countDown.value <= 0) {
      getLoad()
      clearCountDown()
    } else {
      countDown.value = countDown.value - 1
    }
  }, 1000)
}

function clearCountDown() {
  clearInterval(timer.value)
  timer.value = null
}

async function execute(item) {
  if (btnloading.value) return
  if (isMissing.value) {
    modal({
      type: 'warning',
      width: '500rpx',
      title: $t('KEY_POPUP_TIPS'),
      content: $t('KEY_SIGNIN_TIPS'),
      confirmText: 'OK',
      showCancel: false,
      onConfirm: () => getLoad()
    })
    return
  }
  if (item.status !== 2 || countDown.value > 0 || !item.dateNumber) return
  try {
    btnloading.value = true
    const params = Object.assign({ userId: store.userInfo.userId, dateNumber: item.dateNumber }, store.commonParams)
    const res = await activityApi.signin.signinExecuteCreate(params)
    if (res.success && res.result.status) {
      modal({
        type: 'success',
        width: '500rpx',
        title: $t('KEY_POPUP_TIPS'),
        content: $t('KEY_SIGNIN_SIGNINSUCCESS').replace('#reward#', res.result.rewardAmount.toString()),
        confirmText: 'OK',
        showCancel: false,
      })
      emit('closePopUp')
      getLoad()
    } else {
      switch (res.code) {
        case 'RS_NOT_PAYLIMIT':
          modal({
            width: '500rpx',
            type: 'warning',
            title: $t('KEY_POPUP_TIPS'),
            content: $t('KEY_SIGNIN_SIGNINPOPUP').replace('#signinPayAmount#', res.result.toString()),
            cancelText: $t('KEY_ALERT_DEPOSIT_CANCEL'),
            confirmText: 'OK',
            showCancel: false,
            onConfirm: () => getLoad(),
            onCancel: () => {},
          })
          break
        default:
          modal({
            type: 'warning',
            width: '500rpx',
            title: $t('KEY_POPUP_TIPS'),
            content: $t('KEY_SIGNIN_SIGNINFAILED'),
            confirmText: 'OK',
            showCancel: false,
            onConfirm: () => getLoad(),
            onCancel: () => {},
          })
      }
      ErrorHandler(res, 'signinExecuteCreate')
    }
  } catch (error) {
    console.error(error);
    btnloading.value = false
  }
}

function closeFn(type: boolean) {
  if (type || countDown.value > 0) {
    // openMain.value = false
    document?.removeEventListener("visibilitychange", getHiddenStatus, true);
    clearCountDown()
    // setTimeout(() => {
      if (manualOpen.value) {
        emit('closeManualOpen')
        return
      }
      emit('close')
    // }, 200)
  }
}

function getHiddenStatus() {
  if (document?.visibilityState === 'visible') {
    getLoad()
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
  setTimeout(() => {
    openMain.value = true
  }, 200);
  initData()
})

onUnmounted(() => {
  document?.removeEventListener("visibilitychange", getHiddenStatus, true);
})

</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes transparency {
  0% {
    opacity: .5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: .5;
  }
}
@keyframes goldAnimation1 {
  0% {
    top: 8rpx;
  }
  50% {
    top: 28rpx;
  }
  100% {
    top: 8rpx;
  }
}
@keyframes goldAnimation2 {
  0% {
    top: 81rpx;
  }
  50% {
    top: 101rpx;
  }
  100% {
    top: 81rpx;
  }
}
@keyframes goldAnimation3 {
  0% {
    top: 201rpx;
  }
  50% {
    top: 221rpx;
  }
  100% {
    top: 201rpx;
  }
}
.signin {
  @apply w-full;
  position: absolute;
  height: calc(100% + 100rpx);
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 2090;
  overflow: hidden;
  .main_bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 2000rpx;
    height: 2000rpx;
    transition: all 0.2s linear;
  }
  .main {
    width: 100%;
    position: absolute;
    top: 12%;
    transform: scale(0);
    transition: all 0.2s linear;
  }
  .openMain {
    transform: scale(1);
  }
  .openMainBg {
    transform: translate(-50%, -50%) scale(1);
  }
  .signin_titile_bg {
    width: 405rpx;
    height: 190rpx;
    position: absolute;
    top: 145rpx;
    left: 40rpx;
  }
  .signin_titile {
    width: 439rpx;
    height: 248rpx;
    position: absolute;
    top: 69rpx;
    left: 72rpx;
  }
  .signin_beauty {
    width: 284rpx;
    height: 367rpx;
    position: absolute;
    top: 0rpx;
    right: 58rpx;
  }
  .gold1 {
    width: 78rpx;
    height: 44rpx;
    position: absolute;
    top: 8rpx;
    right: 24rpx;
    animation: goldAnimation1 2s ease infinite;
  }
  .gold2 {
    width: 40rpx;
    height: 44rpx;
    position: absolute;
    top: 81rpx;
    right: 376rpx;
    animation: goldAnimation2 1.5s linear infinite;
  }
  .gold3 {
    width: 51rpx;
    height: 44rpx;
    position: absolute;
    top: 201rpx;
    right: 78rpx;
    animation: goldAnimation3 1.7s ease-out infinite;
  }
  .close {
    width: 42rpx;
    height: 42rpx;
    position: absolute;
    right: 10rpx;
    top: 220rpx;
    padding: 20rpx;
    z-index: 2;
  }
  .signin_text {
    width: 358rpx;
    height: 113rpx;
    position: absolute;
    top: -14rpx;
    left: 163rpx;
    background: url('/static/activity/signin/signin_text.png') no-repeat;
    background-size: 100% 100%;
    font-weight: 600;
    padding: 12rpx 6rpx 0 26rpx;
    font-family: Arial;
    font-size: 21rpx;
    color: #75310F;
    line-height: 110%;
  }
  .signin_content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 28rpx;
    grid-column-gap: 24rpx;
    padding: 333rpx 45rpx 0;
  }
  .box {
    background: url('/static/activity/signin/signin_daybg.png') no-repeat;
    background-size: 100% 100%;
    width: 206rpx;
    height: 181rpx;
    text-align: center;
    position: relative;
    &.box_today {
      .today {
        z-index: 1;
        position: absolute;
        width: 100%;
        height: 100%;
        .signin_light {
          width: 224rpx;
          height: 224rpx;
          position: absolute;
          left: -12rpx;
          top: -22rpx;
          animation: rotation 3s linear infinite;
        }
      }
      .today_bg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: url('/static/activity/signin/signin_dayyesbg_light.png') no-repeat;
        background-size: 100% 100%;
        width: 248rpx;
        height: 223rpx;
        animation: transparency 1s linear infinite;
      }
      .signin_dayyesbg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 206rpx;
        height: 181rpx;
      }
    }
    .signed {
      position: absolute;
      width: 100%;
      height: 100%;
      // border: 2px solid #282864;
      background: rgba($color: #282864, $alpha: .7);
      z-index: 2;
      border-radius: 22rpx;
      image {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .signin_yes {
        width: 137rpx;
        height: 122rpx;
      }
      .interruptions {
        width: 78rpx;
        height: 97rpx;
      }
      .interruptions_tips {
        font-family: Impact;
        font-weight: 400;
        font-size: 24rpx;
        color: #DFF0FE;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-shadow: 0rpx 0rpx 18rpx #510e81;
        .interruptions_t {
          position: relative;
          top: 2rpx;
        }
        .interruptions_b {
          position: relative;
          top: -4rpx;
        }
      }
    }
    .title {
      font-family: 'Eras Bold ITC';
      font-weight: 400;
      font-size: 26rpx;
      color: #FFFFFF;
      padding-top: 8rpx;
      position: relative;
      z-index: 1;
    }
    .signin_gold {
      z-index: 1;
      position: absolute;
      bottom: 36rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 238rpx;
      height: 111rpx;
      &.signin_gold1 {
        width: 104rpx;
        height: 83rpx;
      }
      &.signin_gold2 {
        width: 126rpx;
        height: 85rpx;
      }
      &.signin_gold3 {
        width: 149rpx;
        height: 100rpx;
      }
      &.signin_gold4 {
        width: 121rpx;
        height: 104rpx;
      }
      &.signin_gold5 {
        width: 122rpx;
        height: 114rpx;
      }
      &.signin_gold6 {
        width: 158rpx;
        height: 97rpx;
      }
    }
    .num {
      font-weight: 600;
      font-size: 28rpx;
      color: #916001;
      z-index: 1;
      position: absolute;
      bottom: 6rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      .num_max {
        font-weight: 600;
        font-size: 20rpx;
        color: #FFFFFF;
        position: relative;
        top: -2rpx;
        z-index: 1;
        &::before {
          font-weight: 600;
          content: attr(text);
          position: absolute;
          top: 0;
          left: 0;
          text-stroke: 4rpx #7B7B7B;
          -webkit-text-stroke: 4rpx #7B7B7B;
          z-index: -1;
        }
      }
    }
    &.box7 {
      background: url('/static/activity/signin/signin_day7bg.png') no-repeat;
      background-size: 100% 100%;
      width: 462rpx;
      height: 199rpx;
      margin: 28rpx auto 0;
      &.box_today {
        .today {
          .signin_light {
            left: 118rpx;
            top: -12rpx;
          }
        }
        .today_bg {
          width: 505rpx;
          height: 242rpx;
          background: url('/static/activity/signin/signin_day7yesbg_light.png') no-repeat;
          background-size: 100% 100%;
        }
        .signin_dayyesbg {
          width: 462rpx;
          height: 199rpx;
        }
      }
    }
  }
  .btn {
    width: 380rpx;
    height: 90rpx;
    background: #4AC163;
    border-radius: 14rpx;
    font-weight: 600;
    font-size: 40rpx;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 80rpx auto 0;
    &.missing {
      background: #F92F49;
      width: 555rpx;
    }
    &.countDown {
      background: #656565;
      display: block;
      text-align: center;
      padding-top: 10rpx;
      color: #B4BCBC;
      width: 555rpx;
      font-size: 26rpx;
      &.enSize {
        font-size: 36rpx;
        padding-top: 4rpx;
        .countDowns {
          margin-top: -14rpx;
        }
      }
      .countDowns {
        margin-top: -10rpx;
        font-weight: 600;
        font-size: 42rpx !important;
        color: #fff;
      }
    }
  }
}
</style>
