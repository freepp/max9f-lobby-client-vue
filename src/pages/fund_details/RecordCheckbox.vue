<template>
    <view class="record-options">
        <uni-data-checkbox
            v-model="data.checkboxData"
            :localdata="getHobby"
            @change="checkChange"
        ></uni-data-checkbox>
    </view>
</template>

<script lang="ts" setup>
    import { reactive, watch, onMounted, computed } from 'vue'
    import { i18n } from '@/common/i18nConfig'
    const { t: $t } = i18n.global

    interface Props {
        pageType: any
    }

    const props = withDefaults(defineProps<Props>(), {
        pageType: 1,
    })

    interface Data {
        checkboxData: any
    }

    const data = reactive<Data>({
        checkboxData: 1,
    })

    const getHobby = computed(() => {
        let hobby = [
            {
                text: $t('KEY_RECORD_DEPOSITRECORD'),
                value: 1,
            },
            {
                text: $t('KEY_RECORD_WITHDRAWRECORD'),
                value: 2,
            },
            {
                text: $t('KEY_RECORD_DISCOUNTRECORD'),
                value: 3,
            },
        ]
        return hobby
    })
    const emit = defineEmits(['checkboxChange'])

    watch(
        () => props.pageType,
        (val) => {
            data.checkboxData = val
        }
    )

    const checkChange = () => {
        emit('checkboxChange', data.checkboxData)
    }

    onMounted(() => {
        data.checkboxData = Number(props.pageType)
    })
</script>

<style lang="scss">
    .record-options {
        @apply flex items-center bg-black-80 border-black-80;
        padding: 0 40rpx;
        height: 100rpx;
        border-bottom-width: 2rpx;
        border-bottom-style: solid;
    }

    ::v-deep .checklist-box {
        // width: 200rpx;
        flex: 1;
    }

    ::v-deep .checkbox__inner {
        @apply flex justify-center items-center;
        width: 20px !important;
        height: 20px !important;
    }

    ::v-deep .checkbox__inner-icon {
        top: 2px !important;
        left: 6px !important;
        height: 10px !important;
        width: 5px !important;
    }

    ::v-deep .checklist-box {
        margin-right: 0 !important;
        padding: 0 8rpx;
    }
</style>
