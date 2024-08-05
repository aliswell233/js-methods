function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}
function deepCopy(obj, hash = new WeakMap()) {
  if (!isObject(obj)) return obj;
  if (hash.has(obj)) return hash.get(obj);
  let target = Array.isArray(obj) ? [] : {}
  hash.set(target)
  
  Reflect.ownKeys(obj).forEach((key) => {

    if(isObject(obj[key])){
        target[key] = deepCopy(obj[key], hash)
    } else {
        target[key] = obj[key]
    }
  });
  return target
}

var obj1 = {
a:1,
b:{a:2}
};
var obj2 = deepCopy(obj1);
console.log(obj1);

// 浏览器版本
// function deepCopy(obj){
//     return new Promise((resolve) => {
//         const { port1, port2} = new MessageChannel()
//         port1.onmessage = (e)=> resolve(e.data)
//         port2.postMessage(obj)
//     })
// }

// // 使用示例
// const original = {
//     a: 1,
//     b: {
//       c: 2,
//       d: [3, 4]
//     }
//   };

// deepCopy(original).then((copy)=>{
//     console.log('copy', copy);
// })
