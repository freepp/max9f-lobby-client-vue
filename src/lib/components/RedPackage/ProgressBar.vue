<template>
    <view class="progress-box">
        <view class="progress-val">{{ progressVal }}%</view>
        <view class="progress-bg">
            <view class="progress-bg-inner" :style="progressStyle"></view>
            <!-- {{ progressStyle }} -->
        </view>
        <view
            class="progress-tip"
            v-html="
                $t('KEY_RED_WITHDRAW_DISS').replace(
                    '#DISS#',
                    numberWithCommas(diss) + '%'
                )
            "
        ></view>
    </view>
</template>
<script lang="ts" setup>
    import { numberWithCommas } from '@/common/common'
    import { computed } from 'vue'

    interface Prop {
        price: number
        total: number
    }
    const props = defineProps<Prop>()
    const progress = computed(() => {
        return Number(
            Math.min((props.price / props.total) * 100, 100).toFixed(2)
        )
    })
    const diss = computed(() => (100).sub(progress.value))
    const progressVal = computed(() => {
        return numberWithCommas(progress.value)
    })
    const progressStyle = computed(() => {
        return {
            width: progress.value + '%',
        }
    })
</script>
<style lang="scss">
    .progress-box {
        margin-top: 8rpx;

        .progress-val {
            font-size: 22rpx;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            line-height: 24rpx;
            text-align: right;
        }
        .progress-bg {
            margin-top: 8rpx;
            width: 598rpx;
            height: 31rpx;
            // background: #000000;
            box-shadow: 1rpx 2rpx 0px 0px rgba(255, 255, 255, 0.66);
            // opacity: 0.5;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 16rpx;
            .progress-bg-inner {
                width: 498rpx;
                height: 100%;
                background: #ffe400;
                background: linear-gradient(180deg, #ffe400, #b16c00);
                border-radius: inherit;
                transition: width 0.5s linear;
            }
        }
        .progress-tip {
            text-align: center;
            height: 26rpx;
            font-size: 22rpx;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            line-height: 26rpx;
            margin-top: 12rpx;
            .yellow {
                color: #ffd800;
            }
        }
    }
</style>
