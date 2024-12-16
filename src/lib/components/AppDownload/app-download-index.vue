<template>
	<view v-if="appDownLoadShow && !isShare && GET_CHANNEL_DATA().isDownload" class="download-view"  style="--ba81b694: 0px;" >
		<view class="download-view abs" @click="appDownLoad">
			<view class="icon">
				<img src="@/static/download/bottom_download.png" />
			</view>
			<view>
				<view class="text">
					Download the APP
				</view>
				<view class="text text-blod">
					Get R${{downloadApkBonus}}!
				</view>
			</view>
			<view class="btn">
				<view>
					Download
				</view>
				<view>
					+R${{downloadApkBonus}}
				</view>
				<img src="@/static/download/bottom_download.gif" />
			</view>
		</view>
		<view class="close-icon" @click="close"></view>
	</view>

  <view v-if="appDownLoadShow || isShare" class="share_banner" :style="{'display':isPwaGuidShow?'none':'block','pointer-events':isPwaGuidShow?'none':'visible'}" style="--ba81b694: 0px;">
    <img src="@/static/download/share_banner.png" @click="toShare" />
    <view v-if="!isPwaGuidShow" class="close-icon" @click="close"></view>
  </view>

	 <!-- <Tip v-if="isPwaGuidShow" @close-app-download="closeAppDownload"></Tip> -->
</template>

<script setup lang="ts">
	// import Tip from '@/pages/index/pwa/Tip.vue'
	import { queryURLParams } from '@/common/common'
  import { getApkUrl, getPlatform, GET_CHANNEL_DATA } from "@/common/init"

  interface Props {
    isShare?: boolean
  }

  withDefaults(defineProps<Props>(), {
    isShare: false,
  })

	const emit = defineEmits(['isShowAssistanter'])

	const domain = getPlatform()

	let downloadApkBonusFun = () => {
		let bonusRet = 2
		switch (domain) {
			case "win77s":
				bonusRet = 2
				break
			default:
				bonusRet = 2
		}
		return bonusRet
	}
	var downloadApkBonus = downloadApkBonusFun();

	let params = queryURLParams()

	let isApp = params.isApp;
	if(isApp == undefined){
	isApp = uni.getStorageSync('isApp');
	}

  const v = isApp; // uni.getStorageSync("isApp")

	 const appDownLoadShow = ref(!(v == 'true'))
	 const isPwaGuidShow = ref(false)

	const appDownLoad = ()=>{
// 		let apkName = '';
//         appDownLoadShow.value = false;
//         switch(store.baseConfig.operatorId)
//         {
//             case 'own_lobby_bra1':
//                 apkName = 'bet66s.apk';
//                 break;
//             default:
//                 apkName = 'bet77s.apk';
//         }
//         window.open('https://static.bet77s.com/download/apk/' + apkName);
        appDownLoadShow.value = false
        window.open(getApkUrl())
		// uni.downloadFile({
		// 	url: 'https://static.bet77s.com/download/apk/bet77s.apk', //仅为示例，并非真实的资源
		// 	success: (res) => {
		// 		appDownLoadShow.value = false
		// 		// if (res.statusCode === 200) {
		// 		// 	console.log('下载成功');
		// 		// }
		// 	}
		// });
	}

	const close = ()=>{

       isPwaGuidShow.value = true

	}
	const closeAppDownload = (close:boolean)=>{


		isPwaGuidShow.value = close
		appDownLoadShow.value = false
		emit('isShowAssistanter')
	}

  function toShare() {
    appDownLoadShow.value = false
    uni.navigateTo({
      url: `/pages/activity_detail/index?activity_id=102001`,
    })
  }

  onActivated(()=>{
	if(isPwaGuidShow.value){
		isPwaGuidShow.value = false;
	}
  })

</script>

