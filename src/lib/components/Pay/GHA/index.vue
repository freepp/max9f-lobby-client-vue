<template>
    <PayTabs @tab-change="tabChange" :tab-data="channels" />
    <view v-if="pageType === 0">
        <MTNDeposit :channel="'mtn-gh'" v-if="data.channelChoosed === 'MTN'" />
        <MTNDeposit
            :channel="'vodafone-gh'"
            v-if="data.channelChoosed === 'Voda'"
        />
        <MTNDeposit
            :channel="'tigo-gh'"
            v-if="data.channelChoosed === 'Airtel'"
        />
    </view>
    <view v-else>
        <MTNWithdraw :channel="'mtn-gh'" v-if="data.channelChoosed === 'MTN'" />
        <MTNWithdraw
            :channel="'vodafone-gh'"
            v-if="data.channelChoosed === 'Voda'"
        />
        <MTNWithdraw
            :channel="'tigo-gh'"
            v-if="data.channelChoosed === 'Airtel'"
        />
    </view>
</template>

<script lang="ts" setup>
    import { reactive } from 'vue'
    import PayTabs from '../common/PayTabs.vue'
    import { channels } from './channelConfig'
    import MTNDeposit from '../channel/MTN/deposit.vue'
    import MTNWithdraw from '../channel/MTN/withdraw.vue'

    interface Props {
        pageType?: number
    }

    const props = withDefaults(defineProps<Props>(), {
        pageType: 0, //0: deposit 1: withdraw
    })

    interface Data {
        channelChoosed: string
    }

    const data = reactive<Data>({
        channelChoosed: '',
    })

    const tabChange = (item) => {
        data.channelChoosed = item.name
    }
</script>

<style lang="scss"></style>
