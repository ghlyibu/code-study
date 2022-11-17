function create(obj) {
    function F() {};
    F.prototype = obj
    return new F();
}
const obj = {}
const a = Object.create(obj)
const b = create(obj)
console.log(a.__proto__ === b.__proto__) // true