<template>
    <Layout :hasHeader="false">
        <view class="faq-header">
            <view></view>
            <view>
                <img
                    @click="closeLogin"
                    src="@/static/icon/close_white.png"
                    alt=""
                />
            </view>
        </view>
        <view class="scroll-view bg-dialog">
            <view class="faq-view">
                <view class="logo" @click="openConsole">
                    <img
                        v-if="store.baseConfig.imgBaseUrl"
                        :src="getLogoUrl('login_popup.png', store.baseConfig)"
                        alt=""
                    />
                </view>
                <view class="title" @click="goShare">
                    {{ $t('KEY_FAQ_TITLE') }}
                </view>
                <view class="menu-view">
                    <ul>
                        <li
                            @click="() => scrollToTarget('#secition1')"
                            v-html="$t('KEY_FAQ_MENU1')"
                        ></li>
                        <li
                            @click="() => scrollToTarget('#secition2')"
                            v-html="$t('KEY_FAQ_MENU2')"
                        ></li>
                        <li
                            @click="() => scrollToTarget('#secition3')"
                            v-html="$t('KEY_FAQ_MENU3', {domain: domain})"
                        ></li>
                        <li
                            @click="() => scrollToTarget('#secition4')"
                            v-html="$t('KEY_FAQ_MENU4')"
                        ></li>
                        <li
                            @click="() => scrollToTarget('#secition5')"
                            v-html="$t('KEY_FAQ_MENU5')"
                        ></li>
                        <li
                            @click="() => scrollToTarget('#secition6')"
                            v-html="$t('KEY_FAQ_MENU6', {domain: domain})"
                        ></li>
                    </ul>
                </view>
                <view class="content-view">
                    <view
                        class="secition"
                        v-html="$t('KEY_FAQ_CONTENT', {domain: domain})"
                    ></view>
                    <view
                        id="secition1"
                        class="secition"
                        v-html="$t('KEY_FAQ_SECITION1', {domain: domain})"
                    ></view>
                    <view
                        id="secition2"
                        class="secition"
                        v-html="$t('KEY_FAQ_SECITION2', {domain: domain})"
                    ></view>
                    <view
                        id="secition3"
                        class="secition"
                        v-html="$t('KEY_FAQ_SECITION3', {domain: domain})"
                    ></view>
                    <view
                        id="secition4"
                        class="secition"
                        v-html="$t('KEY_FAQ_SECITION4', {domain: domain})"
                    ></view>
                    <view
                        id="secition5"
                        class="secition"
                        v-html="$t('KEY_FAQ_SECITION5', {domain: domain})"
                    ></view>
                    <view
                        id="secition6"
                        class="secition"
                        v-html="$t('KEY_FAQ_SECITION6', {domain: domain})"
                    ></view>
                </view>
            </view>
        </view>
    </Layout>
</template>

<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
	// #ifdef H5
    import VConsole from 'vconsole'
	// #endif
    import { getLogoUrl } from '@/common/common'
    import { getPlatform } from '@/common/init'

    const { t: $t } = i18n.global
    const domain = getPlatform()
    interface Props {
        pageType?: number
    }
    const props = withDefaults(defineProps<Props>(), {
        pageType: 1,
    })

    interface Data {
        title?: string
    }
    const data = reactive<Data>({
        title: 'FAQ',
    })

    const store = useUsersStore()
    const emit = defineEmits(['parentFun'])
    const RefMessage = ref()

    function scrollToTarget(id) {
       const target = document.querySelector(id)
        target.scrollIntoView({ behavior: 'smooth' })
    }

    const closeLogin = () => {
        let canNavBack = getCurrentPages()
        if (canNavBack && canNavBack.length > 1) {
            uni.navigateBack({
                delta: 1,
                // fail: () => {
                //     uni.reLaunch({
                //         url: '/pages/index/index'
                //     });
                // }
            })
        } else {
            history.back()
        }
    }

    const counter = ref(0)
    const openConsole = () => {
        try {
            // @ts-ignore
            let GAID = window.android.getGaid()
            console.log(GAID)
        } catch (e) {}
        counter.value++

        try {
            let u = navigator.userAgent
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
            if (isAndroid) {
                // @ts-ignore
                window.android.onEventJs('test')
            }
            if (isIOS) {
                // @ts-ignore
                window.webkit.messageHandlers.onEventJs('test')
            }
            // alert('success')
        } catch (err) {}
        if (counter.value === 5) {
            // console.log(1)
			// #ifdef H5
            const vConsole = new VConsole()
			// #endif
        }
    }

    const goShare = () => {
        // @ts-ignore
        if (window.android) {
            // @ts-ignore
            window.android.reviewGp()
        }
        // uni.navigateTo({
        //     url: '/pages/agent/index',
        //     fail() {
        //         uni.switchTab({
        //             url: '/pages/agent/index',
        //         })
        //     },
        // })
    }

    // uni.setNavigationBarTitle({
    //     title: $t('KEY_PAGETITLE_FAQ'),
    // })
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
        @apply absolute left-0 right-0 bottom-0 overflow-y-auto;
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
        text-decoration: underline;
        color: #3781fd;
        line-height: 35rpx;
        border-radius: 14rpx;
        background: #dddddd;
        padding: 35rpx;
        margin-top: 28rpx;
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
