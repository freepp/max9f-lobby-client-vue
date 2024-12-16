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
                    <view class="alert-type-img">
                        <img src="@/static/pay/carderror.png" alt="" />
                    </view>
                    <view class="alert-message">
                        {{ title }}
                    </view>
                    <view class="alert-detail">
                        {{ $t('KEY_PAY_ERRORMESSAGE') }}
                    </view>
                    <view class="normal-btn bg-primary" @click="success">
                        {{ $t('KEY_PAY_BTNMESSAGE') }}
                    </view>
                    <view class="normal-btn bg-default" @click="faild">
                        + {{ $t('KEY_PAY_ADDCARD') }}
                    </view>
                </view>
            </view>
        </view>
    </teleport>
</template>

<script lang="ts" setup>
    import { reactive, ref, onMounted } from 'vue'
    import MaskModal from '@/lib/components/MaskModal/index.vue'
    import { i18n } from '@/common/i18nConfig'
    const { t: $t } = i18n.global

    interface Props {
        successBtnText?: string
        title: string
        zIndex?: number
    }

    const props = withDefaults(defineProps<Props>(), {
        successBtnText: 'Yes',
        title: '',
        zIndex: 30,
    })

    interface Data {
        isShow: Boolean
    }
    const data = reactive<Data>({
        isShow: false,
    })
    const emit = defineEmits(['onSuccess', 'onFaild'])
    const RefModal = ref()

    const maskClick = () => {
        changeIsShow(false)
    }

    const changeIsShow = (isShow) => {
        RefModal.value.changeModal(isShow)
        data.isShow = isShow
    }

    const success = () => {
        emit('onSuccess')
        changeIsShow(false)
    }

    const faild = () => {
        emit('onFaild')
        changeIsShow(false)
    }
    // const changeIsShow = (isShow) => {
    //     modal({
    //         type: 'warning',
    //         width: '667rpx',
    //         title: props.title,
    //         content: $t('KEY_PAY_ERRORMESSAGE'),
    //         confirmText: $t('KEY_PAY_BTNMESSAGE'),
    //         maskClosable: true,
    //         cancelText: `+  ${$t('KEY_PAY_ADDCARD')}`,
    //         onConfirm: success,
    //         onCancel: faild,
    //     })
    //     data.isShow = isShow
    // }
    defineExpose({
        changeIsShow,
    })
</script>

<style lang="scss">
    .modal-view {
        @apply fixed left-0 right-0 bottom-0 top-0 z-30;
    }
    .dialog-view {
        @apply absolute box-border;
        z-index: 30;
        background: #fff;
        border-radius: 14rpx;
        width: 667rpx;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 90rpx 45rpx 70rpx;
        color: #454545;
    }
    .dialog-content {
        @apply flex flex-col items-center;
        .alert-type-img {
            width: 128rpx;
            img {
                @apply w-full;
            }
        }
        .alert-message {
            font-size: 34rpx;
            font-weight: bold;
            color: #000000;
            margin-top: 37rpx;
        }

        .alert-detail {
            @apply w-full box-border text-center;
            margin: 50rpx 0;
            padding: 0 25rpx;
            font-size: 25rpx;
            color: #454545;
            line-height: 42rpx;
        }
    }

    .bg-default {
        margin-top: 28rpx;
    }
</style>
