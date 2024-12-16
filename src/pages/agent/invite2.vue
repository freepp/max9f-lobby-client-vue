<template>
    <invite-base>
        <image
            src="@/static/agent/bra2.jpg"
            class="block w-full"
            mode="widthFix"
        ></image>
    </invite-base>
</template>
<script lang="ts" setup>
    import { onMounted } from 'vue'
    import InviteBase from './components/InviteBase.vue'
    onMounted(() => {
        uni.setNavigationBarTitle({
            title: 'Registre-se e ganhe bônus.Chegou, ganhou!',
        })
    })
</script>
