
import {forEachValue, isPromise} from './utils'
import {reactive, watch} from 'vue'
import {storeKey} from './injectKey'
import ModuleCollection from './module/module-collection'


// mutation 和 action的区别？
function enableStrictMode(store) {
    watch(() => store._state.data, () => { // 监控数据变变化，数据变化后执行回调函数  effect
        console.assert(store._commiting, 'do not mutate vuex store state outside mutation handlers')
    }, {deep: true, flush: 'sync'}); // 默认watchApi是异步的，这里改成同步的监控
}
function getNestedState(state, path) { // 根据路径 获取store.上面的最新状态
    return path.reduce((state, key) => state[key], state)
}

function installModule(store, rootState, path, module) { // 递归安装
    let isRoot = !path.length; // 如果数组是空数组 说明是根，否则不是
    const namespaced = store._modules.getNamespaced(path); // [a,c]
    if (!isRoot) { // []
        let parentState = path.slice(0, -1).reduce((state, key) => state[key], rootState);
        parentState[path[path.length - 1]] = module.state;
    }
    // getters module._raw.getters
    module.forEachGetter((getter, key) => { // {double:function(state){}}
        store._wrappedGetters[namespaced + key] = () => {
            return getter(getNestedState(store.state, path)); // 如果直接使用模块上自己的状态，此状态不是响应式的
        }
    })
    // mutation   {add:[mutation]}
    module.forEachMutation((mutation, key) => {
        const entry = store._mutations[namespaced + key] || (store._mutations[namespaced + key] = [])
        entry.push((payload) => { // store.commit('add',payload)
            mutation.call(store, getNestedState(store.state, path), payload)
        })
    })
    // actions  mutation和action的一个区别， action执行后返回一个是promise 
    module.forEachAction((action, key) => {
        const entry = store._actions[namespaced + key] || (store._actions[namespaced + key] = []);
        entry.push((payload) => { // store.dispatch('LOGIN',payload).then(()=>{})
            let res = action.call(store, store, payload);
            // res 是不是一个promise
            if (!isPromise(res)) {
                return Promise.resolve(res);
            }
            return res;
        })
    })

    module.forEachChild((child, key) => { // aCount,bCount
        installModule(store, rootState, path.concat(key), child);
    })
}
function resetStoreState(store, state) {
    store._state = reactive({ data: state }); // store._state.data = 'xxcx'
    const wrappedGetters = store._wrappedGetters
    store.getters = {};
    forEachValue(wrappedGetters, (getter, key) => {
        Object.defineProperty(store.getters, key, {
            get: getter,
            enumerable: true
        })
    })
    if (store.strict) {
        enableStrictMode(store);
    }
}

export default class Store {
    _withCommit(fn) { // 切片
        const commiting = this._commiting;
        this._commiting = true;
        fn();
        this._commiting = commiting
    }
    constructor (options) {
        // {state,actions,mutations,getter,modules}  
        const store = this;
        store._modules = new ModuleCollection(options);
        // {add:[fn,fn,fn]}  发布订阅模式
        store._wrappedGetters = Object.create(null);
        store._mutations = Object.create(null);
        store._actions = Object.create(null);

        this.strict = options.strict || false; // 是不是严格模式 

        // 调用的时候 知道是mutation，mutation里面得写同步代码 
        this._commiting = false;
        // 在mutation之前添加一个状态 _commiting = true;
        // 调用mutation -> 会更改状态 ， 我就监控这个状态，如果当前状态变化的时候_commiting = true, 同步更改
        // _commiting = false


        // 定义状态
        const state = store._modules.root.state; // 根状态
        installModule(store, state, [], store._modules.root);
        resetStoreState(store, state);
        // 把状态定义到 store.state.aCount.cCount.count;

        store._subscribes = [];
        options.plugins?.forEach(plugin => plugin(store));
    }
    get state() {
        return this._state.data
    }
    subscribe(fn) {
        this._subscribes.push(fn);
    }
    replaceState(newState) {
        // 严格模式下 不能直接修改状态
        this._withCommit(() => {
            this._state.data = newState;
        });
    }
    commit = (type, payload) => {
        const entry = this._mutations[type] || [];
        this._withCommit(() => {
            entry.forEach(handler => handler(payload))
        });
        this._subscribes.forEach(sub => sub({ type, payload }, this.state))
    }
    dispatch = (type, payload) => {
        const entry = this._actions[type] || []
        return Promise.all(entry.map(handler => handler(payload)))
    }
    install(app, injectKey) { // createApp().use(store,'my')
        // 全局暴露一个变量 暴露的是store的实例
        app.provide(injectKey || storeKey, this); // 给根app增加一个_provides ,子组件会去向上查找
        // Vue.prototype.$store = this
        app.config.globalProperties.$store = this; // 增添$store属性
    }
    registerModule(path, rawModule) { // issue  aCount/bCount
        const store = this;
        if (typeof path == 'string') path = [path];

        // 要在原有的模块基础上新增加一个 
        const newModule = store._modules.register(rawModule, path); // 注册上去
        // 在把模块安装上 


        installModule(store, store.state, path, newModule)
        // 重置容器

        resetStoreState(store, store.state);
    }
}