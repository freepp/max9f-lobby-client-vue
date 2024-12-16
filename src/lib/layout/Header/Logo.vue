<template>
    <view class="logo-view" @click="goHome">
        <view class="logo">
           <img v-if="store.baseConfig.imgBaseUrl" :src="getLogoUrl('burger_top.png', store.baseConfig)" alt="" />
        </view>
    </view>
</template>
<script lang="ts" setup>
    import { getLogoUrl } from '@/common/common'
    const store = useUsersStore()

    const data = reactive<any>({
        title: 'LOGO',
    })

    const goHome = () => {
        
        uni.switchTab({
            url: '/',
        })
    }
</script>
<style lang="scss">
    .logo-view {
        @apply flex justify-center;
        font-size: 32rpx;
        color: #ffffff;
    }

    .logo {
        @apply flex justify-center items-center;
        font-size: 40rpx;
        width: 165rpx;
        img {
            @apply w-full;
        }
    }
</style>
