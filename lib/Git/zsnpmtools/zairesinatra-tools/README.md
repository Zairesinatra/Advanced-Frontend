## 包的使用说明
## 安装
```
npm install zaire-tools
```

## 导入
```js
const zaire = require('zaire-tools')
```

## 格式化时间
```js
//调用dateFormat对时间格式化
const dtStr = zaire.dateFormat(new Date())
console.log(dtStr)
```

## 转译html中的特殊字符
```js
// 定义待转换html字符串
const htmlStr = '<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>'
// 调用htmlescape方法进行转换
const str = zaire.htmlescape(htmlStr)
// 转换的结果 &lt;h1 title=&quot;abc&quot;&gt;这是h1标签&lt;span&gt;123&amp;nbsp;&lt;/span&gt;&lt;/h1&gt;
console.log(str)
```

## 还原html中特殊字符
```js
//待还原的html字符串
const str2 = zaire.htmlunescape(str)
// 输出的结果 <h1 title="abc">这是h1标签<span>123&amp;nbsp;</span></h1>
console.log(str2)
```

## 开源协议
ISC