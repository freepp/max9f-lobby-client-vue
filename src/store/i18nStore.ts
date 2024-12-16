import { defineStore } from 'pinia'

export const i18nStore = defineStore('i18n', {
    state: () => {
        return {
            local: {
                id: 'en',
                title: 'English',
            },
            languageList: [],
        }
    },
    actions: {
        changeLanguage() {
            // locale.value = 'zh-Hant'
        },
    },
})
