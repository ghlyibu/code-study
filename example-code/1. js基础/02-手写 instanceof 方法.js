function myInstanceof(left,right) {
    let proto = Object.getPrototypeOf(left); // 获取对象原型
    let prototype = right.prototype; // 获取构造函数的prototype对象

    while(true) {
        if(!proto) return false
        if(proto === prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}
class A { }
const a = new A()
console.log(myInstanceof(a,A)) // true