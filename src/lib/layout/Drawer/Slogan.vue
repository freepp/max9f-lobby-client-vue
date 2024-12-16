<template>
    <view>
        <view class="banner">
            <PromotionEntry :data="currentActivity" :type="3"></PromotionEntry>
        </view>
        <view class="logo">
            <img
                v-if="store.baseConfig.imgBaseUrl"
                :src="getLogoUrl('burger_bottom.png', store.baseConfig)"
                alt=""
            />
        </view>
    </view>
</template>
<script lang="ts" setup>
    import { reactive, onMounted } from 'vue'
    import { i18n } from '@/common/i18nConfig'
    import { useUsersStore } from '@/store/userStore'
    import PromotionEntry from '@/lib/components/PromotionEntry/index.vue'
    import { getLogoUrl } from '@/common/common'
    const store = useUsersStore()
    const { t: $t } = i18n.global

    interface Props {
        currentActivity: any
    }

    const props = withDefaults(defineProps<Props>(), {
        currentActivity: () => [],
    })

    const data = reactive<any>({})

    const emit = defineEmits(['closeDrawer'])

    const sideHidden = () => {
        emit('closeDrawer')
    }
</script>
<style lang="scss">
    .slogan-view {
        @apply w-full;
        height: 596rpx;
    }

    .banner {
        height: 167rpx;
        margin: 40rpx 24rpx 0;
        border-radius: 8rpx;
        font-size: 40rpx;
        overflow: hidden;
    }

    // .logo {
    //     @apply flex justify-center items-center;
    //     height: 140rpx;
    //     font-size: 40rpx;
    //     color: #a7a7a7;
    // }
    .logo {
        @apply flex justify-center items-center;
        font-size: 40rpx;
        width: 242rpx;
        margin: 42rpx auto;
        img {
            @apply w-full;
        }
    }
</style>
