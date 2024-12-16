<template>
    <view class="relative" v-if="!data.isLoading">
        <view
            class="card-select-view"
            @click.stop="openDrowbox"
            v-if="data.bankList.length > 0"
        >
            <view class="card-number">
                {{ data.chooseItem.cardNo }}
            </view>

            <view class="icon">
                <img
                    v-if="!data.showDropbox"
                    src="@/static/icon/down.png"
                    alt=""
                />
                <img v-else src="@/static/icon/up.png" alt="" />
            </view>
        </view>
        <view
            class="card-select-view add"
            @click.stop="() => openPop(true)"
            v-else
        >
            + {{ $t('KEY_PAY_ADDCARD') }}
        </view>
        <view class="dropDown-view" v-if="data.showDropbox" id="dropdownbox">
            <view
                v-for="(item, index) in data.bankList"
                :key="index"
                class="dropDown-item"
                @click="() => chooseCard(item)"
            >
                <view class="icon">
                    <img
                        v-if="item.bankType === 1 && checkCards"
                        src="@/static/icon/waring_solid.png"
                        alt=""
                    />
                </view>
                <view
                    class="text"
                    :class="{ disable: item.bankType === 1 && checkCards }"
                >
                    {{ item.cardNo }}
                </view>
                <view class="icon">
                    <img
                        v-if="item.userBankID !== data.chooseItem.userBankID"
                        src="@/static/icon/check_light.png"
                        alt=""
                    />
                    <img v-else src="@/static/icon/checked_light.png" alt="" />
                </view>
            </view>
            <view class="dropDown-item add" @click="() => openPop(true)">
                + {{ $t('KEY_PAY_ADDCARD') }}
            </view>
        </view>
        <PopupBottom ref="RefPopup" :height="720">
            <view class="personal-title">
                {{ $t('KEY_PAGETITLE_ADDCARD') }}
            </view>
            <CardInfo
                class="cardInfo"
                @confirm="cardConfirm"
                :page-type="pageType"
                :dark="false"
                :noCashLoad="noCashLoad"
            />
        </PopupBottom>
    </view>
</template>

