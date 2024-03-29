import { extend } from "../shared";

let activeEffect;
let shouldTrack;

export class ReactiveEffect {
    deps: [] = [];
    active = true;
    onStop?: () => void;
    public scheduler?: () => any;
    constructor(public fn: () => any, scheduler?: () => any) {
        this.fn = fn;
        this.scheduler = scheduler;
    }
    run() {
        // 1. 会收集依赖
        // shouldTrack 来区分
        if (!this.active) {
            return this.fn;
        }
        activeEffect = this;
        shouldTrack = true;
        const result = this.fn();
        shouldTrack = false;
        activeEffect = undefined;
        return result;
    }
    stop() {
        if (this.active) {
            cleanupEffect(this);
            if (this.onStop) {
                this.onStop();
            }
            this.active = false;
        }
    }
}
function cleanupEffect(effect: ReactiveEffect) {
    effect.deps.forEach((dep: Set<ReactiveEffect>) => {
        dep.delete(effect);
    });
}

const targetMap = new Map();
export function track(target, key) {
    if (!isTracking()) return;
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Set();
        depsMap.set(key, dep);
    }
    trackEffects(dep)
}

export function trackEffects(dep) {
    // 已经在dep中,如果有，就不添加
    if(dep.has(activeEffect)) return;
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
}

export function isTracking(){
    return shouldTrack && activeEffect !== undefined
}

export function trigger(target, key) {
    let depsMap = targetMap.get(target);
    if (!depsMap) return;
    let dep = depsMap.get(key);
    triggerEffects(dep) 
}

export function triggerEffects(dep) {
    for (const effect of dep) {
        if (effect.scheduler) {
            effect.scheduler();
        } else {
            effect.run();
        }
    }
}

export function effect(fn, options: Record<string, any> = {}) {
    // fn
    const scheduler = options.scheduler;
    const _effect = new ReactiveEffect(fn, scheduler);
    // extend
    extend(_effect, options);

    _effect.run();

    const runner: any = _effect.run.bind(_effect);
    runner.effect = _effect;
    return runner;
}

export function stop(runner) {
    runner.effect.stop();
}