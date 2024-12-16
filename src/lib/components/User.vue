<template>
    <view class="avatar-view text-white-100">
        <view class="btn-view" v-if="!isLogin">
            <view class="logo-btn border-white-100" @click="() => goLogin(1)">
                {{ $t('KEY_FORMBTN_REGISTER') }}
            </view>
            <view class="logo-btn orange" @click="() => goLogin(0, 2)">
                {{ $t('KEY_FORMBTN_LOGIN') }}
            </view>
        </view>
        <view
            class="btn-view"
            @click="data.showDrowdown = !data.showDrowdown"
            v-else
        >
            <view class="logo-btn border-white-100 dropdown-btn">
                <view class="cash-view">
                    {{ store.baseConfig.countryId === 'BRA' ? 'R$' : '$' }}

                    {{ numberWithCommas(_.floor(userInfo?.cash, 2)) }}
                </view>
                <view class="icon-view">
                    <img
                        v-if="!data.showDrowdown"
                        src="@/static/icon/down.png"
                        alt=""
                    />
                    <img v-else src="@/static/icon/up.png" alt="" />
                </view>

                <view class="dropdown-view" v-if="data.showDrowdown">
                    <view class="triangle"></view>
                    <!-- <view class="bg-img">
                        <img
                            v-if="store.baseConfig.imgBaseUrl"
                            :src="`${store.baseConfig.imgBaseUrl}/logo/${store.baseConfig.operatorId}/dropdown.png`"
                            alt=""
                        />
                    </view> -->
                    <view class="relative z-10">
                        <view class="flex items-center">
                            <view class="avatar">
                                <img src="@/static/me/touxiang.png" alt="" />
                            </view>
                            <view class="user-name">
                                <span v-if="store.userInfo?.userMode === 1">
                                    {{ $t('KEY_ME_GUESTMODE') }}
                                </span>
                                <span v-else>
                                    {{
                                        store.userInfo.mobile
                                            ? store.userInfo.mobile
                                            : store.userInfo.username
                                    }}
                                </span>
                            </view>
                        </view>
                        <view class="balance-item">
                            <view class="label">
                                {{ $t('KEY_ME_BALANCE') }}
                            </view>
                            <view class="value-item balance">
                                {{
                                    store.baseConfig.countryId === 'BRA'
                                        ? 'R$'
                                        : '$'
                                }}
                                {{
                                    numberWithCommas(
                                        _.floor(store.userInfo?.cash, 2)
                                    )
                                }}
                            </view>
                        </view>

                        <view
                            class="balance-item"
                            v-if="store.baseConfig.isShowBonus"
                        >
                            <view class="label">{{ $t('KEY_ME_BONUS') }}</view>
                            <view class="value-item">
                                {{
                                    store.baseConfig.countryId === 'BRA'
                                        ? 'R$'
                                        : '$'
                                }}
                                {{
                                    numberWithCommas(
                                        _.floor(store.userInfo?.bonus, 2)
                                    )
                                }}
                            </view>
                        </view>
                        <view class="bottom-view" @click="goVip">
                            <view class="icon-view">
                                <img src="@/static/me/zuanshi.png" alt="" />
                            </view>
                            <view style="font-size: 28rpx; margin-left: 20rpx;">
                              VIP{{
                                  store.userInfo?.vip === 0
                                  ? 1
                                  : store.userInfo?.vip
                              }}
                            </view>
                            <!-- <view
                                class="progress-view"
                                v-if="store.userInfo?.upgradeRequireBet"
                            >
                                <view class="text-view">
                                    <view>
                                        V{{
                                            store.userInfo?.vip === 0
                                                ? 1
                                                : store.userInfo?.vip
                                        }}
                                    </view>
                                    <view>
                                        {{
                                            _.ceil(
                                                store.userInfo
                                                    ?.upgradeRequireBet -
                                                    store.userInfo
                                                        ?.upgradeHasBet
                                            )
                                        }}
                                    </view>
                                </view>
                                <view class="level-progress-view">
                                    <view
                                        class="progress"
                                        :style="{
                                            width: `${
                                                (store.userInfo?.upgradeHasBet /
                                                    store.userInfo
                                                        ?.upgradeRequireBet) *
                                                100
                                            }%`,
                                        }"
                                    ></view>
                                </view>
                            </view> -->
                        </view>
                    </view>
                </view>
            </view>
            <view class="logo-btn orange" @click.stop="toDeposit">
                {{ $t('KEY_TABBAR_DEPOSIT') }}
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
    import { numberWithCommas } from '@/common/common'
    import _ from 'lodash'

    const store = useUsersStore()
    const commonStore = useCommonStore()
    const { isLogin, userInfo } = storeToRefs(store)
    const data = reactive<any>({
        showDrowdown: false,
    })

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

    const toDeposit = () => {
        commonStore.depositTab = 0
        uni.switchTab({ url: '/pages/deposit/index' })
    }

    const goVip = () => {
        uni.navigateTo({
            url: '/pages/vip/index',
            fail() {
                uni.switchTab({
                    url: '/pages/vip/index',
                })
            },
        })
    }

    onMounted(() => {
        nextTick(() => {
            document.addEventListener(
                'click',
                (e) => {
                    const target = e.target as HTMLElement
                    let dropDownBtn =
                        document.getElementsByClassName('dropdown-btn')[0]
                    let cashView =
                        document.getElementsByClassName('cash-view')[0]
                    let iconView =
                        document.getElementsByClassName('icon-view')[0]
                    let dropdownView =
                        document.getElementsByClassName('dropdown-view')[0]
                    if (target === dropDownBtn) return
                    if (target === cashView) return
                    if (target === iconView) return
                    if (!dropdownView) return

                    if (!dropdownView.contains(target)) {
                        data.showDrowdown = false
                    }
                },
                true
            )
        })
    })
