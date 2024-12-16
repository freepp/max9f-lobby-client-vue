<template>
    <Layout :headerTitle="$t('KEY_SHARE_DETAIL')">
        <view class="share-view">
            <view class="tab-view">
                <view
                    class="tab-items"
                    v-for="(item, index) in data.tabData"
                    :key="index"
                    :class="{ 'item-choosed': index === data.chooseIndex }"
                    @click="() => chooseItem(index)"
                >
                    {{ item.name }}
                </view>
            </view>
            <scroll-view
                class="scroll-view"
                scroll-y="true"
                @scrolltolower="loadmore"
            >
                <view
                    class="nodata"
                    v-if="
                        data.tableData.length === 0 &&
                        data.moreStatus === 'no-more'
                    "
                >
                    <NoData
                        :message="$t('KEY_COMMON_NODATA')"
                        :pageStyle="'white'"
                    ></NoData>
                </view>
                <view v-else-if="data.chooseIndex === 0">
                    <view class="percent-table">
                        <view class="tr">
                            <view class="th">
                                {{ $t('KEY_SHAREDETAIL_TABLETH1') }}
                            </view>
                            <view class="th">
                                {{ $t('KEY_SHAREDETAIL_TABLETH2') }}
                            </view>
                            <view class="th">
                                {{ $t('KEY_SHAREDETAIL_TABLETH3') }}
                            </view>
                            <view class="th">{{ $t('KEY_SHARE_BOUNS') }}</view>
                        </view>
                        <view class="tr" v-for="item in data.tableData">
                            <view class="td">
                                <view class="username">
                                    {{ item.userAccount }}
                                </view>
                            </view>
                            <view class="td">
                                {{
                                    format(
                                        new Date(item.registDate),
                                        'dd/MM/yyyy'
                                    )
                                }}
                            </view>
                            <view class="td deposit">{{ item.firstPay }}</view>
                            <view class="td bonus">{{ item.bonus }}</view>
                        </view>
                    </view>
                </view>
                <view v-else-if="data.chooseIndex === 1">
                    <view class="percent-table">
                        <view class="tr">
                            <view class="th">
                                {{ $t('KEY_SHAREDETAIL_TABLETH4') }}
                            </view>
                            <view class="th">
                                {{ $t('KEY_SHAREDETAIL_TABLETH5') }}
                            </view>
                            <view class="th">
                                {{ $t('KEY_SHAREDETAIL_TABLETH6') }}
                            </view>
                            <view class="th">{{ $t('KEY_SHARE_BOUNS') }}</view>
                        </view>
                        <view class="tr" v-for="item in data.tableData">
                            <view class="td">{{ item.month }}</view>
                            <view class="td">{{ item.validUserCount }}</view>
                            <view class="td deposit">
                                {{ format(new Date(item.date), 'dd/MM/yyyy') }}
                            </view>
                            <view class="td bonus">{{ item.bonus }}</view>
                        </view>
                    </view>
                </view>
                <uni-load-more
                    v-if="
                        data.moreStatus !== 'no-more' &&
                        data.tableData.length !== 0
                    "
                    :status="data.moreStatus"
                    :contentText="{
                        contentdown: $t('KEY_COMMON_LOADMORE'),
                        contentrefresh: $t('KEY_COMMON_LOADING'),
                        contentnomore: $t('KEY_COMMON_NOMORE'),
                    }"
                />
            </scroll-view>
        </view>
    </Layout>
</template>

