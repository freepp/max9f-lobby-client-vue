<template>
    <Layout :headerTitle="$t('KEY_PAGETITLE_PROMOTION')" :headerType="0">
        <view class="promoions-view">
            <view class="loading" v-if="data.isLoading">
                <Loading />
            </view>
            <view v-else-if="data.promoionsData.length > 0">
                <!-- <Card
                    v-for="(item, index) in data.promoionsData"
                    :key="index"
                    :promoionsItem="item"
                /> -->
                <commonCard
                    v-for="(item, index) in data.promoionsData"
                    :key="index"
                    :promoionsItem="item"
                />
            </view>
            <view v-else>
                <NoData class="nodata" :message="$t('KEY_COMMON_NODATA')" />
            </view>
        </view>
       <!-- <SACPRO :alertConfig="data.alertConfig" /> -->
    </Layout>
</template>
<script lang="ts" setup>
    import { reactive, onMounted, watch } from 'vue'
    import Layout from '@/lib/layout/Base.vue'
    import SACPRO from '@/lib/components/DrawBall/SACPro.vue'
    import Card from './Card.vue'
    import commonCard from './commonCard.vue'
    import Loading from '@/lib/components/Loading.vue'
    import { onShow } from '@dcloudio/uni-app'
    import NoData from '@/lib/components/NoData.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { ga } from '@/common/common'
    import { i18n } from '@/common/i18nConfig'
    const { t: $t } = i18n.global
    const store = useUsersStore()

    const data = reactive<any>({
        title: 'PROMOTIONS',
        promoionsData: [],
        pageIndex: 1,
        pageSize: 5,
        isLoading: false,
        alertConfig: {},
    })

    const getActivitys = async () => {
        data.isLoading = true
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
            },
            store.commonParams
        )
        let res = await lobbyApi.home.getActivitys(params)
        if (res.success) {
            data.promoionsData = res.result
            // data.promoionsData[0].isValid = false
        } else {
            ErrorHandler(res, 'getListByLabel')
        }
        data.isLoading = false
    }

    const getBalance = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.initLobby.getBalance(params)
        if (res.success) {
            store.userInfo = Object.assign(store.userInfo, res.result)
        } else {
            ErrorHandler(res, 'getBalance')
        }
    }

    const getLoad = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.initLobby.load(params)
        if (res.success) {
            data.alertConfig = res.result
        } else {
            ErrorHandler(res, 'getLoad')
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
            
            getActivitys()
            getLoad()
        }
    }

    onShow(() => {
        if (store.userInfo && store.userInfo?.userMode === 2) {
            getBalance()
        }
    })

    onMounted(() => {
        initData()
        uni.setNavigationBarTitle({
            title: $t('KEY_PAGETITLE_PROMOTION'),
        })
    })
</script>
<style lang="scss">
    .promoions-view {
        @apply box-border;
        padding: 30rpx;
        min-height: 100%;
    }
    .nodata {
        margin-top: 200rpx;
    }
</style>
