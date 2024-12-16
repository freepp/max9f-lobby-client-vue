<template>
    <view class="red-package" v-if="isShowProgress || isShowTable || isShowWin">
        <Turntable
            v-show="isShowTable"
            @on-success="sus"
            :fetch="getNumber"
            :isFirst="true"
            v-model="value"
        ></Turntable>
        <view v-show="isShowTable" class="table-close" @click="closeTable">
            <image src="@/static/icon/close.png" mode="widthFix" />
        </view>
        <view class="red-package-content" v-show="isShowProgress">
            <view class="header">
                <view class="close" @click="close">
                    <image src="@/static/icon/close.png" mode="widthFix" />
                </view>
            </view>
            <view class="red-package-box">
                <view class="badge">
                    <image
                        v-if="badge === 1"
                        :src="
                            '/static/activity/red-package/badge/zuijia_' +
                            store.commonParams.langId +
                            '.png'
                        "
                    ></image>
                    <image
                        v-if="badge === 2"
                        :src="
                            '/static/activity/red-package/badge/zhixing_' +
                            store.commonParams.langId +
                            '.png'
                        "
                    ></image>
                    <image
                        v-if="badge === 3"
                        :src="
                            '/static/activity/red-package/badge/zhiwang_' +
                            store.commonParams.langId +
                            '.png'
                        "
                    ></image>
                    <image
                        v-if="badge === 4"
                        :src="
                            '/static/activity/red-package/badge/yingjia_' +
                            store.commonParams.langId +
                            '.png'
                        "
                    ></image>
                </view>
                <view
                    class="title"
                    v-html="
                        $t('KEY_RED_WITHDRAW_TITLE').replace(
                            '#USERNAME#',
                            `<span style='color:#ffd800'>${
                                store.userInfo.mobile
                                    ? store.userInfo.mobile
                                    : store.userInfo.username
                            }</span>`
                        )
                    "
                ></view>
                <view class="price">R$ {{ numberWithCommas(price) }}</view>
                <ProgressBar :price="price" :total="total"></ProgressBar>
                <view
                    class="share-btn bg-primary normal-btn"
                    @click="toPackagePage"
                >
                    {{ $t('KEY_RED_WITHDRAW_MORE') }}
                </view>
            </view>
            <view class="line"></view>
            <view class="broadcast-box">
                <view class="broadcast-title">
                    <image
                        src="@/static/activity/red-package/logo_pix.png"
                        mode="widthFix"
                    ></image>
                    {{ $t('KEY_RED_INDEX_PIX') }}
                </view>
                <view class="broadcast-list">
                    <swiper
                        class="w-full h-full"
                        :circular="true"
                        :indicator-dots="false"
                        :autoplay="true"
                        :interval="1900"
                        :duration="2000"
                        previous-margin="12rpx"
                        next-margin="164rpx"
                        easing-function="linear"
                        :vertical="true"
                        :disable-touch="true"
                    >
                        <swiper-item v-for="item in withdrawRecords">
                            <view
                                class="swiper-item"
                                v-html="
                                    $t('KEY_RED_WITHDRAW_GET')
                                        ?.replace('#USERNAME#', item.userName)
                                        .replace('#BONUS#', item.amount)
                                "
                            ></view>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </view>

        <win-box
            :is-gold="true"
            :price="price"
            v-if="isShowWin"
            @on-btn-click="onBtnClick"
        ></win-box>
    </view>
