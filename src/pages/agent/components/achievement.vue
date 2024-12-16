<template>
    <scroll-view class="achiev" @scrolltolower="scrolltolower" :scroll-y="true">
        <view class="query-box flex">
            <view class="date-between-picker">
                <date-range-picker
                    v-model="selectDate"
                    :format="formater"
                ></date-range-picker>
            </view>
            <view class="user-picker">
                <input
                    type="text"
                    v-model="account"
                    :placeholder="$t('KEY_AGENT_PERFORMANCE_ACCOUNT')"
                />
                <image
                    @click.stop="search"
                    src="@/static/icon/search_round.png"
                    class="icon-search"
                ></image>
            </view>
        </view>
        <view class="commission-detail-list">
            <no-data
                class="no-data"
                v-if="performanceList.length === 0 && !loading"
                :message="$t('KEY_AGENT_NO_RECORDS')"
            ></no-data>
            <view class="detail-item" v-for="item in performanceList">
                <view class="item title">
                    <view
                        class="item-name overflow-hidden "
                        @click="setClip(item.mobile || item.directUserName)"
                    >
                        <view class="overflow-ellipsis whitespace-normal overflow-hidden flex-1">
                            {{ item.mobile || item.directUserName }}
                        </view>
                        
                        <!-- {{ $t('KEY_AGENT_PERFORMANCE_JOINING') }} -->
                        <image
                            class="copy-icon"
                            src="@/static/icon/copy.png"
                        ></image>
                    </view>
                    <view class="item-value">
                        {{ formatDate(item.promoteTime) }}
                    </view>
                </view>
                <!-- <view class="item">
                    <view class="item-name">
                        {{ $t('KEY_AGENT_PERFORMANCE_ACCOUNT') }}
                    </view>
                    <view class="item-value overflow-hidden">
                        <view
                            class="overflow-ellipsis whitespace-normal overflow-hidden"
                        >
                            
                        </view>
                    </view>
                </view> -->
                <view class="item">
                    <view class="item-name">
                        {{ $t('KEY_AGENT_PERFORMANCE_SUBORDINATES') }}
                    </view>
                    <view class="item-value">{{ item.directNum }}</view>
                </view>
                <view class="item">
                    <view class="item-name">
                        {{ $t('KEY_AGENT_PERFORMANCE_PERFORMANCE') }}
                    </view>
                    <view class="item-value yellow">{{ item.perf }}</view>
                </view>
                <view class="item">
                    <view class="item-name">
                        {{ $t('KEY_AGENT_PERFORMANCE_CONTRIBUTION') }}
                    </view>
                    <view class="item-value">{{ item.contributionComm }}</view>
                </view>
            </view>
        </view>
        <view class="space"></view>
    </scroll-view>
