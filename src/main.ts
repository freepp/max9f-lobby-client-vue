import { ComponentPublicInstance, createSSRApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { i18n } from '@/common/i18nConfig'
import PopupMessage from '@/lib/components/PopupMessage.vue'
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'
import SAC from '@/lib/components/DrawBall/SAC.vue'
import LazyImg from '@/lib/components/LazyImg.vue'
import '@/common/types'
import { app, config } from '@/xxyy/'
import { modal } from './lib/components/Modal'
import { ga } from '@/common/common'
import { initUser, initApi } from '@/common/login'
import { queryURLParams } from '@/common/common'
import AsyncErrorNew from '@/lib/components/AsyncErrorNew.vue'

const { t: $t } = i18n.global
const pinia = createPinia()

const setLocalStorage = async () => {
    let params = queryURLParams()

    if (params.cid) {
      localStorage.setItem('cid', params.cid)
    }
    if (params.uid) {
        localStorage.setItem('uid', params.uid)
    }
    if (params.mid) {
        localStorage.setItem('mid', params.mid)
    }
}

const setDynamicPWA = async (operatorId) => {
    // 本地调试不加载PWA
    if (location.host.includes('localhost')) {
        return
    }
    var linkTag = document.createElement('link')
    linkTag.setAttribute('rel', 'manifest')
    linkTag.setAttribute('href', './webmanifest/' + operatorId + '.webmanifest')
    document.head.appendChild(linkTag)
}

let counter = 0
const initBaseConfig = async () => {
    const getDate = () => {
        let currentDate = new Date()
        let year = currentDate.getFullYear()
        let month = currentDate.getMonth() + 1
        let day = currentDate.getDate()
        let dateString = year + '-' + month + '-' + day
        return dateString
    }
    try {
        await app.init()
        await app.start()
    } catch (e) {
        if (counter < 2) {
            counter++
            await initBaseConfig()
            return
        }

        // initOperator ip非法访问
        if (e && e.code === 'RS_WRONG_COUNTRY') {
            modal({
                width: '560rpx',
                type: 'warning',
                zIndex: 10000,
                title: $t('KEY_POPUP_TIPS'),
                content:
                    'Desculpe, não fornecemos serviços na sua região no momento',
                showCancel: false,
                confirmText: $t('KEY_NETWORK_ERROR_BTN'),
                onConfirm() {
                    uni.reLaunch({
                        url: `/pages/index/index`,
                    })
                },
            })
        }
        // initOperator 接口超时
        if (e && e.message === 'Fetch timeout') {
            modal({
                width: '560rpx',
                type: 'warning',
                zIndex: 10000,
                title: $t('KEY_POPUP_TIPS'),
                content: $t('KEY_NETWORK_ERROR_TIP'),
                showCancel: false,
                confirmText: $t('KEY_NETWORK_ERROR_BTN'),
                onConfirm() {
                    uni.reLaunch({
                        url: `/pages/index/index`,
                    })
                },
            })
        } else {
            // 此时没有app没有初始化完成 reLaunch会找不到路由
            setTimeout(() => {
                uni.reLaunch({
                    url: `/pages/maintain/index?date=${getDate()}`,
                })
            }, 100)
        }
        return
    }

    let appDiv = document.getElementsByTagName('body')[0]
    appDiv.classList.add(config.operatorId)
}

const setRequestConfig = async () => {
    const token = localStorage.getItem(`token_${config.operatorId}`)
    initApi(
        config.xxyyUrl,
        config.appUrl,
        config.commonUrl,
        config.activityUrl,
        token
    )
}

const creatUser = async () => {
    let commonParams = {
        appId: config.appId,
        operatorId: config.operatorId,
        langId: config.languages[0].id,
        countryId: config.countryId,
        currencyId: config.currencyId,
    }
    // @ts-ignore
    config.userInfo = await initUser(config, commonParams)
}


export function createApp() {
    const app = createSSRApp(App)
    app.use(pinia)
    app.use(i18n)
    app.component('DatePicker', Vue3PersianDatetimePicker)
    app.component('PopupMessage', PopupMessage)
    app.component('SAC', SAC)
    app.component('LazyImg', LazyImg)
    app.component('AsyncErrorNew', AsyncErrorNew)
    const originalMounte = app.mount
    app.mount = (
        rootContainer: string | Element,
        isHydrate?: boolean,
        isSVG?: boolean
    ) => {
        setTimeout(async () => {
            try {
                setLocalStorage()
                await initBaseConfig()
                //setDynamicPWA(config.operatorId)
                await setRequestConfig()
                //await creatUser()
            } finally {
                originalMounte(rootContainer, isHydrate, isSVG)
            }
        }, 0)
        return app as unknown as ComponentPublicInstance
    }
    return {
        app,
    }
}
