computed 函数

```javascript
import {computed} from "vue"
setup(){
  ...
  // 计算厲性—简写
  let fullName = computed(() => {
    return person.firstName + '-' + person.lastName
  }）
  // 计算属性—完整
  let fullName = computed({
    get(){
      return person.firstName + '-' + person.lastName
    },
    set(value){
      const nameArr = value.split('-')
      person.firstName = nameArr[0]
      person.lastName = nameArr[1]
    }
  })
}
```

setup 的两个注意点

setup执行的时机：在beforeCreate之前执行一次，this是undefined。

setup的参数：

- props：值为对象，包含：组件外部传递过来，且組件内部声明接收了的属性。

- context：上下文对象
  
  - attrs：值为对象，包含：组任外部传递过来，但没有在props配置中声明的属性，相当于 `this.$attrs`
  
  - slots：收到的插槽内容，相当于 `this.$slots`
  
  - emit：分发自定义事件的函数，相当于 `this.$emit`

```javascript
//模拟vue3中实現响应式
//#region
const p = new Proxy(person, {
  //有人读取p的果不属性时调用
  get(target, propName){
    console.log(`some people get ${propName} attribute`)
    return Reflect.get(target, propName)
  },
  //有人修改p的某个属性、或给p追加某个属性吋调用
  set(target, propName, value){
    console.log(`some people 修改了p身上的 ${propName} 属性。我要去更新界面了`)
    Reflect.set(target, propName, value)
  },
  //有人删除p的某个属性时调用
  deleteProperty(target, propName){
    console.log(`有人删除了p身上的${propName}属性，我要去更新界面了！`)
    return Reflect.deleteProperty(target,propName)
  }
})
//#endregion
```

## 个人规划

发展平台、晋升空间、管理、专业提升、价值体现

成就&挫折举例（成长、收获）

沟通&换位思考：团队、成熟、奉献、妥协

积极提问：工作内容、所用技术、团队人员、晋升机制

每一项能力都需要经历做支撑；求职前对公司、岗位职责及要求做提前了解；面试后认真总结；薪资要求合理（切勿过高或过低）

公司组织架构：总经理；研发部、产品部、其他技术部、销售部、财务部、人力资源部

行业分类

![](/Users/xieziyi/Library/Application%20Support/marktext/images/2022-01-05-16-57-42-image.png)

开发流程

![](/Users/xieziyi/Library/Application%20Support/marktext/images/2022-01-05-16-57-54-image.png)

![](/Users/xieziyi/Library/Application%20Support/marktext/images/2022-01-05-16-58-24-image.png)

项目流程甘特图

![](/Users/xieziyi/Library/Application%20Support/marktext/images/2022-01-05-16-58-48-image.png)

测试软件

禅道: https://www.zentao.net/ 
Redmine:  http://www.redmine.org.cn/326.html

![](/Users/xieziyi/Library/Application%20Support/marktext/images/2022-01-05-16-59-28-image.png)

团队协作工具：teambition

![](/Users/xieziyi/Library/Application%20Support/marktext/images/2022-01-05-16-59-41-image.png)

boss直聘：投递比较精准，先和HR聊岗位需求，相互沟通完毕再发送个人简历以及面试邀请，建议先准备自我介绍
智联招聘：上面反馈率比较低，适合海投（不用看具体岗位要求，基本上符合公司要求，公司自然给你发送面试邀请）；
拉钩：比较高端的岗位，每天有数量限制，满足条件的可以重点投递下

人事篇：社保缴费基础、公积金缴纳标准、纳税问题、税后薪资、入职准备

offer
学历原件及复印件
离职证明
身份证复印件
收入证明、银行流水
户口本复印件
体检报告

## 前端注意哪些SEO？

- 合理的 title、description、keywords；搜索对此三项的权重逐个减小，title 值强调重点即可，重要关键词出现不要超过2次而且要靠前，不同页面 title 要有所不同，description 把**页面内容**高度概括，长度合适，不可过分堆砌关键词，不同页面 description 有所不同；keywords 列举出重要关键词即可。

- 符合W3C规范语义化的HTML代码让搜家引擎容易理解网页。

- 重要内容 HTML 代码放在最前：搜索引擎抓取 HTML 顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容一定会被抓取。

- 重要内容不要用 js 输出，爬虫不会执行 js 获取内容；少用 iframe，搜索引擎不会抓取 iframe 中内容。

- 非装饰性图片必须加 alt；提高网站速度，是搜索引擎排序的重要指标。

## \<img>的 title 和 alt 有什么区别

alt 是 \<img> 的特有属性，是图片内容的等价描述，用于图片无法加载时显示；title 通常在鼠标滑动到图片上显示；读屏器阅读图片。可提图片高可访问性，除了纯装饰图片外都必须设置有意义的值，搜素引擎会重点分析。

