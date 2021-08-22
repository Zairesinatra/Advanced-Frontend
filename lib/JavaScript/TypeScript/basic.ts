// TS 为 JS 增加类型概念
var foo: string = 'bar';
// 不需要运行即可知道类型原因导致的低级错误
// foo = [];

// 很少用 object 更多用 interface
// 强类型校验能极大避免类型错误
var usr: {
    name: string,
    age: number
} = {
    name: "zs",
    age: 23
}
console.log(usr.name);
let arr: Array<number> = [1, 2, 3];

// 定义接口,可以复用类型
interface Dev {
    name: string,
    language: string
}
// 必须符合接口
let zs: Dev = {
    name: "zszszs",
    language: "JavaScript"
}

// 不确定情况可以使用 any 但是可能得不到智能提示
let sun: any = 10;
sun = '10';
// 使用了 any 仍然想出现其他数据类型的方法可以使用 as 引出其他类型提示方法
let ret: string = (sun as string).charAt(1)
console.log(ret);

// 类型出了用于变量声明还可用于参数的形参
function add (x: number, y: number): number {
    return x + y
}
add(1, 2);
console.log(add(1, 2) + 3);

// void 智能用于函数的返回值
function fn() :void {
    console.log(" no result val ");
}

// 注意在浏览器环境 window 对象本身就有一个成员 name
// 数组按照顺序解构、对象按照键名解构
let {name: nickname, age} = usr

// 不依赖于编辑器以及运行结果定义返回结果类型
function ooo (...args: number[]):number{
    let ini = 0;
    args.forEach(element => {
        ini += element;
    });
    return ini
}
// 参数会被放入数组中
console.log(ooo(1, 2, 3, 4));

class Wow {
    name: string;
    age: number;
    constructor(name: string, age: number){
        this.name = name;
        this.age = age
    }
    sayWow(): void {
        console.log(this.name + "---" +age);
        console.log(`${this.name}`);
        
    }
}
let wow = new Wow("zszs",23);
wow.sayWow();
