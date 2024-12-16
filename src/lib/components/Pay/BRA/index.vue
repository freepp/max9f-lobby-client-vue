<template>
    <!-- <PayTabs @tab-change="tabChange" :tab-data="channels" /> -->
    <view v-show="pageType === 0">
      <!-- <VISADeposit
          :channel="'visa-mex'"
          v-if="data.channelChoosed === 'VISA'"
      /> -->
      <PIXDeposit :channel="'pix-bra'" :zIndex="zIndex" v-if="data.channelChoosed === 'PIX'" />
    </view>
    <view v-show="pageType === 1">
      <!-- <VISAWithdraw
          :channel="'visa-mex'"
          v-if="data.channelChoosed === 'VISA'"
      /> -->
      <PIXWithdraw
          :channel="'pix-bra'"
          v-if="data.channelChoosed === 'PIX'"
      />
    </view>
</template>

<script lang="ts" setup>
    import PayTabs from '../common/PayTabs.vue'
    import { channels } from './channelConfig'
    import PIXDeposit from '../channel/PIX/deposit.vue'
    import PIXWithdraw from '../channel/PIX/withdraw.vue'

    interface Props {
        pageType?: number
        zIndex?: number
    }
    const props = withDefaults(defineProps<Props>(), {
        pageType: 0, //0: deposit 1: withdraw
        zIndex: 2035
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

    onMounted(() => {
        data.channelChoosed = 'PIX'
    })
</script>

<style lang="scss"></style>
