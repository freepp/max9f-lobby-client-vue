<template>
    <view class="task-view">
        <!-- <view class="tab-view">
            <view
                class="tab-items"
                v-for="(item, index) in data.tabData"
                :key="index"
                :class="{ 'item-choosed': index === data.chooseIndex }"
                @click="() => chooseItem(index)"
            >
                {{ item.name }}
            </view>
        </view> -->
        <view class="scroll-view">
            <NoData
                v-show="data.tasksData.length === 0"
                class="no-data"
                :message="$t('KEY_COMMON_NODATA')"
            ></NoData>

            <view>
                <view
                    class="task-detail"
                    v-for="(item, index) in data.tasksData"
                >
                    <view class="img-view">
                        <img :src="data.taskType[item.itemID].iconUrl" alt="" />
                    </view>
                    <view class="text-view">
                        <text>{{ item.template }}</text>
                    </view>
                    <view class="control-view">
                        <view
                            v-if="item.status === 0"
                            class="normal-btn btn-view bg-primary"
                            @click="toDo(item.itemID)"
                        >
                            {{ $t('KEY_SIGNIN_PROCEED') }}
                        </view>
                        <view
                            v-else-if="item.status === 1"
                            class="normal-btn btn-view bg-primary"
                            @click="receiveReward(item.detailID)"
                        >
                            {{ $t('KEY_SIGNIN_OPEN') }}
                        </view>
                        <view
                            v-else
                            class="normal-btn btn-view disabled bg-default"
                        >
                            {{ $t('KEY_SIGNIN_SIGNEDIN') }}
                        </view>
                        <view class="bonus">
                            R$
                            {{
                                numberWithCommas(_.floor(item.rewardAmount, 2))
                            }}
                        </view>
                    </view>
                </view>
            </view>
            <view class="block"></view>
        </view>
        <BindMobile
            ref="RefBindMobile"
            @bindSuccess="bindSuccess"
            :showIcon="false"
        ></BindMobile>
    </view>
</template>

