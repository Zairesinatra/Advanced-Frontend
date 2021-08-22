# JavaScript高级

------

## 1.面向过程与面向对象

### 1.1面向过程

- 面向过程就是分析出<u>解决问题所需要的步骤</u>，然后<u>用函数把这些步骤一步一步实现</u>，使用时候依次调用。

### 1.2面向对象

- 面向对象是把<u>事务分解成为一个个对象</u>，然后<u>由对象之间分工与合作。</u>
- 抽取共用的属性封装成模板

### 1.3面向过程与面向对象对比

|      | 面向过程                                                     | 面向对象                                                     |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 优点 | <u>性能较面向对象高</u>，适合<u>跟硬件联系很紧密</u>的东西，例如单片机就采用的面向过程编程。 | <u>易维护、易复用、易扩展</u>，由于<font color="red">面向对象有封装、继承、多态性</font>的特性，可以设计出低耦合的系统，使系统 更加灵活、更加易于维护 |
| 缺点 | 不易维护、不易复用、不易扩展                                 | 性能比面向过程低                                             |

## 2.对象与类

### 2.1对象

<u><font color="red">对象是由属性和方法组成的</font></u>：是一个 <u>无序键值对</u> 的集合,指的是一个**具体**的事物

- 属性：事物的特征，在对象中用属性来表示（常用名词）
- 方法：事物的行为，在对象中用方法来表示（常用动词）

#### 2.1.1创建对象

```js
//以下代码是对对象的复习
//字面量创建对象
var zs = {
    name: 'zairesinatra',
    age: 23
}
console.log(zs); // {name:"zs",age:23}

//构造函数创建对象
  function Fs(name, age) {
    // console.log(this)
    // 这里的 this 指向构造函数 Fs{}
    this.name = name;
    this.age = age;
 }
var zs = new Fs('zairesinatra', 23)//实例化对象
console.log(zs); // Fs {name:"zs",age:23}
// console.log(zs.__proto__===Fs.prototype) // ture
```

### 2.2类

- 在 ES6 中新增加了类的概念，可以使用 `class` 关键字声明一个类，<u>之后以这个类来实例化对象</u>。类抽象了对象的公共部分，它泛指某一大类（`class`）对象特指某一个，通过类实例化一个具体的对象

#### 2.2.1创建类

1.语法:

```js
// 1.使用class关键字创建类，类名习惯性大写
class name {
  // constructor()方法是类的构造函数，用于传递参数，返回实例对象。即接受参数，返回实例。
  constructor(param1,param2...){
    // this指向创建的实例
    this.param1 = param1;
    this.param2 = param2;
    ...
  }
}     
// 2.使用定义的类创建实例必须new关键字
var xx = new name(param1,param2...);  
// 加了new就会自动调用constructor函数执行，将param1、param2...传递给constructor()中的param1、param2。随后再传入this.param1、this.param2。而this又指向创建的实例。那么实例就有这些属性了。
```

2.示例

```js
 // 1. 创建类 class  创建一个 Fs全栈
 class Fs {
    // 类的共有属性放到 constructor 里面
    constructor(name, age) {
    this.name = name;
    this.age = age;
    }
  }
    // 2. 利用类创建对象 new
    var zs = new Fs('zairesinatra', 23);
    console.log(zs); // Fs { name: 'zairesinatra', age: 23 }
```

#### 2.2.2类创建添加属性和方法

```js
// 1. 创建类 class创建一个类
class Fs {
    // 类的共有属性放到 constructor 里面-constructor是构造器或者构造函数
    constructor(uname, age) {
      this.uname = uname;
      this.age = age;
    }// 注意,方法与方法之间不需要添加逗号
  // 方法不需要 function 关键字
    code(prog) {
      console.log(this.uname + '写' + prog);
    }
}
// 2. 利用类创建对象 new
var zs = new Fs('zairesinatra', 23);
console.log(zs); // Fs { uname: 'zairesinatra', age: 23 }
zs.code('prog'); // zairesinatra写prog
```

