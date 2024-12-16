<template>
    <view class="date-range" @click="openPicker">
        <!-- {{ props.modelValue.value }} -->
        <view class="data-between-choosed">
            {{ modelValue?.[0] }}
            <text>-</text>
            {{ modelValue?.[1] }}
            <!-- {{ value }} -->
        </view>
        <image src="@/static/icon/down.png" class="arrow-down"></image>
        <date-picker
            @click.stop
            v-model="value"
            :locale="local"
            :show="isDatePicker"
            :editable="true"
            :format="props.format?.replaceAll('d', 'D')"
            :range="true"
            clearable
            popover
            auto-submit
            custom-input="#my-custom-editable-input"
            @close="isDatePicker = false"
            @change="dateChange"
        />
    </view>
</template>
<script lang="ts" setup>
    import { format, parse } from 'date-fns'

    interface Props {
        modelValue: any
        format?: string
    }
    // const formater = 'yyyy/MM/dd'
    const props = withDefaults(defineProps<Props>(), {
        modelValue: [],
        format: 'yyyy/MM/DD',
    })
    const emits = defineEmits(['update:modelValue'])
    const languageStore = i18nStore()
    const value = computed({
        set(value) {
            emits('update:modelValue', value)
        },
        get() {
            // console.log('dddddddddd', d)
            return [
                new Date(
                    parse(
                        props.modelValue[0],
                        props.format.replaceAll('D', 'd'),
                        new Date()
                    )
                ),
                new Date(
                    parse(
                        props.modelValue[1],
                        props.format.replaceAll('D', 'd'),
                        new Date()
                    )
                ),
            ]
        },
    })
    const isDatePicker = ref(false)
    const openPicker = () => {
        isDatePicker.value = true
    }
    const dateChange = () => {
        isDatePicker.value = false
    }
    const local = ref('en')
    onMounted(() => {
        if (languageStore.local.id === 'en') {
            local.value = 'en'
        } else {
            local.value = 'es'
        }
    })
</script>
<style lang="scss" scoped>
    .date-range {
        @apply flex items-center justify-between bg-black-80 box-border;
        width: 352rpx;
        height: 57rpx;
        line-height: 57rpx;
        padding-left: 20rpx;
        border: 2rpx solid #272727;
        border-radius: 28rpx;
        .data-between-choosed {
            text {
                margin: 0rpx 10rpx;
            }
        }
    }
    .arrow-down {
        width: 17rpx;
        height: 12rpx;
        margin-right: 6rpx;
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
