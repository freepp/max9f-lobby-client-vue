<template>
    <view class="share-box">
        <view class="link-box">
            <view class="link-name">
                {{ $t('KEY_AGENT_SPREAD_MY_LINK') }}
            </view>
            <view class="link-address">
                <input type="text" disabled :value="shareUrl" />
                <image
                    class="icon-copy"
                    mode="widthFix"
                    src="@/static/icon/copy.png"
                    @click="setClip()"
                ></image>
            </view>
        </view>
        <view class="code-box">
            <view class="er-code-box">
                <image
                    class="block"
                    v-if="qrcode"
                    :src="qrcode"
                    mode="widthFix"
                ></image>
                <!-- <a
                            download=""
                            class="er-code-down"
                            href="http://192.168.2.195:5173/src/static/icon/chat.png"
                        >
                            99988884545
                        </a> -->
                <view class="er-code-down" @click="downERCode">
                    {{ $t('KEY_AGENT_SPREAD_CLICK_SAVE') }}
                </view>
            </view>
            <view class="app-list">
                <view class="app-item" @click="openTelegram">
                    <image src="@/static/agent/teleqram_icon.png"></image>
                    {{ $t('KEY_AGENT_SPREAD_TELEGRAM') }}
                </view>
                <view class="app-item" @click="openWhatsapp">
                    <image src="@/static/agent/whatsapp_icon.png"></image>
                    {{ $t('KEY_AGENT_SPREAD_WHATSAPP') }}
                </view>
                <view class="app-item" @click="openFacebook">
                    <image src="@/static/agent/facebook_icon.png"></image>
                    {{ $t('KEY_AGENT_SPREAD_FACEBOOK') }}
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    //@ts-nocheck
    import { PromoteUserDto } from '@/NET/lobby/data-contracts'
    import { modal } from '@/lib/components/Modal'
    import QRCode from 'qrcode'
    import { onMounted, ref, watch } from 'vue'
    import { i18n } from '@/common/i18nConfig'
    import { ga } from '@/common/common'
    import { useUsersStore } from '@/store/userStore'
    const store = useUsersStore()
    const { t: $t } = i18n.global
    interface Props {
        promoteUser: PromoteUserDto
    }
    const props = withDefaults(defineProps<Props>(), {})
    const shareUrl = ref('')
    const setClip = () => {
        
        uni.setClipboardData({
            data: shareUrl.value,
            showToast: false,
            success: function () {
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
    const qrcode = ref<string>('')
    const initQrcode = async () => {
        qrcode.value = await QRCode.toDataURL(shareUrl.value)
    }

    const openTelegram = () => {
        
        const url = `https://t.me/share/url?url=${encodeURIComponent(
            shareUrl.value
        )}`
        if (window.android) {
            window.android.ShareChannel(url)
        } else {
            window.open(url)
        }
    }

    const openWhatsapp = () => {
        
        const url = `https://wa.me/?text=${encodeURIComponent(shareUrl.value)} `
        if (window.android) {
            window.android.ShareChannel(url)
        } else {
            window.open(url)
        }
    }

    const openFacebook = () => {
        
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl.value
        )}`
        if (window.android) {
            window.android.ShareChannel(url)
        } else {
            window.open(url)
        }
    }

    const downERCode = () => {
        //const downloadTask =

        let a = document.createElement('a') //创建一个 a 标签\n
        a.href = qrcode.value //把路径赋到a标签的href上\n
        a.download = 'true'
        a.click()
        
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    const initData = async () => {
        if (store.userInfo) {
            shareUrl.value = `${location.origin}${location.pathname}#/pages/agent/invite?uid=${props.promoteUser.pUrl}`
            initQrcode()
        }
    }

    onMounted(() => {
        initData()
    })
</script>
<style lang="scss" scoped>
    .share-box {
        // margin-top: 28rpx;
        // padding-bottom: 18rpx;
        // padding: 20rpx 0;
        .link-box {
            @apply flex justify-center items-center;
            // height: 55rpx;
            .link-name {
                width: 95rpx;
                font-size: 22rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #7590ab;
                line-height: 28rpx;
            }
            .link-address {
                @apply rounded-7 flex justify-center items-center flex-1;

                height: 55rpx;
                background: rgba(14, 14, 15, 0);
                border: 1px solid #475464;
                margin-left: 24rpx;
                padding: 0 20rpx;
                input {
                    @apply flex-1;
                    font-size: 22rpx;
                    color: #b5c0cb;
                }
                .icon-copy {
                    width: 28rpx;
                    margin-left: 24rpx;
                }
            }
        }
        .code-box {
            @apply flex;
            margin: 18rpx auto 0;
            .er-code-box {
                @apply bg-white rounded-7 overflow-hidden;
                width: 150rpx;
                image {
                    width: 146rpx;
                    height: 146rpx;
                }
                .er-code-down {
                    @apply bg-primary text-center flex justify-center items-center;
                    min-height: 50rpx;
                    line-height: 24rpx;
                }
            }
            .app-list {
                @apply flex flex-1 justify-center;
                // padding-left: 20rpx;
                .app-item {
                    @apply flex-1 flex flex-col justify-center items-center;
                    text-align: center;
                    image {
                        width: 69rpx;
                        height: 69rpx;
                        margin-bottom: 30rpx;
                    }
                }
            }
        }
    }
</style>
