<template>
    <scroll-view
        :scroll-y="true"
        @scrolltolower="scrolltolower"
        class="commission-view"
    >
        <view class="query-box">
            <view class="date-between-picker">
                <date-range-picker
                    v-model="selectDate"
                    :format="formater"
                ></date-range-picker>
            </view>
            <view class="type-picker" @click="showTypePicker">
                <view class="type-choose">
                    {{ selectType?.name }}
                </view>
                <image src="@/static/icon/down.png" class="arrow-down"></image>
                <view class="type-list-picker" v-show="isTypePickerShow">
                    <view
                        :class="{ active: selectTypeIndex === index }"
                        v-for="(item, index) in allTypeList"
                        @click.stop="chooseType(index)"
                    >
                        {{ item.name }}
                    </view>
                </view>
            </view>
        </view>
        <view class="commission-list">
            <no-data
                class="no-data"
                v-if="commissionList.length === 0 && !loading"
                :message="$t('KEY_AGENT_NO_RECORDS')"
            ></no-data>
            <view class="commission-item" v-for="item in commissionList">
                <view class="item title">
                    <view class="item-name">
                        {{ $t('KEY_AGENT_COMMISSION_SETTLED') }}
                    </view>
                    <view class="item-value">{{ formatDate(item.dayID) }}</view>
                </view>
                <view class="item">
                    <view class="item-name">
                        {{ $t('KEY_AGENT_COMMISSION_TYPE') }}
                    </view>
                    <view class="item-value">
                        {{ getTypeNameByTypeValue(item.promoterType) }}
                    </view>
                </view>
                <view class="item">
                    <view class="item-name">
                        {{ $t('KEY_AGENT_COMMISSION_PERFORMANCE') }}
                    </view>
                    <view class="item-value">{{ item.perf }}</view>
                </view>
                <view class="item">
                    <view class="item-name">
                        {{ $t('KEY_AGENT_COMMISSION_CONTRIBUTORS') }}
                    </view>
                    <view class="item-value">{{ item.contributors }}</view>
                </view>
                <view class="item">
                    <view class="item-name">
                        {{ $t('KEY_AGENT_COMMISSION_COMMISSION') }}
                    </view>
                    <view class="item-value yellow">{{ item.comm }}</view>
                </view>
                <view class="item title" @click="toDetail(item)">
                    <view class="item-name">
                        {{ $t('KEY_AGENT_COMMISSION_DETAILS') }}
                    </view>
                    <view class="item-value yellow">
                        <image
                            src="@/static/icon/jiantou_R_disable.png"
                            class="icon-right"
                            mode="heightFix"
                        ></image>
                    </view>
                </view>
            </view>
        </view>
        <view class="space"></view>
    </scroll-view>
