// @ts-nocheck

// import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
// import { getMessaging, getToken, onMessage } from 'firebase/messaging'

// 初始化Facebook Pixel
export const initPixel = () => {
    let pixelid = localStorage.getItem('pixelid')
    let id = pixelid ? pixelid : '142652212132489'
    fbq('init', id)
    fbq('track', 'PageView')
    // gtag('event', 'page_view')
}

// 初始化Branch（停用）
export const initBranch = () => {
    let cid = localStorage.getItem('cid')

    switch (cid) {
        case 'lucro30X':
            branch.init('key_live_lydiB9Qp34LWplKVNLtmxiknvqkeKDh9')
            break
        case 'lucro0X':
            branch.init('key_live_lydiB9Qp34LWplKVNLtmxiknvqkeKDh9')
            break
        case 'lucro1X':
            branch.init('key_live_lydiB9Qp34LWplKVNLtmxiknvqkeKDh9')
            break
        case 'lucro2':
            branch.init('key_live_crlhD3lWO9lp6LZwofYEXpgpyshgonFh')
            break
        default:
            branch.init('key_live_lydiB9Qp34LWplKVNLtmxiknvqkeKDh9')
    }
}

// 初始化Crisp（客服）
export const initCrisp = () => {
    window.$crisp = []
    window.CRISP_WEBSITE_ID = 'e24afa77-a3c2-4620-8054-0ca47722fc61'
    ;(function () {
        let d = document
        let s = d.createElement('script')
        s.src = 'https://client.crisp.chat/l.js'
        s.async = 1
        d.getElementsByTagName('head')[0].appendChild(s)
    })()

    $crisp.push(['safe', true])
    $crisp.push(['do', 'chat:hide'])
    $crisp.push(['on', 'chat:closed', crispClose])
}

export const crispClose = () => {
    // @ts-ignore
    $crisp.push(['do', 'chat:hide'])
}

// 初始化Firebase推送
// export const initFirebase = async () => {
//     try {
//         const firebaseConfig = {
//             apiKey: 'AIzaSyDWi6liGTS9SERHAyw_vnyuudPBkvxI4es',
//             authDomain: 'h5-30x.firebaseapp.com',
//             projectId: 'h5-30x',
//             storageBucket: 'h5-30x.appspot.com',
//             messagingSenderId: '204363007035',
//             appId: '1:204363007035:web:984bfc7d7d8eeb29ae481e',
//             measurementId: 'G-VF6Y3X69KG',
//         }

//         // // Initialize Firebase
//         const app = initializeApp(firebaseConfig)
//         const messaging = getMessaging(app)
//         if ('serviceWorker' in navigator) {
//         }
//         requestPermission()

//         const swRegistration = await navigator.serviceWorker.register(
//             '/firebase-messaging-sw.js'
//         )
//         const vapidKey =
//             'BDxH0MeUH50dLtG2WMAtQWIUf7IZWBUXL6xtWdObvjsNR4t6ZZs-jFJp11UI2pSaZNEzmkFZ7iOhlrn2E4cp9Yw'
//         getToken(messaging, {
//             vapidKey,
//             serviceWorkerRegistration: swRegistration,
//         }).then((currentToken) => {
//             // console.log(currentToken)
//             if (currentToken) {
//             }
//         })

//         onMessage(messaging, (payload) => {
//             console.log('Message received. ', payload)
//         })
//     } catch (e) {}
// }

const requestPermission = () => {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.')
        }
    })
}

// 初始化TikTok
export const initTikTok = () => {
    let ttid = localStorage.getItem('ttid')
    let id = ttid ? ttid : 'CLKQS5RC77UEE5O8879G'
    ttq.load(id)
    ttq.page()
}

// 初始化GA
export const initGA = () => {
    // GA 支付埋点参数
    const ga = window['gtag'] || null
    if (ga) {

    }
}

// 初始化Kwai（停用，改用api方式）
export const initKwai = () => {
    try {
        let cid = localStorage.getItem('cid')
        if (cid === 'kwai') {
            // kwaiq.load('514921719531569228')
            // kwaiq.page()
            kwaiq.instance('514921719531569228').track('completeRegistration')
        }
    } catch (err) {
        console.log(err)
    }
}

// Kwai埋点测试（投放前需要先有测试点位，通常需要20个 EVENT_CONTENT_VIEW ， 10个 EVENT_COMPLETE_REGISTRATION）
export const KwaiApiTest = () => {
    let cid = localStorage.getItem('cid')
    let pixelId = ''
    let access_token = ''
    var data = {
        clickid: '',
        event_name: 'EVENT_COMPLETE_REGISTRATION', //EVENT_CONTENT_VIEW
        pixelId,
        access_token,
        testFlag: false,
        trackFlag: true,
        is_attributed: 1,
        mmpcode: 'PL',
        pixelSdkVersion: '9.9.9',
        properties: '',
        third_party: 'lucro777.com',
    }

    fetch('https://www.adsnebula.com/log/common/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}
