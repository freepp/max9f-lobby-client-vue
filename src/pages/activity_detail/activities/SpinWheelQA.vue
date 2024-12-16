<template>
    <view class="activity-view">
        <view class="banner">
            <img src="@/static/activity/roulette_banner.webp" alt="" />
        </view>
        <view class="detail">
            <view class="content" v-html="$t('KEY_ACTIVITY_SPINWHEEL', {domain: domain})"></view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import { getPlatform } from '@/common/init'
    const domain = getPlatform()

    interface Props {
        hotGames?: any
    }

    const props = withDefaults(defineProps<Props>(), {
        hotGames: [],
    })

    interface Data {
        title?: string
    }

    const data = reactive<Data>({
        title: 'activity',
    })
</script>

<style lang="scss">
    .activity-view {
        min-height: 100%;
        background: #182828;
        padding-bottom: 40rpx;

        .banner {
            @apply w-full;
            img {
                @apply w-full h-full;
            }
        }
        .card {
            @apply m-auto box-border;
            width: 460rpx;
            height: 137rpx;
            background-image: url('@/static/activity/jinerdikuang.png');
            background-size: 100% 100%;

            font-size: 42rpx;
            font-weight: bold;
            line-height: 50rpx;
            padding: 10rpx;
            color: #ffd21c;
            -webkit-text-stroke: 3rpx #192d2b;
            text-stroke: 3rpx #192d2b;
            text-align: center;
        }
        .detail {
            padding: 0 30rpx;
            min-height: 350rpx;
            .title {
                font-size: 28rpx;
                color: #cfdea1;
                margin: 60rpx 0 12rpx;
            }
            .content {
                font-size: 25rpx;
                color: #cbcbcb;
                line-height: 29rpx;
                margin-bottom: 20rpx;
            }
        }
        .ad-view {
            padding: 0 20rpx;
            margin-top: 20rpx;
            .ad-title {
                font-size: 28rpx;
                color: #cbcbcb;
            }
            .ad-list {
                @apply flex justify-between;
                margin-top: 11rpx;
                .ad-img {
                    @apply overflow-hidden;
                    width: 228rpx;
                    height: 180rpx;
                    background-color: #eee;
                    border-radius: 8rpx;
                }
            }
            .ad-content {
                margin-top: 15rpx;
                font-size: 21rpx;
                color: #cbcbcb;
                line-height: 25rpx;
            }
        }
    }
</style>
