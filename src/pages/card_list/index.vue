<template>
    <Layout :header-title="$t('KEY_PAGETITLE_CARDINFO')">
        <view class="cardlist-view">
            <view
                class="card-view"
                v-for="(item, index) in data.cardListData"
                :key="index"
                @click="() => cardClick(item)"
            >
                <view
                    class="card-gradient"
                    :style="`background: ${data.cardColor[index % 4]}`"
                >
                    <view class="using" v-if="item.lastUsing">
                        <img src="@/static/pay/using.png" alt="" />
                    </view>
                    <view class="card-icon">
                        <img src="@/static/pay/card.png" alt="" />
                    </view>
                    <view class="card-info">
                        <view class="card-detail">
                            <view class="card-title">
                                {{ item.bankName ? item.bankName : 'PIX' }}
                            </view>
                            <view class="card-number">
                                <view class="number-view" v-if="!item.closeEye">
                                    {{ item.cardNo }}
                                </view>
                                <view class="number-view" v-else>
                                    **** **** **** ****
                                </view>
                                <view
                                    class="card-eye"
                                    @click.stop="() => eyeClick(item)"
                                >
                                    <img
                                        v-if="item.closeEye"
                                        src="@/static/icon/eye_opened.png"
                                        alt=""
                                    />
                                    <img
                                        v-else
                                        src="@/static/icon/eye_closed.png"
                                        alt=""
                                    />
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="add-card" @click="addCard">
                <view class="add-img">
                    <img src="@/static/icon/add.png" alt="" />
                </view>
                {{ $t('KEY_PAY_ADDCARD') }}
            </view>
        </view>
    </Layout>
</template>

<script lang="ts" setup>
    import { reactive, ref, watch, onMounted } from 'vue'
    import Layout from '@/lib/layout/Base.vue'
    import { onShow } from '@dcloudio/uni-app'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { i18n } from '@/common/i18nConfig'
    const { t: $t } = i18n.global

    const store = useUsersStore()

    interface Data {
        cardListData: any[]
        cardColor: string[]
    }

    const data = reactive<Data>({
        cardListData: [],
        cardColor: ['#186ED7', '#1C4676', '#008687', '#C21F39'],
    })

    const getBanks = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.profile.getBanks(params)
        if (res.success) {
            data.cardListData = res.result ? res.result : []
            data.cardListData.forEach((item) => {
                item.closeEye = false
            })
        } else {
            ErrorHandler(res, 'getFormData')
        }
    }

    const getBraBanks = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        // let res = await lobbyApi.profile.getBraBanks(params)
        let res = await lobbyApi.profile.getBanks(params)
        if (res.success) {
            data.cardListData = res.result ? res.result : []
            data.cardListData.forEach((item) => {
                item.closeEye = false
            })
        } else {
            ErrorHandler(res, 'getFormData')
        }
    }

    const eyeClick = (item) => {
        item.closeEye = !item.closeEye
    }

    const cardClick = (item) => {
        uni.navigateTo({
            url: `/pages/card_info/index?id=${item.userBankID}&bankType=${item.bankType}`,
        })
    }

    const addCard = () => {
        uni.navigateTo({
            url: `/pages/card_info/index?bankType=1`,
        })
    }

    const initData = async () => {
        if (store.userInfo) {
            if (store.commonParams?.countryId === 'BRA') {
                getBraBanks()
            } else {
                getBanks()
            }
        }
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    onShow(() => {
        initData()
    })

    uni.setNavigationBarTitle({
        title: $t('KEY_PAGETITLE_CARDLIST'),
    })
</script>

<style lang="scss">
    .cardlist-view {
        @apply box-border;
        padding: 40rpx;

        .card-view {
            @apply overflow-hidden relative;
            background-color: #008687;
            margin-bottom: 24rpx;
            border-radius: 8rpx;
        }
        .card-gradient {
            @apply flex justify-between items-center;
            padding: 35rpx;
            background: linear-gradient(
                90deg,
                rgba(22, 2, 28, 0.1),
                rgba(83, 32, 130, 0)
            );
            .card-icon {
                width: 92rpx;
                img {
                    @apply w-full;
                }
            }
            .card-info {
                @apply flex-1;
                padding-left: 28rpx;
                .card-detail {
                    width: 480rpx;
                    .card-title {
                        @apply truncate;
                        font-size: 33rpx;
                        font-weight: bold;
                    }
                    .card-number {
                        @apply flex justify-between items-center truncate;
                        font-size: 28rpx;
                        font-weight: bold;
                        .number-view {
                            @apply truncate;
                            width: 400rpx;
                        }
                    }
                }
                .card-eye {
                    width: 44rpx;
                    height: 44rpx;
                    img {
                        @apply w-full h-full;
                    }
                }
            }
        }
    }
    .add-card {
        @apply flex items-center bg-black-80 shadow-black text-white-100;
        height: 120rpx;
        font-size: 28rpx;
        font-weight: bold;
        padding: 0 50rpx;
        border-radius: 8rpx;
        .add-img {
            @apply flex items-center;
            width: 26rpx;
            margin-right: 40rpx;
            img {
                @apply w-full;
            }
        }
    }
    .using {
        @apply absolute right-0 top-0;
        width: 160rpx;
        img {
            @apply w-full;
        }
    }
</style>
