<template>
    <view
        v-show="isShow"
        ref="modalRef"
        :style="dialogStyle"
        class="dialog-modal"
    >
        <view
            :class="{ active: isOpenCountDown }"
            :style="contentStyle"
            class="dialog-view"
            @click.stop="() => {}"
        >
            <view class="dialog-content">
                <view class="close-icon" @click.stop="fail">
                    <img alt="" src="@/static/icon/close.png" />
                </view>
                <view class="alert-detail" v-html="content" @click="success"></view>
                <view :class="{ active: isOpenCountDown }" class="btn-view">
                    <view
                        v-if="showConfirm"
                        class="primary-btn"
                        @click="success"
                        v-html="confirmText"
                    ></view>
                    <view
                        v-if="showCancel"
                        class="primary-btn border-btn"
                        @click.stop="fail"
                        v-html="cancelText"
                    ></view>
                </view>
                <view v-if="isOpenCountDown" class="count-down">
                    <view class="count-unit">
                        <view class="units unit-min">MIN</view>
                        <view class="time-split"></view>
                        <view class="units unit-sec">SEC</view>
                    </view>
                    <view class="count-down-time">
                        <view class="count-time">
                            <img
                                :src="`/static/count-down/shuzi_1_${times.m1}.png`"
                                alt=""
                                class="count-down-img"
                            />
                            <img
                                :src="`/static/count-down/shuzi_1_${times.m2}.png`"
                                alt=""
                                class="count-down-img"
                            />
                        </view>
                        <view class="time-split">
                            <view class="split"></view>
                            <view class="split"></view>
                        </view>
                        <view class="count-time">
                            <img
                                :src="`/static/count-down/shuzi_1_${times.s1}.png`"
                                alt=""
                                class="count-down-img"
                            />
                            <img
                                :src="`/static/count-down/shuzi_1_${times.s2}.png`"
                                alt=""
                                class="count-down-img"
                            />
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { increaseIndex } from '@/common/zindex'
    import { ModalType } from './index'
    import moment from 'moment'

    interface ModalProps {
        width?: number | string
        height?: number | string
        type?: ModalType
        title?: string
        content?: string
        cancelText?: string
        confirmText?: string
        showCancel?: boolean
        showConfirm?: boolean
        onConfirm?: Function
        onCancel?: Function
        onClose?: Function
        hasPay: boolean
        countDown: number

        [key: string]: any
    }
    const props = withDefaults(defineProps<ModalProps>(), {
        width: 698,
        height: 400,
        type: 'success',
        title: '',
        content: '',
        cancelText: '',
        confirmText: '',
        showCancel: true,
        showConfirm: true,
        success: null,
        fail: null,
        hasPay: false,
        countDown: 0,
    })
    const curCountDownTims = ref(0)
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
    const zIndex = ref(increaseIndex())
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
    const closeCountDown = computed(() => {
        return times.m1 > -1 || times.m2 > -1 || times.s1 > -1 || times.s2 > -1
    })

    const isOpenCountDown = computed(() => {
        return (
            props.hasPay &&
            closeCountDown.value &&
            imgLoad.value &&
            props.countDown > 0
        )
    })

    const countDownTimer = ref(null)
    const imgLoad = ref(false)
    const open = () => {
        if (props.hasPay && !countDownTimer.value) {
            setCountDown()
            curCountDownTims.value = props.countDown - 1
            setTimes()
        }
        zIndex.value = increaseIndex()
        isShow.value = true
        nextTick(() => {
            if (
                modalRef.value.$el.querySelectorAll('#onload') &&
                modalRef.value.$el.querySelectorAll('#onload')[0]
            ) {
                modalRef.value.$el
                    .querySelectorAll('#onload')[0]
                    .addEventListener('load', () => {
                        imgLoad.value = true
                    })
            }
        })
    }
    const modalRef = ref()
    const close = () => {
        props.onClose && props.onClose()
        nextTick(() => {
            modalRef.value.$el?.parentNode?.removeChild(modalRef.value.$el)
        })
        isShow.value = false
        clearCountDown()
    }
    const success = () => {
        props.onConfirm && props.onConfirm()
        close()
    }

    const fail = () => {
        props.onCancel && props.onCancel()
        close()
    }
    const times = reactive({
        m1: 0,
        m2: 0,
        s1: 0,
        s2: 0,
    })
    const setCountDown = () => {
        countDownTimer.value = setInterval(() => {
            if (curCountDownTims.value < 0) {
                setTimes()
                clearCountDown()
            } else {
                setTimes()
                curCountDownTims.value = curCountDownTims.value - 1
            }
        }, 1000)
    }
    const setTimes = () => {
        const curTime = moment.utc(
            moment.duration(curCountDownTims.value, 'seconds').asMilliseconds()
        )
        times.m1 = Number(curTime.format('mm').split('')[0])
        times.m2 = Number(curTime.format('mm').split('')[1])
        times.s1 = Number(curTime.format('ss').split('')[0])
        times.s2 = Number(curTime.format('ss').split('')[1])
    }
    const clearCountDown = () => {
        clearInterval(countDownTimer.value)
        countDownTimer.value = null
        times.m1 = -1
        times.m2 = -1
        times.s1 = -1
        times.s2 = -1
    }

    defineExpose({
        open,
        close,
    })
