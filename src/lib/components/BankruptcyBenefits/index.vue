<template>
  <view class="bankruptcy_Benefits" v-show="isOpen || manualOpen">
    <view class="main">
      <view class="count_down" v-if="closeCountDown">
        <view>{{ `${times.m1}${times.m2}:${times.s1}${times.s2}` }}</view>
      </view>
      <view class="title">
        <view>{{ $t('KEY_BANKRUPTCYBENEFITS_TITLE1').toLocaleUpperCase() }}</view>
        <view class="title_1">{{ $t('KEY_BANKRUPTCYBENEFITS_TITLE1_1').toLocaleUpperCase() }}</view>
      </view>
      <view class="box">
        <image class="top_bg" src="/static/activity/bankruptcyBenefits/top_bg.png"></image>
        <image class="close" src="/static/activity/bankruptcyBenefits/close.png" @click="closeFn"></image>
        <view class="center">
          <Center v-if="isOpen || manualOpen"></Center>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Center from "./center.vue";
import moment from 'moment'

interface Props {
  isOpen: boolean
  manualOpen: boolean
}

const props = defineProps<Props>()
const isOpen = toRef(props, 'isOpen')
const manualOpen = toRef(props, 'manualOpen')

const emit = defineEmits(['close', 'closeManualOpen'])

const { t: $t } = i18n.global
const commonStore = useCommonStore()

const showCountDown = ref(true)

function closeFn() {
  showCountDown.value = true
  if (manualOpen.value) {
    emit('closeManualOpen')
    return
  }
  emit('close')
}

const timeCount = ref(0)
const times = reactive({
    m1: -1,
    m2: -1,
    s1: -1,
    s2: -1,
})

const closeCountDown = computed(() => {
  return times.m1 > -1 || times.m2 > -1 || times.s1 > -1 || times.s2 > -1
})
const timer = ref(null)
const setCountDown = () => {
  timer.value = setInterval(() => {
    if (timeCount.value <= 0) {
      setTimes()
      clearCountDown()
    } else {
      setTimes()
      timeCount.value = timeCount.value - 1
    }
  }, 1000)
}

const setTimes = () => {
  const curTime = moment.utc(
    moment.duration(timeCount.value, 'seconds').asMilliseconds()
  )
  times.m1 = Number(curTime.format('mm').split('')[0])
  times.m2 = Number(curTime.format('mm').split('')[1])
  times.s1 = Number(curTime.format('ss').split('')[0])
  times.s2 = Number(curTime.format('ss').split('')[1])
}
const clearCountDown = () => {
  clearInterval(timer.value)
  timer.value = null
  times.m1 = -1
  times.m2 = -1
  times.s1 = -1
  times.s2 = -1
}

watch(
  () => commonStore.couponpackInfo,
  (val) => {
    if (!val.isOpen) {
      timeCount.value = 0
      clearCountDown()
    } else if (timeCount.value <= 0 && val.countDown > 0) {
      clearCountDown()
      setCountDown()
      timeCount.value = commonStore.couponpackInfo.countDown
      setTimeout(() => {
        timeCount.value = commonStore.couponpackInfo.countDown - 1
      }, 0);
      setTimes()
    }
  }, {
    immediate: true,
    deep: true
  }
)

</script>

<style lang="scss" scoped>
view {
  box-sizing: border-box;
}
.bankruptcy_Benefits {
  @apply w-full;
  position: absolute;
  height: calc(100% + 100rpx);
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2090;
  .main {
    position: absolute;
    top: 13%;
    left: 50%;
    transform: translate(-50%);
    text-align: center;
    min-width: 638rpx;
    .count_down {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      background: url('/static/activity/bankruptcyBenefits/time_bg.png') no-repeat;
      background-size: 100% 100%;
      width: 365rpx;
      height: 89rpx;
      padding-left: 110rpx;
      margin: 0 auto;
      text-align: initial;
      display: flex;
      align-items: center;
      view {
        font-weight: 900 !important;
        font-size: 60rpx !important;
        color: #FFFFFF !important;
        text-shadow: 0px 6rpx 0px #000000 !important;
      }
    }
    .title {
      padding-top: 89rpx;
      font-weight: 900;
      font-size: 50rpx;
      color: #FFE44C;
      margin: -10rpx 0;
      .title_1 {
        margin-top: -15rpx;
      }
    }
    .box {
      position: relative;
      width: 600rpx;
      margin: 0 auto;
      .top_bg {
        width: 540rpx;
        height: 123rpx;
        position: relative;
        z-index: 1;
      }
      .close {
        width: 42rpx;
        height: 42rpx;
        position: absolute;
        right: -10rpx;
        top: 20rpx;
        padding: 20rpx;
        z-index: 2;
      }
      .center {
        position: relative;
        top: -20rpx;
        background: linear-gradient(0deg, #640000, #D50306);
        box-shadow: inset 5rpx 5rpx 10rpx 0rpx rgba($color: #540202, $alpha: .8);
        border-radius: 21rpx;
        border: 4rpx solid #FB8B25;
        padding: 23rpx 22rpx 14rpx 17rpx;
        min-height: 709rpx;
      }
    }
  }
}
</style>
