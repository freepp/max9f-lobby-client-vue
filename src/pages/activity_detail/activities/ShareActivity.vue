<template>
    <view class="activity-view">
        <image
            class="w-full"
            src="@/static/activity/1.4-share.jpg"
            mode="widthFix"
        ></image>
        <view class="detail">
            <view class="share-view">
                <view class="item title">
                    <view class="item-name">{{ $t('KEY_SHARE_SHARE') }}</view>
                    <!-- <view class="item-value" @click="goDetail">
                        <text>{{ $t('KEY_SHARE_DETAIL') }}</text>
                        <img src="@/static/icon/jiantou_R_disable.png" alt="" />
                    </view> -->
                </view>
                <view class="share-wrap">
                    <share :promoteUser="{ pUrl: store.userInfo?.userId }" />
                </view>
            </view>
            <view class="rules">
                <view class="title" v-html="$t('KEY_SHARE_TITLE2')"></view>

                <view class="percent-table">
                    <view class="tr">
                        <view class="th">{{ $t('KEY_SHARE_SHARENUM') }}</view>
                        <view class="th">{{ $t('KEY_SHARE_BOUNS') }}</view>
                    </view>
                    <view
                        class="tr"
                        v-for="(item, index) in data.activityAbout?.numBonus"
                    >
                        <view class="td">
                            <span>
                                {{ item.num }} {{ $t('KEY_SHARE_FIRSTPAY') }}
                            </span>
                            <span v-if="item.num > 1">s</span>
                        </view>
                        <view class="td">
                            R$ {{ numberWithCommas(item.bonus) }}
                        </view>
                    </view>
                </view>

                <!-- <view
                    class="rules-content"
                    v-html="rule(data.activityAbout, 2)"
                ></view> -->
                <view
                    class="rules-content"
                    v-if="store.baseConfig.operatorId === 'own_lobby_bra5'"
                >
                    Para ser considerado um usuário válido, seu amigo deve
                    realizar uma soma de pelo menos R$50 em depósitos. O bônus
                    de cada nível só pode ser reivindicado uma vez e deve ser
                    apostado ao menos uma vez antes de ser possível efetuar a
                    retirada.
                </view>
                <view class="rules-content" v-else>
                    Para ser considerado um usuário válido, seu amigo deve
                    realizar pelo menos um depósito. O bônus de cada nível só
                    pode ser reivindicado uma vez e deve ser apostado ao menos
                    uma vez antes de ser possível efetuar a retirada.
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { ga } from '@/common/common'
    import { onMounted, watch, reactive, computed } from 'vue'
    import share from '@/pages/agent/components/share.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { numberWithCommas } from '@/common/common'
    import { i18n } from '@/common/i18nConfig'

    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Data {
        activityAbout: any
    }

    const data = reactive<Data>({
        activityAbout: {},
    })

    const rule = computed(() => (item: any, type: number) => {
        switch (type) {
            case 1:
                return $t('KEY_ACTIVITY_SHARE_TIP1')?.replace(
                    '#payFlowMultip#',
                    item.payFlowMultip
                )
                break
            case 2:
                return $t('KEY_ACTIVITY_SHARE_TIP2')
                    ?.replace('#numFlowMultip#', item.numFlowMultip)
                    ?.replace('#numPayAmount#', item.numPayAmount)
                break
            default:
        }
    })

    const getActivityAbout = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.inviteNewuser.about(params)
        if (res.success) {
            data.activityAbout = res.result
        } else {
            ErrorHandler(res, 'getActivityAbout')
        }
    }

    const goDetail = () => {
        uni.navigateTo({
            url: '/pages/share_detail/index',
        })
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    const initData = () => {
        if (store.userInfo) {
            getActivityAbout()
        }
    }

    onMounted(() => {
        initData()
    })
</script>

<style lang="scss">
    .activity-view {
        min-height: 100%;
        .detail {
            padding: 40rpx;
            .share-view {
                @apply bg-black-80 rounded-14 overflow-hidden;
                margin-bottom: 60rpx;
            }
            .title {
                @apply font-bold;
                font-size: 33rpx;
                font-weight: bold;
                color: #ffffff;
            }
            .share-wrap {
                padding: 30rpx;
            }
            .card {
                @apply w-full bg-black-80 relative;
                height: 244rpx;
                border-radius: 8rpx;
                margin-bottom: 35rpx;
                .card-detail {
                    @apply flex items-center justify-between;
                    .card-item {
                        @apply flex-1 flex flex-col items-center relative justify-center;
                        height: 200rpx;
                        .cash {
                            font-size: 44rpx;
                            font-weight: bold;
                            margin-bottom: 10rpx;
                            z-index: 10;
                        }
                        .tips {
                            font-size: 22rpx;
                            color: #ffffff;
                            line-height: 28rpx;
                            opacity: 0.8;
                            z-index: 10;
                        }
                        .bg-icon {
                            @apply absolute;
                            width: 120rpx;
                            z-index: 1;
                        }
                    }
                }
                .time {
                    @apply flex items-center justify-center absolute bottom-0 box-border truncate;
                    // width: 400rpx;
                    height: 48rpx;
                    background-color: #272727;
                    border-radius: 42rpx 42rpx 0px 0px;
                    left: 50%;
                    padding: 0 50rpx;
                    transform: translate(-50%);
                }
            }
            .btn-view {
                @apply flex items-center justify-between;
                .normal-btn {
                    width: 326rpx;
                    font-size: 28rpx;
                }
            }
            .rules {
                @apply text-white-90;
                margin-top: 50rpx;

                .rules-title {
                    @apply flex justify-center items-center;
                    margin-bottom: 30rpx;
                    .title {
                        font-size: 28rpx;
                        font-weight: bold;
                        color: #7c7c7c;
                        margin: 0 36rpx;
                    }
                    .line {
                        width: 120rpx;
                        height: 3rpx;
                        background: #878789;
                    }
                }
                .rules-content {
                    margin: 30rpx 0;
                    ::v-deep p {
                        line-height: 28rpx;
                        font-size: 22rpx;
                        font-weight: 400;
                        color: #cdcfcf;
                    }
                }
            }
        }
    }

    .item {
        @apply flex items-center justify-center box-border;
        height: 102rpx;
        border-bottom: 2rpx solid #475464;
        padding: 0 20rpx;

        .item-name {
            @apply text-left flex items-center;
            color: #7590ab;
            font-size: 28rpx;
            font-weight: 400;
        }
        .item-value {
            @apply text-right flex items-center justify-end;
            color: #8d8e8e;
            font-size: 28rpx;
            font-weight: 400;
            img {
                width: 17rpx;
                margin-left: 10rpx;
            }
        }
        .icon-right {
            height: 28rpx;
            margin-left: 20rpx;
        }
        &.title {
            @apply flex justify-between;
            .item-name,
            .item-value {
                @apply text-white-100 h-full;
            }
        }
        &:last-child {
            border: none;
        }
    }
    .percent-table {
        @apply table text-black font-bold text-center;
        margin: 27rpx auto 0;
        font-size: 33rpx;
        border-collapse: collapse;
        border-radius: 7rpx;
        overflow: hidden;
        .tr {
            @apply table-row;
            .th,
            .td {
                @apply table-cell bg-white;
                width: 334rpx;
                height: 90rpx;
                line-height: 90rpx;
                border: 1px solid #000;
            }
            .th {
                @apply text-white-100;
                background: linear-gradient(0deg, #282a2d, #39424a);
                border-top-width: 0;
                font-size: 28rpx;
            }
        }
        .tr .th:first-child,
        .tr .td:first-child {
            border-left-width: 0;
        }
        .tr .th:last-child,
        .tr .td:last-child {
            border-right-width: 0;
        }
        .tr:last-child .td {
            border-bottom-width: 0;
        }
    }
</style>
