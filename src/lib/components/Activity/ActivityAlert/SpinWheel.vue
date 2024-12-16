<template>
    <view class="spine-view">
        <view class="bg-circle"></view>
        <Spine
            ref="RefSpin1"
            class="spine-player"
            id="spin1"
            skelName="zhuanpanspin"
            :assetsUrl="`/static/spinspine/bra/spinwheel/`"
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
            skelName="zhuanpanspin_2"
            :assetsUrl="`/static/spinspine/bra/spinwheel2/`"
            animName="idle"
            @onEvent="aniEvent"
            @onStart="aniStart"
            @onComplete="spin2Complete"
            @onEnd="aniEnd"
        />
        <Spine
            ref="RefSpin4"
            id="spin4"
            class="coinspine-player"
            skelName="coin_idle"
            :assetsUrl="`/static/spinspine/bra/coin_idle/`"
            animName="coin_idle"
            @onEvent="aniEvent"
            @onStart="aniStart"
            @onComplete="spin2Complete"
            @onEnd="aniEnd"
        />
        <view class="spin-view">
            <view class="spin-price">
                {{ data.rouletteUserData.freespin }}
                {{ $t('KEY_SPINWHEEL_FREESPIN') }}
            </view>
        </view>

        <!-- <view
            v-if="store.baseConfig.countryId === 'MEX'"
            class="spin-btn-bottom"
            @click="getSpin"
        ></view>
        <view v-else class="spin-btn-bottom btn-bra" @click="getSpin"></view> -->
        <view class="spin-btn" @click="getSpin"></view>
    </view>
    <view class="btnspine-view">
        <Spine
            ref="RefSpin3"
            id="spin3"
            class="btnspine-player"
            skelName="button_spine"
            :assetsUrl="`/static/spinspine/bra/button_idle/`"
            animName="button_idle"
            @onEvent="aniEvent"
            @onStart="aniStart"
            @onComplete="spin2Complete"
            @onEnd="aniEnd"
        />
        <view class="spin-btn-hidden" @click="getSpin"></view>
    </view>

    <WheelAlert
        ref="RefWheelAlert"
        :alertType="data.alertType"
        :alertConfig="data.alertConfig"
        @onSuccess="DialogSuccess"
    />
    <WheelGameAlert ref="RefWheelGame" :rouletteGame="data.rouletteGame" />
    <WheelPayAlert ref="RefWheelPay" />
    <LoginPopup ref="RefLogin" />
</template>

