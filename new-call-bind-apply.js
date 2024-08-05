Function.prototype.myCall = function (context, ...args) {
  if (!context || context === null) {
    context = window;
  }
  console.log('context', context);
  // 创造唯一的key值  作为我们构造的context内部方法名
  let fn = Symbol();
  console.log('fn', fn);
  context[fn] = this; //this指向调用call的函数
  console.log('context[fn]', context[fn]);
  // 执行函数并返回结果 相当于把自身作为传入的context的方法进行调用了
  return context[fn](...args);
};

function myNew(fn, ...args) {
  // 原型拷贝
    let obj = Object.create(fn.prototype);
    console.log('obj', obj);
    // 原型拷贝调方法
    let res = fn.myCall(obj, ...args); // 用自定义myCall 替换call
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


// function Person(name, age) {
//   console.log('dddd');
// }
console.log('Person', Person.prototype);
// let sb = Symbol();
// Person.prototype[sb] = Person
// Person.prototype[sb]("lihua", 18)
// console.log('Person', Person.prototype);

// Person("lihua", 18)
// console.log('Person2', Person);





Person.prototype.say = function() {
  console.log(this.age);
};
let p1 = myNew(Person, "lihua", 18);
console.log(p1.name);
console.log(p1);
p1.say();

// 1.拷贝函数原型
// 2。调用构造函数

