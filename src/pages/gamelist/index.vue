<template>
    <Layout headerTitle="Slot" :header-type="0">
        <SearchHeader :title="data.headerTitle" @changeType="changeType" />
        <scroll-view
            class="list-scroll"
            scroll-y="true"
            @scrolltolower="loadmore"
        >
            <view v-if="data.listData.length !== 0">
                <view class="grid-view" v-if="data.cardType === 1">
                    <view
                        class="category-card-s"
                        v-for="(item, index) in data.listData"
                        :key="index"
                    >
                        <CategoryCard :cardInfo="item" />
                    </view>
                </view>
                <view v-if="data.cardType === 0" class="list-view">
                    <ListCard
                        v-for="(item, index) in data.listData"
                        :key="index"
                        :cardInfo="item"
                    />
                </view>
            </view>
            <view v-else-if="data.moreStatus !== 'loading'">
                <NoData class="nodata" :message="$t('KEY_COMMON_NODATA')" />
            </view>
            <uni-load-more
                v-if="data.moreStatus !== 'no-more'"
                :status="data.moreStatus"
                :contentText="{
                    contentdown: $t('KEY_COMMON_LOADMORE'),
                    contentrefresh: $t('KEY_COMMON_LOADING'),
                    contentnomore: $t('KEY_COMMON_NOMORE'),
                }"
            />
        </scroll-view>
        <!-- <SAC /> -->
    </Layout>
</template>

<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    import { onLoad } from '@dcloudio/uni-app'
    import { reactive, watch, toRaw } from 'vue'
    import CategoryCard from './CategoryCard.vue'
    import ListCard from './ListCard.vue'
    import NoData from '@/lib/components/NoData.vue'
    import SearchHeader from './SearchHeader.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { useCommonStore } from '@/store/commonStore'

    import { ga } from '@/common/common'
    import { i18n } from '@/common/i18nConfig'
    const { t: $t } = i18n.global
    const store = useUsersStore()
    const commonStore = useCommonStore()

    interface Data {
        headerTitle: string
        listData: any[]
        pageType: number
        cardType: number
        condition: string
        pageIndex: number
        pageSize: number
        hasMore: boolean
        moreStatus: string
    }

    const data = reactive<Data>({
        headerTitle: '',
        listData: [],
        pageType: 1, //1: viewMore 2: label 3: myGame 4: fuzzy Search 5: AllGame
        cardType: 1, //0: 大卡片 1: 小图标
        condition: '',
        pageIndex: 1,
        pageSize: 20,
        hasMore: true,
        moreStatus: 'loading',
    })

    const initListData = () => {
        let items = data.listData
        items.forEach((item) => {
            item.choosed = false
        })
    }

    const getGameList = async () => {
        data.moreStatus = 'loading'
        let resData = []
        switch (data.pageType) {
            case 1:
                resData = await getMore()
                break
            case 2:
                resData = await getListByLabel()
                break
            case 3:
                resData = await getMyGame()
                break
            case 4:
                resData = await getListByFuzzy()
                break
            case 5:
                resData = await getListByFirstCategoryGames()
            default:
        }
        setTimeout(() => {
            if (resData.length < data.pageSize) {
                data.hasMore = false
                data.moreStatus = 'no-more'
            } else {
                data.moreStatus = 'more'
            }
            data.listData = [...data.listData, ...resData]
            initListData()
        }, 100)
    }

    const getMore = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
                categoryId: data.condition,
            },
            store.commonParams
        )
        let res = await lobbyApi.home.categoryMore(params)
        if (res.success) {
            // res.result =
            //     res.result?.filter((item) => {
            //         return !item.appId.startsWith('pg')
            //     }) || []
            return res.result
        } else {
            ErrorHandler(res, 'getMore')
        }
        return []
    }

    const getListByLabel = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
                keywordID: data.condition,
            },
            store.commonParams
        )
        let res = await lobbyApi.home.queryKeyword(params)
        if (res.success) {
            return res.result
        } else {
            ErrorHandler(res, 'getListByLabel')
        }
        return []
    }

    const getMyGame = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
            },
            store.commonParams
        )
        let res = await lobbyApi.home.categoryMyGame(params)
        if (res.success) {
            return res.result
        } else {
            ErrorHandler(res, 'getMyGame')
        }
        return []
    }

    const getListByFuzzy = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
                input: data.condition,
            },
            store.commonParams
        )
        let res = await lobbyApi.home.queryInput(params)
        if (res.success) {
            return res.result
        } else {
            ErrorHandler(res, 'getListByFuzzy')
        }
        return []
    }

    const getListByFirstCategoryGames = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
                categoryID: data.condition,
            },
            store.commonParams
        )
        let res = await lobbyApi.home.firstCategoryGames(params)
        if (res.success) {
            return res.result
        } else {
            ErrorHandler(res, 'firstCategoryGames')
        }
        return []
    }

    const changeType = (type) => {
        data.cardType = type
        console.log(data.cardType)
        if (data.listData.length === 10) {
            loadmore()
        }
    }

    const loadmore = () => {
        if (data.hasMore && data.pageType !== 4) {
            data.pageIndex++
            getGameList()
        }
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    const initData = () => {
        if (store.userInfo) {
            getGameList()
        }
    }

    onLoad((options) => {
        data.pageType = options.pageType ? Number(options.pageType) : 1
        data.condition = options.condition ? options.condition : ''
        data.headerTitle = options.headerTitle ? options.headerTitle : ''

        initData()
        commonStore.categoryTabIndex = 0
    })

    uni.setNavigationBarTitle({
        title: $t('KEY_PAGETITLE_GAMELIST'),
    })
</script>

<style lang="scss">
    .list-scroll {
        @apply absolute left-0 right-0 bottom-0 overflow-y-auto;
        top: 85rpx;
    }
    .grid-view {
        @apply flex flex-wrap;
        padding: 20rpx;
    }
    .list-view {
        @apply box-border;
        padding: 20rpx;
        background: #eee;
        min-height: 100%;
        color: #000000;
    }

    .loading {
        @apply w-full flex justify-center items-center;
        height: 200rpx;
    }

    .category-card-s {
        width: 230rpx;
        height: 310rpx;
        margin-top: 10rpx;
        margin-right: 10rpx;
        &:nth-child(3n) {
            margin-right: 0;
        }
    }

    .nodata {
        padding-top: 200rpx;
    }
</style>
