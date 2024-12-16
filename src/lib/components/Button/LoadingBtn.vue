<template>
    <view v-if="!loading" class="normal-btn bg-primary" @click="btnClick">
        <slot></slot>
    </view>
    <view class="normal-btn bg-primary disabled" v-else>
        <img src="@/static/icon/button_loading.gif" alt="" />
    </view>
</template>

<script lang="ts" setup>
    import { reactive, ref, onMounted } from 'vue'

    interface Props {
        loading?: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
        loading: false,
    })

    const emit = defineEmits(['loadData'])

    const btnClick = () => {
        emit('loadData')
    }
</script>

<style lang="scss">
    .normal-btn.disabled {
        img {
            height: 70%;
        }
    }
</style>
