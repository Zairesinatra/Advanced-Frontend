# SEO优化

------

## 搜索引擎工作原理

在搜索引擎的后台会有存储了海量关键词（每个关键词又对应着很多网址）的庞大数据库。其中网址是被 **搜索引擎机器人** 从互联网逐个下载收集而来。在互联网世界里，有很多个搜索引擎，每个搜索引擎都有各自的抓取程序 —— spider ：

- 百度spider：Baiduspider
- 谷歌spider：Googlebot
- 必应spider：bingbot ...

每时每刻 spider 按照一定的网页分析算法以及最佳优先搜索策略（如一个关键词对应多个网址则进行吻合排序），预测候选URL与目标网页的相似度，或与主题的相关性，并选取评价最好的一个或几个 URL 进行抓取，再访问经过网页分析算法预测为“有用”的网页，并下载其中的内容进行分析提炼，找到其中的不存在数据库而对用户有用的关键词便存入后台的数据库，相反则认为是垃圾信息舍去。当用户搜索时，就能检索出与关键字相关的网址显示给访客，相应的如果网站内容可以被搜索引擎能识别，那么搜索引擎就会提高该网站的权重，增加对该网站的友好度。这样一个过程称之为 SEO (Search Engine Optimization) 。

**搜索引擎优化是为了提升网页在引擎的自然搜索结果中的收录数量以及排序位置与权重。**增加对搜索引擎的友好度，使得用户在访问网站时能排在前面。白帽 SEO —— 改良和规范网站设计、黑帽 SEO —— 利用和放大搜索引擎政策缺陷来获取更多访问量。

## 前端 SEO 规范

### 1. 合理的 `title、description、keywords`

这三项的权重逐个减小，搜索引擎抓取网页最先读取的 title 值强调重点、description 高度概括页面内容、keywords 列举关键词。

```html
<title>网站标题</title>
<!-- 计算机只对英语的敏感性较高, 对汉语的敏感性不高 -->
<!--
1. 首页: 网站名称-主关键词|主关键词的描述
2. 栏目页: 栏目名称|栏目关键词-网站名称
3. 分类列表页: 分类列表页名称-栏目名称-网站名称
4. 文章页: 文章标题-网站名称|内容标题-栏目名称|内容标题-栏目名称-网站名称
-->
```

```html
<meta name="description" Content="网页的简述">
<!-- description 描述内容要和页面内容相关, 一般不超过 150 个字符-->
<!--
1. 首页: 首页标题-关键词-特殊栏目
2. 栏目页: 栏目标题-关键字-分类列表名
3. 分类列表页: 列表标题-关键词
4. 文章页: 文章标题-内容-关键词
-->
```

```html
<meta name="keywords" content="keyword1,keyword2,keyword3">
<!--阐述本页内容是围绕哪些词展开, 且词语间要用 , 隔开-->
<!--
1. 首页: 网站名-关键词-特殊栏目
2. 栏目页: 栏目标题-关键字-分类列表名
3. 分类列表页: 列表标题-关键词
4. 文章页: 文章标题-内容-关键词
-->
```

### 2. 语义化符合 W3C 规范 HTML

- 语义化代码让搜索引擎容易理解网页 —— HTML5 新增的语义元素。扁平化的目录层次 —— 尽量只跳转 3 次就能到达站内的任一页。导航优化 —— 加上面包屑导航优化用户体验、使 spider 更好解析网站结构，降低跳出率。重要内容不要用 JS 输出，因为 spider 不会读取JS里的内容，所以重要内容必须放在HTML里。

```html
<!DOCTYPE html>
<html>
  <!-- 重要内容 HTML 代码放在最前 -->
  ￼<head>￼
  <meta charset="utf-8" />￼
  <title></title>￼
  </head>￼
  <body>￼
    <header></header>￼
    <nav></nav>￼
    <article>￼
      <header></header>
      <footer></footer>
    </article>
    <aside></aside>
    <section>￼
      <header></header>
    </section>
    <footer></footer>￼
  </body>￼
</html>
```

- 减少无语义的标签 `div | span` ；避免纯样式标签 `b | font | u | strong | em ` 等；尽量少使用 `iframe` 內嵌框架（载入慢、搜索引擎算法无法检索）。
- 使用表格时，标题要用 `caption`，表头用 `thead`，主体部分用 `tbody` 包围，定义了一组表格中各列的汇总行用 `tfoot` 包围。表头和一般单元格要区分开，表头用 `th`，单元格用 `td`；

