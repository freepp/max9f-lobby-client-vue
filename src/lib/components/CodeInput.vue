<template>
    <view class="code-view">
        <view class="my__verify-code">
            <!-- 输入框 -->
            <input
                id="my__input"
                :value="data.code"
                class="my__input"
                :focus="isFocus"
                :type="props.inputType"
                :maxlength="data.itemSize"
                @input="onInput"
                @focus="inputFocus"
                @blur="inputBlur"
            />

            <!-- 光标 -->
            <view
                id="my__cursor"
                v-if="data.cursorVisible && type !== 'middle'"
                class="my__cursor"
                :style="{
                    left: data.codeCursorLeft[data.code.length] + 'px',
                    height: data.cursorHeight + 'px',
                    backgroundColor: cursorColor,
                }"
            ></view>

            <!-- 输入框 - 组 -->
            <view id="my__input-ground" class="my__input-ground">
                <template v-for="(item, index) in data.itemSize" :key="index">
                    <view
                        :style="{
                            borderColor:
                                data.code.length === index && data.cursorVisible
                                    ? boxActiveColor
                                    : boxNormalColor,
                        }"
                        :class="[
                            'my__box',
                            `my__box-${type + ''}`,
                            `my__box::after`,
                        ]"
                    >
                        <view
                            :style="{ borderColor: boxActiveColor }"
                            class="my__middle-line"
                            v-if="type === 'middle' && !data.code[index]"
                        ></view>
                        <text class="my__code-text">
                            {{ data.code[index] }}
                        </text>
                    </view>
                </template>
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
    /**
     * @description 输入验证码组件
     * @property {string} type = [box|middle|bottom] - 显示类型 默认：box -eg:bottom
     * @property {string} props.inputType = [text|number] - 输入框类型 默认：number -eg:number
     * @property {boolean} isFocus - 是否立即聚焦 默认：true
     * @property {string} cursorColor - 光标颜色 默认：#cccccc
     * @property {string} boxNormalColor - 光标未聚焦到的框的颜色 默认：#cccccc
     * @property {string} boxActiveColor - 光标聚焦到的框的颜色 默认：#000000
     * @event {Function(data)} confirm - 输入完成回调函数
     */

    import { reactive, watch, onMounted } from 'vue'

    interface Props {
        value?: string
        type?: string
        inputType?: string
        isFocus?: boolean
        cursorColor?: string
        boxNormalColor?: string
        boxActiveColor?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        value: '',
        type: 'box',
        isFocus: true,
        cursorColor: '#cccccc',
        boxNormalColor: '#cccccc',
        boxActiveColor: '#000000',
    })

    const data = reactive<any>({
        cursorVisible: false,
        cursorHeight: 35,
        code: '', // 输入的验证码
        codeCursorLeft: [], // 向左移动的距离数组,
        itemSize: 4,
    })

    const emit = defineEmits(['confirm', 'input'])

    watch(
        () => props.value,
        (val) => {
            data.code = val
        }
    )

    /**
     * @description 初始化
     */
    const init = () => {
        data.cursorVisible = props.isFocus
        getCodeCursorLeft()
        setCursorHeight()
    }

    /**
     * @description 获取元素节点
     * @param {string} elm - 节点的id、class 相当于 document.querySelect的参数 -eg: #id
     * @param {string} type = [single|array] - 单个元素获取多个元素 默认是单个元素
     * @param {Function} callback - 回调函数
     */

    const getElement = (elm, type = 'single', callback) => {
        uni.createSelectorQuery()
            .in(this)
            [type === 'array' ? 'selectAll' : 'select'](elm)
            .boundingClientRect()
            .exec((data) => {
                callback(data[0])
            })
    }

    /**
     * @description 计算光标的高度
     */
    const setCursorHeight = () => {
        getElement('.my__box', 'single', (boxElm) => {
            data.cursorHeight = boxElm.height * 0.6
        })
    }

    /**
     * @description 获取光标在每一个box的left位置
     */
    const getCodeCursorLeft = () => {
        // 获取父级框的位置信息
        getElement('#my__input-ground', 'single', (parentElm) => {
            const parentLeft = parentElm.left
            // 获取各个box信息
            getElement('.my__box', 'array', (elms) => {
                data.codeCursorLeft = []
                elms.forEach((elm) => {
                    data.codeCursorLeft.push(
                        elm.left - parentLeft + elm.width / 2
                    )
                })
            })
        })
    }

    // 输入框输入变化的回调
    const onInput = (e) => {
        let { value } = e.detail
        data.cursorVisible = value.length < data.itemSize
        emit('input', value)
        inputSuccess(value)
    }

    // 输入完成回调
    const inputSuccess = (value) => {
        if (value.length === data.itemSize) {
            emit('confirm', value)
        }
    }

    // 输入聚焦
    const inputFocus = () => {
        data.cursorVisible = data.code.length < data.itemSize
    }

    // 输入失去焦点
    const inputBlur = () => {
        data.cursorVisible = false
        data.isShowInputComp = false
    }

    onMounted(() => {
        init()
    })
</script>
<style lang="scss">
    .code-view {
        padding: 0 30rpx;
    }
    .my__verify-code {
        position: relative;
        width: 100%;
        box-sizing: border-box;
    }

    .my__verify-code .my__input {
        height: 100%;
        width: 200%;
        position: absolute;
        left: -100%;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0);
    }
    .my__verify-code .my__cursor {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
        width: 2rpx;
        animation-name: my__cursor;
        animation-duration: 0.8s;
        animation-iteration-count: infinite;
        z-index: 1;
    }

    .my__verify-code .my__input-ground {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
    }

    .my__verify-code .my__input-ground .my__box {
        @apply text-white-100;
        position: relative;
        display: inline-block;
        width: 120rpx;
        height: 128rpx;
        background: #272727;
        border-radius: 7rpx;
    }

    .my__verify-code .my__input-ground .my__box-bottom {
        // border-bottom-width: 2px;
        // border-bottom-style: solid;
    }

    .my__verify-code .my__input-ground .my__box-box {
        // border-width: 2px;
        // border-style: solid;
    }

    .my__verify-code .my__input-ground .my__box-middle {
        border: none;
    }

    .my__input-ground .my__box .my__middle-line {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50%;
        transform: translate(-50%, -50%);
        border-bottom-width: 2px;
        border-bottom-style: solid;
    }

    .my__input-ground .my__box .my__code-text {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 69rpx;
        font-weight: bold;
        transform: translate(-50%, -50%);
    }

    @keyframes my__cursor {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
</style>
