<template>
    <view class="activity-view">
        <view class="banner">
            <img
                v-if="store.baseConfig.countryId === 'MEX'"
                src="@/static/activity/banner2.png"
                alt=""
            />
            <img v-else src="@/static/activity/banner2_pt.webp" alt="" />
        </view>
        <view class="card">
            <view>
                {{ $t('KEY_ACTIVITY_BOUNSPACK_EFECTIVO') }}
                {{ numberWithCommas(data.activityUser?.sumPay) }}
                {{ $t('KEY_SPINWHEEL_MXN') }}
            </view>
        </view>
        <view class="progress-view">
            <view class="title">
                {{ $t('KEY_ACTIVITY_BOUNSPACK_TITLE')
                }}{{ numberWithCommas(data.activityUser?.returnRewards)
                }}{{ $t('KEY_SPINWHEEL_MXN') }}
            </view>
            <view class="progress">
                <view class="flex items-center justify-center">
                    <view class="progress-wrapper">
                        <view
                            class="progress-content"
                            :style="`width: ${
                                (data.activityUser.sumBet /
                                    data.activityUser.betAmount) *
                                100
                            }%`"
                        ></view>
                    </view>
                    <view class="right">
                        {{ data.activityUser.betAmount }}
                        {{ $t('KEY_SPINWHEEL_MXN') }}
                    </view>
                </view>
                <view>{{ $t('KEY_ACTIVITY_BOUNSPACK_TIPS') }}</view>
            </view>

            <view
                class="primary-btn"
                v-if="data.activityUser.returnRewards === 0"
                @click="goHome"
            >
                {{ $t('KEY_ACTIVITY_ALERT_BTNTEXT') }}
            </view>
            <view class="primary-btn" @click="regpayBonus" v-else>
                {{ $t('KEY_ACTIVITY_ALERT_BTNTEXT2') }}
            </view>
        </view>
        <view class="detail">
            <view
                class="content"
                v-html="$t('KEY_ACTIVITY_BOUNSPACK_CONTENT')"
            ></view>
        </view>
        <view class="ad-view">
            <view class="ad-title">
                {{ $t('KEY_ACTIVITY_BOUNSPACK_ADTITLE') }}
            </view>
            <HotGames :hot-games="hotGames" />
            <view
                class="ad-content"
                v-html="$t('KEY_ACTIVITY_BOUNSPACK_ADCONTENT', {domain: domain})"
            ></view>
        </view>
    </view>
    <SuccessAlert
        ref="RefSuccessAlert"
        :successBtnText="$t('KEY_COMMON_OK')"
        :alert-data="data.activityUser"
        @onSuccess="DialogSuccess"
    />
</template>

<script lang="ts" setup>
    import { reactive, ref, watch, onMounted } from 'vue'
    import HotGames from './HotGames.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { i18n } from '@/common/i18nConfig'
    import SuccessAlert from '@/lib/components/Activity/common/SuccessAlert.vue'
    import { numberWithCommas } from '@/common/common'
    import { useUsersStore } from '@/store/userStore'
    import {getPlatform} from "@/common/init"

    const store = useUsersStore()
    const { t: $t } = i18n.global
    const domain = getPlatform()

    interface Props {
        hotGames?: any
    }

    const props = withDefaults(defineProps<Props>(), {
        hotGames: [],
    })

    interface Data {
        title?: string
        activityUser: any
    }

    const data = reactive<Data>({
        title: 'activity',
        activityUser: {},
    })

    const RefSuccessAlert = ref()

    const regpayUser = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.activitys.regpayUser(params)
        if (res.success) {
            // data.regpayList = res.result
            data.activityUser = res.result
        } else {
            ErrorHandler(res, 'regpayUser')
        }
    }

    const regpayBonus = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.activitys.regpayBonus(params)
        if (res.success) {
            // data.regpayList = res.result
            openDialog()
        } else {
            ErrorHandler(res, 'regpayBonus')
        }
    }

    const goHome = async () => {
        uni.switchTab({ url: '/pages/index/index' })
    }

    const openDialog = () => {
        RefSuccessAlert.value.changeIsShow(true)
    }

    const DialogSuccess = async () => {
        regpayUser()
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    const initData = () => {
        if (store.userInfo) {
            regpayUser()
        }
    }

    onMounted(() => {
        initData()
    })
</script>

<style lang="scss">
    .activity-view {
        @apply relative;
        min-height: 100%;
        background-color: #17362dff;

        .banner {
            @apply w-full;
            img {
                @apply w-full h-full;
            }
        }
        .card {
            @apply box-border absolute;
            left: 50%;
            top: 270rpx;
            transform: translate(-50%);
            width: 535rpx;
            height: 137rpx;
            line-height: 126rpx;
            background-image: url('@/static/activity/jinerdikuang1.png');
            background-size: 100% 100%;

            font-size: 42rpx;
            font-weight: bold;
            color: #ffd21c;
            -webkit-text-stroke: 3rpx #192d2b;
            text-stroke: 3rpx #192d2b;
            text-align: center;
        }
        .progress-view {
            @apply m-auto;
            margin-top: 200rpx;
            width: 690rpx;
            height: 316rpx;
            background-image: url('@/static/activity/ka.png');
            background-size: 100% 100%;

            .title {
                @apply w-full flex items-center justify-center;
                height: 97rpx;
                font-size: 38rpx;
                color: #ffffff;
            }

            .progress {
                @apply flex flex-col items-center justify-around;
                height: 90rpx;
                font-size: 28rpx;
                color: #ffffff;
                // -webkit-text-stroke: 2rpx #000000;
                // text-stroke: 2rpx #000000;
            }

            .progress-wrapper {
                @apply overflow-hidden;
                width: 456rpx;
                height: 31rpx;
                background: #1a2721;
                border: 1px solid #113327;
                border-radius: 7px;
                .progress-content {
                    width: 0%;
                    height: 31rpx;
                    background: #ff6c22;
                }
            }

            .right {
                margin-left: 10rpx;
            }

            .primary-btn {
                @apply m-auto;
                width: 500rpx;
                height: 82rpx;
                margin-top: 16rpx;
                font-size: 28rpx;
            }
        }
        .detail {
            padding: 0 30rpx;
            margin-top: 30rpx;
            .title {
                font-size: 28rpx;
                color: #cfdea1;
            }
            .content {
                margin-top: 10rpx;
                font-size: 25rpx;
                color: #cbcbcb;
                line-height: 30rpx;
            }
        }
        .ad-view {
            padding: 0 20rpx;
            margin-top: 20rpx;
            padding-bottom: 40rpx;
            .ad-title {
                font-size: 28rpx;
                color: #cbcbcb;
                font-weight: bold;
            }
            .ad-list {
                @apply flex justify-between;
                margin-top: 11rpx;
                .ad-img {
                    @apply overflow-hidden;
                    width: 228rpx;
                    height: 180rpx;
                    background-color: #eee;
                    border-radius: 8rpx;
                }
            }
            .ad-content {
                margin-top: 15rpx;
                font-size: 21rpx;
                color: #cbcbcb;
                line-height: 25rpx;
            }
        }
    }
</style>
