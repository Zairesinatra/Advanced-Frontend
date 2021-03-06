# **`flex`**

------

## 目标：

`flex`盒子布局原理

`flex`布局常用属性

------

## 前言：

传统布局兼容性好，但布局繁琐，且不能在移动端很好的布局。

`flex`弹性布局操作简单、移动端应用广泛。IE11或低版本不支持（PC端浏览器支持较差）。

如果是PC端页面布局还是使用传统布局，移动端或者不考虑兼容性问题可以使用`flex`弹性布局。

------

## 正文：

### 布局原理：

`flex`是flexible box缩写，称为弹性布局。任何一个容器都可以指定为`flex`布局（块级、行内）

- 父盒子设置`flex`布局后，子元素的`float`、`clear`、`vertical-align`将失效。

- 伸缩布局=弹性布局=伸缩布局=弹性盒布局=弹性布局。

采用`flex`布局的元素，称为 `Flex` 容器，其所有子元素自动成为容器成员，称为 `Flex` 项目，简称"项目"。

<u>**使用中通过给父盒子添加`flex`属性，控制子盒子的位置和排列方式。**</u>

### `flex`布局父项常见属性：

- `flex-direction`：设置主轴的方向。

在`flex`布局中，分为主轴和侧轴两个方向，也可以叫行和列、x轴和y轴。

主轴水平向右，侧轴垂直朝下。当然也可以进行变换的：根据`flex-direction`设置谁为主轴，另一个自动侧轴。<font color="red">元素根据主轴排列。</font>

| 属性值           | 说明     |
| ---------------- | -------- |
| `row`            | 从左到右 |
| `row-reverse`    | 从右到左 |
| `column`         | 从上到下 |
| `column-reverse` | 从下到上 |

- `justify-content`：设置主轴上子元素的排列方式。

使用该属性前确定好主轴方向。

| 属性值          | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| `flex-start`    | 默认主轴首部开始，若主轴为x轴，则从左到右。                  |
| `flex-end`      | 默认主轴尾部开始。仅仅是子元素都看做一整体贴着右边对齐，但是子元素的顺序是不变的。和`flex-direction:row-reverse`不同（顺序颠倒） |
| `center`        | 主轴上居中对其（若主轴是x轴，则水平居中）                    |
| `space-around`  | 平均分配剩余空间。相当于每个盒子的`margin-left`和`margin-right`相等。 |
| `space-between` | 先两边贴边，在平均分配剩余空间。                             |

到这里提一句，使用`flex-direction:column`和`justify-content:center`可以实现垂直居中。（不是即水平又垂直）

- `flex-wrap`：设置子元素是否换行。

<u>按道理如果子盒子过多，父盒子摆不开则会换行。但是`flex`会自动缩小子盒子在一行自适应。</u>

| 属性值    | 说明             |
| --------- | ---------------- |
| `no-wrap` | 默认值，不换行。 |
| `wrap`    | 换行。           |

- `align-content`：设置侧轴上子元素的排列方式。**（多行）**

设置子项在侧轴的排列方式，且仅能用于 **<font color='red'>换行</font>** 的情况（多行），且单行下没有效果。

| 属性值          | 说明                                 |
| --------------- | ------------------------------------ |
| `flex-start`    | 默认侧轴头部开始排列                 |
| `flex-end`      | 侧轴尾部开始排列                     |
| `center`        | 侧轴中间显示                         |
| `space-around`  | 子项在侧轴平分剩余空间               |
| `space-between` | 子项在侧轴先分布在两头，在平均分空间 |
| `stretch`       | 子项元素高度平分父元素高度           |

- `align-items`：设置侧轴上子元素的排列方式。**（单行）**

控制子项在侧轴（默认y轴）的排列方式，子项为单项的时候使用。

要么上沿、下沿、居中对齐、拉伸，但是不能实现上一排盒子上沿对其，下一排盒子下沿对齐。因为这要用到（space-around、space-between）

| 属性值       | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| `flex-start` | 默认值 从上到下                                              |
| `flex-end`   | 从下到上                                                     |
| `center`     | 挤在一起                                                     |
| `stretch`    | 拉伸。但是子盒子不要给高度，沿着侧轴拉伸和父盒子一样高。（用的较少） |

- `flex-flow`：复合属性，相当于同时设置`flex-direction`和`flex-wrap`

```css
flex-flow:row wrap;
```



### flex布局子项常属性：

- `flex`属性：定义子项分配剩余空间，用`flex`表示占（一共多少子项的）多少<font color="red">份数</font>。（剩余空间分配、分配多少份）

```css
.item{flex:<number>;/* default 0 */}
```

- `align-self`：控制子项在侧轴的排列方式（了解）

`align-self`允许某个单个项目与其他项目不一样，可以覆盖`align-item`属性。

默认值为`auto`，表示可以继承父元素的`align-items`属性，如果没有父元素，则等同于`strench`

- `order`属性定义子项的排列顺序（了解）

数值越小，排列靠前，默认为0。

注意与z-index不一样

------

## 结束：

区分`align-content`和`align-items`：

- `align-items`适用于 **单行** 情况，只有上下对齐、居中和拉伸
- `align-content`适应于 **换行** 情况，可以设置上、下对齐，居中，拉伸以及平均分配剩余空间及其属性值
- 总结单行找`align-items`，多行找`align-content`