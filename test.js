function Foo(name) {
    this.name = name;
  }

//   const a = Object.create(Foo.prototype);
//   console.log(a.__proto__ === Foo.prototype);

//   function result(name) {
//     this.name1 = name1
//   }

//   result.prototype = Object.create(Foo.prototype);

//   console.log(result.prototype === Foo.prototype);
  
  Foo.prototype.sayName = function() {
    console.log(this.name);
  };
  
  const obj = { name: "Hello" };
  const BoundFoo = Foo.bind(obj);
  
//   const instance = new BoundFoo("World");
  
//   console.log(instance.name); // 输出: "World"
//   instance.sayName(); // 输出: "World"
  
// //   检查原型链关系
//   console.log(instance.__proto__ === Foo.prototype); // true
//   console.log(instance instanceof Foo); // true
//   console.log(instance.__proto__.__proto__ === obj.__proto__); // true
//   console.log(instance instanceof Foo); // true