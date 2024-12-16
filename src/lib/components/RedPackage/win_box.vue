<template>
    <view class="win-box">
        <view v-if="showMask" class="bg"></view>
        <image
            class="shink"
            src="@/static/activity/red-package/shink_bg.png"
            mode="widthFix"
        ></image>
        <view class="content">
            <view v-if="!isOpen" class="title" v-html="$t('KEY_RED_CONGRA')"></view>
            <view v-if="isOpen" class="sub-title" v-html="$t('KEY_RED_SUS')"></view>
            <view class="price">R$ {{ numberWithCommas(price) }}</view>
            <view class="box flex justify-center">
                <image
                    v-if="isOpen"
                    src="@/static/activity/red-package/box_open.png"
                    mode="widthFix"
                    class="box-open"
                ></image>
                <image
                    v-else-if="isGold"
                    src="@/static/activity/red-package/box_close_gold.png"
                    mode="widthFix"
                    class="box-lock"
                ></image>
                <image
                    v-else="!isGold"
                    src="@/static/activity/red-package/box_close_silver.png"
                    mode="widthFix"
                    class="box-lock"
                ></image>

            </view>
            <view class="btn" v-if="!isOpen" @click="onClick" v-html="$t('KEY_RED_COLLECT')"></view>
            <view class="btn" v-if="isOpen" @click="onClick">{{ $t('KEY_COMMON_OK') }}</view>
        </view>
    </view>
</template>
<script lang="ts" setup>
    import { numberWithCommas } from '@/common/common'
    interface Prop {
        isGold?: boolean
        price: number
        isOpen?: boolean
        showMask?: boolean
    }
    const emits = defineEmits(['onBtnClick'])
    const props = defineProps<Prop>()
    const onClick = () => {
        emits('onBtnClick')
    }
</script>
<style lang="scss">
    .win-box {
        @apply fixed left-0 top-0 w-full h-full overflow-hidden;
        .bg {
            @apply absolute top-0 left-0 w-full h-full;
            background: rgba(0, 0, 0, 0.7);
        }
        @keyframes rotate360 {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        .shink {
            position: absolute !important;
            width: 1500rpx;
            top: 50%;
            left: 50%;
            margin-left: -750rpx;
            margin-top: -740rpx;
            animation: rotate360 10s linear 0s infinite;
        }
        .content {
            @apply absolute;
            width: 585rpx;
            height: 756rpx;
            top: 50%;
            left: 50%;
            background: url(@/static/activity/red-package/win_bg.png);
            background-size: 100% 100%;
            transform: translate3d(-50%, -55%, 0);
            .title {
                font-size: 56rpx;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #ffd800;
                line-height: 58rpx;
                text-shadow: 2rpx 3rpx 3rpx rgba(1, 0, 26, 0.35);
                padding-top: 130rpx;
                text-align: center;
            }
            .sub-title {
                font-size: 33rpx;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #ffd800;
                line-height: 35rpx;
                text-shadow: 2px 3px 3px rgba(1, 0, 26, 0.35);
                padding-top: 138rpx;
                text-align: center;
            }
            .price {
                font-size: 83rpx;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #ffd800;
                line-height: 85rpx;
                text-shadow: 2rpx 3rpx 3rpx rgba(1, 0, 26, 0.35);
                padding-top: 20rpx;
                text-align: center;
            }
            .box {
                padding-top: 30rpx;
                .box-lock {
                    width: 258rpx;
                }
                .box-open {
                    width: 300rpx;
                }
            }
            .btn {
                width: 426rpx;
                height: 142rpx;
                background: url(@/static/activity/red-package/btn.png);
                background-size: 100% 100%;
                margin: 0rpx auto 0;
                // line-height: 130rpx;
                font-size: 56rpx;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #7a0e18;
                text-shadow: 1px 1px 0px #fede3c;
                // text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
</style>
