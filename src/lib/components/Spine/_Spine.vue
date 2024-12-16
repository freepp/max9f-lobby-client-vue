<template>
    <view class="spine-view">
        <canvas id="canvas" canvas-id="canvas" ref="RefSpineCanvas"></canvas>
    </view>
    <PopupMessage ref="RefMessage" />
</template>

<script lang="ts" setup>
    // @ts-nocheck
    import { reactive, ref, onMounted, inject, nextTick } from 'vue'
    import {
        SkeletonRenderer,
        AssetManager,
    } from '@esotericsoftware/spine-canvas'
    import {
        TextureAtlas,
        SkeletonJson,
        AtlasAttachmentLoader,
        Skeleton,
        AnimationState,
        AnimationStateData,
    } from '@esotericsoftware/spine-core'
    interface Props {
        pageType?: number
        skelName?: string
        assetsUrl?: string
        animName?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        pageType: 1,
    })

    const data = reactive<any>({
        title: 'Spine',
        lastFrameTime: Date.now() / 1000,
        canvas: null,
        context: null,
        assetManager: null,
        skeleton: null,
        state: 0,
        bounds: null,
        skeletonRenderer: null,
        isShowAnimation: true,
    })
    const emit = defineEmits(['parentFun'])
    const initSpine = async () => {
        data.canvas = document.getElementsByClassName('uni-canvas-canvas')[0]
        // data.canvas.width = window.innerWidth
        // data.canvas.height = window.innerHeight
        // console.log(data.canvas.width, data.canvas.height)
        data.context = data.canvas.getContext('2d')
        console.log(data.context)
        data.skeletonRenderer = new SkeletonRenderer(data.context)
        // enable debug rendering
        data.skeletonRenderer.debugRendering = false
        // enable the triangle renderer, supports meshes, but may produce artifacts in some browsers
        data.skeletonRenderer.triangleRendering = false

        console.log(data.skeletonRenderer)

        data.assetManager = new AssetManager()
        console.log(props.assetsUrl + props.skelName + '.json')
        try {
            data.assetManager.loadText(
                props.assetsUrl + props.skelName + '.json'
            )
            data.assetManager.loadTextureAtlas(
                props.assetsUrl + props.skelName + '.atlas'
            )
        } catch (e) {
            console.log(e)
        }

        // data.assetManager.loadText(props.assetsUrl + props.skelName + '.json')
        // data.assetManager.loadText(props.assetsUrl + props.skelName + '.atlas')
        // data.assetManager.loadTexture(props.assetsUrl + props.skelName + '.png')
        await data.assetManager.loadAll()
        console.log(data.assetManager)

        requestAnimationFrame(load)
    }

    const load = () => {
        var skeletonData = loadSkeleton(props.skelName, 'default')
        data.skeleton = skeletonData.skeleton
        data.state = skeletonData.state
        data.bounds = skeletonData.bounds
        // this.$emit("on-init");
        playAnimation('idle', true)
    }

    const loadSkeleton = (name, skin) => {
        if (skin === undefined) skin = 'default'

        // Load the texture atlas using name.atlas and name.png from the AssetManager.
        // The function passed to TextureAtlas is used to resolve relative paths.
        console.log(props.assetsUrl + name + '.atlas')
        // try {
        //     console.log(
        //         data.assetManager.get(props.assetsUrl + name + '.atlas')
        //     )
        //     let atlas = new TextureAtlas(
        //         data.assetManager.get(props.assetsUrl + name + '.atlas'),
        //         (path) => {
        //             return data.assetManager.get(props.assetsUrl + path)
        //         }
        //     )
        // } catch (e) {
        //     console.log(e)
        // }
        let atlas = data.assetManager.require(props.assetsUrl + name + '.atlas')

        console.log(atlas)
        // Create a AtlasAttachmentLoader, which is specific to the WebGL backend.
        let atlasLoader = new AtlasAttachmentLoader(atlas)
        // // Create a SkeletonJson instance for parsing the .json file.
        let skeletonJson = new SkeletonJson(atlasLoader)
        console.log(skeletonJson)

        // Set the scale to apply during parsing, parse the file, and create a new skeleton.
        let skeletonData = skeletonJson.readSkeletonData(
            data.assetManager.get(props.assetsUrl + name + '.json')
        )
        let skeleton = new Skeleton(skeletonData)
        console.log(data.canvas.width, data.canvas.style.width)
        skeleton.x = data.canvas.width / 4
        skeleton.y = data.canvas.height / 4
        let scale = data.canvas.height / 1080 / 2
        console.log(scale)
        skeleton.scaleX = scale
        skeleton.scaleY = -scale

        // skeleton.x = 375
        // skeleton.y = 375
        // let scale = 0.695
        // skeleton.scaleX = scale
        // skeleton.scaleY = -scale

        console.log(skeleton)

        let bounds = calculatceBounds(skeleton)
        skeleton.setSkinByName(skin)
        console.log(bounds)

        // Create an AnimationState, and set the initial animation in looping mode.
        let animationState = new AnimationState(
            new AnimationStateData(skeleton.data)
        )
        console.log(animationState)

        // let self = this
        animationState.addListener({
            event: function (trackIndex, event) {
                console.log(
                    'Event on track ' +
                        trackIndex +
                        ': ' +
                        JSON.stringify(event) +
                        self.skelName
                )
                // self.$emit('on-event', event)
            },
            complete: function (trackIndex, loopCount) {
                console.log(
                    'Animation on track ' +
                        JSON.stringify(trackIndex.animation.name) +
                        ' completed, loop count: ' +
                        loopCount +
                        self.skelName
                )
                // self.$emit('on-complete', trackIndex)
            },
            start: function (trackIndex) {
                console.log('Animation on track ' + trackIndex + ' started')
                // self.$emit('on-start', trackIndex)
            },
            end: function (trackIndex) {
                console.log('Animation on track ' + trackIndex + ' ended')
                // self.$emit('on-ended', trackIndex)
            },
        })

        // Pack everything up and return to caller.
        return {
            skeleton: skeleton,
            state: animationState,
            bounds: bounds,
        }
    }

    const calculatceBounds = (skeleton) => {
        let data = skeleton.data
        skeleton.setToSetupPose()
        skeleton.updateWorldTransform()
        //   let offset = new spine.Vector2();
        //   let size = new spine.Vector2();
        let offset = 0
        let size = 0
        // console.log(skeleton.getBounds(offset, size, []))
        // skeleton.getBounds(offset, size, [])
        skeleton.getBoundsRect()
        return { offset: offset, size: size }
    }

    const render = () => {
        if (!data.isShowAnimation) return

        let now = Date.now() / 1000
        let delta = now - data.lastFrameTime
        data.lastFrameTime = now

        // resize()

        data.context.save()
        data.context.setTransform(1, 0, 0, 1, 0, 0)
        data.context.fillStyle = '#000'
        data.context.clearRect(0, 0, data.canvas.width, data.canvas.height)
        //this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        data.context.restore()

        data.state.update(delta)
        data.state.apply(data.skeleton)
        data.skeleton.updateWorldTransform()

        try {
            data.skeletonRenderer.draw(data.skeleton)
        } catch (e) {
            console.log(e)
        }

        requestAnimationFrame(render)
    }

    const resize = () => {
        var w = data.canvas.clientWidth
        var h = data.canvas.clientHeight
        if (data.canvas.width != w || data.canvas.height != h) {
            data.canvas.width = w
            data.canvas.height = h
        }

        // magic
        let centerX = data.bounds.offset.x + data.bounds.size.x / 2
        let centerY = data.bounds.offset.y + data.bounds.size.y / 2
        let scaleX = data.bounds.size.x / data.canvas.width
        let scaleY = data.bounds.size.y / data.canvas.height
        let scale = Math.max(scaleX, scaleY) * 1.2
        // if (scale < 1) scale = 1
        let width = data.canvas.width * scale
        let height = data.canvas.height * scale

        data.context.setTransform(1, 0, 0, 1, 0, 0)
        data.context.scale(1 / scale, 1 / scale)
        data.context.translate(-centerX, -centerY)
        data.context.translate(width / 2, height / 2)
    }

    const playAnimation = (name, isLoop = true) => {
        hideAnimation()
        playAnimationAction(name, isLoop)
    }

    const hideAnimation = () => {
        data.isShowAnimation = false
    }

    const playAnimationAction = (name, isLoop) => {
        data.isShowAnimation = true
        data.state.setAnimation(0, name, isLoop)
        data.lastFrameTime = Date.now() / 1000
        requestAnimationFrame(render)
    }

    // const test = () => {
    //     emit('parentFun')
    //     RefMessage.value.messageToggle({
    //         type: 'error',
    //         message: 'test',
    //     })
    // }

    onMounted(() => {
        initSpine()
    })

    // defineExpose({
    //   sendSmsCode,
    // })
</script>

<style lang="scss">
    #canvas {
        width: 600rpx;
        height: 600rpx;
    }
    .spine-view {
    }
</style>
