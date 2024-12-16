<template>
    <view class="cardinfo-view">
        <Layout
            :headerTitle="
                data.isTipPersonalForm
                    ? $t('KEY_PAGETITLE_ADDCARD')
                    : $t('KEY_PAGETITLE_CARDINFO')
            "
        >
            <view class="info-view" v-if="!data.isTipPersonalForm">
                <view class="list-group">
                    <view
                        class="list-item"
                        v-for="(item, index) in data.formConfig"
                        :key="index"
                        @click="() => itemClick(item)"
                    >
                        <view class="item-detail" v-if="item.key !== 'key'">
                            <view
                                class="item-name"
                                v-if="item.key === 'tejeePayMethod'"
                            >
                                {{ $t('KEY_FORM_KEY') }}
                            </view>
                            <view class="item-name" v-else>
                                {{ item.label }}
                            </view>
                            <view
                                class="flex items-center"
                                v-if="!item.disabled"
                            >
                                <view
                                    class="form-text"
                                    v-if="data.formData[item.key] !== 'null'"
                                >
                                    <view v-if="item.key === 'bankCode'">
                                        {{ data.formData['bankName'] }}
                                    </view>
                                    <view
                                        v-else-if="
                                            item.key === 'tejeePayMethod'
                                        "
                                    >
                                        {{ data.formData['key'] }}
                                    </view>
                                    <view v-else>
                                        {{ data.formData[item.key] }}
                                    </view>
                                </view>
                                <view class="form-text form-edit" v-else>
                                    {{ $t('KEY_PAY_EDIT') }}
                                </view>
                                <view class="right-icon">
                                    <img
                                        src="@/static/icon/arrow_right_white.png"
                                        alt=""
                                    />
                                </view>
                            </view>
                            <view class="item-text" v-else>
                                {{ data.formData[item.key] }}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <CardInfo
                :page-type="data.bankType"
                class="cardinfo"
                @confirm="cardConfirm"
                v-else
            />
        </Layout>
        <view class="topPage" v-if="data.showTopPage">
            <uni-nav-bar
                left-icon="left"
                :title="data.editConfig[0].label"
                background-color="#0e0e0f"
                color="#FFFFFF"
                @clickLeft="backPage"
            />
            <view class="edit-form">
                <Form
                    ref="RefForm"
                    :formData="data.formData"
                    :formConfig="data.editConfig"
                    :formRules="data.formRules"
                    :label-width="80"
                />
                <view class="normal-btn bg-primary" @click="submit">
                    {{ $t('KEY_PAY_SAVE') }}
                </view>
            </view>
        </view>
        <PopupMessage ref="RefMessage" />
    </view>
</template>

