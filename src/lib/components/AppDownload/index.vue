<template>
    <view class="download-view" @click="download">
        <view class="icon">
            <img src="@/static/icon/pwa_app_icon.png" alt="" />
        </view>
        <view class="text">Baixe Nosso APP, Ganhe Super Prêmios!</view>
        <view class="btn">Baixar</view>
        <view class="icon">
            <img
                class="close"
                src="@/static/icon/pwa_close_icon.png"
                alt=""
                @click.stop="closeBar"
            />
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import { useUsersStore } from '@/store/userStore'
    import { IS_ACTIVITY_SWITCH } from '@/common/activityAssets'
    
    const store = useUsersStore()

    interface Props {
        pageType?: number
    }

    interface Data {
        title?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        pageType: 1,
    })
    const data = reactive<Data>({
        title: 'AppDownload',
    })
    const themeColor = ref(IS_ACTIVITY_SWITCH ? '#7200FF' : '#28c76f')

    const emit = defineEmits(['close'])
    const closeBar = () => {
        emit('close')
        // localStorage.setItem('downloadBarShown', '1')
		uni.setStorageSync('downloadBarShown', '1')
    }

    const download = () => {
        // window.open(
        //     'https://play.google.com/store/apps/details?id=com.dhan.easy.borrow.slots&pli=1'
        // )
        uni.navigateTo({
            url: '/pages/download/index',
        })
    }
</script>

<style lang="scss">
    .download-view {
        @apply w-full flex justify-between items-center relative;
        height: 60rpx;
        z-index: 30;
        background-color: v-bind(themeColor);
        .text {
            font-size: 22rpx;
            text-shadow: 2rpx 2rpx 3rpx rgba(0, 0, 0, 0.58);
        }
        .btn {
            @apply flex justify-center items-center;
            width: 100rpx;
            height: 38rpx;
            background-color: #fff;
            border-radius: 14rpx;
            color: #f82e49;
        }
    }
    .icon {
        @apply h-full flex justify-center items-center;
        width: 80rpx;
        img {
            width: 34rpx;
        }
        .close {
            width: 22rpx;
        }
    }
</style>
