class PPerson {
    // 简写不需要在这里写
    // 构造函数结合类的修饰符进行简写
    public job: string;
    constructor(public name: string, public age: number, job: string){
        this.job = job;
    }
}
console.log(new PPerson('zs',23,'dev'));
