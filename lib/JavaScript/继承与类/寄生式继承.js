function object (o) {
    function F () {}
    F.prototype = o;
    return new F();
}
// object 函数非必须,而是任何返回对象的函数皆可
function parasite (original) {
    let clone = object(original); //调用函数创建新对象
    clone.sayHi = function () { // 方式增强对象
        console.log("hi,zs");
    };
    return clone;
}
let person = {
    name: "zs",
    friends: ["lufei","suolong"]
}
let anotherperson = parasite(person);
// 返回的anotherperson对象具有person的所有属性与方法,以及自身新方法
anotherperson.sayHi(); // hi,zs