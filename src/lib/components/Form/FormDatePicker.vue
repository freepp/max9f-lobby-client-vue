<template>
    <view
        class="date-picker"
        :class="{ 'err-border': !data.validate, 'dark': itemConfig.dark }"
        @click="openPicker"
    >
        <view class="data-picker-value" v-if="formData[itemConfig.key]">
            {{ formData[itemConfig.key] }}
        </view>
        <view
            class="placeholder"
            :class="{ 'err-placeholder': !data.validate }"
            v-else
        >
            {{ itemConfig.placeholder }}
        </view>
    </view>
    <date-picker
        v-model="data.date"
        :locale="data.local"
        :show="data.pickerShow"
        :editable="true"
        format="DD-MM-YYYY"
        popover
        auto-submit
        custom-input="#my-custom-editable-input"
        @close="() => (data.pickerShow = false)"
        @change="dateChange"
    />
</template>
<script lang="ts" setup>
    import { computed, reactive, onMounted, watch } from 'vue'
    import { FormItemConfig } from '@/models/common'
    import { i18nStore } from '@/store/i18nStore'
    import { format } from 'date-fns'
    import moment from 'moment'
    // @ts-ignore
    import es from 'moment/locale/es'
    // @ts-ignore
    import pt from 'moment/locale/pt-br'

    const languageStore = i18nStore()

    interface Props {
        formData: any
        itemConfig: FormItemConfig
        validateData: any
    }

    const props = withDefaults(defineProps<Props>(), {
        formData: () => ({}),
        itemConfig: () => ({
            key: 'email',
            label: 'Email',
            placeholder: 'Enter your email',
            required: true,
            type: 'input',
            cypto: false,
        }),
        validateData: () => [],
    })

    interface Data {
        pickerShow: boolean
        date: string
        local: string
        validate: boolean
    }
    const data = reactive<Data>({
        date: '',
        pickerShow: false,
        local: 'es',
        validate: true,
    })

    watch(
        () => props.validateData,
        (val) => {
            if (val) {
                data.validate = val.find((item) => item.key === 'BirthDay')
                    ? false
                    : true
            }
        }
    )

    const openPicker = () => {
        data.pickerShow = true
    }

    const dateChange = (date) => {
        let chooseDate = new Date(date._d).getTime()
        props.formData[props.itemConfig.key] = format(chooseDate, 'dd-MM-yyyy')
        data.validate = true
    }

    onMounted(() => {
        if (languageStore.local.id === 'es') {
            moment.updateLocale('es', es)
            data.local = 'es'
        } else if (languageStore.local.id === 'pt') {
            moment.updateLocale('pt', pt)
            data.local = 'pt'
        } else {
            data.local = 'en'
        }
    })
</script>
<style lang="scss">
    .date-picker.dark{
        background: #272727 !important;
        border: 1px solid #37383C !important;
    }
    .dark .data-picker-value{
        @apply text-white-100;
    }
    .date-picker {
        @apply w-full flex items-center box-border;
        height: 90rpx;
        background: #fff;
        border-color: rgb(229, 229, 229);
        color: rgb(51, 51, 51);
        padding-left: 10px;
        border-radius: 8rpx;
    }
    .err-border {
        border-bottom: 4rpx solid #ff2a00 !important;
    }

    .placeholder {
        font-size: 28rpx;
        color: #999;
    }
    .err-placeholder {
        color: #f29e99;
    }

    ::v-deep .vpd-wrapper {
      .vpd-container {
        color: #2c3e50;
        .vpd-month-label {
          min-width: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: normal;
          span {
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: normal;
          }
        }
        .vpd-addon-list-item, .vpd-day, .vpd-close-addon {
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: normal;
        }
        .vpd-year-label {
          span {
            line-height: normal;
            height: auto;
          }
        }
      }
      @media (width > 960px) {
        position: fixed !important;
        width: 100% !important;
        height: 100% !important;
        .vpd-container {
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          right: initial !important;
          transform: translate(-50%, -50%) !important;
        }
      }
    }
</style>
