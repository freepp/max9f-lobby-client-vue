<template>
    <Layout :header-title="'Reward History'"></Layout>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import Layout from '@/lib/layout/Base.vue'
    import { useUsersStore } from '@/store/userStore'
    import { i18n } from '@/common/i18nConfig'

    const { t: $t } = i18n.global

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
