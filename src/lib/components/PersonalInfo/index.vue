<template>
    <view class="personalInfo-view">
        <view class="personal-title">{{ $t('KEY_PAGETITLE_IDDATA') }}</view>
        <view class="scroll-view">
            <Form
                ref="RefForm"
                :formData="data.formData"
                :formConfig="data.formConfig"
                :formRules="data.formRules"
                :label-width="80"
            />
            <view class="normal-btn bg-primary" @click="submit">
                {{ $t('KEY_COMMON_CONFIRM') }}
            </view>
        </view>
    </view>
    <PopupMessage ref="RefMessage" />
</template>

<script lang="ts" setup>
    import { reactive, ref, onMounted, watch } from 'vue'
    import Form from '@/lib/components/Form/index.vue'
    import { formRules, pageConfig, userInfoTemplate } from './fromConfig'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { i18n } from '@/common/i18nConfig'
    import { ga } from '@/common/common'
    const { t: $t } = i18n.global
    const store = useUsersStore()

    // interface Props {
    //     pageType?: number
    // }

    // const props = withDefaults(defineProps<Props>(), {
    //     pageType: 1,
    // })

    interface Data {
        formConfig: any
        formData: any
        formRules: any
    }

    const data = reactive<Data>({
        formConfig: [],
        formData: {},
        formRules,
    })
    const RefForm = ref()
    const RefMessage = ref()
    const emit = defineEmits(['confirm'])

    const getFormTemplate = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.profile.form(params)
        if (res.success) {
            let template = []
            let tempTemplate: any = {}
            res.result.forEach((item) => {
                tempTemplate = userInfoTemplate.find(
                    (data) => data.key === item.uiFieldID
                )
                if (tempTemplate && tempTemplate.key !== 'PhoneNumber') {
                    tempTemplate.required = item.isRequired
                    template.push(tempTemplate)
                }
                tempTemplate.dark = true;
            })
            data.formConfig = template
        } else {
            ErrorHandler(res, 'getFormTemplate')
        }
    }

    const getFormData = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.profile.info(params)
        if (res.success) {
            data.formData = res.result
        } else {
            ErrorHandler(res, 'getFormData')
        }
    }

    const updateFormData = async () => {
        
        data.formData.userId = store.userInfo.userId
        let params = Object.assign(data.formData, store.commonParams)
        let res = await lobbyApi.profile.modify(params)
        if (res.success) {
            
            emit('confirm')
            RefMessage.value.messageToggle({
                type: 'success',
                message: $t('KEY_MESSAGE_MODIFICATION'),
            })
        } else {
            
            RefMessage.value.messageToggle({
                type: 'error',
                message: res.message,
            })
            ErrorHandler(res, 'updateFormData')
        }
    }

    const submit = async () => {
        let validate = await RefForm.value.validate('personalForm')
        if (validate) {
            updateFormData()
        }
    }

    const initData = async () => {
        if (store.userInfo) {
            getFormTemplate()
            getFormData()
        }
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    onMounted(() => {
        initData()
    })
</script>

<style lang="scss">
    .personal-title {
        @apply flex items-center justify-center text-white-100;
        font-size: 33rpx;
        font-weight: bold;
        height: 100rpx;
    }
    .scroll-view {
        @apply absolute left-0 right-0 bottom-0 overflow-y-auto;
        top: 100rpx;
        padding: 0 40rpx;
    }
    .personalInfo-view {
        @apply text-center;
    }
</style>
