# Promise

------

## 一、准备

### 1.1 实例对象与函数对象

1. 实例对象：new 函数产生的对象，称为实例对象，简称为对象。
2. 函数对象：**将函数作为对象使用时，称为函数对象。**

```js
function Fn () {} // Fn 只能称为函数
const fn = new Fn(); // Fn 只有在执行时存在 new 的情况下才可以称为构造函数; fn 为实例对象 —— 对象
console.log(Fn.prototype); // Fn 作为对象使用时, 才可以称为函数对象
Fn.bind({}); // Fn 作为函数对象使用
$('#test'); // $ 作为函数使用
$.get('/test'); // $ 作为函数对象使用 (使用 HTTP GET 请求从服务器加载数据)
```

> `()`的左边必然是函数，点的左边必然是对象。

### 1.2 回调函数

回调函数是一段可执行的代码段，它作为一个参数传递给其他的代码，其作用是在需要的时候方便调用这段（回调函数）代码。 在 JavaScript 中函数也是对象的一种，同样对象可以作为参数传递给函数，因此函数也可以作为参数传递给另外一个函数，这个作为参数的函数就是回调函数。

#### 同步回调

定义：**立即执行，且完全执行完才结束，不会放入回调队列中**

举例：数组遍历相关的回调、Promise 的 excutor 函数

```js
const arr = [1, 3, 5];
// 单纯遍历 forEach ; 附加功能 map
arr.forEach(item => { // 遍历回调, 同步回调, 不会放入队列, 一上来就要执行!
  console.log(item);
})
console.log('forEach()之后')
// 1
// 3
// 5
// "forEach()之后"
```

#### 异步回调

定义：（启动之后）**不会立即执行，会放入回调队列中将来执行**

举例：定时器回调、ajax 回调、Promise 成功或失败的回调

```js
// 定时器回调
setTimeout(() => { // 异步回调, 会放入队列中将来执行
  console.log('timeout callback()')
}, 0)
console.log('setTimeout()之后')
// “setTimeout()之后”
// “timeout callback()”
// Promise 成功或失败的回调
new Promise((resolve, reject) => {
  resolve(1)
}).then(
  value => {console.log('value', value)},
  reason => {console.log('reason', reason)}
)
console.log('----')
// ----
// value 1
```

**js 引擎是先把初始化的同步代码都执行完成后，才执行回调队列中的代码**。

### 1.3 error 处理

#### 错误类型

**Error：所有错误的父类型（基本类型）**

- ReferenceError：引用的变量不存在

```js
console.log(a); // ReferenceError:a is not defined
// error 若未捕获, 后续代码不会执行
```

- TypeError：数据类型不正确

```js
let b;
console.log(b.xxx); // TypeError:Cannot read property 'xxx' of undefined
let b = {};
b.xxx(); // TypeError:b.xxx is not a function
```

- RangeError：数据值不在其所允许的范围内

```js
function fn() { fn() }
fn(); // RangeError:Maximum call stack size exceeded
```

- SyntaxError：语法错误

```js
const c = """"
// SyntaxError:Unexpected string
```

#### 错误处理

捕获错误：try ... catch

抛出错误：throw error

```js
function something() {
  if (Date.now()%2===1) {
    console.log('当前时间为奇数，可以执行任务')
  } else { //如果时间为偶数抛出异常，由调用来处理
    throw new Error('当前时间为偶数，无法执行任务')
  }
}

// 捕获处理异常
try {
  something()
} catch (error) {
  // error 两个属性 message \ stack
  console.log(error.message);
  console.log(error.stack);
}
```

#### 错误对象

massage 属性：错误相关信息

stack 属性：函数调用栈记录信息

```js
try {
  let d
  console.log(d.xxx)
} catch (error) {
  console.log(error.message)
  console.log(error.stack)
}
console.log('出错之后')
// Cannot read property 'xxx' of undefined
// TypeError:Cannot read property 'xxx' of undefined
// 出错之后
```

> 因为错误被捕获处理了，后面的代码才能运行下去，打印出'出错之后'。

## 二、Promise 的理解和使用

### 2.1 Promise 是什么

#### 2.1.1 Promise 的理解

抽象表达：Promise 是 JS 中进行异步编程的新解决方案。

具体表达：

1. 语法上：Promise 是一个构造函数
2. 功能上：Promise 对象用来封装一个异步操作并可以获取其结果

