<template>
    <view
        class="hover_ball_cell"
        :style="{
            width: `${data.diameter}px`,
            height: `${data.diameter}px`,
            top: `${data.top}px`,
            left: `${data.left}px`,
        }"
        @touchmove.prevent.stop="touchmove"
        @touchend.stop="touchend"
        @touchcancel.stop="touchcancel"
        @tap.stop="onTap"
        :animation="data.ballAnimation"
    >
        <view class="wave">
            <slot></slot>
        </view>
    </view>
</template>

<script lang="ts" setup>
    // @ts-nocheck
    import { onMounted, reactive, ref } from 'vue'

    interface Props {
        pageType?: number
    }

    const props = withDefaults(defineProps<Props>(), {
        pageType: 1,
    })

    interface Data {
        title?: string
    }

    const data = reactive<any>({
        diameter: 0,
        top: 0,
        left: 0,
        isMove: false,
        ballAnimation: {},
        timeout: null,
        modile: {},
    })

    const onTap = () => {
        let x = '0'
        if (2 * data.left >= data.modile.safeArea.width) {
            x = '-100%'
        }
        let create = uni.createAnimation({
            duration: 0,
        })
        create.translate(x).step()
        data.ballAnimation = create.export()
        // overBall()
    }
    const touchmove = (e) => {
        data.isMove = true
        if (data.timeout != null) {
            clearTimeout(data.timeout)
            data.timeout = null
        }
        var touch = e.touches[0] || e.changedTouches[0]
        data.left = touch.clientX
        data.top = touch.clientY - data.diameter / 2
    }
    const touchend = (e) => {
        if (!data.isMove) {
            return
        }
        finish(e)
    }
    const touchcancel = (e) => {
        if (!data.isMove) {
            return
        }
        finish(e)
    }
    const finish = (e) => {
        data.isMove = false
        var touch = e.touches[0] || e.changedTouches[0]
        data.left = touch.clientX
        data.top = touch.clientY - data.diameter / 2
        let x = '0'
        if (2 * data.left + data.diameter >= data.modile.safeArea.width) {
            data.left = data.modile.safeArea.width - data.diameter / 2
            x = '-100%'
        } else {
            data.left = data.modile.safeArea.left + data.diameter / 2
        }
        if (
            data.top >
            data.modile.safeArea.height +
                data.modile.safeAreaInsets.bottom -
                data.diameter
        ) {
            data.top =
                data.modile.safeArea.height +
                data.modile.safeAreaInsets.bottom -
                data.diameter
        } else if (data.top < data.diameter / 2) {
            data.top = data.diameter / 2
        }
        let create = uni.createAnimation({
            duration: 0,
        })
        create.translate(x).step()
        data.ballAnimation = create.export()
        // overBall()
    }
    const overBall = () => {
        data.timeout = setTimeout(() => {
            data.timeout = null
            let create = uni.createAnimation({
                duration: 400,
                timingFunction: 'ease-in',
            })
            create.translate('-50%').step()
            data.ballAnimation = create.export()
        }, 1200)
    }

    onMounted(() => {
        data.modile = uni.getSystemInfoSync()
        data.top = data.modile.safeArea.bottom - 120
        data.diameter = data.modile.screenHeight / 15
        data.left = data.modile.safeArea.right - data.diameter
    })
</script>

<style lang="scss">
    .hover_ball_cell {
        position: fixed;
        overflow: hidden;
        border-radius: 50%;
        background: transparent;
        transform: translate(-50%, 0);
        box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.08);
        z-index: 200;
        .wave {
            @apply flex justify-center items-center w-full h-full;
            position: relative;
            border-radius: 50%;
        }
    }
</style>
