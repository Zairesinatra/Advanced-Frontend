## 快速上手

### Javascript 库和 jQuery

封装了很多属性和方法的 JavaScript 文件叫库。jQuery 封装了 JavaScript 常用的功能代码，优化了 DOM 操作、事件处理、动画设计和 Ajax 交互。在与原生 JavaScript 相比，jQuery 在跨浏览器兼容、链式编程，隐式迭代、支持插件扩展开发上更具有优势。当前的 version@3.6.x 不兼容 IE 678 等低版本浏览器， 是官方主要更新维护的版本。

### 入口函数

DOM 结构渲染完毕即可执行内部代码，不必等到所有外部资源加载完成，jQuery 完成了封装。相当于原生JavaScript 中的 DOMContentLoaded。不同于原生 JavaScript 中的 load 事件是等页面文档、外部的 js 文件、css文件、图片加载完毕才执行内部代码。

```js
$(function () {   
  ...  // 此处是页面 DOM 加载完成的入口
}) ; //推荐使用
```

```js
$(document).ready(function(){
   ...  //  此处是页面DOM加载完成的入口
});  
```

|          | window.onload            | $(document).ready()           |
| -------- | ------------------------ | ----------------------------- |
| 执行时机 | 页面资源全部加载完成     | 网页中DOM结构加载完成         |
| 执行次数 | 仅一次，后续执行覆盖前次 | 执行多次，执行N次不会覆盖上次 |
| 简写     | 无                       | $(function(){})               |

### 顶级对象 $

jQuery 中 $ 和 jQuery 等价，是 jQuery 中的顶级对象（本质是一个方法），相当于原生JavaScript中的 window，把元素利用 $ 包装成 jQuery 对象，就可以调用 jQuery 的方法。可以用 === 判断 $ 和 jQuery，也可以查看源码，两个符号完全相同。

###  jQuery 对象和 DOM 对象

使用 jQuery 方法和原生获取的元素是不一样的。用原生 JS 获取来的对象就是 DOM 对象，jQuery 方法获取的元素就是 jQuery 对象。jQuery 对象本质是利用 $ 对DOM 对象包装后产生的对象（伪数组形式存储）。

```js
getElementByTagName('div'); // 返回 DOM 对象集合
$('div'); // 返回 jQuery 对象
```

### 对象转换

DOM 对象与 jQuery 对象之间是可以相互转换的。因为原生比 jQuery 更广，原生的一些属性和方法 jQuery 没有给封装. 要想使用这些属性和方法需要把 jQuery 对象转换为 DOM 对象才能使用。

```js
// 1.DOM 对象转换成 jQuery 对象,方法只有一种 —— $(DOM对象)
var box = document.getElementById('box');  // 获取DOM对象
var jQueryObject = $(box);  // 把DOM对象转换为 jQuery 对象

// 2.jQuery 对象转换为 DOM 对象有两种方法：
//   2.1 jQuery对象[索引值]
var domObject1 = $('div')[0]

//   2.2 jQuery对象.get(索引值)
var domObject2 = $('div').get(0)
```

### 选择器

基础选择器

```js
$("选择器")   //  里面选择器直接写 CSS 选择器即可，但是要加引号 
```

| 名称       | 用法              | 描述              |
| ---------- | ----------------- | ----------------- |
| ID选择器   | `$("#id")`        | 指定 ID 元素      |
| 全选选择器 | `$("*")`          | 匹配所有元素      |
| 类选择器   | `$(".class")`     | 同一类 class 元素 |
| 标签选择器 | `$("div")`        | 同类标签元素      |
| 并集选择器 | `("div,p,li")`    | 多个元素          |
| 交集选择器 | `$("li.current")` | 交集元素          |

层级选择器

层级选择器最常用的两个分别为后代选择器和子代选择器。

| 名称       | 用法         | 描述                             |
| ---------- | ------------ | -------------------------------- |
| 子代选择器 | `$("ul>li")` | 仅获取亲儿子层级元素（不顾孙辈） |
| 后代选择器 | `$("ul li")` | 获取所有后代元素（包括孙辈）     |

筛选选择器

| 语法       | 用法            | 描述                              |
| ---------- | --------------- | --------------------------------- |
| :first     | `$('li:first')` | 获取第一个li元素                  |
| :last      | `$('li:last')`  | 获取最后一个li元素                |
| :eq(index) | `$("li:eq(2)")` | 选择获取到的索引为index的前缀元素 |
| :odd       | `$("li:odd")`   | 选择获取到的索引为奇数的元素      |
| :even      | `$("li:even")`  | 选择获取到的索引为偶数的元素      |

