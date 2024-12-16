<template>
    <view class="proportion-view">
        <view class="types-tab">
            <view
                v-for="(item, index) in typeList"
                :class="{ active: selectTypeIndex === index }"
                @click="chooseType(index)"
            >
                {{ item.name }}
            </view>
        </view>
        <view class="proportion-list">
            <view class="row th">
                <view>{{ $t('KEY_AGENT_RATE_LEVEL') }}</view>
                <view>{{ $t('KEY_AGENT_RATE_BETTING') }}</view>
                <view>{{ $t('KEY_AGENT_RATE_REBATE') }}</view>
            </view>
            <view class="row" v-for="item in proportionList">
                <view>{{ item.commLevel }}</view>
                <view>
                    {{ item.betAmount }}
                    <!--Dez Mil+-->
                </view>
                <view class="yellow">
                    {{
                        $t('KEY_AGENT_RATE_FOR_EVERY').replaceAll(
                            '#money#',
                            item.comm + ''
                        )
                    }}
                    <!--/Dez mil-->
                </view>
            </view>
        </view>
        <view class="proportion-desc">
            {{ desc }}
        </view>
    </view>
</template>
<script lang="ts" setup>
    import { computed, onMounted, ref, watch } from 'vue'
    import { typeList } from '../typeList'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as commonApi } from '@/NET/common'
    import { PromoteCommProportionsIpoDto } from '@/NET/lobby/data-contracts'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { i18n } from '@/common/i18nConfig'
    import { useUsersStore } from '@/store/userStore'
    const store = useUsersStore()
    const { t: $t } = i18n.global
    const selectTypeIndex = ref(0)
    const chooseType = (index) => {
        selectTypeIndex.value = index
    }
    const depositMoney = ref<string>('')
    const betMoney = ref<string>('')
    const desc = computed(() => {
        return $t('KEY_AGENT_RATE_DESC')
            .replaceAll('#depositMoney#', depositMoney.value)
            .replaceAll('#betMoney#', betMoney.value)
    })
    const selectType = computed(() => typeList[selectTypeIndex.value])
    const proportionList = ref<Array<PromoteCommProportionsIpoDto>>([])
    const getCommProportions = async () => {
        if (store.userInfo?.userMode !== 2) {
            return
        }
        // const res = await lobbyApi.promote.commProportions({
        //     promoterType: selectType.value?.value,
        // })
        const res = await commonApi.promote.promoteCommProportionsCreate({
            promoterType: selectType.value?.value,
        })
        if (res.success) {
            proportionList.value = res.result.commProportions
            depositMoney.value = res.result.config.commMinDeposit + ''
            betMoney.value = res.result.config.commMinPerf + ''
        } else {
            ErrorHandler(res, 'getCommProportions')
        }
    }
    watch(
        () => [selectType.value],
        () => {
            getCommProportions()
        }
    )
    watch(
        () => store.userInfo,
        () => {
            getCommProportions()
        }
    )
    onMounted(() => {
        getCommProportions()
    })
</script>
<style lang="scss">
    .proportion-view {
        @apply flex flex-col;
        width: 560rpx;
        height: 100%;
        .types-tab {
            @apply flex box-border;
            width: 100%;
            height: 84rpx;
            overflow: auto;
            padding-bottom: 14rpx;
            view {
                @apply relative;
                margin-right: 24rpx;
                word-break: keep-all;
                white-space: nowrap;
                height: 70rpx;
                line-height: 70rpx;
                :last-child {
                    margin-right: 0;
                }
                &.active::after {
                    content: '';
                    position: absolute;
                    left: 0rpx;
                    bottom: 0rpx;
                    width: 100%;
                    height: 6rpx;
                    background: var(--primary-color);
                    border-radius: 3px;
                }
            }
        }
        .proportion-list {
            @apply box-border overflow-scroll;
            padding-top: 13rpx;
            height: calc(100% - 84rpx - 90rpx);
            .row {
                @apply flex;
                height: 72rpx;
                line-height: 72rpx;
                width: 540rpx;
                background: #0e0e0f;
                color: #8d8e8e;
                border-radius: 14px;
                letter-spacing: -0.8rpx;
                &.th {
                    @apply box-border;
                    border: 2px solid #272727;
                    // letter-spacing: -1rpx;
                }
                &:nth-child(2n-1) {
                    @apply rounded-14 bg-black-80;
                }
                view:nth-child(1) {
                    @apply text-center;
                    width: 90rpx;
                }
                view:nth-child(2) {
                    @apply flex-1 text-center;
                }
                view:nth-child(3) {
                    @apply flex-1 text-right box-border;
                    padding-right: 6rpx;
                }
                .yellow {
                    color: #f2ac35;
                }
            }
        }
        .proportion-desc {
            width: 550rpx;
            height: 90rpx;
            font-size: 22rpx;
            color: #8d8e8e;
            line-height: 28rpx;
        }
    }
</style>
