<template>
    <view class="menu-view">
        <nav class="nav">
            <view v-for="(item, index) in menuConfig" :key="index">
                <a
                    :class="'item ' + (item.className || '')"
                    @click="() => menuClick(item, index)"
                >
                    <view class="flex items-center justify-between w-full">
                        <view class="flex items-center">
                            <img
                                class="item__icon"
                                v-if="item.choosed"
                                :src="item.icon"
                                alt=""
                            />
                            <img
                                class="item__icon"
                                v-else="item.choosed"
                                :src="item.icon"
                                alt=""
                            />
                            <view class="item__name">{{ item.Name }}</view>
                        </view>

                        <view
                            class="flex items-center"
                            v-if="item.Name === $t('KEY_MENU_LANGUAGE')"
                        >
                            <view class="flex items-center float-right">
                                <view>{{ languageStore.local.title }}</view>
                                <view class="right-icon">
                                    <img
                                        src="@/static/icon/arrow_right_white.png"
                                        alt=""
                                    />
                                </view>
                            </view>
                        </view>
                        <view
                            class="flex items-center"
                            v-if="item.Name === $t('KEY_MENU_DOWNLOADAPP')"
                        >
                            <view class="flex items-center float-right">
                                <view>1,9MB</view>
                            </view>
                        </view>
                    </view>
                </a>
                <view v-if="item.item.length && item.opened">
                    <a
                        v-for="(items, index) in item.item"
                        :key="index"
                        class="item item--sub"
                        @click="() => itemClick(items, index)"
                    >
                        <view class="item__name">{{ items.Name }}</view>
                    </a>
                </view>
            </view>
        </nav>
        <LanguageSelect ref="RefPopup" />
    </view>
</template>
<script lang="ts" setup>
    // import PopupBottom from '@/lib/components/PopupBottom/index.vue'
    import LanguageSelect from '@/lib/components/LanguageSelect.vue'

    const commonStore = useCommonStore()
    const languageStore = i18nStore()
    const { t: $t } = i18n.global

    interface Props {
        menuConfig: any
    }

    const props = withDefaults(defineProps<Props>(), {
        menuConfig: [],
    })

    const data = reactive<any>({
        menu: 'menu-view',
    })

    const emit = defineEmits(['closeDrawer'])

    const RefPopup = ref()

    const menuClick = (item, i) => {
        if (item.item.length > 0) {
            props.menuConfig[i].opened = !props.menuConfig[i].opened
        } else {
            navTo(item)
        }
    }

    const itemClick = (item, i) => {
        navTo(item)
    }

    const navTo = async (item) => {
        if (item.Name === $t('KEY_PAGETITLE_SERVICE')) {
            sideHidden()
            // @ts-ignore
            $crisp.push(['do', 'chat:show'])
            // @ts-ignore
            $crisp.push(['do', 'chat:open'])
            return
        }
        if (item.Name === $t('KEY_MENU_LANGUAGE')) {
            openPop()
        } else if (item.Name === $t('KEY_MENU_TELEGRAM')) {
            // 默认lucro777
            let url = 'https://t.me/lucro777'
            if (location.host.includes('sorteslots.com')) {
                url = 'https://t.me/cassinosorte'
            } else if (location.host.includes('upupbet.com')) {
                url = 'https://t.me/cassinoupup'
            }
            // @ts-ignore
            if (window.android) {
                // @ts-ignore
                window.android.ShareChannel(url)
            } else {
                window.open(url)
            }
        } else if (item.Name === $t('KEY_MENU_FACEBOOK')) {
            // 默认lucro777
            let url = 'https://www.facebook.com/100092751038282'
            if (location.host.includes('sorteslots.com')) {
                url = 'https://www.facebook.com/profile.php?id=100091302727361'
            } else if (location.host.includes('upupbet.com')) {
                url = 'https://www.facebook.com/100076778317949'
            }
            // @ts-ignore
            if (window.android) {
                // @ts-ignore
                window.android.ShareChannel(url)
            } else {
                window.open(url)
            }
        } else if (item.Name === $t('KEY_MENU_SAVETODESK')) {
            // @ts-ignore
            console.log(window.deferredPrompt)
            // @ts-ignore
            const promptEvent = window.deferredPrompt
            if (!promptEvent) {
                // 延迟提示不存在。
                return
            }
            // 显示安装提示。
            promptEvent.prompt()
            // Log the result
            const result = await promptEvent.userChoice
            console.log(result)

            // @ts-ignore
            window.deferredPrompt = null
        } else {
            sideHidden()
            if (item.navType === 1) {
                if (item.path === '/pages/deposit/index') {
                  commonStore.depositTab = 0
                }
                uni.switchTab({ url: item.path })
            } else if (item.navType === 2) {
                let localPath = getCurrentPages()
                let localRoute = localPath[localPath.length - 1].route
                commonStore.categoryTabIndex = item.path
                if (localRoute !== 'pages/index/index') {
                    uni.switchTab({ url: '/pages/index/index' })
                }
            } else {
                uni.navigateTo({ url: item.path })
            }
        }
    }

    const openPop = () => {
        RefPopup.value.openPop(true)
    }

    const sideHidden = () => {
        emit('closeDrawer')
    }
</script>
<style lang="scss">
    .menu-view {
        @apply w-full;
        background: var(--bg);
        --text: #585e5e;
        // padding: 20rpx 0;
    }

    .nav {
        @apply relative overflow-y-auto text-xs;
        scrollbar-color: hsl(219, 18%, 82%) #f5f7fa;
        font-size: 26rpx;
    }
    .item {
        height: 90rpx;
        color: var(--text);
        padding: 0 44rpx;
        @apply flex cursor-pointer items-center justify-between
        overflow-hidden rounded-lg;
    }

    .item--sub {
        @apply my-1;
        text-indent: calc(20px + 12px);
    }

    .item__name {
        @apply overflow-hidden;
        width: 260rpx;
    }

    .item__icon {
        width: 48rpx;
        margin-right: 25rpx;
    }

    .item:hover {
        background: var(--dark);
    }
    .right-icon {
        width: 30rpx;
        height: 30rpx;
        img {
            @apply w-full;
        }
    }
</style>
