用哪个关键字创建类：class；子类如何继承父类关键字：extends；调用父类中的构造函数与普通函数关键字是：super。

```javascript
// 类中添加方法
// 1. 创建类 class  创建一个 明星类
class Star {
  // 类的共有属性放到 constructor 里面
  constructor(uname, age) {
    this.uname = uname;
    this.age = age;
  }
  sing(song) {
    // console.log('我唱歌');
    console.log(this.uname + song);
  }
}
// 2. 利用类创建对象 new
var ldh = new Star("刘德华", 18);
var zxy = new Star("张学友", 20);
console.log("ldh");
console.log(zxy);
// 类里面所有的函数不需要写function
// 多个函数方法之间不需要添加逗号分隔
ldh.sing("冰雨");
zxy.sing("李香兰");
```

```javascript
// 类的继承
class Father {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  sum() {
    console.log(this.x + this.y);
  }
}
class Son extends Father {
  constructor(x, y) {
    super(x, y); //调用了父类中的构造函数
  }
}
var son = new Son(1, 2);
var son1 = new Son(11, 22);
son.sum();
son1.sum();
```

```javascript
// super 关键字调用父类普通函数
class Father {
  say() {
    return "我是爸爸";
  }
}
class Son extends Father {
  say() {
    // console.log('我是儿子');
    console.log(super.say() + "的儿子");
    // super.say() 就是调用父类中的普通函数 say()
  }
}
var son = new Son();
son.say();
// 继承中的属性或者方法查找原则: 就近原则
// 1. 继承中,如果实例化子类输出一个方法,先看子类有没有这个方法,如果有就先执行子类的
// 2. 继承中,如果子类里面没有,就去查找父类有没有这个方法,如果有,就执行父类的这个方法(就近原则)
```

```javascript
// 父类有加法方法
class Father {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  sum() {
    console.log(this.x + this.y);
  }
}
// 子类继承父类加法方法 同时 扩展减法方法
class Son extends Father {
  constructor(x, y) {
    // 利用super 调用父类的构造函数
    // super 必须在子类this之前调用
    super(x, y);
    this.x = x;
    this.y = y;
  }
  subtract() {
    console.log(this.x - this.y);
  }
}
var son = new Son(5, 3);
son.subtract();
son.sum();
```

创建对象的三种方式：字面量方式、new 关键字、借用构造函数。
new执行做的四件事情：在堆内存中创建一个新的空对象、让 this 指向这个新的对象、执行构造函数里面的代码，给这个新对象添加属性和方法。返回这个新对象（构造函数里面不需要 return ）。

```javascript
// 1. 利用 new Object() 创建对象
var obj1 = new Object();
// 2. 利用 对象字面量创建对象
var obj2 = {};
// 3. 利用构造函数创建对象
function Star(uname, age) {
  this.uname = uname;
  this.age = age;
  this.sing = function () {
    console.log("我会唱歌");
  };
}
var ldh = new Star("刘德华", 18);
var zxy = new Star("张学友", 19);
console.log(ldh);
ldh.sing
```

成员：在构造函数中的属性和方法统称为成员。
实例成员：构造函数内部通过this添加的成员，实例成员只能通过实例化的对象来访问。
静态成员：在构造函数本身上添加的成员，只能通过构造函数来访问，不能通过由构造函数创建的实例访问

```javascript
// 构造函数中的属性和方法我们称为成员, 成员可以添加
function Star(uname, age) {
  this.uname = uname;
  this.age = age;
  this.sing = function () {
    console.log("会唱歌");
  };
}
var ldh = new Star("刘德华", 18);
// 1.实例成员就是构造函数内部通过this添加的成员 uname age sing 就是实例成员
// 实例成员只能通过实例化的对象来访问
console.log(ldh.uname);
ldh.sing();
// console.log(Star.uname); // 不可以通过构造函数来访问实例成员
// 2. 静态成员 在构造函数本身上添加的成员 sex 就是静态成员
Star.sex = "男";
// 静态成员只能通过构造函数来访问
console.log(Star.sex);
console.log(ldh.sex); // 不能通过对象来访问
```

