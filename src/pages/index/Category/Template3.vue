<template>
    <view class="template-view">
        <view class="category-card-s" v-if="swiperPageData[0]">
            <CategoryCard :cardInfo="swiperPageData[0]" />
        </view>
        <view class="category-card-d" v-if="swiperPageData[1]">
            <CategoryCard :cardInfo="swiperPageData[1]" />
        </view>
        <view class="category-card-l" v-if="swiperPageData[2]">
            <CategoryCard :cardInfo="swiperPageData[2]" />
        </view>
        <view class="right-box">
            <view
                class="category-card-s"
                v-for="(item, index) in computedItems(1)"
                :key="index"
            >
                <CategoryCard :cardInfo="item" />
            </view>
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

    const computedItems = computed(() => {
        return (type) => {
            let computedItems = []
            let items = props.swiperPageData
            items.forEach((item, index) => {
                if (type === 1) {
                    if (index > 2 && index < 5) {
                        computedItems.push(item)
                    }
                }
            })
            return computedItems
        }
    })
</script>

<style lang="scss">
    .template-view {
        @apply flex flex-wrap justify-between;
    }

    .category-card-s {
        width: 32.4%;
        aspect-ratio: 1;
    }
    .category-card-d {
        width: 66.2%;
        height: 230rpx;
    }
    .category-card-l {
        width: 66.2%;
        aspect-ratio: 1;
        margin-top: 10rpx;
    }

    .right-box {
        @apply flex flex-col justify-between;
        width: 32.4%;
        .category-card-s {
            @apply m-0 w-full;
        }
    }
</style>
