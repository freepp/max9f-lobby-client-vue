<template>
    <view class="spine-box">
        <Spine
            ref="spineRef"
            id="red_package"
            class="spine-player"
            skelName="red_package"
            :assetsUrl="`./static/spinspine/index/red_package/`"
            animName="animation1_wheel idle"
            @on-complete="end"
            @on-start="start"
        ></Spine>
        <view v-if="isShowPower" class="sortear-number" @click="rollIt">
            {{ rollNum }}
        </view>
    </view>
</template>
<script lang="ts" setup>
    import Spine from '@/lib/components/Spine/Spine.vue'
    import { reactive, computed, onMounted, watch, ref } from 'vue'
    import { useUsersStore } from '@/store/userStore'
    import { getLogoUrl } from '@/common/common'
    const spineRef = ref(null)
    interface Prop {
        modelValue: number
        isFirst?: boolean
        fetch: () => Promise<number>

        // 能否抽奖，返回 true 可以抽检，返回 false 则不能抽奖
        canRollFn?: () => boolean
    }
    const props = defineProps<Prop>()
    const emits = defineEmits(['onStart', 'onSuccess', 'update:modelValue'])
    // show_1[金宝箱] slow_2[银宝箱] show_3[未中奖哭脸]
    let animationList = [
        'animation1_wheel idle',
        'animation2_wheel spin touch',
        'animation3_wheel spin idle',
        'animation4_wheel spin slow_#animation#',
        'animation5_wheel win_#animation#',
    ]
    let fetching = false
    const isShowPower = ref(false)
    const start = () => {
        isShowPower.value = true
    }
    const prize = ref(-1)
    let rolling = false
    const rollNum = computed<number>({
        set(val) {
            emits('update:modelValue', val)
        },
        get() {
            return props.modelValue
        },
    })
    let animationIndex = 0
    let isEmit = false
    const getAnimationType = (num): string => {
        if (num > 0 && props.isFirst) {
            return '1'
        } else if (num > 0 && !props.isFirst) {
            return '2'
        } else {
            return '3'
        }
    }
    let timer = null
    const end = async () => {
        // 不自动旋转
        if (animationIndex === 0) {
            return
        }
        // 接口结果未返回 不进行下一个动画
        if (fetching) {
            return
        }
        // 整个动画结束后 不再进行动画切换
        if (animationIndex > animationList.length - 1) {
            rolling = false
            animationIndex = 0
            timer = setTimeout(() => {
                spineRef.value.setAnimation('animation1_wheel idle')
            }, 2000)
            if (!isEmit) {
                emits('onSuccess', prize.value)
                isEmit = true
            }
            return
        }
        if (animationIndex === 3) {
            fetching = true
            const num = await props.fetch()
            prize.value = num
            fetching = false
        }
        const typeStr = getAnimationType(prize.value)
        const animation = animationList[animationIndex].replace(
            '#animation#',
            typeStr
        )
        spineRef.value.setAnimation(animation)
        // if (animationList[animationIndex] === 'animation6_tanban1_open_1') {
        //     isShowPower.value = false
        // }
        animationIndex++
    }
    const reset = () => {
        fetching = false
        prize.value = -1
        rolling = false
        animationIndex = 0
        isEmit = false
    }
    const rollIt = () => {
        // 如果不能抽奖，则直接返回
        if (
            props.canRollFn &&
            typeof props.canRollFn === 'function' &&
            !props.canRollFn()
        ) {
            return
        }

        // 禁止连续抽奖
        if (rolling) {
            return
        }
        // 没抽奖次数禁止抽奖
        if (rollNum.value <= 0) {
            return
        }
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        reset()
        emits('onStart')
        rolling = true
        rollNum.value--
        animationIndex++
        end()
    }
</script>
<style lang="scss">
    .yellow {
        color: #ffd800;
    }
    .spine-box {
        @apply w-full h-full overflow-hidden relative;
        .spine-player {
            width: 606rpx;
            height: 606rpx;
            width: 718rpx;
            height: 718rpx;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
        }
        .sortear-number {
            width: 155rpx;
            height: 155rpx;
            font-size: 67rpx;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #ffffff;
            line-height: 100rpx;
            text-shadow: 0px 1px 0px #d6ffc9;
            position: absolute;
            left: 50%;
            top: 50%;
            text-align: center;
            transform: translate3d(-50%, -60%, 0);
        }
    }
</style>
