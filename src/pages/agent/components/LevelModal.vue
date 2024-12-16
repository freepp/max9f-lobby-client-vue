<template>
    <view v-if="visible" class="level-modal bg-mask" @click="close">
        <view class="level-content" @click.stop>
            <view class="head">
                <view class="title">{{ $t('KEY_AGENT_LEVEL') }}</view>
                <image
                    class="close"
                    @click="close"
                    src="@/static/icon/close_white.png"
                ></image>
            </view>
            <view class="th-box">
                <view>{{ $t('KEY_AGENT_LEVEL') }}</view>
                <view class="text-right">
                    {{ $t('KEY_AGENT_LEVEL_CONDITION') }}
                </view>
            </view>
            <scroll-view :scroll-y="true" class="level-list">
                <view class="item-level" v-for="item in levelData">
                    <view class="item-name">
                        <image
                            class="item-level-icon"
                            :src="
                                '/static/agent/badge_LV' +
                                item.pLevel +
                                '_icon.png'
                            "
                        ></image>
                        LV{{ item.pLevel }}
                    </view>
                    <view class="item-turnover">R$ {{ item.needPerf }}</view>
                </view>
                <view class="space"></view>
            </scroll-view>
        </view>
    </view>
</template>
<script lang="ts" setup>
    import { ref } from 'vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as commonApi } from '@/NET/common'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { PromoteVipLevelDto } from '@/NET/lobby/data-contracts'
    const levelData = ref<Array<PromoteVipLevelDto>>()
    const visible = ref(false)
    const getVipLevel = async () => {
        const res = await commonApi.promote.promoteVipLevelCreate()
        if (res.success) {
            levelData.value = res.result
        } else {
            ErrorHandler(res, 'getVipLevel')
        }
    }

    const open = () => {
        getVipLevel()
        visible.value = true
    }
    const close = () => {
        visible.value = false
    }
    defineExpose({
        open,
        close,
    })
</script>
<style lang="scss">
    .level-modal {
        @apply fixed top-0 left-0;
        width: 100%;
        height: 100%;
        z-index: 888;
        .level-content {
            @apply absolute rounded-14 overflow-hidden;
            width: 666rpx;
            height: 836rpx;
            top: 50%;
            left: 50%;
            background: #eee;
            transform: translate3d(-50%, -50%, 0);
            .head {
                @apply text-center text-black-100;
                height: 112rpx;
                line-height: 112rpx;
                font-size: 33rpx;
                font-weight: bold;
            }
            .close {
                @apply absolute;
                width: 35rpx;
                height: 35rpx;
                top: 28rpx;
                right: 28rpx;
            }
            .th-box {
                @apply flex rounded-14 items-center box-border;
                width: 610rpx;
                margin: 0 auto;
                height: 84rpx;
                background: #bbbbbb;
                border: 1px solid #aba6a6;
                font-size: 22rpx;
                color: #000000;
                padding: 0 26rpx;
                line-height: 28rpx;
                view {
                    width: 50%;
                }
            }
            .level-list {
                width: 610rpx;
                margin: 0 auto;
                height: 638rpx;
                .space {
                    height: 30rpx;
                }
                .item-level {
                    @apply flex justify-between;
                    height: 84rpx;
                    line-height: 84rpx;
                    color: #000000;
                    .item-name {
                        @apply flex items-center;
                        width: 150rpx;
                        font-size: 22rpx;
                        font-weight: 400;
                    }
                    .item-level-icon {
                        width: 84rpx;
                        height: 84rpx;
                        margin-right: 16rpx;
                    }
                    .item-turnover {
                        @apply box-border;
                        padding-right: 28rpx;
                    }
                    &:nth-child(2n) {
                        @apply rounded-14;
                        height: 84rpx;
                        background: #dadada;
                    }
                }
            }
        }
    }
</style>
