<template>
    <teleport to="#mask_modal">
        <view class="dialog-modal">
            <MaskModal ref="RefModal" @maskClick="maskClick"></MaskModal>
            <view
                class="dialog-view"
                :style="{ zIndex }"
                @click.stop="() => {}"
                v-show="data.isShow"
            >
                <view class="dialog-content">
                    <view class="title">{{ title }}</view>
                    <view class="img-view">
                        <view>
                            <img
                                class="card"
                                src="@/static/pay/yinhangka.png"
                                alt=""
                                v-if="pageType === 'deposit'"
                            />
                            <img src="@/static/pay/shouji.png" alt="" v-else />
                        </view>
                        <view>
                            <img
                                class="load"
                                src="@/static/pay/transfer.gif"
                                alt=""
                            />
                        </view>
                        <view>
                            <img
                                src="@/static/pay/shouji.png"
                                alt=""
                                v-if="pageType === 'deposit'"
                            />
                            <img
                                class="card"
                                src="@/static/pay/yinhangka.png"
                                alt=""
                                v-else
                            />
                        </view>
                    </view>
                    <view class="content" v-if="pageType === 'deposit'">
                        {{ $t('KEY_MESSAGE_DEPOSITLOADING') }}
                    </view>
                    <view class="content" v-else>
                        {{ $t('KEY_MESSAGE_WITHDRAWLOADING') }}
                    </view>
                </view>
                <view class="btn-view">
                    <view class="normal-btn bg-primary" @click="success">
                        {{ successBtnText }}
                    </view>
                </view>
            </view>
        </view>
    </teleport>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import MaskModal from '@/lib/components/MaskModal/index.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { i18n } from '@/common/i18nConfig'
    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Props {
        pageType?: string
        successBtnText: string
        title: string
        orderId?: string
        zIndex?: number
    }

    const props = withDefaults(defineProps<Props>(), {
        pageType: 'withdraw',
        successBtnText: 'Yes',
        title: '',
        orderId: '',
        zIndex: 30,
    })

    interface Data {
        isShow: Boolean
        timer: any
    }
    const data = reactive<Data>({
        isShow: false,
        timer: null,
    })

    const RefModal = ref()

    const startLoading = () => {
        data.timer = setInterval(() => {
            getOrder()
        }, 3000)
    }

    const closeInterval = () => {
        clearInterval(data.timer)
    }

    const getOrder = async () => {
        if (!props.orderId) return
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                orderId: props.orderId,
                type: 1,
            },
            store.commonParams
        )
        let res = await lobbyApi.profile.getOrder(params)
        if (res.success) {
            let status = res.result.orderStatus
            if (status == 2) {
                paySuccess(res.result)
            } else if (status == 3 || status == 4 || status == 5 || status == 6) {
                payFaild(res.result)
            }
        } else {
            ErrorHandler(res, 'getOrder')
        }
    }

    const emit = defineEmits(['onSuccess', 'paySuccess', 'payFaild'])

    const success = () => {
        changeIsShow(false)
    }

    const paySuccess = (res) => {
        emit('paySuccess', res)
        changeIsShow(false)
    }

    const payFaild = (res) => {
        emit('payFaild', res)
        changeIsShow(false)
    }

    const maskClick = () => {
        changeIsShow(false)
    }

    const changeIsShow = (isShow) => {
        RefModal.value.changeModal(isShow)
        data.isShow = isShow
        if (!isShow) {
            closeInterval()
        } else {
            startLoading()
        }
    }

    defineExpose({
        changeIsShow,
    })
</script>

<style lang="scss">
    .dialog-modal {
    }
    .modal-view {
        @apply fixed left-0 right-0 bottom-0 top-0 z-30;
    }
    .dialog-view {
        @apply absolute box-border;
        z-index: 30;
        background: #fff;
        border-radius: 14rpx;
        width: 667rpx;
        min-height: 360rpx;
        left: 40rpx;
        top: 50%;
        transform: translateY(-50%);
        padding: 34rpx 47rpx;
        color: #454545;
    }

    .dialog-content {
        @apply flex flex-col items-center;
        .title {
            font-size: 42rpx;
            font-weight: bold;
            color: #454545;
        }

        .img-view {
            @apply flex items-center;
            margin-top: 80rpx;
            img {
                width: 77rpx;
                margin: 0 16rpx;
            }
            .load {
                width: 110rpx;
            }
            .card {
                width: 94rpx;
            }
        }
        .content {
            @apply text-center;
            margin-top: 60rpx;
        }
    }

    .dialog-message {
        @apply flex justify-center items-center;
        font-size: 1.03125rem;
        font-weight: bold;
        min-height: 160rpx;
    }

    .btn-view {
        @apply flex;
        margin-top: 30rpx;
    }

    .info-btn {
        margin-right: 50rpx;
    }
</style>
