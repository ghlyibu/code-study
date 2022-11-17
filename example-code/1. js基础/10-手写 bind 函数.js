Function.prototype.myBind = function(context) {
    // 判断调用对象是否为函数
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }
    // 获取参数
    const args = [...arguments].slice(1)
    const fn = this;
    return function Fn(){
        return fn.apply(this instanceof Fn?this:context,args.concat([...arguments]))
    }
}

function A(){
    this.a = 1
}

const obj = {a:2}

A.bind(obj)()
console.log(obj)