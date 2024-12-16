<template>
    <view class="title">
        <view class="main-title">
            <view class="line">
                <img src="@/static/index/line.png" alt="" />
            </view>
            {{ categoryInfo.categoryName }}
        </view>
        <view class="show-more" @click="viewMore(categoryInfo)">
            <view class="text">{{ $t('KEY_INDEX_SHOWMORE') }}</view>
            <img src="@/static/icon/more.png" alt="" />
        </view>
    </view>
    <view
        class="relative"
        v-if="
            categoryInfo.template === 1 ||
            categoryInfo.template === 2 ||
            categoryInfo.template === 3
        "
    >
        <swiper
            class="swiper-box"
            :style="swiperHight"
            :current="data.current"
            @change="change"
        >
            <swiper-item v-for="(item, index) in data.swiperData" :key="index">
                <!-- <Template1
                    v-if="categoryInfo.template === 1"
                    :swiperPageData="item"
                /> -->
                <Template2
                    v-if="
                        categoryInfo.template === 1 ||
                        categoryInfo.template === 2 ||
                        categoryInfo.template === 3
                    "
                    :swiperPageData="item"
                />
                <!-- <Template3
                    v-else-if="categoryInfo.template === 3"
                    :swiperPageData="item"
                /> -->
            </swiper-item>
        </swiper>
        <view
            class="nav-btn prev-btn"
            v-if="data.current > 0"
            @click="() => next(0)"
        >
            <img src="@/static/icon/left.png" alt="" />
        </view>
        <view
            class="nav-btn next-btn"
            v-if="data.current < data.swiperData.length - 1"
            @click="() => next(1)"
        >
            <img src="@/static/icon/right.png" alt="" />
        </view>
    </view>
    <view v-else-if="categoryInfo.template === 5">
        <view v-for="(item, index) in data.swiperData" :key="index">
            <Template5
                v-if="categoryInfo.template === 5"
                :swiperPageData="item"
            />
        </view>
    </view>
    <view v-else-if="categoryInfo.template === 6">
        <view v-for="(item, index) in data.swiperData" :key="index">
            <Template6
                v-if="categoryInfo.template === 6"
                :swiperPageData="item"
            />
        </view>
    </view>
    <view v-else>
        <view v-for="(item, index) in data.swiperData" :key="index">
            <Template4
                v-if="categoryInfo.template === 4"
                :swiperPageData="item"
            />
        </view>
    </view>
</template>
<script lang="ts" setup>
    import { reactive, computed, onMounted, watch } from 'vue'
    import { CategoryDetailDto } from '@/NET/lobby/data-contracts'
    import Template1 from './Template1.vue'
    import Template2 from './Template2.vue'
    import Template3 from './Template3.vue'
    import Template4 from './Template4.vue'
    import Template5 from './Template5.vue'
    import Template6 from './Template6.vue'

    interface Props {
        categoryInfo?: CategoryDetailDto
    }

    const props = withDefaults(defineProps<Props>(), {
        categoryInfo: () => null,
    })

    const data = reactive<any>({
        pageIndex: 0,
        pageNumber: 6,
        swiperData: [],
        current: 0,
    })

    watch(
        () => props.categoryInfo,
        () => {
            initSwiperData()
        }
    )

    const swiperHight = computed(() => {
        let height = 0
        let items = props.categoryInfo.apps
        let row = Math.floor(items.length / 3)
        switch (props.categoryInfo.template) {
            case 1:
                // height = 730
                height = 310
                break
            case 2:
                height = 310
                break
            case 3:
                // height = 730
                height = 310
                break
            case 4:
                height = (310 + 10) * row + 10
                break
            case 5:
                height = (310 + 10) * row + 10
                break
            case 6:
                height = (310 + 10) * row + 10
                break
            default:
                height = 560
        }
        return { height: `${height}rpx` }
    })

    const initSwiperData = () => {
        data.swiperData = []
        data.current = 0
        let items = props.categoryInfo.apps
        switch (props.categoryInfo.template) {
            case 1:
                // data.pageNumber = 6
                data.pageNumber = 3
                break
            case 2:
                data.pageNumber = 3
                break
            case 3:
                // data.pageNumber = 5
                data.pageNumber = 3
                break
            default:
                data.pageNumber = 4
                break
        }

        if (
            props.categoryInfo.template === 4 ||
            props.categoryInfo.template === 5 ||
            props.categoryInfo.template === 6
        ) {
            let number = items.length
            data.swiperData[0] = []
            switch (props.categoryInfo.template) {
                case 5:
                    number = 6
                    break
                case 6:
                    number = 9
                    break
                default:
            }
            items.forEach((item, index) => {
                if (index < number) {
                    data.swiperData[0].push(item)
                }
            })
        } else {
            let indexNow = 0
            items.forEach((item, index) => {
                indexNow = Math.floor(index / data.pageNumber)
                if (index % data.pageNumber === 0) {
                    data.swiperData.push([])
                }
                data.swiperData[indexNow].push(item)
            })
        }
    }

    const next = (type) => {
        let length = data.swiperData.length
        if (!type) {
            if (data.current <= 0) return
            data.current--
        } else {
            if (data.current >= length - 1) return
            data.current++
        }
    }

    const viewMore = (info) => {
		 
        uni.navigateTo({
            url: `../../pages/gamelist/index?pageType=1&condition=${info.categoryID}&headerTitle=${info.categoryName}`,
        })
    }

    const change = (e) => {
        data.current = e.detail.current
    }

    onMounted(() => {
        initSwiperData()
    })
</script>
<style lang="scss">
    .title {
        @apply flex justify-between;
        padding: 20rpx 5rpx 20rpx;
        font-size: 26rpx;
    }
    .main-title {
        @apply flex items-center font-bold;
        font-weight: 28rpx;
    }
    .swiper-box {
        @apply relative;
        height: 400px;
    }

    .nav-btn {
        @apply absolute;
        width: 56rpx;
        img {
            @apply w-full;
        }
    }

    .prev-btn {
        @apply left-0;
        top: 50%;
        transform: translate(-32%, -50%);
    }

    .next-btn {
        @apply right-0;
        top: 50%;
        transform: translate(32%, -50%);
    }
    .line {
        @apply mx-2;
        height: 37rpx;
        img {
            @apply h-full;
        }
    }
    .show-more {
        @apply flex items-center;
        .text {
            @apply flex items-center justify-end;
            width: 160rpx;
        }
        img {
            height: 17rpx;
            margin-left: 11rpx;
        }
    }
</style>
