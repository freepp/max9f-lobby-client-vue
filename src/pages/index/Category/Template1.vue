<template>
    <view class="template-view">
        <view class="category-card-l">
            <CategoryCard :cardInfo="swiperPageData[0]" />
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

        <view
            class="category-card-s"
            v-for="(item, index) in computedItems(2)"
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

    const computedItems = computed(() => {
        return (type) => {
            let computedItems = []
            let items = props.swiperPageData
            items.forEach((item, index) => {
                if (type === 1) {
                    if (index > 0 && index < 3) {
                        computedItems.push(item)
                    }
                } else {
                    if (index > 2 && index < 6) {
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
        margin-top: 10rpx;
    }

    .category-card-l {
        width: 66.2%;
        aspect-ratio: 1;
    }

    .right-box {
        @apply flex flex-col justify-between;
        width: 32.4%;
        .category-card-s {
            @apply m-0 w-full;
        }
    }
</style>
