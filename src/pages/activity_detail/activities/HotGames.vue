<template>
    <view class="ad-list">
        <view
            class="ad-img"
            v-for="(item, index) in props.hotGames"
            :key="index"
            @click="() => openGame(item)"
        >
            <img :src="item.bigIcon" alt="" />
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import _ from 'lodash'
    import { useUsersStore } from '@/store/userStore'
    import { openGame } from '@/common/game'
    const store = useUsersStore()

    interface Props {
        hotGames?: any
    }

    const props = withDefaults(defineProps<Props>(), {
        hotGames: [],
    })

    interface Data {
        title?: string
    }

    const data = reactive<Data>({
        title: 'Hot Games',
    })
</script>

<style lang="scss">
    .ad-list {
        @apply flex justify-between;
        margin-top: 11rpx;
        .ad-img {
            @apply overflow-hidden;
            width: 228rpx;
            height: 180rpx;
            background-color: #eee;
            border-radius: 8rpx;
            img {
                @apply w-full h-full;
                object-fit: cover;
            }
        }
    }
</style>
