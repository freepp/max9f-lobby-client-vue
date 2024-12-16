<template>
    <view class="assistanter" :style="styles" v-if="isShow && content">

        <view class="close" @click="close">
            <image
                class="w-full"
                src="@/static/icon/close_white.png"
                mode="widthFix"
            ></image>
        </view>
        <view class="tip-box">
            <view class="tip">
                <view class="content" v-html="content"></view>
                <view class="link" v-if="linkText" @click="onLinkClick">
                    <text class="underline" v-html="linkText"></text>
                    <image
                        src="@/static/icon/arrow_right_blue.png"
                        mode="widthFix"
                    ></image>
                </view>
            </view>
            <view class="tiger1-box">
                <image
                    class="tiger1"
                    src="@/static/icon/tiger1.png"
                    v-if="!linkText"
                ></image>
            </view>
            <view class="tiger2-box">
                <image
                    v-if="linkText"
                    class="tiger2"
                    src="@/static/icon/tiger2.png"
                ></image>
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
    interface Props {
        content: string
        linkText?: string
        zIndex?: number
    }
    const props = withDefaults(defineProps<Props>(), {
        content: '',
        linkText: '',
        zIndex: 1,
    })
    const isShow = ref(false)
    const emits = defineEmits(['onClose', 'onLinkClick'])
    const close = () => {
        isShow.value = false
        emits('onClose')
    }
    const styles = computed(() => {
        return {
            zIndex: props.zIndex,
        }
    })
    const show = () => {
        isShow.value = true
    }
    defineExpose({
        close,
        show,
    })
    const onLinkClick = () => {
        isShow.value = false
        emits('onLinkClick')
    }
</script>
<style lang="scss">
    .assistanter {
        @apply fixed;
        width: 100%;
        height: 190rpx;
        bottom: 100rpx;
        left: 0;
        @media (width > 960px) {
          position: absolute;
        }
        // background: rgba(#000000, 0.7);
        .yellow {
            color: #d38502;
        }
        .close {
            @apply absolute;
            width: 50rpx;
            height: 50rpx;
            // bottom: 384rpx;
            right: 34rpx;
            top: 28rpx;
            z-index: 2;
        }
        .tip-box {
            @apply absolute box-border;
            width: 100%;
            height: 190rpx;
            // bottom: 192rpx;
            bottom: 0rpx;
            padding-top: 20rpx;
            .tip {
                @apply rounded-7 box-border relative;
                width: 703rpx;
                height: 156rpx;
                background: #ffffff;
                margin: 0 auto;
                padding: 34rpx 70rpx 34rpx 239rpx;
                font-size: 22rpx;
                color: #000000;
                line-height: 28rpx;
                box-shadow: 0px 3rpx 55rpx 0px #000000;
                .link {
                    @apply absolute;
                    height: 23rpx;
                    font-size: 22rpx;
                    color: #0054df;
                    line-height: 28rpx;
                    bottom: 17rpx;
                    right: 17rpx;
                    image {
                        display: inline-block;
                        vertical-align: middle;
                        width: 17rpx;
                        margin-left: 8rpx;
                    }
                }
            }
            .tiger1-box {
                @apply absolute h-full top-0 left-0;
                height: 176rpx;
                image {
                    width: 242rpx;
                    height: 176rpx;
                }
            }
            .tiger2-box {
                @apply absolute h-full top-0 left-0;
                height: 176rpx;
                image {
                    width: 228rpx;
                    height: 176rpx;
                }
            }
        }
    }
</style>