<script lang="ts" setup>
    import { reactive, ref, watch } from 'vue'
    import Layout from '@/lib/layout/Base.vue'
    import { onLoad } from '@dcloudio/uni-app'
    import _ from 'lodash'
    import { api as lobbyApi } from '@/NET/lobby'
    import NoData from '@/lib/components/NoData.vue'
    import { ErrorHandler, ErrorCode } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { i18n } from '@/common/i18nConfig'
    import { format } from 'date-fns'

    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Data {
        title?: string
        chooseIndex: number
        tabData?: any
        tableData?: any
        pageIndex: number
        pageSize: number
        hasMore: boolean
        moreStatus: string
    }

    const data = reactive<Data>({
        title: 'ID data',
        chooseIndex: 0,
        tabData: [
            // {
            //     name: $t('KEY_SHAREDETAIL_TITLE'),
            // },
            {
                name: $t('KEY_SHAREDETAIL_TITLE2'),
            },
        ],
        tableData: [],
        pageIndex: 1,
        pageSize: 20,
        hasMore: true,
        moreStatus: 'loading',
    })

    const chooseItem = (index) => {
        data.chooseIndex = index
        resetData()
        getActivityDetails()
    }

    const resetData = () => {
        data.tableData = []
        data.pageIndex = 1
        data.pageSize = 20
        data.hasMore = true
    }

    const loadmore = () => {
        if (data.hasMore) {
            data.pageIndex++
            getActivityDetails()
        }
    }

    const getActivityDetails = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                type: 1,
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
            },
            store.commonParams
        )
        let res = await lobbyApi.inviteNewuser.details(params)
        if (res.success) {
            let resData = res.result
            if (resData.length < data.pageSize) {
                data.hasMore = false
                data.moreStatus = 'no-more'
            } else {
                data.moreStatus = 'more'
            }
            data.tableData = [...data.tableData, ...resData]
            // data.activityAbout = res.result
        } else {
            ErrorHandler(res, 'getActivityDetails')
        }
    }

    const initData = async () => {
        if (store.userInfo) {
            getActivityDetails()
        }
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    onLoad((options) => {
        initData()
    })

    uni.setNavigationBarTitle({
        title: $t('KEY_PAGETITLE_CARDINFO'),
    })
</script>

<style lang="scss">
    .tab-view {
        @apply flex items-center justify-around w-full box-border;
        padding: 0 40rpx;
        background-color: #1b1c1c;

        border-bottom: 1px solid rgba(69, 69, 69, var(--tw-border-opacity));
        .tab-items {
            @apply flex items-center h-full box-border flex-1 justify-center text-white-80;
            border-bottom: 8rpx solid transparent;
            margin: 0 25rpx;
            width: 340rpx;
            font-size: 33rpx;
            font-weight: 400;
            font-size: 28rpx;
            padding: 10rpx 10rpx;
            height: 100rpx;
        }
        .item-choosed {
            @apply text-white-100;
            border-bottom: 8rpx solid;
            border-color: var(--primary-color);
            // font-weight: bold;
        }
    }

    .scroll-view {
        @apply absolute left-0 right-0 bottom-0;
        top: 100rpx;
        padding: 40rpx 0;
    }

    .percent-table {
        @apply table text-black text-center;
        margin: 0 40rpx;
        font-size: 22rpx;
        border-collapse: collapse;
        border-radius: 7rpx;
        overflow: hidden;
        color: #8d8e8e;
        .tr {
            @apply table-row;
            border-radius: 8rpx;
            &:nth-child(2n - 1) {
                .td,
                .th {
                    background: #272727 !important;
                    &:first-child {
                        border-radius: 8rpx 0 0 8rpx;
                    }
                    &:last-child {
                        border-radius: 0 8rpx 8rpx 0;
                    }
                }
            }
            .th,
            .td {
                @apply table-cell bg-white;
                width: 334rpx;
                height: 70rpx;
                background: #0e0e0f;
                vertical-align: middle;
                // border: 1px solid #000;
            }
            .th {
                border-top-width: 0;
            }
        }

        .deposit {
            color: #fff;
        }
        .bonus {
            color: #f2ac35;
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
    .nodata {
        padding-top: 100rpx;
    }
    .username {
        @apply truncate;
        max-width: 200rpx;
        padding-left: 20rpx;
    }
</style>
