// 1. 写构造函数，状态status
// 2. 写resolve，reject
// 3. 写then。异常处理 传undefine , func抛错。
// 4. 写异步功能。then 收集数组，resolve、reject用timeout操作异步

class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(func) {
    this.status = MyPromise.PENDING;
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];

    const resolve = (result) => {
      setTimeout(() => {
        if (this.status === MyPromise.PENDING) {
          this.status = MyPromise.FULFILLED;
          this.resolveCallbacks.forEach((callBack) => {
            callBack(result);
          });
        }
      });
    };

    const reject = () => {
      setTimeout(() => {
        if (this.status === MyPromise.PENDING) {
          this.status = MyPromise.REJECTED;
          this.rejectCallbacks.forEach((callBack) => {
            callBack(result);
          });
        }
      });
    };

    try {
      func(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  
  then(resolveCallback, rejectCallback) {
    // (v) => v只是简单地返回传入的值，确保Promise链中的下一个.then()仍然能够接收到这个值。
    resolveCallback =
      typeof resolveCallback === "function" ? resolveCallback : (v) => v;
    // (err) => { throw err; }会抛出传入的错误，确保Promise链中的下一个.then()或.catch()能够接收到这个错误并处理它。
    rejectCallback =
      typeof rejectCallback === "function"
        ? rejectCallback
        : (err) => {
            throw err;
          };

    return new MyPromise((resolve, rejected) => {
      this.resolveCallbacks.push((val) => {
        try {
          let x = resolveCallback(val);
          // 如果回调函数结果是普通值 那么就resolve出去给下一个then链式调用
          // 如果是一个promise对象（代表又是一个异步） 那么调用x的then方法 将resolve和reject传进去 等到x内部的异步 执行完毕的时候（状态完成）就会自动执行传入的resolve 这样就控制了链式调用的顺序
          x instanceof MyPromise ? x.then(resolve, rejected) : resolve(x);
        } catch (e) {
          rejected(e);
        }
      });

      this.rejectCallbacks.push((val) => {
        try {
          let x = rejectCallback(val);
          x instanceof MyPromise ? x.then(resolve, rejected) : rejected(x);
        } catch (e) {
          rejected(e);
        }
      });
    });
  }
}

console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

new MyPromise(
  (resolve, _) => {resolve()}
).then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');

// console.log("第一步");
// const p = new MyPromise((resolve, reject) => {
//   console.log("第二步");
//   setTimeout(() => {
//     resolve("成功");
//     console.log("第四步");
//   });
//   // throw new Error('白嫖不成功')
// });

p.then((result) => {
  console.log("resolve to", result);
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve("success");
    }, 1000);
  });
}).then((result) => {
  console.log("resolve to22", result);
});
console.log("第三步");

// p.then(
//     undefined,
//     result => { console.log('reject to', result);}
// )


/**
 * 
构造函数：
  状态
  成功数组
  失败数组
  resolve：
    查状态
    改状态
    setTimeout
    遍历成功数组
  reject：
    查状态
    改状态
    setTimeout
    遍历失败数组
  fn调用：
    try catch后reject

方法：
  then:
    处理成功回调 三元表达式 
    处理失败回调 三元表达式 
    return myPromise 实例:
      成功数组添加 成功回调包装：
                    try catch
                    调用成功回调
                    成功回调返回 instanceof myPromise ? 成功回调返回.then : resolve(成功回调返回)
      失败数组添加 失败回调包装:
                    try catch
                    调用失败回调
                    失败回调返回 instanceof myPromise ? 失败回调返回.then : reject(成功回调返回)
  all:
    static 
    声明计数器和结果数组
    return myPromise 实例:
      遍历promise数组
        Promise.resolve包裹每一项以检查是不是promise
        then
          结果数组[i] = val
          计数器++
          if(计数器 === promise数组长度) resolve(结果数组)
        ,
        (err) =>{ reject(err) }
          
  race:
    static
    return myPromise 实例:
      遍历promise数组
        Promise.resolve包裹每一项以检查是不是promise
        then
          (res) => {
            //promise数组只要有任何一个promise 状态变更  就可以返回
            resolve(res);
          },
        ,
        (err) =>{ reject(err) }
 */



//         new Promise((resolve, reject) => {
//           setTimeout(() => resolve("请求结果"), 1000);
//       }).then(result => {
//           console.log(result); // "请求结果"
//           return new Promise((resolve) => {
//               setTimeout(() => resolve(result + " 处理完成"), 1000);
//           }).then((result)=>{
//             console.log('你好')
//             return new Promise((resolve) => {resolve(result)})
//           });
//       }).then(result => {
//           console.log(result); // "请求结果 处理完成"
//           return result + " 继续处理";
//       }).then(result => {
//           console.log(result); // "请求结果 处理完成 继续处理"
//       });

//       "请求结果"
// > "你好"
// > "请求结果 处理完成"
// > "请求结果 处理完成 继续处理"