#### 2.1.2 Promise 的状态改变

1. pending 变为 resolved
2. pending 变为 rejected

只有这两种，且一个 promise 对象只能改变一次。无论成功还是失败，都会有一个结果数据。成功的结果数据一般称为 value，而失败的一般称为 reason。promise 接收一个 excutor ，此 excutor 中又接收两个函数类型的参数 resolve 与 reject 。异步代码写在执行器内。

#### 2.1.3 Promise 的基本流程

![img](./assets/promise.png)

#### 2.1.4 Promise 的基本使用

```js
// 创建一个新的p对象promise
const p = new Promise((resolve, reject) => { // 执行器函数 -- 同步任务
  // 执行异步操作任务
  setTimeout(() => {
    const time = Date.now() 
    // 如果当前时间是偶数代表成功，否则失败
    if (time % 2 == 0) {
      // 如果成功，调用resolve(value)
      resolve('成功的数据，time=' + time)
    } else {
      // 如果失败，调用reject(reason)
      reject('失败的数据，time=' + time)
    }
  }, 1000);
})

p.then(
  value => { // 接收得到成功的value数据 onResolved
    console.log('成功的回调', value)
  },
  reason => { // 接收得到失败的reason数据 onRejected (当失败时执行)
    console.log('失败的回调', reason)
  }
)
```

`.then()` 和执行器 ( excutor ) 同步执行，`.then()` 中的回调函数异步执行。

### 2.2 为什么要用 Promise

#### 1.指定回调函数的方式更加灵活

旧的：必须在启动异步任务前指定回调函数

promise：启动异步任务 => 返回 promise 对象 => 给 promise 对象绑定回调函数（<u>可以在异步任务结束后指定</u>）

```js
// 1. 创建一个新的promise对象
const p = new Promise((resolve, reject) => { // 执行器函数先执行 -- 同步回调
    console.log('执行器函数 excutor 先执行');
    // 异步任务启动但是未完成而已
    // 2. 执行异步操作任务setTimeout
    const time = Date.now(); // 如果当前时间是偶数就代表成功，否则代表失败
    // 3.1.如果成功了,调用 resolve(value)
    if (time %2 == 0) {
      resolve ('成功的数据, time=' + time);
    } else {
      // 3.2.如果失败了,调用reject(reason)
      reject('失败的数据，time=' + time);
    }
})
console.log('new Promise()之后');
// 结果: 执行器函数 excutor 先执行 -> new Promise()之后 -> setTimeout结果(成功的回调 成功的数据, time=...)
setTimeout(()=>{
  p.then(value=>{ // 接收得到成功的 value 数据 onResolved
    console.log('成功的回调', value);
  }, reason =>{ // 接收得到失败的 reason 数据 onRejected
    console.log('失败的回调', reason);
  } // 接收得到失败的reason数据
)
}, 2000);
```

#### 2.支持链式调用，可以解决回调地狱问题

##### 什么是回调地狱？

回调函数嵌套调用，**外部回调函数**异步执行的结果是其**内部嵌套的回调函数**执行的条件。

```js
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result:' + finalResult)
    }, failureCallback)
  }, failureCallback)
}, failureCallback)
```

##### 回调地狱的缺点？

不便于阅读 / 不便于异常处理

##### 解决方案？

promise 链式调用（得到一个 promise 说明启动了一个异步任务）

##### 终极解决方案？

async/await

##### 使用 promise 的链式调用解决回调地狱

```js
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => {
  console.log('Got the final result:' + finalResult)
})
.catch(failureCallback) // 异常传透
```

回调地狱的终极解决方案 async/await

```js
async function request() {
  try{
    const result = await doSomething()
    const newResult = await doSomethingElse(result)
    const finalResult = await doThirdThing(newResult)
    console.log('Got the final result:' + finalResult)
  } catch (error) {
    failureCallback(error)
  }
}
```

### 2.3 如何使用 Promise

#### API

注意是函数对象方法还是实例对象方法。

1. Promise 构造函数：`Promise(excutor) {}`

   excutor 函数：同步执行 `(resolve, reject) => {}`

   resolve 函数：内部定义成功时调用的函数 `resove(value)`

   reject 函数：内部定义失败时调用的函数 `reject(reason)`

   说明：excutor 是执行器，会在 Promise 内部立即同步回调，异步操作 `resolve/reject` 就在 excutor 中执行

