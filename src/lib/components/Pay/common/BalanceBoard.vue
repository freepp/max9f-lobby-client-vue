<template>
    <view class="balance-board-view">
        <view class="top-view">
            <view class="balance-item">
                <view>
                    <view class="label">
                        {{ $t('KEY_ME_BALANCE') }}
                    </view>
                    <view class="value-item">
                        {{ store.baseConfig.countryId === 'BRA' ? 'R$' : '$' }}
                        {{ numberWithCommas(_.floor(store.userInfo?.cash, 2)) }}
                    </view>
                </view>
            </view>
        </view>
        <view class="bottom-view" v-if="store.baseConfig.isShowBonus">
            <view class="balance-item">
                <view>
                    <view class="label">
                        {{ $t('KEY_ME_BONUS') }}
                    </view>
                    <view class="value-item">
                        <text v-if="store.baseConfig.countryId === 'BRA'">
                            R$
                        </text>
                        <text v-else>$</text>
                        {{
                            numberWithCommas(_.floor(store.userInfo?.bonus, 2))
                        }}
                    </view>
                </view>
            </view>

            <!-- <view class="balance-item">
                <view v-if="store.userInfo?.requireFlowMoney">
                    <view class="label">{{ $t('KEY_PAY_RUNWATER') }}</view>
                    <view class="value-item">
                        {{ store.baseConfig.countryId === 'BRA' ? 'R$' : '$' }}
                        {{
                            numberWithCommas(
                                _.floor(store.userInfo?.requireFlowMoney, 2)
                            )
                        }}
                    </view>
                </view>
                <view v-else>
                    <view class="label">
                        {{ $t('KEY_ME_WITHDRAWABLE') }}
                    </view>
                    <view class="value-item">
                        {{ store.baseConfig.countryId === 'BRA' ? 'R$' : '$' }}
                        {{
                            numberWithCommas(
                                _.floor(store.userInfo?.withDrawM, 2)
                            )
                        }}
                    </view>
                </view>
            </view> -->
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import { useUsersStore } from '@/store/userStore'
    import { numberWithCommas } from '@/common/common'
    import _ from 'lodash'
    const store = useUsersStore()

    interface Props {
        payType?: number
        payParams?: any
    }
    const props = withDefaults(defineProps<Props>(), {
        payType: 0,
        payParams: {},
    })

    interface Data {}
    const data = reactive<Data>({})
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

        .line {
            width: 8rpx;
            height: auto;
            border-radius: 8rpx;
            background: linear-gradient(0deg, #ffa922, #ff6c22);
            margin-right: 8rpx;
        }
        .line-balance {
            background: linear-gradient(0deg, #00ff72, #098842);
        }
        .line-withdraw {
            background: linear-gradient(0deg, #9dcfb3, #20816d);
        }
        .top-view {
            @apply w-full flex items-center box-border;
            height: 124rpx;
            background: linear-gradient(0deg, #282a2d, #39424a);
            padding: 0 28rpx;
        }

        .bottom-view {
            @apply w-full flex items-center justify-between box-border;
            height: 92rpx;
            padding: 0 28rpx;
            background: rgba(30, 30, 30);
            .balance-item {
                @apply flex overflow-hidden flex-1;
                .label {
                    font-size: 22rpx;
                    color: #e8e8e8;
                }
                .value-item {
                    @apply flex truncate;
                    font-size: 32rpx;
                    font-weight: bold;
                }
            }
        }
    }
</style>
