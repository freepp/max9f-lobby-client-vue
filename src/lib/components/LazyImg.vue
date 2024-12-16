<template>
    <view class="img-box" v-bind:[seed]="seed" :style="customStyles">
        <img v-if="visible && !mode" :src="src" :alt="alt" />
        <image
            v-if="visible && mode"
            :src="src"
            :mode="mode"
            :style="customStyles"
        ></image>
    </view>
</template>
<script lang="ts" setup>
    import {
        ref,
        computed,
        onMounted,
        getCurrentInstance,
        CSSProperties,
    } from 'vue'
    interface Props {
        src?: string
        alt?: string
        mode?: string
        style?: CSSProperties
    }
    const props = withDefaults(defineProps<Props>(), {
        src: '',
        alt: '',
        mode: '',
        style: null,
    })
    const { proxy } = getCurrentInstance()
    const visible = ref(false)
    const seed = `lazy-img-${Math.round(Math.random() * 10000)}`
    const customStyles = computed(() => {
        return props.style
    })
    onMounted(() => {
        const observer = uni.createIntersectionObserver(proxy.$parent)
        observer.relativeToViewport({
            bottom: 0,
        })
        observer.observe(`.img-box[${seed}]`, (res) => {
            if (res.intersectionRatio > 0) {
                visible.value = true
                observer.disconnect()
            }
        })
    })
    // 使用外部class
    defineExpose({
        styleIsolation: 'shared',
    })
</script>
<style lang="scss" scoped>
    .img-box {
        display: inline-block;
        img {
            display: block;
            width: inherit;
            height: 100%;
            object-fit: cover;
        }
        image {
            display: block;
            width: inherit;
            height: inherit;
        }
    }
</style>
