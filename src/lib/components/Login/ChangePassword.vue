<template>
    <view class="login-view">
        <view class="step">
            {{ pageConfig.formTips }}
        </view>
        <Form
            ref="RefForm"
            :formData="data.formData"
            :formConfig="pageConfig.formConfig"
            :formRules="formRules"
            :label-width="80"
        />
        <view>
            <view v-if="data.btnCheck">
                <view class="normal-btn bg-primary" @click="submit">
                    {{ pageConfig.btnText }}
                </view>
            </view>
            <view v-else>
                <view class="normal-btn bg-primary">
                    {{ pageConfig.btnText }}
                </view>
            </view>
        </view>
    </view>
    <PopupMessage ref="RefMessage" />
</template>

<script lang="ts" setup>
    import { reactive, ref, nextTick } from 'vue'
    import Form from '@/lib/components/Form/index.vue'
    import { api as xxyyApi } from '@/NET/xxyy'
    import { ErrorHandler, ErrorCode } from '@/common/ErrorHandler'
    import { ga } from '@/common/common'
    import { i18n } from '@/common/i18nConfig'
    import { useUsersStore } from '@/store/userStore'
    import _ from 'lodash'

    const store = useUsersStore()
    const { t: $t } = i18n.global

    interface Props {
        loginMode: number
        pageConfig: any
        formRules: any
    }
    const props = withDefaults(defineProps<Props>(), {
        loginMode: 2,
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
        btnCheck: boolean
    }
    const data = reactive<Data>({
        formData: {},
        btnCheck: true,
    })

    const RefMessage = ref()
    const RefForm = ref()

    const submit = async () => {
        console.log(data.formData)
        let validate = await RefForm.value.validate('changePasswordForm')
        if (validate) {
            changePassword()
        }
    }

    const changePassword = async () => {
        data.formData.userId = store.userInfo.userId
        let params = Object.assign(
            _.cloneDeep(store.commonParams),
            data.formData
        )
        let res = await xxyyApi.account.changePassword(params)
        if (res.success) {
            RefMessage.value.messageToggle({
                type: 'success',
                message: $t('KEY_MESSAGE_MODIFICATION'),
            })
            uni.reLaunch({
                url: '/pages/profile/index',
            })
        } else {
            RefMessage.value.messageToggle({
                type: 'error',
                message: ErrorCode[res.code]
                    ? ErrorCode[res.code]
                    : res.message,
            })
            ErrorHandler(res, 'login')
        }
    }
</script>

<style lang="scss">
    .login-view {
        .step {
            @apply flex justify-center items-center;
            margin: 10rpx 0 20rpx;
            opacity: 0.5;
            font-size: 28rpx;
            color:white;
        }
    }
</style>
