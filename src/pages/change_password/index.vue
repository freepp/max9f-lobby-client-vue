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
        <view class="login-view">
            <view class="logo">
                <img
                    v-if="store.baseConfig.imgBaseUrl"
                    :src="getLogoUrl('login.png', store.baseConfig)"
                    alt=""
                />
            </view>
            <ChangePassword
                ref="RefChangePassword"
                :loginMode="data.loginMode"
                :formRules="data.formRules"
                :pageConfig="data.pageConfig"
                @init="init"
            />
          <!--  <view class="support-view">
                <u @click="openSupport">{{ $t('KEY_LOGIN_SUPPORT') }}</u>
            </view> -->
            <view class="register-img">
                <img
                    v-if="store.commonParams.operatorId === 'own_lobby_bra1'"
                    src="@/static/activity/bannner_recharge_back.jpg"
                />
                <img
                    v-if="store.commonParams.operatorId === 'own_lobby_bra'"
                    src="@/static/activity/bannner_recharge_back_operator.jpg"
                />
            </view>
        </view>
    </Layout>
</template>
<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    import ChangePassword from '@/lib/components/Login/ChangePassword.vue'
    import { formRules, pageConfig } from './fromConfig'
    import _ from 'lodash'
    import { getLogoUrl } from '@/common/common'

    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Data {
        loginMode: number
        pageConfig: any
        formRules: any
    }

    const data = reactive<Data>({
        loginMode: 0,
        pageConfig: {
            headerTitle: '',
            formConfig: [],
            hasCode: false,
            btnText: 'Login',
        },
        formRules,
    })

    const RefChangePassword = ref()

    onLoad((options) => {
        data.loginMode = 0

        init(data.loginMode)
    })

    const init = (loginMode) => {
        let currentPageConfig = pageConfig[3][loginMode]
        data.pageConfig = currentPageConfig
            ? currentPageConfig
            : pageConfig[3][2]



        uni.setNavigationBarTitle({
            title: $t('KEY_PAGETITLE_CHANGEPASSWORD'),
        })
    }

    const stepBack = () => {
        data.loginMode = data.pageConfig.lastStep
        init(data.loginMode)
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

    const openSupport = () => {
        // @ts-ignore
        $crisp.push(['do', 'chat:show'])
        // @ts-ignore
        $crisp.push(['do', 'chat:open'])
    }
</script>
<style lang="scss">
    .login-view {
        @apply overflow-hidden;
        color: #1b1c1c;
        padding: 0 40rpx;
    }

    .login-header {
        @apply flex justify-between items-center;
        padding: 0 56rpx;
        margin-top: 12rpx;
        img {
            width: 42rpx;
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
</style>
