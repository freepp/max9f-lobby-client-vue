import { defineStore } from 'pinia'

interface commonStore {
  tabbarSelected: number
  drawerShow: boolean
  searchShow: boolean
  categoryTabIndex: number
  indexAssistanterShow: boolean
  assistanterList: any
  bannerData: any
  deviceInfo: any
  depositTab: number
  couponpackInfo: {
    countDown: number
    isOpen: boolean
  }
  isSign: boolean,
  categoryTabList: any[]
  withdrawTempInfo: any
  refreshCashLoad: number
}

export const useCommonStore = defineStore('common', {
    state: (): commonStore => {
        return {
            tabbarSelected: 0,
            drawerShow: false,
            searchShow: false,
            categoryTabIndex: 0,
            indexAssistanterShow: false,
            assistanterList: [],
            bannerData: {},
            deviceInfo: {}, //新增设备信息
            depositTab: 0, // 充值提现页面tab，0：充值，1：提现
            couponpackInfo: { // 破产特惠活动
              countDown: 0,
              isOpen: false
            },
            isSign: true, // (true: 今日已签到 隐藏按钮; false: 今日未签到 打开按钮)
            categoryTabList: [], // 类别标签列表
            withdrawTempInfo: {}, // 24-12-5 临时需求：提现
            refreshCashLoad: 0, // 刷新cashLoad接口
        }
    },
})
