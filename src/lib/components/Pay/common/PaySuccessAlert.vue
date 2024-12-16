<template>
    <!-- 已遗弃, 推荐使用modal -->
    <teleport to="#mask_modal">
        <view class="dialog-modal">
            <MaskModal ref="RefModal" @maskClick="maskClick"></MaskModal>
            <view
                class="dialog-view"
                @click.stop="() => {}"
                v-show="data.isShow"
            >
                <view class="dialog-content" v-if="alertData.orderId">
                    <view class="alert-type-img">
                        <img src="@/static/icon/success.png" alt="" />
                    </view>
                    <view class="alert-message" v-if="pageType === 'deposit'">
                        {{ $t('KEY_PAY_SUCCESSDEPOSIT') }}
                    </view>
                    <view class="alert-message" v-else>
                        {{ $t('KEY_PAY_SUCCESSWITHDRAW') }}
                    </view>
                    <view class="alert-detail">
                        <view class="detail-line">
                            <view class="title">
                                {{ $t('KEY_PAY_CHANNEL') }}
                            </view>
                            <view class="detail">
                                {{ alertData.channelName }}
                            </view>
                        </view>
                        <view class="detail-line">
                            <view class="title">
                                {{ $t('KEY_PAY_REFERENCIA') }}
                            </view>
                            <view class="detail">{{ alertData.orderId }}</view>
                        </view>
                        <view class="detail-line">
                            <view class="title">{{ $t('KEY_PAY_TOTAL') }}</view>
                            <view class="detail">{{ alertData.amount }}</view>
                        </view>
                        <!-- <view class="flex justify-between items-center">
                            <view class="title">{{ $t('KEY_PAY_DEDUCTION') }}</view>
                            <view class="detail">10</view>
                        </view> -->
                        <view class="detail-line">
                            <view class="title">{{ $t('KEY_PAY_TIME') }}</view>
                            <view class="detail">
                                {{
                                    format(
                                        new Date(alertData.recDate),
                                        'yyyy-MM-dd HH:mm'
                                    )
                                }}
                            </view>
                        </view>
                    </view>
                    <view class="primary-btn" @click="success">
                        {{ $t('KEY_PAY_REDEPOSIT') }}
                    </view>
                    <view class="primary-btn border-btn" @click="faild">
                        {{ $t('KEY_COMMON_OK') }}
                    </view>
                </view>
            </view>
        </view>
    </teleport>
</template>

<script lang="ts" setup>
    // <!-- 已遗弃, 推荐使用modal -->
    import { reactive, ref, onMounted } from 'vue'
    import MaskModal from '@/lib/components/MaskModal/index.vue'
    import { format } from 'date-fns'
    import { i18n } from '@/common/i18nConfig'
    const { t: $t } = i18n.global

    interface Props {
        pageType?: string
        successBtnText?: string
        alertData?: any
    }

    const props = withDefaults(defineProps<Props>(), {
        pageType: 'withdraw',
        successBtnText: 'Yes',
        alertData: {},
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
        padding: 34rpx 25rpx;
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
            text-align: center;
        }

        .alert-detail {
            @apply w-full box-border;
            padding: 0 25rpx;
            margin: 50rpx 0;
            font-size: 25rpx;
            color: #454545;
            line-height: 42rpx;
            .detail-line {
                @apply flex justify-between items-center;
                margin-bottom: 10rpx;
            }
            .title {
            }
            .detail {
                text-align: right;
                word-break: break-all;
                padding-left: 28rpx;
            }
        }
    }

    .border-btn {
        margin-top: 28rpx;
    }
</style>
