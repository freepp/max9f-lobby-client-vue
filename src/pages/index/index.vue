<template>
  <!-- <button @click="addToDesktop">添加到桌面</button> -->
  <view class="w-full h-full">
    <view id="mask_modal"></view>
    <view class="search-view">
      <Search ref="RefSearch" />
    </view>

    <Activity :alertConfig="data.alertConfig" @confirm="personalConfirm" @close="activityCloseFn" />
    <Layout :headerType="0" @appShowDownload="changeAppDownload">
      <view class="index-container">
        <view claBannerss="container-content">
          <view class="banner-view">
            <Banner
              v-if="commonStore.bannerData[2]"
              :index="1"
              :display-btn="true"
              :bannerData="commonStore.bannerData[2]"
            />
          </view>

          <Report
            :marqueesData="data.marqueesData"
            :unread-count="unreadCount"
          />
          <!-- <div class="search-trigger flex items-center" @click="openSearch(true)">
            <image src="@/static/icon/search_round.png" mode="widthFix"></image>
            <view class="text-26">Buscar</view>
          </div> -->
          <PromotionEntry
            ref="RefPromotionEntry"
            :type="1"
            :data="currentActivity"
            :drawableAmount="drawableAmount"
          ></PromotionEntry>
          <Category
            v-if="store.baseConfig.countryId"
            ref="RefCategory"
            :categoryData="data.categoryData"
            @openSearch="openSearch"
          />
        </view>
        <Winner
          v-if="data.marqueePicsData?.length > 0"
          :marquees="data.marqueePicsData"
        ></Winner>
        <view class="quick-entrys">
          <view class="game-entry" @click="toAllGame">
            <image src="@/static/icon/more_game.png"></image>
            {{ $t('KEY_INDEX_MORE_GAME') }}
          </view>
          <view class="search-entry" @click="openSearch">
            <image src="@/static/icon/search_game.png"></image>
            {{ $t('KEY_INDEX_SEARCH') }}
          </view>
        </view>
        <BindMobile
          ref="bindMobileRef"
          @close="onBindMobileClose"
          :showIcon="store.commonParams?.operatorId !== 'own_lobby_bra2'"
        ></BindMobile>
        <Footer />
      </view>
    </Layout>

    <SignInPopUp
      @click="manualSignOpen = true"
      v-show="!commonStore.isSign"
      :sacpro="data.alertConfig.indexFloatingWindows?.length > 0"
      :bonusIndex="!data.alertConfig?.timelimitpayInfo?.hasPay && data.alertConfig?.timelimitpayInfo?.countDown > 0"
      :popUp="popOpen"
    />
    <PopUp
      ref="PopUpRef"
      @click="manualOpen = true"
      v-show="popOpen"
      :sacpro="data.alertConfig.indexFloatingWindows?.length > 0"
      :bonusIndex="!data.alertConfig?.timelimitpayInfo?.hasPay && data.alertConfig?.timelimitpayInfo?.countDown > 0"
      @close="popOpen = false"
    />
    <BonusIndex
      @click="bonusDetail()"
      v-show="!data.alertConfig?.timelimitpayInfo?.hasPay && data.alertConfig?.timelimitpayInfo?.countDown > 0"
      :alertConfig="{...data.alertConfig, sacpro:data.alertConfig.indexFloatingWindows?.length > 0}"
    />
    <SACPRO
      v-show="data.alertConfig.indexFloatingWindows?.length > 0"
      :alertConfig="data.alertConfig"
      @open-index-table="openIndexTable"
    />
    <AppDownloadIndex @is-show-assistanter="isShowAssistanter" :isShare="true" />
    <!-- #ifdef H5 -->
    <!-- <AppDownloadIndex @is-show-assistanter="isShowAssistanter" :isShare="true" /> -->
    <!-- #endif -->
    <!-- <Tip v-if="isPwaGuidShow"></Tip> -->
  </view>

  <Assistanter
    ref="assistanterRef"
    :link-text="$t('KEY_SIGNIN_OPEN')"
    @on-close="onAssistanterClose"
    @on-link-click="onAssistanterClick"
    :z-index="1500"
    :content="commonStore.assistanterList.find((item) => item.tipsId === 1)?.template"
  ></Assistanter>
  <red-package
    ref="redPackageRef"
    v-model="rollTimes"
    :total="withdrawAmount"
    :price="redPackageAmount"
    @close="onRedPackageClose"
    @close-table="onTableClose"
  ></red-package>
  <BankruptcyBenefits
    :isOpen="isOpen"
    :manualOpen="manualOpen"
    @close="bankruptcyBenefitsCloseFn"
    @closeManualOpen="isOpen = false, manualOpen = false"
  ></BankruptcyBenefits>
  <SignIn
    v-if="isSignInOpen || manualSignOpen"
    :manualOpen="manualSignOpen"
    @close="isSignInOpen = false, manualSignOpen = false, isFirstShowTable && showTable()"
    @closeManualOpen="isSignInOpen = false, manualSignOpen = false"
    @closePopUp="commonStore.isSign = true"
  ></SignIn>
