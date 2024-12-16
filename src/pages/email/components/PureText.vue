<template>
    <view class="text-view">
        <view class="mail-name" v-html="props.data?.title"></view>
        <!-- <text class="mail-text" decode="true" space="nbsp">
            {{ props.data?.content }}
        </text> -->
        <view class="mail-text" v-html="props.data?.content"></view>
        <!-- <view class="mail-author"></view> -->
    </view>
</template>

<script lang="ts" setup>
    interface Props {
        data: any
    }
    const props = defineProps<Props>()

    const text =
        '赶紧痛快得给我充值，<img src="https://pic35.photophoto.cn/20150511/0034034892281415_b.jpg"/>，说得就是你<a href="http://192.168.1.121/lobby/bra/index.html#/"  width="100" height="100" />走，充值</a>'
</script>

<style lang="scss">
    .text-view {
        padding: 41rpx 62rpx;
        .mail-name {
            @apply font-bold break-all text-white-100;
            font-size: 33rpx;
        }
        .mail-text {
            @apply break-all text-white-80;
            font-size: 25rpx;
            font-weight: 400;
            line-height: 33rpx;
            margin-top: 34rpx;
            ::v-deep img {
                max-width: 100%;
            }
        }
        .mail-author {
            @apply font-bold text-right text-white-80;
            height: 21rpx;
            font-size: 25rpx;
            margin-top: 110rpx;
        }
    }
</style>
