<template>
    <view class="forgot-view">
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
                    <view class="normal-btn bg-primary" v-else @click="submit">
                        {{ pageConfig.btnText }}
                    </view>
                </view>
                <view v-else>
                    <view class="normal-btn bg-primary disabled">
                        {{ pageConfig.btnText }}
                    </view>
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
    import { reactive, ref, onMounted, nextTick } from 'vue'
    import Form from '@/lib/components/Form/index.vue'
    import SmsCode from './SmsCode.vue'
    import { api as xxyyApi } from '@/NET/xxyy'
    import { ErrorHandler, ErrorCode } from '@/common/ErrorHandler'
    import { ga } from '@/common/common'
    import { i18n } from '@/common/i18nConfig'
    import { useUsersStore } from '@/store/userStore'
    import _ from 'lodash'

    const store = useUsersStore()
    const { t: $t } = i18n.global

    interface Props {
        forgotMode: number
        pageConfig: any
        formRules: any
    }
    const props = withDefaults(defineProps<Props>(), {
        forgotMode: 0,
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

    const codeChecked = (codeRes) => {
        data.formData.verifyCode = codeRes.verifyCode
        data.formData.securityCode = codeRes.securityCode

        emit('init', 1)
    }

    const submit = async () => {
        console.log(data.formData)
        let validate = await RefForm.value.validate('forgotForm')
        if (validate) {
            forgot()
        }
    }

    const forgot = async () => {
        data.formData.userId = store.userInfo.userId
        let params = Object.assign(
            _.cloneDeep(store.commonParams),
            data.formData
        )
        params.mobile = data.areaCode + data.formData.mobile
        let forgotData = Object.assign(params)
        let res = await xxyyApi.account.forgotPassword(forgotData)
        if (res.success) {
            uni.redirectTo({
                url: '/pages/login/index?login_mode=2',
            })
        } else {
            RefMessage.value.messageToggle({
                type: 'error',
                message: ErrorCode[res.code]
                    ? ErrorCode[res.code]
                    : res.message,
            })
            ErrorHandler(res, 'forgot')
        }
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
</script>

<style lang="scss">
    .forgot-view {
        .step {
            @apply flex justify-center items-center;
            margin: 10rpx 0 20rpx;
            opacity: 0.5;
            font-size: 28rpx;
        }
    }
</style>
