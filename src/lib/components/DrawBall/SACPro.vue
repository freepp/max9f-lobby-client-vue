<template>
    <view class="sacPro-view" :class="{ open: data.viewOpen }" :style="{ width: data.viewOpen ? `${140 * data.iconList.length + 140}rpx` : '140rpx', }">
        <swiper
            class="swiper"
            autoplay="true"
            duration="500"
            circular="true"
            v-if="!data.viewOpen"
            @click="openList"
        >
            <swiper-item v-for="(item, index) in data.iconList" :key="index">
                <view class="swiper-item" :class="'swiper-item' + index">
                    <image
                        class="w-full h-full"
                        :src="item.imageUrl"
                        mode="scaleToFill"
                        alt=""
                    />
                </view>
            </swiper-item>
        </swiper>
        <view class="scroll-view" v-else>
            <view class="icon-list">
                <view
                    class="icon"
                    @click="iconClick(item)"
                    v-for="(item, index) in data.iconList"
                    :key="index"
                >
                    <img :src="item.imageUrl" alt="" />
                </view>
            </view>
        </view>

        <view
            class="arrow-left"
            v-if="data.viewOpen"
            @click="data.viewOpen = false"
        >
            <img src="@/static/icon/jiantou_R.png" alt="" />
        </view>
    </view>
</template>

<script lang="ts" setup>
    import SACImg from '@/static/index/SAC-icon.png'
    import DepositImg from '@/static/index/deposit-icon.png'
    import ShareImg from '@/static/index/share-icon.png'
    import { IS_ACTIVITY_SWITCH } from '@/common/activityAssets'
    const emits = defineEmits(['openIndexTable'])
    interface Props {
        pageType?: number
        alertConfig?: any
    }

    const props = withDefaults(defineProps<Props>(), {
        pageType: 1,
        alertConfig: {},
    })

    interface Data {
        title?: string
        viewOpen: boolean
        iconList: any
    }

    const data = reactive<Data>({
        title: 'SAC',
        viewOpen: false,
        iconList: [
            // {
            //     code: 100000,
            //     imageUrl: SACImg,
            //     linkUrl: '',
            // },
            // {
            //     code: 100001,
            //     imageUrl: DepositImg,
            //     linkUrl: '/pages/deposit/index',
            // },
            // {
            //     code: 100002,
            //     imageUrl: ShareImg,
            //     linkUrl: '',
            // },
        ],
    })

    const themeColor = ref(IS_ACTIVITY_SWITCH ? '#7200FF' : '#28c76f')

    watch(
        () => props.alertConfig,
        (val) => {
            let defaultList = [
                // {
                //     code: 100000,
                //     imageUrl: SACImg,
                //     linkUrl: '',
                // },
                // {
                //     code: 100001,
                //     imageUrl: DepositImg,
                //     linkUrl: '/pages/deposit/index',
                // },
                // {
                //     code: 100002,
                //     imageUrl: ShareImg,
                //     linkUrl: '',
                // },
            ]
            data.iconList = [
                ...props.alertConfig.indexFloatingWindows,
                ...defaultList,
            ]
        }
    )

    const openList = () => {
        if (data.iconList.length === 1) {
            iconClick(data.iconList[0])
        } else {
            data.viewOpen = true
        }
    }

    const iconClick = (item) => {
        if (item.code === 100000) {
            openChat()
        } else if (item.code === 1) {
            const pages = getCurrentPages()
            const page = pages?.[0]
            if (page && page.route === 'pages/index/index') {
                emits('openIndexTable')
                return
            }
            uni.navigateTo({
                url: '/pages/red_package/index',
            })
        } else {
            uni.navigateTo({
                url: item.linkUrl,
                fail() {
                    uni.switchTab({
                        url: item.linkUrl,
                    })
                },
            })
        }
        data.viewOpen = false
    }

    const openChat = () => {
        // @ts-ignore
        $crisp.push(['do', 'chat:show'])
        // @ts-ignore
        $crisp.push(['do', 'chat:open'])
        return
    }

    onMounted(() => {
        nextTick(() => {
            document.addEventListener(
                'click',
                (e) => {
                    const target = e.target as HTMLElement
                    let sacView = document.getElementsByClassName('sacPro-view')[0]
                    if (!sacView) return

                    if (!sacView.contains(target)) {
                        data.viewOpen = false
                    }
                },
                true
            )
        })
    })
</script>

<style lang="scss">
    .sacPro-view {
        @apply fixed;
        max-width: 560rpx;
        border-radius: 50%;
        background: v-bind(themeColor);
        box-shadow: 0rpx 3rpx 10rpx 1rpx rgba(0, 0, 0, 0.8);
        z-index: 200;
        width: 140rpx;
        height: 140rpx;
        border-radius: 60rpx;
        right: 16rpx;
        bottom: 300rpx;
        transition: width 0.3s ease;
        @media (width > 960px) {
          position: absolute;
        }
    }

    .swiper {
        @apply absolute;
        width: 130rpx;
        height: 160rpx;
        top: -20rpx;
        left: 50%;
        transform: translate(-50%, 0);
        .swiper-item {
            @apply w-full h-full;
        }
        img {
            @apply w-full h-full;
        }
    }
    .scroll-view {
        @apply overflow-x-scroll absolute;
        max-width: 460rpx;
        top: -20rpx;
        left: 18rpx;
    }
    .icon-list {
        @apply flex;
        .icon {
            @apply flex-shrink-0;
            width: 130rpx;
            margin-right: 10rpx;
            float: left;
            img {
                @apply w-full;
            }
        }
    }
    .arrow-left {
        @apply absolute;
        right: 40rpx;
        top: 50%;
        transform: translate(0, -50%);
        width: 18rpx;
        img {
            @apply w-full;
        }
    }
</style>
