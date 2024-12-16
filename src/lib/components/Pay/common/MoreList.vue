<template>
    <view>
        <view class="list-group" v-for="(item, index) in listData" :key="index">
            <view
                class="list-item"
                v-for="(items, indexs) in item.items"
                :key="indexs"
                @click="() => itemClick(items)"
            >
                <view class="item-icon">
                    <img :src="items.icon" alt="" />
                </view>
                <view class="item-detail">
                    <view class="item-name">{{ items.name }}</view>
                    <view class="right-icon">
                        <img src="@/static/icon/arrow_right_white.png" alt="" />
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'

    interface Props {
        listData?: any
    }
    const props = withDefaults(defineProps<Props>(), {
        listData: 1,
    })

    interface Data {
        title?: string
    }
    const data = reactive<Data>({
        title: 'Logo',
    })

    const emit = defineEmits(['parentFun'])

    const test = () => {
        emit('parentFun')
    }

    const itemClick = (item) => {
        if (item.path) {
            uni.navigateTo({
                url: item.path,
            })
        }
    }

    // defineExpose({
    //   sendSmsCode,
    // })
</script>

<style lang="scss">
    .list-group {
        @apply bg-black-60 text-white-100;
        margin-bottom: 25rpx;
        border-radius: 8rpx;
        .list-item {
            @apply flex items-center justify-between;
            border-bottom: 2rpx solid;
            @apply border-black-80;
            &:last-child {
                border: 0;
            }
            .item-icon {
                width: 50rpx;
                margin: 0 15rpx;
                img {
                    @apply w-full;
                }
            }
            .item-detail {
                @apply flex items-center justify-between flex-1;
                padding: 0 28rpx;
                padding-right: 0;
                height: 90rpx;
            }
            .item-name {
                font-size: 28rpx;
                font-weight: 400;
            }
            .right-icon {
                width: 50rpx;
                img {
                    @apply w-full;
                }
            }
        }
    }
</style>
