<template>
    <view class="activity-view">
        <view class="marquee-view"></view>
        <view class="spine-view">
            <view class="bg-circle"></view>
            <Spine
                ref="RefSpin1"
                class="spine-player"
                id="spin1"
                skelName="zhuanpanspin"
                assetsUrl="/static/spinspine/bra/spinwheel/"
                animName="idle"
                @onEvent="aniEvent"
                @onStart="aniStart"
                @onComplete="spin1Complete"
                @onEnd="aniEnd"
            />
            <Spine
                ref="RefSpin2"
                id="spin2"
                class="bgspine-player"
                skelName="zhuanpanspin"
                assetsUrl="/static/spinspine/bra/spinwheel2/"
                animName="idle"
                @onEvent="aniEvent"
                @onStart="aniStart"
                @onComplete="spin2Complete"
                @onEnd="aniEnd"
            />
            <view class="spin-view">
                <view class="spin-price">$ 1.00 MXN</view>
                <view class="spin-btn-bottom" @click="getSpin"></view>
            </view>
            <!-- <view class="spin-btn" @click="getSpin"></view> -->
        </view>
        <view class="deposit-view">
            <view class="spei-view">
                <view class="balance-view">
                    <view class="title">Balance</view>
                    <view class="cash">100 MXN</view>
                </view>
                <view class="spei-code">
                    <view class="title">Spei deposit</view>
                    <view class="cash">1234 1234 1234 1234</view>
                </view>
                <view class="copy-btn btn">COPY</view>
            </view>
            <view class="tips">
                First deposit with 100% bonus up to $10000MXN
            </view>
            <view class="btn-view">
                <view class="btn deposit-btn">WITHDRAW</view>
                <view class="btn deposit-btn">WIN MORE CASH</view>
            </view>
        </view>
        <WheelAlert
            ref="RefWheelAlert"
            :alertType="data.alertType"
            :alertConfig="data.alertConfig"
            @onSuccess="DialogSuccess"
        />
        <LoginPopup ref="RefLogin" />
    </view>
</template>

