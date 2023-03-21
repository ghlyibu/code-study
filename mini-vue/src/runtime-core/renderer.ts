import { createComponentIntance, setupComponent } from "./component";

export function render(vnode, container) {
    // patch

    patch(vnode, container);
}

function patch(vnode, container) {
    // 去处理组件
    processComponent(vnode, container);
}

function processComponent(vnode, container) {
    mountComponent(vnode, container);
}

function mountComponent(vnode: any, container) {
    const instance = createComponentIntance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance, container);
}

function setupRenderEffect(instance, container) {
    const subTree = instance.render();

    // vnode -> patch
    // vnode -> element -> mountElement
    patch(subTree, container)
}