<template>
    <view class="activity-view">
        <view class="banner">
            <img
                v-if="store.baseConfig.countryId === 'MEX'"
                src="@/static/activity/banner3.png"
                alt=""
            />
            <img v-else src="@/static/activity/banner3_pt.webp" alt="" />
        </view>
        <view class="card" v-if="!data.activityUser.isFirstPay">
            <view>{{ $t('KEY_ACTIVITY_FIRSTRECHARGE_HASTA') }}</view>
            <view>10,000{{ $t('KEY_SPINWHEEL_MXN') }}</view>
        </view>
        <view class="card" v-else>
            <view>{{ $t('KEY_ACTIVITY_FIRSTRECHARGE_RECIBIDO') }}</view>
            <view>
                {{ data.activityUser.firstPay }}{{ $t('KEY_SPINWHEEL_MXN') }}
            </view>
        </view>
        <view class="detail">
            <view class="title">
                {{ $t('KEY_ACTIVITY_FIRSTRECHARGE_TITLE') }}
            </view>
            <view
                class="content"
                v-html="$t('KEY_ACTIVITY_FIRSTRECHARGE_CONTENT')"
            ></view>
            <view
                class="primary-btn"
                @click="goDeposit"
                v-if="!data.activityUser.isFirstPay"
            >
                {{ $t('KEY_ACTIVITY_FIRSTRECHARGE_BTN') }}
            </view>
        </view>
        <view class="ad-view">
            <view class="ad-title">
                {{ $t('KEY_ACTIVITY_FIRSTRECHARGE_ADTITLE') }}
            </view>
            <HotGames :hot-games="hotGames" />
            <view
                class="ad-content"
                v-html="$t('KEY_ACTIVITY_FIRSTRECHARGE_ADCONTENT', {domain: domain})"
            ></view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import HotGames from './HotGames.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    // import { numberWithCommas } from '@/common/common'
    import { getPlatform } from '@/common/init'

    const store = useUsersStore()
    const commonStore = useCommonStore()
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

    const goDeposit = async () => {
        commonStore.depositTab = 0
        uni.switchTab({ url: '/pages/deposit/index' })
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
        background: linear-gradient(
            to bottom,
            #ce6f13 20rpx,
            #ca211d 20rpx,
            #ce6f13,
            #f9c809
        );

        .banner {
            @apply w-full;
            img {
                @apply w-full h-full;
            }
        }
        .card {
            @apply box-border absolute;
            left: 50%;
            top: 280rpx;
            transform: translate(-50%);
            width: 460rpx;
            height: 137rpx;
            background-image: url('@/static/activity/jinerdikuang.png');
            background-size: 100% 100%;
            font-size: 42rpx;
            font-weight: bold;
            line-height: 50rpx;
            padding: 10rpx;
            color: #ffd21c;
            -webkit-text-stroke: 3rpx #192d2b;
            text-stroke: 3rpx #192d2b;
            text-align: center;
        }
        .detail {
            padding: 0 30rpx;
            margin-top: 200rpx;
            min-height: 350rpx;
            .title {
                font-size: 28rpx;
                color: #372017;
            }
            .content {
                margin-top: 10rpx;
                font-size: 25rpx;
                color: #653e28;
                line-height: 30rpx;
            }
            .primary-btn {
                @apply m-auto;
                width: 263rpx;
                margin-top: 60rpx;
            }
        }
        .ad-view {
            padding: 0 20rpx;
            margin-top: 20rpx;
            .ad-title {
                font-size: 28rpx;
                color: #372017;
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
                color: #653e28;
                line-height: 25rpx;
            }
        }
    }
</style>
