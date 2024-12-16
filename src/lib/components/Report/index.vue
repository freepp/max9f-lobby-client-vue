<template>
    <view class="flex broadcast-view items-center overflow-hidden">
        <view class="broadcast flex items-center">
            <image
                src="@/static/index/radio-icon.png"
                mode="widthFix"
                class="radio"
            ></image>
            <Broadcast :messages="marqueesData" />
        </view>
        <view class="message" @click="toEmail">
            <image
                src="@/static/index/email.png"
                mode="widthFix"
                v-show="unreadCount <= 0"
            ></image>
            <image
                src="@/static/index/email.gif"
                mode="widthFix"
                v-show="unreadCount > 0"
            ></image>
            <view class="unread-count" v-show="unreadCount > 0">
                <view>{{ unreadCount > 99 ? '99+' : unreadCount }}</view>
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue'
    import Broadcast from './Broadcast.vue'
    import { useUsersStore } from '@/store/userStore'
    import { ga } from '@/common/common'
    const store = useUsersStore()
    interface Props {
        pageType?: number
        marqueesData?: any[]
        unreadCount?: number
    }

    const props = withDefaults(defineProps<Props>(), {
        pageType: 1,
        marqueesData: () => [],
    })

    const data = reactive<any>({
        info: '',
    })
    const toEmail = () => {
        
        if (store.userInfo && store.userInfo?.userMode !== 2) {
            uni.navigateTo({
                url: '/pages/login/index',
            })
            return
        }
        uni.navigateTo({
            url: '/pages/email/index',
        })
    }
</script>
<style lang="scss">
    .broadcast-view {
        @apply box-border;
        height: 82rpx;
        padding: 0rpx 23rpx 0rpx;
        .broadcast {
            @apply box-border;
            background: #272727;
            width: 617rpx;
            height: 45rpx;
            border-radius: 23px;
            padding-left: 22rpx;
            padding-right: 4rpx;
            .radio {
                margin-right: 21rpx;
                width: 33rpx;
            }
        }
        .message {
            margin-left: 22rpx;
            margin-top: -10rpx;
            position: relative;
            .unread-count {
                @apply bg-primary text-white-100;
                min-width: 30rpx;
                max-width: 45rpx;
                height: 30rpx;
                line-height: 30rpx;
                text-align: center;
                font-size: 30rpx;
                position: absolute;
                border-radius: 15rpx 15rpx 15rpx 3rpx;
                left: 44rpx;
                top: 0rpx;
                view {
                    letter-spacing: -1px;
                    transform: scale(0.66);
                    transform-origin: center;
                }
            }
            image {
                width: 64rpx;
            }
        }
    }
</style>
