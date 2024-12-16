import { render, createVNode } from 'vue'
import Modal from './modal.vue'
// import { ModalProps, ModalType } from './modal.vue'
export type ModalType = 'success' | 'warning'
export interface ModalProps {
    // 弹窗内容宽度 默认单位rpx 750 750rpx 750px
    width?: number | string
    type?: ModalType
    title?: string
    content?: string
    cancelText?: string
    confirmText?: string
    showCancel?: boolean
    showConfirm?: boolean
    onConfirm?: Function
    onCancel?: Function
    onClose?: Function
    [key: string]: any
    hasPay?: boolean,
    countDown?: number
}

let seed = 1
export const createModal = (props: ModalProps) => {
    const id = `modal_${seed++}`
    const type: ModalType = 'success'
    // const vnode = await createApp(Message, Object.assign(props, {id}))
    const vnode = createVNode(Modal, Object.assign({ id, type }, props))
    const container = document.createElement('div')
    const appendTo = document.body
    const instance = {
        id,
        vnode,
        vm: vnode.component,
        show() {
            this.vm.exposed.open()
        },
        close() {
            this.vm.exposed.close()
        },
    }
    render(vnode, container)
    instance.vm = vnode.component
    appendTo.appendChild(container.firstElementChild)
    return instance
}
// 外部调用的API
export const modal = (props: ModalProps) => {
    if (typeof props === 'string') {
        props = {
            message: props,
        }
    }
    const instance = createModal(props)
    return instance
}
// 外部调用的插件
// export default {
//     install(app: App){
//         app.config.globalProperties.$modal = modal
//     }
// }
