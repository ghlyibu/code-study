import { inject,reactive } from 'vue'

export function  forEachValue(obj,fn) {
    Object.keys(obj).forEach(key=>fn(obj[key],key))
}

const storeKey = 'store'
class Store {
    constructor(options) {
        // vuex3 内部会创建一个vue实例， 但是 vuex4直接采用 vue3提供的响应式方法
        const store = this;
        store._state = reactive({data:options.state})

        const _getters = options.getters
        store.getters = {}
        forEachValue(_getters,function(fn,key){
            Object.defineProperty(store.getters,key,{
                get:()=>fn(store.state)
            })
        })
        store._mutations = Object.create(null);
        store._actions = Object.create(null);
        const _mutations = options.mutations
        const _actions = options.actions
        forEachValue(_mutations,function(mutation,key){
            store._mutations[key] = (payload)=>{
                mutation.call(store, store.state, payload)
            }
        })

        forEachValue(_actions,function(action,key){
            store._actions[key] = (payload)=>{
                action.call(store, store, payload)
            }
        })
    }
    commit = (type,payload)=>{
        this._mutations[type](payload)
    }
    dispatch = (type, payload)=>{
        this._actions[type](payload)
    }
    get state() { // 类属性访问器
        return this._state.data
    }
    install(app, injectkey) { // createApp().use(store,'')
        // 全局暴露一个变量，暴露的是store的实例
        app.provide(injectkey || storeKey,this);
        // Vue.prototype.$store = this
        app.config.globalProperties.$store =  this
    }
}

export function createStore(options) {
    return new Store(options)
}

// vue 内部已经将这些api到出来了
export function useStore(injectkey = null) {
    return inject(injectkey !== null ? injectkey:storeKey)
}