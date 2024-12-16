<template>
    <view class="date-tab">
        <view
            class="tab-items"
            v-for="(item, index) in tabData"
            :key="index"
            :class="{ 'item-choosed': index === data.chooseIndex }"
            @click="() => chooseItem(index)"
        >
            {{ item.name }}
        </view>
    </view>
</template>

<script lang="ts" setup>

    interface Props {
        tabData?: any
        defaultIdx?: number
    }
    const props = withDefaults(defineProps<Props>(), {
        tabData: [],
        defaultIdx: 0
    })

    interface Data {
        chooseIndex: number
    }
    const data = reactive<Data>({
        chooseIndex: 0,
    })

    const emit = defineEmits(['tabChange'])

    const chooseItem = (index) => {
        data.chooseIndex = index
        emit('tabChange', props.tabData[index])
    }

    watch(() => props.defaultIdx, (i) => {
      data.chooseIndex = i
    })

    onMounted(() => {
      chooseItem(props.defaultIdx ?? 0)
    })
</script>

<style lang="scss">
    .date-tab {
        @apply flex items-center justify-around w-full box-border;
        padding: 0 40rpx;
        .tab-items {
            @apply flex items-center h-full box-border flex-1 justify-center text-white-80;
            border-bottom: 8rpx solid transparent;
            margin: 0 25rpx;
            padding-bottom: 15rpx;
            max-width: 230rpx;
            font-size: 33rpx;
            font-weight: 400;
        }
        .item-choosed {
            @apply text-white-100;
            border-bottom: 8rpx solid;
            border-color: var(--primary-color);
            font-size: 33rpx;
            font-weight: bold;
        }
    }
</style>