<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    import CardInfo from '@/lib/components/CardInfo/index.vue'
    import Form from '@/lib/components/Form/index.vue'
    import { formRules, pageConfig } from '@/lib/components/CardInfo/fromConfig'
    import _ from 'lodash'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorCode } from '@/common/ErrorHandler'
    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Data {
        title?: string
        isTipPersonalForm: boolean
        formConfig: any
        formData: any
        sourceData: any
        formRules: any
        editConfig: any
        showTopPage: boolean
        userBankID: string
        bankType: number
    }

    const data = reactive<Data>({
        title: 'ID data',
        isTipPersonalForm: false,
        formConfig: pageConfig['mexSPEI'].formConfig,
        formData: {},
        sourceData: {},
        formRules,
        editConfig: [],
        showTopPage: false,
        userBankID: '',
        bankType: 1,
    })
    const RefForm = ref()
    const RefMessage = ref()

    const itemClick = (item) => {
        if (item.disabled) return
        data.editConfig = []
        data.editConfig.push(item)
        data.showTopPage = true
    }

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
        //         if (tempTemplate) {
        //             tempTemplate.required = item.isRequired
        //             tempTemplate.label = item.title
        //             tempTemplate.disabled = false
        //             if (tempTemplate.key === 'PhoneNumber') {
        //                 tempTemplate.disabled = true
        //             }
        //             template.push(tempTemplate)
        //         }
        //     })
        //     data.formConfig = template
        //     console.log(data.formConfig)
        // } else {
        //     ErrorHandler(res, 'getFormTemplate')
        // }
    }

    const getFormData = async () => {
        if (store.commonParams?.countryId === 'BRA') {
            singleBraBank()
        } else {
            singleBank()
        }
    }

    const singleBank = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                userBankID: data.userBankID,
            },
            store.commonParams
        )
        let res = await lobbyApi.profile.singleBank(params)
        if (res.success) {
            data.formData = res.result
            data.sourceData = _.cloneDeep(res.result)
        } else {
            ErrorHandler(res, 'getFormData')
        }
    }

    const singleBraBank = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                userBankID: data.userBankID,
            },
            store.commonParams
        )
        let res = await lobbyApi.profile.singleBraBank(params)
        if (res.success) {
            data.formData = res.result
            data.sourceData = _.cloneDeep(res.result)
        } else {
            ErrorHandler(res, 'getFormData')
        }
    }

    const updateFormData = async () => {
        if (store.commonParams?.countryId === 'BRA') {
            addBraBank()
        } else {
            addBank()
        }
    }

    const addBank = async () => {
        data.formData.userId = store.userInfo.userId
        data.formData.addBankType = 1
        let params = Object.assign(data.formData, store.commonParams)
        let res = await lobbyApi.profile.addBank(params)
        if (res.success) {
            closePage()
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
            closePage()
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
        console.log(data.formData)
        let validate = await RefForm.value.validate('cardForm')
        if (validate) {
            updateFormData()
        }
    }

    const backPage = async () => {
        data.formData = _.cloneDeep(data.sourceData)
        closePage()
    }

    const closePage = () => {
        data.showTopPage = false
    }

    const cardConfirm = () => {
        uni.navigateBack({
            delta: 1,
            // fail: () => {
            //     uni.reLaunch({
            //         url: '/pages/index/index'
            //     });
            // }
        })
    }

    const initData = async () => {
        if (store.userInfo) {
            if (!data.isTipPersonalForm) {
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
                if (data.userBankID) {
                    getFormData()
                } else {
                    data.isTipPersonalForm = true
                }
            }
        }
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    onLoad((options) => {
        data.userBankID = options.id ? options.id : ''
        data.bankType = options.bankType ? options.bankType : 1
        initData()
    })

    uni.setNavigationBarTitle({
        title: $t('KEY_PAGETITLE_CARDINFO'),
    })
</script>

<style lang="scss">
    .cardinfo-view {
        @apply w-full h-full;
    }
    .info-view {
    }
    .cardinfo {
        margin-top: 50rpx;
    }

    .list-group {
        @apply bg-black-80 text-white-100;
        padding: 0 42rpx;
        margin-bottom: 25rpx;
        .list-item {
            @apply flex items-center justify-between;
            .item-icon {
                width: 50rpx;
                margin: 0 15rpx;
                img {
                    @apply w-full;
                }
            }
            .item-detail {
                border-bottom: 2rpx solid;
                @apply flex items-center justify-between flex-1 border-black-80;
                padding: 28rpx;
                padding-right: 0;
            }
            .item-name {
                font-size: 28rpx;
                font-weight: 400;
            }
            .right-icon {
                width: 50rpx;
                height: 50rpx;
                img {
                    @apply w-full;
                }
            }
            &:last-child {
                .item-detail {
                    border: 0;
                }
            }
        }
        .form-text {
            @apply truncate text-right text-white-100;
            width: 400rpx;
            font-size: 28rpx;
            line-height: 21px;
            opacity: 0.8;
        }
        .form-edit {
            color: #098842;
        }
        .item-text {
            font-size: 28rpx;
            color: #414141;
            line-height: 21px;
            margin-right: 20rpx;
            opacity: 0.8;
        }
    }
    .topPage {
        @apply absolute top-0 left-0 right-0 bottom-0;
        background: var(--UI-BG);
    }
    .edit-form {
        padding: 40rpx;
    }
    ::v-deep .uni-navbar--border {
        border-color: rgba(69, 69, 69, 1) !important;
    }
</style>
