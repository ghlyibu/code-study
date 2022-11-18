Array.prototype._filter = function(fn){
    if (typeof fn !== "function") {
        throw Error('参数必须是一个函数');
    }
    const rest = []
    for(let i=0;i<this.length;i++){
        fn(this[i]) && rest.push(this[i])
    }
    return rest
}
