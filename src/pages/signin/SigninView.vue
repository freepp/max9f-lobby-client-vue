<template>
    <view class="signin-view" v-if="data.signDays.length > 0">
        <view class="header-view">
            <view class="sign-title">{{ $t('KEY_SIGNIN_SUBTITLE') }}</view>
            <view class="history-btn" @click="goHistory">
                {{ $t('KEY_SIGNIN_HISTORY') }}
            </view>
        </view>
        <view class="content-view">
            <view class="day-view">
                <view
                    class="day-item"
                    :class="{ 'item-choosed': data.chooseIndex === index }"
                    v-for="(item, index) in data.signDays"
                    :key="index"
                    @click="dayChoosed(item, index)"
                >
                    <view class="item" v-if="item.status !== 1">
                        <view class="text-32">{{ item.dateNumber }}</view>
                        <view>{{ $t('KEY_SIGNIN_DAYS') }}</view>
                    </view>
                    <view class="item" v-if="item.status === 1">
                        <img
                            class="img-view"
                            src="@/static/signin/duihao-icon.png"
                            alt=""
                        />
                    </view>
                    <view class="missed" v-if="item.status === 3">
                        <img src="@/static/signin/louqian-icon.png" alt="" />
                    </view>
                </view>
            </view>
            <view class="sign-detail">
                <view class="img-view">
                    <img
                        v-if="data.signDays[data.chooseIndex].status === 1"
                        src="@/static/signin/check_in_prev_open.png"
                        alt=""
                    />
                    <img
                        v-else
                        src="@/static/signin/check_in_prev.png"
                        alt=""
                    />
                </view>
                <view class="text-view">
                    <text v-if="data.signDays[data.chooseIndex].status === 3">
                        {{
                            $t('KEY_SIGNIN_RESIGNINTIP')
                                .replace(
                                    '#missSigninPayAmount#',
                                    data.signInfo.missSigninPayAmount
                                )
                                .replace(
                                    '#reward#',
                                    data.signDays[data.chooseIndex].reward
                                )
                        }}
                    </text>
                    <text v-else>
                        {{
                            $t('KEY_SIGNIN_SIGNINTIP')
                                .replace(
                                    '#signinPayAmount#',
                                    data.signInfo.signinPayAmount
                                )
                                .replace(
                                    '#dateNumber#',
                                    data.signDays[data.chooseIndex].dateNumber
                                )
                                .replace(
                                    '#reward#',
                                    data.signDays[data.chooseIndex].reward
                                )
                        }}
                    </text>
                </view>
                <view class="control-view">
                    <view
                        v-if="data.signDays[data.chooseIndex].status === 1"
                        class="normal-btn btn-view disabled bg-default"
                    >
                        {{ $t('KEY_SIGNIN_SIGNEDIN') }}
                    </view>
                    <loadingBtn
                        v-else-if="data.signDays[data.chooseIndex].status === 2"
                        class="normal-btn btn-view bg-primary"
                        :loading="data.signDays[data.chooseIndex].btnloading"
                        @loadData="execute(data.signDays[data.chooseIndex], 2)"
                    >
                        {{ $t('KEY_SIGNIN_OPEN') }}
                    </loadingBtn>
                    <loadingBtn
                        v-else-if="data.signDays[data.chooseIndex].status === 3"
                        class="normal-btn btn-view bg-primary"
                        :loading="data.signDays[data.chooseIndex].btnloading"
                        @click="execute(data.signDays[data.chooseIndex], 3)"
                    >
                        {{ $t('KEY_SIGNIN_OPEN') }}
                    </loadingBtn>
                    <view
                        v-else
                        class="normal-btn btn-view disabled bg-default"
                    >
                        {{ $t('KEY_SIGNIN_OPEN') }}
                    </view>
                    <!-- <view class="bonus">R$10</view> -->
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { reactive, onMounted, watch } from 'vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { modal } from '@/lib/components/Modal'
    import loadingBtn from '@/lib/components/Button/LoadingBtn.vue'
    import { useUsersStore } from '@/store/userStore'
    import { i18n } from '@/common/i18nConfig'
    import { ga } from '@/common/common'

    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Props {
        pageType?: number
    }
    const props = withDefaults(defineProps<Props>(), {
        pageType: 1,
    })

    interface Data {
        chooseIndex: number
        signDays: any
        signInfo: any
    }
    const data = reactive<Data>({
        chooseIndex: 0,
        signDays: [],
        signInfo: {},
    })

    const dayChoosed = (item, index) => {
        data.chooseIndex = index
    }

    const getSignInData = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.signIn.load(params)
        if (res.success) {
            console.log(res.result)
            data.signInfo = res.result
            data.signDays = res.result.items
            data.chooseIndex = data.signDays.findIndex(
                (item) => item.isSelected
            )
        } else {
            ErrorHandler(res, 'getSignInData')
        }
    }

    const execute = async (item, type) => {
        item.btnloading = true
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                dateNumber: item.dateNumber,
            },
            store.commonParams
        )
        let res = await lobbyApi.signIn.execute(params)
        item.btnloading = false
        if (res.success && res.result.status) {
            modal({
                type: 'success',
                width: '500rpx',
                title: $t('KEY_POPUP_TIPS'),
                content: $t('KEY_SIGNIN_SIGNINSUCCESS').replace(
                    '#reward#',
                    res.result.rewardAmount.toString()
                ),
                confirmText: 'OK',
                showCancel: false,
            })
            getSignInData()
        } else {
            switch (res.code) {
                case 'RS_NOT_PAYLIMIT':
                    modal({
                        width: '500rpx',
                        type: 'warning',
                        title: $t('KEY_POPUP_TIPS'),
                        content:
                            type === 2
                                ? $t('KEY_SIGNIN_SIGNINPOPUP').replace(
                                      '#signinPayAmount#',
                                      res.result.toString()
                                  )
                                : $t('KEY_SIGNIN_RESIGNINPOPUP').replace(
                                      '#missSigninPayAmount#',
                                      res.result.toString()
                                  ),
                        cancelText: $t('KEY_ALERT_DEPOSIT_CANCEL'),
                        confirmText: 'OK',
                        showCancel: false,
                        onConfirm: () => {},
                        onCancel: () => {},
                    })
                    break
                default:
                    modal({
                        type: 'warning',
                        width: '500rpx',
                        title: $t('KEY_POPUP_TIPS'),
                        content: $t('KEY_SIGNIN_SIGNINFAILED'),
                        confirmText: 'OK',
                        showCancel: false,
                    })
            }
            ErrorHandler(res, 'execute')
        }
    }

    const goHistory = () => {
        uni.navigateTo({
            url: '/pages/fund_details/index?page_type=3',
        })
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )
    const initData = () => {
        if (store.userInfo) {
            getSignInData()
        }
    }

    onMounted(() => {
        initData()
    })
