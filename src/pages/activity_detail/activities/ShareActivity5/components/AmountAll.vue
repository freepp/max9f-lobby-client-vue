<template>
    <view class="amount-select-view">
        <view class="input-view">
            <input
                type="number"
                v-model="data.amount"
                :placeholder="$t('KEY_INPUT_PLACEHOLDER')"
                placeholder-style="color: #C4C4C4;"
                @input="inputChange"
                @blur="blurChange"
            />
            <view class="all-btn" @click="allin">Retirar Todos</view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { i18n } from '@/common/i18nConfig'
    const { t: $t } = i18n.global

    interface Props {
        payParams?: any
        amountToWithdraw: number
    }
    const props = withDefaults(defineProps<Props>(), {
        payParams: {},
        amountToWithdraw: 0
    })

    interface Data {
        amount: number
    }

    const data = reactive<Data>({
        amount: 0,
    })

    const blurChange = () => {
        nextTick().then(() => formatAmount())
    }

    const inputChange = () => {
        nextTick().then(() => formatAmount())
    }

    const allin = () => {
        data.amount = props.amountToWithdraw || 0
        formatAmount()
    }
    /**
     * @description 格式化金额，保留三位小数，限制最小最大值
     */
    function formatAmount() {
        data.amount = parseFloat(
            String(data.amount).replace(/^(-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3')
        )
        // 最大值最小值判断
        if (Number(data.amount) > props.amountToWithdraw) {
            data.amount = props.amountToWithdraw
        }
        props.payParams.amount = data.amount
    }
</script>

<style lang="scss">
    .amount-select-view {
        .input-view {
            @apply flex justify-between items-center;
            margin-top: 20rpx;
            ::v-deep input {
                @apply bg-black-60 text-white-100 flex-1;
            }
            .all-btn {
                @apply bg-dialog flex justify-center items-center text-center font-bold;
                width: 156rpx;
                border-radius: 0 8rpx 8rpx 0;
                height: 90rpx;
                color: #454545;
                font-size: 28rpx;
            }
        }
    }

    ::v-deep uni-input {
        height: 90rpx !important;
        background-color: #fff;
        padding: 0 30rpx;
        border-radius: 8rpx;
        font-size: 28rpx;
        color: #414141;
    }
</style>