构造函数的弊端：存在浪费内存的问题。
原型：每一个构造函数都有一个 prototype 属性，指向另一个对象。这个 prototype 就是一个对象，这个对象的所有属性和方法，都会被构造函数所拥有。
原型的作用：资源共享。

```javascript
// 1. 构造函数的问题.
function Star(uname, age) {
  this.uname = uname;
  this.age = age;
  // this.sing = function() {
  //     console.log('我会唱歌');
  // }
}
Star.prototype.sing = function () {
  console.log("我会唱歌");
};
var ldh = new Star("刘德华", 18);
var zxy = new Star("张学友", 19);
console.log(ldh.sing === zxy.sing);
// console.dir(Star);
ldh.sing();
zxy.sing();
// 2. 一般情况下,我们的公共属性定义到构造函数里面, 公共的方法我们放到原型对象身上
```

实例对象原型：实例对象有一个属性 \_\_proto__ 指向构造函数的 prototype 原型对象。
实例对象原型 \_\_proto__ 和构造函数的 prototype 是等价的。

```javascript
function Star(uname, age) {
  this.uname = uname;
  this.age = age;
}
Star.prototype.sing = function () {
  console.log("我会唱歌");
};
var ldh = new Star("刘德华", 18);
var zxy = new Star("张学友", 19);
ldh.sing();
console.log(ldh); // 对象身上系统自己添加一个 __proto__ 指向我们构造函数的原型对象 prototype
console.log(ldh.__proto__ === Star.prototype);
// 方法的查找规则: 首先先看ldh 对象身上是否有 sing 方法,如果有就执行这个对象上的sing
// 如果么有sing 这个方法,因为有__proto__ 的存在,就去构造函数原型对象prototype身上去查找sing这个方法
```

方法的查找规则：首先先看对象身上是否有方法，如果有就执行这个对象上的方法，如果么没有这个方法，因为有\_\_proto__ 的存在，就去构造函数原型对象 prototype 身上去查找方法。

实例对象原型 \_\_proto__ 和构造函数原型对象 prototype 里面都有一个属性 constructor，constructor 称为构造函数，因为它指回构造函数本身。
一般情况下，对象的方法都在构造函数的原型对象中设置。如果有多个对象的方法，可以给原型对象采取对象形式赋值，但是这样就会覆盖构造函数原型对象原来的内容，这样修改后的原型对象 constructor  就不再指向当前构造函数了。此时，可以在修改后的原型对象中，添加一个 constructor 指向原来的构造函数。

```javascript
function Star(uname, age) {
  this.uname = uname;
  this.age = age;
}
// 很多情况下,我们需要手动的利用constructor 这个属性指回 原来的构造函数
// Star.prototype.sing = function() {
//     console.log('我会唱歌');
// };
// Star.prototype.movie = function() {
//     console.log('我会演电影');
// }
Star.prototype = {
  // 如果我们修改了原来的原型对象,给原型对象赋值的是一个对象,则必须手动的利用constructor指回原来的构造函数
  constructor: Star,
  sing: function () {
    console.log("我会唱歌");
  },
  movie: function () {
    console.log("我会演电影");
  },
};
var ldh = new Star("刘德华", 18);
var zxy = new Star("张学友", 19);
console.log(Star.prototype);
console.log(ldh.__proto__);
console.log(Star.prototype.constructor);
console.log(ldh.__proto__.constructor);
```

原型链：每一个实例对象又有一个__proto__属性，指向的构造函数的原型对象，构造函数的原型对象也是一个对象，也有__proto__属性，这样一层一层往上找就形成了原型链。

