<template>
    <Layout
        :headerTitle="$t('KEY_PAGETITLE_ME')"
        left-icon=""
        :has-header="false"
        v-if="store.userInfo"
    >
        <view class="user-view">
            <!-- <view class="bg-view">
                <view class="pure-bg"></view>
                <view class="gradient-bg"></view>
            </view> -->
            <view class="user-card rounded-14">
                <view
                    class="vip-view"
                    :class="[`vip-view${store.userInfo?.vip ?? 1}`, {'level-progress-hasbonus': store.baseConfig.isShowBonus,}]"
                    @click="goVip"
                >
                    <view class="profile_vip_box">
                      <img class="profile_vip_logo" :src="`/static/me/${(store.userInfo?.vip ?? 1) > 12 ? 13 : (store.userInfo?.vip ?? 1) % 2 ? (store.userInfo?.vip ?? 1) : (store.userInfo?.vip ?? 1) - 1 }_vip_logo.png`" alt="" />
                      <img class="profile_vip_btn" :src="`/static/me/${(store.userInfo?.vip ?? 1) > 12 ? 13 : (store.userInfo?.vip ?? 1) % 2 ? (store.userInfo?.vip ?? 1) : (store.userInfo?.vip ?? 1) - 1}_vip_btn.png`" alt="" />
                      <text class="profile_vip_text">VIP{{ store.userInfo?.vip ?? 1 }}</text>
                    </view>
                    <!-- <VIPIcon :vip="store.userInfo?.vip" /> -->
                    <!-- <view class="level-view">
                        VIP
                        {{
                            store.userInfo?.vip === 0 ? 1 : store.userInfo?.vip
                        }}
                    </view> -->
                    <!-- <view
                        class="level-progress-view"
                        :class="{
                            'level-progress-hasbonus':
                                store.baseConfig.isShowBonus,
                        }"
                        v-if="store.userInfo?.upgradeRequireBet"
                    >
                        <view
                            class="progress"
                            :style="{
                                width: `${
                                    (store.userInfo?.upgradeHasBet /
                                        store.userInfo?.upgradeRequireBet) *
                                    100
                                }%`,
                            }"
                        ></view>
                    </view> -->
                </view>
                <view class="user-detail">
                    <view class="flex items-center">
                        <view class="avatar">
                            <img src="@/static/me/Avatar.png" alt="" />
                        </view>
                        <view class="user-name text-white-100">
                            <span v-if="store.userInfo?.userMode === 1">
                                {{ $t('KEY_ME_GUESTMODE') }}
                            </span>
                            <span v-else-if="store.userInfo.mobile">
                                {{ store.userInfo.mobile }}
                            </span>
                            <span v-else-if="store.userInfo.username">
                                {{ store.userInfo.username }}
                            </span>
                            <span v-else>
                                {{ store.userInfo.nickname }}
                            </span>
                        </view>
                    </view>
                    <!-- <view class="download">{{ $t('KEY_ME_DOWNLOAD') }}</view> -->
                </view>
                <view class="mid-view">
                    <!-- <view
                        class="vip-bg"
                        :class="{
                            'vip-bg-hasbonus': store.baseConfig.isShowBonus,
                        }"
                    >
                        <img src="@/static/me/VIP.png" alt="" />
                    </view> -->
                    <view class="user-balance-view">
                        <view class="label">{{ $t('KEY_ME_MAINWALLET') }}</view>
                        <view class="user-balance">

                            <view>
                                <view class="balance" v-if="data.showBalance">
                                    <text
                                        v-if="
                                            store.baseConfig.countryId === 'BRA'
                                        "
                                    >
                                        R$
                                    </text>
                                    <text v-else>$</text>
                                    {{
                                        numberWithCommas(
                                            _.floor(store.userInfo?.cash, 2)
                                        )
                                    }}
                                </view>
                                <view class="balance" v-else>
                                    <text
                                        v-if="
                                            store.baseConfig.countryId === 'BRA'
                                        "
                                    >
                                        R$
                                    </text>
                                    <text v-else>$</text>
                                    ----
                                </view>
                            </view>
                            <!-- <view class="eye-icon" @click="changeShowBalance">
                                <img
                                    v-if="data.showBalance"
                                    src="@/static/icon/eye_opened.png"
                                    alt=""
                                />
                                <img
                                    v-else
                                    src="@/static/icon/eye_closed.png"
                                    alt=""
                                />
                            </view> -->
                        </view>

                        <view
                            class="value-item text-white-100"
                            v-if="store.baseConfig.isShowBonus"
                        >
                            <view class="label">{{ $t('KEY_ME_BONUS') }}</view>
                            <view class="cash" v-if="data.showBalance">
                                <text
                                    v-if="store.baseConfig.countryId === 'BRA'"
                                >
                                    R$
                                </text>
                                <text v-else>$</text>
                                {{ numberWithCommas(store.userInfo?.bonus) }}
                            </view>
                            <view class="cash" v-else>
                                <text
                                    v-if="store.baseConfig.countryId === 'BRA'"
                                >
                                    R$
                                </text>
                                <text v-else>$</text>
                                ----
                            </view>
                        </view>
                    </view>
                </view>

                <view class="user-btn" v-if="!store.isLogin">
                    <view
                        class="btn normal-btn bg-primary"
                        @click="() => goLogin(0, 2)"
                    >
                        {{ $t('KEY_FORMBTN_LOGIN') }}
                    </view>
                    <view
                        class="btn normal-btn bg-primary"
                        @click="() => goLogin(1)"
                    >
                        {{ $t('KEY_FORMBTN_REGISTER') }}
                    </view>
                </view>
                <view class="user-btn" v-else>
                  <view class="normal-btn btn bg-primary" @click="toDeposit">
                    {{ $t('KEY_TABBAR_DEPOSIT') }}
                  </view>
                  <view class="normal-btn btn bg-primary" @click="toWithdraw">
                      {{ $t('KEY_TABBAR_WITHDRAW') }}
                  </view>
                </view>
                <!-- <view class="logo">
                    <img
                        v-if="store.baseConfig.imgBaseUrl"
                        :src="`${store.baseConfig.imgBaseUrl}/logo/${store.baseConfig.operatorId}/me.png`"
                        alt=""
                    />
                </view> -->
            </view>
        </view>
        <view
            class="profile-scroll"
            :class="{ 'profile-scroll-hasbonus': store.baseConfig.isShowBonus }"
        >
            <view class="banner-view">
                <!-- <Banner
                    :index="3"
                    v-if="commonStore.bannerData[4]"
                    :bannerData="commonStore.bannerData[4]"
                /> -->
                <!-- <img
                    v-if="commonStore.bannerData[4]?.[0]?.imageUrl"
                    @click="navTo(commonStore.bannerData[4]?.[0])"
                    :src="commonStore.bannerData[4]?.[0]?.imageUrl"
                    alt=""
                /> -->
                <BannerImg :position="4"></BannerImg>
            </view>

            <view
                class="list-group bg-black-80"
                v-for="(item, index) in getListData"
                :key="index"
            >
                <view
                    class="list-item"
                    v-for="(items, indexs) in item.items"
                    :key="indexs"
                    @click="() => itemClick(items)"
                >
                    <view class="item-icon">
                        <img :src="items.icon" alt="" />
                    </view>
                    <view class="item-detail border-black-80">
                        <view class="item-name text-white-100">
                            {{ items.name }}
                        </view>
                        <view
                            class="un-read"
                            v-if="
                                items.name === $t('KEY_EMAIL_TITLE') &&
                                unreadCount > 0
                            "
                        >
                            <view class="un-read-count">
                                {{ unreadCount > 99 ? '99+' : unreadCount }}
                            </view>
                        </view>
                        <view v-else class="right-icon">
                            <img
                                src="@/static/icon/arrow_right_white.png"
                                alt=""
                            />
                        </view>
                    </view>
                </view>
            </view>

          <view
                class="logout-btn bg-black-80"
                @click="openDialog"
                v-if="store.userInfo?.userMode !== 1 && store.isLogin"
            >
                {{ $t('KEY_COMMON_LOGOUT') }}
            </view>
        </view>
    </Layout>
    <Dialog
        ref="RefDialog"
        :message="$t('KEY_MESSAGE_LOGOUT')"
        :successBtnText="$t('KEY_COMMON_NO')"
        :faildBtnText="$t('KEY_COMMON_YES')"
        @onFaild="DialogFaild"
        @onSuccess="DialogSuccess"
    ></Dialog>
   <!-- <SAC /> -->
