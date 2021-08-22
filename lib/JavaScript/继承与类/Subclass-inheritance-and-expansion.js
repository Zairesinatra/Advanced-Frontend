class Parent {
    constructor(x, y) {
    this.x = x;
    this.y = y;
    }
    sum() {	// 父类有加法方法
    console.log(this.x + this.y);
    }
  }
  // 子类继承父类加法方法，同时 扩展减法方法
  class Child extends Parent {
    constructor(x, y) {
    super(x, y);	// 利用 super 调用父类的构造函数 super 必须在子类 this 之前调用,放到 this 之后会报错
    this.x = x;
    this.y = y;
   }
   sub() {
   console.log(this.x - this.y);
   }
 }
 var child = new Child(6, 6);
 child.sub(); // 0
 child.sum();// 12