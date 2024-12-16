<template>
    <view class="register-view">
        <view class="step">
            {{ pageConfig.formTips }}
        </view>
        <view v-if="pageConfig.currentStep === 'form'">
            <Form
                ref="RefForm"
                :formData="data.formData"
                :formConfig="pageConfig.formConfig"
                :formRules="formRules"
                :label-width="80"
            />
            <view>
                <view v-if="data.btnCheck">
                    <view
                        class="normal-btn bg-primary"
                        v-if="pageConfig.hasCode"
                        @click="nextStep"
                    >
                        {{ pageConfig.btnText }}
                    </view>
                    <!--
                    <view class="normal-btn bg-primary" v-else @click="submit">
                        {{ pageConfig.btnText }}
                    </view>
                     -->
                    <LoadingBtn
                        :loading="loadingSubmit"
                        v-else
                        @loadData="submit"
                    >
                        {{ pageConfig.btnText }}
                    </LoadingBtn>
                </view>
                <view v-else>
                    <view class="normal-btn bg-primary disabled">
                        {{ pageConfig.btnText }}
                    </view>
                </view>
            </view>
            <view
                class="check-view"
                @click="() => (data.btnCheck = !data.btnCheck)"
            >
                <view class="img-view">
                    <img
                        v-if="!data.btnCheck"
                        src="@/static/icon/check.png"
                        alt=""
                    />
                    <img v-else src="@/static/icon/checked.png" alt="" />
                </view>
                <view>
                    {{ $t('KEY_LOGIN_CHECKTEXT') }}
                    <u @click="goCondition">
                        {{ $t('KEY_LOGIN_CONDITIONS') }}
                    </u>
                    {{ $t('KEY_LOGIN_AND') }}
                    <u @click="goPrivacy">{{ $t('KEY_LOGIN_POLICY') }}</u>
                </view>
            </view>
        </view>
        <view v-if="pageConfig.currentStep === 'code'">
            <SmsCode
                :formData="data.formData"
                :pageConfig="pageConfig"
                ref="RefSmsCode"
                @codeChecked="codeChecked"
            />
        </view>
    </view>
    <PopupMessage ref="RefMessage" />
</template>

<script lang="ts" setup>
    import Form from '@/lib/components/Form/index.vue'
    import SmsCode from './SmsCode.vue'
    import { api as xxyyApi } from '@/NET/xxyy'
    import { initApi } from '@/common/login'
    import { ErrorCode } from '@/common/ErrorHandler'
    import { getGaid, appOnEventJs, getAFid } from '@/common/common'
    import LoadingBtn from '../Button/LoadingBtn.vue'
    import _ from 'lodash'
    import { RegisterKwai } from "./registerKwai";

    const store = useUsersStore()
    const { t: $t } = i18n.global

    interface Props {
        registerMode: number
        pageConfig: any
        formRules: any
    }
    const props = withDefaults(defineProps<Props>(), {
        registerMode: 2,
        pageConfig: {
            headerTitle: '',
            formConfig: [],
            hasCode: false,
            btnText: 'Login',
        },
        formRules: {},
    })

    interface Data {
        formData: any
        areaCode: string
        btnCheck: boolean
    }
    const data = reactive<Data>({
        formData: {},
        areaCode: '55',
        btnCheck: true,
    })

    const RefMessage = ref()
    const RefForm = ref()
    const RefSmsCode = ref()

    const emit = defineEmits(['init'])
    const nextStep = async () => {


        let validate = await RefForm.value.validate('registerForm')
        if (validate) {
            if (props.pageConfig.hasCode) {
                emit('init', props.pageConfig.nextStep)
                nextTick(() => {
                    RefSmsCode.value.sendSmsCode()
                })
            }
        }
    }

    const authClick = () => {
        data.btnCheck = true
    }

    const codeChecked = (codeRes) => {
        data.formData.verifyCode = codeRes.verifyCode
        data.formData.securityCode = codeRes.securityCode

        register()
    }
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

    const register = async () => {
        if (store.userInfo?.userMode === 2) {
            uni.switchTab({
                url: '/pages/index/index',
            })
            return
        }


        data.formData.loginMode = props.registerMode
        data.formData.userId = store.userInfo.userId
        data.formData.repeatPassword = data.formData.password
        data.formData.GAID = getGaid()
        data.formData.IMEI = getAFid()

        let params = Object.assign(
            _.cloneDeep(store.commonParams),
            data.formData
        )

        if (props.registerMode === 4) {
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

            KwaiApi(res.result)

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

    const goPrivacy = () => {
        uni.navigateTo({
            url: '/pages/privacy/index',
        })
    }

    const goCondition = () => {
        uni.navigateTo({
            url: '/pages/conditions/index',
        })
    }

    const KwaiApi = (result: any) => {
        const cid = uni.getStorageSync('cid') || ''
        const pixelId = RegisterKwai?.[cid]?.pixelId || ''
        const access_token = RegisterKwai?.[cid]?.access_token || ''
        if (!cid || !pixelId || !access_token) return

        const regex = /(?:[\w-]+\.)*([\w-]+\.[\w-]+)/;
        const match = location.host.match(regex);

        // kwai参数配置文档：https://docs.qingque.cn/d/home/eZQB6la5gGLdpSGexeOlXGFVk?identityId=1pTerwwOjbg
        const data = {
            clickid: uni.getStorageSync('click_id'),
            event_name: 'EVENT_COMPLETE_REGISTRATION',
            // event_name: 'EVENT_PURCHASE',
            pixelId,
            access_token,
            testFlag: 'false',
            trackFlag: 'false', // 测试：true，正式：false
            is_attributed: '1',
            mmpcode: 'PL',
            pixelSdkVersion: '9.9.9',
            properties: '',
            // properties: '{"currency":"BRL","value":"10.28"}',
            third_party: match ? match[1] : 'bet77s.com',
        }
        const url_params = new URLSearchParams(data).toString()
        fetch(`https://www.adsnebula.com/log/common/gapi?${url_params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(data),
        })
            .then((response) => {
                const resdata = response.json();
                return resdata;
            })
            .then(res => {
              if (res?.result === 1 && result.clearFromId) {
                uni.removeStorageSync('cid')
              }
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    onMounted(() => {
        if (store.baseConfig.countryId === 'MEX') {
            data.areaCode = '52'
        } else if (store.baseConfig.countryId === 'GHA') {
            data.areaCode = '233'
        } else if (store.baseConfig.countryId === 'BRA') {
            data.areaCode = '55'
        }
    })

    defineExpose({
        authClick,
    })
</script>

<style lang="scss">
    .register-view {
        .step {
            @apply flex justify-center items-center;
            margin: 10rpx 0 20rpx;
            opacity: 0.5;
            font-size: 28rpx;
        }
        .check-view {
            @apply flex items-center box-border;
            font-size: 21rpx;
            color: #a9aaa9;
            line-height: 25rpx;
            padding: 0 10rpx;
            margin-top: 30rpx;
            word-break: break-all;
            .img-view {
                width: 60rpx;
                margin-right: 15rpx;
                img {
                    @apply w-full;
                }
            }
            u {
                color: #3781fd;
            }
        }
    }
</style>
