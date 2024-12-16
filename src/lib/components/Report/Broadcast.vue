<template>
    <view ref="RefContainer" class="broadcast-container">
        <swiper
            class="swiper"
            id="broadcaseSwiper"
            circular
            :indicator-dots="false"
            :autoplay="autoplay"
            :interval="2000"
            :duration="500"
            :vertical="true"
            @animationfinish="animationfinish"
        >
            <swiper-item
                @click="() => goMessage(message)"
                v-for="(message, index) in messageList"
                :key="index"
            >
                <view
                    class="broadcast-item"
                    :style="styles[index]"
                    @transitionend="nextSwiper"
                    v-html="
                        message?.msg
                            ?.replace(
                                'R$' + message.winAmount,
                                `<text class='broadcast-yellow' style='color: #f2ac35;'>R$${message.winAmount}</text>`
                            )
                            ?.replace(
                                message.appName,
                                `<text class='broadcast-blue' style='color: #7aacff;text-decoration: underline'>${message.appName}</text>`
                            )
                    "
                ></view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script lang="ts" setup>
    import { ref, onMounted, watchEffect, computed, watch, nextTick } from 'vue'
    import { openGame } from '@/common/game'
    import { onShow } from '@dcloudio/uni-app'
    interface Props {
        messages?: any
    }

    const props = withDefaults(defineProps<Props>(), {
        messages: () => [],
    })
    const RefContainer = ref()

    const messageList = computed(() => {
        return props.messages
    })
    const styles = ref<any>([])
    // swiper单次动画结束回调 主要是这只下次一次样式 和 本次的样式
    const animationfinish = (current, source) => {
        autoplay.value = false
        const index = current.detail.current
        // console.log('animationfinish', source)
        if (index + 1 > calcedstyles.value.length) {
            styles.value[0] = {}
        } else {
            styles.value[index + 1] = {}
        }
        styles.value[index] = calcedstyles.value[index]
        styles.value[index] = calcedstyles.value[index]
    }
    const autoplay = ref(false)
    // 横向transition动画结束回调 切换autoplay的值
    const nextSwiper = () => {
        // console.log('autoplay')
        autoplay.value = true
    }

    const rects = ref<any>([])
    let swiperWidth = 0
    const calcedstyles = ref<any>([])
    // 计算每项需要横向滚动的像素
    const calcStyles = () => {
        calcedstyles.value = []
        rects.value?.forEach((item, index) => {
            const itemWidth = rects.value?.[index]?.width
            let dis = -1
            if (swiperWidth && itemWidth) {
                dis = swiperWidth - itemWidth
            }
            calcedstyles.value.push({
                transform: `translateX(${dis}px)`,
            })
        })
    }

    const initScroll = () => {
        // 查询总宽度 以及每项的宽度
        const query = uni.createSelectorQuery().in(this)
        query.select('#broadcaseSwiper').boundingClientRect((data: any) => {
            swiperWidth = data?.width
        })
        query.selectAll('.broadcast-item').boundingClientRect((data) => {
            rects.value = data
        })
        query.exec()
        nextTick(() => {
            // console.log('swiperWidth', swiperWidth, rects)
            calcStyles()
            styles.value[0] = calcedstyles.value[0]
        })
    }

    watch(
        () => props.messages,
        (val) => {
            nextTick(() => {
                initScroll()
            })
        }
    )
    const mounted = ref(false)
    onShow(() => {
        if (mounted.value) {
            nextSwiper()
        }
    })
    const goMessage = (item) => {
        openGame(item)
    }

    onMounted(() => {
        mounted.value = true
        if (props.messages && props.messages.length > 0) {
            initScroll()
        }
    })
</script>

<style>
    .swiper {
        width: 100%;
        height: 100%;
    }
    .broadcast-yellow {
        color: #f2ac35;
    }
    .broadcast-blue {
        text-decoration: underline;
        color: #7aacff;
    }
    .broadcast-container {
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        height: 100%;
    }

    .broadcast-item {
        display: inline-block;
        padding-right: 40rpx;
        font-weight: bold;
        height: 100%;
        line-height: 45rpx;
        transition: transform 2.5s linear;
    }
</style>
