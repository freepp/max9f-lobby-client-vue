<template>
    <view :class="{ dark: itemConfig.dark }">
        <view v-if="itemConfig.key === 'mobile'" class="slot">
            <span v-if="store.baseConfig.countryId === 'GHA'">+233</span>
            <span v-else-if="store.baseConfig.countryId === 'BRA'">+55</span>
            <span v-else-if="store.baseConfig.countryId === 'MEX'">+52</span>
        </view>
        <view
            v-if="
                itemConfig.key === 'password' ||
                itemConfig.key === 'repeatPassword' ||
                itemConfig.key === 'newPassword' ||
                itemConfig.key === 'oldPassword'
            "
            class="slot"
        >
            <img src="@/static/icon/lock_white.png" alt="" />
        </view>
        <view class="slot" v-if="itemConfig.key === 'username'">
            <img src="@/static/icon/account_white.png" alt="" />
        </view>
        <uni-easyinput
            v-if="itemConfig.key === 'mobile'"
            :class="{ dark: itemConfig.dark }"
            :primaryColor="'#2979ff'"
            :type="'number'"
            v-model="formData[itemConfig.key]"
            :placeholder="itemConfig.placeholder"
        />
        <uni-easyinput
            v-else
            :class="{ dark: itemConfig.dark }"
            :primaryColor="'#2979ff'"
            :type="itemConfig.cypto ? 'password' : 'text'"
            v-model="formData[itemConfig.key]"
            :placeholder="itemConfig.placeholder"
        />
    </view>
</template>
<script lang="ts" setup>
    import { computed } from 'vue'
    import { FormItemConfig } from '@/models/common'
    import { useUsersStore } from '@/store/userStore'

    const store = useUsersStore()

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
    ::v-deep .dark .is-input-border {
        background: #272727 !important;
        border: 1px solid #37383c !important;
    }
    ::v-deep .dark .uni-input-input {
        @apply text-white-100;
    }
    ::v-deep .is-input-border {
        border: 0;
        border-bottom: 4rpx solid #a7a8a8;
    }

    ::v-deep .uni-easyinput__content {
        background: #ffffff;
        height: 90rpx;
    }

    ::v-deep .uni-easyinput__content-input {
        padding-left: 130rpx !important;
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

    .slot {
        @apply absolute left-0 top-0 z-10 flex justify-center items-center;
        width: 100rpx;
        height: 86rpx;
        font-size: 28rpx;
        color: #c0c0c0;
        font-weight: bold;
        border-right: 2rpx solid #eeeeee;
        img {
            width: 50rpx;
        }
    }
    .dark {
        .slot{
            border-right: 2rpx solid #0e0e0f;
        }
    }
</style>
