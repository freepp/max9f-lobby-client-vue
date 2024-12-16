<template>
    <Layout :headerTitle="$t('KEY_EMAIL_TITLE')">
        <!-- <PureText></PureText> -->
        <Award :data="data"></Award>
    </Layout>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue'
    import Layout from '@/lib/layout/Base.vue'
    import PureText from './components/PureText.vue'
    import Award from './components/Award.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { api as commonApi } from '@/NET/common'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { i18n } from '@/common/i18nConfig'
    import { useUsersStore } from '@/store/userStore'
    import { onShow, onLoad } from '@dcloudio/uni-app'
    const { t: $t } = i18n.global
    const store = useUsersStore()
    let query: Record<string, string> = null
    onLoad((options: AnyObject) => {
        query = options
    })
    const mergeCommonParams = (params) => {
        return Object.assign(
            {
                userId: store.userInfo?.userId,
            },
            store.commonParams,
            params
        )
    }
    const data = ref<any>({})
    const getDetail = async () => {
        if (!store.userInfo?.userId) {
            return
        }
        const res = await commonApi.email.emailDetailMessageCreate(
            mergeCommonParams({ messageId: query.messageId })
        )
        if (!res.success) {
            ErrorHandler(res, 'detailMessage')
            return
        }
        // if (res.result.content) {
        //     res.result.content = res.result.content
        //         .replaceAll(' ', '&nbsp;')
        //         .replaceAll('\n', '<br>')
        //         .replaceAll('\r\n', '<br>')
        // }
        data.value = res.result
        if (!data.value.flag) {
            const readRes = await commonApi.email.emailReadMessageCreate(
                mergeCommonParams({
                    ids: [data.value.messageId],
                })
            )
            if (readRes.success) {
                ErrorHandler(readRes, 'readMessage')
                return
            }
        }
    }
    watch(
        () => store.userInfo,
        () => {
            getDetail()
        }
    )
    onShow(() => {
        getDetail()
    })
    uni.setNavigationBarTitle({
        title: $t('KEY_EMAIL_TITLE'),
    })
</script>

<style lang="scss"></style>
