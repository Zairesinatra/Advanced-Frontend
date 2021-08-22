// 本质上，object()对传入对象进行一次浅拷贝
function object (o) {
    function F () {}
    F.prototype = o;
    return new F();
}

let person = {
    name: "zairesinatra",
    friends:["lufei","kakaxi","suolong"]
}
let instance1 = Object.create(person);
instance1.name = "wx";
instance1.friends.push("atongmu");
let instance2 = Object.create(person);
instance2.name = "gl";
instance2.friends.push("moonHare")
console.log(person.friends); // [ 'lufei', 'kakaxi', 'suolong', 'atongmu', 'moonHare' ]

let pperson = {
    name:"zs",
    friends:["jr","jt","gz","hz"]
};
let instance3 = Object.create(pperson,{
    name:{ value: "zy" },
    friends:{ value: ["xzy"] }
});
console.log(instance3.name); // zy
console.log(instance3.friends); // [ 'xzy' ]
