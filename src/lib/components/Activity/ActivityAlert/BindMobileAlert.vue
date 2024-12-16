<template>
    <BindMobile ref="RefBindMobile" :showIcon="false"></BindMobile>
</template>
<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import { modal } from '../Modal/index'
    import { getLogoName } from '@/common/common'
    import BindLucro777Img from '@/static/activity/popup-bind/lucro777.jpg'
    import BindForroubetImg from '@/static/activity/popup-bind/forroubet.jpg'
    import BindJogo10brImg from '@/static/activity/popup-bind/jogo10br.jpg'
    import BindSuavegameImg from '@/static/activity/popup-bind/suavegame.jpg'
    import { i18n } from '@/common/i18nConfig'
    import BindMobile from '@/lib/components/BindMobile/index.vue'
    import { useUsersStore } from '@/store/userStore'

    const store = useUsersStore()
    const { t: $t } = i18n.global

    const RefBindMobile = ref()

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
    }
    const data = reactive<Data>({
        title: 'BindMobileAlert',
    })

    const openModal = (cash) => {
        let logoName = getLogoName()
        let bindmobileImg = BindLucro777Img
        switch (logoName) {
            case 'lucro777':
                bindmobileImg = BindLucro777Img
                break
            case 'sorteslots':
                bindmobileImg = BindLucro777Img
                break
            case 'upCasino':
                bindmobileImg = BindLucro777Img
                break
            case 'jogo10':
                bindmobileImg = BindJogo10brImg
                break
            case 'suave':
                bindmobileImg = BindSuavegameImg
                break
            case 'forrou':
                bindmobileImg = BindForroubetImg
                break
        }
        modal({
            width: '667rpx',
            height: '836rpx',
            content: `<img
                        style="width: 100%; display: block;"
                        src="${bindmobileImg}"
                        alt=""
                    />`,
            cancelText: 'cancel',
            confirmText: `${$t('KEY_FORMBTN_COLLECT')} R$${cash}`,
            showCancel: false,
            onConfirm: () => {
                console.log('confirm')
                RefBindMobile.value.openDialog()
            },
            onCancel: () => {
                console.log('onCancel')
            },
        })
    }

    defineExpose({
        openModal,
    })
</script>
