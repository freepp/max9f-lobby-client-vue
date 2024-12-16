<template>
    <view class="auth-view">
        <view class="content text-36">{{ $t('KEY_AUTH_LOGGING') }}</view>
        <view class="content">{{ $t('KEY_AUTH_TIPS') }}</view>
    </view>
</template>

<script lang="ts" setup>
    import { onMounted, watch, reactive, computed } from 'vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as xxyyApi } from '@/NET/xxyy'
    import { ga, getGaid, queryURLParams } from '@/common/common'
    import { initApi } from '@/common/login'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { i18n } from '@/common/i18nConfig'

    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Data {
        title?: string
    }
    const data = reactive<Data>({
        title: 'Auth',
    })

    const oAuthLogin = async () => {
        let options = queryURLParams()
        console.log(options)
        if (!options.access_token) return
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                authCallbackIpo: {
                    code: options.code,
                    state: options.state,
                    access_token: options.access_token,
                    oAuthType: Number(options.oAuthType),
                },
                LoginMode: 8,
                GAID: getGaid(),
            },
            store.commonParams
        )
        let res = await xxyyApi.oAuth.oAuthLogin(params)
        if (res.success) {
           /* localStorage.setItem(
                `token_${store.baseConfig.operatorId}`,
                res.result.jwtToken
            )
            localStorage.removeItem('guest_info') */
			uni.setStorageSync(
			    `token_${store.baseConfig.operatorId}`,
			    res.result.jwtToken
			)
			uni.removeStorageSync('guest_info')
            store.userInfo = res.result
            store.isLogin = true
            initApi(
                store.baseConfig.xxyyUrl,
                store.baseConfig.appUrl,
                store.baseConfig.commonUrl,
                store.baseConfig.activityUrl,
                res.result.jwtToken
            )
            // 如果是授权登录 且没有手机号 则弹出绑定弹窗
            if (!store.userInfo.mobile) {
                uni.setStorageSync('oauthSuccess', '1')
            }
            uni.switchTab({
                url: '/pages/index/index',
            })
        } else {
            ErrorHandler(res, 'oAuthLogin')
            uni.switchTab({
                url: '/pages/index/index',
            })
        }
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    const initData = () => {
        if (store.userInfo) {
            if (store.userInfo.userMode === 1) {
                oAuthLogin()
            } else {
                uni.switchTab({
                    url: '/pages/index/index',
                })
            }
        }
    }

    onMounted(() => {
        initData()
    })
</script>

<style lang="scss">
    .auth-view {
        @apply w-full h-full flex justify-center items-center flex-col;
        font-size: 32rpx;
        .content {
            margin-bottom: 20rpx;
        }
    }
</style>
