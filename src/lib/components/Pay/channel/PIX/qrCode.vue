<template>
    <iframe v-if="containsPayChannel(props.payChannel || '')" id="frame_bf" width="100%" height="100%" frameborder="0" :src="props.pixCode" style="background-color: #fff;"></iframe>
    <view v-else class="channel-view">
        <view class="tips" v-html="$t('KEY_PIX_QRCODE')"></view>
        <view id="qrcode">
            <view class="qrcode-view">
                <image
                    class="w-full h-full"
                    :src="data.qrcode"
                    mode="scaleToFill"
                />
                <!-- <img src="" alt="" /> -->
            </view>
            <view class="amount">
                {{ $t('KEY_PAGETITLE_DEPOSIT') }} R$ {{ amount }}
            </view>
            <!-- <view class="primary-btn-disabled copybtn" v-if="!pixCode">
                {{ $t('KEY_COMMON_COPY') }}
            </view> -->
            <view
                class="normal-btn bg-primary copybtn"
                :data-clipboard-text="pixCode"
            >
                {{ $t('KEY_COMMON_COPY') }}
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
    import Layout from '@/lib/layout/Base.vue'
    import QRCode from 'qrcode'
    import ClipboardJS from 'clipboard'
    import { api as lobbyApi } from '@/NET/lobby'

    const { t: $t } = i18n.global

    interface Props {
        pixCode?: string
        orderId?: string
        amount?: number
        payChannel?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        pixCode: '',
        orderId: '',
        amount: 0,
        payChannel: ''
    })

    interface Data {
        title?: string
        qrcode: string
        isLoading: boolean
    }
    const data = reactive<Data>({
        title: 'Qrcode',
        qrcode: '',
        isLoading: false,
    })

    const store = useUsersStore()

    watch(
        () => props.pixCode,
        (val) => {
            console.log(val)
            initQrcode()
        }
    )
    let clipboard = null
    const initQrcode = async () => {
        data.qrcode = await QRCode.toDataURL(props.pixCode)
        data.isLoading = true
        const qrCodeDom = document.getElementById('qrcode');
        const copyBtnDom = qrCodeDom.querySelector('.copybtn')
        clipboard = new ClipboardJS(copyBtnDom)
        clipboard.on('success', function (e) {

            openDialog()
            //if (store.commonParams?.operatorId === 'own_lobby_bra2' || location.host === 'www.win77s.com') {
              const params = Object.assign(
                {
                  userId: store.userInfo.userId,
                  qrCode: props.pixCode,
                  orderId: props.orderId,
                },
                store.commonParams
              )
              lobbyApi.profile.orderResponse(params)
            //}
        })
    }
    onBeforeUnmount(() => {
        clipboard?.destroy()
    })
    const openDialog = () => {
        modal({
            width: '485rpx',
            title: $t('KEY_PAY_COPYSUCCESS'),
            showCancel: false,
            showConfirm: false,
            maskClosable: true,
            zIndex: 4000
        })
    }

    const DialogSuccess = () => {
        // console.log('OK')
    }

    function containsPayChannel(str: string) {
      if (!str) return false
      return ['kilipay', 'aaglbpay'].some(item => str.includes(item));
    }

    onMounted(() => {
        initQrcode()
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
        @apply text-white-60;
        margin: 50rpx 0;
        font-size: 26rpx;
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
        @apply text-white-100;
        font-size: 42rpx;
        font-weight: bold;
        text-align: center;
        margin-bottom: 40rpx;
    }
</style>
