<template>
    <view class="date-tab">
        <view
            class="tab-items"
            v-for="(item, index) in tabData"
            :key="index"
            :class="{ 'item-choosed': index === data.chooseIndex }"
            @click="() => chooseItem(index)"
        >
            <img :src="item.icon" alt="" />
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { reactive, onMounted } from 'vue'

    interface Props {
        tabData?: any
    }
    const props = withDefaults(defineProps<Props>(), {
        tabData: [],
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

    onMounted(() => {
        chooseItem(0)
    })
</script>

<style lang="scss">
    .date-tab {
        @apply flex items-center justify-around w-full box-border;
        padding: 0 40rpx;
        .tab-items {
            @apply flex items-center h-full box-border flex-1;
            font-size: 28rpx;
            font-weight: bold;
            color: #454545;
            border-bottom: 8rpx solid transparent;
            margin: 0 25rpx;
            padding-bottom: 15rpx;
            max-width: 230rpx;
            img {
                @apply w-full;
            }
        }
        .item-choosed {
            border-bottom: 8rpx solid #ffa922;
        }
    }
</style>
