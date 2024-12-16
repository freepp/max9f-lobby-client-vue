<template>
    <view
        class="modal-view"
        :class="{ 'no-bg': !hasShadow }"
        v-if="data.showModal"
        @click="maskClick()"
    >
        <slot></slot>
    </view>
</template>

<script lang="ts" setup>

    interface Props {
        hasShadow?: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
        hasShadow: true,
    })

    interface Data {
        showModal: boolean
    }
    const data = reactive<Data>({
        showModal: false,
    })
    const emit = defineEmits(['maskClick'])

    const changeModal = (type: boolean) => {
        data.showModal = type
    }

    const maskClick = () => {
        emit('maskClick')
    }

    defineExpose({
        changeModal,
    })
</script>

<style lang="scss">
    .modal-view {
        @apply absolute left-0 right-0 bottom-0 top-0;
        background-color: rgba(0, 0, 0, 0.8);
    }

    .no-bg {
        background-color: transparent;
    }
</style>