</template>
<script lang="ts" setup>
    import Spine from '@/lib/components/Spine/Spine.vue'
    import { reactive, computed, onMounted, watch, ref } from 'vue'
    import { useUsersStore } from '@/store/userStore'
    import { getLogoUrl, numberWithCommas } from '@/common/common'
    import Turntable from './turntable.vue'
    import WinBox from './win_box.vue'
    import ProgressBar from './ProgressBar.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as activityApi } from '@/NET/activity'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { i18n } from '@/common/i18nConfig'
    const { t: $t } = i18n.global
    const store = useUsersStore()
    // 显示赢奖弹窗
    const isShowWin = ref(false)
    // 显示转盘
    const isShowTable = ref(false)
    // 显示进度弹窗
    const isShowProgress = ref(false)
    interface Prop {
        total: number
        price: number
        modelValue: number
    }
    const badge = ref(0)
    const props = defineProps<Prop>()
    const price = ref(0)
    const emits = defineEmits(['close', 'update:modelValue', 'closeTable'])
    const close = () => {
        emits('close')
    }
    watch(
        () => props.price,
        () => {
            price.value = props.price
        }
    )
    const withdrawRecords = ref([])
    const getWithdrawRecord = async () => {
        let params = Object.assign(
            {},
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        // const res = await lobbyApi.redpack.redpackRecord(params)
        const res = await activityApi.redpack.redpackRedpackRecordCreate(params)
        if (res.success) {
            withdrawRecords.value = res.result
        } else {
            ErrorHandler(res, 'getWithdrawRecord')
        }
    }
    const getNumber = async (): Promise<number> => {
        let params = Object.assign(
            {},
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        const res = await activityApi.redpack.redpackRaffleCreate(params);
        if (res.success) {
            badge.value = res.result.packFlag
            return res.result.prizeAmount
            // drawableAmount.value = 1
        } else {
            ErrorHandler(res, 'getNumber')
        }
    }
    const value = computed<number>({
        set(val) {
            emits('update:modelValue', val)
        },
        get() {
            return props.modelValue
        },
    })
    const toPackagePage = () => {
        isShowTable.value = false
        isShowProgress.value = false
        uni.navigateTo({
            url: '/pages/red_package/index',
        })
    }
    const showModal = () => {
        isShowProgress.value = true
    }
    const showTable = () => {
        isShowTable.value = true
    }
    const closeTable = () => {
        isShowTable.value = false
        emits('closeTable')
    }
    const closeModal = () => {
        isShowProgress.value = false
    }
    const initData = async () => {
        if (store.userInfo?.userId) {
            await getWithdrawRecord()
        }
    }
    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )
    onMounted(() => {
        initData()
    })
    defineExpose({
        showTable,
        showModal,
        closeTable,
        closeModal,
    })
    const sus = (val) => {
        if (val > 0) {
            price.value = val
            isShowWin.value = true
            isShowTable.value = false
        }
    }
    const onBtnClick = () => {
        isShowWin.value = false
        isShowProgress.value = true
    }
</script>
<style lang="scss">
    .yellow {
        color: #ffd800;
    }

    .red-package {
        @apply w-full;
        position: absolute;
        height: calc(100% + 100rpx);
        top: 0px;
        left: 0px;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 2080;
        .table-close {
            @apply absolute;
            width: 55rpx;
            height: 55rpx;
            right: 50rpx;
            top: 50%;
            transform: translate3d(0, -300rpx, 0);
            image {
                @apply w-full h-full;
            }
        }
        .red-package-content {
            @apply rounded-14 absolute;
            top: 50%;
            left: 50%;
            width: 667rpx;
            height: 836rpx;
            background: linear-gradient(0deg, #a24680, #4846a2);
            transform: translate3d(-50%, -50%, 0);
            .header {
                @apply relative;
                height: 71rpx;
                .close {
                    width: 55rpx;
                    height: 55rpx;
                    position: absolute;
                    top: 15rpx;
                    right: 15rpx;
                    image {
                        @apply w-full h-full;
                    }
                }
            }
            .red-package-box {
                @apply box-border;
                padding: 0 35rpx;
                border-bottom: 4rpx solid
                    linear-gradient(0deg, #d40e29, #f82e49, #ff3a54);
                .badge {
                    @apply absolute;
                    width: 126rpx;
                    height: 119rpx;
                    left: -32rpx;
                    top: 46rpx;
                    image {
                        @apply w-full h-full;
                    }
                }
                .title {
                    font-size: 22rpx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #ffffff;
                    line-height: 24rpx;
                    text-align: center;
                }
                .price {
                    height: 83rpx;
                    font-size: 83rpx;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: #ffd800;
                    line-height: 85rpx;
                    text-shadow: 2px 3px 3px rgba(1, 0, 26, 0.35);
                    text-align: center;
                    margin-top: 19rpx;
                }

                .share-btn {
                    width: 597rpx;
                    height: 90rpx;
                    line-height: 90rpx;
                    background: linear-gradient(
                        0deg,
                        #d40e29,
                        #f82e49,
                        #ff3a54
                    );
                    box-shadow: 2rpx 2rpx 11rpx 0px rgba(0, 0, 0, 0.5);
                    border-radius: 14rpx;
                    font-size: 33rpx;
                    font-weight: bold;
                    color: #ffffff;
                    line-height: 85rpx;
                    text-align: center;
                    text-shadow: 2rpx 2rpx 0px rgba(0, 0, 0, 0.5);
                    margin-top: 48rpx;
                }
            }
            .line {
                margin-top: 38rpx;
                height: 4rpx;
                background: linear-gradient(0deg, #a24680, #4846a2);
                border-radius: 1px;
            }
            .broadcast-box {
                .broadcast-title {
                    @apply w-full text-center inline-flex justify-center items-center;
                    font-size: 27rpx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #9c9b9b;
                    line-height: 90rpx;
                    image {
                        width: 121rpx;
                        vertical-align: middle;
                        margin-right: 24rpx;
                        height: 40rpx;
                    }
                }
                .broadcast-list {
                    @apply rounded-14;
                    width: 625rpx;
                    height: 233rpx;
                    background: rgba(0, 0, 0, 0.2);
                    margin: 0 auto;
                    .swiper-item {
                        @apply box-border;
                        padding: 0 44rpx;
                        height: 31rpx;
                        font-size: 28rpx;
                        font-weight: 400;
                        color: #ffffff;
                        line-height: 31rpx;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
    }
</style>
