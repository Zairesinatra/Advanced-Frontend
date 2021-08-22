// 类成员默认对外公开 即默认为 public
class Person {
    name: string;
    age: number;
    // 可以在声明类成员同时为其赋值
    // 如果使用修饰符 private 表示只能在类的内部访问,是类的私有成员
    // readonly 只读不允许修改 - 与 const 定义的常量类似
    private readonly type: string = "human"; // constructor(this.type = "human")
    // 外部无法访问,但可以被继承
    protected city: string = 'changsha'
    // 在类的内部访问私有成员
    // 但是无法在外部访问
    getType() {
        return this.type
    }
}
// 可以通过 getType 访问私有成员 - 因为方法又是公开的
// 类的私有成员无法被继承
new Person().getType()

class Dev extends Person {
    getCity() {
        // 可以点到city这个成员
        console.log(this.city);
    }
}
// 外部仍然访问不了city这个成员
new Dev().getCity()