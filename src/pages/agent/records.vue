<template>
    <Layout :headerTitle="$t('KEY_AGENT_MENU_GET_RECORD')">
        <scroll-view
            :scroll-y="true"
            class="record-list"
            @scrolltolower="scrolltolower"
        >
            <view class="query-box">
                <view class="date-between-picker">
                    <date-range-picker
                        v-model="selectDate"
                        :format="formater"
                    ></date-range-picker>
                </view>
                <view class="text-box">
                    {{ $t('KEY_AGENT_RECORD_TOTAL_RECEIVED') }}
                    <text class="yellow">
                        {{ promoteUser.totalCollectComm }}
                    </text>
                </view>
            </view>
            <no-data
                v-if="recordList.length === 0 && !loading"
                class="no-data"
                :message="$t('KEY_AGENT_NO_RECORDS')"
            ></no-data>
            <view class="record-item" v-for="item in recordList">
                <view class="item">
                    <view class="item-name">
                        {{ $t('KEY_AGENT_RECORD_TIME') }}
                    </view>
                    <view class="item-value">
                        {{ formatDate(item.recDate) }}
                    </view>
                </view>
                <view class="item">
                    <view class="item-name">
                        {{ $t('KEY_AGENT_RECORD_NUMBER') }}
                    </view>
                    <view class="item-value">{{ item.contributionNum }}</view>
                </view>
                <view class="item">
                    <view class="item-name">
                        {{ $t('KEY_AGENT_RECORD_COMMISSION') }}
                    </view>
                    <view class="item-value yellow">
                        {{ item.collectedComm }}
                    </view>
                </view>
            </view>
        </scroll-view>
    </Layout>
</template>
<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    import DateRangePicker from '@/lib/components/DateRangePicker.vue'
    import { computed, onMounted, ref, watch } from 'vue'
    import { api as lobbyApi } from '@/NET/lobby'

    import { parse, format } from 'date-fns'
    import {
        PromoteCollectRecordDto,
        PromoteUserDto,
    } from '@/NET/lobby/data-contracts'
    import { api as commonApi } from '@/NET/common'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import NoData from '@/lib/components/NoData.vue'
    import { i18n } from '@/common/i18nConfig'
    import { useUsersStore } from '@/store/userStore'
    import { ga } from '@/common/common'
    const store = useUsersStore()
    const { t: $t } = i18n.global
    const formater = 'dd/MM/yyyy'
    const date = new Date()
    const endTimeStr = format(date, formater)
    date.setMonth(date.getMonth() - 1)
    const startTimeStr = format(date, formater)
    const selectDate = ref([startTimeStr, endTimeStr])
    const isDatePicker = ref(false)
    onMounted(() => {
        isDatePicker.value = true
    })
    const pager = {
        pageIndex: 1,
        pageSize: 10,
    }
    const recordList = ref<Array<PromoteCollectRecordDto>>([])
    const loading = ref(false)
    const hasMore = ref(true)
    const apiFormater = 'yyyy-MM-dd'
    const promoteUser = ref<PromoteUserDto>({})
    const getPromoteUser = async () => {
        if (store.userInfo?.userMode !== 2) {
            return
        }
        // const res = await lobbyApi.promote.userInfo()
        const res = await commonApi.promote.promoteUserInfoCreate()
        if (res.success) {
            promoteUser.value = res.result
        } else {
            ErrorHandler(res, 'getPromoteUser')
        }
    }
    const getRecord = async () => {
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
        // const res = await lobbyApi.promote.collectRecord({
        //     startTime: format(
        //         parse(selectDate.value[0], formater, new Date()),
        //         apiFormater
        //     ),
        //     endTime: format(
        //         parse(selectDate.value[1], formater, new Date()),
        //         apiFormater
        //     ),
        //     pageIndex: pager.pageIndex,
        //     pageSize: pager.pageSize,
        // })
        const res = await commonApi.promote.promoteCollectRecordCreate({
            startTime: format(
                parse(selectDate.value[0], formater, new Date()),
                apiFormater
            ),
            endTime: format(
                parse(selectDate.value[1], formater, new Date()),
                apiFormater
            ),
            pageIndex: pager.pageIndex,
            pageSize: pager.pageSize,
        })
        loading.value = false
        if (res.success) {
            const total = res.result.total
            recordList.value = res.result.rows.concat(recordList.value)
            if (recordList.value.length >= total) {
                hasMore.value = false
            } else {
                pager.pageIndex++
            }
        } else {
            ErrorHandler(res, 'getPromoteUser')
        }
    }
    const formatDate = (dateStr): string => {
        return dateStr ? format(new Date(dateStr), formater) : ''
    }
    const scrolltolower = async () => {
        await getRecord()
    }
    const reset = () => {
        pager.pageIndex = 1
        recordList.value = []
        hasMore.value = true
    }
    watch(
        () => selectDate.value,
        () => {
            reset()
            getRecord()
        }
    )
    const initData = () => {
        getRecord()
        getPromoteUser()
    }
    watch(
        () => store.userInfo,
        () => {
            initData()
        }
    )
    onMounted(() => {
        
        uni.setNavigationBarTitle({
            title: $t('KEY_AGENT_COMMISSION_DETAILS_TITLE'),
        })
        initData()
    })
</script>
<style lang="scss" scoped>
    .query-box {
        @apply justify-between;
        height: 114rpx;
        line-height: 57rpx;
        font-size: 22rpx;
        width: 708rpx;
        margin: 0 auto;
        .text-box {
            font-size: 28rpx;
            color: #8d8e8e;
            padding-left: 20rpx;
        }
    }
    .yellow {
        color: #f2ac35 !important;
    }
    .record-list {
        // margin-top: 16rpx;
        // height: calc(100% - 74rpx);
        @apply box-border h-full;
        padding-top: 18rpx;
    }
    .record-item {
        @apply bg-black-80 rounded-14 overflow-hidden;
        margin-top: 20rpx;
        width: 708rpx;
        margin: 16rpx auto 0;
    }
    .item {
        @apply flex items-center justify-center box-border;
        height: 72rpx;
        border-bottom: 2rpx solid #475464;
        padding: 0 40rpx 0 20rpx;
        font-size: 24rpx;
        .item-name {
            @apply text-left;
            color: #7590ab;
        }
        .item-value {
            @apply flex-1 text-right flex items-center justify-end text-white-100;
        }
        .icon-right {
            height: 28rpx;
            margin-left: 20rpx;
        }
        &.title {
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
</style>
