<template>
    <view class="share-box" @touchmove.prevent="">
        <view class="bg"></view>
        <view class="content">
            <view class="close" @click="close">
                <image
                    class="w-full"
                    src="@/static/icon/close_white.png"
                    mode="widthFix"
                ></image>
            </view>
            <view class="title" v-html="$t('KEY_RED_SHARE_TITLE')"></view>
            <!-- <view class="platforms">
                <view class="platform" @click="openFacebook">
                    <image
                        src="@/static/activity/red-package/facebook.png"
                        mode="widthFix"
                    ></image>
                    <view
                        class="name"
                        v-html="$t('KEY_RED_SHARE_FACEBOOK')"
                    ></view>
                </view> -->
                <!-- <a href="sms://+14035550185?body=I%27m%20interested%20in%20your%20product.%20Please%20contact%20me.">Send a SMS message</a> -->
                <!-- <a class="platform" :href="sms" @click="share">
                    <image
                        src="@/static/activity/red-package/SMS.png"
                        mode="widthFix"
                    ></image>
                    <view class="name" v-html="$t('KEY_RED_SHARE_SMS')"></view>
                </a>
                <view class="platform" @click="openTelegram">
                    <image
                        src="@/static/activity/red-package/Telegram.png"
                        mode="widthFix"
                    ></image>
                    <view
                        class="name"
                        v-html="$t('KEY_RED_SHARE_TELEGRAM')"
                    ></view>
                </view>
                <view class="platform" @click="openTwitter">
                    <image
                        src="@/static/activity/red-package/Twitter.png"
                        mode="widthFix"
                    ></image>
                    <view
                        class="name"
                        v-html="$t('KEY_RED_SHARE_TWITTER')"
                    ></view>
                </view> -->
                <!-- <a href="mailto:haorooms@126.com?cc=name2@rapidtables.com&bcc=name3@rapidtables.com&subject=The%20subject%20of%20the%20email&body=The%20body%20of%20the%20email">打开Email</a> -->
                <!-- <a class="platform" :href="mailto" @click="share">
                    <image
                        src="@/static/activity/red-package/Email.png"
                        mode="widthFix"
                    ></image>
                    <view
                        class="name"
                        v-html="$t('KEY_RED_SHARE_E-MAIL')"
                    ></view>
                </a>
                <view class="platform" @click="openWhatsapp">
                    <image
                        src="@/static/activity/red-package/WhatsApp.png"
                        mode="widthFix"
                    ></image>
                    <view
                        class="name"
                        v-html="$t('KEY_RED_SHARE_WHATSAPP')"
                    ></view>
                </view>
            </view> -->
            <view class="link-box">
                <view class="link-input">
                    {{ shareUrl }}
                    <view class="link-cover"></view>
                </view>
                <view
                    class="copy-btn"
                    @click="copy"
                    v-html="$t('KEY_COMMON_COPY')"
                ></view>
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
    //@ts-nocheck
    import { modal } from '@/lib/components/Modal'
    import { computed, ref } from 'vue'
    import { i18n } from '@/common/i18nConfig'
    import { ga } from '@/common/common'
    import { useUsersStore } from '@/store/userStore'
    const store = useUsersStore()
    const { t: $t } = i18n.global
    const emits = defineEmits(['close', 'share'])
    import { api as lobbyApi } from '@/NET/lobby'
    import { onShow } from '@dcloudio/uni-app'
    interface Prop {
        total: number
    }
    const props = defineProps<Prop>()
    const close = () => {
        emits('close')
    }
    const shareUrl = computed(() => {
        return `${location.origin}${location.pathname}#/pages/red_package/invite?uid=${store.userInfo.userId}&mid=3`
    })
    const share = async () => {
        if (store.userInfo?.userMode === 2) {
            // await lobbyApi.redpack.share()
            emits('share')
        }
    }
    const getMessage = () => {
        return $t('KEY_RED_SHARE_TEXT').replaceAll('100', props.total)
    }
    // √ √
    const mailto = computed(() => {
        const text = getMessage()
        return `mailto:?to=&subject=&body=${encodeURIComponent(
            text + ' ' + shareUrl.value
        )} `
    })
    // √ √
    const sms = computed(() => {
        const text = getMessage()
        return `sms://&body=${encodeURIComponent(text + ' ' + shareUrl.value)}`
    })
    let shareModal = null
    const afterShare = async (params: type) => {
        shareModal = modal({
            width: '495rpx',
            type: 'success',
            title: $t('KEY_RED_SHARE_SUS'),
            content: $t('KEY_RED_SHARE_TELL'),
            showCancel: false,
            showConfirm: false,
        })
    }
    onShow(() => {
        if (shareModal) {
            setTimeout(() => {
                shareModal.close()
                shareModal = null
            }, 2000)
        }
    })
    // <a target="_blank"href="https://twitter.com/intent/tweet?text=自定义内容，可以文字➕链接之类的&via=twitter账号名，会显示@XXX">Twitter分享</a>
    // √ √
    const openTwitter = () => {
        share()
        const text = getMessage()
        const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareUrl.value
        )}&text=${text}`

        if (window.android) {
            window.android.ShareChannel(url)
        } else {
            window.open(url)
        }
        afterShare()
    }
    // √ √
    const openTelegram = () => {
        share()
        const text = getMessage()
        const url = `https://t.me/share/url?url=${encodeURIComponent(
            shareUrl.value
        )}&text=${text}`
        if (window.android) {
            window.android.ShareChannel(url)
        } else {
            window.open(url)
        }
        afterShare()
    }
    // √ √
    const openWhatsapp = () => {
        share()
        const text = getMessage()
        const url = `https://wa.me/?text=${encodeURIComponent(
            text + ' ' + shareUrl.value
        )}`
        if (window.android) {
            window.android.ShareChannel(url)
        } else {
            window.open(url)
        }
        afterShare()
    }
    // XX 只能分享链接 官方:https://developers.facebook.com/docs/plugins/share-button/#configurator
    const openFacebook = () => {
        share()
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl.value
        )}`
        if (window.android) {
            window.android.ShareChannel(url)
        } else {
            window.open(url)
        }
        afterShare()
    }

    const copy = () => {
        uni.setClipboardData({
            data: shareUrl.value,
            showToast: false,
            success: function () {
                share()
                modal({
                    width: '485rpx',
                    title: $t('KEY_PAY_COPYSUCCESS'),
                    showCancel: false,
                    showConfirm: false,
                    maskClosable: true,
                })
            },
        })
    }
