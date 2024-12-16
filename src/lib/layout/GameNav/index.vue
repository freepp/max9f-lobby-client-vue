<template>
    <view class="nav" :style="{zIndex}">
        <view class="left-view" @click="clickLeft">
            <img src="@/static/icon/back.png" alt="" />
            <span>{{ $t('KEY_RECORD_BACK') }} </span>
        </view>
        <view
            class="pig-btn pig-btn-sm"
        >
            <view
                class="btn"
                @click="openPop(true, 'signIn')"
                v-html="$t('KEY_SIGNIN_REWARDSCENTER')"
            ></view>
            <img class="pig" src="@/static/icon/jinzhu_icon.png" alt="" />
        </view>
        <!-- <view class="pig-btn" v-else>
            <view
                v-if="data.receiveBonus !== 0"
                class="btn"
                @click="openPop(true, 'betReturn')"
            >
                R$ {{ data.receiveBonus }}
            </view>
            <view v-else class="btn" @click="openPop(true, 'betReturn')">
                {{ $t('KEY_ME_BONUS') }}
            </view>
            <img class="pig" src="@/static/icon/jinzhu_icon.png" alt="" />
        </view> -->

        <view class="btn" @click="openDeposit">
            {{ $t('KEY_TABBAR_DEPOSIT') }}
        </view>
        <view class="right-view" @click="clickRight">
            <span>Atualizar</span>
            <img src="@/static/icon/reload.png" alt="" />
        </view>
        <!-- <view class="bobble" v-if="data.showBobble">
            <view class="triangle"></view>
            <view
                class="w-full h-full flex flex-col items-center"
                v-if="store.baseConfig.operatorId === 'own_lobby_bra3'"
            >
                <view class="title">Saldo Insuficiente</view>
                <view class="content">
                    Recarregue agora e ganhe o dobro do depósito
                </view>
            </view>
            <view class="w-full h-full flex flex-col items-center" v-else>
                <view class="title">{{ $t('KEY_PAGETITLE_DEPOSIT') }} !!!</view>
                <view class="content">
                    {{ $t('KEY_GAME_ALERT') }}
                </view>
            </view>
        </view> -->
        <PopupBottom
            ref="RefBonusPopup"
            :height="data.popupHeight"
            :noBorder="true"
            :zIndex="2036"
            @maskClick="maskClick"
        >
            <view
                class="popup-title global-bg"
                v-html="$t('KEY_SIGNIN_REWARDSCENTER')"
            ></view>
            <view class="scroll-view global-bg">
                <Signin
                    ref="signInRef"
                    v-if="ifSignin"
                    :hasHeader="false"
                ></Signin>
                <!-- <betReturn
                    v-else
                    ref="RefBetReturn"
                    @updateBonus="updateBonus"
                    :page-type="1"
                /> -->
                <!-- <Depost /> -->
            </view>
        </PopupBottom>
        <PopupBottom
            ref="RefPopup"
            :height="data.popupHeight"
            :noBorder="true"
            :zIndex="2036"
            @maskClick="maskClick"
        >
            <view class="popup-title global-bg">
                {{ $t('KEY_TABBAR_DEPOSIT') }}
            </view>
            <view class="scroll-view global-bg">
                <Depost :zIndex="2036" />
            </view>
        </PopupBottom>
    </view>
