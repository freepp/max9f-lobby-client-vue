<template>
    <view
        class="card-view"
        :class="{ valid: !promoionsItem.isValid }"
        @click="goActivity"
    >
        <view class="img-view">
            <LazyImg
                class="w-full h-full"
                :src="promoionsItem.imgs[0]"
                mode="aspectFit"
                lazy-load="true"
            />
        </view>
        <view class="detail-view">
            <view class="detail-title">{{ promoionsItem.title }}</view>
            <view class="detail-description">
                {{ promoionsItem.content }}
            </view>
        </view>
        <view class="card-date">{{ promoionsItem.date }}</view>
        <view class="complete" v-if="!promoionsItem.isValid">
            <img src="@/static/activity/complete.png" alt="" />
        </view>
    </view>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue'
    import { useUsersStore } from '@/store/userStore'
    import { ga } from '@/common/common'
    const store = useUsersStore()

    interface Props {
        promoionsItem?: any
    }

    const props = withDefaults(defineProps<Props>(), {
        promoionsItem: {},
    })

    const data = reactive<any>({
        title: 'card',
    })
    const goActivity = () => {
        
        if (!props.promoionsItem.isValid) return
        if (store.userInfo?.userMode === 1 && props.promoionsItem.kind != 5) {
            uni.navigateTo({
                url: `../../pages/login/index`,
            })
            return
        }
        uni.navigateTo({
            url: `${props.promoionsItem.linkUrl}`,
        })
    }
</script>
<style lang="scss">
    .card-view {
        @apply relative mb-3 rounded-md overflow-hidden;
        background-color: #2e2e2e;
        box-shadow: 0rpx 5rpx 14rpx 2rpx rgba(0, 0, 0, 0.35);
        height: 282rpx;
    }

    .img-view {
        @apply w-full h-full;
    }

    .detail-view {
        @apply absolute bottom-0 left-0 w-full box-border;
        background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 1),
            rgba(35, 35, 35, 0)
        );
        height: 130rpx;
        padding: 12rpx 26rpx;
    }

    .detail-title {
        font-size: 28rpx;
        font-weight: bold;
    }

    .detail-description {
        @apply break-words;
        font-size: 25rpx;
        color: #ffffff;
        line-height: 25rpx;
        opacity: 0.6;
        margin-top: 10rpx;
    }

    .card-date {
        @apply absolute;
        right: 28rpx;
        top: 28rpx;
    }

    .complete {
        position: absolute;
        right: 60rpx;
        top: 30rpx;
        width: 150rpx;
        img {
            @apply w-full;
        }
    }
    .valid {
        opacity: 0.6;
    }
</style>