</script>
<style lang="scss">
    .share-box {
        @apply fixed top-0 left-0 w-full h-full overflow-hidden;
        .bg {
            @apply absolute top-0 left-0 w-full h-full;
            background: rgba(0, 0, 0, 0.7);
        }
        .content {
            @apply absolute w-full left-0 bottom-0;
            height: 442rpx;
            background: #e8e8e8;
            border-radius: 14rpx 14rpx 0px 0px;
            .close {
                width: 55rpx;
                height: 55rpx;
                position: absolute;
                top: 15rpx;
                right: 15rpx;
                image {
                    @apply w-full h-full;
                }
            }
            .title {
                height: 32rpx;
                font-size: 28rpx;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #454545;
                line-height: 32rpx;
                text-align: center;
                padding-top: 52rpx;
            }
            .platforms {
                @apply flex justify-around;
                margin-top: 48rpx;
                .platform {
                    text-decoration: none;
                    image {
                        width: 83rpx;
                        height: 83rpx;
                        display: block;
                        margin: 0 auto;
                    }
                    .name {
                        height: 24rpx;
                        font-size: 22rpx;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #454545;
                        line-height: 24rpx;
                        margin-top: 18rpx;
                        text-align: center;
                    }
                }
            }
        }
        .link-box {
            @apply rounded-14 flex;
            width: 699rpx;
            height: 93rpx;
            line-height: 93rpx;
            background: #fff;
            margin: 60rpx auto 0;
            overflow: hidden;
            .link-input {
                @apply box-border relative overflow-hidden;
                width: 581rpx;
                height: 93rpx;
                font-size: 28rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #454545;
                padding-left: 30rpx;
                white-space: nowrap;
                .link-cover {
                    @apply absolute;
                    width: 100rpx;
                    height: 100%;
                    top: 0;
                    right: 0;
                    background: linear-gradient(
                        270deg,
                        #ffffff,
                        rgba(255, 255, 255, 0)
                    );
                }
            }
            .copy-btn {
                @apply flex-1;
                text-align: center;
                height: 30rpx;
                font-size: 28rpx;
                font-weight: 400;
                text-decoration: underline;
                color: #3781fd;
            }
        }
    }
</style>
