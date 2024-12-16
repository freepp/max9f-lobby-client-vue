<template>
    <view id="mask_modal"></view>
    <view class="loading" v-if="data.isLoading">
        <Loading />
    </view>
   <view class="success-view" v-else>
       <view class="header-top">
                   <uni-nav-bar class="nav-bar" :left-icon="'left'" color="#FFFFFF" background-color="var(--UI-BG)" :border="true" @clickLeft="clickLeft">
                       <view v-if="store.baseConfig.imgBaseUrl" class="logo" @click="goHome">
                           <img :src="getLogoUrl('burger_top.png', store.baseConfig)" alt="" />
                       </view>
                   </uni-nav-bar>
       </view>
       <view class="success-content">
           <view class="success-banner">
               <img src="@/static/success/banner.png" alt="">
           </view>
           <view class="banner-tip">
               <img src="@/static/success/banner_tips.png" alt="">
           </view>
           <view class="items">
               <view class="item" :class="{'active': index === data.curIndex}" v-for="(item, index) in data.list" :key="index" @click="selected(index)">
                   <view class="item-txt">
                       <view class="item-txt-name">Depositar</view>
                       <view class="item-txt-price">R$ {{item.amount}}</view>
                   </view>
                   <view class="item-txt">
                       <view class="item-txt-name">BónusExtra</view>
                       <view class="item-txt-price special">R$ {{item.bonus}}</view>
                   </view>
                   <img src="@/static/icon/checked_float.png" class="selected-img-b">
                   <img v-if="item.isSelected" src="@/static/success/melhor_valor.png" class="selected-img-valor">
               </view>
           </view>
           <view class="tips-txt">
               <view class="tips-txt-content">
                   <view class="tip-title">{{$t("KEY_BONUS_TITLE")}}</view>
                   <view class="tip-paragraph" v-for="(item,index) in data.tipList" :key="index">
                       <text class="paragraph-num">{{index+1}}</text>
                       <view v-html="item"></view>
                   </view>
               </view>
           </view>
       </view>
       <view class="success-btns">
           <button v-if="!data.btnloading" class="success-btn" @click="confirm">{{$t('KEY_PAGETITLE_DEPOSIT')}}</button>
           <view v-else class="success-btn active">
            <img src="@/static/icon/button_loading.gif" alt="" />
        </view>
       </view>
       <PopupBottom ref="RefPopup" :height="data.popupHeight" :background="'var(--UI-BG)'" :noBorder="true" @mask-click="maskClose" >
            <view class="popup-title">
                {{ $t('KEY_TABBAR_DEPOSIT') }}
            </view>
            <view class="scroll-view" v-if="data.pixCode !== ''">
                <qrCode :amount="data.amount" :pixCode="data.pixCode" />
            </view>
        </PopupBottom>
    </view>
