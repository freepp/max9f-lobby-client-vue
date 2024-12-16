<template>
    <Layout :hasHeader="false">
        <view class="download-view">
            <image
                :src="'/static/download/' + getActivityAsset('download_bg')"
                class="download_bg"
            ></image>
            <view class="content">
                <view>
                    <img
                        @click="close"
                        class="close"
                        src="@/static/icon/close.png"
                        alt=""
                     />
                </view>
                <!-- <view class="download-header">
                    <view>
                        <image
                            v-if="store.baseConfig.imgBaseUrl"
                            class="logo"
                            mode="widthFix"
                            :src="
                                getLogoUrl('burger_top.png', store.baseConfig)
                            "
                            alt=""
                        />
                    </view>

                </view> -->
                <view
                    class="center"
                    :class="[IS_ACTIVITY_SWITCH ? 'center_active' : '']"
                >
                    <image
                        :src="`/static/download/${
                            store.commonParams.langId
                        }/${getActivityAsset('download_center')}`"
                    ></image>
                    <!-- 文字1 -->

                </view>
                <view
                    class="sub"
                    :class="[IS_ACTIVITY_SWITCH ? 'sub_active' : '']"
                >
                    <!-- v-if="store.baseConfig.operatorId === 'own_lobby_bra3'" -->
                    <image
                        :src="`/static/download/${
                            store.commonParams.langId
                        }/${getActivityAsset(
                            store.baseConfig.operatorId === 'own_lobby_bra3'
                                ? 'download_subjogo'
                                : 'download_sub'
                        )}`"
                    ></image>
                    <!-- 文字2 -->
                </view>
                <view class="btns">
                    <view class="btn" @click="preDownload">
                        <!-- <view class="btn-inner"></view> -->

                    </view>
                    <!--
                    <view class="btn">
                        <view
                            class="btn-inner"
                            v-html="$t('KEY_DOWNLOAD_DESKTOP')"
                            @click="saveToDesk"
                        ></view>
                    </view>
                    <view class="btn">
                        <view
                            class="btn-inner"
                            v-html="$t('KEY_DOWNLOAD_OFFICIAL')"
                            @click="download"
                        ></view>
                    </view>
                    <view class="btn">
                        <view
                            v-if="
                                store.baseConfig?.operatorId === 'own_lobby_bra'
                            "
                            class="btn-inner"
                            v-html="$t('KEY_DOWNLOAD_GOOGLE')"
                            @click="downloadByGoogle"
                        ></view>
                    </view> -->
                </view>
                <view class="actions">
                    <!-- <view class="follow">
                        <image
                            :src="`/static/download/${store.commonParams.langId}/follow.png`"
                            mode="heightFix"
                        ></image>
                    </view> -->
                    <!-- <view class="telegram" @click="toTelegram">
                        <image
                            src="@/static/download/telegram.png"
                            mode="heightFix"
                        ></image>
                        Telegram
                    </view> -->
                    <!-- <view
                        class="facebook"
                        @click="toFacebook"
                        :style="{
                            color: IS_ACTIVITY_SWITCH ? '#fff' : '#3d57a1',
                        }"
                    >
                        <image
                            src="@/static/download/facebook.png"
                            mode="heightFix"
                        ></image>
                        facebook
                    </view> -->
                    <!-- <view
                        class="sac"
                        @click="openSAC"
                        :style="{
                            color: IS_ACTIVITY_SWITCH ? '#fff' : '#2ba725',
                        }"
                    >
                        <image
                            src="@/static/download/SAC.png"
                            mode="heightFix"
                        ></image>
                        SAC
                    </view> -->
                </view>
                <view class="popular">
                    <image
                        class="popolar-img"
                        :src="`/static/download/${store.commonParams.langId}/new_popular.png`"
                    ></image>
                    <view class="games">
                        <view
                            class="game"
                            v-for="game in games"
                            @click="goGame(game)"
                        >
                            <image :src="game.icon"></image>
                        </view>
                    </view>
                </view>
                <!-- <view class="site">{{ host }}</view> -->
                <!-- <view class="space"></view> -->
            </view>
        </view>
    </Layout>
</template>
<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    import { goGameDetail } from '@/common/game'
    // import Tiger from '@/static/download/fortune-tige_L777_1.5_4.jpg'
    // import Ox from '@/static/download/fortune-ox_L777_1.5_4.jpg'
    // import Rabbit from '@/static/download/Fortune-Rabbit_L777_1.5_4.jpg'
    // import Gold from '@/static/download/Piggy-Gold_L777_1.5_4.jpg'
    // import Phoenix from '@/static/download/Pimentinha-da-Fortuna_L777_1.5_4.jpg'
    // import Scratchcard from '@/static/download/Lotto-Scratchcard_L777_1.5_4.jpg'
    // import Tragon from '@/static/download/dragon-tower_L777_1.5_4.jpg'
    // import Poker from '@/static/download/Double-Win-Poker_L777_1.5_4.jpg'

    import Tiger from '@/static/download/pg_126.webp'
    import Ox from '@/static/download/pg_98.webp'
    import Rabbit from '@/static/download/pg_1543462.webp'
    import Gold from '@/static/download/pg_39.webp'
    import Phoenix from '@/static/download/pg_1695365.webp'
    import Scratchcard from '@/static/download/pg_68.webp'
    import Tragon from '@/static/download/pg_31.webp'
    import Poker from '@/static/download/pg_3.webp'

    import {
      getActivityAsset,
      IS_ACTIVITY_SWITCH,
    } from '@/common/activityAssets'
    import { getApkUrl, GET_CHANNEL_DATA } from '@/common/init'

    const store = useUsersStore()
    const { t: $t } = i18n.global
    const host = ref('')
    const opacityTheme = ref(IS_ACTIVITY_SWITCH ? 0.8 : 1)

    const saveToDesk = async () => {
        // @ts-ignore
        const promptEvent = window.deferredPrompt
        if (!promptEvent) {
            // 延迟提示不存在。
            return
        }
        // 显示安装提示。
        promptEvent.prompt()
        // Log the result
        const result = await promptEvent.userChoice
        console.log(result)
        // @ts-ignore
        window.deferredPrompt = null
    }
    const goGame = (game) => {
      download()
      return
        if (store.userInfo?.userMode === 2) {

            goGameDetail(game)
        } else {

            download()
        }
    }
    onMounted(() => {

    })

    const download = () => {
        // if (store.userInfo?.userMode === 2) {
        //     lobbyApi.redpack.downApp()
        // }
        // const cid = store.baseConfig.cid
        // switch (cid) {
        //     case 'forroudownloadapkFBclick':
        //         window.open('https://7wdx9.app.link/1nwnZ0HFgDb')
        //         return
        //     case 'lucro777downloadapkclick':
        //         window.open('https://mv7jh.app.link/WCYlEbh6jDb')
        //         return
        //     case 'lucro777downloadapkpurchase':
        //         window.open('https://pybpm.app.link/wX2Prxt6jDb')
        //         return
        // }
        if (!GET_CHANNEL_DATA().isDownload) return
        window.open(getApkUrl())
    }

    const preDownload = () => {

        download()
    }

    const games = [
        {
            appId: 'pg_126',
            appName: 'Fortune Tiger',
            icon: Tiger,
        },
        {
            appId: 'pg_98',
            appName: 'Fortune Ox',
            icon: Ox,
        },
        {
            appId: 'pg_1543462',
            appName: 'Fortune Rabbit',
            icon: Rabbit,
        },
        {
            appId: 'pg_39',
            appName: 'Piggy Gold',
            icon: Gold,
        },
        {
            appId: 'pg_1695365',
            appName: 'Fortune Dragon',
            icon: Phoenix,
        },
        {
            appId: 'pg_68',
            appName: 'Fortune Mouse',
            icon: Scratchcard,
        },
        {
            appId: 'pg_31',
            appName: 'Baccarat Deluxe',
            icon: Tragon,
        },
        {
            appId: 'pg_3',
            appName: 'Fortune Gods',
            icon: Poker,
        },
    ]
    const close = () => {

        let canNavBack = getCurrentPages()
        if (canNavBack && canNavBack.length > 1) {
            uni.navigateBack({
                delta: 1,
                // fail: () => {
                //     uni.reLaunch({
                //         url: '/pages/index/index'
                //     });
                // }
            })
        } else {
            history.back()
        }
    }
    const downloadByGoogle = () => {
        window.open(
            'https://play.google.com/store/apps/details?id=com.dhan.easy.borrow.slots&pli=1'
        )
    }
    const openSAC = () => {

        // @ts-ignore
        $crisp.push(['do', 'chat:show'])
        // @ts-ignore
        $crisp.push(['do', 'chat:open'])
    }
    const toTelegram = () => {
        // 默认lucro777

        let url = 'https://t.me/lucro777'
        if (location.host.includes('sorteslots.com')) {
            url = 'https://t.me/cassinosorte'
        } else if (location.host.includes('upupbet.com')) {
            url = 'https://t.me/cassinoupup'
        }
        // @ts-ignore
        if (window.android) {
            // @ts-ignore
            window.android.ShareChannel(url)
        } else {
            window.open(url)
        }
    }
    const toFacebook = () => {

        // 默认lucro777
        let url = 'https://www.facebook.com/100092751038282'
        if (location.host.includes('sorteslots.com')) {
            url = 'https://www.facebook.com/profile.php?id=100091302727361'
        } else if (location.host.includes('upupbet.com')) {
            url = 'https://www.facebook.com/100076778317949'
        }
        // @ts-ignore
        if (window.android) {
            // @ts-ignore
            window.android.ShareChannel(url)
        } else {
            window.open(url)
        }
    }
    // const getConfigrationAssets = (name: string) => {
    //     const result = getActivityAsset(name);
    //     return '@/static/download/bj.jpg';
    // }
    onMounted(() => {
        host.value = location.host
        uni.setNavigationBarTitle({
            title: $t('KEY_DOWNLOAD_TITLE'),
        })
    })
</script>
<style lang="scss">
    .download-view {
        position: relative;
        height: 100%;
        display: flex;

        .download_bg {
          width: 750rpx;
          height: 100%;
          position: fixed;
        }
        .close {
                width: 42rpx;
                position: absolute;
                top: 10rpx;
                right: 14rpx;
                z-index: 2;
            }
        // .download-header {
        //     @apply flex justify-between;
        //     padding: 10rpx 14rpx 16rpx;
        //     height: 36rpx;
        //     img.close {
        //         width: 42rpx;
        //     }
        //     .logo {
        //         width: 130rpx;
        //     }
        // }
        .content {
            @apply h-full flex flex-col;
            z-index: 2;
            position: relative;
            .center {
              width: 750rpx;
                image {
                  width: 750rpx;
                    display: block;
                    margin: 0 auto;
                    height: 38rpx;
                }
            }
            .center_active {
              width: 750rpx;
                image {
                  width: 750rpx;
                    display: block;
                    margin: 0 auto;
                    height: 242rpx;
                }
            }
            .sub {
                margin-top: -19rpx;
                position: relative;
                image {
                    display: block;
                    margin: 0 auto;
                    height: 172rpx;
                }
                &::after {
                    content: "";
                    width: 306rpx;
                    height: 505rpx;
                    display: block;
                    position: absolute;
                    background-image: url('@/static/download/new_lady.png');
                    background-size: 100%;
                    z-index: -1;
                    top: 165rpx
                }
            }
            .sub_active {
                @extend .sub;
                & {
                    image {
                        width: 715rpx;
                        height: 183rpx;
                    }
                }
            }
            .btns {
                // @apply flex justify-evenly;
                    position: relative;
                    margin-top: 60rpx;
                .btn {
                    @apply flex justify-center items-center box-border text-center;
                    width: 424rpx;
                    height: 137rpx;
                    font-size: 24rpx;
                    color: #ffffff;
                    line-height: 30rpx;
                    padding: 0 40rpx;
                    background: url('@/static/download/btn.png');
                    background-size: 100% 100%;
                    margin-left: 253rpx;
                    &:nth-child(1) {
                        padding: 0;
                    }

                }
                &::after {
                        content: "";
                        width: 199rpx;
                        height: 189rpx;
                        display: block;
                        position: absolute;
                        background-image: url('@/static/download/click.png');
                        background-size: 100%;
                        z-index: 2;
                        top: 98rpx;
                        right: 1rpx;
                        animation: clickAnimation 1.2s linear infinite;
                        pointer-events: none;
                    }
            }
            .actions {
                @apply flex;
                line-height: 46rpx;
                margin-top: 34rpx;
                height: 60rpx;
                font-weight: bold;
                font-size: 23rpx;
                .follow {
                    @apply flex items-center justify-end box-border;
                    width: 167rpx;
                    height: 21rpx;
                    height: 100%;
                    padding-right: 8rpx;
                    image {
                        height: 22rpx;
                    }
                }
                view {
                    @apply flex items-center;
                }
                .telegram {
                    margin-left: 20rpx;
                    color: #ffffff;
                }
                .facebook {
                    margin-left: 42rpx;
                    color: #3d57a1;
                }
                .sac {
                    margin-left: 42rpx;
                    font-style: italic;
                    color: #2ba725;
                }
                image {
                    height: 42rpx;
                    margin-right: 10rpx;
                }
            }
            .popular {
                background: rgba(0, 6, 42, 0.7);
                border-radius: 69rpx 69rpx 14rpx 14rpx;
                margin: 0 42rpx;
                margin-top: 56rpx;
                .popolar-img {
                    display: block;
                    margin: 26rpx auto 0;
                    height: 34rpx;
                    width: 484rpx;
                }
            }
            .games {
                // overflow: hidden;
                // margin-left: 21rpx;
                padding-bottom: 3rpx;
                padding-top: 18rpx;
                width: 665rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                .game {
                    border-radius: 8rpx;
                    width: 147rpx;
                    height: 205rpx;
                    flex-shrink: 0;
                    margin: 0 5rpx 19rpx;
                    // margin-left: 10rpx;
                    // margin-top: 19rpx;
                    // float: left;
                    // &:nth-child(4n + 1) {
                    //     margin-left: 0rpx;
                    // }
                    image {
                      border-radius: 8rpx;
                        @apply w-full h-full;
                    }
                }
            }
            .site {
                width: 292rpx;
                height: 35rpx;
                line-height: 35rpx;
                background: #0e0e0f;
                border: 2rpx solid #403838;
                border-radius: 17rpx;
                margin: 10rpx auto 0;
                text-align: center;
                font-size: 25rpx;
                font-weight: 400;
                color: #ffffff;
            }
            .space {
                flex: 1;
                background-color: #250406;
            }
        }
    }

@keyframes clickAnimation {

 0% {
    top: 98rpx;
    right: 1rpx;
    transform: scale(1);
}

 25% {
    top: 74rpx;
    right: 11rpx;
    transform: scale(1.1);

}

 50% {
    top: 50rpx;
    right: 21rpx;
    transform: scale(1.2);
}
75% {
    top: 74rpx;
    right: 11rpx;
    transform: scale(1.1);
}
100% {
    top: 98rpx;
    right: 1rpx;
    transform: scale(1);
}
}

</style>
