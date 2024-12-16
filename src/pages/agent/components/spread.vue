<template>
    <view class="spread-view">
        <view class="share" @click.stop>
            <view class="item title p-0">
                <view class="item-name">
                    {{ $t('KEY_AGENT_SPREAD_SHARE_URL') }}
                </view>
                <view class="item-value"></view>
            </view>
            <share :promoteUser="props.promoteUser" />
        </view>
        <view class="commission">
            <view class="item title" @click="navigate('commission')">
                <view class="item-name">
                    {{ $t('KEY_AGENT_SPREAD_COMMISSION') }}
                </view>
                <view class="item-value">
                    {{ $t('KEY_AGENT_SPREAD_MORE') }}
                    <image
                        src="@/static/icon/jiantou_R_disable.png"
                        class="icon-right"
                        mode="heightFix"
                    ></image>
                </view>
            </view>
            <view class="item">
                <view class="item-name">
                    {{ $t('KEY_AGENT_SPREAD_COMMISSION_ACCUMULATED') }}
                </view>
                <view class="item-value yellow">
                    {{ props.promoteUser.totalComm }}
                </view>
            </view>
            <view class="item">
                <view class="item-name">
                    {{ $t('KEY_AGENT_SPREAD_COMMISSION_RECEIVED') }}
                </view>
                <view class="item-value yellow">
                    {{ props.promoteUser.totalCollectComm }}
                </view>
            </view>
            <view class="item">
                <view class="item-name">
                    {{ $t('KEY_AGENT_SPREAD_COMMISSION_LAST') }}
                </view>
                <view class="item-value yellow">
                    {{ props.promoteUser.lastComm }}
                </view>
            </view>
        </view>
        <view class="achievement">
            <view class="item title" @click="navigate('achievement')">
                <view class="item-name">
                    {{ $t('KEY_AGENT_SPREAD_PERFORMANCE') }}
                </view>
                <view class="item-value">
                    {{ $t('KEY_AGENT_SPREAD_MORE') }}
                    <image
                        src="@/static/icon/jiantou_R_disable.png"
                        class="icon-right"
                        mode="heightFix"
                    ></image>
                </view>
            </view>
            <view class="item">
                <view class="item-name">
                    {{ $t('KEY_AGENT_SPREAD_PERFORMANCE_TOTAL_M') }}
                </view>
                <view class="item-value">{{ props.promoteUser.teamNum }}</view>
            </view>
            <view class="item">
                <view class="item-name">
                    {{ $t('KEY_AGENT_SPREAD_PERFORMANCE_DIRECT_M') }}
                </view>
                <view class="item-value">
                    {{ props.promoteUser.directNum }}
                </view>
            </view>
            <view class="item">
                <view class="item-name">
                    {{ $t('KEY_AGENT_SPREAD_PERFORMANCE_OTHER_M') }}
                </view>
                <view class="item-value">{{ props.promoteUser.otherNum }}</view>
            </view>
            <view class="item">
                <view class="item-name">
                    {{ $t('KEY_AGENT_SPREAD_PERFORMANCE_TOTAL_P') }}
                </view>
                <view class="item-value">
                    {{ props.promoteUser.totalPerf }}
                </view>
            </view>
            <view class="item">
                <view class="item-name">
                    {{ $t('KEY_AGENT_SPREAD_PERFORMANCE_DIRECT_P') }}
                </view>
                <view class="item-value">
                    {{ props.promoteUser.directPerf }}
                </view>
            </view>
            <view class="item">
                <view class="item-name">
                    {{ $t('KEY_AGENT_SPREAD_PERFORMANCE_OTHER_P') }}
                </view>
                <view class="item-value">
                    {{ props.promoteUser.otherPerf }}
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    //@ts-nocheck
    import { PromoteUserDto } from '@/NET/xxyy/data-contracts'
    import { modal } from '@/lib/components/Modal'
    import share from './share.vue'
    import QRCode from 'qrcode'
    import { onMounted, ref } from 'vue'
    import { i18n } from '@/common/i18nConfig'
    import { ga } from '@/common/common'
    import { useUsersStore } from '@/store/userStore'
    const store = useUsersStore()
    const { t: $t } = i18n.global
    interface Props {
        promoteUser: PromoteUserDto
    }
    const props = withDefaults(defineProps<Props>(), {})
    const emits = defineEmits(['navigate'])
    const shareUrl = `${location.origin}${
        location.pathname
    }#/pages/agent/invite?uid=${props.promoteUser.pUrl || ''}`
    const setClip = () => {
        uni.setClipboardData({
            data: shareUrl,
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
        qrcode.value = await QRCode.toDataURL(shareUrl)
    }

    const openTelegram = () => {
        const url = 'tg://resolve'
        if (window.android) {
            window.android.ShareChannel(url)
        } else {
            window.open(url)
        }
    }

    const openWhatsapp = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`
        if (window.android) {
            window.android.ShareChannel(url)
        } else {
            window.open(url)
        }
    }

    const openFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
        )}`
        if (window.android) {
            window.android.ShareChannel(url)
        } else {
            window.open(url)
        }
    }

    onMounted(() => {
        initQrcode()
    })
    const navigate = (component) => {
        if (component === 'commission') {
            
        } else if (component === 'achievement') {
            
        }
        emits('navigate', component)
    }
    const downERCode = () => {
        //const downloadTask =

        let a = document.createElement('a') //创建一个 a 标签\n
        a.href = qrcode.value //把路径赋到a标签的href上\n
        a.download = 'true'
        a.click()
    }
</script>
<style lang="scss" scoped>
    .yellow {
        color: #f2ac35 !important;
    }
    .spread-view {
        width: 540rpx;
        padding-bottom: 50rpx;
        .share,
        .commission,
        .achievement {
            @apply bg-black-80 rounded-14 overflow-hidden;
            margin-top: 22rpx;
        }
        .share {
            margin-top: 0rpx;
        }
        .item {
            @apply flex items-center justify-center box-border;
            height: 102rpx;
            border-bottom: 2rpx solid #475464;
            padding: 0 40rpx 0 20rpx;
            .item-name {
                @apply text-left;
                font-size: 28rpx;
                color: #7590ab;
            }
            .item-value {
                @apply flex-1 text-right flex items-center justify-end;
                color: #8d8e8e;
            }
            .icon-right {
                height: 28rpx;
                margin-left: 20rpx;
            }
            &.title {
                .item-name,
                .item-value {
                    @apply text-white-100;
                }
            }
            &:last-child {
                border: none;
            }
        }
        .share-box {
            padding: 20rpx;
            // margin-top: 28rpx;
            // padding-bottom: 18rpx;
            // .link-box {
            //     @apply flex justify-center items-center;
            //     height: 55rpx;
            //     .link-name {
            //         width: 95rpx;
            //         font-size: 22rpx;
            //         font-family: Microsoft YaHei;
            //         font-weight: 400;
            //         color: #7590ab;
            //         line-height: 28rpx;
            //     }
            //     .link-address {
            //         @apply rounded-7 flex justify-center items-center;
            //         width: 380rpx;
            //         height: 55rpx;
            //         background: rgba(14, 14, 15, 0);
            //         border: 1px solid #475464;
            //         margin-left: 24rpx;
            //         input {
            //             width: 300rpx;
            //             font-size: 22rpx;
            //             color: #b5c0cb;
            //         }
            //         .icon-copy {
            //             width: 28rpx;
            //             margin-left: 24rpx;
            //         }
            //     }
            // }
            // .code-box {
            //     @apply flex;
            //     width: 500rpx;
            //     margin: 18rpx auto 0;
            //     .er-code-box {
            //         @apply bg-white rounded-7 overflow-hidden;
            //         width: 150rpx;
            //         image {
            //             width: 146rpx;
            //             height: 146rpx;
            //         }
            //         .er-code-down {
            //             @apply bg-primary text-center flex justify-center items-center;
            //             height: 50rpx;
            //             line-height: 24rpx;
            //         }
            //     }
            //     .app-list {
            //         @apply flex flex-1 justify-center;
            //         .app-item {
            //             @apply flex-1;
            //             text-align: center;
            //             padding-top: 24rpx;
            //             image {
            //                 width: 69rpx;
            //                 height: 69rpx;
            //                 margin-bottom: 30rpx;
            //             }
            //         }
            //     }
            // }
        }
    }
</style>
