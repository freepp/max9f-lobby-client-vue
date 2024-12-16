<template>
    <uni-drawer ref="RefUniDrawer" mode="left" class="drawer">
        <Logo @closeDrawer="closeDrawer" />
       <scroll-view class="scroll-view" scroll-y @touchmove.stop>
           <Menu :menuConfig="getMenuConfig" @closeDrawer="closeDrawer" />
            <view class="setting-view">
                <Menu :menuConfig="getMenuConfig2" @closeDrawer="closeDrawer" />
            </view>
        </scroll-view>
        <!-- <Slogan
            @closeDrawer="closeDrawer"
            :current-activity="currentActivity"
        /> -->
    </uni-drawer>
</template>
<script lang="ts" setup>
    import Logo from './Logo.vue'
    import Menu from './Menu.vue'
    // import Slogan from './Slogan.vue'
    import AllImg from '@/static/burger/all-burger-1.png'
    import ForyouImg from '@/static/burger/foryou-burger-1.png'
    // import SlotsImg from '@/static/burger/slots-burger-1.png'
    // import LiveImg from '@/static/burger/live-burger-1.png'
    // import LotteryImg from '@/static/burger/lottery-burger-1.png'
    import NewImg from '@/static/burger/new-burger-1.png'
    // import RouletteImg from '@/static/burger/roulette-burger-1.png'
    // import TableImg from '@/static/burger/table-burger-1.png'
    import TopImg from '@/static/burger/top-burger-1.png'
    // import DownloadImg from '@/static/burger/download-burger-1.png'
    import EnImg from '@/static/burger/en-burger-1.png'
    import EsImg from '@/static/burger/es-burger-1.png'
    import PtImg from '@/static/burger/pt-burger-1.png'
    import DepositImg from '@/static/burger/deposit-burger-1.png'
    // import HelpImg from '@/static/burger/help-burger-1.png'
    import PromotionImg from '@/static/burger/promotion-burger-1.png'
    import DAppImg from '@/static/burger/DApp-burger-1.png'
    // import FacebookImg from '@/static/burger/Facebook-burger-1.png'
    // import TelegramImg from '@/static/burger/telegram-burger-1.png'
    // import { api as lobbyApi } from '@/NET/lobby'
    import { api as commonApi } from '@/NET/common'
    import { api as lobbyApi } from '@/NET/lobby'
    import { GET_CHANNEL_DATA } from '@/common/init';

    const store = useUsersStore()
    const commonStore = useCommonStore()
    const { t: $t } = i18n.global
    const data = reactive<any>({
        bannerData: [],
        // navType 0: 直接跳转 1: tab页跳转 2: 首页tab切换
        categoryData: [
            {
                categoryId: 1,
                topLevelType: 1,
                categoryName: $t('KEY_MENU_TOPGAMES'),
            },
            {
                categoryId: 3,
                topLevelType: 2,
                categoryName: $t('KEY_MENU_NEWGAMES'),
            },
            {
                categoryId: 17,
                topLevelType: 3,
                categoryName: $t('KEY_MENU_TADA'),
            },
            {
                categoryId: 18,
                topLevelType: 4,
                categoryName: $t('KEY_MENU_PLAY'),
            },
            {
                categoryId: 15,
                topLevelType: 8,
                categoryName: $t('KEY_MENU_ALLGAMES'),
            },
            {
                categoryId: 0,
                topLevelType: 0,
                categoryName: $t('KEY_MENU_FORYOU'),
            },
        ],
    })

    const categoryObj = {
      1: {
        icon: TopImg,
      },
      2: {
        icon: NewImg,
      },
      3: {
        icon: NewImg,
      },
      4: {
        icon: NewImg,
      },
      8: {
        icon: AllImg,
      },
      0: {
        icon: ForyouImg,
        navType: 0,
        path: `/pages/gamelist/index?pageType=3&condition=&headerTitle=${$t('KEY_MENU_FORYOU')}`
      },
    }

    const getMenuConfig = computed(() => {
      const menuConfig = commonStore.categoryTabList.map((item, idx) => {
        return {
          Name: item.categoryName,
          path: categoryObj?.[item.topLevelType]?.path ?? idx,
          navType: categoryObj?.[item.topLevelType]?.navType ?? 2,
          opened: false,
          item: [],
          icon: categoryObj?.[item.topLevelType]?.icon,
          className: 'intro__hook--new',
        }
      })
        return menuConfig
    })

    const getMenuConfig2 = computed(() => {
        let langIcon = EnImg
        if (store.commonParams.langId === 'pt') {
            langIcon = PtImg
        } else if (store.commonParams.langId === 'es') {
            langIcon = EsImg
        }
        let menuConfig2 = [
            {
                Name: $t('KEY_MENU_PROMOTION'),
                path: `/pages/promotions/index`,
                navType: 1,
                opened: false,
                item: [],
                icon: PromotionImg,
                className: 'intro__hook--new',
            },
            {
                Name: $t('KEY_MENU_PAYMENT'),
                path: `/pages/deposit/index`,
                navType: 1,
                opened: false,
                item: [],
                icon: DepositImg,
                className: 'intro__hook--new',
            },
            {
                Name: $t('KEY_MENU_LANGUAGE'),
                path: ``,
                navType: 4,
                opened: false,
                item: [],
                icon: langIcon,
                className: 'intro__hook--new',
            },
        ]
        // @ts-ignore
        if (!window.android && GET_CHANNEL_DATA().isDownload) {
            menuConfig2.push(
                ...[
                    {
                        Name: $t('KEY_MENU_DOWNLOADAPP'),
                        path: `/pages/download/index`,
                        navType: 4,
                        opened: false,
                        item: [],
                        icon: DAppImg,
                        className: 'intro__hook--new',
                    },
                ]
            )
        }
        return menuConfig2
    })

    const RefUniDrawer = ref()

    const showDrawer = () => {
        if (store.userInfo) {
          if (!commonStore.categoryTabList.length) {
            getCategorys()
          }
        }
        RefUniDrawer.value.open()
        // getCurrentActivity()
    }

    const closeDrawer = () => {
        RefUniDrawer.value.close()
    }

    const getBannersByType = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                position: [2, 3],
            },
            store.commonParams
        )
        let res = await commonApi.banner.bannerBannerCreate(params)
        if (res.success) {
            console.log(commonStore.bannerData)
            if (commonStore.bannerData[2]) {
            } else {
            }
            data.bannerData = res.result
        } else {
            ErrorHandler(res, 'getBannersByType')
        }
    }

    // 获取一级分类（一级分类数据暂存本地）
    const getCategorys = async () => {
        commonStore.categoryTabList = data.categoryData
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.home.categoryList(params)
        if (res.success) {
            let category = res.result
            // 创建一个新的 data.categoryData 数组，覆盖原有 data.categoryData 数组的 categoryId
            const updatedListb = data.categoryData.slice(0, -1).reduce((acc, itemB) => {
                // 根据 topLevelType 查找 category 中是否有匹配项
                const match = category.find(itemA => itemA.topLevelType === itemB.topLevelType);
                // 如果找到匹配项，用 category 的 categoryId 覆盖 data.categoryData 的 categoryId
                if (match) {
                    acc.push({ ...itemB, categoryId: match.categoryId });
                }
                return acc;
            }, []);
            // 始终保留 data.categoryData 最后一项
            updatedListb.push(data.categoryData.at(-1));
            data.categoryData = [...updatedListb]
            commonStore.categoryTabList = [...updatedListb]
        } else {
            ErrorHandler(res, 'getCategorys')
        }
    }

    watch(
        () => store.userInfo,
        () => {
            initData()
        }
    )

    const initData = () => {
        if (store.userInfo) {
            //getBannersByType()
        }
    }

    onMounted(() => {
        initData()
    })

    defineExpose({
        showDrawer,
        closeDrawer,
    })
</script>
<style lang="scss">
    .drawer {
        z-index: 2025;
        @media (width > 960px) {
          position: absolute;
          height: 100vh;
        }
    }
    .scroll-view {
        height: calc(100% - 244rpx);
        background: #eeeeee;
    }
</style>
