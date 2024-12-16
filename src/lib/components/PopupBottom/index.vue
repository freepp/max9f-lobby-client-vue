<template>
    <teleport to="#mask_modal" v-if="data.nextTickOver && data.mounted">
        <view class="popbuttom-modal">
            <MaskModal
                :hasShadow="hasShadow"
                ref="RefModal"
                @maskClick="maskClick"
            ></MaskModal>
            <SlideBottomTransition>
                <view
                    class="popbuttom-view"
                    :style="`height: ${height}rpx; bottom: ${bottom || isTabPage}px; background-color: ${background};`"
                    :class="{ 'no-border': noBorder }"
                    v-show="data.isShow"
                >
                    <view v-if="showClose" class="close-icon" @click="maskClick">
                        <img src="@/static/icon/close_white.png" alt="" />
                    </view>
                    <view class="scroll-view">
                        <slot></slot>
                    </view>
                </view>
            </SlideBottomTransition>
        </view>
    </teleport>
</template>

<script lang="ts" setup>
    import MaskModal from '@/lib/components/MaskModal/index.vue'
    import SlideBottomTransition from '@/lib/components/Transition/SlideBottomTransition.vue'
    interface Props {
        hasShadow?: boolean
        height?: number
        bottom?: number
        background?: string
        noBorder?: boolean
        zIndex?: number
        showClose?: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
        hasShadow: true,
        height: 1000,
        bottom: 0,
        background: '#e8e8e8',
        noBorder: false,
        zIndex: 2035,
        showClose: true
    })

    const zIndexScss = ref(props.zIndex)

    interface Data {
        isShow: boolean
        nextTickOver: boolean
        mounted: boolean
    }
    const data = reactive<Data>({
        isShow: false,
        nextTickOver: false,
        mounted: false,
    })
    const RefModal = ref()

    const isTabPage = computed(() => {
        let localPath = getCurrentPages()
        let localRoute = localPath[localPath.length - 1].route
        let list = [
            'pages/index/index',
            'pages/deposit/index',
            'pages/promotions/index',
            'pages/withdraw/index',
            'pages/profile/index',
            'pages/agent/index',
        ]
        if (list.find((item) => item === localRoute)) {
            return -50
        } else {
            return 0
        }
    })

    nextTick(() => {
        data.nextTickOver = true
    })

    const emit = defineEmits(['maskClick'])

    const maskClick = () => {
        changeIsShow(false)
        emit('maskClick')
    }

    const changeIsShow = (isShow) => {
        RefModal.value.changeModal(isShow)
        data.isShow = isShow
    }

    onMounted(() => {
        data.mounted = true

        // const iframe = document.getElementsByTagName('iframe')[0]
        // if (iframe) {
        //     iframe.style.pointerEvents = 'auto'
        // }
    })

    defineExpose({
        changeIsShow,
    })
</script>

<style lang="scss">
    .popbuttom-modal {
    }
    .modal-view {
        @apply absolute left-0 right-0 bottom-0 top-0;
        z-index: v-bind(zIndexScss);
    }
    .popbuttom-view {
        @apply absolute left-0 right-0 bg-black-90;
        z-index: v-bind(zIndexScss);
        bottom: -50px;
        height: 1000rpx;
        border-radius: 14rpx 14rpx 0 0;
    }
    .no-border {
        border-radius: 0;
    }
    .close-icon {
        @apply absolute z-30;
        width: 40rpx;
        height: 40rpx;
        top: 26rpx;
        right: 26rpx;
        img {
            @apply w-full;
        }
    }

    .scroll-view {
        @apply absolute left-0 right-0 bottom-0 top-0 overflow-y-auto;
    }
</style>
