<template>
    <view>
        <view class="picker-component" @click="openPicker">
            <img src="@/static/icon/calendar.png" alt="" />
        </view>
        <date-picker
            v-model="data.date"
            :locale="data.local"
            :show="data.pickerShow"
            :editable="true"
            format="YYYY-MM-DD"
            popover
            auto-submit
            custom-input="#my-custom-editable-input"
            :min="props.min"
            :max="props.max"
            @close="data.pickerShow = false"
            @change="dateChange"
        />
    </view>
</template>

<script lang="ts" setup>
    import moment from 'moment'
    // @ts-ignore
    import es from 'moment/locale/es'
    moment.updateLocale('es', es)

    const languageStore = i18nStore()

    interface Props {
        min?: string
        max?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        min: '',
        max: ''
    })

    interface Data {
        pickerShow: boolean
        date: string
        local: string
    }
    const data = reactive<Data>({
        date: '',
        pickerShow: false,
        local: 'es',
    })
    const emit = defineEmits(['datePickerChange'])

    const openPicker = () => {
        data.pickerShow = true
    }

    const dateChange = (date) => {
        let chooseDate = new Date(date._d)
        emit('datePickerChange', chooseDate)
    }

    onMounted(() => {
        console.log()
        if (languageStore.local.id === 'en') {
            data.local = 'en'
        } else {
            data.local = 'es'
        }
    })

    defineExpose({
        openPicker,
    })
</script>

<style lang="scss">
    .picker-component {
        @apply flex justify-center items-center;
        width: 47rpx;
        font-size: 28rpx;
        color: #454545;
        img {
            @apply w-full;
        }
    }
    ::v-deep .vpd-main {
      @media (width > 960px) {
        display: initial;
      }
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
