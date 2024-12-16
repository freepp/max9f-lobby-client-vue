<template>
    <!-- <view
        class="fixed bind-mobile-trigger"
        v-if="!isBindMobile && store.userInfo?.userMode === 2 && showIcon"
        @click="openDialog(false)"
    >
        <image
            src="@/static/activity/bind_mobile.png"
            class="w-full"
            mode="widthFix"
        ></image>
        <view v-html="$t('KEY_BIND_TRIGGER')"></view>
    </view> -->
    <transition name="fade">
        <view class="bind-mobile-bg" v-if="isDialogShow">
            <view class="bing-mobile">
                <view class="banner">
					
                    <BannerImg :position="9"></BannerImg>
                    <view v-if="isShowClose" class="close" @click="closeDialog">
                        <image
                            src="@/static/icon/close_white.png"
                            mode="widthFix"
                        />
                    </view>
                </view>
                <view class="content">
                    <!-- <view class="logo">
                        <image
                            v-if="store.baseConfig.imgBaseUrl"
                            :src="
                                getLogoUrl('login_popup.png', store.baseConfig)
                            "
                            mode="widthFix"
                            alt=""
                        />
                    </view>
                    <view class="title1" v-html="$t('KEY_BIND_TITLE1')"></view> -->
                    <Form
                        class="form"
                        ref="formRef"
                        :formData="formData"
                        :formConfig="formOption.formConfig"
                        :formRules="formOption.formRules"
                    ></Form>
                    <view
                        class="normal-btn bg-primary"
                        :class="{
                            'normal-btn bg-primary disabled': !btnEnabled,
                        }"
                        v-html="$t('KEY_BIND_SUBMIT')"
                        @click="submit"
                    ></view>

                    <view class="security" v-html="$t('KEY_BIND_TEXT')"></view>
                </view>
            </view>
        </view>
    </transition>
    <PopupMessage ref="RefMessage" />
</template>

