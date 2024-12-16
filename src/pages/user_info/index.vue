<template>
    <Layout :headerTitle="$t('KEY_PAGETITLE_IDDATA')">
        <view class="info-view" v-if="!data.isTipPersonalForm">
            <view class="list-group">
                <view
                    class="list-item"
                    v-for="(item, index) in data.formConfig"
                    :key="index"
                    @click="() => itemClick(item)"
                >
                    <view class="item-detail">
                        <view class="item-name">{{ item.label }}</view>
                        <view class="flex items-center" v-if="!item.disabled">
                            <view
                                class="form-text"
                                v-if="data.formData[item.key]"
                            >
                                {{ data.formData[item.key] }}
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
        <PersonalInfo @confirm="personalConfirm" v-else />
    </Layout>
    <view class="topPage" v-if="data.showTopPage">
        <uni-nav-bar
            left-icon="left"
            :title="data.editConfig[0].label"
            background-color="var(--UI-BG)"
            color="#FFFFFF"
            @clickLeft="backPage"
            :border="false"
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
</template>

<script lang="ts" setup>
    import { reactive, ref, watch, onMounted } from 'vue'
    import Layout from '@/lib/layout/Base.vue'
    import PersonalInfo from '@/lib/components/PersonalInfo/index.vue'
    import Form from '@/lib/components/Form/index.vue'
    import {
        formRules,
        userInfoTemplate,
    } from '@/lib/components/PersonalInfo/fromConfig'
    import _ from 'lodash'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { i18n } from '@/common/i18nConfig'
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
    }

    const data = reactive<Data>({
        title: 'ID data',
        isTipPersonalForm: false,
        formConfig: [],
        formData: {},
        sourceData: {},
        formRules,
        editConfig: [],
        showTopPage: false,
    })
    const RefForm = ref()
    const RefMessage = ref()

    const itemClick = (item) => {
        if (item.disabled) return
        data.editConfig = []
        data.editConfig.push(item)
        data.showTopPage = true
    }

    const getLoad = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.initLobby.load(params)
        if (res.success) {
            data.isTipPersonalForm = res.result.isTipPersonalForm
        } else {
            ErrorHandler(res, 'getLoad')
        }
    }

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
                if (tempTemplate) {
                    tempTemplate.required = item.isRequired
                    tempTemplate.disabled = false
                    if (tempTemplate.key === 'PhoneNumber') {
                        tempTemplate.disabled = true
                    }
                    template.push(tempTemplate)
                }
                tempTemplate.dark = true;
            })
            data.formConfig = template
            console.log(data.formConfig)
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
            data.sourceData = _.cloneDeep(res.result)
        } else {
            ErrorHandler(res, 'getFormData')
        }
    }

    const updateFormData = async () => {
        data.formData.userId = store.userInfo.userId
        let params = Object.assign(data.formData, store.commonParams)
        let res = await lobbyApi.profile.modify(params)
        if (res.success) {
            getFormTemplate()
            getFormData()
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

    const submit = async () => {
        let validate = await RefForm.value.validate('personalForm')
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

    const personalConfirm = () => {
        initData()
    }

    const initData = async () => {
        if (store.userInfo) {
            await getLoad()
            if (!data.isTipPersonalForm) {
                getFormTemplate()
                getFormData()
            }
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

    uni.setNavigationBarTitle({
        title: $t('KEY_PAGETITLE_IDDATA'),
    })
</script>

<style lang="scss">
    .info-view {
    }

    .list-group {
        @apply bg-black-80 text-white-100;
        // color: #454545;
        padding: 0 42rpx;
        // background: #ffffff;
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
                border-bottom: 1rpx solid #adadad;
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
            font-size: 28rpx;
            // color: #414141;
            color: #fff;
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
    ::v-deep .uni-navbar__header {
        @apply box-border;
        border-bottom: 1px solid rgba(69, 69, 69, var(--tw-border-opacity));
    }
</style>
