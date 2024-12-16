<template>
    <Layout :headerTitle="''" :hasHeader="true">
        <view class="pwa-view">
            <view class="title" v-html="$t('KEY_PWA_TITLE')"></view>
            <view class="desc" v-html="$t('KEY_PWA_STEP1')"></view>
            <view class="img relative">
                <image
                    src="@/static/pwa/ios1.png"
                    mode="widthFix"
                    class="w-full"
                    v-if="isIOS"
                ></image>
                <view v-if="isIOS" class="ios-host">{{ host }}</view>
                <image
                    src="@/static/pwa/chrome1.png"
                    mode="widthFix"
                    class="w-full"
                    v-if="isChrome"
                ></image>
                <image
                    src="@/static/pwa/samsung1.png"
                    mode="widthFix"
                    class="w-full"
                    v-if="isSamsung"
                ></image>
                <view v-if="isSamsung" class="samsung-host">{{ host }}</view>
                <image
                    src="@/static/pwa/firefox1.png"
                    mode="widthFix"
                    class="w-full"
                    v-if="isFirefox"
                ></image>
                <view v-if="isFirefox" class="firefox-host">{{ host }}</view>
            </view>
            <view class="img">
                <image
                    src="@/static/pwa/ios2.png"
                    mode="widthFix"
                    class="w-full"
                    v-if="isIOS"
                ></image>
                <image
                    src="@/static/pwa/chrome2.png"
                    mode="widthFix"
                    class="w-full"
                    v-if="isChrome"
                ></image>
                <image
                    src="@/static/pwa/samsung2.png"
                    mode="widthFix"
                    class="w-full"
                    v-if="isSamsung"
                ></image>
                <image
                    src="@/static/pwa/firefox2.png"
                    mode="widthFix"
                    class="w-full"
                    v-if="isFirefox"
                ></image>
            </view>
            <view class="desc" v-html="$t('KEY_PWA_STEP2')"></view>
            <view class="img relative">
                <image
                    src="@/static/pwa/ios3.png"
                    mode="widthFix"
                    class="ios3"
                    v-if="isIOS"
                ></image>
                <image
                    src="@/static/pwa/bottom.png"
                    mode="widthFix"
                    class="w-full"
                    v-if="isChrome || isFirefox || isSamsung"
                ></image>
                <image
                    class="icon"
                    v-if="
                        store.baseConfig.imgBaseUrl &&
                        (isChrome || isFirefox || isSamsung)
                    "
                    :src="getLogoUrl('icon.png', store.baseConfig)"
                ></image>
                <view class="host">{{ host }}</view>
            </view>
        </view>
    </Layout>
</template>
<script lang="ts" setup>
    import { ref } from 'vue'
    import { useUsersStore } from '@/store/userStore'
    import Layout from '@/lib/layout/Base.vue'
    const store = useUsersStore()
    const ua = navigator.userAgent
    const isIOS = ref(!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))
    const isChrome = ref(false)
    const isFirefox = ref(false)
    const isSamsung = ref(false)
    const host = ref(location.host)
    import { getLogoUrl } from '@/common/common'
    if (!isIOS.value) {
        if (ua.toLowerCase().includes('firefox')) {
            isFirefox.value = true
        } else if (ua.toLowerCase().includes('samsungbrowser')) {
            isSamsung.value = true
        } else {
            isChrome.value = true
        }
    }
</script>
<style lang="scss">
    .pwa-view {
        @apply box-border;
        padding: 0 66rpx;
        background: #fff;
        height: 100%;
        .title {
            @apply box-border;
            font-size: 28rpx;
            font-weight: bold;
            color: #000000;
            padding: 30rpx 26rpx;
        }
        .icon {
            @apply absolute;
            width: 83rpx;
            height: 83rpx;
            border-radius: 10rpx;
            top: 40rpx;
            left: 38rpx;
        }
        .host {
            @apply absolute;
            left: 152rpx;
            top: 70rpx;
            width: 420rpx;
            height: 18rpx;
            font-size: 22rpx;
            font-weight: bold;
            color: #000000;
        }
        .img {
            margin-top: 12rpx;
            .ios-host {
                @apply absolute;
                left: 265rpx;
                top: 40rpx;
                width: 240rpx;
                font-size: 22rpx;
                font-weight: 400;
                color: #ffffff;
                line-height: 33rpx;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .firefox-host {
                @apply absolute;
                width: 237rpx;
                left: 164rpx;
                top: 45rpx;
                font-size: 28rpx;
                color: #ffffff;
                line-height: 33rpx;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .samsung-host {
                @apply absolute;
                width: 320rpx;
                left: 143rpx;
                top: 34rpx;
                font-size: 28rpx;
                color: #2c2c30;
                line-height: 33rpx;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .ios3 {
            width: 546rpx;
            margin: 0 auto;
        }
        .desc {
            font-size: 22rpx;
            font-weight: 400;
            color: #000000;
            line-height: 33rpx;
            padding: 0 40rpx;
        }
    }
</style>
