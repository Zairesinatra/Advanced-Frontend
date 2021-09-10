let arr1 = [1, 2, 3], arr2 = [4, 5, 6];
// 展开一个数组
console.log(...arr1); // 1 2 3
let arr3 = [...arr1, ...arr2];
console.log(arr3); // [ 1, 2, 3, 4, 5, 6 ]

// 函数中使用
function sum(...numbers){
    return numbers.reduce((preValue, currentValue) => { // 别忘了接收reduce返回值(是一个数组方法)
        return preValue + currentValue
    })
}
console.log(sum(1,2,3)); // 6

// 构造字面量对象展开语法
let person = {name: 'tom', age: 18};
let person2 = {...person};
// console.log(...person); // 报错,展开运算符不能展开对象
person.name = 'jerry';
console.log(person2); // { name: 'tom', age: 18 }
console.log(person); // { name: 'jerry', age: 18 }

// 合并
let person3 = {...person, name: 'zszs', address: 'csc'}
console.log(person3); // { name: 'zszs', age: 18, address: 'csc' }

// 原生中不允许 ...obj ,因为 Object 没有 iterater 接口.而在 React 与 Babel 作用下,却可以允许展开对象.
// {...obj}在原生中表示复制对象, 在 React 中的 {} 加上展开运算符是可以展开对象,而花括号表示分隔符的意思,且仅适用于标签属性传递