<template>
    <view class="flex">
        <uni-easyinput
            :primaryColor="'#2979ff'"
            :type="itemConfig.cypto ? 'password' : 'text'"
            v-model="formData[itemConfig.key]"
            :placeholder="itemConfig.placeholder"
        />
        <view
            class="normal-btn bg-primary"
            :class="{ 'normal-btn bg-primary disabled': !btnEnabled }"
            @click="send"
        >
            {{ btnText }}
        </view>
    </view>
    <PopupMessage ref="RefMessage" />
</template>
<script lang="ts" setup>
    import { ref, computed, onUnmounted } from 'vue'
    import { FormItemConfig } from '@/models/common'
    import { i18n } from '@/common/i18nConfig'
    import { api as xxyyApi } from '@/NET/xxyy'
    import { isPhone } from '@/common/validate'
    import { useUsersStore } from '@/store/userStore'
    import { ga } from '@/common/common'
    import { ErrorHandler, ErrorCode } from '@/common/ErrorHandler'
    const store = useUsersStore()

    const { t: $t } = i18n.global
    interface Props {
        formData: any
        itemConfig: FormItemConfig
    }

    const props = withDefaults(defineProps<Props>(), {
        formData: () => ({}),
        itemConfig: () => ({
            key: '',
            label: '',
            placeholder: '',
            required: true,
            type: '',
            cypto: false,
            relative: '',
        }),
    })

    const btnText = ref($t('KEY_BIND_SEND'))
    const sending = ref(false)
    const btnEnabled = computed(() => {
        const value = props.formData[props.itemConfig.relative]
        let isValid = false
        if (store.baseConfig.countryId === 'BRA') {
            if (isPhone(value, 'pt-BR')) {
                isValid = true
            } else {
                isValid = false
            }
        } else {
            isValid = !!value
        }
        return isValid && !sending.value
    })
    const RefMessage = ref()
    let timer = null
    // 点击发送
    const send = async () => {
        const value = props.formData[props.itemConfig.relative]
        if (!btnEnabled.value) {
            return
        }
        let areaCode = ''
        if (store.baseConfig.countryId === 'MEX') {
            areaCode = '52'
        } else if (store.baseConfig.countryId === 'GHA') {
            areaCode = '233'
        } else if (store.baseConfig.countryId === 'BRA') {
            areaCode = '55'
        }
        let params = Object.assign(
            {
                userId: store.userInfo?.userId,
                id: areaCode + value,
                mode: 0,
            },
            store.commonParams
        )
        let res = await xxyyApi.account.sendVerifyCode(params)
        if (!res.success) {
            
            // if (res.code === 'SMSLimited') {
            //     countdown()
            // }
            RefMessage.value.messageToggle({
                type: 'error',
                message: ErrorCode[res.code]
                    ? ErrorCode[res.code]
                    : res.message,
            })
            ErrorHandler(res, 'send.sendVerifyCode')
            return
        }
        sending.value = true
        let second = 60
        btnText.value = second + 's'
        timer = setInterval(() => {
            btnText.value = --second + 's'
            if (second === 0) {
                sending.value = false
                btnText.value = $t('KEY_BIND_RESEND')
                clearInterval(timer)
            }
        }, 1000)
    }
    onUnmounted(() => {
        timer && clearInterval(timer)
    })
</script>
<style lang="scss">
    ::v-deep .is-input-border {
        border: 0;
        border-bottom: 4rpx solid #a7a8a8;
    }

    ::v-deep .uni-easyinput__content {
        background: #ffffff;
        height: 90rpx;
        font-size: 28rpx;
    }

    ::v-deep .uni-input-placeholder {
        overflow: inherit;
        font-size: 28rpx;
    }

    ::v-deep .is-input-error-border {
        border-color: #ff2a00 !important;
    }

    ::v-deep .uni-forms-item__error {
        color: #ff2a00;
        margin-top: 16rpx;
    }
    .normal-btn {
        width: 153rpx;
        margin-left: 8rpx;
        border-radius: 7rpx;
    }
</style>
