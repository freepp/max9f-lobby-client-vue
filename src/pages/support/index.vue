<template>
    <view class="logo-view">
        {{ data.title }}
    </view>
    <PopupMessage ref="RefMessage" />
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'

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
        title: 'Service',
    })
    const emit = defineEmits(['parentFun'])
    const RefMessage = ref()

    const test = () => {
        emit('parentFun')
        RefMessage.value.messageToggle({
            type: 'error',
            message: 'test',
        })
    }
</script>

<style lang="scss">
    .logo-view {
    }
</style>
