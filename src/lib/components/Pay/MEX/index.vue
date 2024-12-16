<template>
    <PayTabs @tab-change="tabChange" :tab-data="channels" />
    <view v-if="pageType === 0">
        <!-- <VISADeposit
            :channel="'visa-mex'"
            v-if="data.channelChoosed === 'VISA'"
        /> -->
        <SPEIDeposit
            :channel="'spei-mex'"
            v-if="data.channelChoosed === 'SPEI'"
        />
    </view>
    <view v-else>
        <!-- <VISAWithdraw
            :channel="'visa-mex'"
            v-if="data.channelChoosed === 'VISA'"
        /> -->
        <SPEIWithdraw
            :channel="'spei-mex'"
            v-if="data.channelChoosed === 'SPEI'"
        />
    </view>
</template>

<script lang="ts" setup>
    import { reactive } from 'vue'
    import PayTabs from '../common/PayTabs.vue'
    import { channels } from './channelConfig'
    import VISADeposit from '../channel/VISA/deposit.vue'
    import VISAWithdraw from '../channel/VISA/withdraw.vue'
    import SPEIDeposit from '../channel/SPEI/deposit.vue'
    import SPEIWithdraw from '../channel/SPEI/withdraw.vue'

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
