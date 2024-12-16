<template>
    <view>
        <view class="banner-view" v-if="pageType === 1">
            <img src="@/static/activity/pig-day.jpg" alt="" />
        </view>
        <view class="banner-view" v-if="pageType === 2">
            <img src="@/static/activity/pig-week.jpg" alt="" />
        </view>
        <view class="banner-view" v-if="pageType === 3">
            <img src="@/static/activity/pig-month.jpg" alt="" />
        </view>
        <view class="return-list" v-if="data.returnList.length > 0">
            <view
                class="return-item"
                v-for="(item, index) in data.returnList"
                :key="index"
            >
                <view class="icon-view">
                    <img
                        v-if="pageType === 1"
                        class="pig"
                        src="@/static/icon/pig-day.png"
                        alt=""
                    />
                    <img
                        v-if="pageType === 2"
                        class="pig"
                        src="@/static/icon/pig-week.png"
                        alt=""
                    />
                    <img
                        v-if="pageType === 3"
                        class="pig"
                        src="@/static/icon/pig-month.png"
                        alt=""
                    />
                </view>
                <view class="item-detail">
                    <view class="item-content">
                        {{ rule(item) }}
                        <!-- Acumule {{ item.betMinAmount }} em apostas válidas para
                        obter R$ {{ item.rebateAmount3 }} -->
                    </view>
                    <view class="progress-view">
                        <view class="text">
                            {{ item.currentBetAmount }}/{{ item.needBetAmount }}
                        </view>
                        <view
                            class="progress"
                            :style="`width: ${item.percent}%`"
                        ></view>
                    </view>
                </view>
                <view class="control-view">
                    <!-- <view
                        v-if="item.receiveStatus === 0 && item.percent === 100"
                        class="normal-btn bg-primary"
                        @click="collect(item)"
                    >
                        {{ $t('KEY_ACTIVITY_RETURN_RECEIVE') }}
                    </view> -->
                    <loadingBtn
                        v-if="item.receiveStatus === 0 && item.percent === 100"
                        :loading="item.btnloading"
                        @loadData="collect(item)"
                    >
                        {{ $t('KEY_ACTIVITY_RETURN_RECEIVE') }}
                    </loadingBtn>
                    <view
                        v-else-if="item.receiveStatus === 1"
                        class="normal-btn disabled"
                    >
                        {{ $t('KEY_ACTIVITY_RETURN_RECEIVED') }}!
                    </view>
                    <view v-else class="normal-btn disabled">
                        {{ $t('KEY_ACTIVITY_RETURN_RECEIVE') }}
                    </view>
                    <!-- <loadingBtn
                        :loading="item.btnloading"
                        @loadData="collect(item)"
                    >
                        {{ $t('KEY_ACTIVITY_RETURN_RECEIVE') }}
                    </loadingBtn> -->
                    <view class="text-yellow">R$ {{ item.rebateAmount3 }}</view>
                </view>
            </view>
        </view>
        <view class="nodata" v-else>
            <NoData
                :message="$t('KEY_COMMON_NODATA')"
                :pageStyle="'white'"
            ></NoData>
        </view>
        <view class="tips">
            <view class="title">{{ $t('KEY_ACTIVITY_RETURN_RULE') }}:</view>
            <view
                v-if="pageType === 1"
                class="content"
                v-html="$t('KEY_ACITVITY_PIGBONUS_TIPS')"
            ></view>
            <view
                v-if="pageType === 2"
                class="content"
                v-html="$t('KEY_ACITVITY_PIGBONUS_TIPS_WEEK')"
            ></view>
            <view
                v-if="pageType === 3"
                class="content"
                v-html="$t('KEY_ACITVITY_PIGBONUS_TIPS_MONTH')"
            ></view>
        </view>
    </view>
