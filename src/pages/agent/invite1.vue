<template>
    <invite-base>
        <image
            src="@/static/agent/bra1.jpg"
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
            title: '100% de Bônus no 1º depósito:quanto mais depositar,mais ganha!',
        })
    })
</script>
