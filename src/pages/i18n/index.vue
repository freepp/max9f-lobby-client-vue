<template>
    <Layout>
        <button @click="changeLanguage">切换语言</button>
        <view>{{ $t('KEY_TEXT') }}</view>
        <input type="text" :placeholder="$t('KEY_PLACEHOLDER')" />
        <!-- <img
            :src="`/src/static/logo${
                local === 'zh-Hans' ? '' : `.${local}`
            }.png`"
            alt=""
        /> -->
        <uni-badge text="1"></uni-badge>
        <uni-badge text="2" type="success"></uni-badge>
        <uni-badge text="3" type="primary" :inverted="true"></uni-badge>
    </Layout>
</template>

<script lang="ts" setup>
    import { i18nStore } from '@/store/i18nStore'
    import { storeToRefs } from 'pinia'
    import Layout from '@/lib/layout/Base.vue'
    import { useI18n } from 'vue-i18n'
    import { onMounted } from 'vue'

    const { locale } = useI18n()
    const store = i18nStore()
    const { local } = storeToRefs(store)

    const changeLanguage = () => {
        // store.local = local.value === 'zh-Hans' ? 'en' : 'zh-Hans'
        // locale.value = store.local
    }

    onMounted(() => {
        const message = { name: '张三', age: 20 }
        window.parent.postMessage(message)
    })
</script>