对象成员查找规则：当访问一个对象的属性、方法时，首先查找这个对象自身有无该属性。如果没有就查找它的原型，也就是 \_\_proto__ 指向的 prototype 原型对象。如果还没有就查找原型对象的原型，即 Object 的原型对象。依此类推一直找到 Object 为止（null），即按照原型链的方式去查找。

```javascript
function Star(uname, age) {
  this.uname = uname;
  this.age = age;
}
Star.prototype.sing = function () {
  console.log("我会唱歌");
};
var ldh = new Star("刘德华", 18);
// 只要是对象就有__proto__ 原型, 指向原型对象
console.log(Star.prototype);
console.log(Star.prototype.__proto__ === Object.prototype);
// Star原型对象里面的__proto__原型指向的是 Object.prototype
console.log(Object.prototype.__proto__);
// Object.prototype原型对象里面的 __proto__ 原型指向为 null
```

```javascript
function Star(uname, age) {
  this.uname = uname;
  this.age = age;
}
Star.prototype.sing = function () {
  console.log("我会唱歌");
};
Star.prototype.sex = "女";
// Object.prototype.sex = '男';
var ldh = new Star("刘德华", 18);
ldh.sex = "男";
console.log(ldh.sex);
console.log(Object.prototype);
console.log(ldh);
console.log(Star.prototype);
console.log(ldh.toString());
```

构造函数中的this与原型对象的this指向的是new出来的实例对象。

```javascript
function Star(uname, age) {
  this.uname = uname;
  this.age = age;
}
var that;
Star.prototype.sing = function () {
  console.log("我会唱歌");
  that = this;
};
var ldh = new Star("刘德华", 18);
// 1. 在构造函数中,里面this指向的是对象实例 ldh
ldh.sing();
console.log(that === ldh);
// 2.原型对象函数里面的this 指向的是 实例对象 ldh
```

拓展内置对象的方法即在内置对象的 prototype 属性上挂载新的方法。

call 方法作用总结：可以调用函数、可以改变这个函数的 this 指向。

```javascript
// call 方法
function fn(x, y) {
  console.log("我想喝美式咖啡");
  console.log(this);
  console.log(x + y);
}
var o = {
  name: "zszs",
};
// fn();
// 1. call() 可以调用函数
// fn.call();
// 2. call() 可以改变这个函数的this指向 此时这个函数的this 就指向了o这个对象
fn.call(o, 1, 2);
```

利用父构造函数继承属性：利用 `call()` 方法可以修改 this 的特性。

```javascript
// 借用父构造函数继承属性
// 父构造函数
function Father(uname, age) {
  // this 指向父构造函数的对象实例
  this.uname = uname;
  this.age = age;
}
// 子构造函数
function Son(uname, age, score) {
  // this 指向子构造函数的对象实例
  Father.call(this, uname, age);
  this.score = score;
}
var son = new Son("刘德华", 18, 100);
console.log(son);
```

利用原型对象继承方法：Son.prototype = new Father() 子构造函数的原型指向 new 出来的父构造函数。

```javascript
// 借用父构造函数继承属性
/*
定义父构造函数，为父元素添加方法
定义子构造函数，子构造函数要继承父构造函数中的方法
在子构造函数中通过 call() 把父类型的 this 指向子类型的 this ，这样就可以实现子类型继承父类型的属性
将子构造函数的原型对象指向父构造函数的实例
因为修改了子构造函数原型对象,一定要利用constructor 指回子构造函数
*/
// 1. 父构造函数
function Father(uname, age) {
  // this 指向父构造函数的对象实例
  this.uname = uname;
  this.age = age;
}
Father.prototype.money = function () {
  console.log(100000);
};
// 2 .子构造函数
function Son(uname, age, score) {
  // this 指向子构造函数的对象实例
  Father.call(this, uname, age);
  this.score = score;
}
// Son.prototype = Father.prototype;  这样直接赋值会有问题,如果修改了子原型对象,父原型对象也会跟着一起变化
Son.prototype = new Father();
// 如果利用对象的形式修改了原型对象,别忘了利用constructor 指回原来的构造函数
Son.prototype.constructor = Son;
// 这个是子构造函数专门的方法
Son.prototype.exam = function () {
  console.log("孩子要考试");
};
var son = new Son("刘德华", 18, 100);
console.log(son);
console.log(Father.prototype);
console.log(Son.prototype.constructor);
```