</template>
<script lang="ts" setup>
    import { getLogoUrl } from '@/common/common'
    import Loading from '@/lib/components/Loading.vue'
    import PopupBottom from '@/lib/components/PopupBottom/index.vue'
    import qrCode from '@/lib/components/Pay/channel/PIX/qrCode.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { getAFid,queryURLParams } from '@/common/common'

    const { t: $t } = i18n.global

    const store = useUsersStore()
    const RefPopup = ref()
    const data = reactive<any>({
        list: [],
        curIndex: 2,
        isLoading: true,
        tipList: [
            $t(`KEY_BONUS_TH1`),
            $t(`KEY_BONUS_TH2`),
            $t(`KEY_BONUS_TH3`),
            $t(`KEY_BONUS_TH4`),
            $t(`KEY_BONUS_TH5`),
        ],
        pixCode: '',
        qrcode: '',
        channels: 5,
        bonusChoosed: 1,
        alertConfig: {},
        popupHeight: 0,
        amount: 0,
        alertType: 1,
        btnloading: false,
    })
    const selected = (index) => {
        data.curIndex = index
    }
    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )
    const initData = () => {
        if (store.userInfo?.userId) {
            let params = Object.assign(
                { userId: store.userInfo?.userId },
                store.commonParams
            )
            lobbyApi.bonus
                .GetPayAmounts(params)
                .then((res) => {
                    if (res.result) {
                        data.list = res.result.filter(
                            (item, index) => index < 4
                        )
                        const curIndex = data.list.findIndex(
                            (item) => item.isSelected
                        )
                        if (curIndex > -1) {
                            data.curIndex = curIndex
                        }
                    }
                })
                .finally(() => {
                    data.isLoading = false
                })
        }
    }
    const clickLeft = () => {
        let canNavBack = getCurrentPages()
        if (canNavBack && canNavBack.length > 1) {
            uni.navigateBack({
                delta: 1,
                // fail: () => {
                //     uni.reLaunch({
                //         url: '/pages/index/index'
                //     });
                // }
            })
        } else {
            history.back()
        }
    }
    onMounted(() => {
        let systemInfo = uni.getSystemInfoSync()
        if (systemInfo.windowWidth > 960) {
          data.popupHeight = systemInfo.safeArea.height * 2
        } else {
          data.popupHeight = systemInfo.safeArea.height * (750 / systemInfo.safeArea.width)
        }
    })
    onShow(async () => {
        initData()
    })
    const maskClose = () => {
        data.pixCode = ''
    }
    const getCookie = (cookieName) => {
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            const cookieParts = cookie.split('=')
            const name = decodeURIComponent(cookieParts[0])
            if (name === cookieName) {
                if (cookieParts.length === 2) {
                    const value = decodeURIComponent(cookieParts[1])
                    return value
                }
            }
        }
    }

    const goHome = () => {
        uni.switchTab({
            url: '/',
        })
    }

    const confirm = () => {

        pixDeposit()
    }
    const pixDeposit = async () => {
        if (!store.isLogin) {
            LoginRegisterDialog()
            return
        }
        data.btnloading = true
        var urlParams = queryURLParams()
        var fbc = getCookie('_fbc')
        var fbp = getCookie('_fbp')
        var bbg = urlParams.bbg || getCookie('_bge_bbg')
        let meta = {
            // clickid: localStorage.getItem('click_id'),
            clickid: uni.getStorageSync('click_id'),
            AFID: getAFid(),
            fbc: fbc,
            fbp: fbp,
            bbg: bbg
        }
        // @ts-ignore
        if (window.android) {
            // @ts-ignore
            meta.AFID = window.android.requestValue('AFID', '')
            console.log(meta.AFID)
        }
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                channels: data.channels,
                amount: data.list[data.curIndex].amount,
                receiveBonus: data.bonusChoosed,
                meta,
            },
            store.commonParams
        )
        let res = await lobbyApi.profile.braDeposit(params)
        if (res.success) {
            data.pixCode = res.result.qrCode
            data.amount = data.list[data.curIndex].amount
            openPop(true)
        } else {
            ErrorHandler(res, 'pixDeposit')

            data.alertType = 2
            data.alertConfig = {
                title: `${$t('KEY_MESSAGE_ERRORCODE17')}`,
                content: res.message,
                btnText: `${$t('KEY_COMMON_OK')}`,
            }
            openDialog(res)
        }
        data.btnloading = false
    }
    const openPop = (type) => {
        RefPopup.value.changeIsShow(type)
    }
    const openDialog = (res: any) => {
        const type = data.alertType === 2 ? 'warning' : 'success'
        let content = data.alertConfig.content
        if (res.code === 'RS_PAY_ERROR') {
          content = $t('KEY_RS_PAY_ERROR')
        }
        modal({
            type,
            width: '485rpx',
            title: data.alertConfig.title,
            content,
            confirmText: data.alertConfig.btnText,
            showCancel: false,
        })
    }

    const LoginRegisterDialog = () => {
        modal({
            width: '485rpx',
            type: 'guest',
            zIndex: 201,
            title: $t('KEY_PAY_POPMESSAGE2'),
            content: $t('KEY_PAY_POPMESSAGE3'),
            confirmText: $t('KEY_FORMBTN_LOGIN'),
            cancelText: $t('KEY_FORMBTN_REGISTER'),
            maskClosable: false,
            onConfirm() {
                uni.navigateTo({
                    url: `../../pages/login/index?login_mode=2`,
                })
            },
            onCancel() {
                uni.navigateTo({
                    url: `../../pages/register/index?login_mode=2`,
                })
            },
        })
    }

</script>
<style lang="scss">
    .nav-bar {
        @apply box-border;
    }
    ::v-deep .uni-navbar__header {
        @apply box-border;
        border-bottom: 1px solid rgba(69, 69, 69, var(--tw-border-opacity));
        height: 88rpx !important;
    }
    ::v-deep .uni-navbar--border {
        border-bottom-color: var(--UI-BG) !important;
    }