<script lang="ts" setup>
    import { reactive, ref, onMounted, nextTick } from 'vue'
    import Spine from '@/lib/components/Spine/Spine.vue'
    import WheelAlert from './common/WheelAlert.vue'
    import LoginPopup from '@/lib/components/Popup/LoginPopup.vue'

    interface Props {
        hotGames?: any
    }

    const props = withDefaults(defineProps<Props>(), {
        hotGames: [],
    })

    interface Data {
        title?: string
        spining: boolean
        alertType: number
        alertConfig: any
    }

    const data = reactive<Data>({
        title: 'spinWheel',
        spining: false,
        alertType: 1,
        alertConfig: {},
    })

    const RefSpin1 = ref()
    const RefSpin2 = ref()
    const RefWheelAlert = ref()
    const RefLogin = ref()

    const aniEvent = async (trackIndex, event) => {
        let randomNumber = Math.floor(Math.random() * 5) + 1
        switch (event.data.name) {
            case 'Yellow':
                setSpin(2, randomNumber)
                break
            case 'Green':
                setSpin(2, randomNumber + 5)
                break
            case 'win':
                console.log('win')
                win()
                break
            case 'lose':
                console.log('lose')
                lose()
                break
            default:
            // console.log(
            //     `Event on track ${trackIndex.animation.name}: ${event.data.name}`
            // )
        }
    }

    const aniStart = async (data) => {
        // console.log('Animation on track ' + data.animation.name + ' started')
    }

    const spin1Complete = async (data) => {
        let name = data.animation.name
        switch (name) {
            case 'idle':
                // console.log(name)
                break
            case 'spining':
                // console.log(name)
                break
            case 'stop1-box-Y':
                // console.log(name)
                break
            case 'stop5-box-G':
                // console.log(name)
                break
            default:
                console.log(name)
        }
    }

    const spin2Complete = async (data) => {
        let name = data.animation.name
        switch (name) {
            case 'idle':
                // console.log(name)
                break
            default:
            // console.log(name)
        }
    }

    const aniEnd = async (data) => {
        // console.log('Animation on track ' + data.animation.name + ' ended')
    }

    const dely = async (time) => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(true)
            }, time)
        })
    }

    const getSpin = async () => {
        if (data.spining) return
        reset()
        data.spining = true
        RefSpin1.value.setAnimation('spining', true)
        await dely(3000)

        let randomNumber = Math.floor(Math.random() * 8) + 1
        randomNumber = 3

        setSpin(1, randomNumber)
    }

    const setSpin = (type = 1, id) => {
        if (type === 1) {
            switch (id) {
                case 1:
                    RefSpin1.value.setAnimation('stop1-box-Y', false)
                    break
                case 2:
                    RefSpin1.value.setAnimation('stop2', false)
                    break
                case 3:
                    RefSpin1.value.setAnimation('stop3-fail', false)
                    break
                case 4:
                    RefSpin1.value.setAnimation('stop4', false)
                    break
                case 5:
                    RefSpin1.value.setAnimation('stop5-box-G', false)
                    break
                case 6:
                    RefSpin1.value.setAnimation('stop6', false)
                    break
                case 7:
                    RefSpin1.value.setAnimation('stop7-fail', false)
                    break
                case 8:
                    RefSpin1.value.setAnimation('stop8', false)
                    break
                default:
            }
        } else if (type === 2) {
            switch (id) {
                case 1:
                    RefSpin2.value.setAnimation('Y stop1', false)
                    break
                case 2:
                    RefSpin2.value.setAnimation('Y stop2', false)
                    break
                case 3:
                    RefSpin2.value.setAnimation('Y stop3', false)
                    break
                case 4:
                    RefSpin2.value.setAnimation('Y stop4', false)
                    break
                case 5:
                    RefSpin2.value.setAnimation('Y stop5', false)
                    break
                case 6:
                    RefSpin2.value.setAnimation('G stop1', false)
                    break
                case 7:
                    RefSpin2.value.setAnimation('G stop2', false)
                    break
                case 8:
                    RefSpin2.value.setAnimation('G stop3', false)
                    break
                case 9:
                    RefSpin2.value.setAnimation('G stop4', false)
                    break
                case 10:
                    RefSpin2.value.setAnimation('G stop5', false)
                    break
                default:
            }
        }
    }

    const reset = () => {
        RefSpin1.value.setAnimation('idle', true)
        RefSpin2.value.setAnimation('idle', true)
    }

    const win = () => {
        data.alertType = 1
        data.alertConfig = {
            title: 'Congrats!',
            content: 'You win 100 MXN',
            btnText: 'OK',
        }
        openDialog()
        spinEnd()
    }

    const lose = () => {
        data.alertType = 2
        data.alertConfig = {
            title: 'Good luck',
            content: '',
            btnText: 'Try again',
        }
        openDialog()
        spinEnd()
    }

    const spinEnd = () => {
        data.spining = false
    }

    const DialogSuccess = () => {
        reset()
    }
    const openDialog = () => {
        RefWheelAlert.value.changeIsShow(true)
    }

    // Login Popup
    const openLogin = () => {
        nextTick(() => {
            RefLogin.value.changeIsShow(true)
        })
    }

    onMounted(() => {
        openLogin()
    })
</script>

