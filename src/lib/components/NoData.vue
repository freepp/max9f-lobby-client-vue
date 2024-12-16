<template>
    <view class="nodata-view" :class="{ white: pageStyle === 'white' }">
        <img v-if="isWhite" src="@/static/icon/nodata_white.png" alt="" />
        <img v-else src="@/static/icon/nodata.png" alt="" />
        <view  class="nodata-message">{{ message }}</view>
    </view>
</template>

<script lang="ts" setup>
    import { reactive } from 'vue'

    interface Props {
        isWhite?: boolean
        message?: string
        pageStyle?: string
    }

    interface Data {
        title?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        message: '',
    })

    const data = reactive<Data>({
        title: 'Nodata',
    })
</script>

<style lang="scss">
    .nodata-view {
        @apply flex items-center flex-col;
        img {
            width: 153rpx;
        }
    }
    .nodata-message {
        @apply text-white-80;
        opacity: 0.5;
        font-size: 28rpx;
        margin-top: 70rpx;
    }

    .white {
        .nodata-message {
            color: #fff;
            opacity: 1;
        }
    }
</style>