其他筛选方法

| 语法                 | 用法                            | 描述                                         |
| -------------------- | ------------------------------- | -------------------------------------------- |
| `parent()`           | `$("li").parent()`              | **查找父级**                                 |
| `children(selector)` | `$("ul").children("li")`        | 相当于`$("ul>li")`，最近一级亲儿子           |
| `siblings(selector)` | `$(".first").siblings("li")`    | 查找兄弟节点不包括自己                       |
| `hasClass(class)`    | `$('div').hasClass("protectd")` | 检查某个元素是否有某个特定的类，有返回`true` |

### 常见操作

设置样式

```js
$('div').css('属性', '值')
```

排他思想

```js
// 想要多选一的效果，排他思想：当前元素设置样式，其余的兄弟元素清除样式。
$(this).css(“color”,”red”);
$(this).siblings(). css(“color”,””);
```

隐式迭代

```js
// 遍历内部 DOM 元素（伪数组形式存储）的过程就叫做隐式迭代。
// 简单理解：给匹配到的所有元素进行循环遍历，执行相应的方法，而不用我们再进行循环，简化我们的操作，方便我们调用。
$('div').hide();  // 页面中所有的div全部隐藏，不用循环操作
```

链式编程

```js
// 链式编程是为了节省代码量，看起来更优雅。
$(this).css('color', 'red').sibling().css('color', ''); 
```

### 样式操作

操作 css 方法（多用于样式少时操作，多了则不太方便。）

```js
// 1.参数只写属性名，则是返回属性值
var strColor = $(this).css('color');

// 2.  参数是属性名，属性值，逗号分隔，是设置一组样式，属性必须加引号，值如果是数字可以不用跟单位和引号
$(this).css(''color'', ''red'');

// 3.  参数可以是对象形式，方便设置多组样式。属性名和属性值用冒号隔开， 属性可以不用加引号
$(this).css({ "color":"white","font-size":"20px"});
```

设置类样式（适合样式多时操作，可以弥补单个操作 css 的不足）

```js
// 1.添加类
$("div").addClass("current");

// 2.删除类
$("div").removeClass("current");

// 3.切换类
$("div").toggleClass("current");
```

### 效果操作

显示隐藏转换

| 语法                          | 参数说明                                                     |
| ----------------------------- | ------------------------------------------------------------ |
| `show(speed,[easing],[fn])`   | 参数省略则直接显示；speed 可选 slow \| normal \| fast 以及毫秒数；easing 可选 swing \| linear；回调函数在完成动画执行函数后执行一次 |
| `hide(speed,[easing],[fn])`   | 参数省略则直接隐藏；speed 可选 slow \| normal fast 以及毫秒数；easing 可选 swing \| linear；回调函数在完成动画执行函数后执行一次 |
| `toggle(speed,[easing],[fn])` | 参数省略则直接隐藏；speed 可选 slow \| normal \| fast 以及毫秒数；easing 可选 swing \| linear；回调函数在完成动画执行函数后执行一次 |

下滑上滑

| 语法                               | 参数说明                                                     |
| ---------------------------------- | ------------------------------------------------------------ |
| `slideDown(speed,[easing],[fn])`   | 参数可省略；speed 可选 slow \| normal \| fast 以及毫秒数；easing 可选 swing \| linear；回调函数在完成动画执行函数后执行一次 |
| `slideUp(speed,[easing],[fn])`     | 参数可省略；speed 可选 slow \| normal \| fast 以及毫秒数；easing 可选 swing \| linear；回调函数在完成动画执行函数后执行一次 |
| `slideToggle(speed,[easing],[fn])` | 参数可省略；speed 可选 slow \| normal \| fast 以及毫秒数；easing 可选 swing \| linear；回调函数在完成动画执行函数后执行一次 |

淡入淡出

| 语法                                    | 参数说明                                                     |
| --------------------------------------- | ------------------------------------------------------------ |
| `fadeIn(speed,[easing],[fn])`           | 参数可省略；speed 可选 slow \| normal \| fast 以及毫秒数；easing 可选 swing \| linear；回调函数在完成动画执行函数后执行一次 |
| `fadeOut(speed,[easing],[fn])`          | 参数可省略；speed 可选 slow \| normal \| fast 以及毫秒数；easing 可选 swing \| linear；回调函数在完成动画执行函数后执行一次 |
| `fadeToggle(speed,[easing],[fn])`       | 参数可省略；speed 可选 slow \| normal \| fast 以及毫秒数；easing 可选 swing \| linear；回调函数在完成动画执行函数后执行一次 |
| `fadeTo([speed],opacity,[easing],[fn])` | 透明度必须写 0-1 之间，其他同上                              |

