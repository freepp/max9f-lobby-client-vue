<template>
    <view class="swiper-view">
        <uni-swiper-dot
            class="swiper-dot"
            :info="data.progressData"
            :current="data.current"
            :dotsStyles="{
                selectedBackgroundColor: '#fff',
                backgroundColor: '#fff',
            }"
            field="content"
            :mode="data.mode"
        >
            <swiper class="swiper-box" @change="change" :current="data.current">
                <swiper-item
                    v-for="(item, index) in data.progressData"
                    :key="index"
                >
                    <view class="swiper-item" :class="'swiper-item' + index">
                        <view class="progress-view">
                            <view class="line">
                                <view
                                    class="progress"
                                    :style="{
                                        width: item.progressWidth + 'rpx',
                                    }"
                                ></view>
                            </view>
                            <view class="icon-view">
                                <view
                                    v-for="(icons, indexs) in item.vipIcons"
                                    :key="index"
                                >
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V1'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV1.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV1-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V2'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV2.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV2-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V3'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV3.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV3-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V4'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV4.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV4-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V5'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV5.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV5-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V6'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV6.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV6-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V7'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV7.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV7-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V8'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV8.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV8-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V9'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV9.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV9-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V10'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV10.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV10-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V11'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV11.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV11-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V12'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV12.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV12-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V13'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV13.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV13-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V14'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV14.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV14-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V15'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV15.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV15-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V16'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV16.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV16-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V17'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV17.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV17-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V18'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV18.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV18-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V19'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV19.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV19-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V20'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV20.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV20-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V21'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV21.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV21-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V22'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV22.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV22-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V23'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV23.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV23-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V24'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV24.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV24-disable.png"
                                            alt=""
                                        />
                                    </view>
                                    <view
                                        class="vip-icon"
                                        :class="{
                                            'icon-choosed': icons.choosed,
                                        }"
                                        v-if="icons.img === 'V25'"
                                    >
                                        <img
                                            v-if="icons.choosed"
                                            src="@/static/vip/small/xiaoV25.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="@/static/vip/small/xiaoV25-disable.png"
                                            alt=""
                                        />
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </swiper-item>
            </swiper>
        </uni-swiper-dot>
        <view class="control-view">
            <view class="left-view" v-if="data.current !== 0">
                <img
                    src="@/static/icon/jiantou_L.png"
                    alt=""
                    @click="next(0)"
                />
            </view>
            <view class="left-view" v-else>
                <img src="@/static/icon/jiantou_L_disable.png" alt="" />
            </view>
            <view
                class="right-view"
                v-if="data.current !== data.progressData.length - 1"
            >
                <img
                    src="@/static/icon/jiantou_R.png"
                    alt=""
                    @click="next(1)"
                />
            </view>
            <view class="right-view" v-else>
                <img src="@/static/icon/jiantou_R_disable.png" alt="" />
            </view>
        </view>
    </view>
    <LoadingPopup
        ref="RefLoadingPopup"
        :successBtnText="$t('KEY_COMMON_OK')"
        @onSuccess="DialogSuccess"
    />
