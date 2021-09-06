# HTMLCSSTR

------

##### This project (HTMLCSSTR stands for HTML&CSS Technical Record) is dedicated to summarizing the key points encountered in HTML and CSS, and explaining personal understanding through interesting comparisons and associations, aiming to improve development efficiency. Because it is a personal review habit, subsequent improvements will be made to supplement unsorted defects.

本项目（HTMLCSSTR即HTML&CSS技术记录）致力于总结HTML和CSS中遇到的关键点，通过有趣的对比和联想来阐述个人理解，目标提高开发效率。 因为是个人复习习惯，后续会改进补充未排序的缺陷。

------

## HTML

### `href`与`src`区别：

#### 全称解释：

href - hypertext reference - 超文本引用参照、src - source - 资源

#### 应用场景：

| `href`          | `src`                                                 |
| --------------- | ----------------------------------------------------- |
| `<link>`、`<a>` | `<img>`、`<style>`、`<script>`、`<input>`、`<iframe>` |

#### 个人理解：

```<img src="xxx" alt="直接看见">```

```<a href="…">看不见(点击a标签才看见)</a>```

`href`建立通道联系其他资源、`img`直接显示引用属性，下载资源并引用成为当前文档一部分。浏览器遇见这个属性会暂停其他资源处理，直到属性指向的资源下载编译与执行完才会进行下一步（类似汽车加油⛽️时不可以启动至加完油，且汽油在油表显示）。

#### 总结：

`href`是超链接，建立通道。当前元素、文档和引用资源进行联系，需要点击引用通过通道。

`src`属性会下载资源并引用到文档中。

------

## CSS

### 1. 正方形变圆形

`border-radius`可以使用`px`、`%`、`em`

- **像素设置**

```css
.zs1 div {
    width: 100px;
    height: 100px;
    background-color: #FF4D4D;
}
```

```html
<div class="zs1">
  <div style="border-radius: 10px; display: inline-block;"></div>
  <div style="border-radius: 30px; display: inline-block"></div>
  <div style="border-radius: 50px; display: inline-block"></div>
</div>
```

上述代码产生的圆角相当于在正方形四个角生成不同半径大小的圆，当 `border-radius`与正方形半径相等相当于四个圆重合在以中心为圆心的位置。

- **百分号设置**

百分号是由百分比确定的，即最终是长、宽乘以百分比。

```css
.zs2 div {
    width: 100px;
    height: 100px;
    background-color: #00B26A;
}
```

```html
<div class="zs2">
  <div style="border-radius: 10%; display: inline-block;"></div>
  <div style="border-radius: 30%; display: inline-block"></div>
  <div style="border-radius: 50%; display: inline-block"></div>
</div>
```

- **`em`设置**

一般是字体单位，较少设置 `border-radius`。任意浏览器的默认字体高度是 16像素，故有 1`em` = 16 `px` 。

```css
.zs3 div {
    width: 100px;
    height: 100px;
    background-color: #06B4FE;
}
```

```html
<div class="zs3">
  <div style="border-radius: 1em; display: inline-block;"></div>
  <div style="border-radius: 2em; display: inline-block"></div>
  <div style="border-radius: 5em; display: inline-block"></div>
</div>
```

<a href="https://res.cloudinary.com/dzb9ldnvl/image/upload/v1622789353/blog/round_cil8s4.png">查看效果</a>

那么如果根据上述代码，设置如下的`border-radius`会产生会产生设置了半径为 `200px` 的圆形，那么已经远大于原本设置的正方形。虽然这样是不合理的，即 CSS 不会做出超出范围的处理。因此达到产生圆形的临界值-任然产生圆形。

```css
border-radius: 200px;
border-radius: 80%;
border-radius: 12em;
```

### 2. rem：

`1rem` 等于 html 根元素中设定 `font-size` 里的 px 值。若没有设定 html 的 `font-size`，则默认为浏览器的 `1rem=16px` 来换算。

场景：在 CSS 中设定 `font-size:14px`，那么后面 CSS 里的 rem 值则是以 14 来换算：

```css
html{font-size:14px}
```


此时设定一个 div 宽度为 `3rem`，高度为 `2.5rem`。则实际换算成 px 为 `width:42px;height:35px`。同理，若设计稿为宽度 `42px`，高度为 `35px`，换成 rem 则是 `42/14=3rem;35/14=2.5rem`。

------

## XML

### 初识 XML：