迭代遍历数组的 forEach 有三个参数，参数一是数组元素，参数二是数组元素的索引，参数三是当前遍历的数组。

```javascript
// forEach 迭代(遍历) 数组
var arr = [1, 2, 3];
var sum = 0;
arr.forEach(function (value, index, array) {
  console.log("每个数组元素" + value);
  console.log("每个数组元素的索引号" + index);
  console.log("数组本身" + array);
  sum += value;
});
console.log(sum);
```

filter 是用来过滤数组的，会将满足条件的数组元素保存到一个新数组中。语法有三个参数，参数一是数组元素，参数二是数组元素的索引，参数三是当前遍历的数组。

```javascript
// filter 筛选数组
var arr = [12, 66, 4, 88, 3, 7];
var newArr = arr.filter(function (value, index) {
  return value % 2 === 0;
});
console.log(newArr); // [12, 66, 4, 88]
```

some 方法用于查找数组中是否有满足条件的元素，返回的是一个布尔值。开始至查找到第一个满足条件的元素就会终止循环。语法有三个参数，参数一是数组元素，参数二是数组元素的索引，参数三是当前遍历的数组。

```javascript
// some 查找数组中是否有满足条件的元素
// var arr = [10, 30, 4];
// var flag = arr.some(function(value) {
//     // return value >= 20;
//     return value < 3;
// });
// console.log(flag);
var arr1 = ["red", "pink", "blue"];
var flag1 = arr1.some(function (value) {
  return value == "pink";
});
console.log(flag1);
// 1. filter 也是查找满足条件的元素 返回的是一个数组 而且是把所有满足条件的元素返回回来
// 2. some 也是查找满足条件的元素是否存在  返回的是一个布尔值 如果查找到第一个满足条件的元素就终止循环
```

forEach 一般应用于数组的遍历，没有返回值。forEach 中 return 不会终止迭代。
some 一般应用于查询数组中唯一的元素，遇到 return true 就终止遍历，迭代效率更高，返回值是布尔值。
filter 一般应用于数据的筛选，遇到 return 不会终止迭代，返回值是一个新数组。

trim 方法去除字符串**两侧**空格。并不影响原字符串本身，返回的是一个新的字符串。

```javascript
var input = document.querySelector("input");
var btn = document.querySelector("button");
var div = document.querySelector("div");
btn.onclick = function () {
  var str = input.value.trim();
  if (str === "") {
    alert("请输入内容");
  } else {
    console.log(str);
    console.log(str.length);
    div.innerHTML = str;
  }
}
```

对象方法 Object.keys() 返回一个对象的所有的属性名并保存到一个数组中。

```javascript
// 用于获取对象自身所有的属性
var obj = {
  id: 1,
  pname: "小米",
  price: 1999,
  num: 2000,
};
var arr = Object.keys(obj);
console.log(arr);
arr.forEach(function (value) {
  console.log(value);
});
```

Object.defineProperty() 定义新属性或修改原有的属性。

- 参数一是当前设置的对象。

- 参数二是需定义或修改的属性的名字。

- 参数三是一个对象。对象中有多个属性。
  
  - 属性一是 value，用于设置属性的值。
    属性二是 writable: false/true。值为 false 不允许修改这个属性值，默认 false。
    属性三是 enumerable: false/true。值为false 则不允许遍历，默认 false。
    属性四是 configurable: false/true。值为false 则不允许删除、修改属性。默认 false。

