<template>
    <Layout :headerTitle="$t('KEY_AGENT_MENU_GET_RECORD')" :hasHeader="false">
        <view class="invite-view">
            <slot></slot>
            <image
                src="@/static/agent/bra_bottom.jpg"
                class="bottom-fill"
            ></image>
            <view class="form-box">
                <Form
                    ref="RefForm"
                    :formData="data.formData"
                    :formConfig="config.pageConfig.formConfig"
                    :formRules="formRules"
                    :label-width="80"
                />
                <view class="btn-box flex justify-center">
                   <!-- <view class="google-btn" @click="toGooglePlay">
                        <image
                            src="@/static/agent/google_play_icon.png"
                            mode="widthFix"
                        ></image>
                    </view> -->
                    <!--
                    <view class="normal-btn bg-primary" @click="submit">
                        {{ config.pageConfig.btnText }}
                    </view>
                    -->
                    <LoadingBtn
                        class="normal-btn"
                        :loading="loadingSubmit"
                        @loadData="submit"
                    >
                        {{ config.pageConfig.btnText }}
                    </LoadingBtn>
                </view>
            </view>
        </view>
        <PopupMessage ref="RefMessage" />
    </Layout>
</template>
<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    import Form from '@/lib/components/Form/index.vue'
    import { onMounted, reactive, ref } from 'vue'
    import { formRules, pageConfig } from '@/pages/register/fromConfig'
    import { useUsersStore } from '@/store/userStore'
    import _ from 'lodash'
    import { i18n } from '@/common/i18nConfig'
    import { ga, getGaid, appOnEventJs } from '@/common/common'
    import { api as xxyyApi } from '@/NET/xxyy'
    import { initApi, initUser } from '@/common/login'
    import { ErrorHandler, ErrorCode } from '@/common/ErrorHandler'
    import { onLoad } from '@dcloudio/uni-app'
    import LoadingBtn from '@/lib/components/Button/LoadingBtn.vue'
    const { t: $t } = i18n.global
    const store = useUsersStore()
    const RefMessage = ref()
    const data: any = reactive({
        formData: {},
    })
    let query: Record<string, string> = {}
    onLoad((option) => {
        query = option
        // 有可能只是hash变了 页面不刷新 导致新uid不赋值给localStorage
        // const localUid = localStorage.getItem('uid')
        // console.log(
        //     'onload',
        //     query.uid && (!localUid || query.uid !== localUid)
        // )
        // if (query.uid && (!localUid || query.uid !== localUid)) {
        //     location.reload()
        // }
        // window.addEventListener('hashchange', () => {
        //     console.log(getCurrentPages(), query)
        // })
        if (query.uid) {
            // localStorage.setItem('uid', query.uid)
			 uni.setStorageSync('uid', query.uid)
        }
        if(!query.rand){
            const pages = getCurrentPages()
            const len = pages.length;
            const fullPath = pages[len - 1].$vm.$page.fullPath
            if(fullPath.includes('?')){
                uni.reLaunch({
                    url: `${fullPath}&rand=${new Date().getTime()}`
                })
            } else {
                uni.reLaunch({
                    url: `${fullPath}?rand=${new Date().getTime()}`
                })
            }
        }
    })
    onMounted(() => {
        
    })
    const config = reactive({
        // 2024-8-9 默认 手机号（loginMode = 4） 注册，并且去掉 短信验证码 校验
        pageConfig: {
            formConfig: pageConfig[1][4].formConfig,
            btnText: pageConfig[1][4].btnText,
        },
    })
    const register = async () => {
        store.isLogin = false
        store.userInfo = null
        // localStorage.removeItem(`token_${store.baseConfig.operatorId}`)
        // localStorage.removeItem('guest_info')
        // localStorage.removeItem('activeModalFirstShow')
		uni.removeStorageSync(`token_${store.baseConfig.operatorId}`)
		uni.removeStorageSync('guest_info')
		uni.removeStorageSync('activeModalFirstShow')
        delete store.commonParams['userId']
        let userInfo = await initUser(store.baseConfig, store.commonParams)
        if (userInfo) {
            store.userInfo = userInfo
        }
        
        data.formData.loginMode = 4
        data.formData.userId = store.userInfo.userId
        data.formData.repeatPassword = data.formData.password
        data.formData.GAID = getGaid()
        const uid = query.uid
        if (uid && uid !== 'undefined') {
            data.formData.FromMode = 1
            data.formData.FromId = uid
        }
        let params = Object.assign(
            _.cloneDeep(store.commonParams),
            data.formData
        )

        if (data.formData.loginMode === 4) {
          if (store.baseConfig.countryId === 'MEX') {
                data.areaCode = '52'
            } else if (store.baseConfig.countryId === 'GHA') {
                data.areaCode = '233'
            } else if (store.baseConfig.countryId === 'BRA') {
                data.areaCode = '55'
            }
            params.mobile = data.areaCode + data.formData.mobile
        }

        let res = await xxyyApi.account.register(params)
        if (res.success) {
            
            // try {

            //     // @ts-ignore
            //     fbq('trackCustom', 'register_success', {
            //         userId: store.userInfo?.userId,
            //     })
            // } catch (err) {}

            try {
                // @ts-ignore
                // fbq('track', 'CompleteRegistration', {
                //     userId: store.userInfo?.userId,
                // })
            } catch (err) {}

            appOnEventJs('register-success')
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
            uni.reLaunch({
                url: '/pages/index/index',
            })
        } else {
            
            RefMessage.value.messageToggle({
                type: 'error',
                message: ErrorCode[res.code]
                    ? ErrorCode[res.code]
                    : res.message,
            })
            ErrorHandler(res, 'register')
        }
    }
    const RefForm = ref(null)
    const loadingSubmit = ref(false)
    const submit = async () => {
        console.log(data.formData)
        loadingSubmit.value = true
        let validate = await RefForm.value.validate('registerForm')
        if (validate) {
            await register()
        }
        loadingSubmit.value = false
    }
    const toGooglePlay = () => {
        
        location.href =
            'https://play.google.com/store/apps/details?id=com.dhan.easy.borrow.slots&pli=1'
    }
</script>
<style lang="scss" scoped>
    .invite-view {
        @apply h-full overflow-hidden relative;
        .bottom-fill {
            width: 100%;
            margin-top: -18rpx;
        }
        .form-box {
            @apply absolute;
            top: 650rpx;
            width: 670rpx;
            left: 50%;
            transform: translate3d(-50%, 0, 0);
            ::v-deep .uni-easyinput__content {
                background-color: transparent !important;
                border: none !important;
            }
            ::v-deep .slot {
                height: 100%;
            }
            ::v-deep .uni-forms-item:nth-child(2) {
                margin-top: 70rpx;
            }
            .btn-box {
                width: 670rpx;
                margin: 100rpx auto 0;
                .google-btn {
                    width: 307rpx;
                    image {
                        @apply w-full;
                    }
                }
                .normal-btn {
                    width: 310rpx;
                    height: 96rpx;
                }
            }
        }
    }
</style>
