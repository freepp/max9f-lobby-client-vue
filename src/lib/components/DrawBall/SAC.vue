<template>
    <DrawBall>
        <view class="sac-view" @click="openChat">
            <img src="@/static/index/SAC.png" alt="" />
        </view>
    </DrawBall>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import DrawBall from './DrawBall.vue'

    interface Props {
        pageType?: number
    }

    interface Data {
        title?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        pageType: 1,
    })
    const data = reactive<Data>({
        title: 'SAC',
    })

    const openChat = () => {
        // @ts-ignore
        $crisp.push(['do', 'chat:show'])
        // @ts-ignore
        $crisp.push(['do', 'chat:open'])
        return
    }
</script>

<style lang="scss">
    .sac-view {
        @apply w-full h-full;
        img {
            @apply w-full h-full;
        }
    }
</style>
