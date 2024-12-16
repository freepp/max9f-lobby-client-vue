<template>
    <invite-base>
        <image
            :src="imageSrc"
            class="block w-full"
            mode="widthFix"
        ></image>
    </invite-base>
</template>
<script lang="ts" setup>
    import { onMounted, computed } from 'vue'
    import InviteBase from './components/InviteBase.vue'
    import { getImgPrefix } from '@/common/init'


    onMounted(async () => {
        await uni.setNavigationBarTitle({
            title: 'Fortune Tiger',
        })
    })

    const imageSrc = computed(() => {
        return getImgPrefix() + "/agent/bra.jpg"
    })

</script>
