<template>
    <uni-nav-bar
        class="nav-bar"
        :class="transparentHeader && 'no_border'"
        :left-icon="leftIcon"
        :title="headerTitle"
        :background-color="transparentHeader && !transparentHeaderToUIBG ? 'transparent' : 'var(--UI-BG)'"
        color="#FFFFFF"
        @clickLeft="clickLeft"
        @clickRight="clickRight"
        :border="!transparentHeader"
    >
      <view v-if="isLogo" class="flex items-center justify-center w-full h-full" @click="goHome">
        <img v-if="store.baseConfig.imgBaseUrl" style="width: 242rpx;" :src="getLogoUrl('burger_top.png', store.baseConfig)" alt="" />
      </view>
    </uni-nav-bar>

    <Drawer ref="RefDrawer"></Drawer>
</template>
<script lang="ts" setup>
    import Drawer from '@/lib/layout/Drawer/index.vue'
    import { getLogoUrl } from '@/common/common'

    interface Props {
        headerTitle?: string
        leftIcon?: string
        isLogo?: boolean
        transparentHeader?: boolean // 透明导航栏，不占位
        transparentHeaderToUIBG?: boolean // 透明导航栏，滚动到一定高度给予背景色
    }

    const props = withDefaults(defineProps<Props>(), {
        headerTitle: '',
        leftIcon: 'left',
        isLogo: false,
        transparentHeader: false,
        transparentHeaderToUIBG: false,
    })

    const store = useUsersStore()

    const data = reactive<any>({})

    const RefDrawer = ref(null)

    const showDrawer = () => {
        RefDrawer.value.showDrawer()
    }

    const clickLeft = () => {
        if (props.leftIcon === '') return
        let canNavBack = getCurrentPages()
        if (canNavBack && canNavBack.length > 1) {
            uni.navigateBack({
                delta: 1,
                // fail: () => {
                //     uni.reLaunch({
                //         url: '/pages/index/index'
                //     });
                // }
            })
        } else {
            history.back()
        }
    }

    const clickRight = () => {
        // showDrawer()
    }

    const goHome = () => {

        uni.switchTab({
            url: '/',
        })
    }
</script>
<style lang="scss">
    .nav-bar {
        @apply box-border;
        &.no_border {
          ::v-deep .uni-navbar__header {
              @apply box-border;
              border: none;
          }
        }
    }
    ::v-deep .uni-navbar__header {
        @apply box-border;
        border-bottom: 1px solid rgba(69, 69, 69, var(--tw-border-opacity));
    }
</style>