</script>

<style lang="scss" scoped>
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
        color: #454545;
        overflow: hidden;
        &.active {
            background-color: rgba(255, 255, 255, 0);
        }
    }
    .dialog-content {
        @apply flex flex-col items-center;
        .close-icon {
            @apply absolute;
            right: 30rpx;
            top: 30rpx;
            width: 40rpx;
            height: 40rpx;
            img {
                @apply w-full h-full;
            }
        }
        .alert-type-img {
            width: 85rpx;
            image {
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
            font-size: 25rpx;
            color: #454545;
            line-height: 42rpx;
            img {
                width: 100%;
            }
        }
    }

    .btn-view {
        @apply absolute bottom-0 left-0 w-full;
        padding-bottom: 42rpx;
        &.active {
            padding-bottom: 182rpx;
        }

        .primary-btn {
            width: auto;
            margin: 0 40rpx;
            background: linear-gradient(0deg, #d40e29, #f82e49, #ff3a54);
            color: #ffffff;
        }

        .green-btn {
            @apply flex justify-center items-center absolute;
            width: 597rpx;
            bottom: 38rpx;
            left: 35rpx;
            height: 90rpx;
            border-radius: 14rpx;
            font-size: 34rpx;
            background: linear-gradient(0deg, #00a235, #63e58e);
            color: #ffffff;
            font-weight: bold;
            &:active {
                transform: scale(0.96);
            }
        }

        .border-btn {
            margin-top: 28rpx;
            font-size: 26rpx;
        }
    }
    .count-down {
        background: rgba(255, 255, 255, 0);
        width: 100%;
        height: 140rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-top: 10rpx;
        .count-unit {
            display: flex;
            align-items: center;
            justify-content: center;
            .units {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 156rpx;
                color: #ffffff;
            }
            .time-split {
                width: 65rpx;
            }
        }
        .count-down-time {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 120rpx;
            .count-time {
                width: 156rpx;
                height: 98rpx;
                background: #e5243e;
                border-radius: 8rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                .count-down-img {
                    // width: 51rpx;
                    // height: 71rpx;
                    width: 53rpx;
                    height: 69rpx;
                }
            }
            .time-split {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                width: 65rpx;
                height: 98rpx;
                .split {
                    width: 18rpx;
                    height: 18rpx;
                    background: #ffffff;
                    border-radius: 4rpx;
                    &:first-child {
                        margin-bottom: 13rpx;
                    }
                    &:last-child {
                        margin-top: 13rpx;
                    }
                }
            }
        }
    }
</style>
