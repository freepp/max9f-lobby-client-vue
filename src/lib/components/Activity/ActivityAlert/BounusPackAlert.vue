<template>
    <teleport to="#mask_modal" v-if="data.mounted">
        <view class="dialog-modal">
            <MaskModal ref="RefModal" @maskClick="maskClick"></MaskModal>
            <view
                class="dialog-view"
                @click.stop="() => {}"
                v-show="data.isShow"
            >
                <view class="dialog-bg">
                    <img src="@/static/activity/bonus-bg.jpg" alt="" />
                </view>
                <view class="dialog-content">
                    <view class="title">
                        {{ $t('KEY_ACTIVITY_ALERT_TITLE') }}
                    </view>
                    <view class="content">
                        <view class="content-line1">
                            <span>{{ $t('KEY_ACTIVITY_ALERT_CONTENT1') }}</span>
                            <span class="cash">
                                {{
                                    numberWithCommas(data.activityUser?.sumPay)
                                }}
                                MXN
                            </span>
                        </view>
                        <view class="content-line2">
                            <span>{{ $t('KEY_ACTIVITY_ALERT_CONTENT2') }}</span>
                            <span class="cash">
                                {{
                                    numberWithCommas(
                                        data.activityUser?.returnRewards
                                    )
                                }}
                                MXN
                            </span>
                        </view>
                        <view class="progress-view">
                            <view
                                class="progress-content"
                                :style="`width: ${
                                    (data.activityUser.sumBet /
                                        data.activityUser.betAmount) *
                                    100
                                }%`"
                            ></view>
                        </view>
                        <view class="tips">
                            {{ $t('KEY_ACTIVITY_BOUNSPACK_TIPS') }}
                        </view>
                    </view>
                    <view
                        class="orange-btn"
                        v-if="data.activityUser.returnRewards === 0"
                        @click="() => changeIsShow(false)"
                    >
                        {{ $t('KEY_ACTIVITY_ALERT_BTNTEXT') }}
                    </view>
                    <view class="orange-btn" @click="success" v-else>
                        {{ $t('KEY_ACTIVITY_ALERT_BTNTEXT2') }}
                    </view>

                    <view class="detail-text" @click="goDetail">
                        {{ $t('KEY_ACTIVITY_ALERT_LINK') }}
                    </view>
                    <view class="activity-list">
                        <view class="activity-title">
                            {{ $t('KEY_ACTIVITY_ALERT_LISTTITLE') }}
                        </view>
                        <view class="scroll-view">
                            <view
                                class="activity-item"
                                v-for="(item, index) in data.regpayList"
                                :key="index"
                            >
                                <view class="mobile">
                                    {{
                                        item.mobile
                                            ? item.mobile
                                            : item.userName
                                    }}
                                </view>
                                <view>
                                    {{ $t('KEY_ACTIVITY_ALERT_LISTITEM') }}
                                </view>
                                <view class="cash">
                                    R$
                                    {{ item.rewardMoney }}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="close-icon">
                    <img
                        @click="() => changeIsShow(false)"
                        src="@/static/icon/close.png"
                        alt=""
                    />
                </view>
            </view>
        </view>
        <SuccessAlert
            ref="RefSuccessAlert"
            :successBtnText="$t('KEY_COMMON_OK')"
            :alert-data="data.activityUser"
            @onSuccess="DialogSuccess"
        />
    </teleport>
</template>

<script lang="ts" setup>
    import { reactive, ref, onMounted, watch } from 'vue'
    import MaskModal from '@/lib/components/MaskModal/index.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { i18n } from '@/common/i18nConfig'
    import { numberWithCommas } from '@/common/common'
    import SuccessAlert from '../common/SuccessAlert.vue'
    import { useUsersStore } from '@/store/userStore'
    import { ga } from '@/common/common'
    const store = useUsersStore()
    const { t: $t } = i18n.global

    interface Props {
        successBtnText: string
    }

    const props = withDefaults(defineProps<Props>(), {
        successBtnText: 'Yes',
    })

    interface Data {
        isShow: Boolean
        mounted: boolean
        regpayList: any
        activityUser: any
    }
    const data = reactive<Data>({
        isShow: false,
        mounted: false,
        regpayList: [],
        activityUser: {},
    })
    const emit = defineEmits(['onSuccess', 'onFaild', 'onClose'])
    const RefModal = ref()
    const RefSuccessAlert = ref()

    const maskClick = () => {
        changeIsShow(false)
    }

    const changeIsShow = (isShow) => {
        RefModal.value.changeModal(isShow)
        data.isShow = isShow
        if (!isShow) {
            emit('onClose')
            if (store.userInfo?.userMode === 2) {
                // localStorage.setItem('activeModalFirstShow', '1')
            }
        } else {
            
            initData()
        }
    }

    const success = () => {
        emit('onSuccess')
        regpayBonus()
    }

    const faild = () => {
        emit('onFaild')
        changeIsShow(false)
    }

    const goDetail = () => {
        uni.navigateTo({
            url: '/pages/activity_detail/index?activity_id=3',
        })
    }

    const regpayDetails = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.activitys.regpayDetails(params)
        if (res.success) {
            data.regpayList = res.result
        } else {
            ErrorHandler(res, 'regpayDetails')
        }
    }

    const regpayUser = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.activitys.regpayUser(params)
        if (res.success) {
            // data.regpayList = res.result
            data.activityUser = res.result
        } else {
            ErrorHandler(res, 'regpayUser')
        }
    }

    const regpayBonus = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.activitys.regpayBonus(params)

        if (res.success) {
            // data.regpayList = res.result
            openDialog()
        } else {
            ErrorHandler(res, 'regpayBonus')
        }
    }

    const openDialog = () => {
        RefSuccessAlert.value.changeIsShow(true)
    }

    const DialogSuccess = async () => {
        regpayUser()
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    const initData = () => {
        if (store.userInfo && store.userInfo?.userMode === 2) {
            regpayUser()
            regpayDetails()
        }
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
        z-index: 1003;
    }
    .dialog-view {
        @apply absolute box-border overflow-hidden;
        z-index: 1004;
        background: #fff;
        border-radius: 14rpx;
        width: 667rpx;
        height: 836rpx;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #454545;
    }
    .dialog-bg {
        @apply w-full h-full;
        img {
            @apply w-full h-full;
        }
    }
    .dialog-content {
        @apply absolute top-0 left-0 w-full h-full;

        .title {
            @apply flex justify-center items-center;
            width: 580rpx;
            height: 100rpx;
            margin: 90rpx auto 0;
            font-size: 30rpx;
            font-weight: bold;
            color: #4e3a00;
        }

        .content {
            @apply overflow-hidden;
            width: 556rpx;
            height: 220rpx;
            margin: 0 auto;
            .content-line1 {
                @apply w-full overflow-hidden text-center;
                white-space: nowrap;
                font-size: 42rpx;
                font-weight: bold;
                color: #147464;
                margin-top: 14rpx;
                .cash {
                    color: #ffffff;
                    margin-left: 8rpx;
                }
            }
            .content-line2 {
                @apply w-full overflow-hidden text-center;
                white-space: nowrap;
                font-size: 32rpx;
                font-weight: bold;
                color: #147464;
                margin-top: 16rpx;
                .cash {
                    color: #ffffff;
                    margin-left: 8rpx;
                }
            }
            .progress-view {
                width: 530rpx;
                height: 30rpx;
                background: #895907;
                // box-shadow: 0px 1px 0px 0px #fac11f,
                //     0px 5px 9px 0px rgba(0, 0, 0, 0.58);
                border-radius: 14rpx;
                margin: 10rpx auto 0;
                overflow: hidden;
                .progress-content {
                    width: 0%;
                    height: 30rpx;
                    background: linear-gradient(
                        0deg,
                        #06747e,
                        #0792e2,
                        #08e1e9
                    );
                }
            }
            .tips {
                font-size: 24rpx;
                color: #ffffff;
                text-shadow: 0px 3rpx 0px #000000;
                text-align: center;
                margin-top: 4rpx;
            }
        }

        .orange-btn {
            @apply flex justify-center items-center;
            width: 577rpx;
            height: 90rpx;
            margin: 35rpx auto 0;
            border-radius: 14rpx;
            font-size: 34rpx;
            background: #ff6c22;
            color: #ffffff;
            font-weight: bold;
            &:active {
                transform: scale(0.96);
            }
        }

        .detail-text {
            font-size: 28rpx;
            font-weight: 400;
            text-decoration: underline;
            color: #fff;
            text-shadow: 0rpx 3rpx 3rpx rgba(0, 55, 29, 0.88);
            margin: 30rpx auto 0;
            text-align: center;
        }

        .activity-list {
            @apply box-border overflow-hidden relative;
            width: 580rpx;
            height: 183rpx;
            margin: 20rpx auto 0;
            background: rgba(0, 0, 0, 0.8);
            box-shadow: 0px 1rpx 0px 0px #13cf8c,
                0px 9rpx 20rpx 0rpx rgba(0, 0, 0, 0.79);
            border-radius: 14rpx;

            .activity-title {
                font-size: 21rpx;
                font-weight: 400;
                color: #54e5b0;
                text-align: center;
                margin-top: 12rpx;
            }

            .scroll-view {
                @apply absolute bottom-0 left-0 right-0 overflow-y-auto;
                top: 50rpx;
                padding: 0 20rpx;
            }

            .activity-item {
                @apply flex items-center justify-between;
                font-size: 28rpx;
                color: #ffffff;
                margin-bottom: 10rpx;
                .mobile {
                    width: 180rpx;
                }
                .cash {
                    width: 160rpx;
                    text-align: right;
                }
            }
        }
    }
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
</style>