```javascript
// Object.defineProperty() 定义新属性或修改原有的属性
var obj = {
  id: 1,
  pname: "小米",
  price: 1999,
};
// 1. 以前的对象添加和修改属性的方式
// obj.num = 1000;
// obj.price = 99;
// console.log(obj);
// 2. Object.defineProperty() 定义新属性或修改原有的属性
Object.defineProperty(obj, "num", {
  value: 1000,
  enumerable: true,
});
console.log(obj);
Object.defineProperty(obj, "price", {
  value: 9.9,
});
console.log(obj);
Object.defineProperty(obj, "id", {
  // 如果值为false 不允许修改这个属性值 默认值也是false
  writable: false,
});
obj.id = 2;
console.log(obj);
Object.defineProperty(obj, "address", {
  value: "中国山东蓝翔技校xx单元",
  // 如果只为false 不允许修改这个属性值 默认值也是false
  writable: false,
  // enumerable 如果值为false 则不允许遍历, 默认的值是 false
  enumerable: false,
  // configurable 如果为false 则不允许删除这个属性 不允许在修改第三个参数里面的特性 默认为false
  configurable: false,
});
console.log(obj);
console.log(Object.keys(obj));
delete obj.address;
console.log(obj);
delete obj.pname;
console.log(obj);
Object.defineProperty(obj, "address", {
  value: "中国山东蓝翔技校xx单元",
  // 如果只为false 不允许修改这个属性值 默认值也是false
  writable: true,
  // enumerable 如果值为false 则不允许遍历, 默认的值是 false
  enumerable: true,
  // configurable 如果为false 则不允许删除这个属性 默认为false
  configurable: true,
});
console.log(obj.address);
```

函数定义方式：函数声明方式 function 关键字 (命名函数)；函数表达式 (匿名函数)；new Function("参数1","参数2","函数体")，参数和函数体一定要使用字符串包裹；

```javascript
//  函数的定义方式
// 1. 自定义函数(命名函数)
function fn() {}
// 2. 函数表达式 (匿名函数)
var fun = function () {};
// 3. 利用 new Function('参数1','参数2', '函数体');
var f = new Function("a", "b", "console.log(a + b)");
f(1, 2);
// 4. 所有函数都是 Function 的实例(对象)
console.dir(f);
// 5. 函数也属于对象
console.log(f instanceof Object);
```

函数的六种调用方式：普通函数的调用、对象中的函数调用、构造函数的调用、DOM元素绑定事件调用函数、定时器中调用函数、立即执行函数。

```javascript
// 函数的调用方式
// 1. 普通函数
function fn() {
  console.log("人生的巅峰");
}
// fn();   fn.call()
// 2. 对象的方法
var o = {
  sayHi: function () {
    console.log("人生的巅峰");
  },
};
o.sayHi();
// 3. 构造函数
function Star() {}
new Star();
// 4. 绑定事件函数
// btn.onclick = function() {};   // 点击了按钮就可以调用这个函数
// 5. 定时器函数
// setInterval(function() {}, 1000);  这个函数是定时器自动1秒钟调用一次
// 6. 立即执行函数
(function () {
  console.log("人生的巅峰");
})();
// 立即执行函数是自动调用
```

普通函数 this 指向 window、对象的方法 this 指向的是对象、构造函数 this 指向构造函数 new 出来的实例对象、绑定事件函数 this 指向的是函数的调用者、定时器函数 this 指向的是 window、立即执行函数 this 指向的是 window。

call 可以改变 this 指向并立即调用函数。一般应用于<u>继承</u>。

```javascript
// 改变函数内this指向  js提供了三种方法  call()  apply()  bind()
// 1. call()
var o = {
  name: "andy",
};
function fn(a, b) {
  console.log(this);
  console.log(a + b);
}
fn.call(o, 1, 2);
// call 第一个可以调用函数 第二个可以改变函数内的this 指向
// call 的主要作用可以实现继承
function Father(uname, age, sex) {
  this.uname = uname;
  this.age = age;
  this.sex = sex;
}
function Son(uname, age, sex) {
  Father.call(this, uname, age, sex);
}
var son = new Son("刘德华", 18, "男");
console.log(son);
```