</template>
<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    // import Banner from '@/lib/components/Banner.vue'
    // import VIPIcon from './VIPIcon.vue'
    import FundDetailImg from '@/static/me/chongzhijilu-me.png'
    // import CashBackImg from '@/static/me/fanjiang-me.png'
    import BetDetailImg from '@/static/me/bet-R-me.png'
    import IDDataImg from '@/static/me/ID-me.png'
    import CardImg from '@/static/me/yinhangka.png'
    import ChangePasswordImg from '@/static/me/changepassword-me.png'
    import Message from '@/static/me/message_me.png'
    // import FAQImg from '@/static/me/faq-me.png'
    // import HelpMeImg from '@/static/me/help-me.png'
    // import ShareActivityImg from '@/static/activity/share-activity.jpg'
    import Dialog from '@/lib/components/Dialog/index.vue'
    import { initUser } from '@/common/login'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as commonApi } from '@/NET/common'
    import { numberWithCommas } from '@/common/common'
    import { openGame } from '@/common/game'
    import BannerImg from '@/lib/components/BannerImg.vue'
    import _ from 'lodash'

    const { t: $t } = i18n.global
    const store = useUsersStore()
    const commonStore = useCommonStore()
    const unreadCount = ref(0)
    const getUnreadMessageCount = async () => {
        let params = Object.assign({}, store.commonParams, {
            userId: store.userInfo.userId,
        })
        // const res = await lobbyApi.message.latestMessageCount(params)
        const res = await commonApi.email.emailLatestMessageCountCreate(params)
        unreadCount.value = res.result
    }
    const data = reactive<any>({
        name: 'PROFILE',
        showBalance: true,
    })
    // const getBannersByType = async () => {
    //     let params = Object.assign(
    //         {
    //             userId: store.userInfo.userId,
    //             position: [4],
    //         },
    //         store.commonParams
    //     )
    //     let res = await lobbyApi.sCommon.banner(params)
    //     if (res.success) {
    //         commonStore.bannerData = Object.assign(
    //             commonStore.bannerData,
    //             res.result
    //         )
    //     } else {
    //         ErrorHandler(res, 'getBannersByType')
    //     }
    // }
    const getListData = computed(() => {
        let listData = [
            {
                items: [
                    // {
                    //     icon: CashBackImg,
                    //     name: $t('KEY_PAGETITLE_CASHBACK'),
                    //     path: '/pages/activity_detail/index?activity_id=100010',
                    // },
                    {
                        icon: FundDetailImg,
                        name: $t('KEY_PAGETITLE_FUNDDETAILS'),
                        path: '/pages/fund_details/index?page_type=1',
                    },
                    {
                        icon: BetDetailImg,
                        name: $t('KEY_PAGETITLE_BETRECORD'),
                        path: '/pages/bet_record/index',
                    },
                    {
                        icon: Message,
                        name: $t('KEY_EMAIL_TITLE'),
                        path: '/pages/email/index',
                    },
                ],
            },
            {
                items: [
                    {
                        icon: IDDataImg,
                        name: $t('KEY_PAGETITLE_IDDATA'),
                        path: '/pages/user_info/index',
                    },
                    {
                        icon: CardImg,
                        name: $t('KEY_PAGETITLE_CARDINFO'),
                        path: '/pages/card_list/index',
                    },
                    {
                        icon: ChangePasswordImg,
                        name: $t('KEY_PAGETITLE_CHANGEPASSWORD'),
                        path: '/pages/change_password/index',
                    },
                ],
            },
            {
                items: [
                    // {
                    //     icon: FAQImg,
                    //     name: $t('KEY_PAGETITLE_FAQ'),
                    //     path: '/pages/FAQ/index',
                    // },
                    // {
                    //     icon: HelpMeImg,
                    //     name: $t('KEY_PAGETITLE_SERVICE'),
                    //     path: '/pages/support/index',
                    // },
                ],
            },
        ]

        let gusetListData = [
            {
                items: [
                    {
                        icon: FundDetailImg,
                        name: $t('KEY_PAGETITLE_FUNDDETAILS'),
                        path: '/pages/fund_details/index?page_type=1',
                    },
                    {
                        icon: BetDetailImg,
                        name: $t('KEY_PAGETITLE_BETRECORD'),
                        path: '/pages/bet_record/index',
                    },
                ],
            },
            {
                items: [
                    {
                        icon: IDDataImg,
                        name: $t('KEY_PAGETITLE_IDDATA'),
                        path: '/pages/user_info/index',
                    },
                    {
                        icon: CardImg,
                        name: $t('KEY_PAGETITLE_CARDINFO'),
                        path: '/pages/card_list/index',
                    },
                ],
            },
            {
                items: [
                    // {
                    //     icon: FAQImg,
                    //     name: $t('KEY_PAGETITLE_FAQ'),
                    //     path: '/pages/FAQ/index',
                    // },
                    // {
                    //     icon: HelpMeImg,
                    //     name: $t('KEY_PAGETITLE_SERVICE'),
                    //     path: '/pages/support/index',
                    // },
                ],
            },
        ]
        if (store.userInfo?.userMode === 1) {
            return gusetListData
        }
        return listData
    })

    const RefDialog = ref()

    const itemClick = (item) => {
        if (item.name === $t('KEY_PAGETITLE_SERVICE')) {
            // @ts-ignore
            $crisp.push(['do', 'chat:show'])
            // @ts-ignore
            $crisp.push(['do', 'chat:open'])
            return
        }
        if (item.name === $t('KEY_EMAIL_TITLE')) {

        }
        if (
            item.name === $t('KEY_PAGETITLE_IDDATA') &&
            store.userInfo?.userMode === 1
        ) {
            uni.navigateTo({
                url: '/pages/login/index?page_type=1&login_mode=2',
            })
            return
        }
        if (item.path) {
            uni.navigateTo({
                url: item.path,
            })
        }
    }

    const changeShowBalance = () => {
        data.showBalance = !data.showBalance
        // localStorage.setItem('showCash', data.showBalance)
		 uni.setStorageSync('showCash', data.showBalance)

    }

    const logout = async () => {
        store.isLogin = false
        store.userInfo = null
        // localStorage.removeItem(`token_${store.baseConfig.operatorId}`)
        // localStorage.removeItem('guest_info')
        // localStorage.removeItem('activeModalFirstShow')
		uni.removeStorageSync(`token_${store.baseConfig.operatorId}`)
		uni.removeStorageSync('guest_info')
		uni.removeStorageSync('activeModalFirstShow')

        delete store.commonParams['userId']
        let userInfo = await initUser(store.baseConfig, store.commonParams)
        if (userInfo) {
            store.userInfo = userInfo
        }

        uni.reLaunch({
            url: `/pages/index/index`,
        })
    }

    const toDeposit = () => {
      commonStore.depositTab = 0
      uni.switchTab({ url: '/pages/deposit/index' })
    }

    const toWithdraw = () => {
      commonStore.depositTab = 1
      uni.switchTab({ url: '/pages/deposit/index' })
    }

    const openDialog = () => {
        RefDialog.value.changeIsShow(true)
    }

    const DialogFaild = () => {
        logout()
    }

    const DialogSuccess = () => {
        // console.log('SUCCESS')

    }

    const goLogin = (pageType: number, loginMode: number = 2) => {
        if (pageType === 0) {
            uni.navigateTo({
                url: `../../pages/login/index?login_mode=${loginMode}`,
            })
        } else {
            uni.navigateTo({
                url: `../../pages/register/index?login_mode=${loginMode}`,
            })
        }
    }

    watch(
        () => store.userInfo,
        () => {
            initData()
            if (store.userInfo && store.userInfo?.userMode === 2) {
                getUnreadMessageCount()
                getVipInfo()
            }
        }
    )

    const getBalance = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.initLobby.getBalance(params)
        if (res.success) {
            store.userInfo = Object.assign(store.userInfo, res.result)
        } else {
            ErrorHandler(res, 'getBalance')
        }
    }

    const getVipInfo = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        // let res = await lobbyApi.profile.getVipInfo(params)
        let res = await lobbyApi.vip.vipGetVipInfoCreate(params)
        if (res.success) {
            store.userInfo = Object.assign(store.userInfo, res.result)
        } else {
            ErrorHandler(res, 'getVipInfo')
        }
    }

    const getBanner = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                recommendType: 4,
            },
            store.commonParams
        )
        const res = await lobbyApi.profile.getCurrentActivity(params)
        if (res.success) {
            data.bannerData = res.result
        } else {
            ErrorHandler(res, 'getBanner')
        }
    }

    const navTo = (banner) => {
        switch (banner.linkType) {
            case 1:
                uni.navigateTo({
                    url: `${banner.linkUrl}`,
                    fail() {
                        uni.switchTab({
                            url: `${banner.linkUrl}`,
                        })
                    },
                })
                break
            case 2:
                break
            case 3:
                openGame(JSON.parse(banner.linkParams), 'home_game_click')
                break
            default:
        }
    }

    const initData = () => {

        if (store.userInfo) {
            // getBannersByType()
            // getBanner()
        }
    }

    const goVip = () => {
        if (!store.isLogin) {
          goLogin(0, 2)
          return
        }
        uni.navigateTo({
            url: '/pages/vip/index',
            fail() {
                uni.switchTab({
                    url: '/pages/vip/index',
                })
            },
        })
    }

    uni.setNavigationBarTitle({
        title: $t('KEY_PAGETITLE_ME'),
    })

    onShow(() => {
        // store.baseConfig.isShowBonus = true
        if (store.userInfo && store.userInfo?.userMode === 2) {
            getBalance()
            getVipInfo()
            getUnreadMessageCount()
        }
    })

    onMounted(() => {
        initData()
        // let showCash = localStorage.getItem('showCash')
        let showCash = uni.getStorageSync('showCash')
        data.showBalance = showCash === null || showCash === '' ? true : showCash.toLowerCase() === 'true'
    })

    // onShow(() => {
    //     uni.navigateTo({
    //         url: `/pages/login/index?page_type=0&login_mode=4`,
    //     })
    // })
