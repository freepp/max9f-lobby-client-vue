<template>
    <view class="swiper-wrap">
        <uni-swiper-dot
            class="swiper-dot"
            :info="props.bannerData"
            :current="data.current"
            :dotsStyles="{
                selectedBackgroundColor: '#fff',
                backgroundColor: '#fff',
            }"
            field="content"
            :mode="data.mode"
        >
            <swiper
                class="swiper-box"
                @change="change"
                autoplay="true"
                duration="500"
                circular="true"
            >
                <swiper-item
                    v-for="(item, index) in props.bannerData"
                    :key="index"
                    @click="() => navTo(item, index)"
                >
                    <view class="swiper-item" :class="'swiper-item' + index">
                        <!-- {{ item.content }} -->
                        <image
                            class="w-full h-full"
                            :src="item.imageUrl"
                            mode="scaleToFill"
                            alt=""
                        />
                        <!-- <view v-if="displayBtn" class="normal-btn bg-primary">
                            {{ item.tip }}
                        </view> -->
                    </view>
                </swiper-item>
            </swiper>
        </uni-swiper-dot>
    </view>
</template>
<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import { ga } from '@/common/common'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import _ from 'lodash'
    import { i18n } from '@/common/i18nConfig'
    import { openGame } from '@/common/game'
    const { t: $t } = i18n.global
    const store = useUsersStore()

    type T = {
        content: string
        imageUrl: string
        tip: string
    }

    interface Props {
        index?: number
        displayBtn?: boolean
        bannerData?: Array<T>
    }

    const props = withDefaults(defineProps<Props>(), {
        displayBtn: false,
        index: 1,
        bannerData: () => [],
    })

    const data = reactive<any>({
        current: 0,
        mode: 'default',
    })
    const btnText = ref('')
    btnText.value = $t('KEY_FORMBTN_REGISTER')

    const change = (e) => {
        data.current = e.detail.current
    }

    const navTo = (item, index) => {
        
        switch (item.linkType) {
            case 1:
                // let localUrl = window.location.href
                // let url = localUrl.slice(0, localUrl.indexOf('#'))
                // window.location.href = `${url}#${item.linkUrl}`
                uni.navigateTo({
                    url: `${item.linkUrl}`,
                    fail() {
                        uni.switchTab({
                            url: `${item.linkUrl}`,
                        })
                    },
                })
                break
            case 2:
                break
            case 3:
                openGame(JSON.parse(item.linkParams), 'home_game_click')
                break
            default:
        }
        // if (!item.linkUrl) return
        // window.location.href = item.linkUrl
    }
</script>
<style lang="scss">
    .swiper-dot {
        height: 100%;
    }
    .swiper-wrap {
        @apply w-full h-full;
        box-sizing: border-box;
        padding: 24rpx 0rpx 6rpx 0rpx;
    }
    .swiper-box {
        @apply rounded-14 overflow-hidden;
        width: 703rpx;
        margin: 0px auto;
        background: #343434;
        height: 100%;
    }

    .swiper-item {
        @apply flex flex-col justify-center items-center w-full h-full;
        color: #fff;
        .normal-btn {
            @apply rounded-7;
            width: 642rpx;
            height: 69rpx;
            position: absolute;
            left: 54rpx;
            bottom: 32rpx;
            font-size: 25rpx;
        }
    }
    ::v-deep .uni-swiper__dots-box {
        bottom: 16rpx !important;
    }
</style>
