<template>
    <view class="date-tab">
        <view
            class="tab-items"
            v-for="(item, index) in getDateData"
            :key="index"
            :class="{ 'item-choosed': index === data.chooseIndex }"
            @click="chooseItem(item, index)"
        >
            {{ item.name }}
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { reactive, computed } from 'vue'
    import { i18n } from '@/common/i18nConfig'
    const { t: $t } = i18n.global

    interface Data {
        title?: string
        chooseIndex: number
        pickerShow: boolean
        date: string
    }
    const data = reactive<Data>({
        title: 'date-picker',
        chooseIndex: 0,
        date: '',
        pickerShow: false,
    })

    const getDateData = computed(() => {
        let dateData = [
            {
                name: $t('KEY_RECORD_WEEK'),
                type: 0,
            },
            {
                name: $t('KEY_RECORD_LASTWEEK'),
                type: 1,
            },
            {
                name: $t('KEY_RECORD_MONTH'),
                type: 2,
            },
        ]
        return dateData
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
            @apply flex items-center h-full box-border text-white-80;
            font-size: 28rpx;
            text-align: center;
            font-weight: bold;
            line-height: 28rpx;
            padding: 0 12rpx;
            border-bottom: 8rpx solid transparent;
        }
        .item-choosed {
            @apply text-white-100 border-black-80;
            border-bottom: 8rpx solid var(--primary-color);
        }
    }
</style>