```html
<table>
  	<caption>caption</caption>
    <thead>
        <tr>
            <th colspan="2">The table header</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>The table body</td>
            <td>with two columns</td>
        </tr>
    </tbody>
    <tfoot>tfoot</tfoot>
</table>
```

- `<fieldset>` 元素将一个HTML表单的一部分组成一组，内置了一个 `legend` 元素作为 `fieldset` 的标题。

```html
<form>
  <fieldset>
    <legend>Choose your favorite language</legend>
		<!-- 将一个 <label> 和一个 <input> 元素匹配在一起, 需要给 <input> 一个 id 属性. 而 <label> 需要一个 for 属性, 其值和  <input> 的 id 一样 -->
    <input type="radio" id="java" name="language">
    <label for="java">java</label><br/>

    <input type="radio" id="javascript" name="language">
    <label for="javascript">javascript</label><br/>

    <input type="radio" id="c++" name="language">
    <label for="c++">c++</label>
  </fieldset>
</form>
```

- 非装饰性图片必加 alt

```html
<img src="xxx.jpg" alt="..." />
<!-- alt 属性指定替代文本, 用于在图像无法显示或者用户禁用图像显示时, 代替图像显示在浏览器中的内容 -->
<!-- 作用: 增强内容相关性; 提高关键词密度 -->
```

### 3. CSS优化

- 文本缩进不要使用特殊符号 ，应当 CSS 进行设置。

```css
p { text-indent: 2em; }
```

- 对于不想显示的文字内容，慎重使用 `display：none` ，最好设置 `z-index` 或负数的缩进偏离出视窗外。因为搜索引擎会过滤掉 `display:none` 其中的内容。
- 浏览器在加载HTML内容时，对于资源文件优先级加载是HTML 内容自上而下进行解析，解析到 `link` 或者 `script` 标签就会加载 `href` 或者 `src` 对应链接内容，为了**避免闪屏**，需要 CSS 提前加载，不要受 JS 加载阻塞影响 —— CSS在头，JS在尾。
- 尽量外链 CSS 和 JS（结构、表现和行为的分离），保证网页代码的整洁，也有利于日后维护。
- 避免使用 CSS 表达式，会影响效率（calc）。
- 减少重排（Reflow）如果需要在DOM操作时添加样式，尽量使用 增加 class 属性，而不是通过 style 操作样式。

### 4. 友链可提高网站权重

友情链接是具有一定资源互补优势的网站之间的简单合作形式，也称为网站交换链接、联盟链接，达到互相推广的目的。代码实现必须在源代码中存在对应的网址和网站名称，且浏览网页的时候能显示网站名称。但是链接也不能太多，没有实质性的链接很容易影响用户体验，也会降低网站首页的权重，收录效果也不好。

### 5. 外链提高网站权重

外链就是指在别的网站导入自己网站的链接。导入链接对于网站优化来说是非常重要的一个过程。导入链接的质量（即导入链接所在页面的权重）间接影响了我们的网站在搜索引擎中的权重。

外链是互联网的血液，是链接的一种。没有链接的话，信息就是孤立的，结果就是我们什么都看不到。一个网站是很难做到面面俱到的，因此需要链接到别的网站，将其他网站所能补充的信息吸收过来，连接外链不在于数量，而是在于链接外链的质量。

外链的效果不只是为了提高网站的权重，也不仅仅是为了提高某个关键词的排名。一个高质量的外部链接是可以给网站带来很好的流量。

### 6. 搜索引擎提交收录站点

[百度提交](https://ziyuan.baidu.com/linksubmit/url)、[Google提交](http://www.google.com/addurl/?hl=zh-CN&continue=/addurl)、[360提交](https://info.so.360.cn/site_submit.html)、[搜狗提交](http://fankui.help.sogou.com/index.php/web/web/index?type=1)、[必应提交](https://www.bing.com/toolbox/webmaster/)

### 7. 提高网站速度：

网站速度是搜索引擎排序的一个重要指标，可以通过 webpack 打包合并CSS和JS文件；使用CDN网络缓存，加快用户访问速度，减轻服务器压力；启用 GZIP 压缩，增大 spider 信息量获取；采用 lazyload 控制了网页资源一次性请求数量；多使用 CSS Sprites 精灵图之流来减少 HTTP 请求，在浏览器与服务器进行通信时，主要是通过 HTTP 进行通信。浏览器与服务器需要经过三次握手，每次握手需要花费大量时间。而且不同浏览器对资源文件并发请求数量有限（不同浏览器允许并发数），一旦 HTTP 请求数量达到一定数量，资源请求就存在等待状态，当速度很慢时，用户体验不好，留不住访客，且一旦超时 spider 会中止。