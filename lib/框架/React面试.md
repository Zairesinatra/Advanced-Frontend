### 为什么选择框架而非原生？

<u>组件化</u>使工程易于维护与拓展，React 组件化最为彻底，可以到函数级别的原子组件。不同于 JQuery 的链式编程的面条代码，<u>天然分层</u>的 MVC、MVVM、MVP 能使代码解耦易读。主流框架<u>生态成熟</u>。自动更新 DOM 提高开发效率。

```javascript
$("li").parent("ul").parent("div").siblings("div").children("div").html("内容");
$("div").css("color", "red");
```

### 虚拟 DOM 的优势如何？

通过虚拟 DOM 经过 Diff 找出最小差异，批量进行 patch，保证性能下限。无需手动操作 DOM，diff 和 patch 都是在一次更新中自动进行的。虚拟 DOM 本质是 JS 对象，DOM 与平台强关联，相比之下虚拟 DOM 可以跨平台操作，如服务端渲染和移动端开发。话虽如此，虚拟 DOM 缺点在于无法进行极致优化，如 VSCode 是采用手动操作 DOM 的方式进行极端的性能优化。

### 虚拟 DOM 实现原理？

虚拟 DOM 本质是 JS 对象，是对真实 DOM 的抽象。状态变更时，记录新旧树差异。最后更新差异于真实 DOM。

```js
{ tag: 'div', props: { id: 'app' }, chidren: [ { tag: 'p', props: { className: 'text' }, chidren: [ 'hello' ] }]}
```

### React 的生命周期是怎样的？

在 React16 后废弃了三个生命周期：componentWillMount、componentWillReceiveProps、componentWillUpdate。尽管如此，但未删除，仍可以加上 UNSAVE_ 前缀使用，但是官方计划在 17 版本完全删除这三个函数。

目前的生命周期分为三个阶段，分别是挂载阶段、更新阶段、卸载阶段。

挂载阶段中，constructor 构造函数最先执行，通常在构造函数里初始化 state 对象或给自定义方法绑定 this。`getDerivedStateFromProps(nextProps, prevState)` 是个静态方法，当接收新属性后想要修改 state 可以在此钩子中使用。render 是纯函数，只返回需要渲染的东西，不应该包含其他的业务逻辑，可以返回原生的 DOM、React 组件、Fragment、Portals、字符串、数字、Boolean、null 等内容。componentDidMount 在组件装载后调用，可以获取 DOM 节点并操作，如对 canvas、svg 操作，订阅，但是需要注意在 componentWillUnmount 中取消订阅。

更新阶段中，首先调用 getDerivedStateFromProps 方法，再调用 `shouldComponentUpdate(nextProps, nextState)`，其中参数表示新的属性和变化后的 state，返回一个布尔值表示是否需要重新渲染。若需要渲染则调用 render 方法。随后调用可以获取更新前属性和 state 的 `getSnapshotBeforeUpdate(prevProps, prevState)`，此函数返回值会传递给 componentDidUpdate，如果不需要返回值可以指定返回 null，此生命周期必须搭配 componentDidUpdate 一起使用。`componentDidUpdate(prevProps, prevState, snapshot)` 的第三个参数是为了如果出发某些回调时，需要用到 DOM 元素的状态，则将对比或者计算的过程迁移到 getSnapshotBeforeUpdate 中，再在 componentDidUpdate 里统一触发回调或者更新。

卸载阶段最为简单，仅一个 componentWillUnmount，当组件被卸载或者销毁的时候被调用，可以清除一些定时器，取消网络请求，以及无效的 DOM 元素等垃圾清理工作。

### React 请求放在哪个生命周期最好？

官方推荐一部请求放在 componentDidMount 中进行最好。部分人认为放在 componentWillMount 可以提前进行异步请求，避免白屏且提高首屏加载速度。但是由于 JS 异步事件的性质，当 API 调用时，浏览器会在这个期间返回执行其他的工作。当 React 渲染一个组件，并不会等待 componentWillMount 完成事情，即 React 将继续进行 render，没有办法暂停渲染以等待数据到达。且在 componentWillMount 请求会存在部分问题，如服务端渲染时，在此周期获取数据，fetch data 会执行两次，一次服务端、一次客户端，这就会导致多余请求，且在 17 版本 componentWillMount 将被移除，更加不适合写在此处。如果特殊需要提前请求，也可以放在 constructor 中进行。

### setState 是同步还是异步执行？

有时同步，有时异步。

setState 在<u>合成事件</u>（合成事件 SyntheticEvent 是 React **模拟原生 DOM 事件所有能力的一个事件对象，即浏览器原生事件的跨浏览器包装器。**）和<u>钩子函数</u>中是异步的，在<u>原生事件</u>和 <u>setTimeout</u> 中是同步的。

```jsx
// 在 React 中，所有事件都是合成的，不是原生 DOM 事件，但可以通过 e.nativeEvent 属性获取 DOM 事件。
const handleClick = (e) => console.log(e.nativeEvent);;
const button = <button onClick={handleClick}>Leo 按钮</button>
```

setState 的异步并非指的内部由异步代码实现，而是本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致合成事件和钩子函数没法立马拿到更新后的值，形成了所谓的异步。可以通过 setState 的第二个参数 callback 拿到更新后的结果。

```jsx
setState(particalState, callback)
```

setState 的批量更新优化也是建立在异步的基础上，原生事件和定时器中不会批量更新，在异步中如果对同一个值进行多次 setState，则批量更新策略会对其进行覆盖，取最后一次执行；如果同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

### React 组件通讯

父组件向子组件通讯，可以传 props 的方式通讯。子组件向父组件通讯可以使用 props 加回调的方式，父组件向子组件传递 props 进行通讯，此 props 为作用域为父组件自身的函数，子组件调用这个函数，将想要传递的信息作为参数传递给父组件。兄弟组件通讯可以找到共同的父节点，结合上述方式由父节点进行转发通讯。跨层级通讯则使用 context 共享一个组件树。发布订阅模式由发布者发布事件，订阅者监听事件并作出反应，通过引入 event 模块进行通信。全局状态管理工具借助 redux 或者 Mobx 等全局状态管理工具通讯，此类工具维护一个全局的状态中心 store，并根据不同的事件产生新的状态。

### React 如何进行组件/逻辑复用？

抛开 Mixin，组件抽象技术目前有高阶组件、属性代理、反向继承、渲染属性、react-hooks。

对于 Mixin 来说，组件和 Mixin 之间存在隐式依赖，即 Mixin 依赖组件的特定方法，但是在定义组件时不知道会产生这类依赖。且多个 Mixin 会产生冲突（定义了相同的 state 字段），即依赖关系不透明。Mixin 倾向增加更多的状态，降低了可预测性。难以理解组件的行为，需要全盘了解所有依赖 Mixin 的拓展行为，以及相互影响。组件自身的方法和 state 字段不能轻易修改，因为难以确定有无 Mixin 依赖。Mixin 难以维护，因为 Mixin 逻辑最后会被打平合并在一起，难以搞清一个 Mixin 的输入与输出。

HOC 通过外层组件使用 Props 影响内层组件的状态，而不是直接改变其 State，不存在冲突和互相干扰，降低了耦合。且 HOC 具有天然的层级结构（组件树结构），降低了复杂度。

。。。

### 如何理解 fiber？

React Fiber 是一种基于浏览器的单线程调度算法。