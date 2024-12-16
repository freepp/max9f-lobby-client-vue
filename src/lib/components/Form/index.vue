<template>
    <uni-forms ref="RefForm" :modelValue="formData" :rules="formRules">
        <FormItem
            v-for="(itemConfig, index) in formConfig"
            :key="index"
            :formData="formData"
            :itemConfig="itemConfig"
            :validateData="data.validateFaildData"
            :noCashLoad="noCashLoad"
        />
    </uni-forms>
</template>
<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import FormItem from './FormItem.vue'
    import { FormItemConfig } from '@/models/common'
    import { ga } from '@/common/common'
    import { useUsersStore } from '@/store/userStore'
    const store = useUsersStore()

    interface Props {
        formData: any
        formConfig: FormItemConfig[]
        formRules: any
        noCashLoad?: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
        formData: () => ({}),
        formConfig: () => [],
        formRules: () => ({}),
        noCashLoad: false
    })

    const data = reactive<any>({
        title: 'Form',
        validateFaildData: [],
    })

    const RefForm = ref()

    const validate = (formName = '') => {
        return RefForm.value
            .validate()
            .then((res) => {
                data.validateFaildData = []
                return true
            })
            .catch((err) => {
                data.validateFaildData = err
                if (!err) return false
                err.forEach((item) => {
                    
                })
                return false
            })
    }

    const clearValidate = () => {
        RefForm.value.clearValidate()
    }

    const validataFun = (res) => {
        data.validateData = res
    }

    defineExpose({
        validate,
        clearValidate,
    })
</script>
<style lang="scss">
    .form-view {
    }
</style>
