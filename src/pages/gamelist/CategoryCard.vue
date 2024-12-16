<template>
    <view class="card-view" @click="openGame(cardInfo)">
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
        <view class="card-favorite" @click.stop="() => favorite(cardInfo)">
            <img
                v-if="!cardInfo.isFavorite"
                src="@/static/icon/follow_icon.png"
                alt=""
            />
            <img v-else src="@/static/icon/followed_icon.png" alt="" />
        </view>
        <view class="img-placeholder">
            <img
                v-if="store.baseConfig.imgBaseUrl"
                :src="getLogoUrl('placeholder3.jpg', store.baseConfig)"
                alt=""
            />
        </view>
        <!-- <image
            class="img-view"
            :src="cardInfo.middleIcon"
            lazy-load="true"
            mode="aspectFill"
            alt=""
        /> -->
        <LazyImg class="img-view" :src="cardInfo.middleIcon" alt="" />
        <!-- <view class="card-title">
            {{
                cardInfo.jackpot && cardInfo.jackpot !== '0'
                    ? 'R$' + cardInfo.jackpot
                    : cardInfo.appName
            }}
        </view> -->
        <view class="card-title">
            <!-- <span>{{ cardInfo.appName }}</span> -->
        </view>
        <view class="maintain" @click.stop="" v-if="cardInfo.status === 2">
            <img src="@/static/icon/maintain.png" alt="" />
            <text class="title">Manutenção do Sistema</text>
        </view>
    </view>
</template>
<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import { CategoryDetailDto } from '@/NET/lobby/data-contracts'
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
    import { openGame } from '@/common/game'
    import { getLogoUrl } from '@/common/common'

    const store = useUsersStore()
    const languageStore = i18nStore()

    interface Props {
        cardInfo?: CategoryDetailDto
    }

    const props = withDefaults(defineProps<Props>(), {
        cardInfo: () => null,
    })

    const data = reactive<any>({
        followed: false,
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
    .card-view {
        @apply w-full h-full rounded-md relative overflow-hidden;
        box-sizing: border-box;
        box-shadow: 0rpx 5rpx 7rpx 0rpx rgba(0, 0, 0, 0.35);
        background: #131e1e;
    }

    .card-hot {
        @apply absolute left-0 top-0 z-10;
        color: #fff;
        img {
            width: 80rpx;
        }
    }

    .card-favorite {
        @apply absolute z-10;
        top: 12rpx;
        right: 12rpx;
        img {
            width: 47rpx;
        }
    }
    .card-title {
        @apply w-full absolute left-0 box-border flex justify-center items-center;
        height: 60rpx;
        bottom: 4rpx;
        background: transparent;
        color: #fff;
        text-align: center;
        line-height: 26rpx;
        padding: 0 10rpx;
        span {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            max-height: 54rpx;
        }
    }
    .img-view {
        @apply w-full block absolute top-0 left-0;
        height: 100%;
        object-fit: cover;
    }
    image {
        will-change: transform;
    }
    .img-placeholder {
        @apply w-full;
        height: 100%;
        img {
            @apply w-full h-full;
            object-fit: cover;
        }
    }
    .maintain {
        @apply absolute left-0 top-0 w-full h-full;
        background: rgba(0, 0, 0, 0.6);
        z-index: 10;
        img {
            @apply w-full;
        }
        .title {
            @apply box-border block absolute left-0 text-center;
            width: 80%;
            bottom: 30rpx;
            font-size: 28rpx;
            color: #ffffff;
            left: 50%;
            transform: translate(-50%);
        }
    }
</style>
