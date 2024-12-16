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
                        <img
                            v-if="alertType === 1"
                            src="@/static/activity/popup-success.png"
                            alt=""
                        />
                        <img
                            v-if="alertType === 2"
                            src="@/static/activity/popup-failed.png"
                            alt=""
                        />
                    </view>
                    <view class="alert-title" v-if="alertConfig.title">
                        {{ alertConfig.title }}
                    </view>
                    <view class="alert-message" v-if="alertConfig.content">
                        {{ alertConfig.content }}
                    </view>
                    <!-- <view class="primary-btn" @click="success">
                        {{ alertConfig.btnText }}
                    </view> -->
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
        alertType: number
        alertConfig: any
    }

    const props = withDefaults(defineProps<Props>(), {
        alertType: 1,
        alertConfig: {
            title: '',
            content: '',
            btnText: 'OK',
        },
    })

    interface Data {
        isShow: Boolean
        mounted: boolean
    }
    const data = reactive<Data>({
        isShow: false,
        mounted: false,
    })
    const emit = defineEmits(['onSuccess', 'onFaild'])
    const RefModal = ref()

    const maskClick = () => {
        emit('onSuccess')
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
        z-index: 1000;
    }
    .dialog-view {
        @apply absolute box-border;
        z-index: 1001;
        border-radius: 14rpx;
        width: 669rpx;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #454545;
    }
    .dialog-content {
        @apply flex flex-col items-center;
        .alert-type-img {
            @apply w-full;
            img {
                @apply w-full;
            }
        }
        .alert-title {
            @apply absolute;
            top: 210rpx;
            left: 50%;
            transform: translate(-50%, 0);
            font-size: 36rpx;
            font-weight: bold;
            color: #fbdc32;
            text-shadow: 0px 1px 0px #ffd909,
                0px 10px 10px rgba(51, 4, 82, 0.39);
            white-space: nowrap;
        }
        .failed-color {
            color: #72d8d2;
            text-shadow: 0px 1px 0px #72d8d2,
                0px 10px 10px rgba(51, 4, 82, 0.39);
        }
        .alert-message {
            @apply absolute;
            top: 306rpx;
            left: 50%;
            transform: translate(-50%, 0);
            font-size: 40rpx;
            font-weight: bold;
            color: #fff;
            white-space: nowrap;
        }
    }

    .primary-btn {
        margin-top: 38rpx;
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
