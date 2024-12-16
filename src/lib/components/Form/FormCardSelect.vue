<template>
    <view
        class="bank-select"
        :class="{ 'err-border': !data.validate }"
        @click="() => openPop(true)"
    >
        <view v-if="formData[itemConfig.key]">
            {{ formData.bankName }}
        </view>
        <view
            class="placeholder"
            :class="{ 'err-placeholder': !data.validate }"
            v-else
        >
            {{ itemConfig.placeholder }}
        </view>
        <PopupBottom ref="RefPopup" :has-shadow="true">
            <view class="title">{{ $t('KEY_PAGETITLE_SPEIBANKNAME') }}</view>
            <view class="scroll-view">
                <view v-for="(value, key) of data.groupBanks">
                    <view class="letter-title">{{ key }}</view>
                    <view
                        class="select-item"
                        v-for="(item, index) in value"
                        :key="index"
                        @click="() => itemClick(item)"
                    >
                        <view>{{ item.bankName }}</view>
                        <view class="icon">
                            <img
                                v-if="!item.checked"
                                src="@/static/icon/check_light.png"
                                alt=""
                            />
                            <img
                                v-else
                                src="@/static/icon/checked_light.png"
                                alt=""
                            />
                        </view>
                    </view>
                </view>
            </view>
            <view
                class="primary-btn-disabled confirm-btn"
                v-if="!data.itemChoosed.bankCode"
            >
                {{ $t('KEY_COMMON_CONFIRM') }}
            </view>
            <view class="primary-btn confirm-btn" v-else @click="confirm">
                {{ $t('KEY_COMMON_CONFIRM') }}
            </view>
        </PopupBottom>
    </view>
</template>
<script lang="ts" setup>
    import { reactive, watch, ref, onMounted } from 'vue'
    import { FormItemConfig } from '@/models/common'
    import PopupBottom from '@/lib/components/PopupBottom/index.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    const store = useUsersStore()

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
        validateData: [],
    })

    interface Data {
        speiBanks: any
        groupBanks: any
        itemChoosed: any
        validate: boolean
    }

    const data = reactive<Data>({
        speiBanks: [],
        groupBanks: [],
        itemChoosed: {},
        validate: true,
    })

    watch(
        () => props.validateData,
        (val) => {
            if (val) {
                console.log(val)
                data.validate = val.find((item) => item.key === 'bankCode')
                    ? false
                    : true
            }
        }
    )

    const RefPopup = ref()

    const getSpeiBanks = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        let res = await lobbyApi.profile.speiBanks(params)
        if (res.success) {
            data.speiBanks = res.result
            data.groupBanks = groupByFirstLetter(data.speiBanks)
            resetData()
        } else {
            ErrorHandler(res, 'getSpeiBanks')
        }
    }

    const groupByFirstLetter = (arr) => {
        const groups = {}
        for (let i = 0; i < arr.length; i++) {
            const bankName = arr[i].bankName
            const firstLetter = bankName.charAt(0).toUpperCase()
            if (!groups[firstLetter]) {
                groups[firstLetter] = []
            }
            groups[firstLetter].push(arr[i])
        }
        return groups
    }

    const openPop = (type) => {
        RefPopup.value.changeIsShow(type)
    }

    const resetData = () => {
        data.speiBanks.forEach((item) => {
            item.checked = false
        })
    }

    const itemClick = (item) => {
        resetData()
        item.checked = true
        data.itemChoosed = item
        data.validate = true
    }

    const initData = async () => {
        if (store.userInfo) {
            getSpeiBanks()
        }
    }

    const confirm = () => {
        props.formData[props.itemConfig.key] = data.itemChoosed.bankCode
        props.formData.bankName = data.itemChoosed.bankName
        openPop(false)
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    onMounted(() => {
        initData()
    })
</script>
<style lang="scss">
    .bank-select {
        @apply w-full flex items-center box-border;
        height: 90rpx;
        background: #fff;
        border-color: rgb(229, 229, 229);
        color: rgb(51, 51, 51);
        padding-left: 10px;
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

    .title {
        @apply flex items-center justify-center;
        font-size: 33rpx;
        font-weight: bold;
        color: #454545;
        height: 100rpx;
    }
    .scroll-view {
        @apply absolute overflow-y-auto;
        top: 110rpx;
        bottom: 160rpx;
        left: 40rpx;
        right: 40rpx;
        background-color: #fff;
        font-size: 28rpx;
        color: #414141;
        border-radius: 8rpx;
        .select-item {
            @apply flex justify-between items-center;
            margin: 0 40rpx;
            height: 90rpx;
            border-bottom: 2rpx solid #adadad;
            .icon {
                @apply flex justify-center items-center;
                margin-right: 20rpx;
                width: 32rpx;
                img {
                    @apply w-full;
                }
            }
            &:last-child {
                border: 0;
            }
        }
        .choosed {
            color: #000;
        }
    }
    .confirm-btn {
        @apply absolute;
        width: 667rpx;
        bottom: 47rpx;
        left: 40rpx;
    }
    .letter-title {
        @apply flex items-center;
        height: 50rpx;
        background-color: rgba(181, 181, 181);
        color: #fff;
        padding: 0 40rpx;
    }
</style>