<style lang="scss">
    .activity-view {
        @apply overflow-hidden;
        min-height: 100%;
        background-color: #0a6855;
    }

    .marquee-view {
        width: 665rpx;
        height: 53rpx;
        background: #114a39;
        border-radius: 50rpx;
        margin: 20rpx auto 0;
    }

    .spine-view {
        @apply relative m-auto float-left;
        width: 730rpx;
        margin-left: 10rpx;

        .bg-circle {
            @apply overflow-hidden;
            width: 690rpx;
            height: 690rpx;
            border-radius: 50%;
            background-color: #114a39;
            margin: 46rpx auto 0;
        }

        .spin-btn {
            @apply absolute overflow-hidden;
            width: 160rpx;
            height: 160rpx;
            border-radius: 50%;
            left: 50%;
            top: calc(50% + 20rpx);
            transform: translate(-50%, -50%);
            z-index: 1000;
        }
    }

    .spine-player,
    .bgspine-player {
        @apply absolute left-0 top-0;
        width: 730rpx;
        height: 730rpx;
        z-index: 10;
    }

    .spine-player {
        z-index: 100;
        top: 26rpx;
    }

    .spin-view {
        @apply absolute;
        width: 358rpx;
        height: 200rpx;
        background-color: #114a39;
        border-radius: 0 0 40rpx 40rpx;
        bottom: 0;
        left: 50%;
        z-index: 1;
        bottom: -110rpx;
        left: 50%;
        transform: translate(-50%);
        .spin-price {
            @apply m-auto text-center truncate box-border;
            background: #0d3f30;
            width: 328rpx;
            height: 80rpx;
            border-radius: 0 0 20rpx 20rpx;
            font-size: 28rpx;
            color: #eefffa;
            line-height: 35rpx;
            padding: 40rpx 10rpx 0;
        }

        .spin-btn-bottom {
            @apply flex justify-center items-center absolute;
            width: 350rpx;
            height: 100rpx;
            border-radius: 74rpx;
            bottom: 8rpx;
            left: 4rpx;
            background: url('@/static/spinwheel/spin.png');
            background-size: 100% 100%;
            &:active {
                transform: scale(0.96);
            }
        }
    }

    .deposit-view {
        @apply box-border float-left relative;
        background: #114a39;
        border-radius: 35rpx;
        padding: 16rpx 28rpx;
        width: 667rpx;
        margin: 140rpx auto 0;
        margin-left: 38rpx;

        .spei-view {
            @apply relative;
            width: 622rpx;
            height: 100rpx;
            background: #0d3f30;
            border-radius: 24rpx;
            overflow: hidden;
            .balance-view {
                @apply flex items-center box-border;
                width: 471rpx;
                height: 54rpx;
                padding: 0 16rpx;
                border-right: 8rpx solid #114a39;
                border-bottom: 8rpx solid #114a39;
                border-radius: 0 0 46rpx 0;
            }

            .spei-code {
                @apply flex items-center;
                height: 45rpx;
                padding: 0 16rpx;
            }

            .copy-btn {
                @apply absolute;
                right: 10rpx;
                top: 14rpx;
                width: 128rpx;
                height: 71rpx;
            }
        }
        .title {
            min-width: 150rpx;
            font-size: 22rpx;
            color: #28725c;
        }
        .cash {
            font-size: 28rpx;
            color: #eefffa;
        }
    }

    .tips {
        font-size: 21rpx;
        color: #34a686;
        line-height: 33rpx;
        text-shadow: 0rpx 1rpx 0rpx #1f6551;
        margin: 8rpx auto;
        text-align: center;
    }

    .btn-view {
        @apply flex items-center justify-between;

        .deposit-btn {
            width: 281rpx;
            height: 83rpx;
        }
    }

    .btn {
        @apply flex justify-center items-center;
        min-height: 71rpx;
        background: linear-gradient(0deg, #018b79, #37b692, #47f4b9);
        border-image: linear-gradient(0deg, #035d7f, #09907c) 1 1;
        box-shadow: 0rpx 6rpx 13rpx 0rpx rgba(0, 0, 0, 0.35),
            0rpx 2rpx 5rpx 0rpx rgba(219, 219, 219, 0.45);
        border-radius: 21rpx;
        font-size: 25rpx;
        color: #022118;
        // opacity: 0.9;
        text-shadow: 0rpx 1rpx 0rpx #88ffd8;

        &:active {
            transform: scale(0.96);
        }
    }
</style>
