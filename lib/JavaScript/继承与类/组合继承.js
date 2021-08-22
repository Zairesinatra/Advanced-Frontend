function OnePiece (DevilFruit) { // OnePiece定义两个属性
    this.DevilFruit = DevilFruit;
    this.school = ["navy","pirate","ResistanceArmy","civilian"]
}
OnePiece.prototype.sayDevilFruit = function () { // 原型上定义方法
    console.log(this.DevilFruit);
}
function General (DevilFruit,name) {
    OnePiece.call(this,DevilFruit); //  General调用OnePiece构造函数继承
    this.name = name; // 定义自身属性
}
General.prototype = new OnePiece(); // 原型链继承方法
General.prototype.sayName = function(){
    console.log(this.name)
}
let instance1 = new General("lava","redDog")
instance1.school.push("justice")
console.log(instance1.school); // [ 'navy', 'pirate', 'ResistanceArmy', 'civilian', 'justice' ]
instance1.sayDevilFruit(); // lava
instance1.sayName(); // redDog

let instance2 = new General("black","blackMustache")
instance2.school.push("Villain")
console.log(instance2.school); // [ 'navy', 'pirate', 'ResistanceArmy', 'civilian', 'Villain' ]
instance2.sayDevilFruit(); // black
instance2.sayName(); // blackMustache