```js
1. 通过 class 关键字创建类, 类名我们还是习惯性定义首字母大写
2. 类 里面有个 constructor 函数,可以接受传递过来的参数,同时返回实例对象
3. constructor 函数 只要 new 生成实例时,就会自动调用这个函数, 如果我们不写这个函数,类也会自动生成这个函数
4. 多个函数方法之间不需要添加逗号分隔
5. 生成实例 new 不能省略
6. 语法规范, 创建类 类名后面不要加小括号,生成实例 类名后面加小括号, 构造函数不需要加function
```

#### 2.2.3类的继承

**1.继承语法**

```js
// 父类
class Parent{   
  constructor(){}
  teach(){console.log("父母总教导我")}
} 
// 子类继承父类的一些属性和方法
class  Child  extends Father {  
}       
var child = new Child()
child.teach(); // "父母总教导我"
```

**2.代码示例**

```js
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
```

- 子类使用super关键字访问父类的方法（super关键字除了调用父类的构造函数，还可以调用父类的普通函数）

```js
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
```

```js
注意:
1. 继承中,如果实例化子类输出一个方法,先看子类有没有这个方法,如果有就先执行子类的
2. 继承中,如果子类里面没有,就去查找父类有没有这个方法,如果有,就执行父类的这个方法(就近原则)
3. 如果子类想要继承父类的方法,同时在自己内部扩展自己的方法,利用 super 调用父类的构造函数, super 必须在子类 this 之前调用
```

```js
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
   // 必须先调用父类的构造函数，才能完成子类的赋值操作
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
```

```js
时刻注意 this 的指向问题,类里面的共有的属性和方法一定要加 this 使用.!!! 
// 因为方法中去调用属性的参数会undefined，比如name是实例的方法，所以方法中不能写name，而是this.name
1. constructor 中的 this 指向的是new出来的实例对象 
2. 自定义的方法,一般也指向的 new 出来的实例对象
3. 绑定事件之后 this 指向的就是触发事件的事件源
```

**!Notice: **<u>**在 ES6 中类没有变量提升，所以必须先定义类，才能通过类实例化对象**</u>

```js
var zs = new Fs('zairesinatra',23);
console.log(zs);
class Fs {...}	// 这里就错了
console.log("------")
class Fs {...}	// 先定义类
var zs = new Fs('zairesinatra',23);	// 再创建实例对象
console.log(zs);	// 这里就对了
```

```html
<button>点击zs</button>
<script>
  var that;
  var _that;
  class Zs {
    constructor(name,age){
      that = this;
      console.log(this)
      // constructor里的this指向创建的实例
      this.name = name;
      this.age = age;
      this.btn = document.querySelector('button'); // 类里面共有属性和方法必须加类,参数传递除外!
      this.btn.onclick = this.code; // 这里不用code(),因为不是立即调用;这里是btn调用了
    }
    code(){console.log(this); // 指向<button></button>
           console.log(that.name + "javascript")} // !!!这里如果使用this.name则指向是btn,因为调用了btn
    study(){_that = this; console.log(this)}
  }
  var xzy = new Zs('zairesinatra',23) // ES6没有变量提升,必须先有类再实例化
  console.log(that === xzy) // true
  console.log(_that === xzy) // true
</script>
```

## 3.面向对象版tab 栏切换练习

### 3.1功能需求

增、删、改、查

### 3.2案例准备

1. 获取到标题元素
2. 获取到内容元素
3. 获取到删除的小按钮 x 号
4. 新建js文件,定义类,添加需要的属性方法(切换,删除,增加,修改)
5. 时刻注意this的指向问题

### 3.3切换

- 为获取到的标题绑定点击事件,展示对应的内容区域,存储对应的索引

  ```js
   this.lis[i].index = i;
   this.lis[i].onclick = this.toggleTab;
  ```

- 使用排他,实现只有一个元素的显示

  ```js
   toggleTab() {
     //将所有的标题与内容类样式全部移除
       for (var i = 0; i < this.lis.length; i++) {
       this.lis[i].className = '';
       this.sections[i].className = '';
       }
     //为当前的标题添加激活样式
       this.className = 'liactive';
     //为当前的内容添加激活样式
       that.sections[this.index].className = 'conactive';
    }
  ```

### 3.4添加

- 为添加按钮绑定点击事件 

  ```js
   this.add.onclick = this.addTab;
  ```

