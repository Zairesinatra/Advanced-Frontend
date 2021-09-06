- `Uncaught TypeError: Cannot read property 'getAttribute' of null`

因为 实例化 echarts 的元素不存在（*未找到指定的元素*），故必须页面存在的HTML元素才可以去初始化。

```js
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
```

- `registerMap is not a function `

选择适合版本的 `echarts.js` 文件

- `Uncaught ReferenceError: echarts is not defined`

导入js的位置不对，要在使用时导入并注意加载顺序。