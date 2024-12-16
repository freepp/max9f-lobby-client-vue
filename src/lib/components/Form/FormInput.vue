<template>
    <view>
        <uni-easyinput
            :class="{'dark': itemConfig.dark}"
            :primaryColor="'#272727'"
            :type="itemConfig.cypto ? 'password' : 'text'"
            v-model="formData[itemConfig.key]"
            :placeholder="itemConfig.placeholder"
        />
    </view>
</template>
<script lang="ts" setup>
    import { computed } from 'vue'
    import { FormItemConfig } from '@/models/common'

    interface Props {
        formData: any
        itemConfig: FormItemConfig
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
    })

    const hasPadding = computed(() => {
        let key = props.itemConfig?.key
        if (
            key === 'phone' ||
            key === 'password' ||
            key === 'confirm_password'
        ) {
            return true
        }
        return false
    })
</script>
<style lang="scss">
    ::v-deep .dark .is-input-border{
        background: #272727 !important;
        border: 1px solid #37383C !important;
    }
    ::v-deep .dark .uni-input-input{
        @apply text-white-100;
    }
    ::v-deep .is-input-border {
        border: 0;
        border-bottom: 4rpx solid #a7a8a8;
    }

    ::v-deep .uni-easyinput__content {
        background: #ffffff;
        height: 90rpx;
        font-size: 28rpx;
    }

    ::v-deep .uni-input-placeholder {
        overflow: inherit;
        font-size: 28rpx;
    }

    ::v-deep .is-input-error-border {
        border-color: #ff2a00 !important;
    }

    ::v-deep .uni-forms-item__error {
        color: #ff2a00;
        margin-top: 16rpx;
    }
</style>