</template>
<script lang="ts" setup>
    import DateRangePicker from '@/lib/components/DateRangePicker.vue'
    import { allTypeList } from '../typeList'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as commonApi } from '@/NET/common'
    import { format, parse } from 'date-fns'
    import { PromoteCommDto } from '@/NET/lobby/data-contracts'
    import NoData from '@/lib/components/NoData.vue'

    const store = useUsersStore()
    const formater = 'dd/MM/yyyy'
    const date = new Date()
    const endTimeStr = format(date, formater)
    date.setMonth(date.getMonth() - 1)
    const startTimeStr = format(date, formater)
    const selectDate = ref([startTimeStr, endTimeStr])
    const selectTypeIndex = ref(0)
    const selectType = computed(() => allTypeList[selectTypeIndex.value])

    const toDetail = (item) => {
        uni.navigateTo({
            url: `/pages/agent/cmsdetail?startTime=${item.dayID}&endTime=${item.dayID}&promoterType=${item.promoterType}`,
        })
        // uni.navigateTo({
        //     url: `/pages/agent/cmsdetail?startTime=${item.dayID}&endTime=${item.dayID}&promoterType=${item.promoterType}`,
        // })
    }
    const isTypePickerShow = ref(false)
    const showTypePicker = () => {
        isTypePickerShow.value = true
    }
    const getTypeNameByTypeValue = (value: any) => {
        return allTypeList.find((item) => item.value === value)?.name
    }
    const chooseType = (index) => {
        selectTypeIndex.value = index
        hideTypePicker()
    }
    const hideTypePicker = () => {
        isTypePickerShow.value = false
    }

    const pager = {
        pageIndex: 1,
        pageSize: 10,
    }
    const loading = ref(false)
    const hasMore = ref(true)
    const scrolltolower = async () => {
        await getCommission()
    }
    const commissionList = ref<Array<PromoteCommDto>>([])
    const apiFormater = 'yyyy-MM-dd'
    const getCommission = async () => {
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
        /**
         *
        "startTime": "2023-07-26T05:59:01.311Z",
        "endTime": "2023-07-26T05:59:01.311Z",
        "promoterType": 0,
        "pageIndex": 0,
        "pageSize": 0

         */
        // const res = await lobbyApi.promote.commission({
        //     startTime: format(
        //         parse(selectDate.value[0], formater, new Date()),
        //         apiFormater
        //     ),
        //     endTime: format(
        //         parse(selectDate.value[1], formater, new Date()),
        //         apiFormater
        //     ),
        //     promoterType: selectType.value?.value,
        //     pageIndex: pager.pageIndex,
        //     pageSize: pager.pageSize,
        // })
        const res = await commonApi.promote.promoteCommissionCreate({
            startTime: format(
                parse(selectDate.value[0], formater, new Date()),
                apiFormater
            ),
            endTime: format(
                parse(selectDate.value[1], formater, new Date()),
                apiFormater
            ),
            promoterType: selectType.value?.value,
            pageIndex: pager.pageIndex,
            pageSize: pager.pageSize,
        })
        loading.value = false
        if (res.success) {
            const total = res.result.total
            commissionList.value = res.result.rows.concat(commissionList.value)
            if (commissionList.value.length >= total) {
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
    const reset = () => {
        pager.pageIndex = 1
        hasMore.value = true
        commissionList.value = []
    }
    watch(
        () => [selectDate.value, selectType.value],
        () => {
            reset()
            getCommission()
        }
    )
    watch(
        () => store.userInfo,
        () => {
            getCommission()
        }
    )
    onMounted(() => {
        getCommission()
    })
</script>
<style lang="scss" scoped>
    .commission-view {
        height: 100%;
        .query-box {
            @apply flex justify-between;
            height: 57rpx;
            font-size: 22rpx;
            width: 540rpx;
            .date-between-picker {
            }
            .type-picker {
                @apply relative flex items-center justify-between bg-black-80 box-border text-center;
                width: 172rpx;
                height: 57rpx;
                line-height: 57rpx;
                border: 2rpx solid #272727;
                border-radius: 28rpx;
                .type-choose {
                    @apply flex-1 overflow-ellipsis overflow-hidden whitespace-nowrap;
                    padding: 0rpx 6rpx;
                }
                .type-list-picker {
                    @apply rounded-14 box-border;
                    width: 172rpx;
                    min-height: 58rpx;
                    background: #0e0e0f;
                    border: 2px solid #272727;
                    position: absolute;
                    top: 66rpx;
                    left: -4rpx;
                    z-index: 2;
                    view {
                        height: 58rpx;
                        line-height: 58rpx;
                        &.active {
                            color: var(--primary-color);
                        }
                    }
                }
            }
            .arrow-down {
                width: 17rpx;
                height: 12rpx;
                margin-right: 11rpx;
            }
        }
    }
    .yellow {
        color: #f2ac35 !important;
    }
    .commission-list {
        width: 540rpx;
    }
    .commission-item {
        @apply bg-black-80 rounded-14 overflow-hidden;
        margin-top: 20rpx;
    }
    .item {
        @apply flex items-center justify-center box-border;
        height: 102rpx;
        border-bottom: 2rpx solid #475464;
        padding: 0 40rpx 0 20rpx;
        font-size: 28rpx;
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
    .space {
        height: 50rpx;
    }
    .no-data {
        padding-top: 100rpx;
    }
    ::v-deep .vpd-container {
        color: #2c3e50;
    }
</style>
