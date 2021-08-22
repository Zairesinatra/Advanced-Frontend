// "use strict"
// var zs = 23;
// ReferenceError: zss is not defined
// zss = 24;

// TypeError: Cannot assign to read only property 'NaN' of object '#<Object>'
// NaN = "zsxzy"

// 给不可写属性赋值
// var obj1 = {};
// Object.defineProperty(obj1, "xxx", { value: 6, writable: false });
// TypeError: Cannot assign to read only property 'xxx' of object '#<Object>'
// obj1.xxx = 66;

// 给只读属性赋值
// ES6新增对象方法的访问描述符：get(只读)、set(只写)
// var obj2 = { get x() { return 23; } };
//TypeError: Cannot set property x of #<Object> which has only a getter
// obj2.x = 24;

// 给不可扩展对象的新属性赋值
// var fixed = {};
// Object.preventExtensions(fixed);
// TypeError: Cannot add property newProp, object is not extensible
// fixed.newProp = "zyzy";

// TypeError: Cannot delete property 'prototype' of function Object() { [native code] }
// delete Object.prototype;

// var o = { p: 1, p: 2 }; // 没有报错

// function sum(a, a, c) {
//     "use strict";
    // SyntaxError: Duplicate parameter name not allowed in this context
//     return a + a + c;
// }

// (function() {
//     "use strict";
    // TypeError: Cannot create property
    // false.true = "";  
    // (23).sailing = "home";
//     "with".you = "far away";
//   })();

var x = 18;
var evalX = eval("'use strict'; var x = 23; x");
console.log(x === 18); // true
console.log(evalX === 23); // true