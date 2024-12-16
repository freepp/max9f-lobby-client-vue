<template>
    <view class="amount-select-view">
        <!-- <view class="title">{{ $t('KEY_PAY_SELECTAMOUNT') }}</view> -->
        <view class="btn-view">
            <view
                class="select-btn"
                v-for="(item, index) in channelList"
                :class="{ selected: props.payParams.channelSelect === index }"
                :key="index"
                @click="() => btnClick(index)"
            >
                <view class="logo-view">
                    <img class="logo" src="@/static/pay/logo_pix.png" />
                    <text>{{ intToRoman(index + 1) }}</text>
                </view>
                <view
                    class="choosed-icon"
                    v-show="props.payParams.channelSelect === index"
                >
                    <img src="@/static/icon/checked_float.png" alt="" />
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { ga } from '@/common/common'
    import { reactive, ref, onMounted, watch, computed } from 'vue'
    import { useUsersStore } from '@/store/userStore'
    import _ from 'lodash'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { i18n } from '@/common/i18nConfig'
    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Props {
        payType?: number
        payParams?: any
        channelList: any
        channels: number
    }
    const props = withDefaults(defineProps<Props>(), {
        payType: 0,
        payParams: {},
        channelList: [],
        channels: 5,
    })

    interface Data {
        amount: number | string
        bonusNow: number | string
        // selectData?: any
    }
    const data = reactive<Data>({
        amount: 0,
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
            ?.replace('#minAmount#', store.userInfo?.payLimit.minAmount)
            ?.replace('#maxAmount#', store.userInfo?.payLimit.maxAmount)
    })

    const btnClick = (index) => {
        props.payParams.channelSelect = index
    }

    var intToRoman = function (num) {
        let numArr = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
        let RomaArr = [
            'M',
            'CM',
            'D',
            'CD',
            'C',
            'XC',
            'L',
            'XL',
            'X',
            'IX',
            'V',
            'IV',
            'I',
        ]
        let index = 0
        let res = ''
        while (index < 13) {
            while (num >= numArr[index]) {
                res += RomaArr[index]
                num -= numArr[index]
            }
            index++
        }
        return res
    }
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
            margin-bottom: 50rpx;
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
                .logo-view {
                    @apply flex justify-around items-center;
                    .logo {
                        width: 100rpx;
                        margin-right: 15rpx;
                    }
                }
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
