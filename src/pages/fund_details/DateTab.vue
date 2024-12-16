<template>
    <view class="date-tab">
        <view
            class="tab-items"
            v-for="(item, index) in getDateData"
            :key="index"
            :class="{ 'item-choosed': index === data.chooseIndex }"
            @click="() => chooseItem(item, index)"
        >
            {{ item.name }}
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { reactive, watch, computed } from 'vue'
    import { i18n } from '@/common/i18nConfig'
    const { t: $t } = i18n.global

    interface Props {
        dateParam: any
    }

    const props = withDefaults(defineProps<Props>(), {
        dateParam: 1,
    })

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
    const emit = defineEmits(['dateTabChange'])

    const getDateData = computed(() => {
        let dateData = [
            {
                name: $t('KEY_RECORD_1DAY'),
                type: 1,
            },
            {
                name: $t('KEY_RECORD_7DAYS'),
                type: 2,
            },
            {
                name: $t('KEY_RECORD_30DAYS'),
                type: 3,
            },
        ]
        return dateData
    })

    watch(
        () => props.dateParam,
        (val) => {
            data.chooseIndex = val - 1
        }
    )

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
            font-weight: bold;
            text-align: center;
            line-height: 28rpx;
            padding: 0 12rpx;
            border-bottom: 8rpx solid transparent;
        }
        .item-choosed {
            @apply text-white-100;
            border-bottom: 8rpx solid var(--primary-color);
        }
    }
</style>
