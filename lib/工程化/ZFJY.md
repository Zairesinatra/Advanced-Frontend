# 学习总结

高阶函数即函数中返回新函数。

```javascript
function isType(type){
  return function (obj){
    return Object.prototype.toString.call(obj).includes(type);
  }
}
let types = ["String","Object","Array","Null","Undefined","Boolean"]
let fns = {};
types.forEach(type=>{
  fns["is"+type]=isType(type)
})
console.log(fns.isString(true)) // false
console.log(fns.isBoolean(true)) // true
```

在计算机科学中，柯里化（英語：Currying），又译为卡瑞化或加里化，是把接受多个参数的函数变换成**接受一个单一参数**（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

```js
// 在n次后执行的函数(偏函数)
function after(times,callback){
  return function(){
    if(--times == 0){
      callback()
    }
  }
}
let fn = after(3,function(){console.log("after")}) // 达到预订的次数执行某个函数
fn()
fn()
fn() // after
```

AOP 即有完整功能，希望在功能之中加上一些函数和逻辑，但是不改变原有的逻辑。

## [前端设计模式](https://www.bilibili.com/video/BV1qq4y1s75n?from=search&seid=2820728866388377946&spm_id_from=333.337.0.0)

### 单例模式

仅是实例化一次，每次实例化返回的对象都是同一对象。判断是否实例本身就是单例的本质。

```javascript
function Singleton(name){
  this.name = name;
}
Singleton.prototype.getName = function(){
  console.log(this.name)
}
/*
全局写法
function getInstance(name){
  if(!this.instance){
    this.instance = new Singleton(name)
  }
  return this.instance
}
*/
/*
闭包写法
var getInstance = (function(){
  var instance;
  return function(name){
    if(!instance){
      instance = new Singleton(name);
    }
    return instance
  }
})()
*/
Singleton.getInstance = function(){
  if(!this.instance){
    instance = new Singleton(name);
  }
  return this.instance
}
var a = getInstance("zs")
var b = getInstance("zy")
console.log(a===b) // true
```

### 策略模式

将策略单独封装；可以增加策略，不更改流程。

```javascript
// 策略类封装
var performanceS = function(){} // 一个类中没有包含足够的信息来描绘一个具体的对象-抽象类
performanceS.prototype.calculate = function(salary){
  return salary*4
}
var performanceA = function(){} // 一个类中没有包含足够的信息来描绘一个具体的对象-抽象类
performanceA.prototype.calculate = function(salary){
  return salary*3
}
var performanceB = function(){} // 一个类中没有包含足够的信息来描绘一个具体的对象-抽象类
performanceB.prototype.calculate = function(salary){
  return salary*2
}
// 流程
var Bonus = function(){
  this.salary = null;
  this.strategy = null;
}
Bonus.prototype.setSalary = function(salary){
  this.salary = salary
}
Bonus.prototype.setStrategy = function(strategy){
  this.strategy = strategy
}
Bonus.prototype.getBonus = function(strategy){
  return this.strategy.calculate(this.salary)
}
var Bonus1 = new Bonus();
Bonus1.setSalary(10000)
Bonus1.setStrategy(new performanceS())
console.log(Bonus1.getBonus())
```



### 发布订阅模式

一对多的关系；可以参考 addEventListener。

```javascript
class Event {
  constructor(){
    this.clientList = [];
  }
  listen(key, fn){
    if(!this.clientList[key]){
      this.clientList[key] = [];
    }
    
  }
}
```

