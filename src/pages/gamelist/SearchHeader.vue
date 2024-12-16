<template>
    <view class="searchheader-view">
        <view class="left-view">
            <view class="icon">
                <img @click="back" src="@/static/icon/go_back.png" alt="" />
            </view>
        </view>
        <view class="search-title">{{ title }}</view>
        <view class="right-view">
            <!-- <view class="icon change-icon">
                <img
                    src="@/static/icon/list_mode.png"
                    alt=""
                    v-if="data.cardType === 0"
                    @click="change(1)"
                />
                <img
                    src="@/static/icon/big_pic_mode.png"
                    alt=""
                    v-if="data.cardType === 1"
                    @click="change(0)"
                />
            </view> -->
            <view class="icon" @click="openSearch">
                <img src="@/static/icon/search.png" alt="" />
            </view>
        </view>
    </view>
    <Search ref="RefSearch" />
</template>

<script lang="ts" setup>
    import Search from '@/lib/components/Search/index.vue'

    interface Props {
        title?: string
    }
    interface Data {
        cardType: number
    }

    const props = withDefaults(defineProps<Props>(), {
        title: '',
    })
    const data = reactive<Data>({
        cardType: 1,
    })
    const emit = defineEmits(['changeType'])
    const RefSearch = ref()

    const change = (type) => {
        data.cardType = type
        emit('changeType', type)
    }

    const openSearch = () => {
        RefSearch.value.changeIsShow(true)
    }

    const back = () => {
        let canNavBack = getCurrentPages()
        if (canNavBack && canNavBack.length > 1) {
            uni.navigateBack({
                delta: 1,
                // fail: () => {
                //     uni.reLaunch({
                //         url: '/pages/index/index'
                //     });
                // }
            })
        } else {
            history.back()
        }
    }
</script>

<style lang="scss">
    .searchheader-view {
        @apply flex justify-between items-center absolute top-0 left-0 w-full box-border;
        height: 85rpx;
        background: var(--UI-BG-1);
        padding: 0 40rpx;
    }

    .icon {
        @apply flex justify-center items-center;
        width: 50rpx;
        img {
            @apply w-full;
        }
    }

    .left-view {
        width: 150rpx;
    }

    .right-view {
        @apply flex items-center flex-row-reverse;
        width: 150rpx;
        .change-icon {
            margin-left: 40rpx;
        }
    }

    .search-title {
        @apply truncate text-center;
        width: 460rpx;
        font-size: 28rpx;
        font-weight: bold;
    }
</style>