</script>
<style lang="scss">
    .user-view {
        @apply relative;
    }

    .bg-view {
        @apply w-full absolute top-0 left-0;
        .pure-bg {
            @apply w-full;
            height: 230rpx;
        }

        .gradient-bg {
            @apply w-full;
            height: 50rpx;
        }
    }

    .user-card {
        @apply z-10 relative;
        margin: 20rpx 40rpx;
        background: linear-gradient(0deg, #282a2d, #39424a);
        box-shadow: 0rpx 5rpx 15rpx 0rpx rgba(0, 0, 0, 0.55);
        border-radius: 35rpx;

        .vip-view {
            @apply absolute right-0 top-0 flex flex-col items-center;
            z-index: 20;
            width: 180rpx;
            // right: 70rpx;
            // top: -12rpx;
            top: 11rpx;
            right: 51rpx;
            &.vip-view1, &.vip-view2 {
              top: 17rpx;
              right: 74rpx;
              .profile_vip_box {
                .profile_vip_logo {
                  width: 182rpx;
                  height: 182rpx;
                }
                .profile_vip_text {
                  color: #2F5141;
                  text-shadow: -1rpx -1rpx #b2ffbe, 1rpx 1rpx #fdfdfd;
                }
              }
            }
            &.vip-view3, &.vip-view4 {
              top: 17rpx;
              right: 67rpx;
              .profile_vip_box {
                .profile_vip_logo {
                  width: 198rpx;
                  height: 183rpx;
                }
                .profile_vip_text {
                  color: #414466;
                  text-shadow: -1rpx -1rpx #acc1fe, 1rpx 1rpx #fdfdfd;
                }
              }
            }
            &.vip-view5, &.vip-view6 {
              top: 17rpx;
              right: 64rpx;
              .profile_vip_box {
                .profile_vip_logo {
                  width: 202rpx;
                  height: 183rpx;
                }
                .profile_vip_text {
                  color: #973923;
                  text-shadow: -1rpx -1rpx #f4bfb2, 1rpx 1rpx #fdfdfd;
                }
              }
            }
            &.vip-view7, &.vip-view8 {
              top: 17rpx;
              right: 58rpx;
              .profile_vip_box {
                .profile_vip_logo {
                  width: 213rpx;
                  height: 182rpx;
                }
                .profile_vip_text {
                  color: #584166;
                  text-shadow: -1rpx -1rpx #acc1fe, 1rpx 1rpx #fdfdfd;
                }
              }
            }
            &.vip-view9, &.vip-view10 {
              top: 0rpx;
              right: 58rpx;
              .profile_vip_box {
                .profile_vip_logo {
                  width: 217rpx;
                  height: 207rpx;
                }
                .profile_vip_text {
                  color: #665841;
                  text-shadow: -1rpx -1rpx #fee8ac, 1rpx 1rpx #fdfdfd;
                }
              }
            }
            &.vip-view11, &.vip-view12 {
              top: 3rpx;
              right: 58rpx;
              .profile_vip_box {
                .profile_vip_logo {
                  width: 217rpx;
                  height: 201rpx;
                }
                .profile_vip_text {
                  color: #372E6D;
                  text-shadow: -1rpx -1rpx #7d92fb, 1rpx 1rpx #fdfdfd;
                }
              }
            }
            .profile_vip_box {
              position: relative;
              .profile_vip_logo {
                width: 229rpx;
                height: 197rpx;
              }
              .profile_vip_btn {
                width: 132rpx;
                height: 32rpx;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%)
              }
              .profile_vip_text {
                font-family: 'Eras Bold ITC';
                font-size: 24rpx;
                font-style: italic;
                position: absolute;
                bottom: 2rpx;
                left: 50%;
                transform: translateX(-50%);
                margin-left: -4rpx;
                color: #56401D;
                text-shadow: -1rpx -1rpx #ffe191, 1rpx 1rpx #fdfdfd;
              }
            }
            // .img-view {
            //     @apply flex items-center justify-center;
            //     width: 166rpx;
            //     height: 180rpx;
            //     z-index: 22;
            //     img {
            //         width: 126%;
            //     }
            // }
            // .level-view {
            //     font-size: 28rpx;
            //     font-weight: bold;
            //     color: #ffffff;
            //     margin-top: 30rpx;
            // }
            // .level-progress-view {
            //     @apply overflow-hidden;
            //     width: 250rpx;
            //     height: 8rpx;
            //     border-radius: 10rpx;
            //     margin-top: 36rpx;
            //     background: #454545;
            //     .progress {
            //         @apply bg-primary;
            //         width: 60%;
            //         height: 10rpx;
            //         border-radius: 10rpx;
            //     }
            // }
            .level-progress-hasbonus {
                margin-top: 116rpx;
            }
        }

        .user-detail {
            @apply flex justify-between items-center;
            padding: 18rpx 20rpx;
            font-size: 25rpx;
            .avatar {
                @apply flex justify-between items-center;
                width: 50rpx;
                height: 50rpx;
                margin-right: 8rpx;
                img {
                    @apply w-full;
                }
            }
            .user-name {
                @apply truncate;
                max-width: 300rpx;
                opacity: 0.5;
            }
            .download {
                border: 2rpx solid #ffffff;
                border-radius: 7rpx;
                padding: 12rpx;
            }
        }
        .mid-view {
            @apply text-white-100 bg-black-80 relative;
            background: linear-gradient(0deg, #202123, #0e0e0f);
            .vip-bg {
                @apply absolute right-0;
                top: 6rpx;
                right: 38rpx;
                z-index: 10;
                width: 250rpx;
                img {
                    @apply w-full;
                }
            }
            .vip-bg-hasbonus {
                top: 76rpx;
            }
        }
        .user-balance-view {
            @apply relative box-border;
            width: 60%;
            padding: 25rpx 40rpx 25rpx;
            min-height: 135rpx;

            .label {
                font-size: 25rpx;
                opacity: 0.2;
                min-width: 95rpx;
            }
            .value-item {
                // @apply flex;
                margin-top: 18rpx;
                font-size: 25rpx;
                .cash {
                    margin-top: 10rpx;
                }
            }
        }
        .user-balance {
            @apply flex justify-between items-center;
            margin-top: 10rpx;

            .balance {
                font-size: 40rpx;
                font-weight: bold;
            }
        }
        .user-btn {
            @apply flex justify-between items-center;
            padding: 32rpx 47rpx;
            .btn {
                width: 263rpx;
            }
        }
        .logo {
            z-index: 1;
            font-size: 115rpx;
            position: absolute;
            top: 0;
            right: 0;
            width: 420rpx;
            img {
                @apply w-full;
            }
        }
    }

    .profile-scroll {
        @apply absolute left-0 right-0 bottom-0 overflow-y-auto;
        top: 420rpx;
    }

    .profile-scroll-hasbonus {
        top: 490rpx;
    }

    .banner-view {
        @apply flex justify-center items-center overflow-hidden;
        margin: 0 40rpx 40rpx;
        height: 132rpx;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 7rpx;
        img {
            @apply w-full h-full;
            object-fit: cover;
        }
    }

    .list-group {
        color: #454545;
        padding: 0 42rpx;
        margin-bottom: 25rpx;
        .list-item {
            @apply flex items-center justify-between;
            .item-icon {
                width: 50rpx;
                margin: 0 15rpx;
                img {
                    @apply w-full;
                }
            }
            .item-detail {
                @apply flex items-center justify-between flex-1;
                padding: 28rpx;
                padding-right: 0;
                border-bottom: 2rpx solid;
            }
            .item-name {
                font-size: 28rpx;
                font-weight: 400;
            }
            .un-read {
                @apply flex items-center;
                height: 50rpx;
                .un-read-count {
                    @apply box-border text-center;
                    min-width: 42rpx;
                    height: 42rpx;
                    line-height: 42rpx;
                    padding: 0rpx 8rpx;
                    font-size: 22rpx;
                    color: #fff;
                    border-radius: 21rpx;
                    background-color: #f82e49;
                }
            }
            .right-icon {
                width: 50rpx;
                img {
                    @apply w-full;
                }
            }
            &:last-child {
                .item-detail {
                    border: 0;
                }
            }
        }
    }
    .logout-btn {
        @apply flex justify-center items-center font-normal;
        height: 100rpx;
        font-size: 28rpx;
        margin-bottom: 20rpx;
    }

    .eye-icon {
        width: 40rpx;
        height: 40rpx;
        img {
            @apply w-full;
        }
    }
</style>
