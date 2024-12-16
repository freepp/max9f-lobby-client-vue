<template>
    <view class="date-tab">
        <view
            class="tab-items"
            v-for="(item, index) in data.dateData"
            :key="index"
            :class="{ 'item-choosed': index === data.chooseIndex }"
            @click="chooseItem(item, index)"
        >
            {{ item.name }}
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { reactive } from 'vue'
    interface Data {
        title?: string
        dateData: any
        chooseIndex: number
        pickerShow: boolean
        date: string
    }
    const data = reactive<Data>({
        title: 'date-picker',
        chooseIndex: 0,
        date: '',
        pickerShow: false,
        dateData: [
            {
                name: 'Week',
                timestamp: 1676279247671,
            },
            {
                name: 'Last week',
                timestamp: 1676279247671,
            },
            {
                name: 'Month',
                timestamp: 1676279247671,
            },
        ],
    })
    const emit = defineEmits(['dateTabChange'])

    const chooseItem = (item, index) => {
        data.chooseIndex = index
        emit('dateTabChange', item)
    }
</script>

<style lang="scss">
    .date-tab {
        @apply flex items-center justify-between h-full;
        width: 450rpx;
        .tab-items {
            @apply flex items-center h-full box-border;
            text-align: center;
            font-size: 28rpx;
            font-weight: bold;
            color: #454545;
            line-height: 28rpx;
            opacity: 0.5;
            padding: 0 12rpx;
            border-bottom: 8rpx solid transparent;
        }
        .item-choosed {
            opacity: 1;
            border-bottom: 8rpx solid #ffa922;
        }
    }
</style>
