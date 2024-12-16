<script lang="ts" setup>
    // @ts-nocheck
    import { getImgPrefix } from "@/common/init"
    import { initUser, initApi } from '@/common/login'
    import '@/style/index.scss'
    // import { app, config } from '@xxyy/app'
    import { app, config } from '@/xxyy/'
    import { useI18n } from 'vue-i18n'
    import { api as lobbyApi } from '@/NET/lobby'
    import { queryURLParams } from '@/common/common'
    // import { initializeApp } from 'firebase/app'
    import { getMessaging, getToken, onMessage } from 'firebase/messaging'

    const { t: $t } = i18n.global
    const commonStore = useCommonStore()
    const { locale } = useI18n()
    const store = useUsersStore()
    const languageStore = i18nStore()
    const route = useRoute()

	const deviceInfo = uni.getDeviceInfo()
	commonStore.deviceInfo = deviceInfo


    onPageNotFound(() => {
        console.log('onPageNotFound');
        const hash = location.hash
        const search = location.search
        let param = ''
        // google 登录
        if (
            hash.includes('state') &&
            hash.includes('code') &&
            hash.includes('access_token')
        ) {
            param = hash.replace('#/', '')
        }
        if (param) {
            console.log('onPageNotFound param: ', param);
            uni.reLaunch({
                url: `/pages/auth/index?${param}&${search.replace('?', '')}`,
            })
            return
        }
        if (window?.location?.reload) {
          console.log('onPageNotFound window.location.reload');
          window.location.reload()
        } else {
          console.log('onPageNotFound uni.reLaunch');
          uni.reLaunch({
            url: '/pages/index/index'
          })
        }
        // uni.switchTab({
        //     url: '/pages/index/index',
        // })
    })

    // onLoad((options) => {
    //     // data.activityId = options.click_id
    // })

    //20240502打点，暂时注释
    const initPixel = () => {
        let pixelid = localStorage.getItem('pixelid')
        let id = pixelid ? pixelid : '2458180864371715'
        fbq('init', id)
        fbq('track', 'PageView')

    }

    //20240502打点，暂时注释
    // const initBranch = () => {
    //     let cid = localStorage.getItem('cid')

    //     switch (cid) {
    //         case 'lucro30X':
    //             branch.init('key_live_lydiB9Qp34LWplKVNLtmxiknvqkeKDh9')
    //             break
    //         case 'lucro0X':
    //             branch.init('key_live_lydiB9Qp34LWplKVNLtmxiknvqkeKDh9')
    //             break
    //         case 'lucro1X':
    //             branch.init('key_live_lydiB9Qp34LWplKVNLtmxiknvqkeKDh9')
    //             break
    //         case 'lucro2':
    //             branch.init('key_live_crlhD3lWO9lp6LZwofYEXpgpyshgonFh')
    //             break
    //         default:
    //             branch.init('key_live_lydiB9Qp34LWplKVNLtmxiknvqkeKDh9')
    //     }
    // }

    // const initCrisp = () => {
    //     window.$crisp = []
    //     window.CRISP_WEBSITE_ID = 'e24afa77-a3c2-4620-8054-0ca47722fc61'
    //     ;(function () {
    //         let d = document
    //         let s = d.createElement('script')
    //         s.src = 'https://client.crisp.chat/l.js'
    //         s.async = 1
    //         d.getElementsByTagName('head')[0].appendChild(s)
    //     })()

    //     // @ts-ignore
    //     $crisp.push(['safe', true])
    //     // @ts-ignore
    //     $crisp.push(['do', 'chat:hide'])
    //     // @ts-ignore
    //     $crisp.push(['on', 'chat:closed', crispClose])
    // }

    // const crispClose = () => {
    //     // @ts-ignore
    //     $crisp.push(['do', 'chat:hide'])
    // }

    const initFirebase = async () => {
        try {
            const firebaseConfig = {
                apiKey: 'AIzaSyDWi6liGTS9SERHAyw_vnyuudPBkvxI4es',
                authDomain: 'h5-30x.firebaseapp.com',
                projectId: 'h5-30x',
                storageBucket: 'h5-30x.appspot.com',
                messagingSenderId: '204363007035',
                appId: '1:204363007035:web:984bfc7d7d8eeb29ae481e',
                measurementId: 'G-VF6Y3X69KG',
            }

            // // Initialize Firebase
            const app = initializeApp(firebaseConfig)
            const messaging = getMessaging(app)
            if ('serviceWorker' in navigator) {
            }
            requestPermission()

            const swRegistration = await navigator.serviceWorker.register(
                '/firebase-messaging-sw.js'
            )
            const vapidKey =
                'BDxH0MeUH50dLtG2WMAtQWIUf7IZWBUXL6xtWdObvjsNR4t6ZZs-jFJp11UI2pSaZNEzmkFZ7iOhlrn2E4cp9Yw'
            getToken(messaging, {
                vapidKey,
                serviceWorkerRegistration: swRegistration,
            }).then((currentToken) => {
                // console.log(currentToken)
                if (currentToken) {
                }
            })

            onMessage(messaging, (payload) => {
                console.log('Message received. ', payload)
            })
        } catch (e) {}
    }

    const requestPermission = () => {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.')
            }
        })
    }

    const syncData = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                syncTypes: [1],
                pageType: 0,
            },
            store.commonParams
        )

        const currentPages = getCurrentPages()
        if (currentPages?.[0]?.route === 'pages/index/index' && route.path === '/') {
          params.pageType = 1
        }
        if (currentPages?.at(-1)?.route === 'pages/game/index' && route.path === '/pages/game/index') {
          params.pageType = 2
        }

        let res = await lobbyApi.home.sync(params)
        if (res.success) {
            Object.assign(store.userInfo, res.result.balance)
            Object.assign(commonStore.couponpackInfo, res.result.couponpackInfo)
        } else {
            ErrorHandler(res, 'sync')
        }
    }

    onMounted(async () => {
        // @ts-ignore
        if (window.android) {
          uni.setStorageSync('isAppFirstToEmpty', '1')
        }
        // @ts-ignore
        window?.stopGlobalLoading()
        const globalLoading = document.querySelector('#globalLoading')
        const hash = location.hash
        const hashNoParam = hash.split('?')?.[0]
        const isIndex =
            hashNoParam === '#/' || hashNoParam === '#/pages/index/index'
        // 首页的loading 在前弹接口之后消失
        if (globalLoading && !isIndex) {
            // globalLoading.parentNode.removeChild(globalLoading)
            // @ts-ignore
            window.setGlobalLoading(75)
            // @ts-ignore
            window.setGlobalLoading(100)
            setTimeout(() => {
                globalLoading.parentNode.removeChild(globalLoading)
            }, 100)
        }
        // PWA 防止迷你信息栏出现在移动设备上。
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault()
            // @ts-ignore
            window.deferredPrompt = event
        })

        if (!config.languages) {

            try {
                await app.init()
                await app.start()
            } catch (e) {
                // initOperator 接口超时
                if (e && e.message === 'Fetch timeout') {
                    modal({
                        width: '560rpx',
                        type: 'warning',
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
                    // uni.reLaunch({
                    //     url: `/pages/maintain/index?date=${getDate()}`,
                    // })
                        console.log('erroe')
                }
                return
            }
        }
        if (!store.isInitOperatorApp) return
        store.baseConfig = config
        localStorage.setItem('baseConfig', JSON.stringify(config))
		// uni.setStorageSync('baseConfig', JSON.stringify(config))


        store.commonParams = {
            appId: config.appId,
            operatorId: config.operatorId,
            langId: config.languages[0].id,
            countryId: config.countryId,
            currencyId: config.currencyId,
        }

        // const local = localStorage.getItem('local')
		const local = uni.getStorageSync('local')
        const localData = local ? JSON.parse(local) : {}
        languageStore.languageList = config.languages

        if (local) {
            languageStore.local = localData
            locale.value = localData.id
            uni.setLocale(localData.id)
            store.commonParams.langId = localData.id
        } else {
            languageStore.local = config.languages[0]
            locale.value = languageStore.local.id
            uni.setLocale(languageStore.local.id)
            // localStorage.setItem('local', JSON.stringify(config.languages[0]))
            // localStorage.setItem('xxyy_langId', languageStore.local.id)
			uni.setStorageSync('local', JSON.stringify(config.languages[0]))
			uni.setStorageSync('xxyy_langId', languageStore.local.id)
            store.commonParams.langId = languageStore.local.id
        }

        let params = queryURLParams()

        if (params.ck) {
            const ga = window['gtag'] || null
            try {

            } catch (e) {}
        }
        if (params.cid) {
          // localStorage.setItem('cid', params.cid)
          uni.setStorageSync('cid', params.cid)
        }
        if (params.isApp) {
            // localStorage.setItem('cid', params.cid)
            uni.setStorageSync('isApp', params.isApp)
        }
        if (params.uid) {
            // localStorage.setItem('uid', params.uid)
			uni.setStorageSync('uid', params.uid)
        }
        if (params.mid) {
            // localStorage.setItem('mid', params.mid)
			uni.setStorageSync('mid', params.mid)
        }
        if (params.pixel_id) {
            // localStorage.setItem('pixelid', params.pixelid)
			uni.setStorageSync('pixelid', params.pixel_id)
        }
        if (params.click_id) {
            // localStorage.setItem('click_id', params.click_id)
			uni.setStorageSync('click_id', params.click_id)
        }
        if(params.bbg){
            uni.setStorageSync('bbg', params.bbg)
        }

        //store.baseConfig.cid = localStorage.getItem('cid', params.cid)
		 store.baseConfig.cid = uni.getStorageSync('cid', params.cid)
        /* const token = localStorage.getItem(
            `token_${store.baseConfig.operatorId}`
        ) */
		const token = uni.getStorageSync(
		    `token_${store.baseConfig.operatorId}`
		)
        /** 应用状态0-正常1-维护 */
        if (config.appStatus === 1 && !params.debug) {
            // uni.reLaunch({
            //     url: `/pages/maintain/index?date=${config.appMaintText}`,
            // })
            console.log('erroe', appStatus)
            return
        }
        initApi(config.xxyyUrl, config.appUrl, config.commonUrl, config.activityUrl, token)

        let userInfo: any = await initUser(store.baseConfig, store.commonParams)

        ////20240502打点，暂时注释
        initPixel()
        ////20240502打点，暂时注释
        //initBranch()
        // KwaiApiTest()

        if (userInfo) {
            store.userInfo = userInfo
            if (userInfo?.userMode === 1) {
                store.isLogin = false
            } else {
                store.isLogin = true
            }
        } else {
            store.isLogin = false
        }


        // getBannersByType()
        //20240502暂时注释start
        // initCrisp()
        //20240502暂时注释end

        //20240724暂时注释start
        //initFirebase()
        //20240724暂时注释end

        // initKwai()
        syncData()
        setInterval(() => {
            syncData()
        }, 10000)
    })
    onBeforeMount(() => {
        const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.rel = 'icon';
        link.href = getImgPrefix() + "/favorite.ico";
        document.getElementsByTagName('head')[0].appendChild(link);
        const twitter_meta: HTMLMetaElement = document.createElement("meta")
        twitter_meta.name = "twitter:image"
        twitter_meta.content = getImgPrefix() + "/burger_top.png";
        document.getElementsByTagName('head')[0].appendChild(twitter_meta);
        const manifest: HTMLLinkElement = document.createElement("link");
        manifest.rel = "manifest"
        manifest.href = getImgPrefix() + "/webmanifest";
        document.getElementsByTagName('head')[0].appendChild(manifest);
    })

</script>

<style></style>
