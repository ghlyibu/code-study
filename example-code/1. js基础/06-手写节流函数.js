function throttle1(fn, delay) {
    let timer = null
    return function () {
        const context = this, args = arguments;
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            timer = null
        }, delay)
        return fn.apply(context, args)
    }
}

function throttle2(fn, delay) {
    let curTime = Date.now();
    return function () {
        const context = this,
            args = arguments,
            nowTime = Date.now();;
        if (nowTime - curTime >= delay) {
            curTime = Date.now();
            return fn.apply(context, args)
        }
    }
}