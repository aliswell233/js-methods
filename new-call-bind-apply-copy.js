// function myNew(fn, ...arg){
//   const obj = Object.create(fn.prototype)
//   const res = fn.call(obj, ...arg)
//   if( res && (typeof arg === 'function'|| typeof arg === "object")){
//     return res
//   }
//   return obj
// }

Function.prototype.myCall = function(context, ...arg){
    if(!context){
        context = window
    }
    const fn = Symbol()
    context[fn] = this
    return context[fn](...arg)
}
Function.prototype.myApply = function(context, arg){
    if(!context){
        context = window
    }
    const fn = Symbol()
    context[fn] = this
    return context[fn](...arg)
}
Function.prototype.myBind = function(context, ...arg){
    if(!context){
        context = window
    }
    const fn = Symbol()
    context[fn] = this
    const _this = this
    const result = function(...innerArgs){
        if(this instanceof _this){
            this[fn] = _this
            this[fn](...[...arg, ...innerArgs])
        }else{
            context[fn](...[...arg, ...innerArgs])
        }
    }
    result.prototype = Object.create(this.prototype)
    return result
}