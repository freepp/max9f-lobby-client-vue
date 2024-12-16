<template>
    <view class="tab-view">
        <view class="tab-box">

           <CategoryTab
                :categoryData="categoryData"
                @chooseTab="chooseTab"
                @openSearch="openSearch"
            />
        </view>
    </view>
    <view class="category-view">
        <view class="category-gradient"></view>
        <view class="category-content">
            <view class="loading" v-if="data.isLoading">
                <Loading />
            </view>
            <view class="nodata" v-else-if="data.categoryItems.length === 0">
                <NoData
                    :message="$t('KEY_COMMON_NODATA')"
                    :pageStyle="'white'"
                ></NoData>
            </view>
            <view v-else>
                <view
                    class="mb-3"
                    v-for="(item, index) in data.categoryItems"
                    :key="index"
                >
                    <CategoryModule :categoryInfo="item" />
                </view>
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
    import CategoryModule from './CategoryModule.vue'
    import Loading from '@/lib/components/Loading.vue'
    import CategoryTab from './CategoryTab.vue'
    import NoData from '@/lib/components/NoData.vue'
    import { api as lobbyApi } from '@/NET/lobby'

    const store = useUsersStore()

    interface Props {
        categoryData?: any
    }

    const props = withDefaults(defineProps<Props>(), {
        categoryData: () => [],
    })

    const data = reactive<any>({
        tabIndex: 0,
        isLoading: true,
        categoryItems: [],
    })

    const getCategoryDetail = async (categoryID) => {
        data.isLoading = true
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                categoryID,
            },
            store.commonParams
        )
        let res = await lobbyApi.home.categoryDetail(params)
        if (res.success) {
            // res.result?.forEach((item) => {
            //     item.apps =
            //         item.apps?.filter((item) => {
            //             return !item.appId.startsWith('pg')
            //         }) || []
            // })
            data.categoryItems = res.result


        } else {
            ErrorHandler(res, 'getCategoryDetail')
        }
        data.isLoading = false
    }

    const chooseTab = (index: number) => {

        if (data.tabIndex === index && data.categoryItems.length !== 0) return
        data.categoryItems = []
        data.tabIndex = index
        getCategoryDetail(props.categoryData[data.tabIndex].categoryId)
    }

    const emit = defineEmits(['openSearch'])

    const openSearch = (type) => {
        emit('openSearch', type)
    }

    defineExpose({
        chooseTab,
    })
</script>

<style lang="scss">
    .tab-view {
        @apply sticky z-20;
        top: -2rpx;
        background: var(--UI-BG);
        .tab-box {
            padding: 0px 24rpx;
        }
    }

    .tab-gradient {
        @apply w-full;
        height: 23rpx;
    }

    .category-view {
        @apply relative;
        min-height: 500rpx;
    }

    .category-gradient {
        @apply w-full z-0 absolute left-0;
        height: 375rpx;
        top: -23rpx;
    }

    .category-content {
        @apply z-10 relative overflow-hidden;
        padding: 0rpx 15rpx 1rpx;
    }

    .loading {
        @apply w-full flex justify-center items-center;
        height: 200rpx;
    }

    .nodata {
        padding-top: 100rpx;
    }
</style>
