// setTimeout实现setInterval
function mySetInterval(fn, t) {
    let timer = null;
    function interval() {
      fn();
      timer = setTimeout(interval, t);
    }
    timer = setTimeout(interval, t);
    return {
      cancel:()=>{
        clearTimeout(timer)
      }
    }
  }


  // let a=mySetInterval(()=>{
  //   console.log(111);
  // },1000)

// setInterval 实现setTimeout
function mySetTimeout(fn,t){
  const timer = setInterval(()=>{
    fn()
    clearInterval(timer)
  }, t)
}
mySetTimeout(()=>{
  console.log(111);
},1000)




// setInterval(() => {
//     console.log('Start');
//     // 假设这个操作需要 1500 毫秒
//     let end = Date.now() + 1500;
//     while (Date.now() < end) {}
//     console.log('End');
//   }, 1000);
 