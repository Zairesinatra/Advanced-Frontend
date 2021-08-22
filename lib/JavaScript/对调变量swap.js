// 临时变量法
var a = 1, b = 2, c = b;
b = a;
a = c
console.log(a,b); // 2 1

// 加减法
var a = 3, b = 5;
a = a + b;
b = a - b;
a = a - b;
console.log(a,b); // 5 3

// 数组法
var a = 8, b = 9;
a = [a, b];
b = a[0]; // 8
a = a[1]; // 9

// 对象法
var a = 11, b = 12;
a = {a:b, b:a};
b = a.b; // 11
a = a.a // 12

// 数组运算法
var a = 1, b = 2;
// 运算符优先级会先执行b = a
a = [b, b=a][0] // a = 2, b = 1

// 按位运算
var a = 3, b = 5;
a = a ^ b;
b = b ^ a; // 3
a = a ^ b; // 5

// 解构赋值
var a = 1, b = 2;
[a, b] = [2,1] // a = 2, b = 1