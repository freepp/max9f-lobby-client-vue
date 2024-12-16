<template>
    <view class="activity-view">
        <image
            class="w-full"
            src="@/static/activity/banner_8_register.webp"
            mode="widthFix"
        ></image>
        <view class="detail">
            <!-- <view class="title" v-html="$t('KEY_LOSE_TITLE')"></view>
            <view class="rule" v-html="$t('KEY_ACTIVITY_100008_RULES')"></view>
            <view
                class="normal-btn bg-primary"
                @click="goDeposit"
                v-html="$t('KEY_ACTIVITY_RECHARGE_GIFT_BTN')"
            ></view> -->
            <view class="title">
                Seu Depósito Duplicado – Ganhe 100% a Mais!
            </view>
            <view
                class="normal-btn bg-primary"
                @click="goDeposit"
                v-html="$t('KEY_ACTIVITY_RECHARGE_GIFT_BTN')"
            ></view>
            <view class="percent-table">
                <view class="tr">
                    <view class="th">Depósito</view>
                    <view class="th">Total Ganho</view>
                </view>
                <view class="tr" v-for="item in tableData">
                    <view class="td">
                        {{ item.bonus }}
                    </view>
                    <view class="td">
                        {{ item.percent }}
                    </view>
                </view>
            </view>
            <view
                class="statement"
                v-html="$t('KEY_ACTIVITY_DAILY_TOP_UP_TIP')"
            ></view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    const commonStore = useCommonStore()

    const tableData = [
        { bonus: 'R$2.000', percent: 'R$3.000' },
        { bonus: 'R$1.000', percent: 'R$2.000' },
        { bonus: 'R$800', percent: 'R$1.200' },
        { bonus: 'R$500', percent: 'R$650' },
        { bonus: 'R$300', percent: 'R$390' },
        { bonus: 'R$200', percent: 'R$250' },
        { bonus: 'R$100', percent: 'R$110' },
        { bonus: 'R$50', percent: 'R$52' },
        { bonus: 'R$20', percent: 'R$21' },
    ]

    const goDeposit = async () => {
        commonStore.depositTab = 0
        uni.switchTab({ url: '/pages/deposit/index' })
    }
</script>

<style lang="scss">
    .activity-view {
        min-height: 100%;
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
            .percent-table {
                @apply table text-black font-bold text-center;
                margin: 27rpx auto 0;
                font-size: 26rpx;
                border-collapse: collapse;
                border-radius: 7rpx;
                overflow: hidden;
                .tr {
                    @apply table-row;
                    .th,
                    .td {
                        @apply table-cell bg-white;
                        width: 334rpx;
                        height: 90rpx;
                        line-height: 90rpx;
                        border: 1px solid #000;
                    }
                    .th {
                        @apply text-white-100;
                        background: linear-gradient(0deg, #282a2d, #39424a);
                        border-top-width: 0;
                    }
                }
                .tr .th:first-child,
                .tr .td:first-child {
                    border-left-width: 0;
                }
                .tr .th:last-child,
                .tr .td:last-child {
                    border-right-width: 0;
                }
                .tr:last-child .td {
                    border-bottom-width: 0;
                }
            }
            .license {
                @apply text-white-90;
                width: 634rpx;
                font-size: 28rpx;
                line-height: 35rpx;
                margin-top: 33rpx;
            }
            .statement {
                margin-top: 60rpx;
                width: 661rpx;
                font-size: 28rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #fff;
                line-height: 35rpx;
                opacity: 0.8;
                padding-bottom: 67rpx;
            }
        }
        .normal-btn {
            margin-top: 80rpx;
        }
    }
</style>
