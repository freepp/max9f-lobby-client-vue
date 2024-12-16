<template>
    <view class="balance-board-view">
        <view class="top-view">
            <view class="balance-item">
                <view>
                    <view class="label">
                        {{ $t('KEY_ME_BALANCE') }}
                    </view>
                    <view class="value-item">
                      R$
                      {{ numberWithCommas(amountToWithdraw) }}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { numberWithCommas } from '@/common/common'

    interface Props {
        amountToWithdraw: number
    }
    withDefaults(defineProps<Props>(), {
        amountToWithdraw: 0
    })

</script>

<style lang="scss">
    .balance-board-view {
        @apply w-full overflow-hidden;
        border-radius: 8rpx;
        margin-top: 20rpx;
        .balance-item {
            @apply flex overflow-hidden;
            .label {
                font-size: 26rpx;
                color: #e8e8e8;
            }
            .value-item {
                @apply flex;
                font-size: 50rpx;
                font-weight: bold;
            }
        }
        .top-view {
            @apply w-full flex items-center box-border;
            height: 124rpx;
            background: linear-gradient(0deg, #282a2d, #39424a);
            padding: 0 28rpx;
        }
    }
</style>
