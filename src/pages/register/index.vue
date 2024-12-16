<template>
    <Layout :headerTitle="data.pageConfig.headerTitle" :hasHeader="false">
        <view class="login-header">
            <view>
                <img
                    v-if="data.pageConfig.lastStep !== -1"
                    @click="stepBack"
                    src="@/static/icon/go_back_white.png"
                    alt=""
                />
            </view>
            <view>
                <img
                    @click="closeLogin"
                    src="@/static/icon/close_white.png"
                    alt=""
                />
            </view>
        </view>
        <view class="register-banner">
            <BannerImg :position="8"></BannerImg>
        </view>
        <view class="login-view">
            <!-- <view class="logo">
                <img
                    v-if="store.baseConfig.imgBaseUrl"
                    :src="getLogoUrl('login.png', store.baseConfig)"
                    alt=""
                />
            </view> -->
            <Register
                ref="RefRegister"
                :registerMode="data.registerMode"
                :formRules="data.formRules"
                :pageConfig="data.pageConfig"
                @init="init"
            />

           <!-- <OAuth
                class="oauth-view"
                :loginMode="data.registerMode"
                :formRules="data.formRules"
                :pageConfig="data.pageConfig"
                @auth-click="authClick"
            /> -->

            <view class="hasAccount" @click="switchType">
                {{ $t('KEY_MESSAGE_HAVEACCOUNT') }}
                <span>{{ $t('KEY_FORMBTN_LOGIN') }}</span>
            </view>
            <!-- <view class="support-view">
                <u @click="openSupport">{{ $t('KEY_LOGIN_SUPPORT') }}</u>
            </view> -->
            <!-- <view class="register-img">
                <img
                    v-if="store.commonParams.operatorId === 'own_lobby_bra1'"
                    src="@/static/activity/bannner_recharge_back.jpg"
                />
                <img
                    v-if="store.commonParams.operatorId === 'own_lobby_bra'"
                    src="@/static/activity/bannner_recharge_back_operator.jpg"
                />
            </view> -->
        </view>
    </Layout>
</template>
<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    import Register from '@/lib/components/Login/Register.vue'
   // import OAuth from '@/lib/components/Login/OAuth.vue'
    import { formRules, pageConfig } from './fromConfig'
    import _ from 'lodash'

    import BannerImg from '@/lib/components/BannerImg.vue'
    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Data {
        registerMode: number
        pageConfig: any
        formRules: any
    }

    const data = reactive<Data>({
        registerMode: 4,
        pageConfig: {
            headerTitle: '',
            formConfig: [],
            hasCode: false,
            btnText: 'Login',
        },
        formRules,
    })

    const RefRegister = ref()

    onLoad((options) => {
        // 2024-8-9 默认 手机号（loginMode = 4） 注册，并且去掉 短信验证码 校验
        // data.registerMode = options.login_mode ? Number(options.login_mode) : 0
        data.registerMode = 4

        init(data.registerMode)
    })

    const init = (registerMode) => {
        let currentPageConfig = pageConfig[1][registerMode]
        data.pageConfig = currentPageConfig
            ? currentPageConfig
            : pageConfig[1][2]



        uni.setNavigationBarTitle({
            title: $t('KEY_FORMBTN_REGISTER'),
        })
    }

    const stepBack = () => {
        data.registerMode = data.pageConfig.lastStep
        init(data.registerMode)
    }

    const switchType = () => {
        uni.redirectTo({
            url: '/pages/login/index',
        })
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

    const authClick = () => {
        RefRegister.value.authClick()
    }

    const openSupport = () => {
        // @ts-ignore
        $crisp.push(['do', 'chat:show'])
        // @ts-ignore
        $crisp.push(['do', 'chat:open'])
    }
</script>
<style lang="scss">
    .register-banner {
        @apply w-full overflow-hidden;
        height: 224rpx;
        margin-bottom: 24rpx;
        img {
            @apply w-full h-full;
            object-fit: cover;
        }
    }
    .login-view {
        @apply overflow-hidden;
        color: #1b1c1c;
        padding: 0 40rpx;
    }

    .login-header {
        @apply flex justify-between items-center absolute top-0 left-0 w-full box-border;
        padding: 0 56rpx;
        margin-top: 40rpx;
        img {
            width: 52rpx;
        }
    }

    .logo {
        @apply flex justify-center items-center;
        font-size: 40rpx;
        width: 291rpx;
        margin: 56rpx auto 51rpx;
        img {
            @apply w-full;
        }
    }

    .support-view {
        @apply flex justify-center items-center;
        line-height: 30rpx;
        padding: 0 38rpx;
        margin-top: 30rpx;
        font-size: 28rpx;
        font-weight: bold;

        u {
            color: #098842;
        }
    }

    .register-img {
        @apply w-full overflow-hidden;
        height: 162rpx;
        border-radius: 8rpx;
        margin-top: 80rpx;
        img {
            @apply w-full h-full;
            object-fit: cover;
        }
    }

    .hasAccount {
        font-size: 25rpx;
        color: #a9aaa9;
        text-align: center;
        margin-top: 60rpx;
        span {
            font-size: 28rpx;
            font-weight: bold;
            text-decoration: underline;
            color: #3781fd;
        }
    }
    .oauth-view {
        margin-top: 40rpx;
    }
</style>
