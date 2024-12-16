<template>
    <PopupBottom
        ref="RefPopup"
        :height="506"
        :background="'#fff'"
        @maskClick="maskClick"
    >
        <view class="personal-title">
            {{ $t('KEY_COMMON_SELECTLANGUAGE') }}
        </view>
        <view class="language-view">
            <view
                class="primary-btn border-btn"
                v-for="(item, index) in languageStore.languageList"
                :class="{ choosed: item.id === data.languageChoosed.id }"
                :key="index"
                @click="() => chooseLanguage(item)"
            >
                {{ item.title }}
                <view
                    class="check-icon"
                    v-if="item.id === data.languageChoosed.id"
                >
                    <img src="@/static/icon/checked_light.png" alt="" />
                </view>
            </view>
        </view>
        <view class="pop-ok" @click="languageOk">
            {{ $t('KEY_COMMON_OK') }}
        </view>
    </PopupBottom>
</template>

<script lang="ts" setup>
    import PopupBottom from '@/lib/components/PopupBottom/index.vue'
    import { useI18n } from 'vue-i18n'
    const userStore = useUsersStore()
    const languageStore = i18nStore()
    const { locale } = useI18n()
    const { t: $t } = i18n.global

    interface Props {
        pageType?: number
    }

    interface Data {
        title?: string
        languageChoosed: any
    }

    const props = withDefaults(defineProps<Props>(), {
        pageType: 1,
    })
    const data = reactive<Data>({
        title: 'Logo',
        languageChoosed: {
            id: 'en',
        },
    })

    const RefPopup = ref()

    const openPop = (type = true) => {
        RefPopup.value.changeIsShow(type)
    }

    const chooseLanguage = (item) => {
        data.languageChoosed = item
    }

    const languageOk = () => {
        languageStore.local = data.languageChoosed
        locale.value = data.languageChoosed.id
        uni.setLocale(data.languageChoosed.id)
        userStore.commonParams.langId = data.languageChoosed.id
        // localStorage.setItem('local', JSON.stringify(data.languageChoosed))
        // localStorage.setItem('xxyy_langId', data.languageChoosed.id)
		uni.setStorageSync('local', JSON.stringify(data.languageChoosed))
		uni.setStorageSync('xxyy_langId', data.languageChoosed.id)
        RefPopup.value.changeIsShow(false)
        // window.location.reload()
        uni.reLaunch({
          url: '/pages/index/index'
        })
    }

    const maskClick = () => {
        data.languageChoosed = languageStore.local
    }

    watch(
        () => languageStore.local,
        (val) => {
            data.languageChoosed = val
        }
    )

    onMounted(() => {
        data.languageChoosed = languageStore.local
    })

    defineExpose({
        openPop,
    })
</script>

<style lang="scss">
    .personal-title {
        @apply flex items-center justify-center;
        font-size: 33rpx;
        font-weight: bold;
        color: #454545;
        height: 100rpx;
    }
    .language-view {
        @apply absolute left-0 right-0 overflow-y-auto;
        bottom: 120rpx;
        top: 100rpx;
        padding: 20rpx 30rpx 0;
    }
    .border-btn {
        margin-bottom: 30rpx;
        opacity: 0.5;
    }
    .choosed {
        opacity: 1;
    }
    .pop-ok {
        @apply flex justify-center items-center absolute bottom-0 left-0 w-full;
        height: 120rpx;
        border-top: 2rpx solid #4c4c4c;
        font-size: 33rpx;
        color: #4c4c4c;
    }
    .check-icon {
        @apply flex items-center absolute;
        width: 30rpx;
        height: 40rpx;
        right: calc(50% - 120rpx);
        margin-left: 20rpx;
        img {
            @apply w-full;
        }
    }
</style>
