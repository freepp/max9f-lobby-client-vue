<template>
    <teleport to="#mask_modal" v-if="data.mounted">
        <view class="dialog-modal">
            <MaskModal ref="RefModal" @maskClick="maskClick"></MaskModal>
            <view
                class="dialog-view"
                @click.stop="() => {}"
                v-show="data.isShow"
            >
                <view class="dialog-content">
                    <view class="alert-type-img">
                        <img src="@/static/icon/success.png" alt="" />
                    </view>
                    <view class="alert-message">
                        {{ $t('KEY_PAY_COPYSUCCESS') }}
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
        successBtnText: string
    }

    const props = withDefaults(defineProps<Props>(), {
        successBtnText: 'Yes',
    })

    interface Data {
        isShow: Boolean
        mounted: Boolean
    }
    const data = reactive<Data>({
        isShow: false,
        mounted: false,
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

    onMounted(() => {
        data.mounted = true
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
        z-index: 1050;
    }
    .dialog-view {
        @apply absolute box-border;
        z-index: 1051;
        background: #fff;
        border-radius: 14rpx;
        width: 485rpx;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 34rpx 47rpx;
        color: #454545;
    }
    .dialog-content {
        @apply flex flex-col items-center;
        .alert-type-img {
            width: 85rpx;
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
