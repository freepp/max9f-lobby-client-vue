<template>
    <view class="tab-scroll" v-if="categoryData.length > 0">
        <view class="tab-view">

            <view
                class="category-item"
                :class="{
                    choosed: data.chooseIndex === index,
                }"
                v-for="(item, index) in categoryData"
                :key="index"
                @click="() => chooseTab(index, item)"
            >
                <view class="icon-view">
                    <img
                        v-show="data.chooseIndex === index"
                        :src="data.tabIcons[item.topLevelType]?.selected"
                        alt=""
                    />
                    <img
                        v-show="data.chooseIndex !== index"
                        :src="data.tabIcons[item.topLevelType]?.unSelected"
                        alt=""
                    />
                </view>
                {{ item.categoryName }}
            </view>
        </view>
        <view class="right-mask flex" @click="openSearch">
            <view class="right-search-left"></view>
            <view class="right-search-box">
                <img src="@/static/icon/search_round.png" alt="" />
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import AllImg from '@/static/switch/all-swtich-2.png'
    import AllImgC from '@/static/switch/all-swtich-1.png'
    import ForyouImg from '@/static/switch/foryou-swtich-2.png'
    import ForyouImgC from '@/static/switch/foryou-swtich-1.png'
    import LiveImg from '@/static/switch/live-swtich-2.png'
    import LiveImgC from '@/static/switch/live-swtich-1.png'
    import LotteryImg from '@/static/switch/lottery-swtich-2.png'
    import LotteryImgC from '@/static/switch/lottery-swtich-1.png'
    import NewImg from '@/static/switch/new-swtich-2.png'
    import NewImgC from '@/static/switch/new-swtich-1.png'
    import RouletteImg from '@/static/switch/roulette-swtich-2.png'
    import RouletteImgC from '@/static/switch/roulette-swtich-1.png'
    // import SlotsImg from '@/static/switch/slots-swtich-2.png'
    // import SlotsImgC from '@/static/switch/slots-swtich-1.png'
    // import TableImg from '@/static/switch/table-swtich-2.png'
    // import TableImgC from '@/static/switch/table-swtich-1.png'
    import TopImg from '@/static/switch/top-swtich-2.png'
    import TopImgC from '@/static/switch/top-swtich-1.png'
    // import JiliImg from '@/static/switch/jili-swtich-2.png'
    // import JiliImgC from '@/static/switch/jili-swtich-1.png'
    import TadaImg from '@/static/switch/tada-swtich-2.png'
    import TadaImgC from '@/static/switch/tada-swtich-1.png'
    import PlayImg from '@/static/switch/play-swtich-2.png'
    import PlayImgC from '@/static/switch/play-swtich-1.png'
    import { IS_ACTIVITY_SWITCH } from '@/common/activityAssets'

    const { t: $t } = i18n.global
    const store = useCommonStore()
    const userStore = useUsersStore()

    interface Props {
        categoryData?: any
    }

    const props = withDefaults(defineProps<Props>(), {
        categoryData: () => [],
    })

    const data = reactive<any>({
        chooseIndex: 0,
        tabIcons: {
            0: {
                selected: ForyouImgC,
                unSelected: ForyouImg,
            },
            1: {
                selected: TopImgC,
                unSelected: TopImg,
            },
            2: {
                selected: NewImgC,
                unSelected: NewImg,
            },
            3: {
                selected: TadaImgC,
                unSelected: TadaImg,
            },
            4: {
                selected: PlayImgC,
                unSelected: PlayImg,
            },
            5: {
                selected: LiveImgC,
                unSelected: LiveImg,
            },
            6: {
                selected: RouletteImgC,
                unSelected: RouletteImg,
            },
            7: {
                selected: LotteryImgC,
                unSelected: LotteryImg,
            },
            8: {
                selected: AllImgC,
                unSelected: AllImg,
            },
        },
    })

    const themeColor = ref(IS_ACTIVITY_SWITCH ? '#7200FF' : '#28c76f')

    const emit = defineEmits(['chooseTab', 'openSearch'])

    watch(
        () => store.categoryTabIndex,
        (val) => {
            data.chooseIndex = val
            chooseTab(val, props.categoryData[val])
        }
    )

    const chooseTab = (index: number, item) => {

        switch (item.topLevelType) {
          case 0:
            uni.navigateTo({
                url: `/pages/gamelist/index?pageType=3&condition=&headerTitle=${item.categoryName}`,
            })
            break;
          case 2:
          case 3:
          case 4:
          case 8:
            uni.navigateTo({
                url: `/pages/gamelist/index?pageType=5&condition=${item.categoryId}&headerTitle=${item.categoryName}`,
            })
            break;
          default:
            store.categoryTabIndex = index
            // data.chooseIndex = index
            emit('chooseTab', index)
            break;
        }
    }


    const openSearch = () => {
        emit('openSearch', true)
    }
</script>

<style lang="scss">
    .tab-scroll {
        @apply flex overflow-x-scroll w-full;
        padding-top: 10rpx;
        padding-bottom: 10rpx;
        margin-top: 27rpx;
        margin-top: 8rpx;
    }

    .tab-view {
        @apply flex relative;
        padding-right: 90rpx;
        padding-bottom: 20rpx;
        // padding-left: 24rpx;
    }

    .such-mask {
        @apply sticky left-0;
        padding-left: 24rpx;
        padding-right: 8rpx;
        background: #182828;
    }

    .category-item {
        @apply box-border flex items-center;
        min-width: 103rpx;
        height: 76rpx;
        margin-right: 17rpx;
        border-radius: 38px;
        font-size: 22rpx;
        line-height: 76rpx;
        padding: 0 22rpx;
        background: #272727;
        white-space: nowrap;
        .icon-view {
            width: 47rpx;
            height: 47rpx;
            margin-right: 15rpx;
            overflow: hidden;
            img {
                @apply w-full h-full;
            }
        }

        &:last-child {
            margin: 0;
        }
    }

    .search-item {
        @apply sticky;
        width: 90rpx;
        min-width: 80rpx;
        left: 24rpx;
        margin: 0;
    }

    .choosed {
        @apply font-bold;
        background: v-bind(themeColor);
    }

    .right-mask {
        @apply absolute right-0 z-20 box-border;
        width: 110rpx;
        height: 100%;
        top: 0rpx;
        .right-search-left {
            @apply box-border;
            width: 30rpx;
            height: 100%;
            background: linear-gradient(
                270deg,
                #0e0e0f,
                rgba(14, 14, 15, 0.01)
            );
        }
        .right-search-box {
            @apply box-border;
            width: 80rpx;
            height: 100%;
            padding: 27rpx 0 0 15rpx;
            background: var(--UI-BG);
            img {
                width: 42rpx;
                height: 42rpx;
            }
        }
    }
</style>
