<template>
    <view class="activity-view">
        <view class="relative top-0 left-0 w-full">
            <view class="cover" v-show="isShowCover"></view>
            <!-- <image
            class="absolute w-full h-full block"
            src="@/static/activity/share17.jpg"
            mode="widthFix"
        ></image> -->
            <view class="space"></view>
            <view class="info-box">
                <view class="top-box">
                    <view class="reward">
                        {{ $t('KEY_NEW_SHARE_REWARD') }}: {{ reward }}
                    </view>
                    <view class="user">
                        <view class="user-name">
                            {{ $t('KEY_NEW_SHARE_TOTAL') }}: 
                        </view>
                        <view class="user-val">{{ inviteNum }}</view>
                    </view>
                </view>
                <view class="link-box">
                    <view class="link">
                        {{ shareUrl }}
                    </view>
                    <view
                        class="copy flex items-center justify-center"
                        @click="copy"
                    >
                        <image src="@/static/icon/copy_white.png"></image>
                        {{ $t('KEY_NEW_SHARE_SHARE') }}
                    </view>
                </view>
            </view>
            <!--
                    animation1_boxdisable
                    animation2_boxidle
                    animation3_boxopen

                -->

            <view class="boxs">
                <view class="box-box" v-for="box in boxs">
                    <view
                        v-for="(item, index) in box"
                        class="box"
                        :class="{
                            able: item.receiveStatus === 2,
                            got: item.receiveStatus === 1,
                        }"
                        @click="get(item, index)"
                    >
                        <view class="progress" :style="item.styles"></view>
                        <view class="doing" v-if="item.isDoing">
                            <image
                                class="w-full h-full"
                                src="@/static/activity/doing_bg.png"
                            ></image>
                            <view class="doing-text">
                                {{ $t('KEY_NEW_SHARE_INVITED') }}
                                {{ item.alreadyUsers }}/{{ item.needUsers }}
                            </view>
                        </view>
                        <view class="box-img">
                            <image
                                v-if="item.receiveStatus === 0"
                                src="@/static/activity/box_disabled.png"
                            ></image>
                            <image
                                class="ready"
                                v-if="
                                    item.receiveStatus === 2 && !item.animation
                                "
                                src="@/static/activity/box_ready.gif"
                            ></image>
                            <image
                                v-if="item.receiveStatus === 1"
                                src="@/static/activity/box_opened.png"
                            ></image>
                        </view>
                        <Spine
                            v-if="item.receiveStatus === 2 && item.animation"
                            :ref="pushList"
                            class="spine-player"
                            skelName="1.7sharebox"
                            :assetsUrl="`./static/spinspine/bra/share17/`"
                            animName="animation3_boxopen"
                            @on-complete="end(item, index)"
                        ></Spine>
                        <view class="money">R$ {{ item.bonus }}</view>
                    </view>
                </view>
            </view>
            <view class="rule-box">
                <view class="title">{{ $t('KEY_NEW_SHARE_RULE_TITLE') }}</view>
                <view class="rule" v-html="$t('KEY_NEW_SHARE_RULE1')"></view>
            </view>
        </view>
        <view class="w-0 h-0 overflow-hidden">
            <Spine
                class="spine-player"
                skelName="1.7sharebox"
                :assetsUrl="`./static/spinspine/bra/share17/`"
            ></Spine>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import Spine from '@/lib/components/Spine/Spine.vue'
    import { onMounted, watch, reactive, computed } from 'vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { i18n } from '@/common/i18nConfig'
    import { ref } from 'vue'
    const { t: $t } = i18n.global
    const store = useUsersStore()
    import { modal } from '@/lib/components/Modal'

    interface Data {
        activityAbout: any
    }
    const data = reactive<Data>({
        activityAbout: {},
    })
    const shareUrl = computed(
        () =>
            `${location.origin}${location.pathname}#/pages/agent/invite?uid=${store.userInfo?.userId}`
    )
    let animationList = ['animation4_boxopenidle']
    const spineRef = ref(new Array(16))
    let animationIndex = -1
    const isShowCover = ref(false)
    const end = (item, index) => {
        animationIndex++
        console.log('end', animationIndex)
        // 整个动画结束后 不再进行动画切换
        if (animationIndex === 0) {
            setTimeout(() => {
                item.animation = false
                isShowCover.value = false
                modal({
                    type: 'gift',
                    width: '500rpx',
                    title: $t('KEY_NEW_SHARE_SUS'),
                    content: `<p style='font-weight: bold;'>R$${
                        item.getBonus
                    }</p>${$t('KEY_NEW_SHARE_GET_MORE')}`,
                    confirmText: $t('KEY_NEW_SHARE_SHARE'),
                    cancelText: $t('KEY_COMMON_OK'),
                    onConfirm() {
                        uni.setClipboardData({
                            data: shareUrl.value,
                            showToast: false,
                        })
                    },
                })
                load()
            }, 800)
        }
        if (animationIndex > animationList.length - 1) {
            // rolling = false
            return
        }
        const animation = animationList[animationIndex]
        console.log(spineRef.value, index, spineRef.value[index], animation)
        spineRef.value[index].setAnimation(animation)
    }
    const copy = () => {
        uni.setClipboardData({
            data: shareUrl.value,
            showToast: false,
            success: function () {
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

    const boxs = ref([])
    const reward = ref(0)
    const inviteNum = ref(0)
    let indexDom = -1
    const pushList = (e) => {
        console.log('pushList', e)
        spineRef.value[indexDom] = e
    }
    const load = async () => {
        let params = Object.assign(
            {},
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        const res = await lobbyApi.inviteNewuser.load(params)
        if (res.success) {
            boxs.value = []
            let isDoing = false
            reward.value = res.result.totalHaveReceived
            inviteNum.value = res.result.totalValidUser
            const boxsNum = Math.ceil(res.result.items.length / 16)
            for (let i = 0; i < boxsNum; i++) {
                const box = new Array(16).fill({})
                boxs.value.push(box)
            }
            res.result.items.forEach((item, index) => {
                const box = boxs.value[Math.floor(index / 16)]
                const newIndex = index % 16
                box[newIndex] = item || {}
                box[newIndex].animation = false
                if (item.receiveStatus === 0 && !isDoing) {
                    isDoing = true
                    box[newIndex].isDoing = true
                    box[newIndex].styles = {
                        width:
                            (
                                (item.alreadyUsers / item.needUsers) *
                                100
                            ).toFixed(2) + '%',
                    }
                }
                if (item.receiveStatus === 1 || item.receiveStatus === 2) {
                    box[newIndex].styles = {
                        width:
                            (
                                (item.alreadyUsers / item.needUsers) *
                                100
                            ).toFixed(2) + '%',
                    }
                }
            })
        } else {
            ErrorHandler(res, 'load')
        }
    }
    const get = async (item, index) => {
        //0-不允许领取  1-已领取  2-可领取
        indexDom = index
        animationIndex = -1

        // item.animation = true
        // item.getBonus = 99
        if (item.receiveStatus === 1) {
            return
        } else if (item.receiveStatus === 0) {
            const diss = item.needUsers - item.alreadyUsers
            modal({
                type: 'gift',
                width: '500rpx',
                content: `${$t('KEY_NEW_SHARE_INVITE_MORE')
                    .replaceAll('#USER#', diss + '')
                    .replaceAll('#MONEY#', item.bonus)}${$t(
                    'KEY_NEW_SHARE_EARN_MORE'
                )}`,
                confirmText: $t('KEY_NEW_SHARE_SHARE'),
                cancelText: $t('KEY_COMMON_OK'),
                onConfirm() {
                    uni.setClipboardData({
                        data: shareUrl.value,
                        showToast: false,
                    })
                },
            })
            return
        }
        isShowCover.value = true
        let params = Object.assign(
            {},
            {
                userId: store.userInfo.userId,
            },
            {
                detailId: item.detailId,
            },
            store.commonParams
        )
        const res = await lobbyApi.inviteNewuser.execute(params)
        if (res.success) {
            item.animation = true
            item.getBonus = res.result.bonus
        } else {
            ErrorHandler(res, 'get')
            isShowCover.value = false
        }
    }
    const initData = () => {
        if (store.userInfo) {
            load()
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
    .space {
        height: 22rpx;
    }
    .activity-view {
        background: url('@/static/activity/share17.jpg');
        background-size: 100% 100%;
        padding-bottom: 50rpx;
        position: relative;
        .cover {
            @apply absolute top-0 left-0 w-full h-full;
            z-index: 9;
        }
    }
    .info-box {
        @apply rounded-14;
        width: 681rpx;
        height: 172rpx;
        background: linear-gradient(
            0deg,
            rgba(62, 179, 178, 0.49),
            rgba(30, 71, 119, 0.49)
        );
        box-shadow: 0px 8rpx 17rpx 0px rgba(20, 42, 69, 0.28),
            0px 0px 11rpx 0px rgba(255, 255, 255, 0.85);
        margin: 0 auto;
        .top-box {
            @apply flex justify-between box-border;
            width: 644rpx;
            margin: 0 auto;
            padding-top: 22rpx;
            .reward,
            .user {
                @apply flex items-center;
                width: 320rpx;
                height: 55rpx;
                line-height: 55rpx;
                background: rgba(6, 36, 84, 0.73);
                text-indent: 0rpx;
                font-size: 28rpx;
                color: #ffffff;
                .user-name {
                    display: inline-block;
                    width: 160rpx;
                    font-size: 22rpx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #ffffff;
                    line-height: 22rpx;
                    padding-left: 23rpx;
                }
            }
            .reward {
                text-indent: 28rpx;
                border-radius: 28rpx 0px 0px 28rpx;
            }
            .user {
                @apply flex items-center;
                border-radius: 0px 28rpx 28rpx 0px;
            }
        }
        .link-box {
            @apply flex;
            width: 644rpx;
            height: 55rpx;
            line-height: 55rpx;
            margin: 15rpx auto 0;
            background: rgba(6, 36, 84, 0.73);
            border-radius: 28rpx;
            .link {
                width: 405rpx;
                font-size: 22rpx;
                color: #0698ff;
                text-indent: 28rpx;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .copy {
                @apply flex-1;
                height: 55rpx;
                background: #f82e49;
                border-radius: 0px 28px 28px 0px;
                font-size: 17rpx;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #ffffff;
                image {
                    width: 28rpx;
                    height: 33rpx;
                    margin-right: 6rpx;
                }
            }
        }
    }
    .boxs {
        margin: 20rpx auto 0;
    }
    .box-box {
        width: 726rpx;
        height: 838rpx;
        margin: 0rpx auto 0;
        background: url(@/static/activity/share17_ditu.png);
        background-size: 100% 100%;
        .box {
            @apply relative box-border;
            width: 139rpx;
            height: 139rpx;
            border: 3rpx solid #976302;
            box-shadow: 0px 4px 11px 0px rgba(27, 1, 1, 0.56);
            border-radius: 7px;
            float: left;
            margin-left: 19rpx;

            &:nth-child(4n + 1) {
                margin-left: 54rpx;
            }
            &:nth-child(-n + 16) {
                margin-top: 52rpx;
            }
            &:nth-child(-n + 12) {
                margin-top: 48rpx;
            }
            &:nth-child(-n + 8) {
                margin-top: 44rpx;
            }
            &:nth-child(-n + 4) {
                margin-top: 58rpx;
            }
            &.able {
                border: 3rpx solid #d4faff;
                box-shadow: 0px 4rpx 11rpx 0px #00fffc;
            }
            .progress {
                @apply absolute top-0 left-0 h-full;
                background-color: #155988;
            }
            .doing {
                @apply absolute top-0;
                left: 50%;
                width: min-content;
                height: 71rpx;
                white-space: nowrap;
                padding: 0rpx 26rpx;
                transform: translate3d(-50%, -100%, 0);
                image {
                    @apply absolute top-0 left-0 w-full h-full;
                }
                .doing-text {
                    @apply w-full text-center relative;
                    height: 50rpx;
                    line-height: 56rpx;
                    font-size: 22rpx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #ffffff;
                    line-height: 56rpx;
                }
            }
            .box-img {
                @apply absolute top-0 left-0;
                width: 138rpx;
                height: 119rpx;
                image {
                    @apply w-full h-full;
                }
                .ready {
                    width: 238rpx;
                    height: 238rpx;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate3d(-50%, -50%, 0);
                }
            }
            .money {
                @apply absolute bottom-0 left-0 w-full;
                height: 32rpx;
                font-size: 28rpx;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #353535;
                line-height: 32rpx;
                text-shadow: 2rpx 2rpx 3rpx rgba(79, 0, 0, 0.53);
                text-align: center;
            }
            &.got {
                .money {
                    color: #69c9c8;
                }
            }
            &.able {
                .money {
                    color: #ffffff;
                }
            }
            .spine-player {
                width: 236rpx;
                height: 236rpx;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -58%, 0);
            }
        }
    }
    .rule-box {
        @apply relative rounded-14;
        width: 681rpx;
        // height: 580rpx;
        background: linear-gradient(
            0deg,
            rgba(62, 179, 178, 0.49),
            rgba(30, 71, 119, 0.49)
        );
        box-shadow: 0px 8px 17rpx 0px rgba(20, 42, 69, 0.28),
            0px 0px 11rpx 0px rgba(255, 255, 255, 0.85);
        margin: 28rpx auto 0;
        padding-top: 2rpx;
        .title {
            @apply absolute top-0;
            width: 270rpx;
            height: 40rpx;
            line-height: 40rpx;
            text-align: center;
            background: linear-gradient(
                0deg,
                rgba(62, 179, 178, 0.49),
                rgba(30, 71, 119, 0.49)
            );
            box-shadow: 0px 8rpx 17rpx 0px rgba(20, 42, 69, 0.28),
                0px 0px 11rpx 0px rgba(255, 255, 255, 0.85);
            border-radius: 0px 0px 28rpx 28rpx;
            left: 50%;
            transform: translate3d(-50%, 0, 0);
        }
        .rule {
            width: 610rpx;
            font-size: 22rpx;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            line-height: 28rpx;
            margin: 75rpx auto 0;
            padding-bottom: 30rpx;
        }
    }
</style>
