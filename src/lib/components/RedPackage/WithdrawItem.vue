<template>
    <view class="withdraw">
        <view class="withdraw-logo">
            <image
                src="@/static/activity/red-package/user.png"
                mode="widthFix"
            ></image>
        </view>
        <view class="withdraw-right">
            <view class="withdraw-action flex justify-around">
                <view class="player">
                    {{ $t('KEY_RED_INDEX_PLAYER') }}
                    {{ props.withdraw.userName }}
                </view>
                <view class="time">
                    {{ format(new Date(props.withdraw.recDate), 'yyyy/MM/dd') }}
                </view>
            </view>
            <view
                class="withdraw-money flex items-center"
                v-html="
                    $t('KEY_RED_INDEX_WITHDRAW_ITEM').replace(
                        '#MONEY#',
                        'R$' + props.withdraw.amount
                    )
                "
            ></view>
        </view>
    </view>
</template>
<script lang="ts" setup>
    import { numberWithCommas } from '@/common/common'
    import { computed } from 'vue'
    import { WithdrawRecordDto } from '@/NET/lobby/data-contracts'
    import { format } from 'date-fns'
    interface Prop {
        withdraw: WithdrawRecordDto
    }
    const props = defineProps<Prop>()
</script>
<style lang="scss">
    .withdraw {
        @apply rounded-14 flex box-border;
        width: 586rpx;
        height: 117rpx;
        line-height: 117rpx;
        background: #45387e;
        box-shadow: 1rpx 1rpx 6rpx 0px rgba(0, 0, 0, 0.15);
        padding: 0rpx 25rpx;
        margin-top: 18rpx;
        &:first-child {
            margin-top: 0rpx;
        }
        .withdraw-logo {
            @apply flex items-center;
            width: 92rpx;
            image {
                width: 74rpx;
            }
        }
        .withdraw-right {
            width: 438rpx;
            padding-left: 18rpx;
        }
        .withdraw-action {
            font-size: 22rpx;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            line-height: 28rpx;
            padding-top: 18rpx;
            .player {
                width: 332rpx;
            }
            .time {
                @apply flex-1;
            }
        }
        .withdraw-money {
            height: 56rpx;
            font-size: 22rpx;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #b2afc5;
            margin-top: 4rpx;
            line-height: 28rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
</style>
