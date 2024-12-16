<template>
    <view class="personalInfo-view">
        <view class="scroll-view">
            <Form
                ref="RefForm"
                :formData="data.formData"
                :formConfig="data.formConfig"
                :formRules="data.formRules"
                :label-width="80"
                :noCashLoad="noCashLoad"
            />
            <LoadingBtn :loading="loadingSubmit" @loadData="submit">
                {{ $t('KEY_PAGETITLE_ADDCARD') }}
            </LoadingBtn>
        </view>
        <PopupMessage ref="RefMessage" />
    </view>
</template>

<script lang="ts" setup>
    import { reactive, ref, onMounted, watch } from 'vue'
    import Form from '@/lib/components/Form/index.vue'
    import LoadingBtn from '../Button/LoadingBtn.vue'
    import { formRules, pageConfig } from './fromConfig'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler, ErrorCode } from '@/common/ErrorHandler'
    import { modal } from '@/lib/components/Modal/index'
    import { useUsersStore } from '@/store/userStore'
    import { i18n } from '@/common/i18nConfig'
    import { ga } from '@/common/common'
    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Props {
        pageType?: number | string
        dark?: boolean
        noCashLoad?: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
        pageType: 1,
        dark: true,
        noCashLoad: false
    })

    interface Data {
        formConfig: any
        formData: any
        formRules: any
    }
    const data = reactive<Data>({
        formConfig: pageConfig['mexSPEI'].formConfig,
        formData: {
            accName: '',
            taxId: '',
            key: '',
        },
        formRules,
    })
    const loadingSubmit = ref(false)

    data.formConfig.map((item) => (item.dark = props.dark))
    const RefForm = ref()
    const RefMessage = ref()
    const emit = defineEmits(['confirm'])

    const getFormTemplate = async () => {
        // let params = Object.assign(
        //     {
        //         userId: store.userInfo.userId,
        //     },
        //     store.commonParams
        // )
        // let res = await lobbyApi.profile.form(params)
        // if (res.success) {
        //     let template = []
        //     let tempTemplate: any = {}
        //     res.result.forEach((item) => {
        //         tempTemplate = userInfoTemplate.find(
        //             (data) => data.key === item.uiFieldID
        //         )
        //         if (tempTemplate && tempTemplate.key !== 'PhoneNumber') {
        //             tempTemplate.required = item.isRequired
        //             tempTemplate.label = item.title
        //             template.push(tempTemplate)
        //         }
        //     })
        //     data.formConfig = template
        // } else {
        //     ErrorHandler(res, 'getFormTemplate')
        // }
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
        loadingSubmit.value = true
        

        if (store.commonParams?.countryId === 'BRA') {
            await addBraBank()
        } else {
            await addBank()
        }
        loadingSubmit.value = false
    }

    const addBank = async () => {
        data.formData.userId = store.userInfo.userId
        data.formData.addBankType = props.pageType
        let params = Object.assign(data.formData, store.commonParams)
        let res = await lobbyApi.profile.addBank(params)
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

    const addBraBank = async () => {
        data.formData.userId = store.userInfo.userId
        let params = Object.assign(data.formData, store.commonParams)
        params.channels = 5
        let res = await lobbyApi.profile.addBraBank(params)
        if (res.success) {
            
            emit('confirm')
            RefMessage.value.messageToggle({
                type: 'success',
                message: $t('KEY_MESSAGE_MODIFICATION'),
            })
        } else {
            

            if (res.code === 'RS_BRA_CPF_ALREADY') {
                modal({
                    width: '500rpx',
                    type: 'warning',
                    title: $t('KEY_POPUP_TIPS'),
                    content:
                        'Seu CPF já está sendo utilizado por outra conta. Caso deseje recuperá-lo, por favor, entre em contato com o atendimento ao cliente.',
                    cancelText: $t('KEY_ALERT_DEPOSIT_CANCEL'),
                    confirmText: 'OK',
                    showCancel: false,
                    onConfirm: () => {},
                    onCancel: () => {},
                })
                return
            }

            RefMessage.value.messageToggle({
                type: 'error',
                message: ErrorCode[res.code]
                    ? ErrorCode[res.code]
                    : res.message,
            })
            ErrorHandler(res, 'updateFormData')
        }
    }

    const submit = async () => {
        let validate = await RefForm.value.validate('cardForm')
        if (validate) {
            updateFormData()
        }
    }

    onMounted(() => {
        let countryId = store.baseConfig.countryId
        switch (countryId) {
            case 'MEX':
                data.formConfig = pageConfig['mexSPEI'].formConfig
                break
            case 'BRA':
                data.formConfig = pageConfig['braPIX'].formConfig
                break
            default:
                data.formConfig = pageConfig['mexSPEI'].formConfig
        }
        data.formConfig.map((item) => (item.dark = props.dark))
    })
</script>

<style lang="scss">
    .scroll-view {
        padding: 0 40rpx;
    }
    .personalInfo-view {
        @apply text-center;
    }

    .primary-btn {
        margin-bottom: 40rpx;
    }
</style>
