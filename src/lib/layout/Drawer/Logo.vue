<template>
    <view class="logo-view">

        <view class="logo" @click="goHome">
            <img
                v-if="store.baseConfig.imgBaseUrl"
                :src="getLogoUrl('burger_top.png', store.baseConfig)"
                alt=""
            />
        </view>
        <view class="btn-view" v-if="!isLogin">
            <view class="logo-btn" @click="() => goLogin(1)">
                {{ $t('KEY_FORMBTN_REGISTER') }}
            </view>
            <view class="logo-btn orange" @click="() => goLogin(0, 2)">
                {{ $t('KEY_FORMBTN_LOGIN') }}
            </view>
        </view>
        <view class="btn-view" v-else>
            <view class="logo-btn">
                <text v-if="store.baseConfig.countryId === 'BRA'">R$</text>
                <text v-else>$</text>
                {{ numberWithCommas(_.floor(userInfo?.cash, 2)) }}
            </view>
            <view class="logo-btn orange" @click="toDeposit">
                {{ $t('KEY_TABBAR_DEPOSIT') }}
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
    import { numberWithCommas, getLogoUrl } from '@/common/common'
    import _ from 'lodash'

    const store = useUsersStore()
    const commonStore = useCommonStore()
    const { isLogin, userInfo } = storeToRefs(store)
    const data = reactive<any>({
        logo: 'logo-view',
    })

    const emit = defineEmits(['closeDrawer'])
    const sideHidden = () => {
        emit('closeDrawer')
    }

    const toDeposit = () => {
        sideHidden()
        commonStore.depositTab = 0
        uni.switchTab({ url: '/pages/deposit/index' })
    }

    const goHome = () => {
        // uni.switchTab({
        //     url: '/',
        // })
    }

    const goLogin = (pageType: number, loginMode: number = 2) => {
        if (pageType === 0) {
            uni.navigateTo({
                url: `../../pages/login/index?login_mode=${loginMode}`,
            })
        } else {
            uni.navigateTo({
                url: `../../pages/register/index?login_mode=${loginMode}`,
            })
        }
    }
</script>
<style lang="scss">
    .logo-view {
        @apply w-full overflow-hidden bg-black-80;
        height: 244rpx;
    }

    .logo {
        @apply flex justify-center items-center;
        font-size: 40rpx;
        width: 242rpx;
        margin: 42rpx auto;
        img {
            @apply w-full;
        }
    }

    .btn-view {
        @apply flex justify-between items-center w-full box-border;
        padding: 0 43rpx;
    }

    .logo-btn {
        @apply flex justify-center items-center bg-info;
        width: 232rpx;
        height: 60rpx;
        border-radius: 8rpx;
        color: #585e5e;
        font-weight: bold;
        font-size: 28rpx;
    }

    .orange {
        background: url('@/static/index/btn-bg.gif');
        background-size: 100% 100%;
        color: #ffffff;
        font-weight: 400;
    }
</style>
