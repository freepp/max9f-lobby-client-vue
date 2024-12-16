<template>
    <view class="tab-bar">
        <view
            v-for="(item, index) in data.list"
            :key="index"
            class="tab-bar-item"
            @click="switchTab(item, index)"
        >
            <image
                class="tab_img"
                lazy-load="true"
                :src="
                    tabbarSelected === index
                        ? item.selectedIconPath
                        : item.iconPath
                "
            ></image>
            <view
                class="tab_text"
                :style="{
                    color:
                        tabbarSelected === index
                            ? data.selectedColor
                            : data.color,
                }"
            >
                {{ item.text }}
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>

    const commonStore = useCommonStore()
    const store = useCommonStore()
    const { tabbarSelected } = storeToRefs(store)

    const data = reactive<any>({
        color: '#333333',
        selectedColor: '#333333',
        list: [
            {
                pagePath: '/pages/index/index',
                iconPath: '/src/static/logo.png',
                selectedIconPath: '/static/logo.en.png',
                text: 'HOME',
            },
            {
                pagePath: '/pages/promotions/index',
                iconPath: '/src/static/logo.png',
                selectedIconPath: '/static/logo.en.png',
                text: 'PROMOTIONS',
            },
            {
                pagePath: '/pages/deposit/index',
                iconPath: '/src/static/logo.png',
                selectedIconPath: '/static/logo.en.png',
                text: 'DEPOSIT',
            },
            {
                pagePath: '/pages/withdraw/index',
                iconPath: '/src/static/logo.png',
                selectedIconPath: '/static/logo.en.png',
                text: 'WITHDRAW',
            },
            {
                pagePath: '/pages/profile/index',
                iconPath: '/src/static/logo.png',
                selectedIconPath: '/static/logo.en.png',
                text: 'PROFILE',
            },
        ],
    })

    const switchTab = (item, index) => {
        let url = item.pagePath
        store.tabbarSelected = index
        if (item.pagePath === '/pages/deposit/index') {
          commonStore.depositTab = 0
        }

        uni.navigateTo({
            url,
            fail() {
                uni.switchTab({
                    url,
                })
            },
        })
    }

    onMounted(() => {
        uni.hideTabBar()
    })
</script>
<style lang="scss">
    .tab-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100rpx;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: env(safe-area-inset-bottom);
        border-top-width: 0.03125rem;
        border-top-style: solid;
        border-top-color: #eee;

        .tab-bar-item {
            flex: 1;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            .tab_img {
                width: 37rpx;
                height: 37rpx;
            }

            .tab_text {
                font-size: 20rpx;
                margin-top: 9rpx;
            }
        }
    }
</style>
