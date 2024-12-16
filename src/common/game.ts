
import { api as lobbyApi } from '@/NET/lobby'

const { t: $t } = i18n.global
//const store = useUsersStore()
const commonStore = useCommonStore()
import _ from 'lodash'
import { loading } from '@/lib/components/Loading/index'
let loadingInstance = null
const toggleLoading = (type) => {
    if (type) {
        loadingInstance = loading()
    } else {
        loadingInstance?.close()
    }
}
export const ownGameList = [
    {
        appId: 'dwin_poker',
        appName: 'DWin Poker',
    },
    {
        appId: 'gold_ggk',
        appName: 'RASPADINHA',
    },
    {
        appId: 'mexico_fortune',
        appName: 'Mexico Fortune',
    },
    {
        appId: 'super_phoenix',
        appName: 'Super Phoenix',
    },
]
export const openGame = (cardInfo, gaKey?: string) => {
	const store = useUsersStore()
    if (
        !cardInfo.hasOwnProperty('isSupportBonus') ||
        cardInfo.isSupportBonus ||
        store.userInfo?.bonus === 0
    ) {
        goGameDetail(cardInfo, gaKey)
        return
    }
    modal({
        width: '500rpx',
        type: 'warning',
        title: $t('KEY_POPUP_TIPS'),
        content: `${$t('KEY_POPUP_NOOWN1')} R$${store.userInfo?.bonus} ${$t(
            'KEY_POPUP_NOOWN2'
        )}`,
        cancelText: $t('KEY_POPUP_CONTINUE'),
        confirmText: $t('KEY_POPUP_OWNGAME'),
        onConfirm: () => {
            const randomIndex = Math.floor(Math.random() * ownGameList.length)
            let game = ownGameList[randomIndex]
            goGameDetail(game, gaKey)
        },
        onCancel: () => {
            goGameDetail(cardInfo, gaKey)
        },
    })
}
export const goGameDetail = async (item, gaKey = '') => {
	const store = useUsersStore()
    if (gaKey) {
        
    }
    let localUrl = window.location.href
    let origin = localUrl.slice(0, localUrl.indexOf('#'))
    if (origin.indexOf('?') > 0) {
        origin = origin.slice(0, origin.indexOf('?'))
    }
    if (origin[origin.length - 1] === '/') {
        origin = origin.slice(0, origin.length - 1)
    }
    let url = origin
    let depositUrl = `${url}/#/pages/deposit/index`
    let params = Object.assign(_.cloneDeep(store.commonParams), {
        userId: store.userInfo.userId,
        appId: item.appId,
        lobbyUrl: url,
        depositUrl,
    })
    toggleLoading(true)
    uni.removeStorageSync('gameResult')
    let res = await lobbyApi.initLobby.getAppUrl(params)
    if (res.success) {
        toggleLoading(false)
        if (res?.result) {
          uni.setStorageSync('gameResult', res.result)
        }
        uni.navigateTo({
          url: `/pages/game/index?app_id=${
              item.appId
          }&game_name=${
              encodeURIComponent(item.appName)
          }`,
        })
        // sessionStorage.setItem("gameHTML",res.result.content)
        // uni.navigateTo({
        //     url: `/pages/game/index?app_id=${
        //         item.appId
        //     }&url=${encodeURIComponent(res.result.url)}&game_name=${
        //         encodeURIComponent(item.appName)
        //     }`,
        //     // url: '/pages/game/index'
        // })
    } else {
        toggleLoading(false)
        if (res.code === 'RS_NOT_ENOUGH_MONEY') {
            modal({
                type: 'gift',
                width: '485rpx',
                title: $t('KEY_POPUP_MONEY_INSUFICIENTE'),
                // content: $t('KEY_POPUP_MIN_MONEY_PLAY_GAME')?.replace(
                //     '#money#',
                //     res.result as string
                // ),
                content:
                    'Deposite agora e ganhe até <span style="color: #F82E49; font-weight: 900;">R$10.000 BÔNUS</span> para ganhar recompensas em dinheiro',
                showCancel: false,
                confirmText: $t('KEY_COMMON_DEPOSIT'),
                maskClosable: true,
                onConfirm() {
                    commonStore.depositTab = 0
                    uni.switchTab({
                        url: '/pages/deposit/index',
                    })
                },
            })
            return
        }
        ErrorHandler(res, 'getAppUrl')
    }
}
