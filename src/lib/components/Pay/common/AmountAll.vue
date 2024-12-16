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
        <view v-if="store.baseConfig.countryId === 'MEX'">
            <view class="tips" v-if="props.payType === 0">
                {{ $t('KEY_MESSAGE_MINMAX') }}
            </view>
            <view class="tips" v-else>
                {{ $t('KEY_MESSAGE_MINMAXWITHDRAW') }}
            </view>
        </view>
        <view
            class="tips"
            v-if="
                (store.baseConfig.countryId === 'BRA' &&
                store.userInfo?.cashLimit) && !hideAmountInfo
            "
        >
            {{ rule() }}
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { getPlatform } from "@/common/init"

    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Props {
        payType?: number
        payParams?: any
    }
    const props = withDefaults(defineProps<Props>(), {
        payType: 0,
        payParams: {},
    })

    interface Data {
        amount: number
    }

    const data = reactive<Data>({
        amount: 0,
    })

    const domain = getPlatform()
    const hideAmountInfo = computed(() => domain === 'max9f' && store.baseConfig.operatorId === 'own_lobby_bra999')

    const rule = computed(() => () => {
        return $t('KEY_PIX_MINMAXWITHDRAW')
            ?.replace('#minAmount#', store.userInfo?.cashLimit.minAmount)
            ?.replace('#maxAmount#', store.userInfo?.cashLimit.maxAmount)
    })

    const blurChange = () => {
        // var amount = String(data.amount)
        // amount = amount.replace(/[^\d]/g, '')
        // data.amount = Number(amount)
        // if (data.amount > store.userInfo?.cashLimit?.maxAmount) {
        //     nextTick(() => {
        //         data.amount = store.userInfo?.cashLimit.maxAmount
        //         props.payParams.amount = data.amount
        //     })
        // } else {
        //     props.payParams.amount = data.amount
        // }

        nextTick().then(() => formatAmount())
    }

    const inputChange = (e: any) => {
        // var amount = String(data.amount)
        // amount = amount.replace(/[^\d]/g, '')
        // //data.amount = Number(amount);
        // if (Number(data.amount) > store.userInfo?.cashLimit?.maxAmount) {
        //     nextTick(() => {
        //         data.amount = store.userInfo?.cashLimit.maxAmount
        //         props.payParams.amount = data.amount
        //     })
        // } else {
        //     props.payParams.amount = data.amount
        // }

        //  const maxAmount = store.userInfo?.cashLimit.maxAmount
        // // props.payParams.amount = data.amount
        //  let currentValue = e.detail.value || ''// 假设值在 e.detail.value 中
        //  // 使用正则表达式移除非数字字符（包括小数点）
        //  let newValue = currentValue.replace(/[^\d]/g, '')
        //  data.amount = (newValue > maxAmount) ? maxAmount: newValue
        //     console.log("default:" + data.amount);
        //  if (Number(data.amount) > store.userInfo?.payLimit.maxAmount) {
        //     console.log("if:" + props.payParams.amount);
        //         nextTick(() => {
        //             data.amount = store.userInfo?.payLimit.maxAmount
        //             props.payParams.amount = data.amount
        //         })
        //     } else {
        //         data.amount = data.amount;
        //         props.payParams.amount = data.amount
        //         console.log("else:" + props.payParams.amount);
        //     }
        //props.payParams.amount = data.amount

        nextTick().then(() => formatAmount())
    }

    const allin = (e: any) => {
        data.amount = store.userInfo?.withDrawM
        data.amount =
            data.amount > store.userInfo?.cashLimit.maxAmount
                ? store.userInfo?.cashLimit.maxAmount
                : data.amount
        //inputChange()

        // inputChange(e)

        formatAmount()
    }

    const getAmount = () => {
        return data.amount
    }

    /**
     * @description 格式化金额，保留三位小数，限制最小最大值
     */
    function formatAmount() {
        data.amount = parseFloat(
            String(data.amount).replace(/^(-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3')
        )

        // 最大值最小值判断
        if (Number(data.amount) > store.userInfo?.cashLimit?.maxAmount) {
            data.amount = store.userInfo?.cashLimit.maxAmount
            props.payParams.amount = data.amount
        } else {
            props.payParams.amount = data.amount
        }
    }

    defineExpose({
        getAmount,
    })
</script>

<style lang="scss">
    .amount-select-view {
        .title {
            @apply text-white-60;
            font-size: 25rpx;
        }

        .btn-view {
            @apply flex justify-between items-center;
            margin-top: 10rpx;
            .select-btn {
                @apply flex-1 flex justify-center items-center relative border-black-80 text-white-100;
                margin: 0 10rpx;
                height: 90rpx;
                border-radius: 8rpx;
                font-weight: bold;
                font-size: 28rpx;
                border-width: 2rpx;
                border-style: solid;
                &:first-child {
                    margin-left: 0;
                }

                &:last-child {
                    margin-right: 0;
                }
                .choosed-icon {
                    @apply absolute right-0 bottom-0;
                    width: 25rpx;
                    height: 25rpx;
                    img {
                        @apply w-full h-full;
                    }
                }
            }
            .selected {
                border-color: var(--primary-color);
            }
        }
        .tips {
            @apply text-white-60;
            font-size: 25rpx;
            margin-top: 10rpx;
        }

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