- 实现标题与内容的添加,做好排他处理

  ```js
  addTab() {
      that.clearClass();
      // (1) 创建li元素和section元素 
      var random = Math.random();
      var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi">				</span></li>';
      var section = '<section class="conactive">测试 ' + random + '</section>';
      // (2) 把这两个元素追加到对应的父元素里面
      that.ul.insertAdjacentHTML('beforeend', li);
      that.fsection.insertAdjacentHTML('beforeend', section);
      that.init();
      }
  ```

### 3.5删除

- 为元素的删除按钮x绑定点击事件

  ```js
   this.remove[i].onclick = this.removeTab;
  ```

- 获取到点击的删除按钮的所在的父元素的所有,删除对应的标题与内容

  ```js
   removeTab(e) {
       e.stopPropagation(); // 阻止冒泡 防止触发li 的切换点击事件
       var index = this.parentNode.index;
       console.log(index);
       // 根据索引号删除对应的li 和section   remove()方法可以直接删除指定的元素
       that.lis[index].remove();
       that.sections[index].remove();
       that.init();
       // 当我们删除的不是选中状态的li 的时候,原来的选中状态li保持不变
       if (document.querySelector('.liactive')) return;
       // 当我们删除了选中状态的这个li 的时候, 让它的前一个li 处于选定状态
       index--;
       // 手动调用我们的点击事件  不需要鼠标触发
       that.lis[index] && that.lis[index].click();
   }
  ```

### 3.6编辑

- 为元素(标题与内容)绑定双击事件

  ```js
   this.spans[i].ondblclick = this.editTab;
   this.sections[i].ondblclick = this.editTab;
  ```

- 在双击事件处理文本选中状态,修改内部DOM节点,实现新旧value值的传递

  ```js
  editTab() {
      var str = this.innerHTML;
      // 双击禁止选定文字
      window.getSelection ? window.getSelection().removeAllRanges() : 				    document.selection.empty();
      // alert(11);
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = str;
        input.select(); // 文本框里面的文字处于选定状态
        // 当我们离开文本框就把文本框里面的值给span 
        input.onblur = function() {
        this.parentNode.innerHTML = this.value;
        };
        // 按下回车也可以把文本框里面的值给span
        input.onkeyup = function(e) {
        if (e.keyCode === 13) {
        // 手动调用表单失去焦点事件  不需要鼠标离开操作
        this.blur();
        }
      }
  }
  ```

  

面对对象编程方法：先把公共的属性和方法抽取出来，写入类中。再实例化各种对象即可。

## 4. 严格模式

严格模式通过**抛出错误**来消除了一些原有**静默错误**、**修复**导致 JavaScript 引擎难以执行优化的缺陷、**禁用**在ECMAScript的未来版本中可能会定义的一些语法、**提高**编译器效率，增加运行速度。

#### 开启：

为**脚本开启严格模式**

所有语句之前放一个特定语句 `"use strict"`。这里注意语法陷阱——不可盲目合并冲突代码。严格与非严格模式合并会导致问题。建议逐个函数开启严格模式。

```js
// 整个脚本都开启严格模式的语法
"use strict";
var v = "a strict mode script!";
```

**为函数开启严格模式**

把 `"use strict";` (或 `'use strict'; `)声明*完全*放在函数体所有语句之前

```js
function strict() {
  // 函数级别严格模式语法
  'use strict';
  function nested() {
    return "And so am I!";
  }
  return "Hi!  I'm a strict mode function!  " + nested();
}

function notStrict() {
  return "I'm not strict.";
}
```

#### 变化：

**将过失错误转成异常**

- 严格模式下*无法再意外创建全局变量*。在普通模式下的 JavaScript 里给错误命名的变量名赋值会使全局对象新增属性并继续执行。而严格模式中意外创建全局变量被抛出错误替代：

```js
"use strict"
var zs = 23;
zss = 24; // ReferenceError: zss is not defined
```

- 引起静默失败（silently fail,注:不报错也没有任何效果）的赋值操作抛出异常：给不可写属性赋值、给只读属性赋值、给不可扩展对象的新属性赋值、删除不可删除的属性时会抛出异常：

