<template>
    <view class="loading-view">
        <img src="@/static/loading.svg" alt="" />
    </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

interface Data {
    title?: string
}

const data = reactive<Data>({
    title: 'Loading',
})
</script>

<style lang="scss">
.loading-view {
    @apply flex justify-center items-center;
    animation: 0.6s linear infinite rotate;
}

@keyframes rotate {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