</style>
<style scoped lang="scss">
    .success-view {
        width: 100%;
        height: 100%;
        .header-top {
            width: 100%;
            height: 88rpx;
            background-color: var(--UI-BG);
            .logo {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                img {
                    width: 242rpx;
                    height: 44rpx;
                }
            }
        }
        .success-content {
            width: 100%;
            height: calc(100% - 156rpx - 88rpx);
            background: var(--UI-BG);
            overflow-y: auto;
            .success-banner {
                width: 100%;
                height: 365.28rpx;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .banner-tip {
                width: 100%;
                height: 172.36rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top: 30rpx;
                img {
                    width: 648.61rpx;
                    height: 142.36rpx;
                }
            }
            .items {
                width: calc(100% - 62rpx);
                padding: 0 31rpx;
                height: 364.42rpx;
                display: flex;
                align-items: flex-end;
                justify-content: center;
                .item {
                    box-sizing: border-box;
                    position: relative;
                    width: 160rpx;
                    height: 304rpx;
                    padding: 0rpx;
                    background: #333333;
                    border-radius: 21rpx;
                    margin-right: 16.67rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    border: 2rpx solid;
                    // border-color: rgba(69, 69, 69, var(--tw-border-opacity));
                    border-color: rgba(69, 69, 69, 0);
                    &:last-child {
                        margin-right: 0;
                    }
                    .item-txt {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        font-family: Arial;
                        font-weight: 400;
                        font-size: 28rpx;
                        margin-bottom: 20rpx;
                        &:last-child {
                            margin-bottom: 0;
                        }
                        .item-txt-name {
                            // word-break: break-all;
                            margin-bottom: 15rpx;
                        }
                        .item-txt-price {
                            font-size: 36rpx;
                            color: #ffb900;
                            &.special {
                                color: #36d000;
                            }
                        }
                    }
                    .selected-img-b {
                        @apply absolute right-0 bottom-0;
                        right: -2rpx;
                        bottom: -2rpx;
                        width: 31rpx;
                        height: 31rpx;
                        display: none;
                    }
                    .selected-img-valor {
                        @apply absolute top-0 right-0;
                        width: 87.5rpx;
                        height: 90.28rpx;
                        top: -50rpx;
                        right: -28rpx;
                        // display: none;
                    }
                    &.active {
                        background: #5D000E;
                        border-color: var(--primary-color);
                        .selected-img-b {
                            display: inline;
                        }
                        .selected-img-valor {
                            // display: inline;
                        }
                    }
                }
            }
            .tips-txt {
                width: calc(100% - 62rpx);
                padding: 0 31rpx;
                margin: 25.69rpx 0;
                .tips-txt-content {
                    width: calc(100% - 70.84rpx);
                    background: #0e0e0f;
                    border-radius: 21rpx;
                    border: 2rpx solid #31302f;
                    padding: 0 35.42rpx;
                    padding-bottom: 33.33rpx;
                    .tip-title {
                        text-align: center;
                        font-family: Arial;
                        font-weight: 400;
                        font-size: 42rpx;
                        color: #b4b4b4;
                        padding: 40.28rpx 0 25rpx 0;
                    }
                    .tip-paragraph {
                        font-family: Arial;
                        font-weight: 400;
                        font-size: 26rpx;
                        color: #b4b4b4;
                        line-height: 1.5;
                        display: flex;
                        margin-bottom: 37.5rpx;
                        &:last-child {
                            margin-bottom: 0;
                        }
                    }
                }
                .paragraph-num {
                    color: #ffb900;
                }
            }
        }
        .success-btns {
            width: 100%;
            height: 156rpx;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            .success-btn {
                padding: 0;
                margin: 0;
                width: 600rpx;
                height: 78rpx;
                background-color: var(--primary-color);
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                &.active {
                    opacity: 0.4;
                }
            }
        }
    }
    .loading {
        @apply w-full flex justify-center items-center;
        height: 100%;
    }
    .success-btn {
        img {
            width: 50rpx;
            height: 50rpx;
        }
    }
    .popup-title {
        @apply flex items-center justify-center text-white-100;
        font-size: 33rpx;
        font-weight: bold;
        height: 100rpx;
    }
    .scroll-view {
        @apply absolute left-0 right-0 bottom-0 overflow-y-auto;
        top: 100rpx;
    }
</style>