2. `Promise.prototype.then` 方法：p.then(onResolved, onRejected)

   1）onResolved 函数：成功的回调函数 `(value) => {}`

   2）onRejected 函数：失败的回调函数 `(reason) => {}`

   说明：指定用于得到成功 value 的成功回调和用于得到失败 reason 的失败回调，返回一个新的 promise 对象

3. `Promise.prototype.catch` 方法：p.catch(onRejected)

   1）onRejected 函数：失败的回调函数 `(reason) => {}`

   说明：**`then()` 的语法糖**，相当于 `then(undefined, onRejected)`

```js
new Promise((resolve, reject) => { // excutor执行器函数
 setTimeout(() => {
   if(...) {
     resolve('成功的数据') // resolve()函数
   } else { 
     reject('失败的数据') //reject()函数
    }
 }, 1000)
}).then(
 value => { // onResolved() 函数
  console.log(value)
}
).catch(
 reason => { // onRejected() 函数
  console.log(reason)
}
)
```

1. `Promise.resolve` 方法：`Promise.resolve(value)`

   value：将被 `Promise` 对象解析的参数，也可以是一个成功或失败的 `Promise` 对象

   返回：返回一个带着给定值解析过的 `Promise` 对象，如果参数本身就是一个 `Promise` 对象，则直接返回这个 `Promise` 对象。

2. `Promise.reject` 方法：`Promise.resolve(reason)`

   reason：失败的原因

   说明：返回一个失败的 promise 对象

`Promise.resolve(reason) `与 `Promise.resolve(reason)` 是用于创建成功或者失败的简洁语法。

```js
// 产生一个成功值为1的promise对象
new Promise((resolve, reject) => {
 resolve(1)
})
// 相当于语法糖
const p1 = Promise.resolve(1)
// 语法糖产生其他
const p2 = Promise.resolve(2)
const p3 = Promise.reject(3)
p1.then(value => {console.log(value)}) // 1
p2.then(value => {console.log(value)}) // 2
p3.catch(reason => {console.log(reason)}) // 3
// 等同于
// p3.then(null, reason => {console.log(reason)})
```

`Promise.resolve()/Promise.reject()` 方法就是一个**语法糖**

1. Promise.all 方法：`Promise.all(iterable)`

   iterable：包含 n 个 promise 的可迭代对象，如 `Array` 或 `String`

   说明：返回一个新的 promise，只有所有的 promise 都成功才成功，只要有一个失败了就直接失败

```js
const pAll = Promise.all([p1, p2, p3])
const pAll2 = Promise.all([p1, p2])
//因为其中p3是失败所以pAll失败
pAll.then(
value => {
   console.log('all onResolved()', value)
 },
reason => {
   console.log('all onRejected()', reason) 
 }
)
// all onRejected() 3
pAll2.then(
values => {
   console.log('all onResolved()', values) // values 考虑是 promise 数组
 },
reason => {
   console.log('all onRejected()', reason) 
 }
)
// all onResolved() [1, 2]
```

1. Promise.race方法：Promise.race(iterable)

   iterable：包含 n 个 promise 的可迭代对象，如 `Array` 或 `String`

   说明：返回一个新的 promise，第一个完成的 promise 的结果状态就是最终的结果状态

```js
const pRace = Promise.race([p1, p2, p3])
// 谁先完成就输出谁(不管是成功还是失败)
const p1 = new Promise((resolve, reject) => {
 setTimeout(() => {
   resolve(1)
 }, 1000)
})
const p2 = Promise.resolve(2)
const p3 = Promise.reject(3)

pRace.then(
value => {
   console.log('race onResolved()', value)
 },
reason => {
   console.log('race onRejected()', reason) 
 }
)
//race onResolved() 2
```

#### Promise 的几个关键问题

##### 1. 如何改变 promise 的状态？

- `resolve(value)`：如果当前是 pending 就会变为 resolved
- `reject(reason)`：如果当前是 pending 就会变为 rejected
- 抛出异常：如果当前是 pending 就会变为 rejected

```js
const p = new Promise((resolve, reject) => {
  //resolve(1) // promise变为resolved成功状态
  //reject(2) // promise变为rejected失败状态
  throw new Error('出错了') // 抛出异常，promise变为rejected失败状态，reason为抛出的error
  // throw 3 // 抛出异常 reason 为抛出的 3 —— 抛出什么,错误原因就是什么
})
p.then(
  value => {},
  reason => {console.log('reason',reason)}
)
// reason Error:出错了
```

