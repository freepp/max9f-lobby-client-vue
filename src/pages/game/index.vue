<template>
    <view>
        <view id="mask_modal"></view>
        <view class="iframe-view">
            <!--<iframe
                name="gameFrame"
                class="w-full h-full"
                frameborder="0"
                :src="data.url"
                sandbox="allow-scripts allow-top-navigation allow-same-origin"
            ></iframe>-->
            <!-- <web-view
                :webview-styles="data.webviewStyles"
                :src="data.url"
                sandbox="allow-scripts allow-top-navigation allow-same-origin"
            ></web-view> -->
         <!--  <iframe id="frame_bf" width="100%" height="100%" frameborder="0" srcdoc="1111"></iframe> -->
		     <iframe id="frame_bf" width="100%" height="100%" frameborder="0" :srcdoc="data.url"></iframe>


        </view>
       <view class="game-nav">
            <GameNav
                ref="RefGameNav"
                :app-id="data.appId"
                @rightClick="reloadGame"
                @popupClose="popupClose"
            />
        </view>
        <Assistanter
            ref="assistanterRef"
            @on-close="onAssistanterClose"
            :content="template"
        ></Assistanter>
        <PopupBottom
            ref="RefPopup"
            :height="800"
            :noBorder="true"
            :bottom="43"
            :hasShadow="false"
            :showClose="false"
            background="rgba(81, 0, 0, .9)"
            @maskClick="ifCenter = false"
        >
          <view class="bankruptcy_Benefits_box">
            <view class="title">{{ $t('KEY_BANKRUPTCYBENEFITS_TITLE2').toLocaleUpperCase() }}</view>
            <image class="close" src="/static/activity/bankruptcyBenefits/close.png" @click="RefPopup.changeIsShow(false)"></image>
            <view class="center">
              <Center :isGame="true" v-if="ifCenter"></Center>
            </view>
          </view>
        </PopupBottom>
    </view>
</template>