</template>
<script setup lang="ts">
    import DateRangePicker from '@/lib/components/DateRangePicker.vue'
    import { format, parse } from 'date-fns'
    import { onMounted, ref, watch } from 'vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as commonApi } from '@/NET/common'
    import { PromotePerformanceDto } from '@/NET/lobby/data-contracts'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import NoData from '@/lib/components/NoData.vue'
    import { modal } from '@/lib/components/Modal'
    import { i18n } from '@/common/i18nConfig'
    import { useUsersStore } from '@/store/userStore'
    const store = useUsersStore()
    const { t: $t } = i18n.global
    const formater = 'dd/MM/yyyy'
    const date = new Date()
    const endTimeStr = format(date, formater)
    date.setMonth(date.getMonth() - 1)
    const startTimeStr = format(date, formater)
    const selectDate = ref([startTimeStr, endTimeStr])
    const account = ref('')
    const pager = {
        pageIndex: 1,
        pageSize: 10,
    }
    const loading = ref(false)
    const hasMore = ref(true)
    const performanceList = ref<Array<PromotePerformanceDto>>([])
    const apiFormater = 'yyyy-MM-dd'
    const getPerformanceList = async () => {
        if (store.userInfo?.userMode !== 2) {
            return
        }
        if (loading.value) {
            return
        }
        if (!hasMore.value) {
            return
        }
        loading.value = true
        // const res = await lobbyApi.promote.performance({
        //     startTime: format(
        //         parse(selectDate.value[0], formater, new Date()),
        //         apiFormater
        //     ),
        //     endTime: format(
        //         parse(selectDate.value[1], formater, new Date()),
        //         apiFormater
        //     ),
        //     account: account.value,
        //     pageIndex: pager.pageIndex,
        //     pageSize: pager.pageSize,
        // })
        const res = await commonApi.promote.promotePerformanceCreate({
            startTime: format(
                parse(selectDate.value[0], formater, new Date()),
                apiFormater
            ),
            endTime: format(
                parse(selectDate.value[1], formater, new Date()),
                apiFormater
            ),
            account: account.value,
            pageIndex: pager.pageIndex,
            pageSize: pager.pageSize,
        })
        loading.value = false
        if (res.success) {
            const total = res.result.total
            performanceList.value = res.result.rows.concat(
                performanceList.value
            )
            if (performanceList.value.length >= total) {
                hasMore.value = false
            } else {
                pager.pageIndex++
            }
        } else {
            ErrorHandler(res, 'getPromoteUser')
        }
    }
    const reset = () => {
        pager.pageIndex = 1
        hasMore.value = true
        performanceList.value = []
    }
    const search = () => {
        reset()
        getPerformanceList()
    }

    const setClip = (str: string) => {
        uni.setClipboardData({
            data: str,
            showToast: false,
            success: function () {
                modal({
                    width: '485rpx',
                    title: $t('KEY_PAY_COPYSUCCESS'),
                    showCancel: false,
                    showConfirm: false,
                    maskClosable: true,
                })
            },
        })
    }
    const formatDate = (dateStr): string => {
        return dateStr ? format(new Date(dateStr), 'dd/MM/yyyy') : ''
    }
    const scrolltolower = async () => {
        await getPerformanceList()
        loading.value = false
    }
    watch(
        () => selectDate.value,
        () => {
            reset()
            getPerformanceList()
        }
    )
    onMounted(() => {
        getPerformanceList()
    })
</script>
<style lang="scss">
    .query-box {
        @apply flex justify-between;
        width: 540rpx;
        height: 57rpx;
        font-size: 22rpx;
        .user-picker {
            @apply relative flex items-center justify-between bg-black-80 box-border text-center;
            width: 172rpx;
            height: 57rpx;
            line-height: 57rpx;
            border: 2rpx solid #272727;
            border-radius: 28rpx;
            input {
                width: 88rpx;
                margin-left: 33rpx;
                font-size: 22rpx;
                color: #fff;
            }
            .icon-search {
                width: 33rpx;
                height: 34rpx;
                margin-right: 17rpx;
            }
        }
    }
    .yellow {
        color: #f2ac35 !important;
    }
    .achiev {
        height: 100%;
    }
    .commission-detail-list {
        width: 540rpx;
    }
    .detail-item {
        @apply bg-black-80 rounded-14 overflow-hidden;
        margin-top: 20rpx;
    }
    .item {
        @apply flex items-center justify-center box-border;
        height: 72rpx;
        border-bottom: 2rpx solid #475464;
        padding: 0 40rpx 0 20rpx;
        font-size: 24rpx;
        .item-name {
            @apply text-left flex items-center;
            color: #7590ab;
        }
        .item-value {
            @apply flex-1 text-right flex items-center justify-end text-white-100;
        }
        .icon-right {
            height: 28rpx;
            margin-left: 20rpx;
        }
        .copy-icon {
            width: 28rpx;
            height: 33rpx;
            margin-left: 24rpx;
        }
        &.title {
            @apply rounded-14;
            border: none;
            background-color: #272727;
            .item-name,
            .item-value {
                @apply text-white-100;
            }
        }
        &:last-child {
            border: none;
        }
    }
    .no-data {
        padding-top: 100rpx;
    }
    .space {
        height: 50rpx;
    }
</style>
