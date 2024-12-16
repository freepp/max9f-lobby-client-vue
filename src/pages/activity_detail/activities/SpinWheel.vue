<template>
    <view class="spin-scroll">
        <view class="spine-box">
            <Spine
                ref="spineRef"
                id="red_package"
                class="spine-player"
                skelName="1.7depositwheelspine"
                :assetsUrl="`./static/spinspine/bra/spinwheel1.7/`"
                animName="animation1_wheel idle"
                @on-complete="end"
            ></Spine>
            <view
                v-if="data.isShowPower"
                class="sortear-number"
                @click="rollIt"
            >
                {{ data.rollNum > 99 ? '99+' : data.rollNum }}
                <p>GIRAR</p>
            </view>
            <view class="spine-bg">
                <img class="ad" src="@/static/activity/spin-ad.png" alt="" />
            </view>
            <view class="btn">
                <img
                    src="@/static/activity/spin-btn.png"
                    @click="goDeposit"
                    alt=""
                />
            </view>
        </view>
        <view class="spin-tips">
            <view class="title">{{ $t('KEY_ACTIVITY_SPINWHEEL_RULES') }}</view>
            <view
                class="content"
                v-html="$t('KEY_ACTIVITY_SPINWHEEL_CONTENT')"
            ></view>
        </view>
        <WheelAlert
            ref="RefWheelAlert"
            :alertType="data.alertType"
            :alertConfig="data.alertConfig"
            @onSuccess="DialogSuccess"
        />
    </view>
