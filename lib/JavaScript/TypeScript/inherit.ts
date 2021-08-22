class Person {
    job: string;
    sex: string;
    constructor(job: string, sex: string){
        this.job = job;
        this.sex = sex;
    }
    eat():void {
        console.log("干饭"); 
    }
}
// extends 继承父类的属性与方法
class Dev extends Person {
    // 借用构造函数实现属性的继承 - 构造函数中调用 super 方法传入成员
    constructor(job: string, sex: string) {
        // super() 表示调用父类的构造函数
        super(job,sex);
    }
}
new Dev().eat()
