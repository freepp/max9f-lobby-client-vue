<template>
    <view class="activity-view">
        <view class="scroll-view">
            <image
                class="w-full"
                src="@/static/activity/recharge_eyeryday.jpg"
                mode="widthFix"
            ></image>
            <view class="detail">
                <view class="title" v-html="$t('KEY_LOSE_TITLE')"></view>
                <view
                    class="rule"
                    v-html="$t('KEY_ACTIVITY_100008_RULES')"
                ></view>
                <view
                    class="rule"
                    v-html="$t('KEY_ACTIVITY_100008_RULES')"
                ></view>
            </view>
        </view>

        <view class="bottom-view">
            <view
                class="normal-btn bg-primary"
                @click="goDeposit"
                v-html="$t('KEY_ACTIVITY_RECHARGE_GIFT_BTN')"
            ></view>
        </view>
    </view>
</template>

<script lang="ts" setup>

    const commonStore = useCommonStore()

    const goDeposit = async () => {
        commonStore.depositTab = 0
        uni.switchTab({ url: '/pages/deposit/index' })
    }
</script>

<style lang="scss">
    .activity-view {
        .scroll-view {
            @apply absolute left-0 right-0 top-0 overflow-y-scroll;
            bottom: 120rpx;
        }
        .detail {
            padding: 51rpx 41rpx 36rpx;
            .title {
                @apply font-bold;
                font-size: 33rpx;
                font-weight: bold;
                color: #ffffff;
                line-height: 33rpx;
            }
            .rule {
                @apply text-white-90;
                width: 656rpx;
                margin-top: 17rpx;
                font-size: 28rpx;
                line-height: 35rpx;
            }
            .license {
                @apply text-white-90;
                width: 634rpx;
                font-size: 28rpx;
                line-height: 35rpx;
                margin-top: 33rpx;
            }
        }
    }
    .bottom-view {
        @apply absolute bottom-0 left-0 w-full box-border flex justify-center items-center;
        height: 120rpx;
        padding: 0 40rpx;
    }
</style>