apply 可以调用函数，且改变函数内部的 this 指向。使用 apply 方法传递参数应使用数组传递。一般应用于操作<u>数组</u>数据。

```javascript
// 改变函数内this指向  js提供了三种方法  call()  apply()  bind()
// 2. apply()  应用 运用的意思
var o = {
  name: "andy",
};
function fn(arr) {
  console.log(this);
  console.log(arr); // 'pink'
}
fn.apply(o, ["pink"]);
// 1. 也是调用函数 第二个可以改变函数内部的this指向
// 2. 但是他的参数必须是数组(伪数组)
// 3. apply 的主要应用 比如说我们可以利用 apply 借助于数学内置对象求数组最大值
// Math.max();
var arr = [1, 66, 3, 99, 4];
var arr1 = ["red", "pink"];
// var max = Math.max.apply(null, arr);
var max = Math.max.apply(Math, arr);
var min = Math.min.apply(Math, arr);
console.log(max, min);
```

bind 不会调用原来的函数，却可以改变原来函数内部的 this 指向。返回的是原函数改变 this 之后产生的新函数。通常在函数无需立即调用，但又应改变这个函数内部 this 的指向时使用。

```javascript
var o = {
  name: "andy",
};
function fn(a, b) {
  console.log(this);
  console.log(a + b);
}
var f = fn.bind(o, 1, 2);
f();
// 1. 不会调用原来的函数;可以改变原来函数内部的 this 指向
// 2. 返回的是原函数改变this之后产生的新函数
// 3. 如果有的函数我们不需要立即调用,但是又想改变这个函数内部的this指向此时用bind
// 4. 我们有一个按钮,当我们点击了之后,就禁用这个按钮,3秒钟之后开启这个按钮
// var btn1 = document.querySelector('button');
// btn1.onclick = function() {
//     this.disabled = true; // 这个this 指向的是 btn 这个按钮
//     // var that = this;
//     setTimeout(function() {
//         // that.disabled = false; // 定时器函数里面的this 指向的是window
//         this.disabled = false; // 此时定时器函数里面的this 指向的是btn
//     }.bind(this), 3000); // 这个this 指向的是btn 这个对象
// }
var btns = document.querySelectorAll("button");
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = function () {
    this.disabled = true;
    setTimeout(
      function () {
        this.disabled = false;
      }.bind(this),
      2000
    );
  };
}
```

call 和 apply 以及 bind 总结：相同点都可以改变 this 指向。不同点在于 call 和 apply  会调用函数，并且改变函数内部 this 指向。call 传递参数使用逗号隔开传递，apply 传递参数使用数组传递。bind 不会调用函数。
应用场景：call 经常做继承、apply 经常跟数组有关系。如借助于数学对象实现数组最大值最小值、bind 不调用函数，但是还想改变 this 指向。如改变定时器内部的 this 指向。

严格模式的产生目的为消除 Javascript 语法的一些不合理、不严谨之处，减少了怪异行为。
消除代码运行的一些不安全之处，保证代码运行的安全。提高编译器效率，增加运行速度。
开启严格模式：`use strict`。

什么是严格模式以及如何开启严格模块总结：

- 变量
  在正常模式中变量没有声明就赋值则默认是全局变量；严格模式禁止这种用法，变量都必须先用 var 命令声明再使用。且严禁删除已经声明变量。如 `delete` 语法是错误的。

- this 指向问题
  严格模式下全局作用域中函数中的 this 是 undefined。
  严格模式下如果构造函数不加 new 调用，this 指向的是 undefined。如果赋值会报错。
  new 实例化的构造函数指向创建的对象实例。定时器 this 还是指向 window。事件、对象还是指向调用者。

