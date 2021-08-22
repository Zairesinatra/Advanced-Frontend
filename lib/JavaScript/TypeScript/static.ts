// 类
// 实例成员只能通过 new 出来的实例访问
// 静态成员也称类本身成员只能通过类本身访问
class Person {
    static type: string  = 'human';
    // 实例成员
    name: string = 'zs';
    age: number = 23
    // 方法也默认实例成员
    sayHello() {
        console.log("Human");
    }
    // 方法加上关键字就会变成静态成员
    static wow() {
        console.log("static menber wow");
    }
}
new Person() // 不可访问
Person.type // 可访问
// 类本身就是构造函数 构造函数本身有一个 name 属性
Person.name;
// 实际上实例成员智能被构造出来的实例访问
new Person().name;
new Person().age;
new Person().sayHello
// --- 加上关键字后的静态成员
Person.wow