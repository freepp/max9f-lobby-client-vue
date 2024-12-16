<template>
    <Layout :headerTitle="$t('KEY_RED_INDEX_TITLE')" :hasHeader="true">
        <view class="red-view">
            <view class="red-header-space"></view>
            <view class="red-header-box">
                <view class="red-header-bg1" v-if="!isFirst"></view>
                <view class="red-header-content">
                    <view class="badge" v-if="!isFirst">
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
                    <!-- <view class="price">R$ {{ numberWithCommas(price) }}</view> -->
                    <LoopNum
                        class="price"
                        :number="'R$' + numberWithCommas(price) + ''"
                    ></LoopNum>

                    <view class="progress-box">
                        <view class="progress-bg">
                            <view
                                class="progress-bg-inner"
                                :style="progressStyle"
                            ></view>
                        </view>
                        <view class="progress-val">{{ progressVal }}%</view>
                    </view>
                    <view
                        class="progress-tip"
                        v-html="
                            $t('KEY_RED_WITHDRAW_DISS').replace(
                                '#DISS#',
                                diss + '%'
                            )
                        "
                    ></view>
                    <view
                        class="share-btn bg-primary normal-btn"
                        @click="share"
                        v-html="$t('KEY_RED_INDEX_SHARE_BTN')"
                    ></view>
                    <view
                        class="withdraw-btn"
                        @click="withdraw"
                        v-html="$t('KEY_TABBAR_WITHDRAW')"
                    ></view>
                    <view class="banner" v-if="isFirst">
                        <image
                            src="@/static/activity/red-package/banner.png"
                            class="w-full h-full"
                        ></image>
                    </view>
                </view>
                <view
                    class="red-header-bg2"
                    v-if="!isFirst"
                    v-html="$t('KEY_RED_INDEX_PLATFORM')"
                ></view>
            </view>
            <view class="red-loop">
                <Turntable
                    v-model="count"
                    @on-success="sus"
                    :is-first="isFirst"
                    :fetch="getNumber"
                    :can-roll-fn="canRollFn"
                ></Turntable>
                <view
                    class="rule-btn"
                    @click="toRule"
                    v-html="$t('KEY_RED_WITHDRAW_RULE')"
                ></view>
                <view
                    v-if="price >= total"
                    class="withdraw-btn"
                    v-html="$t('KEY_TABBAR_WITHDRAW')"
                    @click="withdraw"
                ></view>
            </view>
            <view class="red-tab-box">
                <view class="tabs flex">
                    <view
                        v-show="taskRecords && taskRecords.length > 0"
                        class="tab relative flex justify-center"
                        :class="{ active: currentTab === 0 }"
                        @click="toggleTab(0)"
                    >
                        <view
                            class="tab-text"
                            v-html="$t('KEY_RED_INDEX_TAB_RECORD')"
                        ></view>
                    </view>
                    <view
                        class="tab relative flex-1 whitespace-nowrap flex justify-center"
                        :class="{ active: currentTab === 1 }"
                        @click="toggleTab(1)"
                    >
                        <view
                            class="tab-text"
                            v-html="$t('KEY_RED_INDEX_TAB_SUS')"
                        ></view>
                    </view>
                </view>
                <scroll-view
                    v-if="currentTab === 0"
                    :scroll-y="true"
                    @scrolltolower="scrolltolower"
                    class="tab-content"
                    v-show="taskRecords && taskRecords.length > 0"
                >
                    <view class="record-list">
                        <view class="record" v-for="item in taskRecords">
                            <view class="record-logo">
                                <!-- 被邀请人注册 -->
                                <image
                                    v-if="item.taskCategory === 1"
                                    src="@/static/activity/red-package/task/register.png"
                                    mode="widthFix"
                                ></image>
                                <!-- 本人分享 -->
                                <image
                                    v-else-if="item.taskCategory === 2"
                                    src="@/static/activity/red-package/task/share.png"
                                    mode="widthFix"
                                ></image>
                                <!-- 下注 -->
                                <image
                                    v-else-if="item.taskCategory === 3"
                                    src="@/static/activity/red-package/task/bet.png"
                                    mode="widthFix"
                                ></image>
                                <!--本人下载app-->
                                <image
                                    v-else-if="item.taskCategory === 4"
                                    src="@/static/activity/red-package/task/download.png"
                                    mode="widthFix"
                                ></image>
                                <!--充值-->
                                <image
                                    v-else-if="item.taskCategory === 5"
                                    src="@/static/activity/red-package/task/deposit.png"
                                    mode="widthFix"
                                ></image>
                                <!--中奖bonus-->
                                <!-- <image
                                    src="@/static/activity/red-package/task/bonus.png"
                                    mode="widthFix"
                                ></image> -->
                            </view>
                            <view
                                class="record-action flex items-center"
                                v-html="$t('KEY_INDEX_HISTORY_TEXT')"
                            ></view>
                            <view class="record-money">
                                <view
                                    class="inline"
                                    v-html="
                                        $t('KEY_INDEX_HISTORY_GET').replace(
                                            '#MONEY#',
                                            (item.bonus > 0
                                                ? item.bonus
                                                : item.amount) + ''
                                        )
                                    "
                                ></view>
                                {{ item.bonus > 0 ? $t('KEY_ME_BONUS') : '' }}
                            </view>
                        </view>
                        <NoData
                            v-show="taskRecords && taskRecords.length === 0"
                            :is-white="true"
                            class="no-data"
                            :message="$t('KEY_COMMON_NODATA')"
                        ></NoData>
                    </view>
                </scroll-view>
                <scroll-view
                    v-if="currentTab === 1"
                    :scroll-y="true"
                    @scrolltolower="scrolltolower"
                    class="tab-content"
                >
                    <view class="withdraw-list">
                        <swiper
                            class="w-full h-full"
                            :circular="true"
                            :indicator-dots="false"
                            :autoplay="true"
                            :interval="1900"
                            :duration="2000"
                            previous-margin="0rpx"
                            next-margin="310rpx"
                            easing-function="linear"
                            :vertical="true"
                            :disable-touch="true"
                        >
                            <swiper-item v-for="item in withdrawRecords">
                                <WithdrawItem :withdraw="item"></WithdrawItem>
                            </swiper-item>
                        </swiper>
                    </view>
                </scroll-view>
            </view>
        </view>
        <win-box
            :price="winPrice"
            :is-open="isFullStyle"
            :is-gold="isFirst"
            v-if="isShowWin"
            @on-btn-click="onBtnClick"
            :showMask="true"
        ></win-box>
        <!-- <ShareBox
            v-if="isShareShow"
            :total="total"
            @close="onShareClose"
            @share="getInfo"
        ></ShareBox> -->
        <InviteModal
            :total="total"
            :price="price"
            v-if="isShowWithDraw"
            @close="onWithDrawClose"
            @on-invite-btn-click="onInviteBtnClick"
        ></InviteModal>

        <PopupBottom ref="RefPopupCopy" :height="480" background="'rgb(14,14,15)'">
          <view class="personal-title"></view>
          <view class="popupTitle" v-html="$t('KEY_RED_SHARE_TITLE')"></view>
          <view class="popupShare">
            <view class="flex flex-1 items-center">
              <view class="flex-1 text-center" v-for="item in shareList" :key="item.name" @click="openApp(item)">
                <image
                  style="width: 106rpx; height: 106rpx;"
                  :src="item.icon"
                  mode="scaleToFill"
                />
                <view class="share_name">{{ item.name }}</view>
              </view>
            </view>
          </view>
          <view class="popupCopy">
            <view class="act_copy flex justify-between items-center">
              <input class="copy_input" type="text" disabled :value="shareUrl">
              <view ref="RefcopyBtn" class="copy_btn flex justify-center items-center" @click="copy">{{ $t('KEY_COMMON_COPY') }}</view>
            </view>
          </view>
        </PopupBottom>
    </Layout>
