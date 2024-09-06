// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("success");
//     console.log("timer1");
//   }, 1000);
//   console.log("promise1里的内容");
// });
// const promise2 = promise1.then(() => {
//   // throw new Error("error!!!");
//   console.log('error');
  
// });
// console.log("promise1", promise1);
// console.log("promise2", promise2);
// setTimeout(() => {
//   console.log("timer2");
//   console.log("promise1", promise1);
//   console.log("promise2", promise2);
// }, 2000);


// var a = 0
// console.log(a, window.a)
// if(true){
//   console.log(a, window.a)
//   a = 1 
//   console.log(a, window.a)
//   function a(){}
//   console.log(a, window.a)
//   a = 21
//   console.log(a, window.a)
//   console.log('limian',a)
// }
// console.log('waimina',a)


function render(tempate, data){
  return tempate.replace(/{{\s*(\w+)\s*}}/, (match, key)=>{
    return data[key] || ''
  })
}


// 测试
console.log(render("Hello, {{name}}!", { name: "World" })); 