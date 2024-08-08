function currying(fn,...arg){
    const res = (...innerArgs) =>{
        const tmp = [...arg, ...innerArgs]
        if(tmp.length === fn.length){
           return  fn(...tmp)
        }else{
            return res
        }
    }
    return res
}

// add(1)(2)(3)()=6    add(1,2,3)(4)()=10
function add(...arg){
    let sum = arg.reduce((pre, cur)=> pre + cur)

    function innerFn(...innerArgs){
        if(innerArgs.length === 0){
            return sum
        }else{
            sum += innerArgs.reduce((pre, cur)=> pre + cur)
            return innerFn
        }
    }
    return  innerFn
}

console.log('add(1,2,3)(4)()', add(1,2,3)(4)());