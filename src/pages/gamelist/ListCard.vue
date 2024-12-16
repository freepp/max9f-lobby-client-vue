<template>
    <view class="card" @click="openGame(cardInfo)">
        <view class="card-img">
            <view class="img-placeholder">
                <img
                    v-if="store.baseConfig.imgBaseUrl"
                    :src="getLogoUrl('placeholder2.png', store.baseConfig)"
                    alt=""
                />
            </view>
            <LazyImg
                class="img-view"
                :src="cardInfo.middleIcon"
                lazy-load="true"
                mode="aspectFill"
                alt=""
            />
            <view class="card-hot">
                <view v-if="cardInfo.flag === 1">
                    <img
                        v-if="
                            languageStore.local.id === 'en' ||
                            languageStore.local.id === 'pt'
                        "
                        :src="HotENImg"
                        alt=""
                    />
                    <img
                        v-if="languageStore.local.id === 'es'"
                        :src="HotESImg"
                        alt=""
                    />
                </view>
                <view v-if="cardInfo.flag === 2">
                    <img
                        v-if="languageStore.local.id === 'en'"
                        :src="NewENImg"
                        alt=""
                    />
                    <img
                        v-if="languageStore.local.id === 'es'"
                        :src="NewESImg"
                        alt=""
                    />
                    <img
                        v-if="languageStore.local.id === 'pt'"
                        :src="NewPTImg"
                        alt=""
                    />
                </view>
            </view>
        </view>
        <view class="card-content">
            <view class="flex justify-between">
                <!-- <view>
                    <view class="title">{{ cardInfo.appName }}</view>
                    <view
                        class="jackpot"
                        v-if="cardInfo.jackpot && cardInfo.jackpot > 0"
                    >
                        Jackpot
                        <text v-if="store.baseConfig.countryId === 'BRA'">
                            R$
                        </text>
                        <text v-else>$</text>
                        {{ cardInfo.jackpot }}
                    </view>
                </view> -->
                <view class="card-favorite" @click.stop="favorite(cardInfo)">
                    <img
                        v-if="!cardInfo.isFavorite"
                        src="@/static/icon/follow.png"
                        alt=""
                    />
                    <img v-else src="@/static/icon/followed_icon.png" alt="" />
                </view>
            </view>
            <view
                class="card-detail"
                :class="{ 'text-overflow': !cardInfo.choosed }"
            >
                {{ cardInfo.desc }}
            </view>
            <!-- <CustomTransition>
                <view class="card-info" v-if="cardInfo.choosed">
                    <view class="info-item">
                        <view class="flex-1">GameType</view>
                        <view class="flex-1">
                            {{ cardInfo.gameType }}
                        </view>
                    </view>
                    <view class="info-item">
                        <view class="flex-1">Bet min/max</view>
                        <view class="flex-1">
                            {{ cardInfo.betMin ? cardInfo.betMin : 0 }}/{{
                                cardInfo.betMax ? cardInfo.betMax : 0
                            }}
                        </view>
                    </view>
                    <view class="info-item">
                        <view class="flex-1">Studio</view>
                        <view class="flex-1">
                            {{ cardInfo.studio }}
                        </view>
                    </view>
                </view>
            </CustomTransition> -->
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import CustomTransition from '../../lib/components/Transition/ExpandTransition.vue'
    import HotENImg from '@/static/index/hotnew/hot_en.png'
    import HotESImg from '@/static/index/hotnew/hot_es.png'
    import HotPTImg from '@/static/index/hotnew/hot_pt.png'
    import NewENImg from '@/static/index/hotnew/new_en.png'
    import NewESImg from '@/static/index/hotnew/new_es.png'
    import NewPTImg from '@/static/index/hotnew/new_pt.png'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import _ from 'lodash'
    import { i18nStore } from '@/store/i18nStore'
    import LazyImg from '@/lib/components/LazyImg.vue'
    import { openGame } from '@/common/game'
    import { getLogoUrl } from '@/common/common'
    const languageStore = i18nStore()
    const store = useUsersStore()

    interface Props {
        cardInfo?: any
    }

    interface Data {
        title?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        cardInfo: () => null,
    })
    const data = reactive<Data>({
        title: 'Logo',
    })

    const favorite = async (item) => {
        let params = Object.assign(store.commonParams, {
            userId: store.userInfo.userId,
            appId: item.appId,
        })
        let res = await lobbyApi.home.favorite(params)
        if (res.success) {
            item.isFavorite = !item.isFavorite
        } else {
            ErrorHandler(res, 'favorite')
        }
    }
</script>

<style lang="scss">
    .card {
        @apply flex justify-between rounded-md mb-3;
        background: #fff;
        padding: 20rpx;
        .card-hot {
            @apply absolute left-0 top-0 z-10;
            color: #fff;
            img {
                width: 48rpx;
            }
        }
    }

    .card-img {
        @apply relative overflow-hidden;
        width: 140rpx;
        height: 140rpx;
        background: #131e1e;
        border-radius: 7rpx;
        .img-view {
            @apply w-full block absolute top-0 left-0 h-full;
        }
        .img-placeholder {
            @apply w-full h-full;
            img {
                @apply w-full h-full;
                object-fit: cover;
            }
        }
    }

    image {
        will-change: transform;
    }

    .hot {
        @apply absolute left-0 top-0;
    }

    .card-content {
        @apply flex-1 w-0 relative;
        margin-left: 20rpx;

        .title {
            @apply truncate;
            width: 450rpx;
            font-size: 33rpx;
            font-weight: bold;
        }

        .jackpot {
            font-size: 25rpx;
            color: #ff0000;
        }
    }

    .card-detail {
        @apply w-full break-words my-3;
        font-size: 21rpx;
        color: #454545;
        line-height: 33prx;
        opacity: 0.8;
    }

    .card-info {
        @apply overflow-hidden;
        font-size: 21rpx;
        color: #2e2e2e;
        line-height: 25rpx;
        opacity: 0.8;
    }

    .card-favorite {
        @apply absolute z-10 top-0 right-0;
        img {
            width: 44rpx;
        }
    }

    .info-item {
        @apply flex items-center;
        height: 50rpx;
    }

    .text-overflow {
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: height 0.3s ease-in-out;
    }
</style>
