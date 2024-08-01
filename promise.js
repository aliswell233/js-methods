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

console.log("第一步");
const p = new MyPromise((resolve, reject) => {
  console.log("第二步");
  setTimeout(() => {
    resolve("成功");
    console.log("第四步");
  });
  // throw new Error('白嫖不成功')
});

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
