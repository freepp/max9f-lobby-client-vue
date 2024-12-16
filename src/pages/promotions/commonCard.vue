<template>
    <view
        class="card-view"
        :class="{ valid: !promoionsItem.isValid }"
        @click="goActivity"
    >
        <view class="logo-view">
           <img
                v-if="store.baseConfig.imgBaseUrl"
                :src="getLogoUrl('burger_top.png', store.baseConfig)"
                alt=""
            />
        </view>
        <!-- <view class="left-img">
            <LazyImg
                class="w-full h-full"
                :src="promoionsItem.img3"
                mode="aspectFit"
                lazy-load="true"
            />
        </view> -->
        <view class="right-img">
            <LazyImg
                class="w-full h-full"
                :src="promoionsItem.img4"
                mode="aspectFit"
                lazy-load="true"
            />
        </view>
        <view class="img-view">
            <LazyImg
                class="w-full h-full"
                :src="promoionsItem.img1"
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
    import { getLogoUrl } from '@/common/common'
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

    .logo-view {
        @apply absolute;
        left: 20rpx;
        top: 20rpx;
        width: 135rpx;
        height: 40rpx;
        z-index: 10;
        img {
            width: 100%;
        }
    }

    .left-img {
        @apply absolute;
        left: 20rpx;
        top: 60rpx;
        width: 180rpx;
        height: 120rpx;
        z-index: 10;
    }

    .right-img {
        @apply absolute;
        right: 0;
        top: 0;
        width: 350rpx;
        height: 100%;
        z-index: 10;
    }

    .img-view {
        @apply w-full h-full;
    }

    .detail-view {
        @apply absolute bottom-0 left-0 w-full box-border;
        // background: linear-gradient(
        //     0deg,
        //     rgba(0, 0, 0, 1),
        //     rgba(35, 35, 35, 0)
        // );
        height: 170rpx;
        width: 420rpx;
        padding: 10rpx 17rpx;
        z-index: 20;
    }

    .detail-title {
        font-size: 28rpx;
        font-weight: bold;
        color: #fff71f;
    }

    .detail-description {
        @apply break-words;
        font-size: 25rpx;
        color: #ffffff;
        // line-height: 25rpx;
        margin-top: 10rpx;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .card-date {
        @apply absolute;
        right: 28rpx;
        top: 28rpx;
        z-index: 20;
    }

    .complete {
        position: absolute;
        right: 60rpx;
        top: 30rpx;
        width: 150rpx;
        z-index: 20;
        img {
            @apply w-full;
        }
    }
    .valid {
        opacity: 0.6;
    }
</style>
