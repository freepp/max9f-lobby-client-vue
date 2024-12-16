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
            <view class="login-tab">
                <view
                    class="tab-items"
                    :class="{ 'tab-choosed': data.tabChoosed === index }"
                    v-for="(item, index) in data.loginTabs"
                    @click="tabClick(index)"
                >
                    {{ item.name }}
                </view>
            </view>
            <Login
                ref="RefLogin"
                :loginMode="data.loginMode"
                :formRules="data.formRules"
                :pageConfig="data.pageConfig"
                @init="init"
            />
           <!-- <view class="forgot" @click="forgotPassword()">
                <span>{{ $t('KEY_MESSAGE_FORGOTPASSOWRD') }}</span>
            </view> -->
           <!-- <OAuth
                class="oauth-view"
                :loginMode="data.loginMode"
                :formRules="data.formRules"
                :pageConfig="data.pageConfig"
            /> -->
            <view class="hasAccount" @click="switchType">
                {{ $t('KEY_MESSAGE_NOACCOUNT') }}
                <span>{{ $t('KEY_FORMBTN_REGISTER') }}</span>
            </view>
          <!--  <view class="support-view">
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
    import Login from '@/lib/components/Login/Login.vue'
    //import OAuth from '@/lib/components/Login/OAuth.vue'
    import { formRules, pageConfig } from './fromConfig'
    import _ from 'lodash'
    import BannerImg from '@/lib/components/BannerImg.vue'

    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Data {
        loginMode: number
        pageConfig: any
        formRules: any
        loginTabs: any
        tabChoosed: number
    }

    const data = reactive<Data>({
        loginMode: 2,
        pageConfig: {
            headerTitle: '',
            formConfig: [],
            hasCode: false,
            btnText: 'Login',
        },
        formRules,
        loginTabs: [
            {
                name: 'Telephone',
            },
            {
                name: 'Username',
            },
        ],
        tabChoosed: 0,
    })

    const RefLogin = ref()

    onLoad((options) => {
        // 2024-8-9 默认 手机号（loginMode = 4） 登录，通过tab切换改版loginMode
        // data.loginMode = options.login_mode ? Number(options.login_mode) : 2
        data.loginMode = 4

        init(data.loginMode)
    })

    const init = (loginMode) => {
        let currentPageConfig = pageConfig[0][loginMode]
        data.pageConfig = currentPageConfig
            ? currentPageConfig
            : pageConfig[0][2]



        uni.setNavigationBarTitle({
            title: $t('KEY_PAGETITLE_LOGIN'),
        })
    }

    const tabClick = (index: number) => {
        RefLogin.value.clearValidate()
        data.tabChoosed = index
        if (index) {
          data.loginMode = 2
        } else {
          data.loginMode = 4
        }
        init(data.loginMode)
    }

    const stepBack = () => {
        data.loginMode = data.pageConfig.lastStep
        init(data.loginMode)
    }

    const switchType = () => {
        uni.redirectTo({
            url: '/pages/register/index?login_mode=2',
        })
    }

    const forgotPassword = () => {
        uni.redirectTo({
            url: '/pages/forgot/index',
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

   /* const openSupport = () => {
        // @ts-ignore
        $crisp.push(['do', 'chat:show'])
        // @ts-ignore
        $crisp.push(['do', 'chat:open'])
    } */
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

    .login-tab {
        @apply flex justify-around;
        margin-bottom: 24rpx;
    }

    .tab-items {
        @apply flex justify-center items-center text-white-80;
        width: 170rpx;
        height: 60rpx;
        border-bottom: 4rpx solid transparent;
        font-size: 32rpx;
        font-weight: 400;
        padding-bottom: 16rpx;
    }

    .tab-choosed {
        @apply text-white-100 font-bold;
        border-color: var(--primary-color);
    }

    .support-view {
        @apply flex justify-center items-center;
        line-height: 30rpx;
        padding: 0 38rpx;
        margin-top: 30rpx;
        margin-bottom: 30rpx;
        font-size: 28rpx;
        font-weight: bold;

        u {
            color: #098842;
        }
    }

    .forgot {
        margin-top: 53rpx;
        color: #a9aaa9;
        font-size: 28rpx;
        text-align: center;
        span {
            text-decoration: underline;
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
