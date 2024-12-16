<template>
    <teleport to="#mask_modal" v-if="data.mounted">
        <view class="dialog-modal">
            <MaskModal ref="RefModal" @maskClick="maskClick"></MaskModal>
            <view
                class="dialog-view"
                @click.stop="() => {}"
                v-show="data.isShow"
            >
                <view class="loading">
                    <img src="@/static/icon/loading.png" alt="" />
                </view>
                <view class="loading-text">
                    <img src="@/static/icon/loadingtext.png" alt="" />
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
        // changeIsShow(false)
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
        @apply fixed left-0 right-0 bottom-0 top-0 z-30;
    }
    .dialog-view {
        @apply absolute box-border;
        z-index: 30;
        border-radius: 14rpx;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #454545;
        .loading {
            width: 182rpx;
            height: 182rpx;
            animation: rotate 2s linear infinite;
            img {
                @apply w-full;
            }
        }
        .loading-text {
            @apply absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 135rpx;
            img {
                @apply w-full;
            }
        }
        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    }
</style>
