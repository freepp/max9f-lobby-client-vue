<template>
    <view class="promotion-view">
        <!-- 首页中上部 -->
        <view class="flex justify-around" v-if="type === 1">
            <view
                class="promotion-item relative"
                @click="toEvent"
            >
                <Spine
                    ref="RefSpine1"
                    id="lspine1"
                    class="spine-player"
                    :skelName="getActivityAsset('home_spine_left')"
                    :assetsUrl="`./static/spinspine/index/promotions/`"
                    animName="animation"
                ></Spine>
                <!-- @onStart="start" -->
                <!-- <canvas
                    canvas-id="cvs"
                    id="cvs"
                    class="absolute top-0 left-0 w-full h-full"
                ></canvas> -->
                <view class="drawableAmount" :text="`R$ ${numberWithCommas(props?.drawableAmount || 0)}`">R$ {{ numberWithCommas(props?.drawableAmount || 0) }}</view>
            </view>
            <!-- <view v-else class="promotion-item" @click="toActivity">
                <Spine
                    v-if="data.activityCode === 100004 && hasSpine()"
                    id="lspine1"
                    class="spine-player"
                    skelName="banner1spine2"
                    :assetsUrl="`./static/spinspine/index/bottom_banner/`"
                    animName="animation"
                ></Spine>
                <Spine
                    v-if="data.activityCode === 100012 && hasSpine()"
                    id="lspine2"
                    class="spine-player"
                    skelName="sign_spine"
                    :assetsUrl="`./static/spinspine/index/promotions/`"
                    animName="animation"
                ></Spine>
                <Spine
                    v-if="data.activityCode === 100008 && hasSpine()"
                    id="lspine3"
                    class="spine-player"
                    skelName="meirichongzhi_banner_duan"
                    :assetsUrl="`./static/spinspine/index/promotions/`"
                    animName="animation"
                ></Spine>
                <Spine
                    v-if="!hasSpine()"
                    id="lspine0"
                    class="spine-player"
                    skelName="vip_spine"
                    :assetsUrl="`./static/spinspine/index/vip_spine/`"
                    animName="animation"
                ></Spine>
            </view> -->
            <view class="promotion-item" @click="toPromotions">
                <Spine
                    ref="RefSpine2"
                    id="rspine1"
                    class="spine-player"
                    :skelName="getActivityAsset('home_spine_right')"
                    :assetsUrl="`./static/spinspine/index/promotions/`"
                    animName="animation"
                ></Spine>
            </view>
        </view>
        <!-- 首页底部 -->
        <view class="promotion-line" v-if="type === 2" @click="toActivity">
            <Spine
                v-if="data.activityCode === 100004 && hasSpine()"
                id="bspine1"
                class="spine-player"
                skelName="banner1_long_spine"
                :assetsUrl="`./static/spinspine/index/bottom_banner/`"
                animName="animation"
            ></Spine>
            <Spine
                v-if="data.activityCode === 100012 && hasSpine()"
                id="bspine2"
                class="spine-player"
                skelName="sign_long_banner_spine"
                :assetsUrl="`./static/spinspine/index/promotions/`"
                animName="animation"
            ></Spine>
            <Spine
                v-if="data.activityCode === 100008 && hasSpine()"
                id="bspine3"
                class="spine-player"
                skelName="meirichongzhi_banner_chang"
                :assetsUrl="`./static/spinspine/index/promotions/`"
                animName="animation"
            ></Spine>
            <Spine
                v-if="!hasSpine()"
                id="bspine2"
                class="spine-player"
                skelName="vip_longspine"
                :assetsUrl="`./static/spinspine/index/vip_spine/`"
                animName="animation"
            ></Spine>
        </view>
        <!-- 面包页 -->
        <view class="promotion-burger" v-if="type === 3" @click="toActivity">
            <view v-if="hasSpine()">
                <image :src="data.imgUrl" mode="widthFix" />
            </view>
            <view v-if="!hasSpine()">
                <image src="@/static/burger/banner_vip.jpg" mode="widthFix" />
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
    import Spine from '@/lib/components/Spine/Spine.vue'
    import { getActivityAsset } from '@/common/activityAssets';
    import image from '@/static/index/zero_nine.png'
    import { numberWithCommas } from '@/common/common'

    const store = useUsersStore()

    interface Props {
        drawableAmount?: number
        data?: any
        type?: number
    }
    const props = withDefaults(defineProps<Props>(), {
        drawableAmount: null,
        data: {},
        type: 1,
    })
    const RefSpine1 = ref()
    const RefSpine2 = ref()
    const toEvent = () => {

        if (store.userInfo?.userMode === 2) {
            uni.navigateTo({
                url: '/pages/signin/index',
            })
        } else {
            uni.navigateTo({
                url: '/pages/login/index',
            })
        }
    }
    const toPromotions = () => {

        uni.navigateTo({
            // url: '/pages/promotions/index',
            // fail() {
            //     uni.switchTab({
            //         url: '/pages/promotions/index',
            //     })
            // },
            url: '/pages/activity_detail/index?activity_id=102001',
            fail() {
                uni.switchTab({
                    url: '/pages/activity_detail/index?activity_id=102001',
                })
            },
            // url: '/pages/agent/index',
            // fail() {
            //     uni.switchTab({
            //         url: '/pages/agent/index',
            //     })
            // },
        })
    }

    const getPoz = (num: number) => {
        // RS 宽度71rpx
        const elements = {
            rs: {
                x: 9,
                width: 72,
            },
            '.': {
                x: 474,
                width: 16,
            },
            ',': {
                x: 502,
                width: 14,
            },
            '0': {
                x: 432,
                width: 32,
            },
            '1': {
                x: 79,
                width: 22,
            },
            '2': {
                x: 112,
                width: 30,
            },
            '3': {
                x: 151,
                width: 30,
            },
            '4': {
                x: 191,
                width: 33,
            },
            '5': {
                x: 236,
                width: 31,
            },
            '6': {
                x: 276,
                width: 31,
            },
            '7': {
                x: 314,
                width: 31,
            },
            '8': {
                x: 354,
                width: 30,
            },
            '9': {
                x: 392,
                width: 30,
            },
        }
        const str = numberWithCommas(num)
        const poz = []
        // 18 设计稿的1/4 52是图片高度
        const heightRadio = uni.upx2px(36) / 52
        let startLeft = uni.upx2px(200)
        let allNumWidth = str.split('').reduce((prev, current) => {
            return prev + elements[current].width * heightRadio
        }, elements['rs'].width * heightRadio)
        // 宽度小于 168
        if (allNumWidth > uni.upx2px(168)) {
            startLeft = uni.upx2px(375) - uni.upx2px(20) - allNumWidth
        }
        poz.push([
            elements['rs'].x,
            0,
            elements['rs'].width,
            52,
            startLeft,
            uni.upx2px(72),
            elements['rs'].width * heightRadio,
            52 * heightRadio,
        ])
        startLeft += elements['rs'].width * heightRadio
        // 左对齐
        for (let i = 0; i < str.length; i++) {
            const charCode = str.charAt(i)
            poz.push([
                elements[charCode].x,
                0,
                elements[charCode].width,
                52,
                startLeft,
                uni.upx2px(72),
                elements[charCode].width * heightRadio,
                52 * heightRadio,
            ])
            startLeft += elements[charCode].width * heightRadio
        }
        return poz
    }
    const start = (num) => {
        const context = uni.createCanvasContext('cvs')
        // context.strokeText('9998877', 10, 10)
        // context.stroke()
        context.draw()
        if (num > 0) {
            const poz = getPoz(num)
            poz.forEach((item) => {
                context.drawImage(image, ...item)
                context.draw(true)
            })
        }
    }
    // watch(
    //     () => props.drawableAmount,
    //     () => {
    //         if (props.drawableAmount >= 0) {
    //             start(props.drawableAmount)
    //         }
    //     }
    // )
    const toActivity = () => {
        if (props.type === 1) {

        } else if (props.type === 2) {

        } else if (props.type === 3) {

        } else if (props.type === 4) {

        }
        if (store.userInfo && store.userInfo?.userMode !== 2) {
            uni.navigateTo({
                url: '/pages/login/index',
            })
            return
        }
        if (hasSpine()) {
            uni.navigateTo({
                url: props.data.activityUrl,
                fail() {
                    uni.switchTab({
                        url: props.data.activityUrl,
                    })
                },
            })
        } else {
            uni.navigateTo({
                url: '/pages/vip/index',
                fail() {
                    uni.switchTab({
                        url: '/pages/vip/index',
                    })
                },
            })
        }
    }
    const hasSpine = () => {
        return [100004, 100012, 100008].includes(props.data.activityCode)
    }

    const dispose = () => {
      RefSpine1.value?.dispose()
      RefSpine2.value?.dispose()
    }

    defineExpose({
      dispose,
    })

</script>
<style lang="scss">
    .promotion-view {
        // padding: 0rpx 23rpx;
        .promotion-item {
            width: 375rpx;
            image {
                width: 344rpx;
            }
            .spine-player {
                width: 375rpx;
                height: 137rpx;
            }
            .drawableAmount {
              position: absolute;
              top: 63rpx ;
              left: 198rpx;
              font-family: Impact;
              color: #FAE714;
              font-size: 38rpx;
              -webkit-text-stroke: 6rpx #0D0D0D;
              filter: drop-shadow(0 4rpx 0 #0D0D0D);
              &::before {
                content: attr(text);
                position: absolute;
                -webkit-text-stroke: 0;
              }
            }
        }
        .promotion-line {
            @apply w-full;
            .spine-player {
                height: 156rpx;
            }
        }
        .promotion-burger {
            image {
                @apply w-full;
            }
        }
    }
</style>
@/common/activityAssets
