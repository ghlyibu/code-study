Function.prototype.myCall = function(context) {
    // 判断调用对象
    if (typeof this !== "function") {
        console.error("type error");
    }
    // 获取参数
    let args = [...arguments].slice(1),
    result = null;
    // 判断 context是否传入，如果传入则设置为window
    context = context || window;
    // 将调用函数设置为对象方法
    context._fn = this
    // 调用函数
    result = context._fn(...args)
    // 将属性删除
    delete context._fn
    return result
}