</template>
<script lang="ts" setup>
    import { reactive, onMounted, watch, computed } from 'vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { modal } from '@/lib/components/Modal'
    import { onHide } from '@dcloudio/uni-app'
    import NoData from '@/lib/components/NoData.vue'
    import loadingBtn from '@/lib/components/Button/LoadingBtn.vue'
    import { useUsersStore } from '@/store/userStore'
    import { i18n } from '@/common/i18nConfig'
    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Props {
        pageType?: number
    }
    const props = withDefaults(defineProps<Props>(), {
        pageType: 1,
    })

    const data = reactive<any>({
        returnList: [],
        timer: null,
    })
    const emit = defineEmits(['updateBonus'])

    const rule = computed(() => (item: any) => {
        return $t('KEY_ACTIVITY_RETURN_TIP')
            ?.replace('#betMinAmount#', item.betMinAmount)
            ?.replace('#rebateAmount#', item.rebateAmount3)
    })

    const getRebateList = async () => {
        console.log(props.pageType)
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                frequency: props.pageType,
            },
            store.commonParams
        )
        let res = await lobbyApi.activitys.getRebateDotList(params)
        if (res.success) {
            data.returnList = res.result.dotList ? res.result.dotList : []
            emit('updateBonus', res.result.totalReward)
        } else {
            ErrorHandler(res, 'getRebateList')
        }
    }
    const collect = async (item) => {
        item.btnloading = true
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                detailID: item.detailID,
            },
            store.commonParams
        )
        let res = await lobbyApi.activitys.takeRebate(params)
        if (res.success && res.result.success) {
            openDialog()
            getRebateList()
        } else {
            ErrorHandler(res, 'takeRebate')
        }
        item.btnloading = false
    }

    const openDialog = () => {
        modal({
            width: '485rpx',
            title: `${$t('KEY_ACTIVITY_RETURN_RECEIVED')}!`,
            showCancel: false,
            showConfirm: false,
            maskClosable: true,
        })
    }

    const startTimer = () => {
        data.timer = null
        data.timer = setInterval(async () => {
            getRebateList()
        }, 30000)
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    const initData = () => {
        if (store.userInfo) {
            getRebateList()
            startTimer()
        }
    }

    onMounted(() => {
        initData()
    })

    defineExpose({
        getRebateList,
    })

    onHide(() => {
        data.timer && clearInterval(data.timer)
    })
</script>
<style lang="scss">
    .banner-view {
        @apply w-full;
        height: 224rpx;
        img {
            @apply w-full h-full;
        }
    }
    .return-list {
        padding: 24rpx 40rpx;
        .return-item {
            @apply bg-black-80 flex justify-between;
            padding: 24rpx;
            margin-bottom: 20rpx;
            border-radius: 8rpx;
            .icon-view {
                @apply flex items-center;
                width: 120rpx;
                img {
                    width: 84rpx;
                }
            }
            .item-detail {
                @apply flex-1;
                .item-content {
                    width: 290rpx;
                    opacity: 0.8;
                }

                .progress-view {
                    @apply relative overflow-hidden;
                    background: #8d9090;
                    width: 290rpx;
                    height: 28rpx;
                    border-radius: 28rpx;
                    margin-top: 20rpx;
                    .progress {
                        @apply bg-primary absolute left-0 top-0;
                        width: 50%;
                        height: 100%;
                    }
                    .text {
                        @apply absolute left-0 top-0 w-full h-full flex items-center justify-center z-10;
                        font-size: 24rpx;
                    }
                }
            }
            .control-view {
                @apply flex flex-col items-center justify-between;
                font-size: 28rpx;
                .normal-btn {
                    width: 134rpx;
                    height: 56rpx;
                    font-size: 22rpx;
                    color: #ffffff;
                    opacity: 0.8;
                    text-align: center;
                    font-weight: 400;
                    border-radius: 8rpx;
                    line-height: 24rpx;
                }
                .disabled {
                    background-color: #5c5c60;
                }
            }
        }
    }
    .nodata {
        padding-top: 100rpx;
        margin-bottom: 100rpx;
    }

    .tips {
        @apply bg-black-80;
        margin: 0 40rpx 20rpx;
        padding: 26rpx 40rpx;
        color: #a7a7a7;
        border-radius: 8rpx;
        .title {
            font-size: 28rpx;
        }
        .content {
            font-size: 22rpx;
            margin-top: 20rpx;
        }
    }
</style>
