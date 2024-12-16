<template>
    <div :id="`spin-player-${id}`"></div>
</template>

<script lang="ts" setup>
    // @ts-nocheck
    import { reactive, ref, onMounted, inject, nextTick } from 'vue'

    import { SpinePlayer } from '@esotericsoftware/spine-player'
    interface Props {
        id?: string
        skelName?: string
        assetsUrl?: string
        animName?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        id: 'spin',
    })

    const data = reactive<any>({
        title: 'Spine',
        spinPlayer: null,
    })
    const emit = defineEmits(['onEvent', 'onComplete', 'onStart', 'onEnd'])

    const initSpine = () => {
        try {
            data.spinPlayer = new SpinePlayer(`spin-player-${props.id}`, {
                jsonUrl: `${props.assetsUrl}${props.skelName}.json`,
                atlasUrl: `${props.assetsUrl}${props.skelName}.atlas`,
                animation: props.animName,
                showControls: false,
                premultipliedAlpha: false,
                alpha: true,
                defaultMix: 0,
                preserveDrawingBuffer: true,
                viewport: {
                    padLeft: '0%',
                    padRight: '0%',
                    padTop: '0%',
                    padBottom: '0%',
                },
                success: (player) => {
                    player.animationState.addListener({
                        event: function (trackIndex, event) {
                            emit('onEvent', trackIndex, event)
                        },
                        complete: function (trackIndex, loopCount) {
                            emit('onComplete', trackIndex)
                        },
                        start: function (trackIndex) {
                            emit('onStart', trackIndex)
                        },
                        end: function (trackIndex) {
                            emit('onEnd', trackIndex)
                        },
                    })
                },
            })
        } catch (e) {}
    }

    const setAnimation = async (name, loop) => {
        if (!data.spinPlayer) return
        data.spinPlayer.setAnimation(name, loop)
    }

    /* 手动清除SpinePlayer实例，浏览器对于同时存在的 WebGL 上下文数量是有限制的，通常限制在 16 个左右，超过这个数量可能会导致错误 */
    const dispose = () => {
      data.spinPlayer.dispose()
      data.spinPlayer = null
    }

    onMounted(() => {
        initSpine()
    })

    defineExpose({
        setAnimation,
        dispose,
    })
</script>

<style lang="scss"></style>
