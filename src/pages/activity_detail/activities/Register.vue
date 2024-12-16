<template>
    <view class="activity-view">
        <view class="banner">
            <img
                v-if="store.baseConfig.countryId === 'MEX'"
                src="@/static/activity/banner1.png"
                alt=""
            />
            <img v-else src="@/static/activity/banner1_pt.webp" alt="" />
        </view>
        <view class="card">
            <view>{{ $t('KEY_ACTIVITY_REGISTER_BTN') }}</view>
            <view>1,000{{ $t('KEY_SPINWHEEL_MXN') }}</view>
        </view>
        <view class="detail">
            <view class="title">{{ $t('KEY_ACTIVITY_REGISTER_TITLE') }}</view>
            <view
                class="content"
                v-html="$t('KEY_ACTIVITY_REGISTER_CONTENT')"
            ></view>
        </view>

        <view class="ad-view">
            <view class="ad-title">
                {{ $t('KEY_ACTIVITY_REGISTER_ADTITLE') }}
            </view>
            <HotGames :hot-games="hotGames" />
            <view
                class="ad-content"
                v-html="$t('KEY_ACTIVITY_REGISTER_ADCONTENT', {domain: domain})"
            ></view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import HotGames from './HotGames.vue'
    import { useUsersStore } from '@/store/userStore'
    import { i18n } from '@/common/i18nConfig'
    import { getPlatform } from '@/common/init'
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
    }

    const data = reactive<Data>({
        title: 'activity',
    })
</script>

<style lang="scss">
    .activity-view {
        min-height: 100%;
        background-color: #17362dff;

        .banner {
            @apply w-full;
            img {
                @apply w-full h-full;
            }
        }
        .card {
            @apply m-auto box-border;
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
            margin-top: 30rpx;
            min-height: 350rpx;
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
            .ad-title {
                font-size: 28rpx;
                color: #cbcbcb;
                font-weight: bold;
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