<script lang="ts" setup>
    import { reactive, ref, computed, onMounted } from 'vue'
    import Form from '@/lib/components/Form/index.vue'
    import {
        formRules,
        mobilePassVerifyCode,
        mobileAndVerifyCode,
    } from '@/pages/login/fromConfig'
    import { useUsersStore } from '@/store/userStore'
    import { i18n } from '@/common/i18nConfig'
    import { api as xxyyApi } from '@/NET/xxyy'
    import { ErrorHandler, ErrorCode } from '@/common/ErrorHandler'
    import { ga, getGaid, appOnEventJs } from '@/common/common'
    import { initApi } from '@/common/login'
    import BannerImg from '@/lib/components/BannerImg.vue'

    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Props {
        showIcon?: boolean
        isRegister?: boolean
        isShowClose?: boolean
    }
    const props = withDefaults(defineProps<Props>(), {
        showIcon: true,
        isRegister: false,
        isShowClose: true,
    })
    const formRef = ref(null)
    const formOption = reactive({
        formConfig: mobileAndVerifyCode,
        formRules: formRules,
    })
    const formData = reactive({
        mobile: '',
        password: '',
        verifyCode: '',
    })
    const isDialogShow = ref(false)
    const hasPassword = ref(false)
    const openDialog = (hasPass) => {
        hasPassword.value = hasPass
        if (hasPassword.value) {
            formOption.formConfig = mobilePassVerifyCode
        } else {
            formOption.formConfig = mobileAndVerifyCode
        }
        isDialogShow.value = true
    }
    const emit = defineEmits(['bindSuccess', 'close', 'registeSuccess'])
    const closeDialog = () => {
        formData.mobile = ''
        formData.password = ''
        formData.verifyCode = ''
        formRef.value?.clearValidate()
        isDialogShow.value = false
        emit('close')
    }

    defineExpose({
        openDialog,
        closeDialog,
    })

    // 接口梳理
    /**
         * 检查是否已绑定
           发送验证码
           确认绑定
         */
    const btnEnabled = computed(() => {
        return !!formData.mobile.trim() && !!formData.verifyCode.trim()
    })

    const KwaiApi = () => {
        // let cid = localStorage.getItem('cid')
        let cid = uni.getStorageSync('cid')
        let pixelId = ''
        let access_token = ''
        if (!cid) return
        switch (cid) {
            case 'kwaihiya':
                pixelId = '526162562342977581'
                access_token = '2Fa1i9JEhAszIYtQ0vpP/6GJeAcSvGAq57hZnNdfjnw='
                break
            case 'kwaihiyazhuce':
                pixelId = '526162300173819961'
                access_token = 'hc+BFJ6Rcfx1iQCUJS8UbhLBIUzPDlPByKnZ5UzFi+M='
                break
            case 'kwaihiyaupzc':
                pixelId = '530878450958868489'
                access_token = 'Z20iwFCdMPOFYslb3wTDOrhut/CFi83s2vnqvfEkceo='
                break
            case 'kwaihiyauppurchase':
                pixelId = '530878450958868489'
                access_token = 'Z20iwFCdMPOFYslb3wTDOrhut/CFi83s2vnqvfEkceo='
                break
            case 'kwaihiyajogozc':
                pixelId = '530887667233071190'
                access_token = 'WxKNFcCNRENEwhki6nw6MKDl2NxdiNKNtB2DaIYve8A='
                break
            case 'kwaihiyajogopurchase':
                pixelId = '531287785249718362'
                access_token = 'LOXLrJX7om/ofDG0TeGDHjbnu4MX9UVYDcmdRrP38mI=='
                break
            default:
                return
        }
        var data = {
            // clickid: localStorage.getItem('click_id'),
            clickid: uni.getStorageSync('click_id'),
            event_name: 'EVENT_COMPLETE_REGISTRATION',
            pixelId,
            access_token,
            testFlag: false,
            trackFlag: false,
            is_attributed: 1,
            mmpcode: 'PL',
            pixelSdkVersion: '9.9.9',
            properties: '',
            third_party: 'lucro777.com',
        }

        fetch('http://www.adsnebula.com/log/common/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }
    // 手机号 + 密码登录
    const register = async (param) => {
        param.loginMode = 4
        param.repeatPassword = param.password
        let params = Object.assign({}, store.commonParams, param)
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

            KwaiApi()

            appOnEventJs('register-success')

            // localStorage.setItem(
            //     `token_${store.baseConfig.operatorId}`,
            //     res.result.jwtToken
            // )
            // localStorage.removeItem('guest_info')
            uni.setStorageSync(
                `token_${store.baseConfig.operatorId}`,
                res.result.jwtToken
            )
            // localStorage.removeItem('guest_info')
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
            emit('registeSuccess')
            closeDialog()
            uni.reLaunch({
                url: '/pages/index/index',
            })
        } else {
            
            RefMessage.value.messageToggle({
                type: 'error',
                message: ErrorCode[res.code] ? ErrorCode[res.code] : res.message,
            })
            ErrorHandler(res, 'register')
        }
    }
    const RefMessage = ref()
    const submit = async () => {
        if (btnEnabled.value) {
            const isValid = await formRef.value?.validate()
            if (isValid) {
                let areaCode = ''
                if (store.baseConfig.countryId === 'MEX') {
                    areaCode = '52'
                } else if (store.baseConfig.countryId === 'GHA') {
                    areaCode = '233'
                } else if (store.baseConfig.countryId === 'BRA') {
                    areaCode = '55'
                }
                let checkRes = await xxyyApi.account.checkVerifyCode({
                    mode: 0,
                    id: areaCode + formData.mobile,
                    verifyCode: formData.verifyCode,
                })
                if (!checkRes.success) {
                    RefMessage.value.messageToggle({
                        type: 'error',
                        message: ErrorCode[checkRes.code]
                            ? ErrorCode[checkRes.code]
                            : checkRes.message,
                    })
                    ErrorHandler(checkRes, 'submit.checkVerifyCode')
                    return
                }
                let param = {
                    appId: store.commonParams.appId,
                    userId: store.userInfo?.userId,
                    mobile: areaCode + formData.mobile,
                    verifyCode: formData.verifyCode,
                    securityCode: checkRes.result.securityCode,
                }
                if (props.isRegister && hasPassword) {
                    register(
                        Object.assign({}, param, {
                            password: formData.password,
                        })
                    )
                    return
                }
                if (hasPassword.value) {
                    param = Object.assign(param, {
                        newPassword: formData.password,
                    })
                }

                const changeRes = await xxyyApi.account.changeMobile(param)
                if (!changeRes.success) {
                    RefMessage.value.messageToggle({
                        type: 'error',
                        message: ErrorCode[changeRes.code]
                            ? ErrorCode[changeRes.code]
                            : changeRes.message,
                    })
                    console.log('xxx', changeRes.code)
                    ErrorHandler(changeRes, 'submit.checkVerifyCode')
                    return
                }
                store.userInfo.mobile = areaCode + formData.mobile
                emit('bindSuccess')
                closeDialog()
                // const bindRes =
            } else {
                
            }
        }
    }
</script>

<style lang="scss">
    .bind-mobile-trigger {
        @apply text-center;
        width: 148rpx;
        height: 146rpx;
        left: 8rpx;
        bottom: 150rpx;
        z-index: 88;
        image {
            width: 100rpx;
            margin: 0px auto;
        }
        view {
            @apply font-bold;
            width: 148rpx;
            height: 47rpx;
            font-size: 21rpx;
            color: #ffffff;
            line-height: 21rpx;
            margin-top: -7rpx;
            text-shadow: 1px 3px 5px #000000;
        }
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.2s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    .bind-mobile-bg {
        @apply fixed top-0 left-0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 3000;
    }
    .bing-mobile {
        width: 667rpx;
        background: #eeeeee;
        border-radius: 14px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        .banner {
            border-radius: 14px;
            height: 208rpx;
            img,
            image {
                border-top-left-radius: 14px;
                border-top-right-radius: 14px;
                @apply w-full h-full;
            }
        }
        .close {
            width: 55rpx;
            height: 55rpx;
            position: absolute;
            top: 20rpx;
            right: 20rpx;
            image {
                @apply w-full;
            }
        }
        .content {
            padding: 17rpx 42rpx 51rpx;
            .logo {
                width: 248rpx;
                height: 74rpx;
                margin: 0px auto;
                image {
                    @apply w-full;
                }
            }
            ::v-deep .items {
                margin-bottom: 50rpx;
            }
            .title1,
            .title2 {
                @apply text-center font-bold;
                font-size: 33rpx;
                color: #1b1c1c;
            }
            .title1 {
                margin-top: 47rpx;
            }
            .title2 {
                margin-top: 11rpx;
            }
            .form {
                margin-top: 30rpx;
            }
            .normal-btn {
                margin-top: 63rpx;
            }
            .security {
                margin: 0px auto;
                width: 560rpx;
                font-size: 25rpx;
                font-weight: 400;
                color: #5c5d5d;
                line-height: 33rpx;
                text-align: center;
                margin-top: 38rpx;
            }
            .tips {
                margin: 0px auto;
                width: 560rpx;
                font-size: 25rpx;
                color: #5c5d5d;
                text-align: center;
                margin-top: 10rpx;
            }
        }
    }
</style>
