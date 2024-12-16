import { render, createVNode, ComponentInternalInstance, VNode } from 'vue'
import Loading from './loading.vue'
// import { ModalProps, ModalType } from './modal.vue'
let globalInstance: LoadingInstanceType = null
interface LoadingInstanceType {
    vm: ComponentInternalInstance
    vnode: VNode
    show: Function
    close: Function
}
export const createLoading = () => {
    if (globalInstance) {
        globalInstance.show()
        return globalInstance
    }
    //const proxy = currentInstance.proxy
    // const vnode = await createApp(Message, Object.assign(props, {id}))
    const vnode = createVNode(Loading)
    const container = document.createElement('div')
    const appendTo = document.body
    const instance: LoadingInstanceType = {
        vnode,
        vm: vnode.component,
        show() {
            this.vm.exposed.show()
        },
        close() {
            this.vm.exposed.close()
        },
    }
    globalInstance = instance
    render(vnode, container)
    instance.vm = vnode.component
    appendTo.appendChild(container.firstElementChild)
    instance.show()
    return instance
}
// 外部调用的API
export const loading = (): LoadingInstanceType => {
    const instance = createLoading()
    return instance
}
