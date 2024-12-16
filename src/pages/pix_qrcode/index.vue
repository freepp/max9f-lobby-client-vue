<template>
    <Layout :header-title="$t('KEY_PAGETITLE_DEPOSIT')">
        <view class="pix-header"></view>
        <view class="scroll-view">
            <view class="channel-view">
                <view class="tips" v-html="$t('KEY_PIX_QRCODE')"></view>
                <view v-if="data.qrcode && data.isLoading">
                    <view class="qrcode-view">
                        <image
                            class="w-full h-full"
                            :src="data.qrcode"
                            mode="scaleToFill"
                        />
                        <!-- <img src="" alt="" /> -->
                    </view>
                    <view class="amount">
                        {{ $t('KEY_PAGETITLE_DEPOSIT') }} R$ {{ data.amount }}
                    </view>
                    <view
                        class="primary-btn-disabled copybtn"
                        v-if="!data.pixCode"
                    >
                        {{ $t('KEY_COMMON_COPY') }}
                    </view>
                    <view
                        class="primary-btn copybtn"
                        :data-clipboard-text="data.pixCode"
                        v-else
                    >
                        {{ $t('KEY_COMMON_COPY') }}
                    </view>
                </view>
            </view>
        </view>
    </Layout>
</template>

<script lang="ts" setup>
    import { onMounted, reactive, ref } from 'vue'
    import Layout from '@/lib/layout/Base.vue'
    import { i18n } from '@/common/i18nConfig'
    import { onLoad } from '@dcloudio/uni-app'
    import { useUsersStore } from '@/store/userStore'
    import { ga } from '@/common/common'
    import QRCode from 'qrcode'
    import ClipboardJS from 'clipboard'
    import { modal } from '@/lib/components/Modal'

    const { t: $t } = i18n.global

    interface Data {
        title?: string
        pixCode: string
        qrcode: string
        amount: string
        isLoading: boolean
    }
    const data = reactive<Data>({
        title: 'Qrcode',
        pixCode: '',
        qrcode: '',
        amount: '0',
        isLoading: false,
    })

    const store = useUsersStore()

    const initQrcode = async () => {
        data.qrcode = await QRCode.toDataURL(data.pixCode)
        data.isLoading = true
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

    onLoad((options) => {
        data.pixCode = options.pixCode ? options.pixCode : ''
        data.amount = options.amount ? options.amount : 0
        initQrcode()
    })

    onMounted(() => {
        let clipboard = new ClipboardJS('.copybtn')
        console.log(clipboard)
        clipboard.on('success', function (e) {
            
            openDialog()
        })
    })
</script>

<style lang="scss">
    .scroll-view {
        @apply absolute left-0 right-0 bottom-0 overflow-y-auto;
        top: 0;
    }
    .channel-view {
        padding: 0 40rpx;
    }
    .tips {
        margin: 50rpx 0;
        font-size: 26rpx;
        color: #7c7c7c;
        line-height: 32rpx;
        // text-align: center;
    }
    .qrcode-view {
        @apply overflow-hidden;
        width: 350rpx;
        height: 350rpx;
        background: #fff;
        margin: 110rpx auto 86rpx;
        border-radius: 14rpx;
    }
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
        // margin-top: 170rpx;
    }

    .amount {
        font-size: 42rpx;
        font-weight: bold;
        color: #000000;
        text-align: center;
        margin-bottom: 40rpx;
    }
</style>
