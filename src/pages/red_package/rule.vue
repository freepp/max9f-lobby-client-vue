<template>
    <Layout :headerTitle="$t('KEY_RED_RULE_TITLE')" :hasHeader="true">
        <view class="rules">
            <view v-html="$t('KEY_RED_RULE_N1')"></view>
            <view v-html="$t('KEY_RED_RULE_N2', {domain: domain})"></view>
            <view v-html="$t('KEY_RED_RULE_N3')"></view>
            <view v-html="$t('KEY_RED_RULE_N4')"></view>
            <view v-html="$t('KEY_RED_RULE_N5')"></view>
            <view v-html="$t('KEY_RED_RULE_N6')"></view>
        </view>
    </Layout>
</template>
<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    import { getPlatform } from '@/common/init'
    const domain = getPlatform()
</script>
<style lang="scss">
    .rules {
        padding: 54rpx;
        view {
            font-size: 26rpx;
            font-weight: 400;
            color: #a7a7a7;
            line-height: 33rpx;
            margin-top: 33rpx;
            text-indent: -26rpx;
            &:first-child {
                margin-top: 0rpx;
            }
            &::before {
                content: '';
                display: inline-block;
                vertical-align: middle;
                width: 14rpx;
                height: 14rpx;
                background: #ffffff;
                border-radius: 50%;
                position: relative;
                top: -2rpx;
                margin-right: 6rpx;
            }
        }
    }
</style>
