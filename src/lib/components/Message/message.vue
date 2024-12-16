<template>
    <view
        v-show="visible"
        ref="messageRef"
        @transitionend="transitionEnd"
        class="flex items-center absolute transition opacity-0 top-0 bg-white border-box message-view"
        :class="customClass"
        :style="customStyle"
        :id="props.id"
        @click="handleClick"
    >
        <view class="icon">
            <image src="@/static/icon/message_gift.png" mode="widthFix"></image>
            <!-- <image
                v-if="props.type === 'success'"
                src="@/static/icon/emai.png"
            ></image>
            <image
                v-if="props.type === 'warning'"
                src="@/static/icon/warning.png"
            ></image> -->
        </view>
        <view class="content" v-html="message"></view>
    </view>
</template>
<script lang="ts" setup>
    import { CSSProperties, onMounted, ref, watch } from 'vue'
    import { instances } from './index'
    import type { MessageType } from './index'
    import { increaseIndex } from '@/common/zindex'
    const clientWidth = document.body.clientWidth
    const rpxRadio = clientWidth / 750
    const messageHeightPx = 111 * rpxRadio
    interface Props {
        // id 组件内部使用属性 系统管理 不用传递该参数
        id?: string
        // 通知的内容
        message: string
        // 通知滞留时间 默认:3000毫秒
        duration: number
        // 通知类型 默认:success
        type: MessageType
    }
    // 定义Props
    const props = withDefaults(defineProps<Props>(), {
        id: '',
        message: '',
        type: 'success',
        duration: 3000,
    })
    //
    // 是否可见
    const visible = ref<boolean>(false)
    // 原生dom
    const messageRef = ref(null)
    // 自定义样式类
    const customClass = ref<string>('')
    // 每个message间距
    const spacePx: number = 10
    // 获取最后一个Message的bottom位置
    const getLastOffset = (id: string): number => {
        const index = instances.findIndex((item) => item.id === id)
        if (index !== -1) {
            return index * (messageHeightPx + spacePx)
        } else {
            return 0
        }
    }
    const handleClick = () => {
        const pages = getCurrentPages()
        const len = pages.length
        const lastPage = pages?.[len - 1]
        if (lastPage && lastPage.route !== 'pages/fund_details/index') {
            uni.navigateTo({
                url: '/pages/fund_details/index?page_type=1',
            })
        }
    }
    // 系统顶部高度
    const systemTop: number = 60
    // 动态获取高度
    const customStyle = ref<CSSProperties>({
        top: getLastOffset(props.id) + systemTop + 'px',
        zIndex: increaseIndex(),
    })
    // 缓冲区有变化后 重新计算高度
    watch(
        () => instances,
        () => {
            customStyle.value.top = getLastOffset(props.id) + systemTop + 'px'
        },
        { deep: true }
    )
    // 隐藏动画是否触发
    let isHideTransitionTrigger: boolean = false
    // Message 已经在onMounted正常显示了
    let isShowed = false
    const hideMessage = () => {
        const index = instances.findIndex((item) => item.id === props.id)
        if (index !== -1) {
            instances.splice(index, 1)
        }
        isHideTransitionTrigger = true
        customClass.value = ''
    }
    // 根据duration 倒数计时 先透明0 在隐藏 最后删除
    const startTimer = () => {
        if (props.duration > 0) {
            setTimeout(() => {
                hideMessage()
                // messageRef.value.$el.addEventListener('transitionend', () => {
                //     console.log('end')
                // }, false)
            }, props.duration)
        }
    }
    const transitionEnd = (e) => {
        // 过度效果结束后
        if (isHideTransitionTrigger) {
            visible.value = false
            messageRef.value.$el?.parentNode?.removeChild(messageRef.value.$el)
        }
    }
    // 关闭事件缓冲区
    // 目的是message的显示是需要时间的 如果还没显示完成就调用close方法 则message则不会展示
    let closeFlushFn = null
    const close = () => {
        // message正常展示后, 在隐藏
        if (isShowed) {
            hideMessage()
            // message没完成展示前, 将隐藏操作放入缓冲
        } else {
            closeFlushFn = hideMessage
        }
    }
    defineExpose({
        close,
    })
    onMounted(() => {
        // Mounted之后再显示
        visible.value = true
        startTimer()
        setTimeout(() => {
            // 显示之后再显示过度动画
            customClass.value = 'message-view-transition'
            isShowed = true
            setTimeout(() => {
                // 有关闭事件的缓冲
                closeFlushFn && closeFlushFn()
            }, 400)
        }, 10)
    })
</script>
<style lang="scss">
    .transition {
        @apply transition-all duration-300;
    }
    .message-view {
        @apply text-black box-border;
        width: 672rpx;
        left: 39rpx;
        height: 111rpx;
        box-shadow: 0px 9rpx 20rpx 0rpx rgba(0, 0, 0, 0.35);
        border-radius: 14rpx;
        padding: 26rpx 81rpx 25rpx 42rpx;
        transform: translate3d(0rpx, -45%, 0);
        .icon {
            width: 61rpx;
            image {
                @apply w-full;
            }
        }
        .content {
            @apply break-all text-black;
            flex: 1;
            margin-left: 40rpx;
            font-size: 25rpx;
            line-height: 33rpx;
        }
    }
    .message-view-transition {
        opacity: 1;
        transform: translate3d(0rpx, 0rpx, 0);
    }
</style>
