<template>
    <view class="amount-select-view">
        <view class="title">{{ $t('KEY_PAY_SELECTAMOUNT') }}</view>
        <view class="btn-view">
            <view
                class="select-btn"
                v-for="(item, index) in amountList?.items"
                :class="{ selected: data.chooseIndex === index }"
                :key="index"
                @click="() => btnClick(index)"
            >
                <!-- {{ $t('KEY_PAY_CURRENCY') }}  -->
                <view>R$ {{ item.amount }}</view>
                <view class="bonus" v-if="bonusChoosed === 0 && item.bonus">
                    {{ item.bonus }} {{ $t('KEY_PAY_BONUS') }}
                </view>
                <view class="choosed-icon" v-show="data.chooseIndex === index">
                    <img src="@/static/icon/checked_float.png" alt="" />
                </view>
                <view v-if="index === 1" class="select_hot">
                  <img src="@/static/icon/select_hot.png" alt="" />
                </view>
            </view>
        </view>
        <view class="input-view">
            <view class="currency">R$</view>
            <input
                type="number"
                v-model="data.amount"
                :placeholder="$t('KEY_INPUT_PLACEHOLDER')"
                placeholder-style="color: rgba(124, 124, 124, 0.5);"
                @input="inputChange"
                @blur="blurChange"
            />
            <view class="bonusNow" v-if="bonusChoosed === 0">
                +{{ data.bonusNow }}
            </view>
        </view>
        <view v-if="store.baseConfig.countryId === 'MEX'">
            <view class="tips" v-if="props.payType === 0">
                {{ $t('KEY_MESSAGE_MINMAX') }}
            </view>
            <view class="tips" v-else>
                {{ $t('KEY_MESSAGE_MINMAXWITHDRAW') }}
            </view>
        </view>
        <view v-if="store.baseConfig.countryId === 'BRA'">
            <view class="tips" v-if="store.userInfo?.payLimit?.length">
                {{ rule() }}
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import _ from 'lodash'
    import { api as lobbyApi } from '@/NET/lobby'

    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Props {
        payType?: number
        payParams?: any
        amountList: any
        bonusChoosed: number
        channels: number
    }
    const props = withDefaults(defineProps<Props>(), {
        payType: 0,
        payParams: {},
        amountList: {},
        bonusChoosed: 0,
        channels: 5,
    })

    interface Data {
        amount: number | string
        chooseIndex: number | string
        bonusNow: number | string
        // selectData?: any
    }
    const data = reactive<Data>({
        amount: 0,
        chooseIndex: '',
        bonusNow: 0,
        // selectData: [
        //     {
        //         amount: 150,
        //     },
        //     {
        //         amount: 500,
        //     },
        //     {
        //         amount: 1000,
        //     },
        // ],
    })

    const rule = computed(() => () => {
        return $t('KEY_PIX_MINMAXDEPOSIT')
            ?.replace('#minAmount#', store.userInfo?.payLimit?.[props?.payParams?.channelSelect || 0]?.minAmount)
            ?.replace('#maxAmount#', store.userInfo?.payLimit?.[props?.payParams?.channelSelect || 0]?.maxAmount)
    })

    const btnClick = (index) => {
        if (data.chooseIndex === index) {
            data.chooseIndex = ''
            data.amount = 0
            data.bonusNow = 0
            props.payParams.amount = data.amount
            return
        }
        data.chooseIndex = index
        data.amount = props.amountList.items[index].amount
        data.bonusNow = props.amountList.items[index].bonus
        // console.log(
        //     'props.amountList.items[index].bonus',
        //     props.amountList.items[index].bonus
        // )

        props.payParams.amount = data.amount
    }

    const blurChange = () => {
        var amount = String(data.amount)
        amount = amount.replace(/[^\d]/g, '')
        data.amount = Number(amount)
        if (data.amount > store.userInfo?.payLimit?.[props?.payParams?.channelSelect || 0]?.maxAmount) {
            nextTick(() => {
                data.amount = store.userInfo?.payLimit?.[props?.payParams?.channelSelect || 0]?.maxAmount
                props.payParams.amount = store.userInfo?.payLimit?.[props?.payParams?.channelSelect || 0]?.maxAmount
            })
        } else {
            props.payParams.amount = data.amount
        }

        // FIX: 修复选择金额后重复获取数据问题
        // getBonus()
    }

    const inputChange = () => {
        if (Number(data.amount) > store.userInfo?.payLimit?.[props?.payParams?.channelSelect || 0]?.maxAmount) {
            nextTick(() => {
                data.amount = store.userInfo?.payLimit?.[props?.payParams?.channelSelect || 0]?.maxAmount
                props.payParams.amount = store.userInfo?.payLimit?.[props?.payParams?.channelSelect || 0]?.maxAmount
            })
        } else {
            props.payParams.amount = data.amount
        }

        // data.amount = _.floor(data.amount, 2)
        data.chooseIndex = ''
        props.payParams.amount = data.amount
        // if (Number(data.amount) >= props.amountList.leastPayForReward) {
        //     let bonus = _.floor(
        //         Number(data.amount) * props.amountList.multiple,
        //         2
        //     )

        //     data.bonusNow =
        //         bonus > props.amountList.maximum
        //             ? props.amountList.maximum
        //             : bonus
        // } else {
        //     data.bonusNow = 0
        // }
        handleChange()

        //getAmount()
    }

    const getBonus = async () => {
        if (!data.amount) {
            data.bonusNow = 0
            return
        }
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                channels: props.channels,
                receiveBonus: props.bonusChoosed === 0 ? 1 : 0,
                amount: data.amount,
            },
            store.commonParams
        )
        let res = await lobbyApi.home.getPayBonus(params)
        if (res.success) {
            data.bonusNow = res.result
        } else {
            ErrorHandler(res, 'pixDeposit')
        }
    }

    const handleChange = _.debounce(getBonus, 500)

    const getAmount = () => {
        return data.amount
    }
    watch(
        () => props.amountList,
        () => {
            data.chooseIndex = ''
            let index = props.amountList.items.findIndex(
                (item) => item.isSelected
            )
            btnClick(index)
        }
    )

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
            @apply flex items-center flex-wrap;
            margin-top: 10rpx;
            width: calc(100% + 30rpx);
            .select-btn {
                @apply flex justify-center items-center relative flex-col rounded-7 text-white-100;
                // margin: 0 10rpx;
                border: 2rpx solid;
                @apply border-black-80;
                margin: 10rpx 0;
                margin-right: 10rpx;
                width: 210rpx;
                height: 90rpx;
                font-weight: bold;
                font-size: 28rpx;
                .bonus {
                    @apply text-yellow;
                    font-size: 22rpx;
                    font-weight: bold;
                }
                .choosed-icon {
                    @apply absolute right-0 bottom-0;
                    width: 25rpx;
                    height: 25rpx;
                    img {
                        @apply w-full h-full;
                    }
                }
                .select_hot {
                  position: absolute;
                  top: -5rpx;
                  right: -12rpx;
                  width: 90rpx;
                  height: 27rpx;
                  img {
                    width: 90rpx;
                    height: 27rpx;
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
            @apply relative flex justify-between bg-black-60;
            margin-top: 20rpx;
            border-radius: 10rpx;
            .currency {
                @apply absolute h-full flex items-center text-white-100;
                left: 20rpx;
                font-size: 33rpx;
                font-weight: bold;
            }
            input {
                @apply flex-1;
                margin-left: 50rpx;
            }
            ::v-deep input {
                @apply bg-black-60 text-white-100 font-bold;
            }
            .bonusNow {
                @apply flex justify-end items-center text-yellow;
                width: 100rpx;
                font-size: 33rpx;
                font-weight: bold;
                padding-right: 20rpx;
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
