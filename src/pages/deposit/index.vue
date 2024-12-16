<template>
    <Layout :headerType="0">
        <BonusTabs ref="bonusTabsRefs" class="mt-5" @tab-change="tabChange" :tab-data="tabs" :defaultIdx="pageType" />
        <GHAIndex
            :pageType="pageType"
            v-if="store.commonParams?.countryId === 'GHA'"
        />
        <MEXIndex
            :pageType="pageType"
            v-if="store.commonParams?.countryId === 'MEX'"
        />
        <BRAIndex
            :pageType="pageType"
            v-if="store.commonParams?.countryId === 'BRA'"
        />
    </Layout>
   <!-- <SACPRO :alertConfig="data.alertConfig" /> -->
</template>
<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    import GHAIndex from '@/lib/components/Pay/GHA/index.vue'
    import MEXIndex from '@/lib/components/Pay/MEX/index.vue'
    import BRAIndex from '@/lib/components/Pay/BRA/index.vue'
    import BonusTabs from '@/lib/components/Pay/common/BonusTabs.vue'
    // import SACPRO from '@/lib/components/DrawBall/SACPro.vue'
    import { api as lobbyApi } from '@/NET/lobby'

    const { t: $t } = i18n.global
    const store = useUsersStore()
    const commonStore = useCommonStore()

    const bonusTabsRefs = ref(null)

    const pageType = computed(() => commonStore.depositTab ?? 0)

    const tabs = [
      {
          id: 0,
          name: $t('KEY_TABBAR_DEPOSIT'),
      },
      {
          id: 1,
          name: $t('KEY_TABBAR_WITHDRAW'),
      },
    ]

    function tabChange(item) {
      commonStore.depositTab = item.id
    }

    const data = reactive<any>({
        name: 'Deposit',
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
        //RefPayFaildAlert.value.changeIsShow(true)
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
            
            if (store.userInfo?.userMode === 1) {
                nextTick(() => {
                    openPayFaild()
                })
            } else {
                getBalance()
                getVipInfo()
                getLoad()
            }
        }
    }

    const createBtn = () => {
        nextTick(() => {
            const btn = document.createElement('a')
            btn.setAttribute('herf', 'javascript:;')
            btn.setAttribute(
                'onclick',
                "window.parent.postMessage({action: 'goDeposit',},'*')"
            )
            btn.innerHTML = 'postMessage'
            document.getElementById('mask_modal').appendChild(btn)
            btn.click()
            document.getElementById('mask_modal').removeChild(btn)
        })
    }

    onLoad(() => {
        if (window.top.location.href != window.location.href) {
            createBtn()
        }
    })

    onShow(() => {
        initData()
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
        uni.setNavigationBarTitle({
            title: $t('KEY_PAGETITLE_DEPOSIT'),
        })
    })
</script>
<style lang="scss"></style>
