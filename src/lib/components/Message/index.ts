import { VNodeProps, render, App, createVNode } from 'vue'
import Message from './message.vue'
export type MessageType = 'success' | 'warning'
interface MessageProps extends VNodeProps {
    type?: MessageType
    message: string
    duration?: number
    [key: string]: any
}
// 组件的id种子
let seed = 1
// 显示中的组件集合 通过集合来找判断位置
export const instances = []
// 动态渲染组件
export const createMessage = (props: MessageProps) => {
    const id = `message_${seed++}`
    const duration = 3000
    const type: MessageType = 'success'
    // const vnode = await createApp(Message, Object.assign(props, {id}))
    const vnode = createVNode(
        Message,
        Object.assign({ id, type, duration }, props)
    )
    const container = document.createElement('div')
    const appendTo = document.body
    const instance = {
        id,
        vnode,
        vm: vnode.component,
        close() {
            this.vm.exposed.close()
        },
    }
    instances.push(instance)
    render(vnode, container)
    instance.vm = vnode.component
    appendTo.appendChild(container.firstElementChild)
    return instance
}
// 外部调用的API
export const message = (props: MessageProps | string) => {
    if (typeof props === 'string') {
        props = {
            message: props,
        }
    }
    const instance = createMessage(props)
    return instance
}
// 外部调用的插件
export default {
    install(app: App) {
        app.config.globalProperties.$message = message
    },
}