</template>
<script lang="ts" setup>
    import Spine from '@/lib/components/Spine/Spine.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import WheelAlert from './common/WheelAlert.vue'
    // import { getLogoUrl } from '@/common/common'

    const { t: $t } = i18n.global
    const store = useUsersStore()
    const commonStore = useCommonStore()
    const spineRef = ref(null)

    interface Data {
        alertType: number
        alertConfig: any
        isShowPower: boolean
        position: number
        rollNum: number
    }

    const data = reactive<Data>({
        alertType: 1,
        alertConfig: {},
        isShowPower: true,
        position: -1,
        rollNum: 0,
    })

    const RefWheelAlert = ref()

    let animationList = [
        'animation1_wheel idle',
        'animation2_wheel spin touch',
        'animation3_wheel spin idle',
        'animation4_wheel spin slow_#animation#',
        'animation5_wheel win_#animation#',
    ]
    let fetching = false
    let rolling = false
    let animationIndex = 0
    let isEmit = false

    const getAnimationType = (position): string => {
        switch (position) {
            case 1:
                return '3(GOODLUCK)'
            case 2:
                return '4(R$500)'
            case 3:
                return '3(GOODLUCK)'
            case 4:
                return '4(R$100)'
            case 5:
                return '3(GOODLUCK)'
            case 6:
                return '2(R$10)'
            case 7:
                return '3(GOODLUCK)'
            case 8:
                return '1(R$5)'
        }
    }
    const end = async () => {
        // 不自动旋转
        if (animationIndex === 0) {
            return
        }
        // 接口结果未返回 不进行下一个动画
        if (fetching) {
            return
        }
        // 整个动画结束后 不再进行动画切换
        if (animationIndex > animationList.length - 1) {
            rolling = false
            if (!isEmit) {
                isEmit = true
            }
            RefWheelAlert.value.changeIsShow(true)
            return
        }
        if (animationIndex === 3) {
            await raffle()
        }
        const typeStr = getAnimationType(data.position)
        const animation = animationList[animationIndex].replace(
            '#animation#',
            typeStr
        )
        spineRef.value.setAnimation(animation)
        animationIndex++
    }

    const reset = () => {
        fetching = false
        data.position = -1
        rolling = false
        animationIndex = 0
        isEmit = false
        spineRef.value.setAnimation(animationList[0])
    }
    const rollIt = () => {
        // 禁止连续抽奖
        if (rolling) {
            return
        }
        // 没抽奖次数禁止抽奖
        if (data.rollNum <= 0) {
            openDepositPopup()
            return
        }
        reset()
        rolling = true
        data.rollNum--
        animationIndex++
        end()
    }

    const DialogSuccess = () => {
        reset()
    }

    const openDepositPopup = () => {
        modal({
            type: 'gift',
            width: '485rpx',
            title: 'SPIN & WIN',
            content: $t('KEY_ACTIVITY_SPINWHEEL_DEPOSIT'),
            showCancel: false,
            confirmText: $t('KEY_COMMON_DEPOSIT'),
            maskClosable: true,
            onConfirm() {
                commonStore.depositTab = 0
                uni.switchTab({
                    url: '/pages/deposit/index',
                })
            },
        })
    }

    const setWinPopupConfig = (bonus) => {
        data.alertType = 1
        data.alertConfig = {
            title: $t('KEY_ACTIVITY_SPINWHEEL_WIN'),
            content: `R$ ${bonus}`,
            btnText: 'OK',
        }
    }

    const setLosePopupConfig = () => {
        data.alertType = 2
        data.alertConfig = {
            title: $t('KEY_ACTIVITY_SPINWHEEL_LOSE'),
            content: $t('KEY_ACTIVITY_SPINWHEEL_TRYAGAIN'),
            btnText: 'OK',
        }
    }

    const goDeposit = () => {
        commonStore.depositTab = 0
        uni.switchTab({
            url: '/pages/deposit/index',
        })
    }

    const getSpinLoad = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.rouletteNew.load(params)
        if (res.success) {
            data.rollNum = res.result.user?.spinNum
        } else {
            ErrorHandler(res, 'getSpinLoad')
        }
    }

    const raffle = async () => {
        fetching = true
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.rouletteNew.raffle(params)
        if (res.success) {
            data.position = res.result.reward?.position
            if (
                res.result.reward?.rewardType === 2 &&
                res.result.reward?.position !== 1
            ) {
                setWinPopupConfig(res.result.reward?.bonus)
            } else {
                setLosePopupConfig()
            }
        } else {
            ErrorHandler(res, 'raffle')
        }
        fetching = false
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    const initData = () => {
        if (store.userInfo) {
            getSpinLoad()
        }
    }

    onMounted(() => {
        initData()
    })
</script>
<style lang="scss">
    .spin-scroll {
        @apply overflow-hidden;
        background-image: url('@/static/activity/beijing.jpg');
        background-size: 100% auto;
        background-repeat: repeat-y;
    }
    .yellow {
        color: #ffd800;
    }
    .spine-box {
        @apply w-full relative;
        height: 880rpx;
        margin-top: 43rpx;
        .spine-player {
            width: 1380rpx;
            height: 1380rpx;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
        }
        .sortear-number {
            @apply flex flex-col justify-center items-center;
            width: 155rpx;
            height: 155rpx;
            font-size: 50rpx;
            font-weight: bold;
            color: #ffffff;
            line-height: 50rpx;
            text-shadow: 0px 1px 0px #d6ffc9;
            position: absolute;
            left: 50%;
            top: 440rpx;
            text-align: center;
            transform: translate3d(-50%, -60%, 0);
            p {
                font-size: 32rpx;
                // margin-top: 10rpx;
            }
            & {
              text-shadow: 0px 1px 0px #d6ffc9,
                  0px 10px 10px rgba(51, 4, 82, 0.39);
              color: #174a00;
              z-index: 20;
            }
        }
        .spine-bg {
            @apply absolute;
            top: 440rpx;
            left: 50%;
            transform: translate(-50%, 0);
            width: 558rpx;
            height: 460rpx;
            border: 2px solid rgba(116, 255, 240, 0.8);
            border-radius: 14rpx;
            img {
                @apply w-full;
            }
            .ad {
                @apply absolute;
                width: 400rpx;
                bottom: 70rpx;
                left: 50%;
                transform: translate(-50%, 0);
            }
        }
        .btn {
            @apply absolute;
            width: 510rpx;
            top: 840rpx;
            left: 50%;
            transform: translate(-50%, 0);
            z-index: 200;
            img {
                @apply w-full;
            }
        }
    }
    .spin-tips {
        @apply box-border;
        width: 667rpx;
        background: rgba(43, 28, 22, 0.4);
        border: 2rpx solid rgba(116, 255, 240, 0.8);
        margin: 100rpx auto 40rpx;
        border-radius: 8rpx;
        padding: 32rpx;
        .title {
            font-size: 33rpx;
            font-weight: bold;
            text-align: center;
            margin-bottom: 22rpx;
        }
        .content {
            font-size: 24rpx;
            color: #ffffff;
            line-height: 26rpx;
            opacity: 0.7;
            ::v-deep p {
                margin-bottom: 10rpx;
            }
        }
    }
</style>
