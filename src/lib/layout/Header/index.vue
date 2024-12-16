<template>
    <view class="custom-header bg-theme-100">
        <view class="flex items-center">
            <img
                class="burger-btn"
                src="@/static/icon/burger.png"
                @click="showDrawer"
                alt=""
            />
            <Logo />
        </view>
        <view>
            <User />
        </view>
    </view>

    <Drawer ref="RefDrawer"></Drawer>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue'
    import { ref } from 'vue'
    import Drawer from '@/lib/layout/Drawer/index.vue'
    import Logo from './Logo.vue'
    import User from '@/lib/components/User.vue'

    const data = reactive<any>({
        header: 'header',
    })

    const RefDrawer = ref(null)

    const showDrawer = () => {
        RefDrawer.value.showDrawer()
    }

    const clickRight = () => {}
</script>
<style lang="scss">
    .custom-header {
        @apply flex items-center justify-between z-30 relative;
        height: 74rpx;
        padding: 0 24rpx;
    }

    .burger-btn {
        width: 42rpx;
        margin-right: 30rpx;
    }
</style>
