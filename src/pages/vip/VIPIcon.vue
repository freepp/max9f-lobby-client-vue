<template>
    <view class="icon-view">
        <view class="bg-img">
            <view class="vip-img" v-if="store.userInfo?.userMode !== 1">
                <img
                    v-if="vip === 0 || vip === 1"
                    src="@/static/vip/large/V1.png"
                    alt=""
                />
                <img v-if="vip === 2" src="@/static/vip/large/V2.png" alt="" />
                <img v-if="vip === 3" src="@/static/vip/large/V3.png" alt="" />
                <img v-if="vip === 4" src="@/static/vip/large/V4.png" alt="" />
                <img v-if="vip === 5" src="@/static/vip/large/V5.png" alt="" />
                <img v-if="vip === 6" src="@/static/vip/large/V6.png" alt="" />
                <img v-if="vip === 7" src="@/static/vip/large/V7.png" alt="" />
                <img v-if="vip === 8" src="@/static/vip/large/V8.png" alt="" />
                <img v-if="vip === 9" src="@/static/vip/large/V9.png" alt="" />
                <img
                    v-if="vip === 10"
                    src="@/static/vip/large/V10.png"
                    alt=""
                />
                <img
                    v-if="vip === 11"
                    src="@/static/vip/large/V11.png"
                    alt=""
                />
                <img
                    v-if="vip === 12"
                    src="@/static/vip/large/V12.png"
                    alt=""
                />
                <img
                    v-if="vip === 13"
                    src="@/static/vip/large/V13.png"
                    alt=""
                />
                <img
                    v-if="vip === 14"
                    src="@/static/vip/large/V14.png"
                    alt=""
                />
                <img
                    v-if="vip === 15"
                    src="@/static/vip/large/V15.png"
                    alt=""
                />
                <img
                    v-if="vip === 16"
                    src="@/static/vip/large/V16.png"
                    alt=""
                />
                <img
                    v-if="vip === 17"
                    src="@/static/vip/large/V17.png"
                    alt=""
                />
                <img
                    v-if="vip === 18"
                    src="@/static/vip/large/V18.png"
                    alt=""
                />
                <img
                    v-if="vip === 19"
                    src="@/static/vip/large/V19.png"
                    alt=""
                />
                <img
                    v-if="vip === 20"
                    src="@/static/vip/large/V20.png"
                    alt=""
                />
                <img
                    v-if="vip === 21"
                    src="@/static/vip/large/V21.png"
                    alt=""
                />
                <img
                    v-if="vip === 22"
                    src="@/static/vip/large/V22.png"
                    alt=""
                />
                <img
                    v-if="vip === 23"
                    src="@/static/vip/large/V23.png"
                    alt=""
                />
                <img
                    v-if="vip === 24"
                    src="@/static/vip/large/V24.png"
                    alt=""
                />
                <img
                    v-if="vip === 25"
                    src="@/static/vip/large/V25.png"
                    alt=""
                />
            </view>
            <view class="vip-img" v-else>
                <img src="@/static/vip/large/V1-disable.png" alt="" />
            </view>
            <img src="@/static/vip/dizuo.png" alt="" />
        </view>
    </view>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import { useUsersStore } from '@/store/userStore'

    const store = useUsersStore()

    interface Props {
        vip?: number
    }
    const props = withDefaults(defineProps<Props>(), {
        vip: 1,
    })

    interface Data {
        title?: string
    }
    const data = reactive<Data>({
        title: 'Logo',
    })
    const emit = defineEmits(['parentFun'])
    const RefMessage = ref()

    const test = () => {
        emit('parentFun')
        RefMessage.value.messageToggle({
            type: 'error',
            message: 'test',
        })
    }
</script>

<style lang="scss">
    .icon-view {
        @apply absolute;
        bottom: -80rpx;
        left: 50%;
        transform: translate(-50%);

        .bg-img {
            @apply relative flex justify-center items-center;
            width: 280rpx;
            img {
                width: 136%;
            }
            .vip-img {
                @apply absolute flex justify-center items-center overflow-hidden;
                transform: translate(-50%);
                left: 50%;
                bottom: 160rpx;
                width: 200rpx;
                img {
                    width: 120%;
                }
            }
        }
        img {
            @apply w-full;
        }
    }
</style>