</script>

<style lang="scss">
    .signin-view {
        padding: 0 40rpx;
        .header-view {
            @apply flex justify-between;
            .sign-title {
                @apply flex items-center box-border;
                height: 54rpx;
                padding: 0 30rpx 0 10rpx;
                font-size: 28rpx;
                font-weight: bold;
                background: #f2ac35;
                color: #392706;
                border-radius: 0 54rpx 0 0;
            }
            .history-btn {
                @apply flex justify-center items-center box-border;
                border-radius: 42rpx;
                width: 116rpx;
                height: 42rpx;
                border: 2rpx solid #74818e;
                background: transparent;
                color: #74818e;
            }
        }
        .content-view {
            @apply w-full box-border;
            padding: 10rpx;
            background: #f2ac35;
            .day-view {
                @apply flex justify-between;
                height: 88rpx;
                .day-item {
                    @apply relative;
                    width: 86rpx;
                    height: 80rpx;
                    background: #5e420f;
                    border-radius: 8rpx;
                    font-weight: bold;
                    color: #bc9c66;
                    .item {
                        @apply flex flex-col items-center justify-center;
                        width: 86rpx;
                        height: 80rpx;
                        .img-view {
                            width: 86rpx;
                        }
                    }
                    .missed {
                        @apply absolute top-0;
                        left: -4rpx;
                        top: 2rpx;
                        img {
                            width: 94rpx;
                        }
                    }
                }
                .item-choosed {
                    height: 88rpx;
                    background: #392706;
                    border-radius: 8rpx 8rpx 0 0;
                    color: #ffffff;
                }
            }
            .sign-detail {
                @apply w-full flex justify-between items-center box-border;
                background: #392706;
                border-radius: 0 0 8rpx 8rpx;
                padding: 20rpx;
                .img-view {
                    @apply flex items-center justify-center;
                    width: 100rpx;
                    height: 100rpx;
                    img {
                        width: 110rpx;
                    }
                }
                .text-view {
                    width: 320rpx;
                    font-size: 22rpx;
                    color: #ffffff;
                }
                .control-view {
                    @apply flex flex-col items-center justify-center;
                    .btn-view {
                        width: 140rpx;
                        height: 56rpx;
                        font-size: 22rpx;
                    }
                    .bonus {
                        font-size: 28rpx;
                        color: #fff000;
                        margin-top: 10rpx;
                    }
                }
            }
        }
    }
</style>
