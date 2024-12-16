<template>
    <Layout :headerType="0">
        <view class="proxy-view">
            <view class="proxy-info flex">
                <view class="proxy-level" @click="showLevels">
                    <!-- <view class="level-icon"></view> -->
                    <image
                        v-if="promoteUser.pLevel >= -1"
                        :src="
                            '/static/agent/badge_LV' +
                            promoteUser.pLevel +
                            '_icon.png'
                        "
                        class="level-icon"
                    ></image>
                    <image
                        src="@/static/agent/info.png"
                        mode="widthFix"
                        class="level-help"
                    ></image>
                    <!-- <view class="level-help"></view> -->
                </view>
                <view class="proxy-name-info">
                    <view class="proxy-name">
                        <text v-html="$t('KEY_AGENT_ACCOUNT')"></text>
                        :
                        <text class="proxy-name-ellipsis">
                            {{
                                store.userInfo?.mobile ||
                                store.userInfo?.username
                            }}
                        </text>
                    </view>
                    <view class="proxy-super">
                        <text v-html="$t('KEY_AGENT_SUPER')"></text>
                        :
                        {{
                            promoteUser.mobile || promoteUser.directSuperior || $t('KEY_COMMON_NONE')
                        }}
                    </view>
                </view>
                <view class="proxy-receivable">
                    <view
                        class="proxy-receivable-name"
                        v-html="$t('KEY_AGENT_RECEIVABLE')"
                    ></view>
                    <view class="proxy-receivable-money">
                        {{ promoteUser.currentComm || 0 }}
                    </view>
                </view>
            </view>
            <view class="proxy-box">
                <view class="proxy-nav">
                    <view
                        class="nav-btn"
                        v-for="(item, index) in navData"
                        :class="{ active: index === activeNav }"
                        @click="changeNav(index)"
                    >
                        <view>{{ item.text }}</view>
                    </view>
                    <view v-if="!getCommissionLoading" class="nav-btn green" @click="getCommission">
                        <view>{{ $t('KEY_AGENT_MENU_GET') }}</view>
                    </view>
                    <view v-else class="nav-btn green disabled">
                        <img src="@/static/icon/button_loading.gif" alt="" />
                    </view>
                    <view class="nav-btn red" @click="toRecords">
                        <view>{{ $t('KEY_AGENT_MENU_GET_RECORD') }}</view>
                    </view>
                </view>
                <view class="proxy-content">
                    <view class="proxy-content-box">
                        <!-- component组件不起作用-->
                        <teach
                            v-if="navData[activeNav]?.component === 'teach'"
                        ></teach>
                        <spread
                            @navigate="changeComponent"
                            :promoteUser="promoteUser"
                            v-if="navData[activeNav]?.component === 'spread'"
                        ></spread>
                        <commission
                            v-if="
                                navData[activeNav]?.component === 'commission'
                            "
                        ></commission>
                        <achievement
                            v-if="
                                navData[activeNav]?.component === 'achievement'
                            "
                        ></achievement>
                        <proportion
                            v-if="
                                navData[activeNav]?.component === 'proportion'
                            "
                        ></proportion>
                        <subordinate
                            v-if="
                                navData[activeNav]?.component === 'subordinate'
                            "
                        ></subordinate>
                    </view>
                </view>
            </view>
        </view>
    </Layout>
    <LevelModal ref="levelModalRef"></LevelModal>
