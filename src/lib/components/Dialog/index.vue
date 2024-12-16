<template>
    <view class="dialog-modal">
        <MaskModal ref="RefModal" @maskClick="maskClick"></MaskModal>
        <!-- <SlideBottomTransition> -->
        <view class="dialog-view" @click.stop="() => {}" v-show="data.isShow">
            <view class="dialog-message">{{ message }}</view>
            <view class="btn-view">
                <view class="normal-btn bg-info" @click="faild">
                    {{ faildBtnText }}
                </view>
                <view class="normal-btn bg-primary" @click="success">
                    {{ successBtnText }}
                </view>
            </view>
        </view>
        <!-- </SlideBottomTransition> -->
    </view>
</template>

<script lang="ts" setup>
    import { reactive, ref, onMounted } from 'vue'
    import MaskModal from '@/lib/components/MaskModal/index.vue'
    import SlideBottomTransition from '@/lib/components/Transition/SlideBottomTransition.vue'
    import { i18n } from '@/common/i18nConfig'
    const { t: $t } = i18n.global

    interface Props {
        message: string
        successBtnText: string
        faildBtnText: string
    }

    const props = withDefaults(defineProps<Props>(), {
        message: 'Are you sure you want to? ',
        successBtnText: 'Yes',
        faildBtnText: 'No',
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

    defineExpose({
        changeIsShow,
    })
</script>

<style lang="scss">
    .dialog-modal {
    }
    .modal-view {
        @apply absolute left-0 right-0 bottom-0 top-0 z-30;
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
    }

    .dialog-message {
        @apply flex justify-center items-center;
        font-size: 1.03125rem;
        font-weight: bold;
        min-height: 160rpx;
        color: #454545;
        text-align: center;
    }

    .btn-view {
        @apply flex;
        margin-top: 30rpx;
    }

    .btn-view .bg-info {
        margin-right: 50rpx;
    }
</style>
