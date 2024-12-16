<template>
    <view class="invite-box" @touchmove.prevent="">
        <view class="bg"></view>
        <view class="content">
            <view class="close" @click="close">
                <image
                    class="w-full"
                    src="@/static/icon/close_white.png"
                    mode="widthFix"
                ></image>
            </view>
            <view class="banner">
                <image
                    src="@/static/activity/red-package/money_100.png"
                    mode="widthFix"
                ></image>
            </view>
            <view class="content-real">
                <ProgressBar
                    class="progress-bar"
                    :price="price"
                    :total="total"
                ></ProgressBar>
                <view class="withdraw-list">
                    <swiper
                        class="w-full h-full"
                        :circular="true"
                        :indicator-dots="false"
                        :autoplay="true"
                        :interval="1900"
                        :duration="2000"
                        previous-margin="0rpx"
                        next-margin="124rpx"
                        easing-function="linear"
                        :vertical="true"
                        :disable-touch="true"
                    >
                        <swiper-item v-for="item in withdrawRecords">
                            <WithdrawItem :withdraw="item"></WithdrawItem>
                        </swiper-item>
                    </swiper>
                </view>
                <view
                    class="share-btn normal-btn bg-primary"
                    @click="invite"
                    v-html="$t('KEY_RED_INDEX_SHARE_BTN')"
                ></view>
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
    import { onMounted, ref, watch } from 'vue'
    import { i18n } from '@/common/i18nConfig'
    import { ga } from '@/common/common'
    import { useUsersStore } from '@/store/userStore'
    const store = useUsersStore()
    import ProgressBar from './ProgressBar.vue'
    import WithdrawItem from '@/lib/components/RedPackage/WithdrawItem.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as activityApi } from '@/NET/activity'
    import { ErrorHandler } from '@/common/ErrorHandler'
    const { t: $t } = i18n.global
    interface Prop {
        price: number
        total: number
    }
    const props = defineProps<Prop>()
    const emits = defineEmits(['close', 'onInviteBtnClick'])
    const close = () => {
        emits('close')
    }
    const invite = () => {
        emits('onInviteBtnClick')
    }
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
</script>
<style lang="scss">
    .invite-box {
        @apply fixed top-0 left-0 w-full h-full overflow-hidden;
        .bg {
            @apply absolute top-0 left-0 w-full h-full;
            background: rgba(0, 0, 0, 0.7);
        }
        .content {
            @apply absolute w-full;
            width: 667rpx;
            height: 924rpx;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
            background: transparent;
            .close {
                width: 55rpx;
                height: 55rpx;
                position: absolute;
                top: 0rpx;
                right: 10rpx;
                image {
                    @apply w-full h-full;
                }
            }
            .banner {
                position: relative;
                width: 644rpx;
                margin: 0 auto;
                top: 60rpx;
                z-index: 1;
            }
            .content-real {
                @apply absolute rounded-14 box-border;
                width: 667rpx;
                height: 836rpx;
                background: linear-gradient(0deg, #a24680, #4846a2);
                top: 88rpx;
                z-index: 0;
                padding-top: 207rpx;
                .progress-bar {
                    width: 598rpx;
                    margin: 18rpx auto 0;
                }
                .withdraw-list {
                    width: 586rpx;
                    height: 256rpx;
                    margin: 62rpx auto 0;
                    overflow: hidden;
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
                    font-size: 28rpx;
                    font-weight: bold;
                    color: #ffffff;
                    line-height: 85rpx;
                    text-align: center;
                    text-shadow: 2rpx 2rpx 0px rgba(0, 0, 0, 0.5);
                    margin: 48rpx auto 0;
                }
            }
        }
    }
</style>
