function debounce(fn, delay){
    let timer = null
    return function(...arg) {
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fn.apply(this ,arg)
        }, delay)
    }
}


function throttle(fn, delay){
    let flag  = true
    return function(...arg) {
        if(!flag) return
        flag = false
        setTimeout(()=>{
           fn.apply(this ,arg)
           flag = true
        }, delay)
    }
}
//  这里不能return () => {} 这会让最终的函数this指向 throttle2被调用时（window）
// function throttle2(fn, delay) {
//     let flag = true;
//     return () => {
//       if (!flag) return;
//       flag = false;
//       timer = setTimeout(() => {
//         fn();
//         flag = true;
//       }, delay);
//     };
//   }


// const obj = {
//     value: 42,
//     debounceMethod: debounce(function() {
//       console.log(this.value);
//     }, 1000)
//   };
  
//   obj.debounceMethod(); 


  const obj1 = {
    value: 42,
    debounceMethod: throttle(function(){
        console.log(this.value);
    }, 1000)
  };

  obj1.debounceMethod()