<template>
    <view class="base-container">
        <view id="mask_modal"></view>

        <view v-if="hasHeader || transparentHeader" :style="transparentHeader && {zIndex: 10, position: 'relative'}">
        <!-- <AppDownload
                @close="closeDownloadBar"
                v-if="data.showDownload && headerType === 0 && GET_CHANNEL_DATA().isDownload"
            /> -->
            <Header v-if="headerType === 0" />
            <Nav
              :headerTitle="headerTitle"
              :leftIcon="leftIcon"
              :isLogo="isLogo"
              :transparentHeader="transparentHeader"
              :transparentHeaderToUIBG="transparentHeaderToUIBG"
              v-else
            />
        </view>

        <view
            ref="scrollRef"
            class="scroll-view"
            :class="{
                navTop: headerType === 1,
                // downloadTop: data.showDownload,
                top0: !hasHeader || transparentHeader,
            }"
            :style="slotStyle"
            @scroll="scrollView"
        >
          <slot></slot>
        </view>
       <!-- <view v-if="!headerType">
            <Tabbar></Tabbar>
        </view> -->
    </view>
</template>

<script lang="ts" setup>
    import Header from './Header/index.vue'
    // import Tabbar from './Tabbar/index.vue'
    import Nav from './Nav/index.vue'
    // import AppDownload from '@/lib/components/AppDownload/index.vue'
    // import { GET_CHANNEL_DATA } from '@/common/init';

    const store = useUsersStore()

    const scrollRef = ref()

    interface Props {
        headerTitle?: string
        headerType?: number
        hasHeader?: boolean
        leftIcon?: string
        isLogo?: boolean
        slotStyle?: any
        transparentHeader?: boolean // 透明导航栏，不占位
    }

    const props = withDefaults(defineProps<Props>(), {
        headerTitle: 'header',
        headerType: 1,
        hasHeader: true,
        leftIcon: 'left',
        isLogo: false,
        transparentHeader: false
    })

    const transparentHeaderToUIBG = ref(false) // 透明导航栏，滚动到一定高度给予背景色

    interface Data {
        showDownload?: boolean
    }

    const data = reactive<Data>({
        showDownload: false,
    })

    const scrollHeight = computed(() => {})

    const closeDownloadBar = () => {
        data.showDownload = false
        emit('appShowDownload', false)
    }

    const emit = defineEmits(['appShowDownload', 'scrollTop'])

    const initDownload = () => {
        // if (store.baseConfig?.operatorId === 'own_lobby_bra') {
        // @ts-ignore
        if (window.android) {
            data.showDownload = false
        } else {
            // let cid = localStorage.getItem('cid')
            let cid = uni.getStorageSync('cid')
            let localPath = getCurrentPages()
            if (localPath.length === 0) return
            let localRoute = localPath[localPath.length - 1].route
            if (localRoute === 'pages/index/index') {
                if (cid !== 'kwai') {
                    data.showDownload = true
                }
            } else {
                data.showDownload = false
            }
        }
        // } else {
        //     data.showDownload = false
        // }
        emit('appShowDownload', data.showDownload)
    }

    // 透明导航栏，滚动到一定高度给予背景色
    function scrollView() {
      emit('scrollTop', scrollRef?.value?.$el?.scrollTop || 0)
      if (!props.transparentHeader) return
      if (scrollRef?.value?.$el?.scrollTop > 40) {
        transparentHeaderToUIBG.value = true
      } else {
        transparentHeaderToUIBG.value = false
      }
    }

    watch(
        () => store.baseConfig,
        () => {
            initDownload()
        }
    )

    onMounted(() => {
        initDownload()
    })
</script>

<style lang="scss">
    .base-container {
        @apply relative h-full;
    }

    .scroll-view {
        @apply w-full absolute left-0 right-0 bottom-0 overflow-y-scroll;
        top: 74rpx;
        height: calc(100% - 74rpx);
        background: var(--UI-BG);
        // &::-webkit-scrollbar {
        //     display: none;
        // }
    }

    .top0 {
        top: 0 !important;
        height: 100% !important;
    }

    .downloadTop {
        // top: 134rpx;
        // height: calc(100%  - 134rpx);
        top: 0rpx;
        height: calc(100%);
    }

    .navTop {
        top: 44px;
        height: calc(100% - 44px);
    }
</style>