<script lang="ts" setup>
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as activityApi } from '@/NET/activity'
    import _ from 'lodash'
    import GameNav from '@/lib/layout/GameNav/index.vue'
    import Assistanter from '@/lib/components/Assistanter/index.vue'
    import PopupBottom from '@/lib/components/PopupBottom/index.vue'
    import Center from "@/lib/components/BankruptcyBenefits/center.vue";

    const commonStore = useCommonStore()
    const { t: $t } = i18n.global
    const store = useUsersStore()

    const RefPopup = ref()

    interface Data {
        webviewStyles?: any
       url: string
        gameName: string
        appId: string

    }

    const data = reactive<Data>({
        webviewStyles: {
            progress: {
                color: '#FF3333',
            },
        },
        url: '',
        gameName: '',
        appId: '',

    })

    const RefGameNav = ref()

    const ifCenter = ref(false)

    const openIM = () => {
        // @ts-ignore
        $crisp.push(['do', 'chat:show'])
        // @ts-ignore
        $crisp.push(['do', 'chat:open'])
    }
    const onAssistanterClose = () => {

        // const iframe = document.getElementsByTagName('iframe')[0]
        // if (iframe) {
        //     iframe.style.pointerEvents = 'auto'
        // }
    }
    onLoad((options) => {
          //  data.url = options.url ? options.url : ''
           data.gameName = options.game_name
               ? options.game_name
               : $t('KEY_PAGETITLE_GAME')
           data.appId = options.app_id ? options.app_id : ''
           uni.setNavigationBarTitle({
               title: data.gameName,
           })
       })


    const messageEvent = (e) => {
        console.log('Received message from child:', e.data)
        if (!e.data.action) return
        switch (e.data.action) {
            case 'openIM':
                openIM()
                break
            case 'goHome':
                uni.switchTab({ url: '/pages/index/index' })
                break
            case 'goDeposit':
                commonStore.depositTab = 0
                uni.switchTab({ url: '/pages/deposit/index' })
                break
            case 'openDeposit':
                nextTick(() => {
                    RefGameNav.value.openDeposit()
                })
                break
            case 'back':
                nextTick(() => {
                    RefGameNav.value.clickLeft()
                })
                break
            default:
        }
    }
    const assistanterRef = ref(null)
      onMounted(() => {
          // 保持屏幕常亮
          uni.setKeepScreenOn({
              keepScreenOn: true
          });
          const iframe = document.getElementById("frame_bf");
          const gameResult = uni.getStorageSync('gameResult')
          if (iframe && gameResult) {
            if (gameResult?.mode === 1 && gameResult?.content) {
              iframe.removeAttribute('src');
              iframe.setAttribute("srcdoc", gameResult.content);
            } else {
              iframe.removeAttribute('srcdoc');
              iframe.setAttribute("src", gameResult?.url || '');
            }
          }
            initData()

            // data.url = sessionStorage.getItem("gameHTML")

           /* var iframe = document.getElementById("frame_bf");
            iframe.setAttribute("srcdoc",data.url); */
            window.onmessage = (e) => messageEvent(e)

        })


    onUnmounted(() => {
        // remove onmessage listener
        window.onmessage = null
    })

    const template = ref('')
    const getTaskTips = async () => {
        let params = Object.assign(
            {
            	DeviceId: commonStore.deviceInfo?.deviceId,
            },
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        // let res = await lobbyApi.task.getTaskTips(params)
        let res = await activityApi.task.taskGetTaskTipsCreate(params)
        if (res.success) {
            commonStore.assistanterList = res.result
            // drawableAmount.value = 1
        } else {
            ErrorHandler(res, 'getTaskTips')
        }
        let item = null
        if (store.userInfo.cash > 0) {
            item = commonStore.assistanterList.find((item) => item.tipsId === 3)
        } else {
            item = commonStore.assistanterList.find((item) => item.tipsId === 4)
        }
        if (item) {
            template.value = item.template
            assistanterRef.value.show()

        }
    }
    const initData = () => {
        if (store.userInfo?.userMode === 2) {
            getTaskTips()
        }
    }
    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )
    watch(
      () => commonStore.couponpackInfo,
      (val) => {
        if (val?.isOpen) {
          ifCenter.value = true
          RefPopup?.value?.changeIsShow(true)
        }
      }, {
        immediate: true,
        deep: true
      }
    )
    const reloadGame = async () => {
        let localUrl = window.location.href
        let origin = localUrl.slice(0, localUrl.indexOf('#'))
        if (origin.indexOf('?') > 0) {
            origin = origin.slice(0, origin.indexOf('?'))
        }
        if (origin[origin.length - 1] === '/') {
            origin = origin.slice(0, origin.length - 1)
        }
        let url = origin
        let depositUrl = `${url}#/pages/deposit/index`
        let params = Object.assign(_.cloneDeep(store.commonParams), {
            userId: store.userInfo.userId,
            appId: data.appId,
            lobbyUrl: url,
            depositUrl,
        })
        uni.removeStorageSync('gameResult')
        let res = await lobbyApi.initLobby.getAppUrl(params)
        if (res.success) {
          uni.setStorageSync('gameResult', res.result)
          const iframe = document.getElementById("frame_bf");
          if (res?.result?.mode === 1 && res?.result?.content) {
            iframe.removeAttribute('src');
            iframe.setAttribute("srcdoc", res.result.content);
          } else {
            iframe.removeAttribute('srcdoc');
            iframe.setAttribute("src", res?.result?.url || '');
          }
          // console.log('res.result.content' , res.result.content)

            // var newPage = window.open('', '_blank');
            // newPage.document.open();
            // newPage.document.write(res.result.content);//Execute HTML Code
            // newPage.document.close();
            // uni.reLaunch({
            //     url: `/pages/game/index?name=aaa&app_id=${
            //         data.appId
            //     }&url=${encodeURIComponent(res.result.url)}&game_name=${
            //         data.gameName
            //     }`,
            // })
        } else {
            ErrorHandler(res, 'getAppUrl')
        }
    }
    const popupClose = () => {
        let iframe = document.getElementsByTagName('iframe')[0]
        iframe.contentWindow.postMessage({ action: 'depositClose' }, '*')
    }
</script>

<style lang="scss">
    .iframe-view {
        @apply absolute left-0 right-0 top-0;
        bottom: 86rpx;
    }
    .game-nav {
        @apply absolute left-0 bottom-0 w-full;
    }
    .popup-title {
        @apply flex items-center justify-center text-white-100;
        font-size: 33rpx;
        font-weight: bold;
        height: 98rpx;
        border-bottom: 2rpx solid #454545;
    }
    .global-bg {
        background: var(--UI-BG);
    }
    .bankruptcy_Benefits_box {
      position: relative;
      text-align: center;
      padding-top: 50rpx;
      .title {
        position: absolute;
        width: 100%;
        // font-family: Swis721 Hv BT;
        font-weight: 800;
        font-size: 42rpx;
        color: #FFE44C;
      }
      .close {
        width: 42rpx;
        height: 42rpx;
        position: absolute;
        right: 0rpx;
        top: 0rpx;
        padding: 14rpx 10rpx;
        z-index: 2;
      }
      .center {
        position: relative;
        top: 40rpx;
        overflow: hidden;
        padding-top: 28rpx;
      }
    }
</style>
