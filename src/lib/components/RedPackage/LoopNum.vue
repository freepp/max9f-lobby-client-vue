<template>
    <view class="">
        <view class="loop-num-box" v-for="(item, index) in number + ''">
            <view v-if="isNum(item)" class="loop-num" :style="styles[index]">
                <view class="num" v-for="num in 10">
                    {{ num - 1 }}
                </view>
            </view>
            <view v-else>
                {{ item }}
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
    import { ref, onMounted, watch, nextTick } from 'vue'

    interface Prop {
        number: string
    }
    const props = defineProps<Prop>()
    let piecePx = 0
    const isNum = (val) => {
        return Number(val) + '' !== 'NaN'
    }
    const styles: any = ref([])
    const calcStyles = () => {
        styles.value = []
        for (let i = 0; i < props.number.length; i++) {
            const item = props.number[i]
            if (isNum(item)) {
                const val = Number(item)
                console.log(val, piecePx, val * piecePx)
                styles.value.push({
                    transform: `translate3d(0, -${val * piecePx}px, 0)`,
                })
            } else {
                styles.value.push({})
            }
        }
    }
    const initLoop = () => {
        // 查询总宽度 以及每项的宽度
        const query = uni.createSelectorQuery().in(this)
        query.select('.num').boundingClientRect((data: any) => {
            piecePx = data?.height
        })
        query.exec()
        nextTick(() => {
            setTimeout(() => {
                calcStyles()
            }, 0)
        })
    }
    onMounted(() => {
        initLoop()
    })
    watch(
        () => props.number,
        () => {
            console.log('pppppp', props.number)
            initLoop()
        }
    )
</script>
<style lang="scss">
    .loop-num-box {
        height: 69rpx;
        line-height: 69rpx;
        font-size: 67rpx;
        overflow: hidden;
        display: inline-block;
        .loop-num {
            display: inline-flex;
            flex-direction: column;
            transition-property: transform;
            transition-duration: 0.9s;
            transform: translate3d(0rpx, 0rpx, 0);
        }
    }
</style>
