import { defineStore } from 'pinia'
import { ReloginDto } from '@/NET/xxyy/data-contracts'

interface userStore {
    isLogin: boolean
    userInfo: any
    commonParams: any
    baseConfig: any
    isInitOperatorApp: boolean
}
export const useUsersStore = defineStore('users', {
    state: (): userStore => {
        return {
            isLogin: false,
            userInfo: null,
            //userInfo: uni.getStorageSync('guest_info') ? JSON.parse(uni.getStorageSync('guest_info')) : null,
            commonParams: {},
            baseConfig: {},
            isInitOperatorApp: false, // 记录 InitOperatorApp 状态
        }
    },
})
