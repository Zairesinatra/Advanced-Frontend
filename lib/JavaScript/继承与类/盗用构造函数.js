function OnePiece () {
    this.DevilFruit = ["Rubber","Light","flame"]
}
function Pirate () {
    OnePiece.call(this) // 通过call(),OnePiece在Pirate的实例创建的新对象的上下文环境执行
}
let instance1 = new Pirate();
instance1.DevilFruit.push("shocking")
console.log(instance1.DevilFruit); // [ 'Rubber', 'Light', 'flame', 'shocking' ]

let instance2 = new Pirate();
console.log(instance2.DevilFruit); // [ 'Rubber', 'Light', 'flame' ]

//---问题局限
function Parent () {
    this.name = " xw ",
    this.Ucanget = function () {
        console.log("you got it" + this.name)
    }
}
Parent.prototype.ucantget = function () {
    console.log("you can't get it" + this.name)
}
function Child () {
    Parent.call(this)
}
var instance = new Child()
console.log(instance.Ucanget()); // you got it xw
console.log(instance.Ucantget()); // undefined  TypeError: instance.Ucantget is not a function
