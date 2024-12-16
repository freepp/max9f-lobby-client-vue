<template>
    <teleport to="#mask_modal" v-if="data.mounted">
        <view class="dialog-modal" v-show="data.isShow">
            <MaskModal ref="RefModal" @maskClick="maskClick"></MaskModal>
            <view
                class="dialog-view"
                @click.stop="() => {}"
                v-show="data.isShow"
            >
                <image
                    class="logo-img"
                    src="@/static/spinwheel/logo-pt.png"
                    mode="aspectFit"
                />
                <view class="marquee-view">
                    <Report :marqueesData="data.marqueesData" :pageType="2" />
                </view>
                <SpinWheel ref="RefSpinWheel" />
                <view class="close-icon">
                    <img
                        @click="() => changeIsShow(false)"
                        src="@/static/icon/close.png"
                        alt=""
                    />
                </view>
            </view>
        </view>
        <view
            class="position-view"
            v-show="data.isShow && store.userInfo?.userMode === 2"
        >
            <view class="bonus-icon" @click="openBounsPack">
                <img src="@/static/activity/bouns.png" alt="" />
            </view>
        </view>

        <BonusPack
            ref="RefBonusPack"
            :successBtnText="$t('KEY_COMMON_OK')"
            @onSuccess="BonusPackSuccess"
            @onClose="BonusPackClose"
        />
    </teleport>
</template>

<script lang="ts" setup>
    import { reactive, ref, onMounted, watch } from 'vue'
    import MaskModal from '@/lib/components/MaskModal/index.vue'
    import Report from '@/lib/components/Report/index.vue'
    import SpinWheel from './SpinWheel.vue'
    import { i18n } from '@/common/i18nConfig'
    import { i18nStore } from '@/store/i18nStore'
    import BonusPack from './BounusPackAlert.vue'
    import { useUsersStore } from '@/store/userStore'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as commonApi } from '@/NET/common'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { ga } from '@/common/common'

    const store = useUsersStore()
    const languageStore = i18nStore()
    const { t: $t } = i18n.global

    interface Props {
        successBtnText: string
    }

    const props = withDefaults(defineProps<Props>(), {
        successBtnText: 'Yes',
    })

    interface Data {
        isShow: Boolean
        mounted: boolean
        marqueesData: any
    }
    const data = reactive<Data>({
        isShow: false,
        mounted: false,
        marqueesData: [],
    })
    const emit = defineEmits(['onSuccess', 'onFaild', 'onClose'])
    const RefModal = ref()
    const RefSpinWheel = ref()

    const maskClick = () => {
        changeIsShow(false)
    }

    const changeIsShow = (isShow) => {
        RefModal.value.changeModal(isShow)
        data.isShow = isShow
        if (!isShow) {
            
            emit('onClose')
            if (store.userInfo?.userMode === 2) {
                // localStorage.setItem('activeModalFirstShow', '1')
				 uni.setStorageSync('activeModalFirstShow', '1')
            }
        } else {
            initData()
            
        }
    }

    const success = () => {
        emit('onSuccess')
        changeIsShow(false)
        uni.navigateTo({
            url: `../../pages/login/index?login_mode=2`,
        })
    }

    const faild = () => {
        emit('onFaild')
        changeIsShow(false)
    }

    // Bonus弹窗
    const RefBonusPack = ref()
    const openBounsPack = () => {
        if (RefBonusPack.value.changeIsShow) {
            
            RefBonusPack.value.changeIsShow(true)
        }
    }
    const BonusPackSuccess = () => {
        // console.log('OK')
    }
    const BonusPackClose = () => {
        // if (props.alertConfig?.isTipPersonalForm && !data.personalOpened) {
        //     openPop(true)
        // }
    }

    const rouletteMarquee = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                pageSize: 10,
            },
            store.commonParams
        )
        // let res = await lobbyApi.activitys.rouletteMarquee(params)
        
        let res = await commonApi.marquee.marqueeMarqueeCreate(params)

        if (res.success) {
            if (res.result) {
                // data.rouletteUserData = res.result
                data.marqueesData = res.result
                data.marqueesData.forEach((item) => {
                    item.msg = `${$t('KEY_SPINWHEEL_WINNER')} ${
                        item.mobile ? item.mobile : item.userName
                    } ${$t('KEY_SPINWHEEL_WON')} ${item.bonus} ${$t(
                        'KEY_SPINWHEEL_MXN'
                    )}`
                })
            }
        } else {
            ErrorHandler(res, 'rouletteMarquee')
            return null
        }
    }

    // watch(
    //     () => store.userInfo,
    //     (val) => {
    //         initData()
    //     }
    // )

    const initData = () => {
        if (store.userInfo) {
            rouletteMarquee()
            RefSpinWheel.value.initData()
        }
    }

    onMounted(() => {
        // initData()
        data.mounted = true
    })

    defineExpose({
        changeIsShow,
        initData,
    })
</script>

<style lang="scss">
    .dialog-modal {
        @apply fixed left-0 right-0 bottom-0 top-0;
        z-index: 1000;
    }
    .modal-view {
        @apply fixed left-0 right-0 bottom-0 top-0;
        z-index: 1000;
    }
    .dialog-view {
        @apply absolute box-border overflow-hidden flex flex-col items-center;
        z-index: 1001;
        width: 100%;
        height: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #454545;
    }
    .close-icon {
        @apply absolute;
        right: 30rpx;
        top: 30rpx;
        width: 40rpx;
        height: 40rpx;
        img {
            @apply w-full h-full;
        }
    }

    .bonus-icon {
        @apply absolute;
        z-index: 29;
        width: 85rpx;
        height: 85rpx;
        left: 15rpx;
        bottom: 20rpx;
        z-index: 1001;
        img {
            @apply w-full h-full;
        }
    }

    .logo-img {
        width: 750rpx;
        height: 160rpx;
        margin: 56rpx auto 0;
    }
    .marquee-view {
        width: 665rpx;
        height: 53rpx;
        border-radius: 53rpx;
        background-color: #114a39;
        margin-top: 35rpx;
    }
</style>
