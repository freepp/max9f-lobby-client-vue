<template>
    <GHAIndex :pageType="0" v-if="store.commonParams?.countryId === 'GHA'" />
    <MEXIndex :pageType="0" v-if="store.commonParams?.countryId === 'MEX'" />
    <BRAIndex :pageType="0" v-if="store.commonParams?.countryId === 'BRA'" :zIndex="zIndex" />
</template>
<script lang="ts" setup>
    import GHAIndex from '@/lib/components/Pay/GHA/index.vue'
    import MEXIndex from '@/lib/components/Pay/MEX/index.vue'
    import BRAIndex from '@/lib/components/Pay/BRA/index.vue'

    interface Props {
        zIndex?: number
    }

    const props = withDefaults(defineProps<Props>(), {
        zIndex: 2036
    })

    const store = useUsersStore()

    const data = reactive<any>({
        name: 'Deposit',
    })
</script>
<style lang="scss"></style>
