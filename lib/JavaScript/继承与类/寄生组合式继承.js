function object (o) {
    function F () {}
    F.prototype = o;
    return new F();
}
// 核心逻辑
function inheritPrototype (subType,superType) { // 接受两个参数:子类构造函数、父类构造函数
    let prototype = object(superType.prototype); // 创建对象-父类原型副本
    prototype.constructor = subType; // 增强对象-解决重写原型导致默认constructor丢失
    subType.prototype = prototype; // 赋值对象
}
function Parent (name) {
    this.name = name;
    this.friends = ["atongmu","money"];
}
Parent.prototype.sayName = function () {
    console.log(this.name)
}
function Child (name,age) {
    Parent.call(this,name);
    this.age = age;
}
inheritPrototype (Child,Parent);
Child.prototype.sayAge = function () {
    console.log(this.age)
}
let instance1 = new Child("zairesinatra",23)
instance1.sayAge() // 23
instance1.sayName() // zairesinatra
console.log(instance1.friends); // ["atongmu","money"]