<template>
    <view class="footer-view">
        <view class="logo">
           <img
                v-if="store.baseConfig.imgBaseUrl"
                :src="getLogoUrl('license.png', store.baseConfig)"
                alt=""
            />
        </view>
        <view class="content">
            {{ $t('KEY_LICENSE_CONTENT') }}
        </view>
        <view class="contact-view" v-if="store.baseConfig.countryId === 'GHA'">
            <view
                class="contact-item"
                v-for="(item, index) in data.ganaData"
                :key="index"
            >
                <img :src="item.icon" alt="" />
            </view>
        </view>
        <view
            class="contact-view"
            v-else-if="store.baseConfig.countryId === 'BRA'"
        >
            <view
                class="contact-item"
                :class="{'PLAY': item.name === 'PLAY'}"
                v-for="(item, index) in data.braData"
                :key="index"
            >
                <img :src="item.icon" alt="" />
            </view>
        </view>
        <view
            class="contact-view"
            v-else-if="store.baseConfig.countryId === 'MEX'"
        >
            <view
                class="contact-item"
                v-for="(item, index) in data.mexData"
                :key="index"
            >
                <img :src="item.icon" alt="" />
            </view>
        </view>
		<!-- <view class="icon-view faq-view" @click="goFAQ">
		    <img src="@/static/logo/license/FAQ.png" alt="" />
		    <view class="text">{{ $t('KEY_PAGETITLE_FAQ') }}</view>
		</view> -->
        <view class="fun-view">
           <view class="flex items-center">
                <!-- <view class="icon-view" @click="openChat">
                    <img src="@/static/logo/license/service.png" alt="" />
                    <view class="text">{{ $t('KEY_PAGETITLE_SERVICE') }}</view>
                </view> -->
            </view>
            <view class="language-select" @click="openPop">
                {{ languageStore.local.title }}
                <img src="@/static/icon/down.png" alt="" />
            </view>
            <LanguageSelect ref="RefPopup" />
        </view>
    </view>
</template>
<script lang="ts" setup>
    import LanguageSelect from '@/lib/components/LanguageSelect.vue'
    import MTNImg from '@/static/logo/license/mtn.png'
    import AIRTImg from '@/static/logo/license/airt.png'
    import VODAFANImg from '@/static/logo/license/vodafan.png'
    import EIGHTEENImg from '@/static/logo/license/18+.png'
    import PGSOFTImg from '@/static/logo/license/PGSoft.png'
    import VISAImg from '@/static/logo/license/visa.png'
    import SPEIImg from '@/static/logo/license/spei.png'
    import PIXImg from '@/static/logo/license/pix.png'
    import TadaImg from '@/static/logo/license/tada.png'
    import PlayImg from '@/static/logo/license/play.png'
    import { getLogoUrl } from '@/common/common'

    const store = useUsersStore()
    const languageStore = i18nStore()
    const data = reactive<any>({
        ganaData: [
            {
                name: 'MTN',
                icon: MTNImg,
            },
            {
                name: 'airteltigo',
                icon: AIRTImg,
            },
            {
                name: 'vodafone',
                icon: VODAFANImg,
            },
            {
                name: '18+',
                icon: EIGHTEENImg,
            },
        ],
        braData: [
            {
                name: 'PGSOFT',
                icon: PGSOFTImg,
            },
            {
                name: 'TADA',
                icon: TadaImg,
            },
            {
                name: 'PIX',
                icon: PIXImg,
            },
            {
                name: '18+',
                icon: EIGHTEENImg,
            },
            {
                name: 'PLAY',
                icon: PlayImg,
            },
        ],
        mexData: [
            {
                name: 'VISA',
                icon: VISAImg,
            },
            {
                name: 'SPEI',
                icon: SPEIImg,
            },
            {
                name: '18+',
                icon: EIGHTEENImg,
            },
        ],
    })

    const RefPopup = ref()

    const openPop = () => {
        RefPopup.value.openPop(true)
    }

    const openChat = () => {

        // @ts-ignore
        $crisp.push(['do', 'chat:show'])
        // @ts-ignore
        $crisp.push(['do', 'chat:open'])
    }

    const goFAQ = () => {

        uni.navigateTo({ url: '/pages/FAQ/index' })
    }
</script>
<style lang="scss">
    .footer-view {
        @apply flex justify-center items-center flex-col;
        min-height: 100px;
        background: var(--UI-BG);
        padding: 0 30rpx;
    }
    .logo {
        @apply flex justify-center items-center;
        font-size: 40rpx;
        width: 242rpx;
        margin: 62rpx auto 38rpx;
        img {
            @apply w-full;
        }
    }
    .content {
        font-size: 17rpx;
        font-weight: 300;
        color: #ffffff;
        line-height: 28rpx;
        opacity: 0.4;
    }

    .contact-view {
        @apply flex items-center flex-wrap;
        width: 100%;

        .contact-item {
            margin-top: 30rpx;
            margin-right: 40rpx;
            img {
                height: 46rpx;
            }
            &.PLAY {
              margin-top: 10rpx;
              margin-left: 10rpx;
              img {
                height: 75rpx;
              }
            }
        }
    }
    .fun-view {
        @apply flex items-center w-full justify-between box-border;
        height: 140rpx;
        // padding: 0 20rpx;
        .icon-view {
            @apply flex items-center;
            img {
                width: 50rpx;
            }
            .text {
                @apply underline;
                color: rgb(99, 144, 220);
                margin-left: 10rpx;
            }
        }
        .faq-view {
            margin-left: 50rpx;
        }
    }
    .language-select {
        @apply flex justify-center items-center;
        width: auto;
        height: 45rpx;
        padding: 0 30rpx;
        border: 2rpx solid #8c8c8c;
        border-radius: 8rpx;
        img {
            width: 18rpx;
            margin-left: 16rpx;
        }
    }
</style>
