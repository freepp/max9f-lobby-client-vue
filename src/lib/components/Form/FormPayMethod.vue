<template>
    <view class="key-picker">
        <view
            class="picker-item"
            :class="{ 'item-choosed': index === data.chooseIndex }"
            v-for="(item, index) in data.keyData"
            :key="index"
            @click="chooseItem(index)"
        >
            {{ item.name }}
            <view class="lock-icon" v-if="index > 0 && data.locked">
                <img src="@/static/icon/lock.png" alt="" />
            </view>
        </view>
    </view>
    <uni-forms-item class="items" :label-width="1" :name="data.keyConfig.key">
        <FormInput
            :formData="formData"
            :itemConfig="{ ...data.keyConfig, dark: props.itemConfig.dark }"
        />
    </uni-forms-item>
</template>
<script lang="ts" setup>
    import { computed, reactive, onMounted, watch } from 'vue'
    import { FormItemConfig } from '@/models/common'
    import { i18nStore } from '@/store/i18nStore'
    import FormInput from './FormInput.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { i18n } from '@/common/i18nConfig'
    import { useUsersStore } from '@/store/userStore'

    const store = useUsersStore()
    const commonStore = useCommonStore()
    const { t: $t } = i18n.global

    const languageStore = i18nStore()

    interface Props {
        formData: any
        itemConfig: FormItemConfig
        validateData: any
        noCashLoad?: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
        formData: () => ({}),
        itemConfig: () => ({
            key: 'tejeePayMethod',
            label: 'tejeePayMethod',
            placeholder: 'tejeePayMethod',
            required: true,
            cypto: false,
            type: 'payMethod',
        }),
        validateData: () => [],
        noCashLoad: false
    })

    interface Data {
        keyData: any
        chooseIndex: number
        keyConfig: any
        locked: boolean
    }
    const data = reactive<Data>({
        keyData: [
            {
                name: 'CPF',
                id: 0,
                disable: false,
            },
            {
                name: 'CNPJ',
                id: 1,
                disable: true,
            },
            {
                name: 'PHONE',
                id: 2,
                disable: true,
            },
            {
                name: 'EMAIL',
                id: 3,
                disable: true,
            },
            {
                name: 'EVP',
                id: 4,
                disable: true,
            },
        ],
        chooseIndex: 0,
        keyConfig: {
            key: 'key',
            label: $t('KEY_FORM_KEY'),
            placeholder: $t('KEY_FORM_PLACEHOLDER_KEY'),
            required: true,
            cypto: false,
            type: 'input',
        },
        locked: true,
    })

    const chooseItem = (index) => {
        if (data.keyData[index].disable && data.locked) return
        data.chooseIndex = index
        props.formData.tejeePayMethod = data.keyData[index].id
    }

    const cashLoad = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.profile.cashLoad(params)
        if (res.success) {
            store.userInfo.withDrawM = res.result.flow.cashMoney;
            data.locked = res.result.addBraBank?.isLockMethod
            if (res.result?.tempInfo?.cashAmonts) {
              commonStore.withdrawTempInfo = {
                isOpenTempCash: false,
                cashAmonts: [],
                ...res.result.tempInfo
              }
            } else {
              commonStore.withdrawTempInfo = {isOpenTempCash: false, cashAmonts: []}
            }
        } else {
            ErrorHandler(res, 'cashLoad')
            commonStore.withdrawTempInfo = {isOpenTempCash: false, cashAmonts: []}
        }
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )
    watch(
        () => commonStore.refreshCashLoad,
        (val) => {
            if (val) {
              initData()
            }
        }, {
          deep: true,
          immediate: true
        }
    )

    const initData = () => {
        if (store.userInfo) {
            if (!props.noCashLoad) {
              cashLoad()
            }
            props.formData.tejeePayMethod = props.formData.tejeePayMethod
                ? props.formData.tejeePayMethod
                : 0
            data.chooseIndex = props.formData.tejeePayMethod
        }
    }

    onMounted(() => {
        initData()
    })
</script>
<style lang="scss">
    .key-picker {
        @apply w-full flex items-center box-border;
        height: auto;
        border-color: rgb(229, 229, 229);
        color: rgb(51, 51, 51);
        margin-bottom: 14rpx;

        .picker-item {
            @apply flex-1 flex justify-center items-center font-bold relative;
            margin-right: 14rpx;
            height: 65rpx;
            border-radius: 7rpx;
            background: #d1d1d9;
            &:active {
                transform: scale(0.96);
            }
            &:last-child {
                margin: 0;
            }
            .lock-icon {
                @apply absolute;
                right: -6rpx;
                top: -16rpx;
                width: 26rpx;
                img {
                    @apply w-full h-full;
                }
            }
        }

        .item-choosed {
            @apply bg-primary text-white-100;
        }
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

    ::v-deep .vpd-container {
        color: #2c3e50;
    }

    .items {
        margin-bottom: 0;
    }
</style>
