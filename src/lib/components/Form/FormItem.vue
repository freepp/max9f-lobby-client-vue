<template>
    <uni-forms-item
        class="items"
        :label-width="1"
        :name="itemConfig.key"
        v-if="itemConfig.key !== 'key'"
    >
        <FormInput
            v-if="itemConfig.type === 'input'"
            :formData="formData"
            :itemConfig="itemConfig"
        />
        <FormInputCustom
            v-if="itemConfig.type === 'inputCustom'"
            :formData="formData"
            :itemConfig="itemConfig"
        />
        <!-- <FormCardSelect
            v-if="itemConfig.type === 'cardSelect'"
            :formData="formData"
            :itemConfig="itemConfig"
            :validateData="validateData"
        /> -->
        <FormInputVerifyCode
            v-if="itemConfig.type === 'verifyCode'"
            :formData="formData"
            :itemConfig="itemConfig"
        ></FormInputVerifyCode>
        <FormDatePicker
            v-if="itemConfig.type === 'datePicker'"
            :formData="formData"
            :itemConfig="itemConfig"
            :validateData="validateData"
        />
        <FormPayMethod
            v-if="itemConfig.type === 'payMethod'"
            :formData="formData"
            :itemConfig="itemConfig"
            :validateData="validateData"
            :noCashLoad="noCashLoad"
        />
    </uni-forms-item>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue'
    import FormInput from './FormInput.vue'
    import FormInputCustom from './FormInputCustom.vue'
    import FormDatePicker from './FormDatePicker.vue'
    import FormInputVerifyCode from './FormInputVerifyCode.vue'
    // import FormCardSelect from './FormCardSelect.vue'
    import FormPayMethod from './FormPayMethod.vue'

    interface Props {
        formData: any
        itemConfig: any
        validateData: any
        noCashLoad: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
        formData: () => ({}),
        itemConfig: () => ({}),
        validateData: () => [],
        noCashLoad: false
    })

    const data = reactive<any>({
        title: 'formCell',
    })
</script>
<style lang="scss">
    .items {
        margin-bottom: 56rpx;
    }
    .no-margin {
        margin: 0;
    }
</style>
