<template>
    <view class="relative">
        <view class="card-select-view">
            <view v-if="payParams.mobile">{{ payParams.mobile }}</view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { reactive, ref, onMounted, watch } from 'vue'
    import { useUsersStore } from '@/store/userStore'
    const store = useUsersStore()

    interface Props {
        payParams?: any
    }

    interface Data {
        isLoading: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
        payParams: {},
    })
    const data = reactive<Data>({
        isLoading: true,
    })
</script>

<style lang="scss">
    .personal-title {
        @apply flex items-center justify-center;
        font-size: 33rpx;
        font-weight: bold;
        color: #454545;
        height: 100rpx;
    }
    .cardInfo {
        @apply absolute left-0 right-0 bottom-0 overflow-y-auto;
        top: 100rpx;
    }
    .card-select-view {
        @apply flex justify-center items-center;
        height: 90rpx;
        background: rgba(255, 255, 255);
        border-radius: 7rpx;
        font-size: 33rpx;
        font-weight: bold;
        color: #000;
    }
    .dropDown-view {
        @apply absolute left-0 z-20 w-full overflow-hidden overflow-y-auto;
        border-top: 2rpx solid #000;
        background: #fff;
        border-radius: 0 0 8rpx 8rpx;
        top: 90rpx;
        box-shadow: 0px 9rpx 20rpx 0rpx rgba(0, 0, 0, 0.14);
        max-height: 320rpx;
        .dropDown-item {
            @apply flex justify-center items-center;
            height: 90rpx;
            font-weight: bold;
            color: #000;
            font-size: 33rpx;
        }
        .add {
            background: #098842;
            color: #ffffff;
        }
    }
    .add {
        background: #098842;
        color: #ffffff;
    }
</style>