</template>

<script setup lang="ts">
    import Layout from '@/lib/layout/Base.vue'
    //import Tip from './pwa/Tip.vue'
    import Banner from '@/lib/components/Banner.vue'
    import BindMobile from '@/lib/components/BindMobile/index.vue'
    import Report from '@/lib/components/Report/index.vue'
    import Category from './Category/index.vue'
    import Winner from './Category/Winner.vue'
    import Footer from '@/lib/layout/Footer/index.vue'
    import SACPRO from '@/lib/components/DrawBall/SACPro.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as commonApi } from '@/NET/common'
    import { api as xxyyApi } from '@/NET/xxyy'
    import { api as activityApi } from '@/NET/activity'
    import Search from '@/lib/components/Search/index.vue'
    import Activity from '@/lib/components/Activity/index.vue'
    import Assistanter from '@/lib/components/Assistanter/index.vue'
    import PromotionEntry from '@/lib/components/PromotionEntry/index.vue'
    import { getGaid, queryURLParams } from '@/common/common'
    import { initApi } from '@/common/login'
    import _ from 'lodash'
    import { message } from '@/lib/components/Message'
    import { currentActivity, getCurrentActivity } from '@/common/activity'
    import { startInterval, stopInterval } from './Category/positionChange'
    import RedPackage from '@/lib/components/RedPackage/index.vue'
    import AppDownloadIndex from '@/lib/components/AppDownload/app-download-index.vue'
    import BonusIndex from '@/lib/components/Bonus/index.vue'
    import BankruptcyBenefits from '@/lib/components/BankruptcyBenefits/index.vue'
    import PopUp from '@/lib/components/BankruptcyBenefits/popUp.vue'
    import SignIn from '@/lib/components/SignIn/index.vue'
    import SignInPopUp from '@/lib/components/SignIn/signInPopUp.vue'

    const { t: $t } = i18n.global
    const store = useUsersStore()
    const commonStore = useCommonStore()
    const route = useRoute()

    const isFirstShowTable = ref(true)

    /* 破产礼包 */
    const PopUpRef = ref(null)
    const isFirst = ref(true)
    const isOpen = ref(false)
    const activityClose = ref(false)
    const popOpen = ref(false) // 侧边悬浮框
    const manualOpen = ref(false) // 手动打卡弹框
    watch(() => [commonStore.couponpackInfo, store.userInfo, activityClose], () => {
      popOpen.value = store?.userInfo?.userMode === 2 ? commonStore?.couponpackInfo?.isOpen : false
      if (popOpen.value && isFirst.value && store?.userInfo?.userMode === 2 && activityClose.value) {
        isFirst.value = commonStore?.couponpackInfo?.countDown > 0 ? false : true
        isOpen.value = commonStore?.couponpackInfo?.countDown > 0 ? true : false
      }
    }, {
      immediate: true,
      deep: true
    })
    function bankruptcyBenefitsCloseFn() {
      isOpen.value = false
      manualOpen.value = false
      setTimeout(() => {
        if (!isSignInOpen.value && isFirstShowTable.value) {
          showTable()
        }
      }, 100);
    }

    /* 7天签到 */
    const isSignInOpen = ref(false)
    const manualSignOpen = ref(false)
    watch(() => [activityClose, isOpen, commonStore.isSign], () => {
      if (!isOpen.value && activityClose.value && !commonStore.isSign && store?.userInfo?.userMode === 2) {
        isSignInOpen.value = true
      }
    }, {
      immediate: true,
      deep: true
    })

    const RefPromotionEntry = ref()

    const bindMobileRef = ref(null)
    const redPackageRef = ref(null)
    const onRedPackageClose = () => {
        redPackageRef.value.closeModal()
        uni.navigateTo({
            url: '/pages/red_package/index',
        })
    }
    let appShowAssistanter = 0
    const onTableClose = () => {
        let isApp = uni.getStorageSync('isApp')
        if (isApp == 'true' && appShowAssistanter == 0) {
            appShowAssistanter = 1
            // showAssistanter()
        }
    }
    const data = reactive<any>({
        bannerData: [],
        marqueesData: [],
        marqueePicsData: [],
        isTipPersonalForm: false,
        alertConfig: {},
        indexFloatingWindows: [],
        categoryData: [
            {
                categoryId: 1,
                topLevelType: 1,
                categoryName: $t('KEY_MENU_TOPGAMES'),
            },
            {
                categoryId: 3,
                topLevelType: 2,
                categoryName: $t('KEY_MENU_NEWGAMES'),
            },
            {
                categoryId: 17,
                topLevelType: 3,
                categoryName: $t('KEY_MENU_TADA'),
            },
            {
                categoryId: 18,
                topLevelType: 4,
                categoryName: $t('KEY_MENU_PLAY'),
            },
            {
                categoryId: 15,
                topLevelType: 8,
                categoryName: $t('KEY_MENU_ALLGAMES'),
            },
            {
                categoryId: 0,
                topLevelType: 0,
                categoryName: $t('KEY_MENU_FORYOU'),
            },
        ],
        appDownloadShow: true,
    })

    const RefSearch = ref()
    const RefCategory = ref()

    const onAssistanterClose = () => {

    }
    const assistanterRef = ref(null)
    const showAssistanter = () => {
        assistanterRef.value?.show()

    }
    const isShowAssistanter = () => {
        // showAssistanter()
    }
    // uni.$once('showIndexTable', () => {
    //     showTable()
    // })
    watch(
        () => store.userInfo,
        (val) => {
            initData()

            if (store.userInfo) {
                // getCurrentActivity()
                if (store.userInfo?.userMode === 2) {
                    getUnreadMessageCount()
                    getDrawableAmount()
                    // setNotifyLoop()
                }
            }
        }
    )
    /** 解决退出/登录 banner不刷新问题 */
    const getBannersByType = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                position: [2],
            },
            store.commonParams
        )

        // let res = await lobbyApi.sCommon.banner(params)

        let res = await commonApi.banner.bannerBannerCreate(params)
        if (res.success && commonStore.bannerData) {
            commonStore.bannerData = Object.assign(
                commonStore.bannerData,
                res.result
            )
        } else {
            ErrorHandler(res, 'getBannersByType')
        }
    }
    let notifyTimer = null
    const setNotifyLoop = async () => {
        notifyTimer = setInterval(async () => {
            if (!store.userInfo || store.userInfo?.userMode === 1) {
                return
            }
            let params = Object.assign(
                {
                    userId: store.userInfo.userId,
                    actionAt: 3,
                    showAt: 1,
                },
                store.commonParams
            )
            // const notifyRes = await lobbyApi.sCommon.notify(params)
            const notifyRes = await commonApi.notify.notifyNotifyCreate(params)
            if (notifyRes.success) {
                const list = notifyRes.result
                list?.forEach((item) => {
                    const title = item.content
                    message({
                        message: title,
                        duration: item.closeInterval
                            ? item.closeInterval * 1000
                            : 3000,
                    })
                })
                // 余额有变动
                if (
                    Array.isArray(list) &&
                    list.length !== 0 &&
                    store.userInfo &&
                    store.userInfo?.userMode === 2
                ) {
                    getBalance()
                }
            }
        }, 10000)
    }
    onHide(() => {
        stopInterval()
        notifyTimer && clearInterval(notifyTimer)
    })

    const getMarquees = async () => {
        let params = Object.assign({}, store.commonParams)
        params = Object.assign(params, {
            userId: store.userInfo.userId,
            position: 0,
            //轮播类型，0:文字，1:图片
            marqueeType: 0,
        })
        // let res = await lobbyApi.sCommon.marquee(params)
        let res = await commonApi.marquee.marqueeMarqueeCreate(params)
        if (res.success) {
            data.marqueesData = res.result
            data.marqueesData.forEach((item) => {
                item.msg = item.messageContent
            })
        } else {
            ErrorHandler(res, 'getMarquees')
        }
    }
    const getMarqueePics = async () => {
        let params = Object.assign({}, store.commonParams)
        params = Object.assign(params, {
            userId: store.userInfo.userId,
            position: 0,
            //轮播类型，0:文字，1:图片
            marqueeType: 1,
        })
        // let res = await lobbyApi.sCommon.marquee(params)
        //0613注释 start
        // let res = await commonApi.marquee.marqueeMarqueeCreate(params)
        // if (res.success) {
        //     data.marqueePicsData = res.result || []
        // } else {
        //     ErrorHandler(res, 'getMarqueePics')
        // }
        //0613注释 end
    }
    // 获取一级分类（一级分类数据暂存本地）
    const getCategorys = async () => {
        commonStore.categoryTabList = data.categoryData
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.home.categoryList(params)
        if (res.success) {
            let category = res.result
            // 创建一个新的 data.categoryData 数组，覆盖原有 data.categoryData 数组的 categoryId
            const updatedListb = data.categoryData.slice(0, -1).reduce((acc, itemB) => {
                // 根据 topLevelType 查找 category 中是否有匹配项
                const match = category.find(itemA => itemA.topLevelType === itemB.topLevelType);
                // 如果找到匹配项，用 category 的 categoryId 覆盖 data.categoryData 的 categoryId
                if (match) {
                    acc.push({ ...itemB, categoryId: match.categoryId });
                }
                return acc;
            }, []);
            // 始终保留 data.categoryData 最后一项
            updatedListb.push(data.categoryData.at(-1));
            data.categoryData = [...updatedListb]
            commonStore.categoryTabList = [...updatedListb]
            // let tempArr = []
            // let tempCategory: any = {}
            //         category.forEach((item) => {
            //             tempCategory = null
            //             tempCategory = data.categoryData.find(
            //                 (items) => items.topLevelType === item.topLevelType
            //             )

            //             if (tempCategory) {
            //                 tempCategory.categoryId = item.categoryId
            //                 tempArr.push(tempCategory)
            //             }
            //         })
            //         data.categoryData = tempArr
            //  console.log('data.categoryData' , data.categoryData)
            //          data.categoryData.push({
            //              categoryId: 0,
            //              topLevelType: 0,
            //              categoryName: $t('KEY_MENU_FORYOU'),
            //          })

            if (RefCategory.value) {
              nextTick(() => {
                RefCategory.value.chooseTab(0)
              })
            }
        } else {
            ErrorHandler(res, 'getCategorys')
        }
    }

    const getLoad = async () => {
        commonStore.isSign = true
        isSignInOpen.value = false
        manualSignOpen.value = false
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.initLobby.load(params)
        if (res.success) {
            data.isTipPersonalForm = res.result.isTipPersonalForm
            data.alertConfig = { ...res.result }
            if (store?.userInfo?.userMode === 2) {
              commonStore.isSign = res.result.isSign
            }
        } else {
            ErrorHandler(res, 'getLoad')
        }
    }

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

    const openSearch = (type) => {

        RefSearch.value.changeIsShow(type)
    }

    const personalConfirm = () => {
        getLoad()
    }
    const unreadCount = ref(0)
    const getUnreadMessageCount = async () => {
        let params = Object.assign(store.commonParams, {
            userId: store.userInfo.userId,
        })
        // const res = await lobbyApi.message.latestMessageCount(params)
        const res = await commonApi.email.emailLatestMessageCountCreate(params)
        unreadCount.value = res.result
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
    const isPwaGuidShow = ref(false)
    const changeAppDownload = async (type) => {
        data.appDownloadShow = type
        const isStandalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            // @ts-ignore
            window.navigator.standalone ||
            document.referrer.includes('android-app://')
        // @ts-ignore
        const isInApp = window.android
        // console.log(!type, !isStandalone, !isInApp)
        if (!type && !isStandalone && !isInApp) {
            isPwaGuidShow.value = true
        }
    }

    const OAuthCallBack = async () => {
        let options = queryURLParams()
        console.log(options)
        if (!options.access_token) return
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                authCallbackIpo: {
                    code: options.code,
                    state: options.state,
                    access_token: options.access_token,
                    oAuthType: Number(options.oAuthType),
                },
                LoginMode: 8,
                GAID: getGaid(),
            },
            store.commonParams
        )
        let res = await xxyyApi.oAuth.oAuthLogin(params)
        if (res.success) {
            /* localStorage.setItem(
                                                                                                                                                                                                                                    `token_${store.baseConfig.operatorId}`,
                                                                                                                                                                                                                                    res.result.jwtToken
                                                                                                                                                                                                                                )
                                                                                                                                                                                                                                localStorage.removeItem('guest_info') */
            uni.setStorageSync(
                `token_${store.baseConfig.operatorId}`,
                res.result.jwtToken
            )
            uni.removeStorageSync('guest_info')
            store.userInfo = res.result
            store.isLogin = true
            initApi(
                store.baseConfig.xxyyUrl,
                store.baseConfig.appUrl,
                store.baseConfig.commonUrl,
                store.baseConfig.activityUrl,
                res.result.jwtToken
            )
            // 如果是授权登录 且没有手机号 则弹出绑定弹窗
            if (!store.userInfo.mobile) {
                uni.setStorageSync('oauthSuccess', '1')
            }
            uni.reLaunch({
                url: '/pages/index/index',
            })
        } else {
            ErrorHandler(res, 'getBalance')
        }
    }
    const drawableAmount = ref(0)
    const getDrawableAmount = async () => {
        let params = Object.assign(
            {
                DeviceId: commonStore.deviceInfo?.deviceId,
            },
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        // let res = await lobbyApi.task.getDrawableAmount(params)
        let res = await activityApi.task.taskGetDrawableAmountCreate(params)
        if (res.success) {
            drawableAmount.value = res.result
            // drawableAmount.value = 1
        } else {
            ErrorHandler(res, 'getDrawableAmount')
        }
        // let res2 = await lobbyApi.task.getTaskTips(store.commonParams)
        // console.log(res2)
    }
    const onAssistanterClick = () => {

        if (store.userInfo?.userMode === 2) {
            uni.navigateTo({
                url: '/pages/signin/index',
            })
        } else {
            uni.navigateTo({
                url: '/pages/login/index',
            })
        }
    }
    const getTaskTips = async () => {
        let params = Object.assign(
            {
                DeviceId: commonStore.deviceInfo?.deviceId,
            },
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        // let res = await lobbyApi.task.getTaskTips(params)
        let res = await activityApi.task.taskGetTaskTipsCreate(params)
        if (res.success) {
            commonStore.assistanterList = res.result
            // drawableAmount.value = 1
        } else {
            ErrorHandler(res, 'getTaskTips')
        }
    }
    const rollTimes = ref(0)
    const withdrawAmount = ref(10000)
    const redPackageAmount = ref(0)
    const showTable = () => {
      isFirstShowTable.value = false
        // 第一次摇奖
        if (redPackageAmount.value === 0 && rollTimes.value === 1) {
            redPackageRef.value.showTable()
            return
        }
        // 从邀请页面注册成功
        if (
            redPackageAmount.value !== 0 &&
            uni.getStorageSync('redPackageRolled')
        ) {
            redPackageRef.value.showModal()
            uni.removeStorageSync('redPackageRolled')
            return
        }
        // 显示小助手
        //showAssistanter()
    }
    const checkRedPackage = async () => {
        let params = Object.assign(
            {},
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        // let res = await lobbyApi.redpack.packInfo(params)

        //0613注释 start
        let res = await activityApi.redpack.redpackPackInfoCreate(params)
        if (res.success) {
            rollTimes.value = res.result.remainingNum
            withdrawAmount.value = res.result.packAmount
            redPackageAmount.value = res.result.amount
            // drawableAmount.value = 1
        } else {
            ErrorHandler(res, 'checkRedPackage')
        }
        //0613注释 end
    }
    const openIndexTable = async () => {
        await checkRedPackage()
        // 第一次摇奖
        if (redPackageAmount.value === 0 && rollTimes.value === 1) {
            redPackageRef.value.showTable()
        } else {
            uni.navigateTo({
                url: '/pages/red_package/index',
            })
        }
    }
    const initData = async () => {
        if (store.userInfo) {
            removeGlobalLoading()
            if (store.userInfo.userMode === 1) {
                // OAuthCallBack()
            }

            if (store.userInfo.userMode === 2) {
                getVipInfo()
                getTaskTips()
                checkRedPackage()
                getBalance()
            }
            getBannersByType()
            getMarquees()
            getMarqueePics()
            await getLoad()
            await getCategorys()

            try {
                let u = navigator.userAgent
                let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
                let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
                if (isAndroid) {
                    // @ts-ignore
                    window.android.loadFinish()
                }
                if (isIOS) {
                    // @ts-ignore
                    window.webkit.messageHandlers.loadFinish()
                }
            } catch (err) {}
        }
    }

    const createBtn = () => {
        nextTick(() => {
            const btn = document.createElement('a')
            btn.setAttribute('herf', 'javascript:;')
            btn.setAttribute(
                'onclick',
                "window.parent.postMessage({action: 'goHome',},'*')"
            )
            btn.innerHTML = 'postMessage'
            document.getElementById('mask_modal').appendChild(btn)
            btn.click()
            document.getElementById('mask_modal').removeChild(btn)
        })
    }

    function activityCloseFn() {
      activityClose.value = true
      setTimeout(() => {
        if (!isOpen.value && !isSignInOpen.value && isFirstShowTable.value) {
          showTable()
        }
      }, 100);
    }

    defineExpose({
        openSearch,
    })

    onLoad((options) => {
        // uni.setStorageSync('oauthSuccess', '1')
        if (window.top.location.href != window.location.href) {
            createBtn()
        }
    })

    onShow(() => {
        //setNotifyLoop()
        startInterval()
        if (store.userInfo) {
            // getCurrentActivity()
        }
        if (store.userInfo && store.userInfo?.userMode === 2) {
            getUnreadMessageCount()
            getBalance()
            getDrawableAmount()
        }
        // if (store.baseConfig.countryId === 'MEX') {
        //     uni.setNavigationBarTitle({
        //         title: '777GANA™| Mejor Casino en línea » Bono de $1,1000',
        //     })
        // } else if (store.baseConfig.countryId === 'BRA') {
        //     uni.setNavigationBarTitle({
        //         title: 'LUCRO777™| Seu Melhor Cassino em Casa',
        //     })
        // }
    })
    const toAllGame = () => {
        const idx = data.categoryData.findIndex(item => item.topLevelType === 8)
        if (idx > -1) commonStore.categoryTabIndex = idx
    }
    const onBindMobileClose = () => {
        uni.removeStorageSync('oauthSuccess')
    }
    const bonusDetail = () => {
        var operatorId = store.commonParams.operatorId;
        switch(operatorId){
            case 'own_lobby_bra1':
                commonStore.depositTab = 0
                uni.switchTab({ url: '/pages/deposit/index' });
                break;
            default:
                uni.navigateTo({
                    url: '/pages/bonus/index',
                })
                break;
        }

        // uni.navigateTo({
        //     url: '/pages/bonus/index',
        // })
    }

    const removeGlobalLoading = () => {
        const globalLoading = document.querySelector('#globalLoading')
        if (globalLoading) {
            // @ts-ignore
            window.setGlobalLoading(75)
            // @ts-ignore
            window.setGlobalLoading(100)
            setTimeout(() => {
                globalLoading.parentNode.removeChild(globalLoading)
            }, 100)
        }
    }

    const syncData = async () => {
        if (store?.userInfo?.userMode !== 2) return
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                syncTypes: [1],
                pageType: 0,
            },
            store.commonParams
        )

        const currentPages = getCurrentPages()
        if (currentPages?.[0]?.route === 'pages/index/index' && route.path === '/') {
          params.pageType = 1
        }
        if (currentPages?.at(-1)?.route === 'pages/game/index' && route.path === '/pages/game/index') {
          params.pageType = 2
        }

        let res = await lobbyApi.home.sync(params)
        if (res.success) {
            Object.assign(store.userInfo, res.result.balance)
            Object.assign(commonStore.couponpackInfo, res.result.couponpackInfo)
        } else {
            ErrorHandler(res, 'sync')
        }
    }

    onMounted(() => {
      // @ts-ignore
      if (window.android) {
        // APP环境下，正常首次跳转会无法使用navigateBack返回
        if (uni.getStorageSync('isAppFirstToEmpty') === '1') {
          RefPromotionEntry.value?.dispose()
          uni.navigateTo({
            url: '/pages/empty/index',
          })
          return
        }
      }
        //redPackageRef.value.showModal()

        if (!store.userInfo?.mobile && uni.getStorageSync('oauthSuccess') === '1') {
            bindMobileRef.value.openDialog(true)
        }
        initData()
        popOpen.value = false
        isFirst.value = true
        isFirstShowTable.value = true
        syncData()
        //redPackageRef.value.showTable()
        // // 判断用户是否安装此应用：beforeinstallprompt,如果用户已经安装过了,那么该事件不会再次触发
        // // 需要卸载，然后重新打开浏览器才能再次触发
        // window.addEventListener('beforeinstallprompt', (e) => {
        //     console.log('表示没有安装过', e)
        //     e.preventDefault()
        //     deferredPrompt = e
        // })

        // // 安装完成后触发,即点击安装弹窗中的“安装”后被触发
        // window.addEventListener('appinstalled', () => {
        //     console.log(3333)
        //     deferredPrompt = null
        // })
        // if (store.isLogin) showAssistanter()
        // else assistanterRef.value?.close()
    })
    // const addToDesktop = () => {
    //     // 调用prompt()方法触发安装弹窗
    //     deferredPrompt?.prompt()
    //     deferredPrompt = null
    // }
</script>

<style lang="scss">
    .search-view {
        @apply absolute left-0 right-0 bottom-0;
        top: 74rpx;
    }
    .hasDownload {
        top: 134rpx;
    }
    .index-container {
        @apply box-border flex flex-col;
        min-height: 100%;
    }

    .container-content {
        flex: 1;
    }
    // .search-trigger {
    //     height: 90rpx;
    //     background: #272727;
    //     border: 2rpx solid #37383c;
    //     margin: 19rpx 24rpx 0rpx;
    //     border-radius: 6rpx;
    //     color: rgba(255, 255, 250, 0.6);
    //     image {
    //         width: 42rpx;
    //         margin-left: 19rpx;
    //         margin-right: 32rpx;
    //     }
    // }
    .quick-entrys {
        @apply box-border flex justify-around;
        padding: 0rpx 24rpx;
        margin-top: 36rpx;
        view {
            @apply box-border flex justify-center items-center;
            width: 346rpx;
            height: 90rpx;
            background: rgba(23, 113, 61, 0);
            border: 2rpx solid #ffffff;
            border-radius: 6rpx;
            font-size: 28rpx;
            color: #ffffff;
            image {
                width: 40rpx;
                height: 40rpx;
                margin-right: 16rpx;
            }
        }
    }
    .banner-view {
        height: 314rpx;
    }
</style>
