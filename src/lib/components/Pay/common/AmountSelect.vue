<template>
    <view class="amount-select-view">
        <view class="title">{{ $t('KEY_PAY_SELECTAMOUNT') }}</view>
        <view class="btn-view">
            <view
                class="select-btn"
                v-for="(item, index) in data.selectData"
                :class="{ selected: data.chooseIndex === index }"
                :key="index"
                @click="() => btnClick(index)"
            >
                {{ item.amount }}
                <view class="choosed-icon" v-show="data.chooseIndex === index">
                    <img src="@/static/icon/checked_float.png" alt="" />
                </view>
            </view>
        </view>
        <view class="input-view">
            <input
                type="number"
                v-model="data.amount"
                :placeholder="$t('KEY_INPUT_PLACEHOLDER')"
                placeholder-style="color: #C4C4C4;"
                @input="inputChange"
            />
        </view>
        <view v-if="store.baseConfig.countryId === 'MEX'">
            <view class="tips" v-if="props.payType === 0">
                {{ $t('KEY_MESSAGE_MINMAX') }}
            </view>
            <view class="tips" v-else>
                {{ $t('KEY_MESSAGE_MINMAXWITHDRAW') }}
            </view>
        </view>
        <view class="tips" v-if="store.baseConfig.countryId === 'BRA'">
            {{ rule() }}
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { ga } from '@/common/common'
    import { reactive, ref, computed } from 'vue'
    import { useUsersStore } from '@/store/userStore'
    import { i18n } from '@/common/i18nConfig'
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
        amount: number | string
        chooseIndex: number | string
        selectData?: any
    }
    const data = reactive<Data>({
        amount: 0,
        chooseIndex: '',
        selectData: [
            {
                amount: 150,
            },
            {
                amount: 500,
            },
            {
                amount: 1000,
            },
        ],
    })

    const rule = computed(() => () => {
        return $t('KEY_PIX_MINMAXWITHDRAW')
            ?.replace('#minAmount#', store.userInfo?.cashLimit.minAmount)
            ?.replace('#maxAmount#', store.userInfo?.cashLimit.maxAmount)
    })

    const btnClick = (index) => {
        if (data.chooseIndex === index) {
            data.chooseIndex = ''
            data.amount = 0
            props.payParams.amount = data.amount
            return
        }
        data.chooseIndex = index
        data.amount = data.selectData[index].amount
        
        props.payParams.amount = data.amount
    }

    const inputChange = () => {
        data.chooseIndex = ''
        props.payParams.amount = data.amount
    }

    const getAmount = () => {
        return data.amount
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
            margin-top: 20rpx;
            ::v-deep input {
                @apply bg-black-60 text-white-100;
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
