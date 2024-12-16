<template>
    <view
        class="card-view"
        @click="() => openGame(cardInfo, 'home_game_click')"
    >
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
        <view class="img-wrap"></view>
        <view class="img-placeholder">
            <img
                v-if="store.baseConfig.imgBaseUrl"
                :src="getLogoUrl('placeholder3.jpg', store.baseConfig)"
                alt=""
            />
        </view>
        <!-- <image
            class="img-view"
            :src="cardInfo.icon"
            webp="true"
            mode="aspectFill"
            alt=""
            @load="load(cardInfo.icon)"
        /> -->
        <img class="img-view" :src="cardInfo.icon" alt="" />
        <view class="card-title">
            <!-- {{
                cardInfo.jackpot && cardInfo.jackpot !== '0'
                    ? 'R$' + cardInfo.jackpot
                    : cardInfo.appName
            }} -->
            <!-- <span>{{ cardInfo.appName }}</span> -->
        </view>
        <view class="maintain" @click.stop="" v-if="cardInfo.status === 2">
            <img src="@/static/icon/maintain.png" alt="" />
            <text class="title">Manutenção do Sistema</text>
        </view>
        <view
            class="game-border"
            :class="computedClass"
            v-if="cardInfo.effectStatus === 1"
        ></view>
    </view>
</template>
<script lang="ts" setup>
    import {
        reactive,
        ref,
        getCurrentInstance,
        onMounted,
        onUnmounted,
        computed,
    } from 'vue'
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
    import { i18nStore } from '@/store/i18nStore'
    import _ from 'lodash'
    import { i18n } from '@/common/i18nConfig'
    import { openGame } from '@/common/game'
    import { getLogoUrl } from '@/common/common'
    import Spine from '@/lib/components/Spine/Spine.vue'
    import { onHide, onShow } from '@dcloudio/uni-app'
    import { pozIndex } from './positionChange'
    const { t: $t } = i18n.global
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

    const { proxy } = getCurrentInstance()
    const visible = ref(false)
    const computedClass = computed(() => {
        return ['game-border' + pozIndex.value]
    })
    onMounted(() => {
        const observer = uni
            .createIntersectionObserver(proxy)
            .relativeToViewport({
                bottom: 0,
            })
        // observer.observe('.img-wrap', (res) => {
        //     if (res.intersectionRatio > 0) {
        //         visible.value = true
        //         observer.disconnect()
        //     }
        // })
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
        @apply w-full h-full relative overflow-hidden;
        box-sizing: border-box;
        box-shadow: 0rpx 5rpx 7rpx 0rpx rgba(0, 0, 0, 0.35);
        background: #131e1e;
        border-radius: 8rpx;
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
            width: 44rpx;
        }
    }

    .card-title {
        @apply w-full absolute left-0 box-border flex justify-center items-center;
        height: 60rpx;
        background: transparent;
        color: #fff;
        text-align: center;
        line-height: 26rpx;
        padding: 0 10rpx;
        bottom: 4rpx;
        span {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            max-height: 54rpx;
        }
    }
    .img-wrap {
        height: 1px;
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
        @apply w-full h-full overflow-hidden;
        // height: 100%;
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
    .game-border {
        @apply absolute w-full h-full left-0 top-0;
        z-index: 11;
        width: 80rpx;
        height: 82rpx;
        top: -2rpx;
        left: -2rpx;
        background: url(@/static/index/game_border.png);
        background-size: 400rpx 100%;
    }
    .game-border0 {
        background-position: 0rpx 0px;
    }
    .game-border1 {
        background-position: 80rpx 0px;
    }
    .game-border2 {
        background-position: 160rpx 0px;
    }
    .game-border3 {
        background-position: 240rpx 0px;
    }
    .game-border4 {
        background-position: 320rpx 0px;
    }
</style>