<style lang="scss">
.share_banner {
  position: fixed;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  z-index: 1600;
  bottom: 140rpx;
  left: 17rpx;
  @media (width > 960px) {
    position: absolute;
  }
  img {
    width: 713rpx;
    height: 183rpx;
  }
}
	.download-view {
		position: fixed;
		box-sizing: border-box;
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		width: 22.1875rem;
		height: 3.5625rem;
		z-index: 1600;
		background: linear-gradient(90deg, #4b2fb4, #53bad8);
		bottom: calc(var(--ba81b694) + 3.4375rem + .4375rem);
		left: .625rem;
		border-radius: 3.5625rem;
		padding: 0 .625rem;
    @media (width > 960px) {
      position: absolute;
    }
    &.abs {
      @media (width > 960px) {
        bottom: 0;
      }
    }
	}

	.icon {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
	}

	.icon img {
		width: 100%;
	}

	.download-view .text {
		font-size: .875rem;
		padding: 0 1rem;
		font-weight: 400;
	}

	.download-view .text-blod {
		font-size: 1.0625rem;
		font-weight: 700;
		color: #ffc75a;

	}
	.download-view .btn{
		position: relative;
		    display: flex;
		    flex-direction: column;
		    align-items: center;
		    justify-content: center;
		    width: 7.46875rem;
		    height: 2.40625rem;
		    background: linear-gradient(0deg, #d30000, #f82e49, #ff425b);
		    border: 3px solid #ffffff;
		    box-shadow: 0 .1875rem rgba(0, 0, 0, .53);
		    border-radius: 1.21875rem;
		    color: #fff;
		    font-size: .875rem;
	}
	.download-view .btn img{
		    display: block;
		    width: 4.3125rem;
		    height: 4.3125rem;
		    position: absolute;
		    right: -1.53125rem;
		    top: -.625rem
	}
	.close-icon{
		    position: absolute;
		    top: -.53125rem;
		    left: 0;
		    width: 1.09375rem;
		    height: 1.09375rem;
			background-size: 100% 100%;
			background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAyCAMAAADGIxO9AAAAq1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Nr6iZAAAAOHRSTlMABfr28RYS7eoJHQ3nzfPhwZiUyKO1j21LNCsa3GI+KOOeXDnWLiWtiEdCvKeEcmgh0ntRf8/DVYTfCtYAAAOcSURBVEjHhZZpo6IgFIYBBb1mqZmWmmXaZvty687//2XDAYyc6s75UgjPec+GhV4M02k9jAfRNtrFh1FKMfqfdaZl4I9t0yCEGKbthbM8Zb8T1T60jT/PZti3ePOZwul+3nscJhobx8nXe4TlvinPWMX8Hq0i/+wpUaM7pO+QZeyKfes2O25Sh1LqpJM8CG0haAeLV2SxMgWxHaYM63DZMo9sIRVV/1YwiQzYCIenfyPHTu5DlsSftKE0IiKAt7niVIRN7tXzU2cAKsUlQ++NDccARdOnR3vIZXxknxtXziH0gD60fzz+wDt20Gf7KkHJPTYpnbZQsAuo/AINoXxhqlYHi8c6yNSKMtxKhaqy0IDn3FvLYKYhdzCvmmyjwUZDOAmiA1Ud7MK5RIpyGfNb8uzi/iHhCDfIxDeIHWfocbC3h4MZtOaWyjNlATXtAiSQu2jb4Uvm7UNGJ/5t4+kwWV9OM0BCRSzJjunE3R+MOheT13mii9NADaIDRwveJKPPkLPiG9tmALI+9yDD6zRIb7BUu1ScXaKkK0NT5gAklC4KMWaA6ODGNfopeJKlrq4TKMhUCKg0VsPhIQJUpPOipJDp8yXjA2Tt0drkcgvUgiwFqFy0LW9cv4/A63mKWlAMSjoXbaeQu5mhoPfCoKunGDvHbW+SAZ/ztHUtJ1uiGDVGWgeKHKA9lC9pIb5CmjHSNj3zfGJ05J0vaqRNINpaUAJ1+0Y1fAz1q6NqWjnuKajG+kK7fOByNPWhPKx5Wm2bVtZ6jBqos4aCVYjODO5r2TQtIo9WOg9o00zjlq9WDvo6woBfsXT0beruPyAjUGFsPDXkMOBkwCSz74lDO45oiMzUbsxD8kCUDYj8BlaFhCOrtDV7cxVFAt6jDNK+uiBEZQ3qu2XvAGkg1zqXsqoMZKyj4DO4SW6JJZQc8hPSRsvDRiJ4BBPlwyYIFfBuSJqL1R4x3LQu3RI9gPC2g7xP6DfL4BBZZWoJ9xvuhfMLQvcWVGOj9UsPoGD5EXHWgLhPM8ZfWDZcylWF3xJ4MYOaW2vWkhZ+SJhnbyha+oaIQwWvIfE2dHdX2qYwrWcFAZXXfOnFA4gUu3xBO6pZHTYtB54hvK2zdz9/d0NQ9nm3z0eTpKrz70HXJvJPxZG9zzT2iJz+nuV6Y8+1TbUuguoLvTc22hWg1TajWP1Q9NEwHcVdV3pXivYtuOpiftBKjv3QNQ0w0w1nw4r+S/wFbpWoDgyMU5gAAAAASUVORK5CYII=');
			z-index: 5000;
	}
	.pwa-tip-view{
		position: fixed;
		    left: 0px;
		    width: 23.4375rem;
		    height: 9.625rem;
		    background: #ffffff;
		    z-index: 2015;
		    bottom: calc(var(--357e9946) + 3.4375rem + .4375rem);
	}
	.pwa-tip-view .pwa-info{
		padding-top: 1rem;
	}
	.flex {
	    display: flex;
	}
	.pwa-tip-view .pwa-info .info{
		    box-sizing: border-box;
		    flex: 1;
		    margin-left: .875rem;
		    padding-right: 1.1875rem;
	}
	.pwa-tip-view .pwa-info .logo{
		    display: flex;
		    align-items: center;
		    width: 3.34375rem;
		    height: 3.34375rem;
		    margin-left: .9375rem;
	}
	.pwa-tip-view .pwa-info .info .title{
		font-size: .875rem;
		    font-family: Microsoft YaHei;
		    font-weight: 700;
		    color: #000;
	}
	.pwa-tip-view .pwa-info .info .desc{
		    font-size: .6875rem;
		    font-family: Microsoft YaHei;
		    font-weight: 400;
		    color: #000;
		    line-height: 1.03125rem;
	}
	.pwa-btns{
		box-sizing: border-box;
		    display: flex;
		    justify-content: flex-end;
		    padding-right: 1.1875rem;
		    margin-top: .3125rem;
	}
	.normal-btn {
	    display: flex;
	    width: 100%;
	    align-items: center;
	    justify-content: center;
	    height: 2.8125rem;
	    border-radius: .4375rem;
	    font-size: 1.0625rem;
	    color: #fff;
	    font-weight: 700;
	}
	.pwa-tip-view .pwa-btns .normal-btn{
		    width: 5.65625rem;
		    height: 2.65625rem;
		    font-size: .875rem;
		    font-weight: 400;
	}
	.pwa-tip-view .pwa-btns .bg-white{
		    color: var(--primary-color);
	}
</style>
