<template>
    <view class="teach-view">
        <image
            v-if="store.commonParams.langId"
            :src="'/static/agent/info_' + store.commonParams.langId + '.png'"
            class="w-full"
            mode="widthFix"
        ></image>

        <view class="teach-rule" v-html="$t('KEY_AGENT_TEACH_EXAMPLE_DETAIL')?.replaceAll('\n', '<br>')"></view>
    </view>
    <view class="space"></view>
</template>
<script lang="ts" setup>
    import { useUsersStore } from '@/store/userStore'
    const store = useUsersStore()
</script>
<style lang="scss">
    .space {
        height: 50rpx;
    }
    .teach-view {
        width: 540rpx;
        @apply bg-black-80 box-border rounded-14;
        padding: 22rpx;
        .teach-rule {
            @apply rounded-7 box-border;
            width: 498rpx;
            margin: 20rpx auto 0;
            border: 1px solid #475464;
            font-size: 22rpx;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            line-height: 28rpx;
            padding: 30rpx 20rpx;
        }
    }
</style>
