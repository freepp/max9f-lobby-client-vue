<template>
    <scroll-view class="achiev" @scrolltolower="scrolltolower" :scroll-y="true">
        <view class="query-box flex">
            <view class="date-between-picker">
                <date-range-picker
                    v-model="selectDate"
                    :format="formater"
                ></date-range-picker>
            </view>
        </view>
        <view class="subordinate-list">
            <no-data
                class="no-data"
                v-if="subordinateList.length === 0 && !loading"
                :message="$t('KEY_AGENT_NO_RECORDS')"
            ></no-data>
            <view
                class="row th"
                v-if="subordinateList && subordinateList.length > 0"
            >
                <view>{{ $t('KEY_AGENT_PERFORMANCE_ACCOUNT') }}</view>
                <view>{{ $t('KEY_AGENT_PERFORMANCE_JOINING') }}</view>
            </view>
            <view class="row" v-for="item in subordinateList">
                <view>
                    <view
                        class="overflow-hidden overflow-ellipsis whitespace-nowrap"
                    >
                        {{ item.mobile || item.userName }}
                    </view>
                </view>
                <view>{{ formatDate(item.promoteTime) }}</view>
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
    import { InviteUserDto } from '@/NET/lobby/data-contracts'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import NoData from '@/lib/components/NoData.vue'
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
    const pager = {
        pageIndex: 1,
        pageSize: 10,
    }
    const loading = ref(false)
    const hasMore = ref(true)
    const subordinateList = ref<Array<InviteUserDto>>([])
    const apiFormater = 'yyyy-MM-dd'
    const getSubordinateList = async () => {
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
        // const res = await lobbyApi.promote.invitedUsers({
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
        const res = await commonApi.promote.promoteInvitedUsersCreate({
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
            subordinateList.value = res.result.rows.concat(
                subordinateList.value
            )
            if (subordinateList.value.length >= total) {
                hasMore.value = false
            } else {
                pager.pageIndex++
            }
        } else {
            ErrorHandler(res, 'getPromoteUser')
        }
    }
    const formatDate = (dateStr): string => {
        return dateStr ? format(new Date(dateStr), 'dd/MM/yyyy') : ''
    }
    const reset = () => {
        pager.pageIndex = 1
        hasMore.value = true
        subordinateList.value = []
    }
    const scrolltolower = async () => {
        reset()
        await getSubordinateList()
    }
    watch(
        () => selectDate.value,
        () => {
            reset()
            getSubordinateList()
        }
    )
    onMounted(() => {
        getSubordinateList()
    })
</script>
<style lang="scss">
    .query-box {
        @apply flex justify-between;
        width: 540rpx;
        height: 57rpx;
        font-size: 22rpx;
    }
    .subordinate-list {
        margin-top: 13rpx;
        .row {
            @apply flex;
            height: 72rpx;
            line-height: 72rpx;
            width: 540rpx;
            background: #0e0e0f;
            color: #8d8e8e;
            border-radius: 14px;
            &.th {
                @apply box-border;
                border: 2px solid #272727;
            }
            &:nth-child(2n-1) {
                @apply rounded-14 bg-black-80;
            }
            view:nth-child(1) {
                @apply flex-1 text-left overflow-hidden;
                padding-left: 20rpx;
            }
            view:nth-child(2) {
                @apply flex-1 text-right;
                padding-right: 26rpx;
            }
            .yellow {
                color: #f2ac35;
            }
        }
    }
    .no-data {
        padding-top: 100rpx;
    }
    .space {
        height: 50rpx;
    }
</style>
