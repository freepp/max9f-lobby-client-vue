<template>
    <view class="bonus-view" :class="{'active':alertConfig.sacpro}">
        <view class="bonus-content">
            <img class="bonus-img" src="@/static/index/bonus_icon.png">
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
        alertConfig?: any
    }

    const props = withDefaults(defineProps<Props>(), {
        alertConfig: {
            sacpro: false,
        },
    })
    const curCountDownTims = ref(0)
    const times = reactive({
        m1: 0,
        m2: 0,
        s1: 0,
        s2: 0,
    })

    const isFirst = ref(true)

    const closeCountDown = computed(() => {
        return times.m1 > -1 || times.m2 > -1 || times.s1 > -1 || times.s2 > -1
    })
    const countDown = ref(null)
    const setCountDown = () => {
        countDown.value = setInterval(() => {
            if (curCountDownTims.value < 0) {
                setTimes()
                clearCountDown()
            } else {
                setTimes()
                curCountDownTims.value = curCountDownTims.value - 1
            }
        }, 1000)
    }
    const setTimes = () => {
        const curTime = moment.utc(
            moment.duration(curCountDownTims.value, 'seconds').asMilliseconds()
        )
        times.m1 = Number(curTime.format('mm').split('')[0])
        times.m2 = Number(curTime.format('mm').split('')[1])
        times.s1 = Number(curTime.format('ss').split('')[0])
        times.s2 = Number(curTime.format('ss').split('')[1])
    }
    const clearCountDown = () => {
        clearInterval(countDown.value)
        countDown.value = null
        times.m1 = -1
        times.m2 = -1
        times.s1 = -1
        times.s2 = -1
    }
    watch(
        () => props.alertConfig,
        (val) => {
          if (isFirst.value && val?.timelimitpayInfo) {
            isFirst.value = false
            if (val?.timelimitpayInfo) {
              if (curCountDownTims.value <= 0) {
                clearCountDown()
                setCountDown()
                curCountDownTims.value = val.timelimitpayInfo.countDown - 1
                setTimes()
              }
            } else {
                clearCountDown()
            }
          }
        }
    )
    onMounted(() => {})
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
        width: 169rpx;
        height: 169rpx;
    }
</style>