</template>
<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    import achievement from './components/achievement.vue'
    import commission from './components/commission.vue'
    import proportion from './components/proportion.vue'
    import spread from './components/spread.vue'
    import teach from './components/teach.vue'
    import subordinate from './components/subordinate.vue'
    import LevelModal from './components/LevelModal.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as commonApi } from '@/NET/common'
    import { PromoteUserDto } from '@/NET/lobby/data-contracts'

    const store = useUsersStore()
    const { t: $t } = i18n.global
    const scrollTop = ref<number>(0)
    const navData = [
        {
            component: 'teach',
            text: $t('KEY_AGENT_MENU_TUTORIAL'),
        },
        {
            component: 'spread',
            text: $t('KEY_AGENT_MENU_PROMOTE'),
        },
        {
            component: 'commission',
            text: $t('KEY_AGENT_MENU_COMMISSION'),
        },
        {
            component: 'achievement',
            text: $t('KEY_AGENT_MENU_PERFORMANCE'),
        },
        {
            component: 'proportion',
            text: $t('KEY_AGENT_MENU_RATE'),
        },
        {
            component: 'subordinate',
            text: $t('KEY_AGENT_MENU_SUBORDINATE'),
        },
    ]
    const activeNav = ref<number>(0)
    const oldScrollTop = ref(0)
    const scroll = (e) => {
        oldScrollTop.value = e.detail.scrollTop
    }
    const promoteUser = ref<PromoteUserDto>({})
    const getPromoteUser = async () => {
        if (store.userInfo?.userMode !== 2) {
            return
        }
        // const res = await lobbyApi.promote.userInfo()
        const res = await commonApi.promote.promoteUserInfoCreate()
        if (res.success) {
            promoteUser.value = res.result || {}
        } else {
            ErrorHandler(res, 'getPromoteUser')
        }
    }
    const initData = () => {
        // 有人分享页面后 用当前页签打开 其实页面只切换了组件显示 没刷新
        if (!isPageFocus) {
            return
        }
        getPromoteUser()
        if (store.userInfo?.userMode === 1) {
            nextTick(() => {
                openGuestModal()
            })
        }
    }
    const payFaildOk = () => {
        uni.navigateTo({
            url: `../../pages/login/index?login_mode=2`,
        })
        console.log('ok')
    }
    const payFaildCancel = () => {
        uni.navigateTo({
            url: `../../pages/register/index?login_mode=2`,
        })
        console.log('cancel')
    }
    // 有人分享页面后 用当前页签打开 其实页面只切换了组件显示 没刷新
    let isPageFocus = true
    let modalRef = null
    const openGuestModal = () => {
        modalRef = modal({
            width: '485rpx',
            type: 'guest',
            zIndex: 201,
            title: $t('KEY_PAY_POPMESSAGE2'),
            content: $t('KEY_PAY_POPMESSAGE3'),
            confirmText: $t('KEY_FORMBTN_LOGIN'),
            cancelText: $t('KEY_FORMBTN_REGISTER'),
            maskClosable: false,
            onConfirm() {
                payFaildOk()
            },
            onCancel() {
                payFaildCancel()
            },
        })
        //RefPayFaildAlert.value.changeIsShow(true)
    }
    watch(
        () => store.userInfo,
        () => {
            initData()
        }
    )
    onShow(() => {
        isPageFocus = true
        initData()
    })
    onHide(() => {
        isPageFocus = false
        modalRef && modalRef.close()
    })
    onMounted(() => {

        uni.setNavigationBarTitle({
            title: $t('KEY_AGENT_TITLE'),
        })
    })
    const changeComponent = (component: string) => {
        const current = navData.findIndex(
            (item) => item.component === component
        )
        activeNav.value = current
    }
    const getNavClickGa = (index) => {
        if (index === 0) {
            return 'tutorial_click'
        } else if (index === 1) {
            return 'promote_click'
        } else if (index === 2) {
            return 'commission_click'
        } else if (index === 3) {
            return 'performance_click'
        } else if (index === 4) {
            return 'commission_rate_click'
        } else if (index === 5) {
            return 'my_direct_agent_click'
        }
    }
    const changeNav = (current: number) => {
        const gaStr = getNavClickGa(current)
        if (gaStr) {

        }
        scrollTop.value = oldScrollTop.value
        activeNav.value = {} as any
        nextTick(function () {
            scrollTop.value = 0
            activeNav.value = current
        })
    }
    const levelModalRef = ref(null)
    const showLevels = () => {

        levelModalRef.value?.open()
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

    const getCommissionLoading = ref(false)
    const getCommission = async () => {
      if (promoteUser.value?.currentComm <= 0) {
        return modal({
          width: '560rpx',
          type: 'warning',
          title: $t('KEY_AGENT_NO_MORE_CONDITION'),
          showCancel: false,
          showConfirm: false,
          maskClosable: true,
        })
      }
      if (getCommissionLoading.value) return
      getCommissionLoading.value = true
        // const res = await lobbyApi.promote.collect({
        //     appId: store.commonParams.appId,
        // })
        const res = await commonApi.promote.promoteCollectCreate({
            appId: store.commonParams.appId,
        })
        getCommissionLoading.value = false
        if (res.success) {
            modal({
                width: '560rpx',
                type: 'warning',
                title: $t('KEY_AGENT_SUCCESSFULLY_OBTAINED').replaceAll(
                    '#money#',
                    res.result + ''
                ),
                showCancel: false,
                showConfirm: false,
                maskClosable: true,
            })
            getPromoteUser()
            getBalance()
        } else {
            if (res.code === 'RS_NOT_ENOUGH_COMM_MONEY') {
                modal({
                    width: '560rpx',
                    type: 'warning',
                    title: $t('KEY_AGENT_NO_MORE_CONDITION'),
                    showCancel: false,
                    showConfirm: false,
                    maskClosable: true,
                })
            }
            ErrorHandler(res, 'getCommission')
        }
        // KEY_AGENT_NO_MORE_CONDITION(无可领取佣金)
    }
    const toRecords = () => {

        uni.navigateTo({
            url: '/pages/agent/records',
        })
    }
</script>
<style lang="scss">
    .proxy-view {
        @apply box-border flex flex-col;
        padding-top: 22rpx;
        height: 100%;

        .proxy-info {
            @apply rounded-7 bg-black-80;
            width: 708rpx;
            height: 120rpx;
            min-height: 120rpx;
            margin: 0rpx 21rpx;
            .proxy-level {
                @apply box-border relative;
                width: 126rpx;
                padding: 12rpx 0 0 19rpx;
                .level-icon {
                    width: 83rpx;
                    height: 83rpx;
                }
                .level-help {
                    @apply absolute left-0 bottom-0;
                    width: 28rpx;
                    height: 28rpx;
                }
            }
            .proxy-name-info {
                width: 420rpx;
                padding-top: 31rpx;
                .proxy-name {
                    @apply text-white-100;
                    font-size: 28rpx;
                    height: 31rpx;
                    line-height: 28rpx;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text {
                        white-space: nowrap;
                    }
                }
                .proxy-super {
                    font-size: 28rpx;
                    color: #7590ab;
                    line-height: 32rpx;
                    margin-top: 6rpx;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text {
                        white-space: nowrap;
                    }
                }
            }
            .proxy-receivable {
                @apply flex-1;
                text-align: right;
                padding-right: 20rpx;
                padding-top: 31rpx;
                box-sizing: border-box;
                .proxy-receivable-name {
                    height: 24rpx;
                    font-size: 28rpx;
                    color: #ffffff;
                    line-height: 28rpx;
                }
                .proxy-receivable-money {
                    font-size: 28rpx;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #f2ac35;
                    line-height: 28rpx;
                    margin-top: 12rpx;
                }
            }
        }
        .proxy-box {
            @apply flex box-border;
            height: calc(100% - 120rpx);
            padding-top: 20rpx;
            .proxy-nav {
                @apply flex items-center;
                width: 190rpx;
                min-height: 250rpx;
                flex-direction: column;
                .nav-btn {
                    @apply rounded-14 bg-black-60  flex justify-center items-center;
                    font-size: 22rpx;
                    width: 150rpx;
                    height: 71rpx;
                    line-height: 28rpx;
                    text-align: center;
                    margin-top: 17rpx;

                    &.active {
                        @apply bg-primary text-white-100;
                    }
                    &.green,
                    &.red {
                        width: 122rpx;
                        height: 51rpx;
                        color: #ffffff;
                        line-height: 22rpx;
                        view {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            padding: 0 16rpx;
                        }
                    }
                    &.green {
                        background: #28c76f;
                    }
                    &.red {
                        background: #f82e49;
                    }
                    &.disabled {
                      opacity: 0.8;
                      img {
                          width: 40rpx;
                          height: 40rpx;
                      }
                  }
                }
            }
            .proxy-content {
                @apply flex-1 box-border;
                min-height: 100%;
                .proxy-content-box {
                    height: 100%;
                    overflow: auto;
                }
            }
        }
    }
</style>