```js
NaN = "zsxzy" // TypeError: Cannot assign to read only property 'NaN' of object '#<Object>'
var obj1 = {};
Object.defineProperty(obj1, "xxx", { value: 6, writable: false });
obj1.xxx = 66; // TypeError: Cannot assign to read only property 'xxx' of object '#<Object>'

// ES6新增对象方法的访问描述符：get(只读)、set(只写)
var obj2 = { get x() { return 23; } };
obj2.x = 24; //TypeError: Cannot set property x of #<Object> which has only a getter

var fixed = {};
Object.preventExtensions(fixed);
fixed.newProp = "zyzy"; // TypeError: Cannot add property newProp, object is not extensible

delete Object.prototype; // TypeError: Cannot delete property 'prototype' of function Object() { [native code] }
```

- **唯一**的对象内属性名（ECMAScript6中已经不复存在）、函数的参数名

```js
"use strict";
var obj = { a: 1, a: 2 }; // 本人试了没报错

function sum(a, a, c) {
    "use strict";
    return a + a + c; // SyntaxError: Duplicate parameter name not allowed in this context
}
```

- 禁止八进制语法以及禁止设置 **primitive** 值的属性

```js
(function() {
    "use strict";
    // TypeError: Cannot create property
    false.false = "";  
    (23).sailing = "home";
    "with".you = "far away";
  })();
```

**简化变量使用：**

- 禁用 `with`

```js
"use strict";
var x = 23;
with (obj) {
  // 如果没有开启严格模式,with中的这个x会指向with上面的那个x,还是obj.x？
  // 这种代码让引擎无法进行优化,速度也就会变慢
  x;
}
```

- 严格模式禁止删除声明变量

```js
eval("var y; delete y;"); // !!! 语法错误
```

-  `eval` 不为上层范围引入新变量（eval 里是 eval 里）

```js
var x = 18;
var evalX = eval("'use strict'; var x = 23; x");
console.log(x === 18); // true
console.log(evalX === 23); // true
```

**ECMAScript5中的严格模式限制：**

- 部分字符成保留的关键字：

在严格模式下，不能再用这些名字作为变量名或者形参名：`implements`, `interface`, `let`, `package`, `private`, `protected`, `public`, `static`和`yield`。

- 禁止不在脚本或者函数层面进行函数声明：

```js
"use strict";
if (true) {
  function f() { } // !!! 语法错误
  f();
}

for (var i = 0; i < 5; i++) {
  function f2() { } // !!! 语法错误
  f2();
}

function baz() { // 合法
  function eit() { } // 同样合法
}
```

**严格模式下 this 指向问题：**

在严格模式下通过`this`传递给一个函数的值不会被强制转换为一个对象。对一个普通的函数来说，`this`总会是一个对象：不管调用时`this`它本来就是一个对象；还是用布尔值，字符串或者数字调用函数时函数里面被封装成对象的`this`；还是使用`undefined`或者`null`调用函数式`this`代表的全局对象（使用[`call`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call), [`apply`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)或者`bind`方法来指定一个确定的`this`）。这种自动转化为对象的过程不仅是一种性能上的损耗，同时在浏览器中暴露出全局对象也会成为安全隐患，因为全局对象提供了访问那些所谓安全的JavaScript环境必须限制的功能的途径。所以对于一个开启严格模式的函数，指定的`this`不再被封装为对象，而且如果没有指定`this`的话它值是`undefined`：

```js
"use strict";
function fun() { return this; }
console.assert(fun() === undefined);
console.assert(fun.call(2) === 2);
console.assert(fun.apply(null) === null);
console.assert(fun.call(undefined) === undefined);
console.assert(fun.bind(true)() === true);
```

① 严格模式下全局作用域中函数中的 this 是 undefined 而非普通模式的 window 对象。

② 严格模式下,如果 构造函数 不加 new 调用 this 指向的是 undefined 若继续赋值则报错，而非普通模式的构造函数时不加 new 也可以 调用,当普通函数，this 指向全局对象。

③ new 实例化的构造函数指向创建的对象实例。

④ 定时器 this 还是指向 window 。

⑤ 事件、对象还是指向调用者。

> 主流浏览器现在实现了严格模式。但是不要盲目的依赖它，因为市场上仍然有大量的浏览器版本只部分支持严格模式或者根本就不支持（比如IE10之前的版本）。*严格模式改变了语义。*依赖这些改变可能会导致没有实现严格模式的浏览器中出现问题或者错误。