<script lang="ts" setup>
    import { reactive, ref, onMounted, watch, nextTick } from 'vue'
    import CardInfo from '@/lib/components/CardInfo/index.vue'
    import PopupBottom from '@/lib/components/PopupBottom/index.vue'
    import { api as lobbyApi } from '@/NET/lobby'
    import { onShow } from '@dcloudio/uni-app'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import { ga } from '@/common/common'
    const store = useUsersStore()

    interface Props {
        payType?: number
        pageType?: number
        payParams?: any
        checkCards?: boolean
        noCashLoad?: boolean
    }
    const props = withDefaults(defineProps<Props>(), {
        payType: 0, // 0充值 1提现
        pageType: 1,
        payParams: {},
        checkCards: false,
        noCashLoad: false
    })

    interface Data {
        sortType: number
        bankList: any
        showDropbox: boolean
        chooseItem: any
        isLoading: boolean
    }
    const data = reactive<Data>({
        sortType: 1,
        bankList: [],
        showDropbox: false,
        chooseItem: {},
        isLoading: true,
    })

    const RefPopup = ref()

    const openDrowbox = () => {
        data.showDropbox = !data.showDropbox
    }

    const openPop = (type) => {
        data.showDropbox = false
        RefPopup.value.changeIsShow(type)
    }

    const cardConfirm = () => {
        openPop(false)
        initData()
    }

    const getBanks = async () => {
        data.isLoading = true
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
                sortType: props.checkCards ? 2 : 1,
            },
            store.commonParams
        )
        let res = await lobbyApi.profile.getBanks(params)
        if (res.success) {
            data.bankList = res.result ? res.result : []
            if (data.bankList.length > 0) {
                chooseCard(data.bankList[0])
            }
        } else {
            ErrorHandler(res, 'getBanks')
        }
        data.isLoading = false
    }

    const getBraBanks = async () => {
        data.isLoading = true
        let params = Object.assign(
            {
                userId: store.userInfo.userId,
            },
            store.commonParams
        )
        // let res = await lobbyApi.profile.getBraBanks(params)
        let res = await lobbyApi.profile.getBanks(params)
        if (res.success) {
            data.bankList = res.result ? res.result : []
            if (data.bankList.length > 0) {
                chooseCard(data.bankList[0])
            }
        } else {
            ErrorHandler(res, 'getBanks')
        }
        data.isLoading = false
    }

    const chooseCard = (item) => {
        
        // if (item.bankType === 1 && props.checkCards) return
        data.chooseItem = item
        data.showDropbox = false
        props.payParams.cardNo = data.chooseItem.cardNo
        props.payParams.userName = data.chooseItem.userName
        props.payParams.accName = data.chooseItem.accName
        props.payParams.userBankID = data.chooseItem.userBankID
        props.payParams.bankType = data.chooseItem.bankType
        props.payParams.bankCode = data.chooseItem.bankCode
        props.payParams.bankName = data.chooseItem.bankName
        props.payParams.channels = data.chooseItem.channels
    }

    const initData = async () => {
        if (store.userInfo) {
            if (store.commonParams?.countryId === 'BRA') {
                getBraBanks()
            } else {
                getBanks()
            }
        }
    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )

    onMounted(() => {
        nextTick(() => {
            document.addEventListener(
                'click',
                (e) => {
                    const target = e.target as HTMLElement
                    let cardSelectView =
                        document.getElementsByClassName('card-select-view')[0]
                    let cardNumberView =
                        document.getElementsByClassName('card-number')[0]
                    let dropdownView = document.getElementById('dropdownbox')
                    if (target === cardSelectView) return
                    if (target === cardNumberView) return
                    if (!dropdownView) return

                    if (!dropdownView.contains(target)) {
                        data.showDropbox = false
                    }
                },
                true
            )
        })
    })

    onShow(() => {
        initData()
    })
    defineExpose({
        openPop,
        initData
    })
</script>

<style lang="scss">
    .personal-title {
        @apply flex items-center justify-center;
        font-size: 33rpx;
        font-weight: bold;
        color: #454545;
        height: 100rpx;
    }
    .cardInfo {
        @apply absolute left-0 right-0 bottom-0 overflow-y-auto;
        top: 100rpx;
    }
    .card-select-view {
        @apply flex justify-center items-center relative bg-black-60 text-white-100;
        height: 90rpx;
        border-radius: 7rpx;
        font-size: 33rpx;
        font-weight: bold;
        .card-number {
            @apply truncate text-center;
            width: 400rpx;
        }
        .icon {
            @apply absolute flex justify-center items-center;
            right: 20rpx;
            width: 20rpx;
            img {
                @apply w-full;
            }
        }
    }
    .dropDown-view {
        @apply absolute left-0 z-20 w-full bg-black-60 overflow-hidden overflow-y-auto;
        // border-top: 2rpx solid #000;
        border-radius: 0 0 8rpx 8rpx;
        top: 89rpx;
        box-shadow: 0px 12rpx 12rpx rgba(0, 0, 0, 0.3);
        max-height: 320rpx;

        .dropDown-item {
            @apply flex justify-center items-center text-white-100;
            height: 90rpx;
            font-weight: bold;
            font-size: 33rpx;
            .text {
                @apply truncate;
                width: 400rpx;
                margin: 0 20rpx 0 10rpx;
                text-align: center;
            }
            .disable {
                opacity: 0.6;
            }
            .icon {
                @apply flex justify-center items-center;
                width: 30rpx;
                img {
                    @apply w-full h-full;
                }
            }
        }
        .add {
            @apply bg-primary;
            color: #ffffff;
        }
    }
    .add {
        @apply bg-primary;
        color: #ffffff;
    }
</style>
