<template>
    <view class="banner" @click="goBannerLink">
        <image
            v-if="props.data?.imgURL"
            class="w-full"
            :src="props.data?.imgURL"
            mode="widthFix"
        ></image>
    </view>
    <view class="award-view">
        <view class="content-box">
            <PureText :data="props.data"></PureText>
        </view>
        <view class="bar-space" v-if="props.data.displayTag === 2"></view>
        <view class="bar-box" v-if="props.data.displayTag === 2">
            <view class="bar flex bg-black-80">
                <view class="icon">
                    <image
                        class="w-full"
                        src="@/static/email/award_white.png"
                        mode="widthFix"
                    ></image>
                </view>
                <!-- 金额类型 1-Bonus 2-真金 -->
                <view
                    class="award"
                    v-html="
                        (props.data.amountType === 1
                            ? $t('KEY_EMAIL_RECEIVE_BONUS')
                            : props.data.amountType === 2
                            ? $t('KEY_EMAIL_RECEIVE_CASH')
                            : '') +
                        ' ' +
                        props.data?.rewardAmount
                    "
                ></view>
                <view class="btn">
                    <view
                        class="normal-btn bg-primary"
                        :class="{ disabled: awardReceived }"
                        @click="receive"
                        v-html="$t('KEY_EMAIL_RECEIVE_BTN')"
                    ></view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue'
    import PureText from './PureText.vue'
    import { i18n } from '@/common/i18nConfig'
    import { useUsersStore } from '@/store/userStore'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { onLoad } from '@dcloudio/uni-app'
    import { modal } from '@/lib/components/Modal'
    const store = useUsersStore()
    const { t: $t } = i18n.global
    interface Prop {
        data: any
    }
    const props = defineProps<Prop>()
    let query: Record<string, string> = null
    const mergeCommonParams = (params) => {
        return Object.assign(
            {
                userId: store.userInfo?.userId,
            },
            store.commonParams,
            params
        )
    }
    const goBannerLink = () => {
        if (props.data.hyperLink) {
            // 经过与产品(可新)沟通 有跳出本网站的可能
            window.location.href = props.data.hyperLink
            // uni.navigateTo({
            //     url: props.data.hyperLink,
            //     fail(err){
            //         // errMsg "navigateTo:fail can not navigateTo a tabbar page"
            //         if(err?.errMsg &&err.errMsg.includes('tabbar')){
            //             uni.switchTab({
            //                 url: props.data.hyperLink
            //             })
            //         }
            //     }
            // })
        }
    }
    const awardReceived = ref<boolean>(false)
    watch(
        () => props.data,
        () => {
            if (props.data.receiveStatus !== 0) {
                awardReceived.value = true
            }
        }
    )
    const receive = async () => {
        if (awardReceived.value) {
            return
        }
        awardReceived.value = true
        const res = await lobbyApi.message.takeReward(
            mergeCommonParams({
                messageId: query.messageId,
            })
        )
        if (!res.success) {
            ErrorHandler(res, 'takeReward')
            return
        }
        modal({
            width: 550,
            type: 'success',
            title: $t('KEY_EMAIL_RECEIVE_SUCCESS'),
            cancelText: $t('KEY_COMMON_CANCEL'),
            confirmText: $t('KEY_COMMON_OK'),
        })
    }
    onLoad((options: AnyObject) => {
        query = options
    })
</script>

<style lang="scss">
    $barheight: 122rpx;
    .award-view {
        .bar-space {
            height: $barheight;
        }

        .bar {
            @apply fixed rounded-7 shadow-black;
            left: 41rpx;
            bottom: 17rpx;
            width: 668rpx;
            height: $barheight;
            .icon {
                @apply box-border;
                width: 119rpx;
                padding-left: 37rpx;
                padding-top: 34rpx;
                image {
                    width: 42rpx;
                }
            }
            .award {
                @apply flex-1 font-bold text-white-100;
                line-height: 122rpx;
                font-size: 28rpx;
            }
            .btn {
                @apply box-border;
                width: 242rpx;
                padding-right: 24rpx;
                padding-top: 22rpx;
                .primary-btn {
                    height: 82rpx;
                }
            }
        }
    }
</style>
