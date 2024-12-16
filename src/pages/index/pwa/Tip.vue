<template>
    <view class="pwa-tip-view" style="bottom: 20rpx;" v-if="isShow">
        <view class="pwa-info flex">
            <view class="logo">
                <image
                    v-if="store.baseConfig.imgBaseUrl"
                    :src="getLogoUrl('icon.png', store.baseConfig)"
                    alt=""
                    mode="widthFix"
                />
            </view>
            <view class="info">
                <view class="title" v-html="$t('KEY_PWA_TIP_TITLE')"></view>
                <view class="desc"  v-html="$t('KEY_PWA_TIP_DESC')"></view>
            </view>
        </view>
        <view class="pwa-btns">
            <view class="normal-btn bg-white" @click="close" v-html="$t('KEY_PWA_TIP_BTN2')"></view>
            <view class="normal-btn bg-primary" @click="toPwaGuide" v-html="$t('KEY_PWA_TIP_BTN1')">
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
    import { getLogoUrl } from '@/common/common'
    const store = useUsersStore()
    const isShow = ref(true)
    const emit = defineEmits(['closeAppDownload'])
    const close = () => {
        isShow.value = false

		emit('closeAppDownload' ,  false)

    }
    const toPwaGuide = () => {
        uni.navigateTo({
            url: '/pages/index/pwa_guide',
        })
        close()
    }

</script>
<style lang="scss">
    .pwa-tip-view {
        @apply fixed left-0 bottom-0;
        width: 750rpx;
        height: 308rpx;
        background: #ffffff;
        z-index: 2015;
        @media (width > 960px) {
          position: absolute;
        }
        .pwa-info {
            padding-top: 32rpx;
            .logo {
                @apply flex items-center;
                width: 107rpx;
                height: 107rpx;
                // background: red;
                margin-left: 30rpx;
                image {
                    @apply w-full;
                }
            }
            .info {
                @apply box-border;
                flex: 1;
                margin-left: 28rpx;
                padding-right: 38rpx;
                .title {
                    font-size: 28rpx;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: #000;
                }
                .desc {
                    font-size: 22rpx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #000;
                    line-height: 33rpx;
                }
            }
        }
        .pwa-btns {
            @apply flex justify-end box-border;
            padding-right: 38rpx;
            margin-top: 10rpx;
            .normal-btn {
                width: 181rpx;
                height: 85rpx;
                font-size: 28rpx;
                font-weight: normal;
            }
            .bg-white {
                color: var(--primary-color);
            }
            .bg-primary {
            }
        }
    }
</style>
