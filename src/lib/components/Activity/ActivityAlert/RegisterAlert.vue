<template></template>
<script lang="ts" setup>
    import { modal } from '../Modal/index'
    import { getLogoName } from '@/common/common'

    import { getActivityAsset } from '@/common/activityAssets'

    const { t: $t } = i18n.global

    interface Data {
        title?: string
        collectCash: number
    }
    const data = reactive<Data>({
        title: 'RegisterAlert',
        collectCash: 1,
    })

    //const openModal = (cash) => {
    const openModal = (
        cash: number,
        registerImgPath: string,
        tip: string,
        linkUrl: string,
        hasPay: boolean,
        countDown: number,
        onConfirm?: () => void,
        onCancel?: () => void
    ) => {
        let logoName = getLogoName()
        let registerTitle = 'popup_register_nologo'

        switch (logoName) {
            case 'lucro777':
                registerTitle = 'popup_register_locro777'
                break
            case 'sorteslots':
            case 'upCasino':
            case 'forrajogo':
                registerTitle = 'popup_register_nologo'
                break
            case 'jogo10':
                registerTitle = 'popup_register_jogo10br'
                break
            case 'suave':
                registerTitle = 'popup_register_suavegame'
                break
            case 'forrou':
                registerTitle = 'popup_register_forroubet'
                break
            case 'sorte10':
                registerTitle = 'popup_register_sorte10'
                break
            case 'vitoria365':
                registerTitle = 'popup_register_vitoria365'
                break
            default:
                registerTitle = 'popup_register_nologo'
        }

        /*   const registerImageName = getActivityAsset(registerTitle);
                                                                                                    	    console.log('registerImageName' , registerImageName)
                                                                                                            const registerImgPath = new URL(`../../../../static/activity/popup-register/${registerImageName}`, import.meta.url).href; */

        const modalDialog = modal({
            width: '667rpx',
            height: '836rpx',
            content: `<img id="onload" style="width: 100%; display: block;" src="${registerImgPath}" alt="" />`,
            cancelText: 'cancel',
            confirmText: tip,
            showCancel: false,
            hasPay: hasPay,
            countDown: countDown,
            onConfirm: () => {
                const isTab = linkUrl.includes('?')
                uni.navigateTo({
                    url: linkUrl,
                })
                //onConfirm()
            },
            onCancel: () => {
                onCancel()
            },
        })
        modalDialog.show()
    }

    defineExpose({
        openModal,
    })
</script>
