import { ErrorHandler } from '@/common/ErrorHandler'
import { RegisterIpo, LoginIpo } from '@/NET/xxyy/data-contracts'
import { api as xxyyApi } from '@/NET/xxyy'
import { api as lobbyApi } from '@/NET/lobby'
import { api as commonApi } from '@/NET/common'
import { api as activityApi } from '@/NET/activity'

// import { config } from '@xxyy/app'
import { config } from '@/xxyy/'

import _ from 'lodash'

const lobbyApiDomain: string = import.meta.env.VITE_Lobby_API_DOMAIN
const xxyyApiDomain: string = import.meta.env.VITE_XXYY_API_DOMAIN
const activityApiDomain: string = import.meta.env.VITE_Activity_API_DOMAIN
const commonApiDomain: string = import.meta.env.VITE_Common_API_DOMAIN

let baseXxyyApi = ''
let baseLobbyApi = ''
let baseCommonApi = ''
let baseActivityApi = ''

const getUserInfo = async (data) => {
    let res = await xxyyApi.account.relogin(data)
    if (res.success) {
        return res.result
    } else {
        ErrorHandler(res, 'getUserInfo')
        return false
    }
}

const register = async (baseConfig, data: RegisterIpo) => {
    let res = await xxyyApi.account.register(data)
    if (res.success) {
        if (data.loginMode === 1) {
			uni.setStorageSync('guest_info', JSON.stringify(res.result))
			uni.setStorageSync(
			    `token_${baseConfig.operatorId}`,
			    res.result.jwtToken
			)
            initApi(
                baseXxyyApi,
                baseLobbyApi,
                baseCommonApi,
                baseActivityApi,
                res.result.jwtToken
            )
        } else {
            /* localStorage.setItem(
                `token_${baseConfig.operatorId}`,
                JSON.stringify(res.result)
            ) */
			uni.setStorageSync(
			    `token_${baseConfig.operatorId}`,
			    JSON.stringify(res.result)
			)
            initApi(
                baseXxyyApi,
                baseLobbyApi,
                baseCommonApi,
                baseActivityApi,
                JSON.stringify(res.result)
            )
        }

        return res.result
    } else {
        if (res.code === 'RS_PUSER_NOT_EXISTS') {
            return res.code
        } else {
            ErrorHandler(res, 'register')
            return false
        }
    }
}

const login = async (baseConfig, data: LoginIpo) => {
    let res = await xxyyApi.account.login(data)
    if (res.success) {
        if (data.loginMode === 2) {
           /* localStorage.setItem(
                `token_${baseConfig.operatorId}`,
                JSON.stringify(res.result)
            ) */
			uni.setStorageSync(
			    `token_${baseConfig.operatorId}`,
			    JSON.stringify(res.result)
			)
            initApi(
                baseXxyyApi,
                baseLobbyApi,
                baseCommonApi,
                baseActivityApi,
                JSON.stringify(res.result)
            )
        } else {
          /*  localStorage.setItem(
                `token_${baseConfig.operatorId}`,
                res.result.jwtToken
            ) */
			uni.setStorageSync(
			      `token_${baseConfig.operatorId}`,
			      res.result.jwtToken
			  )
            initApi(
                baseXxyyApi,
                baseLobbyApi,
                baseCommonApi,
                baseActivityApi,
                res.result.jwtToken
            )
        }

        return res.result
    } else {
        if (data.loginMode === 1) {
            // localStorage.removeItem('guest_info')
			uni.removeStorageSync('guest_info')
        }
        ErrorHandler(res, 'login')
        return false
    }
}

const initUser = async (baseConfig, commonParams) => {
    // const token = localStorage.getItem(`token_${baseConfig.operatorId}`)
    // const guestInfo = localStorage.getItem('guest_info')
	const token = uni.getStorageSync(`token_${baseConfig.operatorId}`)
	const guestInfo = uni.getStorageSync('guest_info')
    let userInfo = {}
    let guestUserInfo = guestInfo ? JSON.parse(guestInfo) : null
    let data: any = {}
    if (token) {
        userInfo = await getUserInfo(commonParams)
    }
    // else if (guestUserInfo) {
    //     data = {
    //         loginMode: 1,
    //         userId: guestUserInfo.userId,
    //         password: guestUserInfo.visitorPassword,
    //     }
    //     data = Object.assign(data, commonParams)
    //     userInfo = await login(baseConfig, data)
    // }
    else {
        data = {
            loginMode: 1,
            FromMode: 0,
            FromId: '',
            clientUrl: window.location.href,
        }

        // let cid = localStorage.getItem('cid')
        // let uid = localStorage.getItem('uid')
        // let mid = localStorage.getItem('mid')
		let cid = uni.getStorageSync('cid')
		let uid = uni.getStorageSync('uid')
		let mid = uni.getStorageSync('mid')
        if (cid && cid !== 'undefined') {
            data.FromMode = 2
            data.FromId = cid
        } else if (uid && uid !== 'undefined') {
            data.FromMode = mid || 1
            data.FromId = uid
        }
        data = Object.assign(_.cloneDeep(commonParams), data)

        userInfo = await register(baseConfig, data)

        if (userInfo === 'RS_PUSER_NOT_EXISTS') {
            let params = data
            params.FromMode = 0
            params.FromId = ''

            userInfo = register(baseConfig, params)
        }
    }
    return userInfo
}

const initApi = (
    xxyyBaseUrl = '',
    lobbyBaseUrl = '',
    commonUrl = '',
    activityUrl='',
    token = ''
) => {
    if (xxyyBaseUrl) {
        baseXxyyApi = xxyyBaseUrl
    }
    if (lobbyBaseUrl) {
        baseLobbyApi = lobbyBaseUrl
    }

    if (activityUrl) {
        baseActivityApi = activityUrl
    }
    if (commonUrl) {
        baseCommonApi = commonUrl
    }
    lobbyApi.init(
        lobbyBaseUrl ? lobbyBaseUrl : lobbyApiDomain,
        { secure: true },
        () => token,
        config.uuid,
        config.accessKey
    )
    xxyyApi.init(
        xxyyBaseUrl ? xxyyBaseUrl : xxyyApiDomain,
        { secure: true },
        () => token,
        config.uuid,
        config.accessKey
    )
    commonApi.init(
        commonUrl ? commonUrl : commonApiDomain,
        { secure: true },
        () => token,
        config.uuid,
        config.accessKey
    )
    activityApi.init(
        activityUrl ? activityUrl : activityApiDomain,
        { secure: true },
        () => token,
        config.uuid,
        config.accessKey
    )
}

export { getUserInfo, register, login, initUser, initApi }