##### 2. 一个 promise 指定多个成功/失败回调函数，都会调用吗？

当 promise 改变为对应状态时都会调用

```js
const p = new Promise((resolve, reject) => {
  //resolve(1)
  reject(2)
})
p.then(
  value => {},
  reason => {console.log('reason',reason)}
)
p.then(
  value => {},
  reason => {console.log('reason1',reason)}
)
// reason 2
// reason1 2
```

##### 3. 改变 promise 状态和指定回调函数谁先谁后？

1. 都有可能，常规是先指定回调再改变状态，但也可以先改状态再指定回调
2. 如何先改状态再指定回调？
   - 在执行器中直接调用 resolve()/reject()
   - 延迟更长时间才调用 then()
3. 什么时候才能得到数据？
   - 如果先指定的回调，那当状态发生改变时，回调函数就会调用得到数据
   - 如果先改变的状态，那当指定回调时，回调函数就会调用得到数据

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1) // 后改变状态(同时指定数据),异步执行回调函数
  }, 1000)
}).then( // 先指定回调函数,保存当前指定的回调函数
  value => {},
  reason =>{}
)
```

此时，先指定回调函数，保存当前指定的回调函数；后改变状态(同时指定数据)，然后异步执行之前保存的回调函数。

```js
new Promise((resolve, reject) => {
  resolve(1) // 先改变状态
}).then( // 后指定回调函数,异步执行回调函数
  value => {},
  reason =>{}
)
```

这种写法，先改变的状态（同时指定数据），后指定回调函数(不需要再保存)，直接异步执行回调函数。

**综上，Promise 的回调函数总是异步执行。**

##### 4.promise.then() 返回的新 promise 的结果状态由什么决定？

- 简单表达：由 `then()` 指定的回调函数执行的结果决定

- **详细表达**：（有无抛异常，抛出异常为 promise 还是非 promise）

   ① 如果抛出异常，新 promise 变为 rejected，reason 为抛出的异常

   ② <u>如果返回的是非 promise 的任意值，新 promise 变为 resolved，value 为返回的值</u>

   ③ 如果返回的是另一个新 promise，此 promise 的结果就会成为新 promise 的结果

```js
new Promise((resolve, reject) => {
  resolve(1)
}).then(
  value => {
    console.log('onResolved1()', value)
  },
  reason => {
    console.log('onRejected1()', reason)
  }
).then(
  value => {
    console.log('onResolved2()', value)
  },
  reason => {
    console.log('onRejected2()', reason)
  }
)
// onResolved1() 1
// onResolved2() undefined
new Promise((resolve, reject) => {
  resolve(1)
}).then(
  value => {
    console.log('onResolved1()', value)
    //return 2                   // onResolved2() 2
    //return Promise.resolve(3)  // onResolved2() 3 -> return一个成功值为3的promise
    //return Promise.reject(4)   // onRejected2() 4 -> return一个失败值为4的promise
    //throw 5                    // onRejected2() 5 -> return一个失败值为5的promise
  },
  reason => {
    console.log('onRejected1()', reason)
  }
).then(
  value => {
    console.log('onResolved2()', value)
  },
  reason => {
    console.log('onRejected2()', reason)
  }
)
// onResolved1() 1
// 对应输出如上所示
```

⭕️`.then` 指定的回调函数是谁执行由调用 `.then` 的 promise 对象来决定。而 `.then` 返回的 promise 由回调函数执行的结果来决定。

##### 5.promise 如何串联多个操作任务？

(1)promise 的 then() 返回一个新的 promise，可以并成 then() 的链式调用

(2)通过 then 的链式调用串联多个同步/异步任务

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('执行任务1(异步)')
    resolve(1)
  }, 1000)
}).then(
  value => {
    console.log('任务1的结果', value)
    console.log('执行任务2(同步)')
    return 2 // 同步任务直接return返回结果
  }
).then(
  value => {
    console.log('任务2的结果', value)
    return new Promise((resolve, reject) => { // 异步任务需要包裹在Promise对象中
      setTimeout(() => {
        console.log('执行任务3(异步)')
        resolve(3)
      }, 1000)
    })
  }
).then(
  value => {
    console.log('任务3的结果', value)
  }
)
// 执行任务1(异步)
// 任务1的结果 1
// 执行任务2(同步)
// 任务2的结果 2
// 执行任务3(异步)
// 任务3的结果 3
```