</template>
<script lang="ts" setup>
    import PopupBottom from '@/lib/components/PopupBottom/index.vue'
    import Depost from './deposit/index.vue'
    // import betReturn from '@/pages/activity_detail/activities/betReturn.vue'
    import Signin from '@/pages/signin/index.vue'

    const store = useUsersStore()

    interface Props {
        appId?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        appId: '',
    })

    const data = reactive<any>({
        popupHeight: 0,
        showBobble: false,
        receiveBonus: 0,
    })
    const signInRef = ref(null)
    const RefDrawer = ref(null)
    const RefPopup = ref()
    const RefBonusPopup = ref()
    const RefBetReturn = ref()

    const ifSignin = ref(false)

    const zIndex = ref(2036) // PopupBottom 默认值是 2035

    const emit = defineEmits(['rightClick', 'popupClose'])

    const clickLeft = () => {
        // let canNavBack = getCurrentPages()
        // if (canNavBack && canNavBack.length > 1) {
        //     uni.navigateBack()
        // } else {
        //0520之前用的代码start
        //history.back()
        //0520之前用的代码end
        //0524临时跳转回首页，实际应该返回上一个url，start
        // window.location.href = "/";
	/* 	 uni.navigateBack({
	delta: 2
}) */
        //  history.go(-2)
        //0524临时跳转回首页，实际应该返回上一个url，end
        // }
        // window.location.href = "/";
        uni.reLaunch({
          url: '/pages/index/index'
        })
    }

    const clickRight = () => {
        emit('rightClick')
    }

    const openDeposit = () => {
        if (store.userInfo?.userMode === 1) {
            uni.navigateTo({
                url: '/pages/login/index?page_type=1&login_mode=2',
            })
        } else {
            openPop(true)
        }
    }

    const openPop = (type, popupName = 'deposit') => {
        if (type) {
          zIndex.value = 0
        }
        const iframe = document.getElementsByTagName('iframe')[0]
        if (iframe) {
            if (type) {
                iframe.style.pointerEvents = 'none'
            } else {
                iframe.style.pointerEvents = 'auto'
            }
        }
        nextTick(() => {
            if (popupName === 'signIn') {
                if (store.userInfo?.userMode === 2) {
                    ifSignin.value = true
                    RefBonusPopup.value.changeIsShow(type)
                } else {
                    uni.navigateTo({
                        url: '/pages/login/index',
                    })
                }
            } else if (popupName === 'betReturn') {
                RefBetReturn.value.getRebateList()
                RefBonusPopup.value.changeIsShow(type)
            } else {
                RefPopup.value.changeIsShow(type)
            }
        })
    }

    const maskClick = () => {
        ifSignin.value = false
        zIndex.value = 2036
        const iframe = document.getElementsByTagName('iframe')[0]
        if (iframe) {
            iframe.style.pointerEvents = 'auto'
        }
        emit('popupClose')
    }

    const updateBonus = (bonus) => {
        data.receiveBonus = bonus ? bonus : 0
    }

    defineExpose({
        openDeposit,
        clickLeft,
    })

    onMounted(() => {
        let systemInfo = uni.getSystemInfoSync()
        let safeWidth = systemInfo.safeArea.width
        if (systemInfo.windowWidth > 960) {
            safeWidth = 375
        }
        let rpx = systemInfo.safeArea.height * (750 / safeWidth)
        data.popupHeight = rpx

        nextTick(() => {
            // const iframe = document.getElementsByTagName('iframe')[0]
            // if (store.userInfo?.cash === 0) {
            //     data.showBobble = true
            //     if (iframe) {
            //         iframe.style.pointerEvents = 'none'
            //     }
            // }
            // document.addEventListener(
            //     'click',
            //     (e) => {
            //         const target = e.target as HTMLElement
            //         let dropdownView =
            //             document.getElementsByClassName('bobble')[0]
            //         if (!dropdownView) return
            //         if (!dropdownView.contains(target)) {
            //             data.showBobble = false
            //             if (iframe) {
            //                 iframe.style.pointerEvents = 'auto'
            //             }
            //         }
            //     },
            //     true
            // )
        })
    })
</script>
<style lang="scss">
    .nav {
        @apply flex justify-between items-center;
        background: #000000;
        color: #ffffff;
        height: 86rpx;
        padding: 0 18rpx;
        position: relative;
    }

    .left-view,
    .right-view {
        @apply flex items-center;
        min-width: 120rpx;
        span {
            margin: 0 10rpx;
        }
        img {
            height: 38rpx;
        }
    }

    .right-view {
        @apply justify-end;
    }
    .btn {
        @apply flex justify-center items-center bg-primary;
        width: 190rpx;
        height: 50rpx;
        border-radius: 10rpx;
        font-size: 25rpx;
        color: #ffffff;
    }
    .pig-btn {
        @apply relative flex items-center;
        width: 230rpx;
        height: 80rpx;
        img {
            @apply absolute;
            right: 0;
            top: 0;
            width: 63rpx;
        }
        .btn {
        }
    }
    .pig-btn-sm {
        .btn {
            @apply box-border;
            padding: 0rpx 18rpx;
            font-size: 22rpx;
            line-height: 25rpx;
            text-align: center;
        }
    }

    .popup-title {
        @apply flex items-center justify-center text-white-100;
        font-size: 33rpx;
        font-weight: bold;
        height: 98rpx;
        border-bottom: 2rpx solid #454545;
    }
    .scroll-view {
        @apply absolute left-0 right-0 bottom-0 overflow-y-auto;
        top: 100rpx;
    }
    .bobble {
        @apply absolute box-border flex flex-col items-center;
        top: -260rpx;
        left: 50%;
        transform: translate(-50%);
        width: 650rpx;
        height: 240rpx;
        background-color: #fff;
        border-radius: 8rpx;
        color: #646768;
        padding: 20rpx;
        box-shadow: 0px 9rpx 20rpx 0rpx rgba(0, 0, 0, 0.14);
        z-index: 1000;
        color: #000000;
        .title {
            font-size: 38rpx;
            font-weight: bold;
        }
        .content {
            @apply text-center;
            width: 600rpx;
            font-size: 32rpx;
            line-height: 38rpx;
            margin-top: 28rpx;
        }
        .triangle {
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            bottom: 2rpx;
        }

        .triangle::before {
            content: '';
            position: absolute;
            top: -0;
            left: -12rpx;
            width: 0;
            height: 0;
            border-top: 12rpx solid #fff;
            border-right: 16rpx solid transparent;
            border-bottom: 0 solid transparent;
            border-left: 16rpx solid transparent;
        }
    }
    .global-bg {
        background: var(--UI-BG);
    }
</style>
