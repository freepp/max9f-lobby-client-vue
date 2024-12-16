<template></template>
<script lang="ts" setup>
    import { modal } from '../Modal/index'
    import deposit100Img from '@/static/activity/deposit100.jpg'

    const store = useUsersStore()
    const commonStore = useCommonStore()
    const { t: $t } = i18n.global

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
        title: 'DepositAlert',
    })

    const openModal = () => {
        modal({
            width: '667rpx',
            height: '836rpx',
            content: `<img
                        style="width: 100%; display: block;"
                        src="${deposit100Img}"
                        alt=""
                    />`,
            cancelText: 'cancel',
            confirmText: `${$t('KEY_TABBAR_DEPOSIT')}`,
            showCancel: false,
            onConfirm: () => {
                commonStore.depositTab = 0
                uni.switchTab({
                    url: '/pages/deposit/index',
                })
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
