<template>
    <Layout :headerTitle="$t('KEY_PAGETITLE_PROMOTION')" isLogo :slotStyle="slotStyle" @scrollTop="scrollView">
      <!-- 动态加载组件 -->
      <component :is="activityComponent" :hotGames="data.hotGames" :page-type="activityPageType" :scrollTop="scrollTop"/>
    </Layout>
  </template>

  <script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    import CommonPanel from './activities/CommonPanel.vue'
    import Register from './activities/Register.vue'
    import FirstRecharge from './activities/FirstRecharge.vue'
    import BonusPack from './activities/BonusPack.vue'
    import Feedback from './activities/Feedback.vue'
    import SignEveryday from './activities/SignEveryday.vue'
    import SpinWheel from './activities/SpinWheel.vue'
    import SpinWheelQA from './activities/SpinWheelQA.vue'
    import RechargeGift from './activities/RechargeGift.vue'
    import LoseBack from './activities/LoseBack.vue'
    import DailyFirstDeposit from './activities/DailyFirstDeposit.vue'
    import betReturn from './activities/betReturn.vue'
    import BonusReturn from './activities/BonusReturn.vue'
    import ShareActivity from './activities/ShareActivity.vue'
    import ShareActivity2 from './activities/ShareActivity2.vue'
    import ShareActivity3 from './activities/ShareActivity3.vue'
    import ShareActivity4 from './activities/ShareActivity4.vue'
    import ShareActivity5 from './activities/ShareActivity5/index.vue'
    import WeekCard from './activities/WeekCard.vue'
    import GuaranteeCompensation from './activities/GuaranteeCompensation.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    const store = useUsersStore()
    const { t: $t } = i18n.global

    interface Data {
        activityId: string
        hotGames: any
    }

    const data = reactive<Data>({
      activityId: '',
      hotGames: [],
    })

    const slotStyle = ref<any>({})

    const activityComponent = computed(() => {
      const componentMap = {
        '200000': CommonPanel,
        '1': Register,
        '2': FirstRecharge,
        '3': BonusPack,
        '4': Feedback,
        '5': SpinWheelQA,
        '100004': RechargeGift,
        '100005': SignEveryday,
        '100003': LoseBack,
        '100008': DailyFirstDeposit,
        '100009': betReturn,
        '100014': betReturn,
        '100016': betReturn,
        '100010': BonusReturn,
        '100015': BonusReturn,
        '100017': BonusReturn,
        '100011': ShareActivity,
        '100013': ShareActivity4,
        '100018': ShareActivity2,
        '100019': ShareActivity3,
        '101001': SpinWheel,
        '101002': WeekCard,
        '100020': GuaranteeCompensation,
        '102001': ShareActivity5,
      }
  
      return componentMap[data.activityId] || null
    })
  
    const activityPageType = computed(() => {
      const pageTypeMap = {
        '100009': 1,
        '100014': 2,
        '100016': 3,
        '100010': 1,
        '100015': 2,
        '100017': 3,
      }
  
      return pageTypeMap[data.activityId] || null
    })

    const scrollTop = ref(0)
    function scrollView(e) {
      scrollTop.value = e || 0
    }
  
    const regpayGames = async () => {
      let params = Object.assign(
        {
          userId: store.userInfo.userId,
        },
        store.commonParams
      )
      let res = await lobbyApi.activitys.regpayGames(params)
      if (res.success) {
        data.hotGames = res.result
      } else {
        ErrorHandler(res, 'regpayGames')
      }
    }

    const initData = () => {
      if (store.userInfo) {
        regpayGames()
      }
    }
  
    watch(
      () => store.userInfo,
      (val) => {
        initData()
      }
    )

    onMounted(() => {
      initData()
    })
  
    onLoad((options) => {
      data.activityId = options.activity_id
      switch (options.activity_id) {
        case '102001':
          slotStyle.value = { background: '#2c0400' }
          break
        default:
          slotStyle.value = {}
          break
      }
    })
  
    uni.setNavigationBarTitle({
      title: $t('KEY_PAGETITLE_PROMOTION'),
    })
  </script>
  
  <style lang="scss">
    .info-view {
    }
  </style>
  