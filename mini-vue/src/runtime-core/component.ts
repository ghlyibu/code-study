import { isObject } from './../shared/index';
export function createComponentIntance(vnode) {
    const component = {
        vnode,
        type: vnode.type
    }
    return component;
}


export function setupComponent(instance) {
    // TODO
    // initProps()
    // initSlots()

    setupStatefulComponent(instance)
}

function setupStatefulComponent(instance) {
    const Component = instance.type;

    const { setup } = Component;

    if (setup) {
        // function isObject
        const setupResult = setup();
        handleSetUpResult(instance, setupResult)
    }
}

function handleSetUpResult(instance, setupResult) {
    // function Object
    // TODO function

    if (typeof setupResult === "object") {
        instance.setupState = setupResult;
    }

    finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
    const Component = instance.type;
    if (Component.render) {
        instance.render = Component.render
    }
} 