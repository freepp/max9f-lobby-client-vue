<template>
    <teleport to="#mask_modal" v-if="data.mounted">
        <view class="dialog-modal">
            <MaskModal ref="RefModal" @maskClick="maskClick"></MaskModal>
            <view
                class="dialog-view"
                @click.stop="() => {}"
                v-show="data.isShow"
            >
                <view class="logo">
                    <img
                        v-if="store.baseConfig.imgBaseUrl"
                        :src="getLogoUrl('login_popup.png', store.baseConfig)"
                        alt=""
                    />
                </view>

                <view class="login-tab" v-if="data.pageType === 0">
                    <view
                        class="tab-items"
                        :class="{ 'tab-choosed': data.tabChoosed === index }"
                        v-for="(item, index) in data.loginTabs"
                        @click="tabClick(index)"
                    >
                        {{ item.name }}
                    </view>
                </view>

                <Login
                    v-if="data.pageType === 0"
                    ref="RefLogin"
                    :loginMode="data.loginMode"
                    :formRules="data.formRules"
                    :pageConfig="data.pageConfig"
                    @init="init"
                />
                <Register
                    v-if="data.pageType === 1"
                    ref="RefRegister"
                    :registerMode="data.loginMode"
                    :formRules="data.formRules"
                    :pageConfig="data.pageConfig"
                    @init="init"
                />

                <view
                    class="hasAccount"
                    v-if="data.pageType === 1"
                    @click="switchType"
                >
                    {{ $t('KEY_MESSAGE_HAVEACCOUNT') }}
                    <span>{{ $t('KEY_FORMBTN_LOGIN') }}</span>
                </view>
                <view
                    class="hasAccount"
                    v-if="data.pageType === 0"
                    @click="switchType"
                >
                    {{ $t('KEY_MESSAGE_NOACCOUNT') }}
                    <span>{{ $t('KEY_FORMBTN_REGISTER') }}</span>
                </view>

                <PopupMessage ref="RefMessage" />
            </view>
        </view>
    </teleport>
</template>

<script lang="ts" setup>
    import { reactive, ref, onMounted, nextTick } from 'vue'
    import MaskModal from '@/lib/components/MaskModal/index.vue'
    import Login from '@/lib/components/Login/Login.vue'
    import Register from '@/lib/components/Login/Register.vue'
    import { i18n } from '@/common/i18nConfig'
    import { formRules, pageConfig } from '@/pages/login/fromConfig'
    import { ga, getLogoUrl } from '@/common/common'
    import _ from 'lodash'
    import { useUsersStore } from '@/store/userStore'

    const store = useUsersStore()
    const { t: $t } = i18n.global

    // interface Props {}

    // const props = withDefaults(defineProps<Props>(), {})

    interface Data {
        isShow: Boolean
        mounted: boolean
        pageType: number
        loginMode: number
        formData: any
        formRules: any
        pageConfig: any
        loginTabs: any
        tabChoosed: number
    }
    const data = reactive<Data>({
        isShow: false,
        mounted: false,
        pageType: 1, // 0: login  1: register  2: forgot
        loginMode: 2,
        pageConfig: {
            headerTitle: '',
            formConfig: [],
            hasCode: false,
            btnText: 'Login',
        },
        formData: {},
        formRules,
        loginTabs: [
            {
                name: $t('KEY_LOGINSWITCH_USERNAME'),
            },
            {
                name: $t('KEY_LOGINSWITCH_TELEPHONE'),
            },
        ],
        tabChoosed: 0,
    })

    const RefModal = ref()
    const RefRegister = ref()
    const RefLogin = ref()
    const RefMessage = ref()

    const maskClick = () => {
        changeIsShow(false)
    }

    const changeIsShow = (isShow) => {
        if (isShow) {
            
        } else {
            
            init()
        }
        RefModal.value.changeModal(isShow)
        data.isShow = isShow
    }

    const init = () => {
        let currentPageConfig = _.cloneDeep(
            pageConfig[data.pageType][data.loginMode]
        )
        data.pageConfig = currentPageConfig
            ? currentPageConfig
            : pageConfig[0][2]
        data.pageType = data.pageConfig.pageType
        data.loginMode = data.pageConfig.loginMode
    }

    const tabClick = (index: number) => {
        RefLogin.value.clearValidate()
        data.formData = {}
        data.tabChoosed = index
        if (index) {
            data.loginMode = 4
        } else {
            data.loginMode = 2
        }
        init()
    }

    const switchType = () => {
        data.pageType = data.pageType ? 0 : 1
        if (data.pageType === 1) {
            data.loginMode = 2
        }
        init()
    }

    onMounted(() => {
        data.mounted = true
        init()
    })

    defineExpose({
        changeIsShow,
    })
</script>

<style lang="scss">
    .dialog-modal {
    }
    .modal-view {
        @apply fixed left-0 right-0 bottom-0 top-0;
        z-index: 1003;
    }
    .dialog-view {
        @apply absolute box-border;
        z-index: 1004;
        background: #eee;
        border-radius: 14rpx;
        width: 667rpx;
        // height: 931rpx;
        height: auto;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 42rpx;
        color: #454545;
    }

    .logo {
        @apply flex justify-center items-center;
        font-size: 40rpx;
        width: 291rpx;
        margin: 14rpx auto 47rpx;
        img {
            @apply w-full;
        }
    }
    .login-tab {
        @apply flex justify-around;
        margin-bottom: 24rpx;
    }

    .tab-items {
        @apply flex justify-center items-center;
        width: 170rpx;
        height: 60rpx;
        border-bottom: 4rpx solid transparent;
        font-size: 32rpx;
        font-weight: 400;
        color: rgba(27, 28, 28, 0.5);
        padding-bottom: 16rpx;
    }

    .tab-choosed {
        border-color: #ffa922;
        color: #1b1c1c;
    }

    .hasAccount {
        font-size: 25rpx;
        color: #a9aaa9;
        text-align: center;
        margin-top: 20rpx;
        span {
            font-size: 28rpx;
            font-weight: bold;
            text-decoration: underline;
            color: #3781fd;
        }
    }
</style>
