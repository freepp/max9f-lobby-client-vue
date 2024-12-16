<template>
    <view class="template-view">
        <view
            class="category-card-s"
            v-for="(item, index) in swiperPageData"
            :key="index"
        >
            <CategoryCard :cardInfo="item" />
        </view>
    </view>
    <PopupMessage ref="RefMessage" />
</template>

<script lang="ts" setup>
    import { ref, computed } from 'vue'
    import { CategoryDetailDto } from '@/NET/lobby/data-contracts'
    import CategoryCard from './CategoryCard.vue'

    interface Props {
        swiperPageData?: CategoryDetailDto[]
    }

    const props = withDefaults(defineProps<Props>(), {
        swiperPageData: () => null,
    })

    const RefMessage = ref()
</script>

<style lang="scss">
    .template-view {
        @apply flex flex-wrap;
        padding: 0 5rpx;
    }

    .category-card-s {
        width: 230rpx;
        height: 310rpx;
        margin-bottom: 10rpx;
        margin-right: 10rpx;
        &:nth-child(3n) {
            margin: 0;
        }
    }
</style>
