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
        <view class="scroll-view">
            <view class="faq-view">
                <view class="logo">
                    <img
                        v-if="store.baseConfig.imgBaseUrl"
                        :src="getLogoUrl('login_popup.png', store.baseConfig)"
                        alt=""
                    />
                </view>
                <!-- <view class="title">{{ $t('KEY_FAQ_TITLE') }}</view> -->
                <!-- <view class="menu-view">
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
                            v-html="$t('KEY_FAQ_MENU3')"
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
                            v-html="$t('KEY_FAQ_MENU6')"
                        ></li>
                    </ul>
                </view> -->
                <view class="content-view">
                    <!-- <view
                        class="secition"
                        v-html="$t('KEY_FAQ_CONTENT')"
                    ></view> -->
                    <view
                        id="secition1"
                        class="secition"
                        v-html="$t('KEY_CONDITIONS_SECITION1', {domain: domain})"
                    ></view>
                    <view
                        id="secition2"
                        class="secition"
                        v-html="$t('KEY_CONDITIONS_SECITION2')"
                    ></view>
                    <view
                        id="secition3"
                        class="secition"
                        v-html="$t('KEY_CONDITIONS_SECITION3', {domain: domain})"
                    ></view>
                    <view
                        id="secition4"
                        class="secition"
                        v-html="$t('KEY_CONDITIONS_SECITION4', {domain: domain})"
                    ></view>
                    <view
                        id="secition5"
                        class="secition"
                        v-html="$t('KEY_CONDITIONS_SECITION5')"
                    ></view>
                    <view
                        id="secition6"
                        class="secition"
                        v-html="$t('KEY_CONDITIONS_SECITION6')"
                    ></view>
                    <view
                        id="secition7"
                        class="secition"
                        v-html="$t('KEY_CONDITIONS_SECITION7')"
                    ></view>
                    <view
                        id="secition8"
                        class="secition"
                        v-html="$t('KEY_CONDITIONS_SECITION8', {domain: domain})"
                    ></view>
                    <view
                        id="secition9"
                        class="secition"
                        v-html="$t('KEY_CONDITIONS_SECITION9')"
                    ></view>
                    <view
                        id="secition10"
                        class="secition"
                        v-html="$t('KEY_CONDITIONS_SECITION10', {domain: domain})"
                    ></view>
                    <view
                        id="secition11"
                        class="secition"
                         v-html="$t('KEY_CONDITIONS_SECITION11', {domain: domain})"
                    ></view>
                    <view
                        id="secition12"
                        class="secition"
                        v-html="$t('KEY_CONDITIONS_SECITION12', {domain: domain})"
                    ></view>
                    <view
                        id="secition13"
                        class="secition"
                        v-html="$t('KEY_CONDITIONS_SECITION13', {domain: domain})"
                    ></view>
                    <view
                        id="secition14"
                        class="secition"
                         v-html="$t('KEY_CONDITIONS_SECITION14', {domain: domain})"
                    ></view>
                    <view
                        id="secition15"
                        class="secition"
                        v-html="$t('KEY_CONDITIONS_SECITION15')"
                    ></view>
                    <view
                        id="secition16"
                        class="secition"
                        v-html="$t('KEY_CONDITIONS_SECITION16')"
                    ></view>
                    <view
                        id="secition17"
                        class="secition"
                        v-html="$t('KEY_CONDITIONS_SECITION17')"
                    ></view>
                    <view
                        id="secition18"
                        class="secition"
                        v-html="$t('KEY_CONDITIONS_SECITION18', {domain: domain})"
                    ></view>
                    <view
                        id="secition19"
                        class="secition"
                         v-html="$t('KEY_CONDITIONS_SECITION19', {domain: domain})"
                    ></view>
                    <view
                        id="secition20"
                        class="secition"
                        v-html="$t('KEY_CONDITIONS_SECITION20', {domain: domain})"
                    ></view>
                </view>
            </view>
        </view>
    </Layout>
</template>

<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
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
</script>

<style lang="scss">
    .faq-header {
        // @apply flex justify-between bg-dialog;
        @apply flex justify-between;
        padding: 12rpx 56rpx 0;
        height: 100rpx;
        box-sizing: border-box;
        img {
            width: 42rpx;
        }
    }
    .scroll-view {
        // @apply absolute left-0 right-0 bottom-0 overflow-y-auto bg-dialog;
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
        // color: #333333;
        color: #eee;
        line-height: 33rpx;
        margin-bottom: 50rpx;
        padding: 0 20rpx;
        .secition {
            margin-top: 50rpx;
        }
    }
</style>