</template>
<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    import Turntable from '@/lib/components/RedPackage/turntable.vue'
    import WinBox from '@/lib/components/RedPackage/win_box.vue'
    import { numberWithCommas } from '@/common/common'
    // import ShareBox from '@/lib/components/RedPackage/ShareBox.vue'
    import InviteModal from '@/lib/components/RedPackage/InviteModal.vue'
    import WithdrawItem from '@/lib/components/RedPackage/WithdrawItem.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as activityApi } from '@/NET/activity'
    import NoData from '@/lib/components/NoData.vue'
    import LoopNum from '@/lib/components/RedPackage/LoopNum.vue'
    import fb from "@/static/activity/share/fb.png"
    import tg from "@/static/activity/share/tg.png"
    import tx from "@/static/activity/share/tx.png"
    import wa from "@/static/activity/share/wa.png"
    import PopupBottom from '@/lib/components/PopupBottom/index.vue'

    const { t: $t } = i18n.global
    const RefPopupCopy = ref()
    // 显示banner
    const isShowBanner = ref(true)
    const isFullStyle = ref(false)
    const count = ref(0)
    const store = useUsersStore()
    const currentTab = ref<number>(0)
    const isLoading = ref(false)
    const reset = () => {}
    const price = ref(0)
    const total = ref(10000)
    const isFirst = ref(false)
    // 显示提现弹窗
    const isShowWithDraw = ref(false)
    // 显示分享弹窗
    const isShareShow = ref(false)
    // 显示赢奖弹窗
    const isShowWin = ref(false)
    const winPrice = ref(0)
    const shareUrl = ref('')
    const share = () => {
        winPrice.value = price.value
        // isShareShow.value = true
        shareUrl.value = `${location.origin}${location.pathname}#/pages/red_package/invite?uid=${store.userInfo.userId}&mid=3`
        RefPopupCopy?.value?.changeIsShow(true)
    }
    const onInviteBtnClick = () => {
        isShowWithDraw.value = false
        // isShareShow.value = true
        shareUrl.value = `${location.origin}${location.pathname}#/pages/red_package/invite?uid=${store.userInfo.userId}&mid=3`
        RefPopupCopy?.value?.changeIsShow(true)
    }

    const shareList = ref([
      { id: 3, name: 'Facebook', icon: fb },
      { id: 2, name: 'Whatsapp', icon: wa },
      { id: 1, name: 'Telegram', icon: tg },
      { id: 4, name: 'Twitter', icon: tx },
    ])

    const diss = computed(() => (100).sub(progress.value))
    const withdrawRemote = async () => {
        let params = Object.assign(
            {},
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        const res = await activityApi.redpack.redpackWithdrawCreate(params)
        if (!res.success) {
            ErrorHandler(res, 'withdrawRemote')
            return false
        }
        return res.success
    }
    // 提现
    const withdraw = async () => {
        if (price.value >= total.value) {
            const sus = await withdrawRemote()
            if (sus) {
                isFullStyle.value = true
                winPrice.value = total.value
                isShowWin.value = true
            }
            await getInfo()
        } else {
            isFullStyle.value = false
            isShowWithDraw.value = true
        }
    }
    const toRule = () => {
        uni.navigateTo({
            url: '/pages/red_package/rule',
        })
    }
    const getNumber = async (): Promise<number> => {
        let params = Object.assign(
            {},
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        const res = await activityApi.redpack.redpackRaffleCreate(params)
        if (res.success) {
            return res.result.prizeAmount
            // drawableAmount.value = 1
        } else {
            ErrorHandler(res, 'getNumber')
        }
    }

    const badge = ref(0)
    const getInfo = async () => {
        let params = Object.assign(
            {},
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        // const res = await lobbyApi.redpack.packInfo(params)
        const res = await activityApi.redpack.redpackPackInfoCreate(params)
        if (res.success) {
            if (res.result.amount === 0 && res.result.remainingNum === 1) {
                isFirst.value = true
            } else {
                isFirst.value = false
            }
            price.value = res.result.amount
            count.value = res.result.remainingNum
            total.value = res.result.packAmount
            badge.value = res.result.packFlag
            // drawableAmount.value = 1
        } else {
            ErrorHandler(res, 'getInfo')
        }
    }

    const taskRecords = ref([])
    const getTaskRecord = async () => {
        let params = Object.assign(
            {},
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        // const res = await lobbyApi.redpack.taskRecord(params)
        const res = await activityApi.redpack.redpackTaskRecordCreate(params)
        if (res.success) {
            taskRecords.value = res.result
            if (taskRecords.value.length === 0) {
                toggleTab(1)
            }
        } else {
            ErrorHandler(res, 'getTaskRecord')
        }
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
            ErrorHandler(res, 'getTaskRecord')
        }
    }
    const initData = async () => {
        if (store.userInfo?.userMode === 2) {
            await getInfo()
            await getTaskRecord()
        }
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
    const onWithDrawClose = () => {
        isShowWithDraw.value = false
    }
    // const onShareClose = () => {
    //     isShareShow.value = false
    // }
    const sus = (val) => {
        if (val > 0) {
            // price.value = price.value.add(val)
            winPrice.value = val
            isFullStyle.value = false
            isShowWin.value = true
        }
        isShowBanner.value = false
    }
    const onBtnClick = async () => {
        isShowWin.value = false
        isShowBanner.value = false
        await getTaskRecord()
        await getInfo()
    }
    const progress = computed(() => {
        return Number(
            Math.min((price.value / total.value) * 100, 100).toFixed(2)
        )
    })
    const progressVal = computed(() => {
        return numberWithCommas(progress.value)
    })
    const progressStyle = computed(() => {
        return {
            width: progress.value + '%',
        }
    })
    const toggleTab = async (tabKey) => {
        reset()
        isLoading.value = true
        if (store.userInfo?.userMode === 2) {
            if (tabKey === 0) {
                await getTaskRecord()
            } else if (tabKey === 1) {
                await getWithdrawRecord()
            }
        }
        currentTab.value = tabKey
    }
    const scrolltolower = () => {
        console.log(123)
    }

    /**
     * @description 能否抽奖
     * @returns {boolean} 返回 true 可以抽检，返回 false 则不能抽奖
     */
    function canRollFn() {
        // 以下情况同时满足时，才可抽奖：
        // 1. 抽奖次数大于 0；
        // 2. 提现进度小于 100 时。
        return count.value > 0 && progress.value < 100
    }

    function openApp(item) {

      const paramsUrl = encodeURIComponent(shareUrl.value)
      let url = ''
      switch (item.name) {
        case 'Telegram':
          url = `https://t.me/share/url?url=${paramsUrl}`
          break
        case 'Whatsapp':
          url = `https://wa.me/?text=${paramsUrl}`
          break
        case 'Facebook':
          url = `https://www.facebook.com/sharer/sharer.php?u=${paramsUrl}`
          break
        case 'Twitter':
          url = `https://x.com/intent/post?&url=${paramsUrl}`
          break
        default:
          url = `https://t.me/share/url?url=${paramsUrl}`
          break
      }
      // @ts-ignore
      if (window.android) {
        // @ts-ignore
        window.android.ShareChannel(url)
      } else {
        window.open(url)
      }
    }
    const copy = () => {
        uni.setClipboardData({
            data: shareUrl.value,
            showToast: false,
            success: function () {
                if (store.userInfo?.userMode === 2) {
                    getInfo()
                }
                modal({
                    width: '485rpx',
                    title: $t('KEY_PAY_COPYSUCCESS'),
                    showCancel: false,
                    showConfirm: false,
                    maskClosable: true,
                })
            },
        })
    }
</script>

<style lang="scss" scoped>
.popupTitle {
  font-weight: 600;
  font-size: 34rpx;
  color: #FFEE88;
  margin-bottom: 40rpx;
  text-align: center;
  text {
    color: #FFB900;
  }
}
.popupShare {
  padding: 0 63rpx 20rpx;
}
.popupCopy {
  padding: 0 31rpx;
}
.act_copy {
  background: #2D3242;
  color: #7DAEFF;
  padding-left: 24rpx;
  border-radius: 38rpx;
  .copy_input {
    flex: 1;
    font-size: 25rpx;
  }
  .copy_btn {
    background: #1E6BFF;
    border-radius: 40rpx;
    width: 153rpx;
    height: 81rpx;
    flex-shrink: 0;
    color: #fff;
    font-size: 33rpx;
    font-weight: 900;
  }
}
.share_name {
  font-size: 25rpx;
  color: #959595;
  margin-top: 6rpx;
}
</style>

<style lang="scss">
.personal-title {
  @apply flex items-center justify-center;
  font-size: 33rpx;
  font-weight: bold;
  color: #454545;
  height: 100rpx;
}
    .yellow {
        color: #ffd800;
    }
    .red-view {
        height: 1600rpx;
        background: radial-gradient(circle, #fe3752, #ed3b4b, #4c3b92, #270a41);
        .red-header-space {
            height: 14rpx;
        }
        .red-header-box {
            @apply relative;
            width: 667rpx;
            height: 328rpx;
            padding-top: 19rpx;
            margin: 0 auto;
            .red-header-bg1 {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate3d(-50%, 0, 0);
                width: 399rpx;
                height: 44rpx;
                background: #000000;
                border-radius: 14rpx 14rpx 0px 0px;
            }
            .red-header-bg2 {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate3d(-50%, 0, 0);
                width: 376rpx;
                height: 44rpx;
                background: linear-gradient(0deg, #a24680, #a461b5, #853998);
                border-radius: 0px 0px 42rpx 42rpx;
                font-size: 22rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #ffffff;
                line-height: 44rpx;
                text-align: center;
            }
            .red-header-content {
                @apply box-border;
                width: 667rpx;
                height: 309rpx;
                background: linear-gradient(0deg, #4b46a1, #4973d0);
                box-shadow: 2rpx 2rpx 47rpx 0rpx rgba(0, 0, 0, 0.5);
                border-radius: 14rpx;
                margin: 0 auto;
                position: relative;
                padding-top: 40rpx;
                .banner {
                    width: 637rpx;
                    height: 276rpx;
                    position: absolute;
                    top: 16rpx;
                    left: 50%;
                    transform: translate3d(-50%, 0, 0);
                }
                .badge {
                    @apply absolute;
                    width: 175rpx;
                    height: 165rpx;
                    left: -32rpx;
                    top: -26rpx;
                    image {
                        @apply w-full h-full;
                    }
                }
                .price {
                    height: 67rpx;
                    font-size: 67rpx;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: #ffd800;
                    line-height: 70rpx;
                    text-shadow: 2rpx 3rpx 3rpx rgba(1, 0, 26, 0.35);
                    text-align: center;
                }

                .progress-box {
                    margin-top: 24rpx;
                    @apply flex justify-center items-center;
                    .progress-val {
                        font-size: 22rpx;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #ffffff;
                        line-height: 24rpx;
                        margin-left: 13rpx;
                    }
                    .progress-bg {
                        width: 409rpx;
                        height: 21rpx;
                        box-shadow: 1rpx 2rpx 0px 0px rgba(255, 255, 255, 0.66);
                        background: rgba(0, 0, 0, 0.5);
                        border-radius: 11px;
                        .progress-bg-inner {
                            width: 341rpx;
                            height: 21rpx;
                            background: linear-gradient(
                                180deg,
                                #ffe400,
                                #b16c00
                            );
                            border-radius: inherit;
                            transition: width 0.5s linear;
                        }
                    }
                }
                .progress-tip {
                    text-align: center;
                    font-size: 22rpx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #ffffff;
                    line-height: 24px;
                }
                .share-btn {
                    width: 601rpx;
                    height: 77rpx;
                    line-height: 77rpx;
                    background: linear-gradient(
                        0deg,
                        #d40e29,
                        #f82e49,
                        #ff3a54
                    );
                    box-shadow: 2rpx 2rpx 11rpx 0rpx rgba(0, 0, 0, 0.5);
                    border-radius: 14rpx;
                    font-size: 28rpx;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: #ffffff;
                    text-shadow: 2rpx 2rpx 0rpx rgba(0, 0, 0, 0.5);
                    text-align: center;
                    margin: 12rpx auto 0;
                }
                .withdraw-btn {
                    width: 141rpx;
                    height: 57rpx;
                    line-height: 57rpx;
                    text-align: center;
                    background: linear-gradient(
                        0deg,
                        #d40e29,
                        #f82e49,
                        #ff3a54
                    );
                    border-radius: 29rpx;
                    position: absolute;
                    top: 26rpx;
                    right: 17rpx;
                    font-size: 22rpx;
                    font-weight: bold;
                    color: #ffffff;
                }
            }
        }
        .red-loop {
            width: 718rpx;
            height: 690rpx;
            margin: -30rpx auto 0;
            position: relative;
            .withdraw-btn {
                width: 155rpx;
                height: 155rpx;
                // line-height: 155rpx;
                position: absolute;
                left: 50%;
                top: 50%;
                // text-align: center;
                font-size: 30rpx;
                font-weight: bold;
                color: #fff;
                transform: translate3d(-50%, -50%, 0);
                background: url(@/static/activity/red-package/withdraw_btn.png);
                background-size: 100% 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .rule-btn {
                @apply absolute underline text-right;
                width: 180rpx;
                height: 30rpx;
                font-size: 28rpx;
                font-weight: 400;
                color: #ffffff;
                line-height: 30rpx;
                text-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.35);
                right: 45rpx;
                top: 610rpx;
                text-align: right;
            }
        }
        .red-tab-box {
            @apply rounded-14;
            width: 667rpx;
            height: 542rpx;
            background: linear-gradient(0deg, #6246a2, #a14681);
            box-shadow: 13rpx 13rpx 41rpx 0px rgba(0, 0, 0, 0.5);
            margin: 0rpx auto 0;
            .tabs {
                @apply font-bold text-center;
                height: 89rpx;
                .tab {
                    width: 281rpx;
                    font-size: 28rpx;
                    height: 72rpx;
                    text-align: center;
                    &.active {
                        @apply text-white-100;
                    }
                    .tab-text {
                        @apply relative flex items-center justify-center h-full w-min;
                    }
                    &.active .tab-text::after {
                        @apply absolute bg-primary;
                        bottom: 3rpx;
                        left: 50%;
                        transform: translate3d(-50%, 0, 0);
                        content: '';
                        width: 100%;
                        height: 7rpx;
                        border-radius: 3rpx;
                    }
                }
            }
            .tab-content {
                height: 453rpx;
                height: 440rpx;
                .record-list {
                    width: 586rpx;
                    margin: 0 auto;
                    padding-top: 1rpx;
                    .no-data {
                        padding-top: 80rpx;
                    }
                    .record {
                        @apply rounded-14 flex box-border;
                        width: 586rpx;
                        height: 117rpx;
                        line-height: 117rpx;
                        background: #45387e;
                        box-shadow: 1rpx 1rpx 6rpx 0px rgba(0, 0, 0, 0.15);
                        padding: 0rpx 25rpx;
                        margin-top: 18rpx;
                        &:first-child {
                            margin-top: 0rpx;
                        }
                        .record-logo {
                            @apply flex items-center;
                            width: 100rpx;
                            image {
                                width: 74rpx;
                            }
                        }
                        .record-action {
                            width: 220rpx;
                            font-size: 22rpx;
                            font-weight: 400;
                            color: #ffffff;
                            line-height: 28rpx;
                            opacity: 0.5;
                        }
                        .record-money {
                            @apply flex-1;
                            font-size: 22rpx;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: #ffffff;
                            line-height: 24rpx;
                            padding-top: 28rpx;
                        }
                    }
                }
                .withdraw-list {
                    width: 586rpx;
                    height: 440rpx;
                    margin: 0 auto;
                    padding-top: 1rpx;
                }
            }
        }
    }
</style>