</script>
<style lang="scss">
    .avatar-view {
    }

    .nologin {
        @apply flex items-center;
    }

    .btn-view {
        @apply flex justify-between items-center box-border h-full;
    }

    .logo-btn {
        @apply flex justify-center items-center relative;
        height: 60rpx;
        border-radius: 8rpx;
        font-size: 28rpx;
        padding: 0 18rpx;
        margin-left: 14rpx;
        border-width: 2rpx;
        border-style: solid;
        box-sizing: border-box;
        min-width: 150rpx;

        .cash-view {
            @apply flex-1 truncate;
            max-width: 230rpx;
        }

        .icon-view {
            @apply flex items-center;
            width: 18rpx;
            margin-left: 10rpx;
            img {
                @apply w-full;
            }
        }
    }

    .dropdown-view {
        @apply absolute box-border;
        top: 90rpx;
        right: -160rpx;
        width: 356rpx;
        background-color: #fff;
        border-radius: 8rpx;
        color: #646768;
        padding: 20rpx;
        box-shadow: 0px 9rpx 20rpx 0rpx rgba(0, 0, 0, 0.14);

        .bg-img {
            @apply absolute right-0 top-0;
            width: 280rpx;
            z-index: 0;
            img {
                @apply w-full;
            }
        }

        .avatar {
            @apply flex justify-between items-center;
            width: 50rpx;
            height: 50rpx;
            margin-right: 13rpx;
            img {
                @apply w-full;
            }
        }
        .user-name {
            // opacity: 0.5;
            @apply truncate;
            width: 240rpx;
            font-size: 24rpx;
        }
        .download {
            border: 2rpx solid #ffffff;
            border-radius: 7rpx;
            padding: 12rpx;
        }
        .balance-item {
            margin-top: 10rpx;
            color: #0e0e0f;
            padding: 0 10rpx;
            .label {
                font-size: 22rpx;
                opacity: 0.7;
            }
            .value-item {
                @apply flex;
                font-size: 26rpx;
                font-weight: bold;
            }
            .balance {
                font-size: 36rpx;
            }
        }
        .bottom-view {
            @apply flex text-20 text-black-60 items-center;
            margin-top: 25rpx;
            border-top: 2rpx solid #c5c5c5;
            padding-top: 20rpx;
            padding-bottom: 8rpx;
            .icon-view {
                width: 46rpx;
                margin: 0;
            }
            .progress-view {
                @apply flex-1;
                padding-left: 10rpx;
            }
            .text-view {
                @apply flex justify-between text-black-60;
                padding: 0 6rpx;
            }
            .level-progress-view {
                @apply overflow-hidden;
                width: 100%;
                height: 14rpx;
                border-radius: 14rpx;
                margin-top: 10rpx;
                background: #d1d1d1;
                .progress {
                    @apply bg-primary;
                    width: 60%;
                    height: 14rpx;
                    border-radius: 14rpx;
                }
            }
        }
    }

    .triangle {
        position: absolute;
        left: 80rpx;
        top: -12rpx;
    }

    .triangle::before {
        content: '';
        position: absolute;
        top: -0;
        left: 0;
        width: 0;
        height: 0;
        border-top: 0 solid transparent;
        border-right: 16rpx solid transparent;
        border-bottom: 12rpx solid #fff;
        border-left: 16rpx solid transparent;
    }

    .orange {
        background: url('@/static/index/btn-bg.gif');
        background-size: 100% 100%;
        border: 0;
    }
</style>
