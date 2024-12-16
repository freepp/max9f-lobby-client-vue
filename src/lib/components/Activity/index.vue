<template>
    <view>
        <view class="alert-view">
            <RegisterAlert ref="RefRegisterAlert" :alertConfig="alertConfig" />
            <BindMobileAlert
                ref="RefBindMobileAlert"
                :alertConfig="alertConfig"
            />
            <DepositAlert ref="RefDepositAlert" :alertConfig="alertConfig" />
            <BindMobile ref="RefBindMobile" :showIcon="false"></BindMobile>
            <!-- <PopupBottom ref="RefPopup" :height="900">
                <PersonalInfo @confirm="personalConfirm" />
            </PopupBottom> -->
        </view>
    </view>
</template>

<script lang="ts" setup>
    import RegisterAlert from './ActivityAlert/RegisterAlert.vue'
    import BindMobileAlert from './ActivityAlert/BindMobileAlert.vue'
    import DepositAlert from './ActivityAlert/DepositAlert.vue'
    import BindMobile from '@/lib/components/BindMobile/index.vue'
    import { modal } from './Modal/index'
    import { api as commonApi } from '@/NET/common'
    import { SCBannerDto } from '@/NET/lobby/data-contracts'

    const commonStore = useCommonStore()
    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Props {
        pageType?: number
        alertConfig?: any
    }

    const props = withDefaults(defineProps<Props>(), {
        pageType: 1,
        alertConfig: {},
    })

    interface Data {
        title?: string
        bounsIconShow: boolean
        personalOpened: boolean
    }

    const data = reactive<Data>({
        title: 'Activity',
        bounsIconShow: false,
        personalOpened: false,
    })

    const emit = defineEmits(['close'])

    const RefRegisterAlert = ref()
    const RefBindMobileAlert = ref()
    const RefDepositAlert = ref()
    const RefBindMobile = ref()

    const handleRegisterAlert = (list: SCBannerDto[]) => {
        if (!list || !list.length) {
            emit('close')
            return
        }
        const len = list.length
        const _modalFn = (index: number = 0) => {
            const item = list[index]
            const _cb = () => {
                if (len > index + 1) {
                    _modalFn(index + 1)
                } else {
                  emit('close')
                }
            }

            RefRegisterAlert.value.openModal(
                props.alertConfig?.register7?.bonus,
                item.imageUrl,
                item.tip,
                item.linkUrl,
                !props.alertConfig?.timelimitpayInfo?.hasPay,
                item.code === 100004
                    ? props.alertConfig?.timelimitpayInfo?.countDown
                    : 0,
                _cb,
                _cb
            )
        }
        _modalFn()
    }
    watch(
        () => props.alertConfig,
        async (val) => {
            let localPath = getCurrentPages()
            let localRoute = localPath[localPath.length - 1].route
            if (localRoute !== 'pages/index/index') return

            // 注册前前弹
            const params = Object.assign(
                {
                    userId: store.userInfo.userId,
                    position: [7],
                },
                store.commonParams
            )

            const { result } = await commonApi.banner.bannerBannerCreate(params)
            handleRegisterAlert(result[7])
            // result[7].forEach((item) => {
            //     RefRegisterAlert.value.openModal(
            //         props.alertConfig?.register7?.bonus,
            //         item.imageUrl,
            //         item.tip,
            //         item.linkUrl,
            //         !props.alertConfig?.timelimitpayInfo?.hasPay,
            //         props.alertConfig?.timelimitpayInfo?.countDown
            //     )
            // })

            // if (store.userInfo?.userMode === 2) afterLoginPopup(0)
            //         if (store.userInfo?.userMode === 1) {

            //             // 注册活动
            //             /* if (props.alertConfig?.register7?.isTipRegister) {
            //                 RefRegisterAlert.value.openModal(
            //                     props.alertConfig?.register7?.bonus
            //                 )
            //             } */

            //             // 注册后前弹
            //         } else if (store.userInfo?.userMode === 2) {

            //             afterLoginPopup(0)
            //         }
        }
    )
    const showIndexAssistanter = () => {
        uni.$emit('showIndexTable')
    }

    // 登录后弹框
    const afterLoginPopup = (index) => {
        if (!props.alertConfig?.indexPopupBox[index]) {
            showIndexAssistanter()
            return
        }
        let popupConifg = props.alertConfig?.indexPopupBox[index]
        let test =
            '<p style="color: #fff; font-size: 8vw; line-height: 10vw; font-weight: 800;">Depósito Premiado!!!</p><p style="color: #fff; font-size: 5vw; line-height: 6.4vw;">Quanto mais depositar,maior o ganho! Até R$10.000!</p>'

        modal({
            width: '667rpx',
            height: '836rpx',
            content: `<img
                         style="width: 100%; display: block;"
                         src="${popupConifg.imageUrl}"
                         alt=""
                     />
                     <div style="position: absolute; bottom: 20%; left: 0; padding: 0 10%;">${popupConifg.content}</div>`,
            cancelText: 'cancel',
            confirmText: `${popupConifg.linkContent}`,
            showCancel: false,
            onConfirm: () => {
                if (popupConifg.code === 100006) {
                    RefBindMobile.value.openDialog()
                } else {
                    uni.navigateTo({
                        url: popupConifg.linkUrl,
                        fail() {
                            uni.switchTab({
                                url: popupConifg.linkUrl,
                            })
                        },
                    })
                }
            },
            onCancel: () => {
                afterLoginPopup(index + 1)
            },
        })
    }

    onMounted(() => {
        nextTick(() => {})
    })
</script>

<style lang="scss">
    .alert-view {
    }

    .bonus-icon {
        @apply absolute;
        z-index: 29;
        width: 85rpx;
        height: 85rpx;
        left: 15rpx;
        bottom: 20rpx;
        .spine-icon {
            width: 100%;
            height: 100%;
        }
    }
</style>
