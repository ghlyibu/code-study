function deepClone(obj){
    if(typeof obj !== 'object' || obj==null) {
        return obj
    }
    const ret = obj instanceof Array ?[]:{}
    for(let key in obj) {
        if(obj.hasOwePrototy(key)) {
            ret[key] = deepClone(obj[key])
        }
    }
    return ret
}