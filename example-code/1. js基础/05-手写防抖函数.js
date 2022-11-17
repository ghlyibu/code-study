function debounce(fn,wait) {
    let timer = null
    return function () {
        const context = this, args = arguments
        if(timer){
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(()=>{
            fn.apply(context,args)
        },wait)
    }
}