## HTTP的几种请求方法用途

GET 方法发送一个请求来取得服务器上的某一资源；POST 方法向URL制定的资源提交数据或者附加新的数据；PUT 方法也是向服务器提交数据。但是与 POST 方法不同的是 PUT 制定了资源在服务器上的位置而 POST 没有；HEAD 请求页面的首部；DELETE 方法删除服务器上的某资源；OPTIONS 方法用于获取当前 URL 所支持的方法，请求成功会有一个 ALLOW 的头包含 "GET POST" 之流的信息。TRACE 方法用于激发一个远程的，应用层的请求消息回路；CONNECT 方法用于把请求链接转换到透明的 TCP/IP 通道。

## 从浏览器地址栏输入 url 到显示页面的步骤

浏览體根据请求的 URL 交给 DNS 域名解析，找到真实 IP 向服务器发起请求；
服务器交给后台处理完成后返回数据，浏览器接收文件 (HTML、JS、CSS等)；浏览器对加载到的资源 (HTML、JS、CSS 等）进行语法解析，建立相应的内部数据结构（如 HTML 的DOM)；载入解析到的资源文件，渲染页面，完成。

## 如何进行网站性能优化

content 方面可以减少 HTTP 请求；合并文件、CSS spirit、[inline Image](https://www.easytechjunkie.com/what-is-an-inline-image.htm)；减少 DNS 查询，即 DNS 缓存、将资源分布到恰当数量的主机名；减少 DOM 元素数量。

server 方面可以使用 CDN，配置 Etag，对组件使用 gzip 压缩。

Cookie 上减少 Cookie 大小。

CSS 方面将样式放入页面顶部；不使用 CSS 表达式；使用 <link> 不使用 @import。

Javascript 反面将脚本放在页面底部；区分 JS 和 CSS 即重外部引入且要压缩；删除不需要的脚本；减少 DOM 访问。

图片方面不要在 HTML 里拉升图片；优化 CSS spirit。

## HTTP 状态码及其含义

1XX：信息状态码：100 Continue 继续：一般在发送 post 请求时，己发送了http header
之后服务端将返回此信息，表示确认，之后发送具体参数信息。

2XX：𢦓功状态码：200 OK 正常返回信息；201 Created 请求成功并且服务器创建了新的资源；202 Accepted 服务器已接收请求，尚未处理。

3XX:：重定向：301 Moved Permanently 请求网页永久移动；302 Found 临时重定向；303 See other 临时性重定向，且总是使用 GET 请求新的 URI；304 Not Modified 自从上次请求后，请求的网页未修改过。

4XX：客户端错误：400 Bad Request 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求；401 Unauthorized 请求未授权；403 Forbidden 禁止访问；404 Not Found 找不到和 URI 匹配的资源。

5XX：服务器错误：500 lnternal Server Error 最常见的服务器端错误；503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。

## 简介一下对语义话的理解？

语义化即页面内容结构化，便于浏览器解析；不看 CSS 也是文档格式；便于搜索引擎爬虫标记确定上下文和各个关键字权重。

## 简介一下对浏览器内核的理解？

主要分为渲染引擎 layout engineer 和 JS 引擎。渲染引擎负责取得页面内容并整理信息计算网页的显示方式输出在显示器中。

## $nextTick

点击输入框获取焦点，给输入框一个 ref。使用 `this.$refs.inputt.focus()` 会发现没有效果。在此之前可能经过了一个逻辑判断 isEdit，但是此时 vue 没有解析模板，而是继续执行（等到所有逻辑执行完才会解析模板）。这里就会存在 input 框还未渲染，或者说 input 还处于隐藏状态，不能获取焦点。如果此时将这段代码包裹在一个异步定时器中就不会有问题。即使用 $nextTick 可以在下一次 DOM 更新后指定其回调。

## 怎么理解 Vue3

使用 Proxy 代替 defineproperty 实现响应式；重写虚拟 DOM 和 tree-shaking。

新的特性有 Component API（组合 API）：setup、ref 与 reactive、watch 与 watchEffect、provide 与 inject。

新的内置组件：fragment、Teleport、Suspense

其他改变：生命周期钩子、data 选项始终声明为函数、移除 keyCode 支持作为 v-on 的修饰符（`@key-up.enter✔️ @key-up.13❌`）。

在创建工程上 vue3 除了可以使用 vue-cli 创建还可以使用 vite。vite 最印象深刻就是开发环境无需打包操作，可以快速的冷启动。其他的构建工具需要 `npm run serve` 就会进行打包，那么速度会变慢。以及一改代码就局部刷新的热重载功能。webpack 会一开始分析入口、模块等，随后进行一次打包后完成 server ready。vite 一上来就是准备好了，再发起一个 HTTP 请求（路径）去分析路由所需的模块。

```

```
