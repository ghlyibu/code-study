function clone(obj){
    const type = typeof obj
    if(type !== 'object' || obj==null) {
        return
    }
    const ret = obj instanceof Array ?[]:{}
    for(let key in obj) {
        if(obj.hasOwePrototy(key)) {
            ret[key] = obj[key]
        }
    }
    return ret
}
