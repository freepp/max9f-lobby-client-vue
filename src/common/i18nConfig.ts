import { createI18n } from 'vue-i18n'
// import { app, config } from '@xxyy/app'

import { app, config } from '@/xxyy/'

import en from '@/locale/en.json'
import es from '@/locale/es.json'
import pt from '@/locale/pt.json'

// const local = localStorage.getItem('local')
const local = uni.getStorageSync('local')
const localData = local ? JSON.parse(local) : {}

const getDate = () => {
    let currentDate = new Date()
    let year = currentDate.getFullYear()
    let month = currentDate.getMonth() + 1
    let day = currentDate.getDate()
    let dateString = year + '-' + month + '-' + day
    return dateString
}

const init = async () => {
    try {
        //await app.init()
        //await app.start()
    } catch (e) {
        console.log('---------------')
        console.log(e) 
        // uni.reLaunch({
        //     url: `/pages/maintain/index?date=${getDate()}`,
        // })
    }
}

let locale = 'pt'
if (local) {
    locale = localData.id
} else {
    if (!config.languages) {
        init()
    }
    locale = config.languages ? config.languages[0].id : 'pt'
}
const messages = {
    en,
    es,
    pt,
}

let i18nConfig = {
    locale,
    allowComposition: true,
    legacy: false,
    messages,
    warnHtmlMessage: false,
}

export const i18n = createI18n(i18nConfig)
