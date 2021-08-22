// 1. 创建类 class创建一个类
class Fs {
    // 类的共有属性放到 constructor 里面-constructor是构造器或者构造函数
    constructor(uname, age) {
      this.uname = uname;
      this.age = age;
    }//------------------------------------------->注意,方法与方法之间不需要添加逗号
    code(prog) {
      console.log(this.uname + '写' + prog);
    }
}
// 2. 利用类创建对象 new
var zs = new Fs('zairesinatra', 23);
console.log(zs); // Fs { uname: 'zairesinatra', age: 23 }
zs.code('prog'); // zairesinatra写prog

// 通过class创建类,类名习惯性大写
// constructor函数接受传递的参数并返回实例对象
// constructor函数只要new生成实例会自动调用,不写constructor也会生成
// 生成实例的new不能省略
// 注意规范,创建类后面不需要加小括号,生成实例、类名后加小括号.且构造函数不需要function