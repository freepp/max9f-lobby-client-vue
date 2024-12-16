<template>
    <view class="title">{{ $t('KEY_FORMTITLE_VERIFYCODE') }}</view>
    <CodeInput
        :value="data.value"
        inputType="number"
        @input="input"
        @confirm="confirm"
    />
    <view class="tips">
        <span>{{ $t('KEY_MESSAGE_SENDSUCCESS2') }} {{ formData.mobile }}</span>

        <span v-if="data.count > 0" class="ml-1">{{ data.count }}s</span>
    </view>
    <view class="normal-btn bg-primary disabled" v-if="data.code.length !== 4">
        {{ pageConfig.btnText }}
    </view>
    <view class="normal-btn bg-primary" @click="submit" v-else>
        {{ pageConfig.btnText }}
    </view>
    <view class="normal-btn bg-default disable" v-if="data.count > 0">
        {{ $t('KEY_FORMBTN_RESEND') }} {{ data.count }}s
    </view>
    <view class="normal-btn bg-default" @click="resend" v-else>
        {{ $t('KEY_FORMBTN_RESEND') }}
    </view>
    <PopupMessage ref="RefMessage" />
</template>
<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import CodeInput from '@/lib/components/CodeInput.vue'
    import { api as xxyyApi } from '@/NET/xxyy'
    import { ErrorHandler, ErrorCode } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { i18n } from '@/common/i18nConfig'
    import { ga } from '@/common/common'
    const { t: $t } = i18n.global

    interface Props {
        formData?: any
        pageConfig?: any
    }

    interface Data {
        code: string
        value: string
        timer: any
        count: number
        areaCode: string
    }

    const props = withDefaults(defineProps<Props>(), {
        formData: () => ({}),
        pageConfig: () => ({}),
    })

    const store = useUsersStore()

    const data = reactive<Data>({
        code: '',
        value: '',
        timer: null,
        count: 60,
        areaCode: '52',
    })

    const RefMessage = ref()

    const emit = defineEmits(['codeChecked'])

    const submit = () => {
        checkSmsCode()
    }

    const resend = () => {
        sendSmsCode()
    }

    const countdown = () => {
        clearInterval(data.timer)
        data.count = 60
        data.timer = setInterval(() => {
            data.count--
            if (data.count <= 0) {
                clearInterval(data.timer)
            }
        }, 1000)
    }

    const sendSmsCode = async () => {
        console.log(props.formData)
        if (store.baseConfig.countryId === 'MEX') {
            data.areaCode = '52'
        } else if (store.baseConfig.countryId === 'GHA') {
            data.areaCode = '233'
        } else if (store.baseConfig.countryId === 'BRA') {
            data.areaCode = '55'
        }
        let params = Object.assign(
            {
                userId: store.userInfo?.userId,
                id: data.areaCode + props.formData.mobile,
                mode: 0,
            },
            store.commonParams
        )
        let res = await xxyyApi.account.sendVerifyCode(params)
        if (res.success) {
            RefMessage.value.messageToggle({
                type: 'success',
                message: $t('KEY_MESSAGE_SENDSUCCESS'),
            })
            countdown()
        } else {
            
            if (res.code === 'SMSLimited') {
                countdown()
            }
            RefMessage.value.messageToggle({
                type: 'error',
                message: ErrorCode[res.code]
                    ? ErrorCode[res.code]
                    : res.message,
            })
            ErrorHandler(res, 'sendSmsCode')
        }
    }

    const checkSmsCode = async () => {
        let res = await xxyyApi.account.checkVerifyCode({
            mode: 0,
            id: data.areaCode + props.formData.mobile,
            verifyCode: data.code,
        })
        if (res.success) {
            emit('codeChecked', {
                verifyCode: data.code,
                securityCode: res.result.securityCode,
            })
        } else {
            RefMessage.value.messageToggle({
                type: 'error',
                message: ErrorCode[res.code]
                    ? ErrorCode[res.code]
                    : res.message,
            })
            ErrorHandler(res, 'checkSmsCode')
        }
    }

    const confirm = (val) => {
        // data.code = val
        // checkSmsCode()
    }

    const input = (val) => {
        data.value = val
        data.code = val
    }

    defineExpose({
        sendSmsCode,
    })
</script>
<style lang="scss">
    .title {
        @apply flex justify-center items-center;
        font-size: 32rpx;
        margin-bottom: 58rpx;
    }

    .tips {
        @apply text-center;
        padding: 0 75rpx;
        font-size: 28rpx;
        margin: 56rpx 0 100rpx;
        color: #a9aaa9;
    }

    .normal-btn,
    .normal-btn-disabled {
        margin-bottom: 44rpx;
    }
    .disable {
        opacity: 0.4;
        &:active {
            transform: scale(1);
        }
    }
</style>
