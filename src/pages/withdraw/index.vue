<template>
    <Layout :headerType="0">
        <view class="mt-6"></view>
        <GHAIndex
            :pageType="1"
            v-if="store.commonParams?.countryId === 'GHA'"
        />
        <MEXIndex
            :pageType="1"
            v-if="store.commonParams?.countryId === 'MEX'"
        />
		
      <BRAIndex
            :pageType="1"
            v-if="store.commonParams?.countryId === 'BRA'"
        />
    </Layout>
    <!-- <SACPRO :alertConfig="data.alertConfig" /> -->
</template>
<script lang="ts" setup>
    import { reactive, ref, onMounted, watch, nextTick } from 'vue'
    import Layout from '@/lib/layout/Base.vue'
    import GHAIndex from '@/lib/components/Pay/GHA/index.vue'
    import MEXIndex from '@/lib/components/Pay/MEX/index.vue'
    import BRAIndex from '@/lib/components/Pay/BRA/index.vue'
    import SACPRO from '@/lib/components/DrawBall/SACPro.vue'
    import { onHide, onShow } from '@dcloudio/uni-app'
    import { useUsersStore } from '@/store/userStore'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { ga } from '@/common/common'
    import { i18n } from '@/common/i18nConfig'
    import { modal } from '@/lib/components/Modal'
    const { t: $t } = i18n.global
    const store = useUsersStore()

    const data = reactive<any>({
        name: 'Withdraw',
        alertConfig: {},
    })
    let modalRef = null
    const openPayFaild = () => {
        modalRef = modal({
            width: '485rpx',
            type: 'guest',
            zIndex: 201,
            title: $t('KEY_PAY_POPMESSAGE2'),
            content: $t('KEY_PAY_POPMESSAGE3'),
            confirmText: $t('KEY_FORMBTN_LOGIN'),
            cancelText: $t('KEY_FORMBTN_REGISTER'),
            maskClosable: false,
            onConfirm() {
                payFaildOk()
            },
            onCancel() {
                payFaildCancel()
            },
        })
        // RefPayFaildAlert.value.changeIsShow(true)
    }
    const payFaildOk = () => {
        uni.navigateTo({
            url: `../../pages/login/index?login_mode=2`,
        })
        console.log('ok')
    }
    const payFaildCancel = () => {
        uni.navigateTo({
            url: `../../pages/register/index?login_mode=2`,
        })
        console.log('cancel')
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    const getBalance = async () => {
        if (!store.userInfo) return
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

    const getVipInfo = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        // let res = await lobbyApi.profile.getVipInfo(params)
        let res = await lobbyApi.vip.vipGetVipInfoCreate(params)
        if (res.success) {
            store.userInfo = Object.assign(store.userInfo, res.result)
        } else {
            ErrorHandler(res, 'getVipInfo')
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

    const initData = () => {
        if (store.userInfo) {
            
            if (store.userInfo?.userMode === 2) {
                getBalance()
                getVipInfo()
                getLoad()
            }
        }
    }

    onShow(() => {
        if (store.userInfo && store.userInfo?.userMode === 2) {
            initData()
        } else if (store.userInfo && store.userInfo?.userMode === 1) {
            openPayFaild()
        }
    })
    onHide(() => {
        modalRef && modalRef.close()
    })
    onMounted(() => {
        // @ts-ignore
        if (window.android) {
            // @ts-ignore
            window.android.reviewGp()
        }
        initData()
        // @ts-ignore
        if (window.android) {
            // @ts-ignore
            window.android.reviewGp()
        }
        uni.setNavigationBarTitle({
            title: $t('KEY_PAGETITLE_WITHDRAW'),
        })
    })
</script>
<style lang="scss"></style>