<script lang="ts" setup>
    import { reactive, ref, onMounted, nextTick, watch } from 'vue'
    import Spine from '@/lib/components/Spine/Spine.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import WheelAlert from '../common/WheelAlert.vue'
    import WheelPayAlert from '../common/WheelPayAlert.vue'
    import LoginPopup from '@/lib/components/Popup/LoginPopup.vue'
    import WheelGameAlert from '../common/WheelGameAlert.vue'
    import { i18n } from '@/common/i18nConfig'
    const { t: $t } = i18n.global
    import { useUsersStore } from '@/store/userStore'

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
        baseData: any
        spinResult: any
        rouletteGame: any
        rouletteUserData: any
    }

    const data = reactive<Data>({
        title: 'spinWheel',
        spining: false,
        alertType: 1,
        alertConfig: {},
        baseData: [],
        spinResult: {},
        rouletteGame: [],
        rouletteUserData: {},
    })

    const store = useUsersStore()

    const RefSpin1 = ref()
    const RefSpin2 = ref()
    const RefSpin3 = ref()
    const RefWheelAlert = ref()
    const RefWheelGame = ref()
    const RefWheelPay = ref()
    const RefLogin = ref()

    const aniEvent = async (trackIndex, event) => {
        // let randomNumber = Math.floor(Math.random() * 5) + 1
        let spinResult: any = {}
        if (
            event.data.name === 'Yellow' ||
            event.data.name === 'Green' ||
            event.data.name === 'win' ||
            event.data.name === 'lose'
        ) {
            spinResult = data.spinResult.roulette.item
                ? data.spinResult.roulette.item
                : data.spinResult.roulette
        }

        switch (event.data.name) {
            case 'Yellow':
                setSpin(2, spinResult.position)
                break
            case 'Green':
                setSpin(2, spinResult.position)
                break
            case 'win':
                console.log('win')
                win(spinResult)
                break
            case 'lose':
                console.log('lose')
                lose(spinResult)
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
        RefSpin3.value.setAnimation('button_idle2', false)
        if (store.userInfo?.userMode === 1) {
            openLogin()
            return
        }
        if (data.spining) return
        reset()
        data.spining = true
        RefSpin1.value.setAnimation('spining', true)

        await roulettes()
        // let randomNumber = Math.floor(Math.random() * 8) + 1
        // randomNumber = 3
        // setSpin(1, randomNumber)
    }

    const setSpin = (type = 1, id) => {
        if (type === 1) {
            switch (id) {
                case 5:
                    RefSpin1.value.setAnimation('stop1-box-Y', false)
                    break
                case 6:
                    RefSpin1.value.setAnimation('stop2', false)
                    break
                case 7:
                    RefSpin1.value.setAnimation('stop3-fail', false)
                    break
                case 8:
                    RefSpin1.value.setAnimation('stop4', false)
                    break
                case 1:
                    RefSpin1.value.setAnimation('stop5-box-G', false)
                    break
                case 2:
                    RefSpin1.value.setAnimation('stop6', false)
                    break
                case 3:
                    RefSpin1.value.setAnimation('stop7-fail', false)
                    break
                case 4:
                    RefSpin1.value.setAnimation('stop8', false)
                    break

                default:
            }
        } else if (type === 2) {
            switch (id) {
                case 14:
                    RefSpin2.value.setAnimation('Y stop1', false)
                    break
                case 15:
                    RefSpin2.value.setAnimation('Y stop2', false)
                    break
                case 16:
                    RefSpin2.value.setAnimation('Y stop3', false)
                    break
                case 17:
                    RefSpin2.value.setAnimation('Y stop4', false)
                    break
                case 18:
                    RefSpin2.value.setAnimation('Y stop5', false)
                    break
                case 13:
                    RefSpin2.value.setAnimation('G stop1', false)
                    break
                case 12:
                    RefSpin2.value.setAnimation('G stop2', false)
                    break
                case 11:
                    RefSpin2.value.setAnimation('G stop3', false)
                    break
                case 10:
                    RefSpin2.value.setAnimation('G stop4', false)
                    break
                case 9:
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

    const win = (result) => {
        data.alertType = 1
        data.alertConfig = {
            title: `${$t('KEY_SPINWHEEL_CONGRATS')}`,
            content: `${$t('KEY_SPINWHEEL_YOUWIN')} ${result.multiple} BRL`,
            btnText: `${$t('KEY_COMMON_OK')}`,
        }
        openDialog()
        spinEnd()
    }

    const lose = (result) => {
        data.alertType = 2
        data.alertConfig = {
            title: `${$t('KEY_SPINWHEEL_GOODLUCK')}`,
            content: '',
            btnText: `${$t('KEY_SPINWHEEL_TRYAGAIN')}`,
        }
        openDialog()
        spinEnd()
    }

    const spinEnd = () => {
        data.spining = false
    }

    const DialogSuccess = () => {
        if (data.spinResult.isPayTip) {
            RefWheelPay.value.changeIsShow(true)
        }
        RefSpin3.value.setAnimation('button_idle', true)
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

    const getRouletteUser = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.activitys.getRouletteUser(params)
        if (res.success) {
            if (res.result) {
                data.rouletteUserData = res.result
            }
        } else {
            ErrorHandler(res, 'getRouletteUser')
            return null
        }
    }

    const rouletteBaseData = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.activitys.rouletteBaseData(params)
        if (res.success) {
            data.baseData = res.result
        } else {
            ErrorHandler(res, 'rouletteBaseData')
        }
    }

    const roulettes = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.activitys.roulettes(params)
        if (res.success) {
            let result = res.result
            setSpin(1, result.roulette.position)
            data.rouletteUserData.freespin = result.user.freespin
            data.spinResult = result
            store.userInfo.cash = result.user.balance
        } else {
            console.log(store.userInfo?.cash)
            if (store.userInfo?.cash < 1) {
                RefWheelPay.value.changeIsShow(true)
            } else {
                RefWheelGame.value.changeIsShow(true)
            }

            reset()
            spinEnd()
            ErrorHandler(res, 'roulettes')
        }
    }

    const rouletteGames = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.activitys.rouletteGames(params)
        if (res.success) {
            if (res.result) {
                let result = res.result
                data.rouletteGame = res.result
            }
        } else {
            ErrorHandler(res, 'rouletteGames')
            return null
        }
    }

    // watch(
    //     () => store.userInfo,
    //     (val) => {
    //         initData()
    //     }
    // )

    const initData = () => {
        if (store.userInfo) {
            getRouletteUser()
            rouletteBaseData()
            rouletteGames()
        }
    }

    onMounted(() => {
        // initData()
    })

    defineExpose({
        initData,
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
        @apply relative float-left;
        width: 680rpx;
        margin-top: 10rpx;

        .bg-circle {
            @apply overflow-hidden;
            width: 640rpx;
            height: 640rpx;
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
    .bgspine-player,
    .coinspine-player {
        @apply absolute left-0 top-0;
        width: 680rpx;
        height: 680rpx;
        z-index: 10;
    }

    .spine-player {
        z-index: 100;
        top: 26rpx;
    }

    .coinspine-player {
        z-index: 101;
        top: -30rpx;
        left: 20rpx;
        width: 750rpx;
        height: 750rpx;
    }

    .btnspine-view {
        @apply relative;
        width: 525.69rpx;
        height: 331.7rpx;
        margin-top: 60rpx;
        margin-left: 155rpx;
        .btnspine-player {
            @apply w-full h-full;
        }
        .spin-btn-hidden {
            @apply absolute;
            left: 0;
            top: 0;
            width: 372rpx;
            height: 130rpx;
        }
    }
    .spin-view {
        @apply absolute;
        width: 358rpx;
        height: 100rpx;
        background-color: #114a39;
        border-radius: 0 0 40rpx 40rpx;
        bottom: 0;
        left: 50%;
        z-index: 1;
        bottom: -40rpx;
        transform: translate(-50%);
        .spin-price {
            @apply m-auto text-center truncate box-border;
            background: #0d3f30;
            width: 328rpx;
            height: 80rpx;
            border-radius: 0 0 20rpx 20rpx;
            font-size: 32rpx;
            font-weight: bold;
            color: #eefffa;
            line-height: 35rpx;
            padding: 30rpx 10rpx 0;
        }
    }

    .spin-btn-bottom {
        @apply flex justify-center items-center absolute;
        width: 410rpx;
        height: 117rpx;
        border-radius: 74rpx;
        bottom: -200rpx;
        left: 135rpx;
        // transform: translate(-50%);
        background: url('@/static/spinwheel/spin.png');
        background-size: 100% 100%;
        &:active {
            transform: scale(0.96);
        }
    }

    .btn-bra {
        background: url('@/static/spinwheel/spin-pt.png');
        background-size: 100% 100%;
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