<script lang="ts" setup>
    import NoData from '@/lib/components/NoData.vue'
    import BindMobile from '@/lib/components/BindMobile/index.vue'
    // import { api as lobbyApi } from '@/NET/lobby'
    import { api as activityApi } from '@/NET/activity'
	import { queryURLParams } from '@/common/common'
    import DownloadIcon from '@/static/signin/download-app-icon.png'
    import BandIcon from '@/static/signin/banding-icon.png'
    import TelegramIcon from '@/static/signin/telegram-icon.png'
    import FacebookIcon from '@/static/signin/facebook-icon.png'
    import ShareIcon from '@/static/signin/share-icon.png'
    import DepositIcon from '@/static/signin/deposit-icon.png'
    import BetIcon from '@/static/signin/bet-icon.png'
    import { numberWithCommas, ga } from '@/common/common'
    import _ from 'lodash'
    import { GET_CHANNEL_DATA } from '@/common/init';

    const { t: $t } = i18n.global
    const store = useUsersStore()
    const commonStore = useCommonStore()
    const RefBindMobile = ref()

    interface Props {
        pageType?: number
    }
    const props = withDefaults(defineProps<Props>(), {
        pageType: 1,
    })

    interface Data {
        chooseIndex: number
        tabData: any
        tasksData: any
        taskType: any
    }
    const data = reactive<Data>({
        chooseIndex: 0,
        tabData: [
            {
                name: $t('KEY_TASKS_TABITEM1'),
            },
            {
                name: $t('KEY_TASKS_TABITEM2'),
            },
            {
                name: $t('KEY_TASKS_TABITEM3'),
            },
        ],
        tasksData: [],
        taskType: {
            100018: {
                iconUrl: DownloadIcon,
                content: '',
                desc: 'App下载登录',
            },
            100019: {
                iconUrl: BandIcon,
                content: '',
                desc: '绑定手机号',
            },
            100020: {
                iconUrl: TelegramIcon,
                content: '',
                desc: '进入tele频道',
            },
            100021: {
                iconUrl: FacebookIcon,
                content: '',
                desc: '关注facebook主页',
            },
            100022: {
                iconUrl: ShareIcon,
                content: '',
                desc: '邀请好友奖励',
            },
            100023: {
                iconUrl: DepositIcon,
                content: '',
                desc: '累计日存款',
            },
            100024: {
                iconUrl: DepositIcon,
                content: '',
                desc: '累计周存款',
            },
            100025: {
                iconUrl: DepositIcon,
                content: '',
                desc: '累计月存款',
            },
            100026: {
                iconUrl: DepositIcon,
                content: '',
                desc: '当日有存款',
            },
            100027: {
                iconUrl: BetIcon,
                content: '',
                desc: '当日下注',
            },
            100028: {
                iconUrl: BetIcon,
                content: '',
                desc: '当周下注',
            },
            100029: {
                iconUrl: BetIcon,
                content: '',
                desc: '当月下注',
            },
        },
    })

    const chooseItem = (index) => {
        data.chooseIndex = index
    }

    const getTaskList = async () => {
        let urlParams = queryURLParams()

        let isApp = urlParams.isApp;
        if(isApp == undefined){
            isApp = uni.getStorageSync('isApp');
        }
        let params = Object.assign(
		    {
				DeviceId: commonStore.deviceInfo?.deviceId,
			},
            {
                userId: store.userInfo.userId,
                isApp: isApp == 'true'
            },
            store.commonParams,
        )

        // let res = await lobbyApi.task.getTaskList(params)
        let res = await activityApi.task.taskGetTaskListCreate(params)
        if (res.success) {
          const isDownload = GET_CHANNEL_DATA().isDownload
          data.tasksData = res.result?.filter(e => !(e.itemID === 100018 && !isDownload)) || []
            // data.tasksData = res.result
        } else {
            ErrorHandler(res, 'getTaskList')
        }
    }

    const receiveReward = async (detailId) => {

        let urlParams = queryURLParams()

        let isApp = urlParams.isApp;
        if(isApp == undefined){
            isApp = uni.getStorageSync('isApp');
        }
        let params = Object.assign(
		    {
		    	DeviceId: commonStore.deviceInfo?.deviceId,
		    },

            {
                userId: store.userInfo.userId,
                detailId,
                isApp: isApp == 'true'
            },
            store.commonParams
        )
        let res = await activityApi.task.taskReceiveRewardCreate(params)
        if (res.success) {

            modal({
                type: 'success',
                width: '500rpx',
                title: $t('KEY_POPUP_TIPS'),
                content: $t('KEY_SIGNIN_SIGNEDIN'),
                confirmText: 'OK',
                onConfirm: () => {
                    getTaskList()
                },
                showCancel: false,
            })
        } else {
            ErrorHandler(res, 'receiveReward')
            modal({
                type: 'warning',
                width: '500rpx',
                title: $t('KEY_POPUP_TIPS'),
                content: $t('KEY_SIGNIN_CLAIMFAILED'),
                confirmText: 'OK',
                showCancel: false,
            })
        }
    }

    const toTelegram = () => {
        // 默认lucro777
        let url = 'https://t.me/lucro777'
        if (location.host.includes('sorteslots.com')) {
            url = 'https://t.me/cassinosorte'
        } else if (location.host.includes('upupbet.com')) {
            url = 'https://t.me/cassinoupup'
        }
        // @ts-ignore
        if (window.android) {
            // @ts-ignore
            window.android.ShareChannel(url)
        } else {
            window.open(url)
        }
    }
    const toFacebook = () => {
        // 默认lucro777
        let url = 'https://www.facebook.com/100092751038282'
        if (location.host.includes('sorteslots.com')) {
            url = 'https://www.facebook.com/profile.php?id=100091302727361'
        } else if (location.host.includes('upupbet.com')) {
            url = 'https://www.facebook.com/100076778317949'
        }
        // @ts-ignore
        if (window.android) {
            // @ts-ignore
            window.android.ShareChannel(url)
        } else {
            window.open(url)
        }
    }

    const toDo = (itemID) => {
        console.log(itemID)
        switch (itemID) {
            case 100018:
                navTo('/pages/download/index')
                break
            case 100019:

                RefBindMobile.value.openDialog(!store.userInfo?.setPass)
                break
            case 100020:
                toTelegram()
                break
            case 100021:
                toFacebook()
                break
            case 100022:
                navTo('/pages/agent/index')
                break
            case 100023:
                navTo('/pages/deposit/index')
                break
            case 100024:
                navTo('/pages/deposit/index')
                break
            case 100025:
                navTo('/pages/deposit/index')
                break
            case 100026:
                navTo('/pages/deposit/index')
                break
            case 100027:
                navTo('/pages/index/index')
                break
            case 100028:
                navTo('/pages/index/index')
                break
            case 100029:
                navTo('/pages/index/index')
                break
            default:
        }
    }

    const navTo = (url) => {
        if (url === '/pages/deposit/index') {
          commonStore.depositTab = 0
        }
        uni.navigateTo({
            url,
            fail() {
                uni.switchTab({
                    url,
                })
            },
        })
    }

    const bindSuccess = () => {
        getTaskList()

    }

    watch(
        () => store.userInfo,
        (val) => {
            initData()
        }
    )
    const initData = () => {
        if (store.userInfo) {
            getTaskList()
        }
    }

    onMounted(() => {
        initData()
    })
</script>

<style lang="scss">
    .task-view {
        // @apply w-full absolute;
        top: 340rpx;
        bottom: 0;
        @apply w-full;
        margin-top: 14rpx;

        .tab-view {
            @apply flex items-center justify-around w-full box-border;
            margin-top: 40rpx;
            height: 80rpx;

            .tab-items {
                @apply flex items-center h-full box-border flex-1 justify-center text-white-80 text-center;
                border-bottom: 8rpx solid transparent;
                margin: 0 20rpx;
                font-size: 33rpx;
                font-weight: 400;
                font-size: 28rpx;
                padding: 12rpx 0;
            }
            .item-choosed {
                @apply text-white-100;
                border-bottom: 7rpx solid;
                border-color: var(--primary-color);
            }
        }
        .scroll-view {
            @apply h-full overflow-y-scroll;
            padding-bottom: 20rpx;
            padding: 0 40rpx;

            .no-data {
                margin-top: 120rpx;
            }

            .task-detail {
                @apply w-full flex justify-between items-center box-border;
                background: #1b1c1c;
                border-radius: 8rpx;
                padding: 10rpx 20rpx;
                margin-top: 18rpx;
                .img-view {
                    @apply flex items-center justify-center;
                    width: 74rpx;
                    height: 74rpx;
                    img {
                        @apply w-full;
                    }
                }
                .text-view {
                    width: 340rpx;
                    font-size: 22rpx;
                    color: #ffffff;
                }
                .control-view {
                    @apply flex flex-col items-center justify-center;
                    .btn-view {
                        width: 140rpx;
                        height: 56rpx;
                        font-size: 22rpx;
                    }
                    .bonus {
                        font-size: 28rpx;
                        color: #fff000;
                        margin-top: 10rpx;
                    }
                }
            }
        }
        .block {
            height: 50rpx;
        }
    }
</style>
