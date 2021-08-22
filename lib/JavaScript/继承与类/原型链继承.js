// 原型链基本思想就是通过原型继承多个引用类型的属性和方法
// 创建的每个函数都有一个 prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。
// Person.prototype是一个对象，这个对象上定义了一个getSuperProperty方法，这个方法你return this.superproperty，重点来了，这个方法是instance.getSuperProperty()执行的，所以getSuperProperty()方法中的this指的就是instance,这个你new出来的对象，而instance这个对象上有superproperty这个属性。
function Parent () {
    this.superproperty = true;
}
Parent.prototype.getSuperProperty = function () {
    console.log(this) // Parent{ subproperty: false }
    return this.superproperty;
}
function Child () {
    this.subproperty = false;
}
Child.prototype.getSubProperty = function () {
    console.log(this)
    return this.property
}
// 新方法与方法覆盖必须在原型赋值之后
Child.prototype = new Parent()
let instance = new Child()
console.log(instance.getSuperProperty()) // true
// 默认情况下所有类型都继承自Object,这也是为什么能继承toString()、valueof()在内的默认方法原因
console.log(Parent.prototype.__proto__ == Object.prototype)
// 原型与实例的关系判断-instanceof、.isPrototypeOf()
console.log(instance instanceof Child) // true
console.log(instance instanceof Parent) // true
console.log(instance instanceof Object) // true
console.log(Object.prototype.isPrototypeOf(Parent)) // true

// 问题-原型包含的引用值会在所有实例中共享
function OnePiece () {
    this.DevilFruit = ["Rubber","Light","flame"]
}
OnePiece.prototype = function () {
    return this.DevilFruit
}
function Pirate () {}
Pirate.prototype = new OnePiece()
let instance1 = new Pirate()
instance1.DevilFruit.push("Shocking")
console.log(instance1.DevilFruit); // [ 'Rubber', 'Light', 'flame', 'Shocking' ]
let instance2 = new Pirate()
console.log(instance2.DevilFruit); // [ 'Rubber', 'Light', 'flame', 'Shocking' ]