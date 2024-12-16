<template>
    <view
        ref="modalRef"
        class="dialog-modal"
        :style="dialogStyle"
        v-show="isShow"
        @click.self="maskClose"
    >
        <view class="dialog-view" :style="contentStyle">
            <view class="alert-type-img">
                <view class="alert-type-img-bg"></view>
                <view class="alert-type-img-bg-round"></view>
                <image
                    v-if="type === 'success'"
                    src="@/static/icon/success.png"
                    mode="widthFix"
                />
                <image
                    v-if="type === 'guest'"
                    src=" @/static/icon/guest.png"
                    mode="widthFix"
                />
                <image
                    v-if="type === 'cash'"
                    src=" @/static/icon/withdraw.png"
                    mode="widthFix"
                />
                <image
                    v-if="type === 'warning'"
                    src="@/static/icon/warning.png"
                    mode="widthFix"
                />
                <image
                    v-if="type === 'gift'"
                    src="@/static/icon/gift.png"
                    mode="widthFix"
                />
            </view>
            <view class="dialog-content">
                <view v-if="title" class="alert-message">
                    {{ title }}
                </view>
                <view
                    v-if="content"
                    class="alert-detail"
                    v-html="content"
                ></view>
                <view
                    v-if="showConfirm"
                    class="normal-btn bg-primary"
                    @click="success"
                    v-html="confirmText"
                ></view>
                <view
                    v-if="showCancel"
                    class="normal-btn bg-default"
                    @click="fail"
                    v-html="cancelText"
                ></view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { ref, computed, nextTick } from 'vue'
    import { increaseIndex } from '@/common/zindex'
    import { ModalType } from './index'
    interface ModalProps {
        width?: number | string
        type?: ModalType
        title?: string
        zIndex?: number
        content?: string
        cancelText?: string
        confirmText?: string
        showCancel?: boolean
        showConfirm?: boolean
        maskClosable?: boolean
        onConfirm?: Function
        onCancel?: Function
        onClose?: Function
        [key: string]: any
    }
    const props = withDefaults(defineProps<ModalProps>(), {
        width: 698,
        type: 'success',
        title: '',
        content: '',
        cancelText: '',
        confirmText: '',
        zIndex: null,
        maskClosable: false,
        showCancel: true,
        showConfirm: true,
        success: null,
        fail: null,
    })

    const isShow = ref<boolean>(true)
    const dynamicWidthPx = computed(() => {
        const isRpx =
            Number(props.width) || (props.width + '').endsWith('rpx')
                ? true
                : false
        if (isRpx) {
            return uni.upx2px(parseInt(props.width + '')) + 'px'
        } else {
            return parseInt(props.width + '') + 'px'
        }
    })
    const zIndex = ref(props.zIndex || increaseIndex())

    const contentStyle = computed(() => {
        return {
            width: dynamicWidthPx.value,
        }
    })
    const dialogStyle = computed(() => {
        return {
            zIndex: zIndex.value,
        }
    })
    const open = () => {
        zIndex.value = props.zIndex || increaseIndex()
        console.log(zIndex)
        isShow.value = true
    }
    const modalRef = ref()
    const close = () => {
        props.onClose && props.onClose()
        nextTick(() => {
            modalRef.value.$el?.parentNode?.removeChild(modalRef.value.$el)
        })
        isShow.value = false
    }
    const success = () => {
        props.onConfirm && props.onConfirm()
        close()
    }

    const fail = () => {
        props.onCancel && props.onCancel()
        close()
    }

    const maskClose = () => {
        if (props.maskClosable) {
            close()
        }
    }

    defineExpose({
        open,
        close,
    })
</script>

<style lang="scss">
    .dialog-modal {
        @apply absolute left-0 right-0 bottom-0 top-0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 99;
    }
    .modal-view {
        @apply fixed left-0 right-0 bottom-0 top-0 z-30;
    }
    .dialog-view {
        @apply absolute box-border;
        z-index: 30;
        background: #fff;
        border-radius: 14rpx;
        width: 485rpx;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        // padding: 0rpx 25rpx 34rpx;
        color: #454545;
        overflow: hidden;
    }
    .alert-type-img {
        @apply w-full;
        height: 132rpx;
        position: relative;
        overflow: hidden;
        .alert-type-img-bg {
            @apply w-full absolute bg-primary;
            height: 91rpx;
            left: 0;
            top: 0;
        }
        .alert-type-img-bg-round {
            @apply w-full absolute bg-primary;
            width: 110rpx;
            height: 110rpx;
            left: 50%;
            top: 12rpx;
            transform: translate3d(-50%, 0, 0);
            border-radius: 55%;
        }
        image {
            display: block;
            margin: 22rpx auto;
            width: 85rpx;
        }
    }
    .dialog-content {
        @apply flex flex-col items-center;
        padding: 0rpx 25rpx 34rpx;
        .alert-message {
            font-size: 34rpx;
            font-weight: bold;
            color: #000000;
            margin-top: 37rpx;
            text-align: center;
        }

        .alert-detail {
            @apply w-full box-border text-center;
            margin: 50rpx 0;
            font-size: 25rpx;
            color: #454545;
            line-height: 42rpx;
        }
    }

    .normal-btn {
        margin-top: 28rpx;
        font-size: 26rpx;
    }
</style>
