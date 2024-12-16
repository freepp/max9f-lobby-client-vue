<template>
    <view class="channel-view">
        <PhoneSelect :payParams="data.payParams" class="amount-select" />
        <view
            class="primary-btn-disabled copybtn"
            v-if="!data.payParams.mobile"
        >
            {{ $t('KEY_COMMON_COPY') }}
        </view>
        <view
            class="primary-btn copybtn"
            :data-clipboard-text="data.payParams.mobile"
            v-else
        >
            {{ $t('KEY_COMMON_COPY') }}
        </view>
        <MoreList class="more-list" :list-data="data.listData" />
        <view class="attention">
            <view>
                {{ $t('KEY_PAY_INFORMATION1') }}
            </view>
            <view>
                {{ $t('KEY_PAY_INFORMATION2') }}
            </view>
            <view>
                {{ $t('KEY_PAY_INFORMATION3') }}
            </view>
            <view>
                {{ $t('KEY_PAY_INFORMATION4') }}
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { reactive, ref, onMounted, watch } from 'vue'
    import PhoneSelect from '@/lib/components/Pay/common/PhoneSelect.vue'
    import MoreList from '@/lib/components/Pay/common/MoreList.vue'
    import FundDetailImg from '@/static/me/chongzhijilu-me.png'
    import FAQImg from '@/static/me/faq-me.png'
    import ClipboardJS from 'clipboard'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { ga } from '@/common/common'
    import { i18n } from '@/common/i18nConfig'
    import { modal } from '@/lib/components/Modal'
    const { t: $t } = i18n.global
    const store = useUsersStore()

    interface Props {
        pageType?: number
        channel?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        pageType: 0, //0: deposit 1: withdraw
        channel: '',
    })

    interface Data {
        listData?: any
        payParams: any
    }
    const data = reactive<Data>({
        payParams: {
            mobile: '',
            amount: 0,
        },
        listData: [
            {
                items: [
                    {
                        icon: FundDetailImg,
                        name: $t('KEY_PAGETITLE_FUNDDETAILS'),
                        path: '/pages/fund_details/index?page_type=2',
                    },
                    // {
                    //     icon: FAQImg,
                    //     name: $t('KEY_PAGETITLE_FAQ'),
                    //     path: '/pages/FAQ/index',
                    // },
                ],
            },
        ],
    })

    const speiDeposit = async () => {
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                channel: props.channel,
            },
            store.commonParams
        )
        let res = await lobbyApi.profile.speiDeposit(params)
        if (res.success) {
            data.payParams.mobile = res.result.vaNumber
        } else {
            ErrorHandler(res, 'speiDeposit')
        }
    }
    const openDialog = () => {
        modal({
            width: '485rpx',
            title: $t('KEY_PAY_COPYSUCCESS'),
            showCancel: false,
            showConfirm: false,
            maskClosable: true,
        })
    }

    const DialogSuccess = () => {
        // console.log('OK')
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    const initData = () => {
        if (store.userInfo) {
            speiDeposit()
        }
    }

    onMounted(() => {
        
        let clipboard = new ClipboardJS('.copybtn')
        clipboard.on('success', function (e) {
            
            openDialog()
        })
        initData()
    })
</script>

<style lang="scss">
    .channel-view {
        padding: 0 40rpx;
    }

    .card-select {
        margin-top: 30rpx;
    }
    .amount-select {
        margin-top: 30rpx;
    }

    .primary-btn,
    .primary-btn-disabled {
        margin-top: 80rpx;
    }

    .more-list {
        margin-top: 80rpx;
    }

    .attention {
        margin: 50rpx 0;
        font-size: 20rpx;
        color: #7c7c7c;
        line-height: 28rpx;
    }
</style>