- XML 指**可扩展标记语言**`（Extensible Markup Language）`且是一种<u>很像HTML的标记语言</u>。。
- XML 的开发是为**传输、存储数据**（具有自我描述性），而不是显示数据(HTML) —— XML 不是 HTML 的替代。
- <u>XML 标签没有被预定义。需要自行定义标签。</u>（W3C 的推荐标准）

```xml
<!--
实例
 zs 写给 xzy 的便签,存储为 XML:
-->
<!--没有预定义的标签-->
<note>
  <to>xzy</to>
  <from>zs</from>
  <heading>Reminder</heading>
  <body>Don't forget me!</body>
</note>
<!--这条便签具有自我描述性.包含了发送者和接受者的信息,同时拥有标题以及消息主体-->
```

但是，这个 XML 文档仅仅是包装在 XML 标签中的纯粹的信息。需要其他程序，才能传送、接收和显示出这个文档包含的数据。

### XML 用途：

XML 应用于简化数据的存储和共享。

- HTML 数据分离

在 HTML 文档中编辑显示动态数据较为费时。那么通过独立的存储 数据 于 XML 文件，则可以专业使用 HTML/CSS 进行显示和布局，并无需考虑底层数据的改变。只需通过 JavaScript 代码读取外部 XML 文件更新网页的数据内容。

- XML 简化数据共享

由于物理世界中计算机系统和数据存储格式不兼容。以**纯文本格式进行存储**的 XML 数据，可以提供了独立于软件和硬件的数据存储方法。且易于拓展升级。

### XML 树结构：

- XML 文档实例

```xml
<!--XML 声明。它定义 XML 的版本（1.0）和所使用的编码（UTF-8 : 万国码, 可显示各种语言）-->
<?xml version="1.0" encoding="UTF-8"?>
<!-- 描述文档的根元素（像在说："本文档是一个便签"）-->
<note>
<!--描述根的 4 个子元素-->
<to>xzy</to>
<from>zs</from>
<heading>Reminder</heading>
<body>Trust youself!</body>
</note>
```

- 树结构-所有元素均可拥有子元素：

```xml
<!--XML 文档必须包含 根元素 。该元素是所有其他元素的父元素-->
<root>
  <!--XML 文档中的元素形成了一棵文档树。这棵树从根部开始，并扩展到树的最底端-->
  <child>
    <!--所有元素均可拥有子元素-->
    <subchild>.....</subchild>
  </child>
</root>
```

### XML 语法规则：

- XML 元素须有**关闭标签**

```xml
<!--在 XML 中,不可非法省略关闭标签-->
<p>zairesinatra</p>
<p>xzy</p> 
```

- XML 标签对大小写敏感

而 XML 标签对大小写敏感（这里不同于 HTML）。即在 XML 中，标签 <Letter> 与标签 <letter> 是不同的。

```xml
<!--必须使用相同的大小写来编写打开标签和关闭标签-->
<Message>这是错误的。</message>
<message>这是正确的。</message> 
```

- 嵌套正确

```xml
<b><i>This is a test text</i></b>
```

- XML 文档必须有根元素

```xml
<!--XML 文档必须有一个元素是所有其他元素的父元素。该元素称为根元素。-->
<root>
  <child>
    <subchild>.....</subchild>
  </child>
</root>
```

- 属性值必须加引号

与 HTML 类似，XML 也可拥有属性（名称/值的对）。

```xml
<!--错误: note 元素中的 date 属性没有加引号-->
<note date=08/08/2008>
<to>George</to>
<from>John</from>
</note> 
```

```xml
<!-- 正确 XML -->
<note date="08/08/2008">
<to>George</to>
<from>John</from>
</note> 
```

- 实体引用

**实体引用**代替 "<" 字符

```xml
<message>if salary &lt; 1000 then</message> 
```

 5 个预定义的实体引用：

| `&lt`    | <    | 小于   |
| -------- | ---- | ------ |
| `&gt;`   | >    | 大于   |
| `&amp;`  | &    | 和号   |
| `&apos;` | '    | 单引号 |
| `&quot;` | "    | 引号   |

- 注释

```xml
<!-- This is a comment --> 
```

- 空格保留

------

## ERROR：

```zsh
# 使用 git 对源代码进行 push 到 gitHub 时出错
! [rejected]    main -> main (fetch first)
error: failed to push some refs to 'github.com:Zairesinatra/htmlcssGR.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

- 出现错误的主要原因是github中的README.md文件不在本地代码目录中

- 通过如下命令进行代码合并【注：pull=fetch+merge]

```zsh
git pull --rebase origin master
```

- 执行上面代码后可以看到本地代码库中多了README.md文件

- 再执行语句 git push 完成代码上传到 github
