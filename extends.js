/** 原型链继承 */ 
console.log('原型链继承')
function Parent() {
    this.name = 'parent1';
    this.play = [1, 2, 3]
  }
  function Child() {
    this.type = 'child2';
  }
Child.prototype = new Parent();  /*关键 */
let a1 = new Child();
let a2 = new Child();
a1.play.push(4);
console.log(a1.play, a2.play);  // 不互相影响

/** 构造函数继承 */
console.log('构造函数继承')
function Parent1(){
    this.name = 'parent1';
    this.play = [1, 2, 3]
}
Parent1.prototype.getName = function () {
    return this.name;
}
function Child1(){
    Parent1.call(this); /*关键 */
    this.type = 'child'
}
let b1 = new Child1();
let b2 = new Child1();
b1.play.push(4);
console.log(b1.play, b2.play);  // 不互相影响
console.log(b1.getName, b2.getName);  // 读不到


/**组合继承 */
console.log('组合继承')
function Parent2(){
    this.name = 'parent1';
    this.play = [1, 2, 3];
}
Parent2.prototype.getName = function () {
    return this.name;
}
function Child2(){
    Parent2.call(this); /*关键 */
    this.type = 'child'
}
/*关键 */ 
Child2.prototype = new Parent2(); // 多一次构造的性能开销
Child2.prototype.constructor = Child2;
let c1 = new Child2();
let c2 = new Child2();
c1.play.push(4);
console.log(c1.play, c2.play);  // 不互相影响
console.log(c1.getName, c2.getName);  // 不互相影响


/** 原型式继承 */
console.log('原型式继承')
let parent4 = {
    name: "parent4",
    friends: ["p1", "p2", "p3"],
    getName: function() {
      return this.name;
    }
  };
  let person4 = Object.create(parent4); /*关键 */
  person4.name = "tom";
  person4.friends.push("jerry");
  let person5 = Object.create(parent4);
  person5.friends.push("lucy");
  console.log(person4.name); // tom
  console.log(person4.name === person4.getName()); // true
  console.log(person5.name); // parent4
  console.log(person4.friends); // ["p1", "p2", "p3","jerry","lucy"] /* 关键 */
  console.log(person5.friends); // ["p1", "p2", "p3","jerry","lucy"] /* 关键 */

  /** 寄生式继承 */
  console.log('寄生式继承')
  let parent5 = {
    name: "parent5",
    friends: ["p1", "p2", "p3"],
    getName: function() {
        return this.name;
    }
};
function clone(original) {
    let clone = Object.create(original);
    clone.getFriends = function() {
        return this.friends;
    };
    return clone;
}
let person6 = clone(parent5);
console.log(person6.getName()); // parent5
console.log(person6.getFriends()); // ["p1", "p2", "p3"]

/** 组合寄生式继承 */ 
console.log('组合寄生式继承')
function Parent6(){
    this.name = 'parent6';
    this.play = [1, 2, 3]
}
function Child6() {
    Parent6.call(this)
    this.type = 'child6';
  }
Parent6.prototype.getName = function () {
    return this.name;
}
/** 关键*/ 
Child6.prototype = Object.create(Parent6.prototype)
Child6.prototype.constructor = Child6

let d1 = new Child6();
let d2 = new Child6();
d1.play.push(4);
console.log(d1.play, d2.play);  // 不互相影响
console.log(d1.getName, d2.getName);  // 不互相影响