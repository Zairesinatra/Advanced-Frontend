//定义了父类
class Parent {
    constructor(x, y) {
    this.x = x;
    this.y = y;
    }
    sum() {
    console.log(this.x + this.y);
     }
  }
 //子元素继承父类
class Child extends Parent {
    constructor(x, y) {
    super(x, y); //使用super调用了父类中的构造函数
    }
}
var Child = new Child(1, 2);
Child.sum(); //结果为3