<template>
    <view class="bet-detail">
        <view class="logo">
            {{ betDetail.date }}
            <span>{{ betDetail.year }}</span>
        </view>
        <view class="detail">
            <view class="detail-item">
                <view>{{ $t('KEY_RECORD_TOTAL') }}:</view>
                <view>
                    <view>{{ betDetail.totalBet }}</view>
                </view>
            </view>
            <view class="detail-item">
                <view>{{ $t('KEY_RECORD_RETURN') }}:</view>
                <view>{{ betDetail.totalRewardReturn }}</view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { reactive } from 'vue'

    interface Props {
        betDetail?: any
    }

    const props = withDefaults(defineProps<Props>(), {
        betDetail: () => null,
    })
</script>

<style lang="scss">
    .bet-detail {
        @apply flex items-center bg-black-80 border-black-80 text-white-100;
        padding: 0 40rpx;
        height: 150rpx;

        .logo {
            margin-right: 40rpx;
            font-size: 44rpx;
            width: 120rpx;
            line-height: 44rpx;
            font-weight: 600;
            span {
                font-size: 50rpx;
            }
        }

        .detail {
            @apply flex-1;
        }

        .detail-item {
            @apply flex justify-between items-center;
            font-size: 28rpx;
            margin-bottom: 12rpx;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
</style>
