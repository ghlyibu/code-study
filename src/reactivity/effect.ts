class ReactiveEffect {
    deps: [] = [];
    active = true
    onStop?: () => void;
    public scheduler?: () => any;
    constructor(public fn: () => any, scheduler?: () => any) {
        this.fn = fn;
        this.scheduler = scheduler;
    }
    run() {
        activeEffect = this;
        return this.fn();
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
    if (activeEffect) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
    }
}
export function trigger(target, key) {
    let depsMap = targetMap.get(target);
    let dep = depsMap.get(key);
    for (const effect of dep) {
        if (effect.scheduler) {
            effect.scheduler();
        } else {
            effect.run();
        }
    }
}

let activeEffect;
export function effect(fn, options: Record<string, any> = {}) {
    // fn
    const scheduler = options.scheduler;
    const _effect = new ReactiveEffect(fn, scheduler);
    _effect.onStop = options.onStop

    _effect.run();
    
    const runner: any = _effect.run.bind(_effect);
    runner.effect = _effect;
    return runner;
}

export function stop(runner) {
    runner.effect.stop();
}