</template>
<script lang="ts" setup>
    import { onMounted, reactive, ref, watch } from 'vue'
    import { ga } from '@/common/common'
    import { api as lobbyApi } from '@/NET/lobby'
    import { ErrorHandler } from '@/common/ErrorHandler'
    import { useUsersStore } from '@/store/userStore'
    import _ from 'lodash'
    import LoadingPopup from '@/lib/components/LoadingPopup.vue'
    const store = useUsersStore()

    type T = {
        content: string
        imageUrl: string
    }

    interface Props {
        index?: number
        bannerData?: Array<T>
    }

    const props = withDefaults(defineProps<Props>(), {
        index: 1,
        bannerData: () => [],
    })

    const data = reactive<any>({
        current: 0,
        mode: 'default',
        progressData: [
            {
                progressWidth: 0,
                vipIcons: [
                    {
                        img: 'V1',
                        choosed: false,
                    },
                    {
                        img: 'V2',
                        choosed: false,
                    },
                    {
                        img: 'V3',
                        choosed: false,
                    },
                    {
                        img: 'V4',
                        choosed: false,
                    },
                    {
                        img: 'V5',
                        choosed: false,
                    },
                ],
            },
            {
                progressWidth: 0,
                vipIcons: [
                    {
                        img: 'V6',
                        choosed: false,
                    },
                    {
                        img: 'V7',
                        choosed: false,
                    },
                    {
                        img: 'V8',
                        choosed: false,
                    },
                    {
                        img: 'V9',
                        choosed: false,
                    },
                    {
                        img: 'V10',
                        choosed: false,
                    },
                ],
            },
            {
                progressWidth: 0,
                vipIcons: [
                    {
                        img: 'V11',
                        choosed: false,
                    },
                    {
                        img: 'V12',
                        choosed: false,
                    },
                    {
                        img: 'V13',
                        choosed: false,
                    },
                    {
                        img: 'V14',
                        choosed: false,
                    },
                    {
                        img: 'V15',
                        choosed: false,
                    },
                ],
            },
            {
                progressWidth: 0,
                vipIcons: [
                    {
                        img: 'V16',
                        choosed: false,
                    },
                    {
                        img: 'V17',
                        choosed: false,
                    },
                    {
                        img: 'V18',
                        choosed: false,
                    },
                    {
                        img: 'V19',
                        choosed: false,
                    },
                    {
                        img: 'V20',
                        choosed: false,
                    },
                ],
            },
            {
                progressWidth: 0,
                vipIcons: [
                    {
                        img: 'V21',
                        choosed: false,
                    },
                    {
                        img: 'V22',
                        choosed: false,
                    },
                    {
                        img: 'V23',
                        choosed: false,
                    },
                    {
                        img: 'V24',
                        choosed: false,
                    },
                    {
                        img: 'V25',
                        choosed: false,
                    },
                ],
            },
        ],
    })

    const RefLoadingPopup = ref()

    const change = (e) => {
        data.current = e.detail.current
    }

    const next = (type) => {
        let length = data.progressData.length
        if (!type) {
            if (data.current <= 0) return
            data.current--
        } else {
            if (data.current >= length - 1) return
            data.current++
        }
    }

    const DialogSuccess = () => {}

    const initProgress = (vip, progress) => {
        const iconW = 60
        const lineW = 90
        const screenW = 750
        data.progressData.forEach((item, index) => {
            if (
                vip / 5 > index + 1 ||
                (vip / 5 === index + 1 && progress > 0.5)
            ) {
                item.progressWidth = screenW
            } else if (index > vip / 5) {
                item.progressWidth = 0
            } else {
                let thisIndex = vip - index * 5 - 1
                let progressW = lineW * progress

                if (vip % 5 === 0) {
                    if (progress > 0.5) {
                        if (index === vip / 5) {
                            progressW = lineW * (progress - 0.5)
                        } else {
                            progressW = lineW / 2
                        }

                        item.progressWidth = lineW * (progress - 0.5)
                    } else {
                        item.progressWidth =
                            lineW / 2 +
                            (iconW + lineW) * thisIndex +
                            iconW +
                            progressW
                    }
                } else {
                    item.progressWidth =
                        lineW / 2 +
                        (iconW + lineW) * thisIndex +
                        iconW +
                        progressW
                }
            }
            item.vipIcons.forEach((icon, indexs) => {
                if (5 * index + indexs + 1 <= vip) {
                    icon.choosed = true
                } else {
                    icon.choosed = false
                }
            })
        })
        data.current = _.ceil(vip / 5) - 1
    }

    watch(
        () => store.userInfo?.upgradeHasBet,
        (val) => {
            if (store.userInfo?.userMode === 1) return
            initProgress(
                store.userInfo?.vip === 0 ? 1 : store.userInfo?.vip,
                store.userInfo?.upgradeHasBet /
                    store.userInfo?.upgradeRequireBet
            )
        }
    )

    onMounted(() => {
        if (store.userInfo?.upgradeRequireBet) {
            if (store.userInfo?.userMode === 1) return
            initProgress(
                store.userInfo?.vip === 0 ? 1 : store.userInfo?.vip,
                store.userInfo?.upgradeHasBet /
                    store.userInfo?.upgradeRequireBet
            )
        }
    })
</script>
<style lang="scss">
    .swiper-view {
        @apply relative;
        height: 100%;
    }
    .swiper-dot {
        height: 100%;
    }
    .swiper-box {
        height: 100%;
    }

    .swiper-item {
        @apply w-full h-full;
        color: #fff;
    }
    .progress-view {
        @apply flex justify-center items-center;
        height: 160rpx;
    }

    .line {
        width: 100%;
        height: 6rpx;
        background: #111112;
        .progress {
            width: 50%;
            height: 6rpx;
            background: #f82e49;
        }
    }
    .icon-view {
        @apply flex justify-around w-full absolute;
        .vip-icon {
            @apply box-border;
            width: 60rpx;
            height: 60rpx;
            img {
                @apply w-full;
            }
        }
        .icon-choosed {
            border: 4rpx solid #f82e49;
            border-radius: 50%;
        }
    }
    .control-view {
        @apply flex justify-between items-center absolute w-full box-border;
        padding: 0 26rpx;
        bottom: 20rpx;
        left: 0;
        .left-view,
        .right-view {
            @apply flex justify-center items-center;
            width: 30rpx;
            img {
                width: 18rpx;
            }
        }
    }
</style>
