<template>
  <view class="bonus-view" :class="activeClass">
      <view class="bonus-content">
          <img class="bonus-img" :class="{'enImg': languageStore.local.id === 'en'}" :src="languageStore.local.id === 'en' ? '/static/activity/signin/pop_up_en.png' : '/static/activity/signin/pop_up.png'">
          <view class="bg"></view>
      </view>
  </view>
</template>

<script lang="ts" setup>
  interface Props {
    sacpro?: any
    bonusIndex?: any
    popUp?: any
  }

  const props = withDefaults(defineProps<Props>(), {
    sacpro: false,
    bonusIndex: false,
    popUp: false
  })

  const languageStore = i18nStore()

  const activeClass = computed(() => {
    if (props.bonusIndex && props.sacpro && props.popUp) return 'active3'
    else if (props.bonusIndex && props.popUp) return 'active2'
    else if (props.sacpro && props.popUp) return 'active2'
    else if (props.bonusIndex && props.sacpro) return 'active2'
    else if (props.popUp) return 'active'
    else if (props.bonusIndex) return 'active'
    else if (props.sacpro) return 'active'
    else return ''
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
        bottom: 480rpx;
      }
      &.active2 {
        bottom: 640rpx;
      }
      &.active3 {
        bottom: 800rpx;
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
      width: 126rpx;
      height: 130rpx;
      position: relative;
      z-index: 1;
      // top: -20rpx;
      &.enImg {
        width: 135rpx;
      }
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