### 自定义动画

| 语法                                    | 参数说明                                                |
| --------------------------------------- | ------------------------------------------------------- |
| `animate(params,[speed],[easing],[fn])` | params 表示想要更改的样式属性，以对象形式传递；其他同上 |

### 停止动画排队

动画或效果一旦触发就会执行，若多次触发，会造成多个动画或效果排队执行。停止动画排队的方法使用 stop ，`stop()` 写在动画或者效果的前面， 相当于停止结束上一次的动画。最好每次使用动画之前，先调用 `stop()`，再调用动画。

### 属性操作

所谓元素固有属性就是元素本身自带的属性，比如 `<a>` 元素里面的 href ，比如 `<input>` 元素里面的 type。 `prop()` 除了普通属性操作，更适合操作表单属性：disabled / checked / selected 等。开发者给元素添加的属性称为自定义属性。 如给 div 添加 index = "1"。data 方法可以在指定的元素上存取数据，并不会修改 DOM 元素结构。一旦页面刷新，之前存放的数据都将被移除。

| 语法                    | 说明                              |
| ----------------------- | --------------------------------- |
| `prop("属性")`          | 获取属性                          |
| `prop("属性","属性值")` | 设置属性值                        |
| `attr("属性")`          | 获取属性（类似 `getAttribute()`） |
| `attr("属性","属性值")` | 获取属性（类似 `setAttribute()`） |
| `data("属性")`          | 向被选元素获取数据                |
| `data("属性","属性值")` | 向被选元素附加数据                |

### 文本属性

jQuery 的文本属性值常见操作有三种：`html()/ text() / val()`；分别对应原生中的 `innerHTML 、innerText` 和 `value` 属性。注意 `html()` 可识别标签，`text()` 不识别标签。

| 语法                | 说明             |
| ------------------- | ---------------- |
| `$DOM.html()`       | 获取元素内容     |
| `$DOM.html("内容")` | 设置元素内容     |
| `$DOM.text()`       | 获取元素文本内容 |
| `$DOM.text("内容")` | 设置元素文本内容 |
| `$DOM.val()`        | 获取表单值       |
| `$DOM.val("内容")`  | 设置表单值       |

### 元素操作

操作主要是用 jQuery 方法操作标签的遍历、创建、添加、删除等。

遍历元素

```js
$('div').each(function(index,domEle){xxx})
// each匹配每一个元素
// 回调参数index为每个元素索引,domEle为DOM元素非jQuery对象
$.each(object,function(index,element){}) // element为历遍内容
```

创建、添加、删除

```js
// 动态创建元素
$("<li></li>")
// 内部添加是父子关系、外部添加为兄弟关系
// 内部添加
element.append("内容") // 添加匹配元素内容最后
element.preend("内容") // 添加匹配元素内容最前
// 外部添加
element.after("内容") // 添加目标元素最后
element.before("内容") // 添加目标元素前面
// 删除元素
element.remove() // 删除匹配元素
element.empty() // 删除匹配元素集合所有子节点
element.html("") // 清空匹配内容
```

### 尺寸、位置操作

| 语法                                 | 用法                                  |
| ------------------------------------ | ------------------------------------- |
| `width()\height()`                   | 单纯元素宽高                          |
| `innerWidth()\innerHeight()`         | 包含 padding 元素宽高                 |
| `outerWidth()\outerHeight()`         | 包含 padding、border 元素宽高         |
| `outerWidth(true)\outerHeight(true)` | 包含 padding、border、margin 元素宽高 |

| 语法                       | 用法                                       |
| -------------------------- | ------------------------------------------ |
| `offset()`                 | 设置获取元素偏移相对文档偏坐标、与父级无关 |
| `position()`               | 返回被选元素相对带有定位父元素偏移坐标     |
| `scrollTop()\scrollLeft()` | 设置或获取元素被卷去的头部和左侧           |

### 事件注册与解绑

```js
// 普通方式操作简单不用担心事件覆盖等问题,但不能做事件委托,且无法实现事件解绑
element.事件(function(){}) // mouseover、mouseout、blur、focus、change、keydown、keyup、resize、scroll
$("div").click(function(){})
```

```js
// 因为普通注册事件方法的不足,jQuery又创建了多个新的事件绑定方法bind() / live() / delegate() / on()等.其中最好用的是 on()
// 优势1——可以绑定多个事件
$("div").on({mouseover: function(){}, mouseout: function(){}, click: function(){}})
// 优势2——事件处理程序相同
$("div").on({"mouseover mouseout", function(){}})
// 优势3——事件委派——原加给子元素事件绑定给父元素
$("ul").on('click','li',function(){})
// 优势4——动态创建的元素,click()没法绑定事件,on()可以动态生成元素绑定事件
$("div").on('click','p',function(){});$("div").append($("<p>......</p>"));
```

