class Parent {
    // surname = 姓
    constructor(surname) {
      this.surname= surname;
    }
    say() {
      console.log('你的姓是' + this.surname);
     }
}

class Child extends Parent{  // 这样子类就继承了父类的属性和方法
}
var zs= new Child('谢');
zs.say();      //结果为 你的姓是谢