import { render } from "./renderer";
import { createVNode } from "./vnode";

export function createApp(rooteComponent) {
    return {
        mount(rootContainer) {
            // 先 vnode
            // component -> vnode
            // 所有的逻辑都会基于 vnode 做处理

            const vnode = createVNode(rooteComponent)

            render(vnode, rootContainer)
        }
    }
}