```js
// 当某个事件上面的逻辑，在特定需求下不需要的时候，可以把该事件上的逻辑移除，这个过程我们称为事件解绑。jQuery 为我们提供 了多种事件解绑方法：die() / undelegate() / off() 等，甚至还有只触发一次的事件绑定方法 one()，在这里我们重点讲解一下 off() ;
$("p").off() // 解绑所有的事件处理程序
$("p").off("click") // 接触绑定所有的点击事件
$("ul").off("click","li") // 接触事件委托
```

```js
// 有些时候，在某些特定的条件下，我们希望某些事件能够自动触发, 比如轮播图自动播放功能跟点击右侧按钮一致。可以利用定时器自动触发右侧按钮点击事件，不必鼠标点击触发。由此 jQuery 为我们提供了两个自动触发事件 trigger() 和 triggerHandler() ;
element.click() // 绑定点击触发简写
element.trigger("type") // 绑定自动触发
element.triggerHandler(type) // 不会触发元素默认行为
```

### 默认行为与冒泡

阻止默认行为：`event.preventDefault()` 或者 return false

阻止冒泡：`event.stopPropagation()`

### 拷贝对象

```js
$.extend([deep], target, object1, [objectN])
// deep默认false表示浅拷贝,如果设置为true为深拷贝
// target目标对象
// object1-N表示拷贝的第N个对象
// 浅拷贝对象引用的被拷贝的对象地址,修改目标会改变拷贝对象
// 深拷贝对象完全克隆被拷贝的对象,修改目标不会改变拷贝对象
```

### 多库共存

实际开发中，很多项目连续开发十多年，jQuery 版本不断更新，最初的 jQuery 版本无法满足需求，这时就需要保证在旧有版本正常运行的情况下，新的功能使用新的 jQuery 版本实现，这种情况被称为，jQuery 多库共存。将 $ 符号统一修改为 jQuery，再将 jQuery 变量规定新的名称。

```js
$(function() {
  // 让jQuery 释放对 $ 控制权 让用自己决定
  var suibian = jQuery.noConflict();
  console.log(suibian("span"));
})
```

### 相关插件