- 函数变化
  函数不能有重名的参数；
  函数必须声明在最前面；新版本的 JavaScript 引入块级作用域，为了与新版本接轨，不允许在非函数的代码块内声明。

高阶函数是对其他函数进行操作的函数，它接收函数作为参数或将函数作为返回值输出。

闭包 closure 指有权访问另一个函数作用域中变量的函数，一个作用域可以访问另外一个函数的局部变量。 其作用在于延长变量的作用范围。

```javascript
function fn() {
  var num = 10;
  function fun() {
    console.log(num);
  }
  fun();
}
fn();
```

一个函数在内部可以调用其本身，那么这个函数是递归函数。递归函数一定要有跳出条件。

```javascript
var num = 1;
function fn() {
  console.log("我要打印6句话");
  if (num == 6) {
    return; // 递归里面必须加退出条件
  }
  num++;
  fn();
}
fn();
```

```javascript
// 浅拷贝只是拷贝一层, 更深层次对象级别的只拷贝引用.
// 深拷贝拷贝多层, 每一级别的数据都会拷贝.
var obj = {
  id: 1,
  name: "andy",
  msg: {
    age: 18,
  },
  color: ["pink", "red"],
};
var o = {};
// 封装函数
function deepCopy(newobj, oldobj) {
  for (var k in oldobj) {
    // 判断我们的属性值属于那种数据类型
    // 1. 获取属性值  oldobj[k]
    var item = oldobj[k];
    // 2. 判断这个值是否是数组
    if (item instanceof Array) {
      newobj[k] = [];
      deepCopy(newobj[k], item);
    } else if (item instanceof Object) {
      // 3. 判断这个值是否是对象
      newobj[k] = {};
      deepCopy(newobj[k], item);
    } else {
      // 4. 属于简单数据类型
      newobj[k] = item;
    }
  }
}
deepCopy(o, obj);
console.log(o);
var arr = [];
console.log(arr instanceof Object);
o.msg.age = 20;
console.log(obj);
```

正则表达式 Regular Expression 是用于匹配字符串中字符组合的模式。在 JavaScript中，正则表达式也是对象。

正则表达式的创建和检测：利用 new  RegExp 对象来创建、利用字面量创建；使用 test 方法检测字符串是否符合正则表达式要求的规范。

```javascript
// 1. 利用 RegExp对象来创建 正则表达式 - 变化的变量时使用 - vue移动端变色
var regexp = new RegExp(/123/);
console.log(regexp);
// 2. 利用字面量创建 正则表达式
var rg = /123/;
// 3.test 方法用来检测字符串是否符合正则表达式要求的规范
console.log(rg.test(123));
console.log(rg.test('abc'));
```

^ 和 $ 同时出现表示严格匹配。

## ES6语法

