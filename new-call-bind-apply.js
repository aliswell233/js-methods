Function.prototype.myCall = function (context, ...args) {
  if (!context || context === null) {
    context = window;
  }
  console.log('context', context);
  // 创造唯一的key值  作为我们构造的context内部方法名
  let fn = Symbol();
  console.log('fn', fn);
  context[fn] = this; //this指向调用call的函数 // this 是 BoundFoo 是result
  console.log('context[fn]', context[fn]);
  // 执行函数并返回结果 相当于把自身作为传入的context的方法进行调用了
  return context[fn](...args); 
};

Function.prototype.myApply = function (context, args) {
  if (!context || context === null) {
    context = window;
  }
  // 创造唯一的key值  作为我们构造的context内部方法名
  let fn = Symbol();
  context[fn] = this;
  // 执行函数并返回结果
  return context[fn](...args);
};



function myNew(fn, ...args) {
  // 原型拷贝
    let obj = Object.create(fn.prototype);
    console.log('obj', obj);
    // 原型拷贝调方法
    let res = fn.myCall(obj, ...args); // 用自定义myCall 替换call  // BoundFoo.myCall -> result.myCall
    console.log('res', res);
    if (res && (typeof res === "object" || typeof res === "function")) {
      return res;
    }
    return obj;
  }
  

function Person(name, age) {
  this.name = name;
  this.age = age;
}


Function.prototype.myBind = function (context, ...args) {
  if (!context || context === null) {
    context = window;
  }
  // 创造唯一的key值  作为我们构造的context内部方法名
  let fn = Symbol();
  context[fn] = this;
  let _this = this; // Foo
  //  bind情况要复杂一点
  const result = function (...innerArgs) { // BoundFoo
    // 第一种情况 :若是将 bind 绑定之后的函数当作构造函数，通过 new 操作符使用，则不绑定传入的 this，而是将 this 指向实例化出来的对象
    // 此时由于new操作符作用  this指向result实例对象  而result又继承自传入的_this 根据原型链知识可得出以下结论
    // this.__proto__ === result.prototype   //this instanceof result =>true
    // this.__proto__.__proto__ === result.prototype.__proto__ === _this.prototype; //this instanceof _this =>true

    // this 是 BoundFoo.prototype  ， _this 是 Foo , 
    if (this instanceof _this === true) {
      // 此时this指向指向result的实例  这时候不需要改变this指向
      this[fn] = _this;
      this[fn](...[...args, ...innerArgs]); //这里使用es6的方法让bind支持参数合并
    } else {
      // 如果只是作为普通函数调用  那就很简单了 直接改变this指向为传入的context
      context[fn](...[...args, ...innerArgs]);
    }
  };
  // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
  // 实现继承的方式: 使用Object.create
  result.prototype = Object.create(this.prototype);
  return result;
};






Person.prototype.say = function() {
  console.log(this.age);
};
let p1 = myNew(Person, "lihua", 18);
console.log(p1.name);
console.log(p1);
p1.say();

// 1.拷贝函数原型
// 2。调用构造函数