[插件库](https://www.jq22.com/)、[瀑布流插件](http://www.htmleaf.com/)、图片懒加载、[全屏滚动](http://www.dowebok.com/demo/2014/77/)、bootstrap组件

## toDoListDemo

### demo介绍

```javascript
// 1. 文本框里面输入内容，按下回车，就可以生成待办事项。
// 2. 点击待办事项复选框，就可以把当前数据添加到已完成事项里面。
// 3. 点击已完成事项复选框，就可以把当前数据添加到待办事项里面。
// 4. 但是本页面内容刷新页面不会丢失。
```

### toDoList 分析

```javascript
// 1. 刷新页面不会丢失数据，因此需要用到本地存储 localStorage
// 2. 核心思路： 不管按下回车，还是点击复选框，都是把本地存储的数据加载到页面中，这样保证刷新关闭页面不会丢失数据
// 3. 存储的数据格式：var todolist =  [{ title : ‘xxx’, done: false}]
// 4. 注意点1： 本地存储 localStorage 里面只能存储字符串格式 ，因此需要把对象转换为字符串 JSON.stringify(data)。
// 5. 注意点2： 获取本地存储数据，需要把里面的字符串转换为对象格式JSON.parse() 我们才能使用里面的数据。
```

### 按下回车把新数据添加到本地存储里面 

```javascript
// 1.切记： 页面中的数据，都要从本地存储里面获取，这样刷新页面不会丢失数据，所以先要把数据保存到本地存储里面。
// 2.利用事件对象.keyCode判断用户按下回车键（13）。
// 3.声明一个数组，保存数据。
// 4.先要读取本地存储原来的数据（声明函数 getData()），放到这个数组里面。
// 5.之后把最新从表单获取过来的数据，追加到数组里面。
// 6.最后把数组存储给本地存储 (声明函数 savaDate())
```

### 本地存储数据渲染加载到页面

```javascript
// 1.因为后面也会经常渲染加载操作，所以声明一个函数 load，方便后面调用
// 2.先要读取本地存储数据。（数据不要忘记转换为对象格式）
// 3.之后遍历这个数据（$.each()），有几条数据，就生成几个小li 添加到 ol 里面。
// 4.每次渲染之前，先把原先里面 ol 的内容清空，然后渲染加载最新的数据。
```

### 删除操作

```javascript
// 1.点击里面的a链接，不是删除的li，而是删除本地存储对应的数据。
// 2.核心原理：先获取本地存储数据，删除对应的数据，保存给本地存储，重新渲染列表li
// 3.我们可以给链接自定义属性记录当前的索引号
// 4.根据这个索引号删除相关的数据----数组的splice(i, 1)方法
// 5.存储修改后的数据，然后存储给本地存储
// 6.重新渲染加载数据列表
// 7.因为a是动态创建的，我们使用on方法绑定事件
```

### 正在进行和已完成选项操作

```javascript
// 1.当我们点击了小的复选框，修改本地存储数据，再重新渲染数据列表。
// 2.点击之后，获取本地存储数据。
// 3.修改对应数据属性 done 为当前复选框的checked状态。
// 4.之后保存数据到本地存储
// 5.重新渲染加载数据列表
// 6.load 加载函数里面，新增一个条件,如果当前数据的done为true 就是已经完成的，就把列表渲染加载到 ul 里面
// 7.如果当前数据的done 为false， 则是待办事项，就把列表渲染加载到 ol 里面
```

### 统计正在进行个数和已经完成个数

```javascript
// 1.在我们load 函数里面操作
// 2.声明2个变量 ：todoCount 待办个数  doneCount 已完成个数   
// 3.当进行遍历本地存储数据的时候， 如果 数据done为 false， 则 todoCount++, 否则 doneCount++
// 4.最后修改相应的元素 text() 
```

## 小结

- 将 DOM 对象转换为 jQuery 对象的方法是 `$()`
- `jQuery`的两大特点是：链式编程和隐式迭代
- `jQuery`中选择器分为哪三种: 基础选择器、层级选择器、过滤选择器（筛选选择器）
- `jQuery`中常见的类操作方法：`addClass()`、removeClass()、`toggleClass()`
- `jQuery`中阻止动画排队的方法是：`stop()`
- `jQuery`中滑入、滑出、滑出切换效果方法：`slideDown()`、`slideUp() 与 $("selector").slideToggle()`;

```js
jQuery修改样式css方法：
获取值var strColor = $(this).css('color');
赋值$(this).css(''color'', ''red'');
赋值$(this).css({ "color":"white","font-size":"20px"});
```

---

## 选择题

### 1. 下面哪种不是 jQuery 的选择器？

A、基本选择器	B、层次选择器	C、css选择器👍	D、表单选择器

### 2. 当 DOM 加载完成后要执行的函数正确的是？

```js
A、jQuery(expression, [context])
B、jQuery(html,[ownerDocument])
C、jQuery(callback)👍
D、jQuery(elements)
```

### 3. 哪一项是用来追加到指定元素的末尾？

```js
A、insertAfter()	B、append()	C、appendTo()👍	D、after()
/*
$(A).append(content|fn)  在匹配的元素A内部结尾追加内容
$(A).appendTo(B)  将A的内容追加到B内部结尾
$(A).prepend(content)     在匹配的元素A内部的开头插入content内容
$(A).prependTo(B)  将匹配到的A元素追加到B的开头

$(A).after(content)        在匹配的元素A之后插入内容content
$(A).before(content)      在匹配的元素A之前插入内容content
$(A).insertAfter(B)          将A的内容追加到B之后
$(A).insertBefore(B)        将A的内容追加到B之前
*/
```

### 4. 哪一项不是 jQuery 对象访问的方法？

```js
A、each()	B、size()	C、.length	D、onclick()👍
```

### 5. 在 jQuery 中想要找到所有元素的同辈元素可以实现的是？

```
A、eq(index)	B、find(expr)	C、siblings([expr])👍	D、next() 
```

### 6. 如果需要匹配包含文本的元素，用下面哪种来实现？

```js
A、text()	B、contains()👍	C、input()	D、attr(name)
/*
text() 是 jQuery 中的方法,可是设置或返回被选元素的文本内容
:contains 选择器选取包含指定字符串的元素,字符串也可以是文本
:input() 选择器选取表单元素
attr(name,value) 属性操作设置或返回被选元素的属性和属性值
*/
```

### 7. 要找到一个表格的指定行数的元素用哪个方法可以快速找到指定元素？

```
A、text()	B、get()	C、eq()👍	D、contents( )
```

### 8. 下面哪种不属于 jQuery 的筛选？

```
A、过滤	B、自动👍	C、查找	D、串联
```

### 9. 下面哪几种是属于 jQuery 文档处理的？（全部）

A、包裹        B、替换        C、删除        D、内部和外部插入

### 10. 如果想被选元素之后插入 HTML 标记或已有的元素，下面哪个是实现该功能的？

```js
A、append(content)	B、appendTo(content)	C、insertAfter(content) D、after(content)👍
```

### 11. 在 jQuey 中，如果想要从 DOM 删除所有匹配的元素，下面哪一个是正确的?( ) C

```
A、delete()	B、empty()	C 、remove()	D、removeAll()👍
```

### 12. 在 jQuery 中想要给第一个指定的元素添加样式，下面哪一个是正确的？

```
A、first        B、eq(1)          C、css(name)   D、css(name,value)👍
```

### 13. 在 jQuery 中想要获取当前窗口的宽度值，下面哪个是实现该功能的？

```
A、width()👍      B、width(val)       C、width       D、innerWidth()
```

### 14. 为每一个指定元素的指定事件(像click) 绑定一个事件处理器函数，下面哪个是用来实现该功能的？

```
A、trgger (type)    B、bind(type)👍      C、one(type)       D、bind
```

### 15. 在 jQuery 中想要实现通过远程 http get 请求载入信息功能的是下面的哪一操作？

```
A、$.ajax()          B、load(url)         C、$.get(url)👍        D$. getScript(url)
```

\16. 在一个表单中，如果想要给输入框添加一个输入验证，可以用下面的哪个事件实现? ( D)

   A、hover(over ,out) B、keypress (fn)    C、change()    D、change(fn)

\17. 当一个文本框中的内容被选中时，想要执行指定的方法时，可以使用下面哪个事件来实现? (  ) C

   A、click(fn)        B、change(fn)      C、select(fn)       D、bind(fn)

18.以下 jQuery 对象方法中，使用了事件委托的是(  ) D
A、bind            B. 、mousedown    C、change     D、on

19.元素的type属性的取值可以是（多选）ABD
A、image          B、checkbox    C、select       D、button

20.下列jQuery事件绑定正确的是____。A
A. ***\*bind(type,[data],function(eventObject))\****
B. $(‘#demo’).click(function() {})
C. $(‘#demo’).on(‘click’,function() {})
D. $(‘#demo’).one(‘click’,function() {})

21.怎么才能隐藏下面的元素？ C
<input id=”id_txt” name=”txt” type=”text”value=””/>
A. $(“id_txt”).hide();
B. $(#id_txt).remove();
C. $(“#id_txt”).hide();
D. $(“#id_txt”).remove();

\22. jQuery 的方法get()做什么？A
A.使用 HTTP GET 请求从服务器加载数据

B. 返回一个对象
C. 返回存在jQuery对象中的DOM元素
D. 触发一个get AJAX请求

\23. 在jQuery中

 $( '#hello' ).css ( "color"，"#f0000" )

$( '#hello' ).css ( "color"" )

分别表示的含义是: (多选) AB

A. $(‘#hello’).css("color",#0000)表示选择id为hello 的元素，并设置颜色为"f0000"

 $( '#hello' ).css ( "color"" )表示选择id为hello 的元素，并且取到该元素字体显示的颜色

 $(‘#hello' )css("color""f0000"表示选择CSS类为hello的元素，并且取到该元素字体显示的颜色

D. $('hello')css("color")表示选择CSS类为hello 的元素，并且取到该元素字休显示的颜色

\24. 在jQuery中，选择使用myClass类的css的所有元素( )A

A、$(".myClass")    B. 、$("#myClass")     C、${*}        D、${‘body’}

\25. 在jQuery中指定一个类，如果存在就执行删除功能，如果不存在就执行添加功能，下面哪一个是可以直接完成该功能的？（） C

A、removeClass()   B、deleteClass()    C、toggleClass(class) D.addClass()

\26. jQuery中，属于鼠标事件方法的选项是(  ) B

A. onclick( )        B. mouseover( )     C. onmouseout( )    D. blur( )

\27. 在jQuery中，既可绑定两个或多个事件处理器函数，以响应被选元素的轮流的 click 事件，又可以切换元素可见状态的方法是(  )    B

A.. hide( )          B. toggle( )         C. hover( )         D.slideUp( )\

\28. 关于bind( )方法与unbind( )方法说法正确的是( 多选 ) BC D

A. bind( )方法可用来移除单个或多个事件
B  unbind( )方法可以移除所有的或被选的事件处理程序
C. 使用bind( )方法可绑定单个或多个事件

D. unbind( )方法是与bind( )方法对应的方法

\29. 在jQuery中，关于fadeIn()方法正确的是(  ) B

A. 可以改变元素的高度

B 可以逐渐改变被选元素的不透明度，从隐藏到可见（褪色效果）

C 可以改变元素的宽度

D 与fadeIn( )相对的方法是fadeOn( )

\30. 下面选项中（）能获得焦点 A

​    A.blur()        B.select()              C.docus()      D.onfocus()

\31. (  )能够动态改变层中的提示内容 A

A利用html( )方法          B.利用层的id属性

C.使用onblur事件          D.使用display属性

\32. 在jQuery中，通过jQuery对象.css( )可实现样式控制，以下说法正确的是(多选) AB

A. css( )方法会去除原有样式而设置新样式

B. 正确语法：css(“属性”,”值”)

C. css( )方法不会去除原有样式

D. 正确语法：css(“属性”)

\33. 下列选项中,不属于键盘事件的是(  )。D

A.keydown         B.keyup           C.keypress     D.ready

35下列选项中,有关数据验证的说法中正确的是(  )。D

A.使用客户端验证可以减轻服务器压力

B.客观上讲，使用客户端验证也会受限于客户端的浏览器设置。

C. 基于JavaScript的验证机制正是将服务器的验证任务转嫁至客户端，有助于合理使用资源。

D. 以上说法均正确

\36. 以下关于jQuery优点的说法中错误的是(  ) C

A.jQuery的体积较小，压缩以后，大约只有100kb

B.jQuery封装了大量的选择器、DOM操作、事件处理，使用起来比JavaScript简单得多

C.jQuery的浏览器兼容很好，能兼容所有的浏览器

D.jQuery易扩展，开发者可以自己编写jQuery的扩展插件

\37. 在jQuery中，下列关于DOM操作的说法错误的是(  ) AC

A.$(A).append(B)表示将A追加到B中

B.$(A).appendTo(B)表示把A追加到B中

C.$(A).after(B)表示将A插入到B以后

D.$(A).insertAfter(B)表示将A插入到B以后

\38. 以下()函数不是jQuery内置的与AJAX相关的函数。B 

A、 $.ajax()    B.$.get()       C.$.post()          D.$.each()

\39. 以下()选项不能够正确地得到这个标签:( ) B

<input id="btnGo"type=”buttom” value=”点击”class=”btn”>

A.$(“#btnGo”)           B.$(“.btnGo”)    

C.$(“.btn”)              D.$(“input[type=’button’]”)

\40. 以下关于jQuery的描述错误的是（）D

A.jQuery是一个javascript函数库

B. jQuery极大地简化了JavaScript编程

C. jQuery的宗旨是“write less,do more”

D. jQuery的核心功能不是根据选择器查找HTML元素，然后对这些元素执行相关的操作。

\41. 在jQuery中被誉为工厂函数的是（）C

​    A.ready(）      B.function（）      C。$()         D.next( )

## 填空题

### 1. jQuery 访问对象中的 size() 方法的返回值和 jQuery 对象的 <u>length</u> 属性一样。

### 2. jQuery 中 $(this).get(0) 的写法和<u>$(this)[0])</u>等价的。

### 3. 如果想要匹配所有表格行数为偶数的，用 <u>even</u> 实现，奇数的用 <u>odd</u> 实现

### 4. 在一个表单里想要找到指定元素的第一个元素用 first 实现，那么第二个元素用 <u>eq(1)</u> 实现。

### 5. 用一个表达式来检查当前选择的元素集合，可以使用 <u>is(expr)</u> 来实现，如果这个表达式失效，则返回 <u>false</u> 值。

### 6. 在一个表单中将所有的 div 元素都设置为绿色。<u>$( “div”).css( “color”,”green' )</u>

### 7. 当鼠标指针悬停在被选元素上时要运行的两个方法，实现该操作的是<u>$(selector).hover(inFunction,outFunction)</u>

### 8. 想让一个元素隐藏，用 `hide()` 实现，显示隐藏的元素用 `show()` 实现

\11. 在<ul>元素中,添加了多个<li>元素,通过jQuery选择器获取最后一个<li>元素的方法是______  $("li:last")

\12. 在三个<ul>元素中,分别添加多个<li>元素,通过jQuery中的子元素选择器,将这三个<ul>元素中的第一个<li>元素隐藏,代码是______ $("li:first-child").hide();

\13. 在页面的表单中增加了多个<input>类型的复选框元素,其中有的处于选中状态,通过jQuery选择器,将这些选中状态的元素隐藏,代码为_____   $("forminput:checked").hide()

\14. 在ajax中data主要有______. _______ . ___________三种方式  html拼接的，json数组，form表单经serialize()序列化的

\15.  ______方法用于模拟光标悬停事件  hover()

\16. jQuery中提供了__________方法可以停止冒泡 stopPropagation()

\17. 可以用_______,阻止这些默认的行为例如单击超链接后会自动跳转，单击"提交"按钮后表单会提交等  event.preventDefault()

\18. formData:返回一个________，可以通过循环调用来校验  数组

\19. jQuery的______可以给现在元素附加新的元素  html()

\20. jQuery中的选择器大致分为:________ . ________ ._____ .___________

基本选择器，层次选择器，过滤选择器，表单选择器

\21. `conflict()` 方法用于处理命名冲突

## 简答题

### 1. 什么是 jQuery？简述 domready 和 onload 事件的区别；图片的 onloaddomready 页面 onload 的先后顺序以及原因。

jQuery 是继 prototype 之后又一个优秀的 JS 框架。

domready 在 DOM 加载完毕时触发；onload 在页面所有元素都准备好时触发（图片、脚本、样式）。首先domready，其次图片的onload，最后页面的onload

### 2. 解释 XMLHttpRequest 对象，并简要说明  jQuery 中的 $.ajax 方法使用。

XMLHttpRequest 对象提供了一个访问 HTTP 协议的接口与服务器交互数据，实现页面的局部刷新。$.ajax 是 jQuery 中封装好的使用 ajax 的方法，使用时传入 URL、数据类型、失败与成功的调用函数等等。

```js
$.ajax({
  url:'',
  type:'get/post',
  data:{},
  dataType:'',
  success:function(data){
    //....
  }
});
```

### 3. 懒加载技术会让图片进入视野之后延迟一段时间才让用户看到图片，如何改进？

使用图片预加载，将所有图片设定一个 SRC 提前缓存在本地，当用户需要的时候直接从本地加载。

### 4.  jQuery 中的选择器 和 CSS 中的选择器有区别吗？

jQuery 选择器支持 CSS 的选择器。不同于 CSS 中的选择器只能添加相应的样式，jQuery 选择器还可添加相应的行为。

### 5.  jQuery 中 `$.get()` 提交和 `$.post()` 提交有区别吗？

`$.get()` 和 `$.post()` 方法分别使用GET 和 POST 方法来进行异步请求。   2 get请求会将参数跟在URL后进行传递，而POST请求则是作为HTTP消息的实体     内容发送给Web服务器的，这种传递是对用户不可见的。   3 get方式传输的数据大小不能超过2KB 而POST要大的多   4 GET 方式请求的数据会被浏览器缓存起来，因此有安全问题。 

### 6. 如何设置和获取 HTML 和文本的值？

html()方法 类似于innerHTML属性 可以用来读取或者设置某个元素中的HTML内容      注意：html() 可以用于xhtml文档 不能用于xml文档      text()类似于innerText属性 可以用来读取或设置某个元素中文本内容。    val() 可以用来设置和获取元素的值

###  7. 选择器中 id，class有什么区别？  

在网页中每个 id 名称只能用一次，class 可以允许重复使用多次。

### 8. 聊聊 jQuery 表单提交的几种校验方法。

formData:返回一个数组，可以通过循环调用来校验  jaForm：返回一个jQuery对象，所有需要先转换成dom对象    fieldValue：返回一个数组  beforeSend()   

###  9. jQuery 的美元符号 $ 有什么作用？

美元符 $ 是 jQuery 的别名，也是 jQuery 的选择器。

`$(document).ready(function(){ }); 等同于 jQuery(document).ready(function(){});`

### 10. `window.onload()` 函数和 jQuery 中的 `document.ready()` 有什么区别？

- 执行时间上 `window.onload` 必须等到页面内包括图片的所有元素加载完毕后才能执行。`$(document).ready()` 是 DOM 结构绘制完毕后就执行，不必等到加载完毕。`$(document).ready()` 在 `window.onload` 之前执行。
- `window.onload()` 不能同时编写多个，多个 `window.onload()` 方法，只会执行一个；`$(document).ready()` 可以同时编写多个，并且都可以得到执行。
- `window.onload()`没有简化写法，而 `$(document).ready(function(){})` 可以简写成 `$(function(){});`
- `$(document).ready()` 可以跨浏览器，在使用 ajax 请求的时候会自动处理兼容。
- `window.onload` 是 JS 标准，可出现在任何 JS 脚本中。`$(document).ready` 只有在 jQuery 中出现。

### 11. 使用 jQuery 将页面上的所有元素边框设置为 2px 宽的粉虚线

```js
 $("*").css("border", "2px dotted pink"); 
```

 