##### 6.Promise 异常穿透(传透)？

- 当使用 promise 的 then 链式调用时，可以在最后指定失败的回调
- 前面任何操作出了异常，都会传到最后失败的回调中处理

```js
new Promise((resolve, reject) => {
   reject(1);
}).then(
  value => {
    console.log('onResolved1()', value);
    return 2
  }
).then(
  value => {
    console.log('onResolved2()', value)
    return 3
  }
).then(
  value => {
    console.log('onResolved3()', value)
  }
).catch(
  reason => {
    console.log('onRejected1()', reason)
  }
)
// onRejected1() 1
```

相当于这种写法：

```js
new Promise((resolve, reject) => {
   //resolve(1)
   reject(1)
}).then(
  value => {
    console.log('onResolved1()', value)
    return 2
  },
  reason => {throw reason} // 抛出失败的结果reason
).then(
  value => {
    console.log('onResolved2()', value)
    return 3
  },
  reason => {throw reason} // {} 是函数体的标记、reason => throw reason 则表示返回 throw reason 就会错误
).then(
  value => {
    console.log('onResolved3()', value)
    // return undefined
  },
  reason => {throw reason}
).catch(
  reason => {
    console.log('onRejected1()', reason)
  }
)
// onRejected1() 1
```

所以失败的结果是一层一层处理下来的，最后传递到 catch 中。

或者，将 `reason => {throw reason}` 替换为 `reason => Promise.reject(reason)` 也是一样的

##### 7.中断 promise 链？

当使用 promise 的 then 链式调用时，在中间中断，不再调用后面的回调函数

办法：在回调函数中返回一个 pending 状态的 promise 对象

```js
new Promise((resolve, reject) => {
   //resolve(1)
   reject(1)
}).then(
  value => {
    console.log('onResolved1()', value)
    return 2
  }
).then(
  value => {
    console.log('onResolved2()', value)
    return 3
  }
).then(
  value => {
    console.log('onResolved3()', value)
  }
).catch(
  reason => {
    console.log('onRejected1()', reason)
  }
).then(
  value => {
    console.log('onResolved4()', value)
  },
  reason => {
    console.log('onRejected2()', reason)
  }
)
// onRejected1() 1
// onResolved4() undefined
```

为了在 catch 中就中断执行，可以这样写：

```js
new Promise((resolve, reject) => {
   //resolve(1)
   reject(1)
}).then(
  value => {
    console.log('onResolved1()', value)
    return 2
  }
).then(
  value => {
    console.log('onResolved2()', value)
    return 3
  }
).then(
  value => {
    console.log('onResolved3()', value)
  }
).catch(
  reason => {
    console.log('onRejected1()', reason)
    return new Promise(() => {}) // 返回一个pending的promise
  }
).then(
  value => {
    console.log('onResolved4()', value)
  },
  reason => {
    console.log('onRejected2()', reason)
  }
)
// onRejected1() 1
```

在 catch 中返回一个新的 promise，且这个 promise 没有结果。

由于，返回的新的 promise 结果决定了后面 then 中的结果，所以后面的 then 中也没有结果。

这就实现了中断 promise 链的效果。

## 三、自定义(手写)Promise

## 四、async 与 await

### 4.1 async 函数

1. 函数的返回值为 promise 对象
2. promise 对象的结果由 async 函数执行的返回值决定

```js
async function fn1() {
  //return 1
  // 返回一个Promise对象（PromiseStatus为resolved，PromiseValue为1）
  throw 2
  // 返回一个Promise对象（PromiseStatus为rejected，PromiseValue为2）
}
const result = fn1()
console.log(result)
```

这时，可以将 result.then()：

```
async function fn1() {
  //return 1
  throw 2
}
const result = fn1()
result.then(
  value => {
    console.log('onResolved()', value)
  },
  reason => {
    console.log('onRejected()', reason)
  },
)
// onRejected() 2
```

也可以在异步函数中返回一个 promise

```
async function fn1() {
  //return Promise.reject(3)
  return Promise.resolve(3)
}
const result = fn1()
result.then(
  value => {
    console.log('onResolved()', value)
  },
  reason => {
    console.log('onRejected()', reason)
  },
)
// onResolved() 3
```

