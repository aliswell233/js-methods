// function myNew(fn, ...arg){
//   const obj = Object.create(fn.prototype)
//   const res = fn.call(obj, ...arg)
//   if( res && (typeof arg === 'function'|| typeof arg === "object")){
//     return res
//   }
//   return obj
// }

console.log(print())
if(true){
    function print() {
        console.log('林一一')
    }
}
console.log(print())