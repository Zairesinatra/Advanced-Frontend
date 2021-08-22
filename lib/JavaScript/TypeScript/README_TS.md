# TypeScript

------

TypeScript是 JavaScript 的强类型版本。（JavaScript 是动态的，可以在执行阶段重新赋值不同的数据）在编译期去掉类型和特有语法，生成纯粹的 JavaScript 代码。由于最终在浏览器运行的仍然是 JavaScript ，所以 TypeScript 并不依赖于浏览器支持，也不会有兼容性问题。（Type + EcmaScript6）

```tsx
// TS 为 JS 增加类型概念
var foo: string = 'bar';
// 不需要运行即可知道类型原因导致的低级错误
// foo = [];
```

TypeScript 优势：强大的 IDE 支持（类型检查、语法提示）、代码重构、可读性好、遵循 ES6 。

如果是 Angular-CLI 环境搭建的项目已经集成了 TypeScript 。此外会需要单独搭建环境。

## 安装

### 全局安装 TypeScript

- ```shell
  $ npm install -g typescript
  # tsc --version
  # Version 4.3.5
  ```

  ```shell
  $ tsc yourproj.ts
  # 产生 js 文件
  # 在开发阶段避免问题
  ```

### 项目中的 TypeScript ，[点此](https://www.typescriptlang.org/zh/download)跳转

------

interface 接口是通常用来约束对象结构的。

1、以下表示是TypeScript语法的是 （C）

A、`var foo ='bar'`	B、`var {foo} ='bar'`	C、`var foo:string = 'bar'`	D、`var {{foo}} = 'bar'`

2、下列关于 TypeScript 说法错误的是（D）

A、遵循了es6	B、严谨的语法提示，类型检查	C、代码重构	D、代码可读性差

3、在 TypeScript 中下列属于正确的解构赋值的是（A）

A、`let arr:number =[1,2] let [first,second]=arr`	B、`let user={name:'jack} let {name} = user`	C、`function add(x,y):number{return x+y} add([10,20])`	D、`let arr:number =[1,2] let {first,second}=arr`