也就是说，一旦在函数前加 async，它返回的值都将被包裹在 Promise 中，这个 Promise 的结果由函数执行的结果决定。

上面的栗子都是立即成功/失败的 promise，也可以返回延迟成功/失败的 promise：

```
async function fn1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(4)
    }, 1000)
  })
}
const result = fn1()
result.then(
  value => { // 过1s后才异步执行回调函数 onResolved()
    console.log('onResolved()', value)
  },
  reason => {
    console.log('onRejected()', reason)
  },
)
// onResolved() 4
```

### 4.2 await 表达式

#### MDN

[async](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

[await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)

#### 语法

[return_value] = await expression;

**表达式**

 一个 `Promise` 对象或者任何要**等待**的`值`。

**返回值**

 返回 Promise 对象的处理结果。如果**等待**的不是 Promise 对象，则返回该值本身。

**解释**

**await 表达式会暂停当前 async function 的执行，等待 Promise 处理完成。**

1. await 右侧的表达式一般为 promise 对象，但也可以是其他的值
2. 如果表达式是 promise 对象，await 返回的是 promise 成功的值
3. 如果表达式是其他值，直接将此值作为 await 的返回值

注意：

await 必须写在 async 函数中，但 async 函数中可以没有 await

如果 await 的 promise 失败了，就会抛出异常，需要通过 try...catch 来捕获处理

```
function fn2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(5)
    }, 1000)
  })
}

function fn4() {
  return 6
}

async function fn3() {
  //const p = fn2() // 这种写法只能得到一个promise对象
  const value = await fn2() // value 5
  //const value = await fn4() // value 6
  console.log('value', value)
}
fn3()
```

不写 await，只能得到一个 promise 对象。在表达式前面加上 await，1s后将得到 promise 的结果5，但是要用 await 必须在函数上声明 async。

await 右侧表达式 fn2() 为 promise，得到的结果就是 promise 成功的 value；await 右侧表达式 fn4() 不是 promise，得到的结果就是这个值本身。

Promise 对象的结果也有可能失败：

```
function fn2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(5)
    }, 1000)
  }) 
}

async function fn3() {
  const value = await fn2()
  console.log('value', value)
}
fn3()
// 报错：Uncaught (in promise) 5
```

await 只能得到成功的结果，要想得到失败的结果就要用try/catch：

```
function fn2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(5)
    }, 1000)
  })
}

async function fn3() {
  try {
    const value = await fn2()
     console.log('value', value)
  } catch (error) {
    console.log('得到失败的结果', error)
  }
}
fn3()
// 得到失败的结果 5
```

下面这个栗子中，fn1 是第 2 种情况，fn2 是第 3 种情况，fn3 也是第 3 种情况

```
async function fn1() { //async声明的异步回调函数将返回一个promise
  return 1
}
function fn2() {
  return 2
}
function fn3() {
  throw 3 // 抛出异常
}
async function fn3() {
  try {
    const value = await fn1() // value 1
    //const value = await fn2() // value 2
    //const value = await fn3() // 得到失败的结果 3
    console.log('value', value)
  } catch (error) {
    console.log('得到失败的结果', error)
  }
}
fn3()
```

## 五、JS异步之宏队列与微队列

![img](https://img-blog.csdnimg.cn/20200703144207979.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

1. JS 中用来存储待执行回调函数的队列包含2个不同特定的队列

2. 宏队列：用来保存待执行的宏任务（回调），比如：定时器回调/DOM 事件回调/ajax 回调

3. 微队列：用来保存待执行的微任务（回调），比如：promise 的回调/MutationObserver 的回调

4. JS 执行时会区别这2个队列

   (1) JS 引擎首先必须执行所有的初始化同步任务代码

   (2) 每次准备取出第一个宏任务前，都要将所有的微任务一个一个取出来执行

```
setTimeout(() => { // 会立即被放入宏队列
  console.log('timeout callback1()')
}, 0)
setTimeout(() => { // 会立即被放入宏队列
  console.log('timeout callback2()')
}, 0)
Promise.resolve(1).then(
  value => { // 会立即被放入微队列
    console.log('Promise onResolved1()', value)
  }
)
Promise.resolve(1).then(
  value => { // 会立即被放入微队列
    console.log('Promise onResolved2()', value)
  }
)
// Promise onResolved1() 1
// Promise onResolved2() 1
// timeout callback1()
// timeout callback2()
```

先执行所有的同步代码，再执行队列代码。队列代码中，微队列中的回调函数优先执行。队列中的宏任务、微任务都需要压入栈中执行。

```js
setTimeout(() => { // 会立即被放入宏队列
  console.log('timeout callback1()')
  Promise.resolve(1).then(
  value => { // 会立即被放入微队列
    console.log('Promise onResolved3()', value)
  }
}, 0)
setTimeout(() => { // 会立即被放入宏队列
  console.log('timeout callback2()')
}, 0)
Promise.resolve(1).then(
  value => { // 会立即被放入微队列
    console.log('Promise onResolved1()', value)
  }
)
Promise.resolve(1).then(
  value => { // 会立即被放入微队列
    console.log('Promise onResolved2()', value)
  }
)
// Promise onResolved1() 1
// Promise onResolved2() 1
// timeout callback1()
  // Promise onResolved3() 1
// timeout callback2()
```

执行完 `timeout callback1()` 后 `Promise onResolved3()` 会立即被放入微队列。在执行 `timeout callback2()` 前，`Promise onResolved3()` 已经在微队列中了，所以先执行 `Promise onResolved3()`。

## 六、相关面试题

### 6.1 面试题1

```js
setTimeout(() => {
  console.log(1)
}, 0)
new Promise((resolve) => {
  console.log(2)
  resolve()
}).then(() => {
  console.log(3) // 状态未定,等到执行完(输出了3后),状态改为resolved
}).then(() => {
  console.log(4) // callbacks储存
})
console.log(5)
// 2 5 3 4 1
// 同步：[2,5];异步:宏队列：[1]、微队列：[3,4]
```

**2 是 excutor 执行器，是同步回调函数，所以在同步代码中。.then() 中的函数才是异步回调**

其中，执行完 2 后改变状态为 resolve，第一个 .then() 中的 3 会放入微队列，但还没执行（promise 是 pending 状态），就不会把结果给第二个 then()，这时，4 就会缓存起来但不会被放入微队列。只有在微队列中的 3 执行完后才把 4 放入微队列。

所以顺序是：

1 放入宏队列，2 执行，3 放入微队列，4 缓存起来等待 Promise 的状态改变，5 执行，微队列中的 3 执行，4 放入微队列，微队列中的 4 执行，宏队列中的 1 执行。

### 6.2 面试题2

```js
const first = () => ( // 省略return所以不用{}而用()
  new Promise((resolve, reject) => {
    console.log(3)
    let p = new Promise((resolve, reject) => {
      console.log(7)
      setTimeout(() => {
        console.log(5)
        resolve(6) // 没用,状态只能改变一次,在resolve(1)时就改变了
      }, 0)
      resolve(1)
    })
    resolve(2)
    p.then((arg) => {
      console.log(arg)
    })
  })
)
first().then((arg) => {
  console.log(arg)
})
console.log(4)
// 3 7 4 1 2 5
/*
宏：[5]
微：[1,2]
*/
```

### 6.3 面试题3

```js
setTimeout(() => {
  console.log("0")
}, 0)
new Promise((resolve, reject) => {
  console.log("1")
  resolve()
}).then(() => {
  console.log("2")
  new Promise((resolve, reject) => {
    console.log("3")
    resolve()
  }).then(() => {
    console.log("4")
  }).then(() => {
    console.log("5")
  })
}).then(() => {
  console.log("6")
})

new Promise((resolve, reject) => {
  console.log("7")
  resolve()
}).then(() => {
  console.log("8")
})
// 1 7 2 3 8 4 6 5 0
/*
宏：[0]
微：[2, 8, 4, 6, 5]
*/
```

顺序：

0 放入宏队列，同步执行 1，2 放入微队列，6 缓存到内部，同步执行 7，8 放入微队列，取出微队列中的 2 执行，同步执行 3，4 放入微队列，5 缓存到内部，6 放入微队列(因为 6 的前一个 promise 已经执行完了返回成功结果 undefined)，取出微队列中的 8 执行，取出微队列中的 4 执行，5 放入微队列，取出微队列中的 6 执行，取出微队列中的 5 执行，取出宏队列中的 0 执行
