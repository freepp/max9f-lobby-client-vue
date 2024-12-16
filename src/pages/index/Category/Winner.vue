<template>
    <view class="winner">
        <view class="title">
            <view class="main-title">
                <view class="line">
                    <img src="@/static/index/line.png" alt="" />
                </view>
                {{ $t('KEY_INDEX_WINNER') }}
            </view>
        </view>
        <view class="games-box">
            <swiper
                class="swiper"
                :circular="true"
                :indicator-dots="false"
                :autoplay="true"
                :interval="3900"
                :duration="4000"
                previous-margin="180rpx"
                next-margin="348rpx"
                easing-function="linear"
                :vertical="false"
            >
                <swiper-item v-for="item in props.marquees">
                    <view
                        class="game-item"
                        @click="openGame(item, 'home_bottom_carousel_click')"
                    >
                        <image :src="item.appIcon"></image>
                        <view class="user-name">
                            {{ item.userNameOrMobile }}
                        </view>
                        <view class="win-money">R$ {{ item.winAmount }}</view>
                    </view>
                </swiper-item>
                <!-- <swiper-item>
                    <view class="game-item">
                        <image
                            src="http://192.168.2.27:5173/src/static/icon/calendar.png"
                        ></image>
                        <view class="user-name">37****1</view>
                        <view class="win-money">R$ 3.260,00</view>
                    </view>
                </swiper-item>
                <swiper-item>
                    <view class="game-item">
                        <image
                            src="http://192.168.2.27:5173/src/static/icon/calendar.png"
                        ></image>
                        <view class="user-name">37****1</view>
                        <view class="win-money">R$ 3.260,00</view>
                    </view>
                </swiper-item>
                <swiper-item>
                    <view class="game-item">
                        <image
                            src="http://192.168.2.27:5173/src/static/icon/calendar.png"
                        ></image>
                        <view class="user-name">37****1</view>
                        <view class="win-money">R$ 3.260,00</view>
                    </view>
                </swiper-item>
                <swiper-item>
                    <view class="game-item">
                        <image
                            src="http://192.168.2.27:5173/src/static/icon/calendar.png"
                        ></image>
                        <view class="user-name">37****1</view>
                        <view class="win-money">R$ 3.260,00</view>
                    </view>
                </swiper-item>
                <swiper-item>
                    <view class="game-item">
                        <image
                            src="http://192.168.2.27:5173/src/static/icon/calendar.png"
                        ></image>
                        <view class="user-name">37****1</view>
                        <view class="win-money">R$ 3.260,00</view>
                    </view>
                </swiper-item> -->
            </swiper>
        </view>
    </view>
</template>
<script setup lang="ts">
    import { SCMarqueeDto } from '@/NET/lobby/data-contracts'
    import { openGame } from '@/common/game'
    interface Props {
        marquees: Array<SCMarqueeDto>
    }
    const props = withDefaults(defineProps<Props>(), {
        marquees: [] as any,
    })
</script>
<style lang="scss">
    .winner {
        @apply z-10 relative overflow-hidden box-border;
        padding: 0rpx 16rpx 0rpx;
        .title {
            @apply flex justify-between;
            padding: 20rpx 5rpx 20rpx;
            font-size: 26rpx;
            .main-title {
                @apply flex items-center font-bold;
                font-weight: 28rpx;
                .line {
                    @apply mx-2;
                    height: 37rpx;
                    img {
                        @apply h-full;
                    }
                }
            }
        }
        .games-box {
            @apply w-full box-border;
            height: 230rpx;
            padding: 0rpx 8rpx 0rpx;
            .swiper {
                @apply w-full h-full;
                .game-item {
                    width: 168rpx;
                    image {
                        width: 168rpx;
                        height: 168rpx;
                        border-radius: 7rpx;
                    }
                    .user-name {
                        @apply text-center;
                        height: 24rpx;
                        font-size: 24rpx;
                        font-weight: 400;
                        color: #ffffff;
                        line-height: 24rpx;
                        margin-top: 8rpx;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .win-money {
                        @apply text-center;
                        height: 24rpx;
                        font-size: 24rpx;
                        font-weight: 400;
                        color: #f2ac35;
                        line-height: 24rpx;
                        margin-top: 2rpx;
                    }
                }
            }
        }
    }
</style>
