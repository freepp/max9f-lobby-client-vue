<template>
    <Layout :hasHeader="false">
        <view class="faq-header"></view>
        <view class="scroll-view">
            <view class="faq-view">
                <view class="logo">
                    <img
                        v-if="store.baseConfig.imgBaseUrl"
                        :src="getLogoUrl('login_popup.png', store.baseConfig)"
                        alt=""
                    />
                </view>
                <view class="title" v-html="$t('KEY_MAINTAIN_NOTICE')"></view>
                <view class="menu-view">
                    <view
                        class="secition"
                        v-html="$t('KEY_MAINTAIN_DEAR')"
                    ></view>
                    <view
                        class="secition"
                        v-html="
                            $t('KEY_MAINTAIN_INFORM')?.replaceAll(
                                '#date#',
                                data.date
                            )
                        "
                    ></view>
                    <view
                        class="secition"
                        v-html="$t('KEY_MAINTAIN_PURPOSE')"
                    ></view>
                    <view
                        class="secition"
                        v-html="$t('KEY_MAINTAIN_THANK')"
                    ></view>
                </view>
            </view>
        </view>
    </Layout>
</template>

<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    import { getLogoUrl } from '@/common/common'
    const { t: $t } = i18n.global

    interface Data {
        title?: string
        date: string
    }
    const data = reactive<Data>({
        title: 'Maintain',
        date: '',
    })

    const store = useUsersStore()

    onLoad((options) => {
        data.date = options.date ? decodeURIComponent(options.date) : ''
    })

    onMounted(() => {
        setTimeout(() => {
            if (store.baseConfig?.appStatus === 0) {
                uni.switchTab({ url: '/pages/index/index' })
            } else {
              if (window?.location?.reload) {
                window.location.reload()
              } else {
                uni.reLaunch({
                  url: '/pages/index/index'
                })
              }
            }
        }, 5000)
    })
</script>

<style lang="scss">
    .faq-header {
        @apply flex justify-between bg-dialog;
        padding: 12rpx 56rpx 0;
        height: 100rpx;
        box-sizing: border-box;
        img {
            width: 42rpx;
        }
    }
    .scroll-view {
        @apply absolute left-0 right-0 bottom-0 overflow-y-auto bg-dialog;
        top: 100rpx;
    }
    .faq-view {
        @apply box-border;
        padding: 0 42rpx;
    }
    .logo {
        @apply flex justify-center items-center;
        font-size: 40rpx;
        width: 291rpx;
        margin: 0 auto 51rpx;
        img {
            @apply w-full;
        }
    }

    .title {
        @apply text-center;
        font-size: 28rpx;
        font-weight: bold;
        color: #1b1c1c;
        line-height: 33rpx;
    }
    .menu-view {
        @apply w-full box-border;
        font-size: 25rpx;
        // text-decoration: underline;
        color: #000000;
        line-height: 45rpx;
        border-radius: 14rpx;
        background: #dddddd;
        padding: 35rpx;
        margin-top: 28rpx;
        .secition {
            margin-top: 20rpx;
        }
        ul {
            padding-left: 30rpx;
        }
        li {
            list-style-type: disc;
            margin-bottom: 30rpx;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
    .content-view {
        font-size: 25rpx;
        color: #333333;
        line-height: 33rpx;
        margin-bottom: 50rpx;
        padding: 0 20rpx;
        .secition {
            margin-top: 50rpx;
        }
    }
</style>
