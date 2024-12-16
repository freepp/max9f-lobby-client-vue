<template>
    <view>
        <view class="title">
            <view class="line"></view>
            {{ $t('KEY_AUTH_TITLE') }}
            <view class="line"></view>
        </view>
        <view class="oauth-view">
            <view class="normal-btn blue-btn" @click="OAuth(1)">
                <view class="icon">
                    <img src="@/static/icon/facebook.png" alt="" />
                </view>
                {{ $t('KEY_AUTH_FACEBOOK') }}
            </view>
            <view class="normal-btn white-btn" @click="OAuth(2)">
                <view class="icon">
                    <img src="@/static/icon/google.png" alt="" />
                </view>
                {{ $t('KEY_AUTH_GOOGLE') }}
            </view>
        </view>
        <PopupMessage ref="RefMessage" />
    </view>
</template>

<script lang="ts" setup>
    import { reactive, ref, onMounted, nextTick } from 'vue'
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
        areaCode: string
        btnCheck: boolean
    }
    const data = reactive<Data>({
        formData: {},
        areaCode: '55',
        btnCheck: true,
    })

    const RefMessage = ref()

    const emit = defineEmits(['authClick'])

    const OAuth = async (oAuthType) => {
        emit('authClick')
        data.formData = {
            userId: store.userInfo.userId,
            oAuthType,
            redirectUri: `${location.origin}${location.pathname}?oAuthType=${oAuthType}`,
        }
        let params = Object.assign(
            _.cloneDeep(store.commonParams),
            data.formData
        )

        let res = await xxyyApi.oAuth.oAuthUrl(params)
        if (res.success) {
            window.location.href = res.result
            // window.open(res.result)
            // window.open(res.result, 'width=100', 'height=100')
        } else {
            RefMessage.value.messageToggle({
                type: 'error',
                message: ErrorCode[res.code]
                    ? ErrorCode[res.code]
                    : res.message,
            })
            ErrorHandler(res, 'oauth')
        }
    }

    onMounted(() => {})
</script>

<style lang="scss">
    .oauth-view {
        .title {
            @apply flex justify-between items-center;
            margin-bottom: 40rpx;
            font-size: 28rpx;
            color: #b0b0b0;
            .line {
                width: 90rpx;
                height: 3rpx;
                background-color: #ffffff;
            }
        }
        .normal-btn {
            @apply justify-start;
            &:active {
                transform: scale(0.96);
            }
        }
        .blue-btn {
            background-color: #3b7beb;
            color: #ffffff;
            margin-bottom: 35rpx;
        }
        .white-btn {
            background-color: #ffffff;
            color: #3d3d3d;
        }
        .icon {
            width: 90rpx;
            height: 90rpx;
            margin-right: 50rpx;
            img {
                @apply w-full h-full;
            }
        }
    }
</style>
