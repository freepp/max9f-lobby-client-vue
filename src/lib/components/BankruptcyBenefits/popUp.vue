<template>
  <view class="bonus-view" :class="{'active': sacpro, 'active2': bonusIndex, 'active3': sacpro && bonusIndex}">
      <view class="bonus-content">
          <img class="bonus-img" src="/static/activity/bankruptcyBenefits/pop_up.png">
          <view class="bg"></view>
          <view class="count-down-bonus" v-if="closeCountDown">
              <view class="count-down-time">
                  <view class="count-time">
                      <img class="count-down-img" :src="`/static/count-down/shuzi_1_${times.m1}.png`" alt="" />
                      <img class="count-down-img" :src="`/static/count-down/shuzi_1_${times.m2}.png`" alt="" />
                  </view>
                  <view class="time-split">
                      <view class="split"></view>
                      <view class="split"></view>
                  </view>
                  <view class="count-time">
                      <img class="count-down-img" :src="`/static/count-down/shuzi_1_${times.s1}.png`" alt="" />
                      <img class="count-down-img" :src="`/static/count-down/shuzi_1_${times.s2}.png`" alt="" />
                  </view>
              </view>
          </view>
      </view>
  </view>
</template>

<script lang="ts" setup>
  import moment from 'moment'

  interface Props {
    sacpro?: any
    bonusIndex?: any
  }

  const props = withDefaults(defineProps<Props>(), {
    sacpro: false,
    bonusIndex: false,
  })

  const emit = defineEmits(['close'])

  const commonStore = useCommonStore()

  const timeCount = ref(0)
  const times = reactive({
      m1: -1,
      m2: -1,
      s1: -1,
      s2: -1,
  })

  const clearCountDown = () => {
      clearInterval(timer.value)
      timer.value = null
      times.m1 = -1
      times.m2 = -1
      times.s1 = -1
      times.s2 = -1
  }

  const closeCountDown = computed(() => {
      return times.m1 > -1 || times.m2 > -1 || times.s1 > -1 || times.s2 > -1
  })
  const timer = ref(null)
  const setCountDown = () => {
      timer.value = setInterval(() => {
          if (timeCount.value <= 0) {
              emit('close')
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

  watch(
      () => commonStore.couponpackInfo,
      (val) => {
        if (!val.isOpen) {
          timeCount.value = 0
          clearCountDown()
          emit('close')
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

  onMounted(() => {})

  defineExpose({
    timeCount
  })
</script>

<style scoped lang="scss">
  .bonus-view {
      @apply fixed;
      z-index: 200;
      width: 169rpx;
      height: 169rpx;
      // right: 16rpx;
      right: 6rpx;
      bottom: 300rpx;
      &.active {
          bottom: 460rpx;
      }
      &.active2 {
        bottom: 480rpx;
      }
      &.active3 {
        bottom: 640rpx;
      }
      @media (width > 960px) {
        position: absolute;
      }
  }
  .bonus-content {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .count-down-bonus {
      position: absolute;
      width: 119rpx;
      height: 35rpx;
      background: #f92f49;
      border-radius: 20rpx;
      bottom: -4rpx;
      left: 50%;
      transform: translate(-50%, 0%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      background: #F92F49;
      box-shadow: 0px 2px 1px 0px rgba(0,0,0,0.5);
      border-radius: 12px;
      .count-down-time {
          display: flex;
          align-items: center;
          justify-content: center;
          .count-time {
              display: flex;
              align-items: center;
              justify-content: center;
              .count-down-img {
                  width: 15rpx;
                  height: 20rpx;
              }
          }
          .time-split {
              width: 25rpx;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              .split {
                  width: 6rpx;
                  height: 6rpx;
                  background: #ffffff;
                  border-radius: 2rpx;
                  &:first-child {
                      margin-bottom: 3rpx;
                  }
                  &:last-child {
                      margin-top: 3rpx;
                  }
              }
          }
      }
  }
  .bonus-img {
      width: 132rpx;
      height: 144rpx;
      position: relative;
      z-index: 1;
      top: -20rpx;
  }
  .bg {
    position: absolute;
    top: 10rpx;
    width: 139rpx;
    height: 139rpx;
    background: #7200FF;
    box-shadow: 0px 7rpx 7rpx 4rpx rgba(0,0,0,0.5);
    border-radius: 56rpx;
  }
</style>
