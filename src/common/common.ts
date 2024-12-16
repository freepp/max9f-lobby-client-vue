import { GET_CHANNEL_DATA } from './init'

export let numberWithCommas = (x) => {
    if (!x) return 0
    let str = x.toString().replace('.', ',')
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export let ga = (eventName, params: any = {}) => {
    // let baseConfig = JSON.parse(localStorage.getItem('baseConfig'))

	let baseConfig = JSON.parse(uni.getStorageSync('baseConfig'))
    params.operatorId = baseConfig.operatorId

  /*  let cid = localStorage.getItem('cid')
        ? localStorage.getItem('cid')
        : 'own_lobby_bra' */
	let cid = uni.getStorageSync('cid')
	      ? uni.getStorageSync('cid')
	      : 'own_lobby_bra'
    params.cid = cid

    try {
        const ga = window['gtag'] || null
        if (!ga) return

        const branch = window['branch'] || null
        if (!branch) return
        branch.logEvent(eventName, params, function (err) {
            if (err) {
                // console.log(eventName, err)
            }
        })
    } catch (e) {}
}

// 获取app GAID
export let getGaid = () => {
    let GAID = ''
    try {
        // @ts-ignore
        GAID = window.android.getGaid()
    } catch (e) {}
    return GAID
}

// app 埋点
export let appOnEventJs = (eventName) => {
    try {
        let u = navigator.userAgent
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (isAndroid) {
            // @ts-ignore
            window.android.onEventJs(eventName)
            // @ts-ignore
            window.android.onEventBranch(eventName)
        }
        if (isIOS) {
            // @ts-ignore
            window.webkit.messageHandlers.onEventJs(eventName)
        }
    } catch (err) {}
}

export let queryURLParams = () => {
    let URL = window.location.href
    const lastIndex = URL.lastIndexOf('?')
    let search = ''
    if (lastIndex !== -1) {
        search = URL.substring(lastIndex + 1)
    }
    const urlSearchParams: any = new URLSearchParams(search)
    const params = Object.fromEntries(urlSearchParams.entries())

    return params
}

export let getLogoUrl = (name, baseConfig) => {
    let cidData = [
        'SpinUpUp',
        'UpCasino',
        'UpSlots',
        'UpUpSlots',
        'upupgo',
        'upupplay',
        'upupsorte',
        'sorteslots',
        'sortecasino',
        'sortespin',
        'sortebet',
        'funnysnake',
        'jogo10',
        'suave',
        'forrou',
        'forrajogogo',
        'forrajogoplay',
        'forrajogosorte',
    ]
    const CHANNEL_DATA = GET_CHANNEL_DATA()
    let path = CHANNEL_DATA.path
    if (baseConfig.cid) {
        if (cidData.includes(baseConfig.cid)) {
            path = baseConfig.cid
        }
    }
    return `${baseConfig.imgBaseUrl}/logo/${path}/${name}`
}

export let getLogoName = () => {
    let logoName = 'lucro777'
    switch (window.location.host) {
        case 'www.lucro777.com':
            logoName = 'lucro777'
            break
        case 'www2.lucro777.com':
            logoName = 'sorteslots'
            break
        case 'www.sorteslots.com':
            logoName = 'sorteslots'
            break
        case 'www1.lucro777.com':
            logoName = 'upCasino'
            break
        case 'www.upupbet.com':
            logoName = 'upCasino'
            break
        case 'www.jogo10br.com':
            logoName = 'jogo10'
            break
        case 'www.suavegame.com':
            logoName = 'suave'
            break
        case 'www.forroubet.com':
            logoName = 'forrou'
            break
        case 'www.sorte10.com':
            logoName = 'sorte10'
            break
        case 'www.forrajogo.com':
            logoName = 'forrajogo'
            break
        case 'www.vitoria365.com':
            logoName = 'vitoria365'
            break
        default:
            logoName = 'lucro777'
    }
    return logoName
}

export let getDomainList = () => {
    return [
        'www.lucro777.com',
        'www1.lucro777.com',
        'www2.lucro777.com',
        'www.sorteslots.com',
        'www.upupbet.com',
    ]
}

// export let initShareMeta = (operatorId) => {
//     let metaUrl = document.getElementById('meta-url')
//     let metaSitename = document.getElementById('meta-sitename')
//     let metaTitle = document.getElementById('meta-title')
//     let metaDescription = document.getElementById('meta-description')
//     let metaImage = document.getElementById('meta-image')
//     let metaSecure = document.getElementById('meta-secure')

//     switch (operatorId) {
//         case 'own_lobby_bra':
//             metaUrl.setAttribute('content', 'https://www.lucro777.com')
//             metaSitename.setAttribute('content', 'https://www.lucro777.com')
//             metaTitle.setAttribute('content', 'LUCRO777™')
//             metaDescription.setAttribute('content', 'Welcome to LUCRO777')
//             metaImage.setAttribute(
//                 'content',
//                 'https://upload.777gana.com/lobby/share/share-www.webp'
//             )
//             metaSecure.setAttribute(
//                 'content',
//                 'https://upload.777gana.com/lobby/share/share-www.webp'
//             )
//             break
//         case 'own_lobby_bra1':
//             metaUrl.setAttribute('content', 'https://www.lucro7771.com')
//             metaSitename.setAttribute('content', 'https://www.lucro777.com')
//             metaTitle.setAttribute('content', 'LUCRO777™')
//             metaDescription.setAttribute('content', 'Welcome to LUCRO777')
//             metaImage.setAttribute(
//                 'content',
//                 'https://upload.777gana.com/lobby/share/share-www.webp'
//             )
//             metaSecure.setAttribute(
//                 'content',
//                 'https://upload.777gana.com/lobby/share/share-www.webp'
//             )
//             break
//         case 'own_lobby_bra2':
//             metaUrl.setAttribute('content', 'https://www.lucro7772.com')
//             metaSitename.setAttribute('content', 'https://www.lucro777.com')
//             metaTitle.setAttribute('content', 'LUCRO777™')
//             metaDescription.setAttribute('content', 'Welcome to LUCRO777')
//             metaImage.setAttribute(
//                 'content',
//                 'https://upload.777gana.com/lobby/share/share-www.webp'
//             )
//             metaSecure.setAttribute(
//                 'content',
//                 'https://upload.777gana.com/lobby/share/share-www.webp'
//             )
//             break
//         default:
//     }
// }


// 获取app AFID
export let getAFid = () => {
    let AFid = ''
    // @ts-ignore
    if (window.android?.requestValue) {
        // @ts-ignore
        AFid = window.android.requestValue('AFID', '')
    }
    return AFid
}