let 关键字就是用来声明变量的。使用 let 关键字声明的变量具有块级作用域。在一个大括号中使用 let 关键字声明的变量才具有块级作用域，var 关键字不具备这个特点。可以防止循环变量变成全局变量。使用 let 关键字声明的变量没有变量提升。使用 let 关键字声明的变量具有暂时性死区特性。（ES6规定，let/const 命令会使区块形成封闭的作用域。若在声明之前使用变量，就会报错。总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。这在语法上，称为 “[暂时性死区](https://segmentfault.com/a/1190000015603779)”（ temporal dead zone，简称 TDZ）。）

const 声明的变量是一个常量。既然是常量不能重新进行赋值，如果是基本数据类型，不能更改值，如果是复杂数据类型，不能更改地址值。声明 const 时候必须要给定值。

let、const、var 关键字的区别：使用 var 声明的变量，其作用域为该语句所在的函数内，且存在变量提升现象。使用 let 声明的变量，其作用域为该语句所在的代码块内，不存在变量提升。使用 const 声明的是常量，在后面出现的代码中不能再修改该常量的值。

解构赋值就是把数据结构分解，然后给变量进行赋值。如果结构不成功，变量跟数值个数不匹配的时候，变量的值为 undefined。数组解构用中括号包裹，多个变量用逗号隔开；对象解构用花括号包裹，多个变量用逗号隔开。

```javascript
let ary1 = ['a' , 'b', 'c'];
let [s1, ...s2] = ary1;
console.log(s1, s2); // a, ['b', 'c']
```

```javascript
// 在箭头函数中 如果函数体中只有一句代码 并且代码的执行结果就是函数的返回值 函数体大括号可以省略
// const sum = (n1, n2) => n1 + n2;
// const result = sum(10, 20);
// console.log(result)
// 在箭头函数中 如果形参只有一个 形参外侧的小括号也是可以省略的
// const fn = v => {
// 	alert(v);
// }
// fn(20)
// 箭头函数不绑定this 箭头函数没有自己的this关键字 如果在箭头函数中使用this this关键字将指向箭头函数定义位置中的this
function fn() {
  console.log(this);
  return () => {
    console.log(this);
  };
}
const obj = { name: "zs" };
const resFn = fn.call(obj);
resFn(); // zs
```

Array.from 方法可以把伪数组或者是对象转成数组形式，如果是对象，属性需要为对应的索引值；索引需与值跟长度匹配，如果没有匹配到，那么数组对应位置的值就是undefined。

```javascript
var arrayLike = {
  0: "1",
  1: "2",
  length: 2,
};
var ary = Array.from(arrayLike, (item) => item * 2);
console.log(ary); // {0: 2, 1: 4, length: 2}
```

Array 的实例方法 find 用于找出第一个符合条件的数组成员，若没有找到返回 undefined。

```javascript
var ary = [
  {
    id: 1,
    name: "a",
  },
  {
    id: 2,
    name: "b",
  },
];
let target1 = ary.find((item) => item.id == 3);
let target2 = ary.find((item) => item.id == 1);
console.log(target1, target2); // undefined {id: 1, name: 'a'}
```

Array 实例方法 findIndex 找出第一个符合条件的数组成员的位置，如果没有找到返回 -1。

```javascript
let ary = [10, 20, 50];
let index = ary.findIndex((item) => item > 15);
console.log(index); // 1
```

Array 实例方法 includes 判断数组中是否包含该元素，如果有返回是 true，如果没有返回是false。

```javascript
let ary = ["a", "b", "c"];
let result = ary.includes("a");
console.log(result); // true
result = ary.includes("e");
console.log(result); // false
```

模板字符串语法是用反引号定义。模板字符串 `${变量}` 中可以解析变量，不需要用 + 号进行拼接，使用期间可以换行。在模板字符串中好可以调用函数，用 `${函数()}` 表示。

```javascript
const fn = () => {
  return '我是fn函数'
}
let html = `我是模板字符串 ${fn()}`;
console.log(html) // 我是模板字符串 我是fn函数
```

`startsWith()` 表示参数字符串是否在原字符串的头部；`endsWith()` 表示参数字符串是否在原字符串的尾部，都是返回布尔值。

repeat 方法表示将原字符串重复 n 次，返回一个新字符串。

```javascript
console.log("y".repeat(5)) // yyyyy
```

set 对象是一种数据结构。set 是一个构造函数，用来存储数据，其中的值是唯一的。其实例的方法有：

```javascript
add(value)：添加某个值，返回 Set 结构本身
delete(value)：删除某个值，返回一个布尔值，表示删除是否成功
has(value)：返回一个布尔值，表示该值是否为 Set 的成员
clear()：清除所有成员，没有返回值
```

set 结构的实例与数组一样，也拥有 forEach 方法，用于对每个成员执行某种操作，没有返回值。

```javascript
const s5 = new Set(['a', 'b', 'c']);
  s5.forEach(value => {
    console.log(value) // a b c
})
```


