// TS 为 JS 增加类型概念
var foo = 'bar';
// 不需要运行即可知道类型原因导致的低级错误
// foo = [];
// 很少用 object 更多用 interface
// 强类型校验能极大避免类型错误
var usr = {
    name: "zs",
    age: 23
};
console.log(usr.name);
var arr = [1, 2, 3];
// 必须符合接口
var zs = {
    name: "zszszs",
    language: "JavaScript"
};
// 不确定情况可以使用 any 但是可能得不到智能提示
var sun = 10;
sun = '10';
// 使用了 any 仍然想出现其他数据类型的方法可以使用 as 引出其他类型提示方法
var ret = sun.charAt(1);
console.log(ret);
// 类型出了用于变量声明还可用于参数的形参
function add(x, y) {
    return x + y;
}
add(1, 2);
console.log(add(1, 2) + 3);
// void 智能用于函数的返回值
function fn() {
    console.log(" no result val ");
}
// 注意在浏览器环境 window 对象本身就有一个成员 name
// 数组按照顺序解构、对象按照键名解构
var nickname = usr.name, age = usr.age;
// 不依赖于编辑器以及运行结果定义返回结果类型
function ooo() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var ini = 0;
    args.forEach(function (element) {
        ini += element;
    });
    return ini;
}
// 参数会被放入数组中
console.log(ooo(1, 2, 3, 4));
var Wow = /** @class */ (function () {
    function Wow(name, age) {
        this.name = name;
        this.age = age;
    }
    Wow.prototype.sayWow = function () {
        console.log(this.name + "---" + age);
        console.log("" + this.name);
    };
    return Wow;
}());
var wow = new Wow("zszs", 23);
wow.sayWow();
