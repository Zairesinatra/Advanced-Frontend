# webpack

------

## webpack 简介

### 概述

webpack 是一种前端资源构建工具，一个静态模块打包器 (module bundler) 。 在 webpack 看来, 前端的所有资源文件 `(js/json/css/img/less/...)` 都会作为模块处理。根据模块的依赖关系进行静态分析，打包生成对应的静态资源 (bundle) 。 

### 五个核心概念

- #### Entry

入口指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。

- #### Output

输出指示 webpack 打包后的资源 bundles 输出到哪里去，以及如何命名。

- #### Loader

webpack 自身只理解 JavaScript，故需让 webpack 能够去处理那些非 `.js` 文件。主要职责是完成非 JavaScript 模块到 JavaScript 模块的转换。

- #### Plugins

插件可以用于执行范围更广的任务。包括打包优化、压缩到重新定义环境中的变量等。 

- #### Mode

指示 webpack 使用相应模式的配置。

| 选项        | 描述                                                         | 特点                   |
| ----------- | ------------------------------------------------------------ | ---------------------- |
| development | 将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。 | 开启本地调试运行环境   |
| production  | 将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin。 | 代码优化上线运行的环境 |

### 初始化配置

```zsh
# 初始化 package.json
npm init
# 下载并安装 webpack
npm install webpack webpack-cli -g
npm install webpack webpack-cli -D
# 编译打包应用
# webpack 能够编译打包 js 和 json 文件, 并且能将 es6 的模块化语法转换成浏览器能识别的语法
webpack src/js/index.js -o build/js/built.js --mode=development # 开发环境指令
webpack src/js/index.js -o build/js/built.js --mode=production # 生产环境指令
# 问题: 不能编译打包 css、img 等文件; 不能将 js 的 es6 基本语法转化为 es5 以下语法
```

------

## webpack 开发环境的基本配置

能让代码运行即可。

### 创建配置文件 webpack.config.js

```js
const { resolve } = require('path'); // node 内置核心模块处理路径问题
module.exports = { 
  entry: './src/js/index.js', // 入口文件
	output: { // 输出配置 
  	filename: './built.js', // 输出文件名 
  	path: resolve(__dirname, 'build/js') // 输出文件路径配置 
  },
	mode: 'development' //开发环境 
};
```

#### 打包样式资源

```zsh
npm i css-loader style-loader less-loader less -D
```

```js
// resolve 用来拼接绝对路径的方法 
const { resolve } = require('path'); 
module.exports = { // webpack 配置 
  entry: './src/index.js', // 入口起点 
  output: {	// 输出  
    filename: 'built.js', // 输出文件名
    path: resolve(__dirname, 'build')	// __dirname —— nodejs 的变量，代表当前文件的目录绝对路径
    },
  // loader 的配置 —— module.rules 允许在 webpack 配置中指定多个 loader
  module: { 
    rules: [ // 不同文件必须配置不同 loader 处理 
      {
        test: /\.css$/, // 匹配哪些文件
        // use 数组中 loader 执行顺序：从右到左，从下到上 依次执行
        use: [ // 使用哪些 loader 进行处理 
          // 创建 style 标签, 将 js 中的样式资源插入进行, 添加到 head 中生效 
          'style-loader',
          // 将 css 文件变成 commonjs 模块加载 js 中, 里面内容是样式字符串 
          'css-loader' ] },
      { 
        test: /\.less$/, 
        use: [ 
          'style-loader', 
          'css-loader', // 将 less 文件编译成 css 文件
          'less-loader' // 需要下载 less-loader 和 less 
        ] 
      } 
    ] 
  },
  // plugins 的配置 
  plugins: [ 
    // 详细 plugins 的配置 
  ],
  // 模式 
  mode: 'development', // 开发模式 // mode: 'production' 
}
```

运行指令，有了配置文件，只需在终端中运行 webpack 命令就可进行打包，这条命令会自动引用 webpack.config.js 文件中的配置选项。

```zsh
webpack
```

#### 打包 HTML 资源

```
文件夹----------src----------index.js
	|							└──---------index.html
	└──----------webpack.config.js					
```

```zsh
# 下载安装 plugin 包
npm install --save-dev html-webpack-plugin
```

```js
const { resolve } = require('path');
// 该插件将生成一个 HTML5 文件, 其中包含使用 script 标签的正文中的所有 webpack 包
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = { 
  entry: './src/index.js', 
  output: { 
    filename: 'built.js', 
    path: resolve(__dirname, 'build') 
  },
  module: {
    rules: [ 
      // loader 配置
    ] },
  plugins: [ 
    // plugins 的配置 
    // html-webpack-plugin 
    // 功能: 默认会创建一个空的 HTML, 自动引入打包输出的所有资源（JS/CSS） 
    // 需求: 需要有结构的 HTML 文件 
    new HtmlWebpackPlugin({ 
      // 复制 './src/index.html' 文件, 并自动引入打包输出的所有资源（JS/CSS） 
      template: './src/index.html' 
    }) 
  ],
  mode: 'development' 
};
```

#### 打包图片资源

```zsh
# 下载安装 loader 包
npm install --save-dev html-loader url-loader
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
module.exports = { 
  entry: './src/index.js', 
  output: { 
    filename: 'built.js', 
    path: resolve(__dirname, 'build') 
  },
  module: { 
    rules: [ 
      { 
        test: /\.less$/, // 要使用多个 loader 处理用 use 
        use: ['style-loader', 'css-loader', 'less-loader'] 
      },{ 
        // 问题：默认处理不了 html 中 img 图片 
        // 处理图片资源 
        test: /\.(jpg|png|gif)$/, 
        // 使用一个 loader 直接使用 loader 不需要 use
        // 下载 url-loader file-loader 
        loader: 'url-loader', 
        options: {
          // 图片大小小于 8kb，就会被 base64 处理 
          // 优点: 减少请求数量（减轻服务器压力）缺点：图片体积会更大（文件请求速度更慢） 
          limit: 8 * 1024, 
          // 问题: 因为 url-loader 默认 es6 模块化解析，而 html-loader 引入图片是 commonjs 
          // 解析时会出问题：[object Module] 
          // 解决: 关闭 url-loader 的 es6 模块化，使用 commonjs 解析 
          esModule: false, 
          // 给图片进行重命名 
          // [hash:10]取图片的 hash 的前 10 位 [ext]取文件原来扩展名 
          name: '[hash:10].[ext]' 
        }
      },{ 
        test: /\.html$/, 
        // 除了样式中引入还可能需要 html 标签引入
        // 处理 html 文件的 img 图片（负责引入 img，从而能被 url-loader 进行处理） 
        loader: 'html-loader' 
      } 
    ] 
  },
  plugins: [ 
    new HtmlWebpackPlugin({ template: './src/index.html' }) 
  ],
  mode: 'development' 
};
```

#### 打包其他资源

通常为矢量图标库

```zsh
# 下载安装 loader 包
npm install --save-dev file-loader
```

```js
const { resolve } = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
module.exports = { 
  entry: './src/index.js', 
  output: { 
    filename: 'built.js', 
    path: resolve(__dirname, 'build') },
  module: { 
    rules: [ 
      { 
        test: /\.css$/, 
        use: ['style-loader', 'css-loader']
      }, // 打包其他资源(除了 html/js/css 资源以外的资源) 
      { // 排除 css/js/html 资源 
        exclude: /\.(css|js|html|less)$/, 
        loader: 'file-loader', 
        options: { name: '[hash:10].[ext]' } 
      } 
    ] 
  },
  plugins: [ new HtmlWebpackPlugin({ template: './src/index.html' })
```

#### devserver

开发服务器 devServer 自动化编译、打开浏览器、刷新浏览器。只会在内存中编译打包，不会有任何输出。

```zsh
# 下载包
npm i webpack-dev-server
```

```js
const { resolve } = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = { 
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build') 
  },
  module: {
    rules: [ 
      { 
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'] 
      },
      { // 排除 css/js/html 资源 
        exclude: /\.(css|js|html|less)$/, // 打包其他资源(除了 html/js/css 资源以外的资源) 
        loader: 'file-loader', 
        options: { name: '[hash:10].[ext]' } 
      } 
    ] 
  },
  plugins: [ 
    new HtmlWebpackPlugin(
      { template: './src/index.html' }
    ) 
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'), // 项目构建后路径
    compress: true, // 启动 gzip 压缩
    port: 3000, // 端口号 
    open: true // 自动打开浏览器 
  } 
};
```

运行指令

```zsh
npx webpack-dev-server
```

这里需要注意，如果使用的是 **webpack-cli 4**  或 **webpack 5**，更改 `webpack-dev-server` 为 `webpack serve` 。[stackoverflow链接](https://stackoverflow.com/questions/40379139/cannot-find-module-webpack-bin-config-yargs)。

NPM package.json 脚本是一种方便的方法运行本地安装的二进制文件，而不必担心它们的完整路径。简单地定义一个脚本。

- 对于 webpack-cli 3.x：

```js
"scripts": { "start:dev": "webpack-dev-server" }
```

- 对于 webpack-cli 4.x：

```js
"scripts": { "start:dev": "webpack serve" }
```

#### 开发环境配置

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = { 
  entry: './src/js/index.js', 
  output: { 
    filename: 'js/built.js', 
    path: resolve(__dirname, 'build') 
  },
  module: { 
    rules: [ // loader 的配置 
      { // 处理 less 资源 
        test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] 
      },{ // 处理 css 资源 
        test: /\.css$/, use: ['style-loader', 'css-loader'] 
      },{ // 处理图片资源 
        test: /\.(jpg|png|gif)$/, 
        loader: 'url-loader', 
        options: { 
          limit: 8 * 1024, 
          name: '[hash:10].[ext]', // 关闭 es6 模块化 
          esModule: false, 
          outputPath: 'imgs' 
        } 
      },{ // 处理 html 中 img 资源 
        test: /\.html$/, 
        loader: 'html-loader' 
      },{ // 处理其他资源 
        exclude: /\.(html|js|css|less|jpg|png|gif)/, 
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]', 
          outputPath: 'media' 
        } 
      } 
    ] 
  },plugins: [ // plugins 的配置 
    new HtmlWebpackPlugin({ template: './src/index.html' }) 
  ],
  mode: 'development',
  devServer: { 
    contentBase: resolve(__dirname, 'build'),
    compress: true, 
    port: 3000,
    open: true 
  } 
};
```

## webpack 生产环境的基本配置

#### 提取 css 成单独文件

样式经过处理整合在 `.js` 中（css-loader）会使 `.js` 体积非常大，下载速度慢。同时必须先加载才能创建标签加载在页面中，这里又会出现闪屏现象。故需要将 `.css` 文件从 `.js` 文件提取出来。又考虑代码体积较大，需要进行压缩处理。部分样式代码与 `.js` 代码存在兼容问题，如部分 CSS3 需要加上前缀才可以在低版本进行运行。[详细信息点此](https://webpack.js.org/plugins/mini-css-extract-plugin/)。

```zsh
# 下载插件
npm install --save-dev mini-css-extract-plugin
```

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      { 
        test: /\.css$/,
        use: [ 
          // 创建 style 标签，将样式放入 
          // 'style-loader', 
          // 这个 loader 取代 style-loader。作用：提取 js 中的 css 成单独文件 
          MiniCssExtractPlugin.loader, // 不需要引号
          // 将 css 文件整合到 js 文件中 
          'css-loader' 
        ] 
      } 
    ] 
  },
  plugins: [ 
    new HtmlWebpackPlugin({ 
      template: './src/index.html' 
    }), 
    new MiniCssExtractPlugin({ 
      // 对输出的 css 文件进行重命名 
      filename: 'css/built.css' 
    }) 
  ],
  mode: 'development' 
};
```

#### css 兼容性处理

兼容处理需要 postcss --> postcss-loader 保证在 webpack 中使用，同时通过 postcss-preset-env 识别环境，帮助 post-css 找到  package.json 中 browserlist 里的配置，通过配置加载指定的 css 兼容性样式。[详情点此](https://www.webpackjs.com/loaders/postcss-loader/)。

```zsh
# 下载插件
npm install --save-dev postcss-loader postcss-preset-env
```

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
// 设置 nodejs 环境变量 -- 指明使用 package.json 中哪个环境的配置
// process.env.NODE_ENV = 'development'; // 不进行配置则会默认为生产环境
module.exports = { 
  entry: './src/js/index.js', 
  output: { 
    filename: 'js/built.js', 
    path: resolve(__dirname, 'build') 
  },
  module: { 
    rules: [ 
      { 
        test: /\.css$/, 
        use: [ 
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          // 修改配置需要写成对象的方式
          { 
            loader: 'postcss-loader', 
            options: { 
              ident: 'postcss', // 固定写法
              plugins: () => [ 
                // postcss 的插件 
                require('postcss-preset-env')() 
              ] 
            } 
          } 
        ]
      } 
    ] 
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({ filename: 'css/built.css' }) 
  ],
  mode: 'development' 
};
```

```json
// package.json
"browserslist": { 
  "development": [ 
    // 兼容最近的浏览器版本
    "last 1 chrome version", 
    "last 1 firefox version",
    "last 1 safari version" 
  ],
  "production": [ 
    ">0.2%",
    "not dead",
    "not op_mini all" 
  ]
}
```

上述 browserlist 仓库[点此跳转](https://github.com/browserslist/browserslist)。

#### 压缩 css

兼容性一般 loader 去做，而压缩通常为插件去完成。

```zsh
# 下载安装包
npm install --save-dev optimize-css-assets-webpack-plugin
```

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin' )
// 设置 nodejs 环境变量 
// process.env.NODE_ENV = 'development'; 
module.exports = { 
  entry: './src/js/index.js', 
  output: { 
    filename: 'js/built.js', 
    path: resolve(__dirname, 'build') 
  },
  module: { 
    rules: [ 
      { 
        test: /\.css$/, 
        use: [ 
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          { 
            loader: 'postcss-loader', 
            options: { 
              ident: 'postcss', 
              plugins: () => [ 
                // postcss 的插件 
                require('postcss-preset-env')() 
              ] 
            }
          }
        ] 
      } 
    ] 
  },
  plugins: [ 
    new HtmlWebpackPlugin({ template: './src/index.html' }), 
    new MiniCssExtractPlugin({ filename: 'css/built.css' }), 
    // 压缩 css 
    new OptimizeCssAssetsWebpackPlugin() ],
  mode: 'development' 
};
```

#### js 语法检查 

规范代码书写语法风格，同时检查常见的语法错误，增强代码健壮性。最常使用 eslint-loader ，基于 eslint 库。这里注意 eslint 仅检查开发者书写的源代码，不检查第三方的库。部分需要忽略检查的代码前可以加上 `eslint-disable-next-line`。[详细移步](https://www.npmjs.com/package/eslint-config-airbnb-base)。

```zsh
# 下载安装包使用 slint-config-airbnb-base 库进行语法检查
npm install --save-dev eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import
```

```json
// 配置 package.json
// 官方是说加入 .eslintrc 此处加入 package.json 即可
"eslintConfig": { "extends": "airbnb-base", "env": { "browser": true } }
```

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin' )
// 设置 nodejs 环境变量
// process.env.NODE_ENV = 'development';
module.exports = { 
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build') 
  },
  module: { 
    rules: [ 
      /*
      语法检查： eslint-loader eslint 
      注意：只检查自己写的源代码，第三方的库是不用检查的 
      设置检查规则: package.json 中 eslintConfig 中设置~ 
      "eslintConfig": {
      "extends": "airbnb-base" 
      } 
      airbnb 需要 eslint-config-airbnb-base eslint-plugin-import eslint 三个库
      */
      { 
        test: /\.js$/,
        exclude: /node_modules/,  // 一定要注意, 否则会对 node_modules 进行检查
        loader: 'eslint-loader', 
        options: { 
          // 自动修复 eslint 的错误 
          fix: true 
        } 
      } 
    ] 
  },
  plugins: [ 
    new HtmlWebpackPlugin({ template: './src/index.html' }), 
    new MiniCssExtractPlugin({ filename: 'css/built.css' }),
    // 压缩 css 
    new OptimizeCssAssetsWebpackPlugin() ],
  mode: 'development'
};
```

#### js 兼容性处理 

chrome 浏览器中可以识别不代表 IE 浏览器可以识别 ES6 及其以上语法。`@babel/preset-env` 转换基本语法，`@babel/polyfill` 全部兼容性处理（包括 promise ）。`@babel/polyfill` 下载后引入 `js` 文件即可（暴力）。需要兼容性处理按需加载则考虑 `core-js` 。但是使用 `core-js` 时，不能使用`@babel/polyfill` ，在 `.js` 中引入的需要注释掉。

```zsh
# 下载安装包
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/polyfill core-js
```

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: { 
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
    },
  module: {
    rules: [ { 
      test: /\.js$/, 
      exclude: /node_modules/, 
      loader: 'babel-loader', 
      options: { // 预设：指示 babel 做怎么样的兼容性处理 
        presets: 
        [[ 
          '@babel/preset-env', { 
          // 按需加载 useBuiltIns: 'usage',
          // 指定 core-js 版本
          corejs: { version: 3 },
          // 指定兼容性做到哪个版本浏览器 -- core-js
          targets: { chrome: '60', firefox: '60', ie: '9', safari: '10', edge: '17' }
          }
				]]
      }
    }] 
  },
  plugins: [ new HtmlWebpackPlugin({ template: './src/index.html' }) ],
  mode: 'development'
```

#### js 压缩与 html 压缩

生产环境会自动压缩 `.js` 代码。

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build') 
  },
  plugins: [ new HtmlWebpackPlugin({ template: './src/index.html' }) ],
  // 生产环境下会自动压缩 js 代码 
  mode: 'production' 
};
```

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build') },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', 
      // 压缩 html 代码 
      minify: { // 移除空格 
        collapseWhitespace: true, 
        // 移除注释
        removeComments: true } }) 
  ],
  mode: 'production' 
};
```

#### 生产环境配置汇总

```js
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin' );
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 定义 nodejs 环境变量: 决定使用 browserslist 的哪个环境 
process.env.NODE_ENV = 'production';
// 复用 loader 
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  { 
    // 还需要在 package.json 中定义 browserslist
    loader: 'postcss-loader',
    options: {
      ident: 'postcss', 
      plugins: () => [require('postcss-preset-env')()] 
    } 
  } 
];
module.exports = {
  entry: './src/js/index.js',
  output: { filename: 'js/built.js', path: resolve(__dirname, 'build') },
  module: { 
    rules: [
      { test: /\.css$/, use: [...commonCssLoader] },
      { test: /\.less$/, use: [...commonCssLoader, 'less-loader'] },
      /* 正常来讲, 一个文件只能被一个 loader 处理. 当一个文件要被多个 loader 处理, 那么一定要指定 loader 执行的先后顺序: 先执行 eslint 再执行 babel (先执行 babel-loader再执行 eslint 就会报错) */
      { // 在 package.json 中 eslintConfig --> airbnb 
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行 不论放在哪里的位置!!!
        enforce: 'pre', 
        loader: 'eslint-loader',
        options: { fix: true }
      },
      {
        test: /\.js$/, // 需要检查的 js 文件
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              // @babel/preset-env - @babel/polifill(太大) - core-js
              { // 按需加载 core-js
                useBuiltIns: 'usage', corejs: {version: 3}, // corejs 版本
                targets: { chrome:'60', firefox: '50' } // 指定做到浏览器版本
              }
            ]
          ]
        }
      },
      { 
        test: /\.(jpg|png|gif)/,
        loader: 'url-loader',
        // 记住关闭 es6
        options: { limit: 8 * 1024, name: '[hash:10].[ext]', outputPath: 'imgs', esModule: false }
      },
      // 专门处理 html 中图片问题
      { test: /\.html$/, loader: 'html-loader' }, // 使用的是 commonjs 而 url-loader 使用的是 es6
      { 
        exclude: /\.(js|css|less|html|jpg|png|gif)/,
        loader: 'file-loader',
        options: { outputPath: 'media' }
      }
    ]
  },
  plugins:[ 
    new MiniCssExtractPlugin({ filename: 'css/built.css' }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({ 
      template: './src/index.html',
      // html 文件通过 minify 属性进行压缩
      // 压缩空格、清除注释
      minify: { collapseWhitespace: true, removeComments: true}
    })
  ],
  mode: 'production' 
};
```

```json
"browserlist": {
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ],
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ]
}
"eslintConfig": {
  "extends": "airbnb-base"
}
```

## webpack 优化配置

- 开发环境优化

优化打包构建速度（调试、开发友好）、优化代码调试（告诉开发者源代码出错在哪里）

### HMR(Hot Module Replace)

热模块替换作用：一个模块发生变化，只需重新打包这一个模块（并非所有）。避免上万模块需要重新打包。本地代码改变，重新编译、刷新浏览器即为热更新。HMR 功能对于 `.js` 的处理只能处理非入口 `.js` 文件的其他文件。入口文件进行 HMR 所有文件都会重新打包。

| 文件        | 热更新                                                       |
| ----------- | ------------------------------------------------------------ |
| 样式文件    | 可以使用 HMR 因为 style-loader 内部已实现                    |
| `.js` 文件  | 默认不能使用 HMR 功能                                        |
| `html` 文件 | 默认不能使用 HMR ，同时导致不能热更新的问题（解决：将 `./src/index.html` 文件也放入 entry 入口）——只有一个文件不需要考虑 HMR 功能。 |

```js
devServer: {
  // 修改 webpack 配置一定要重启 webpack 服务
  hot: true // 开启 HMR 功能
}
```

```js
...
import print from './print.js'
...
if(module.hot) {
  // 一旦 module.hot 为 true 则说明开启了 HMR 属性 -- 让 HMR 功能生效
  module.hot.accept('./print.js', function(){ // 这里的 print.js 已经存在
    // 方法监听 print.js 文件变化, 一旦变化其他默认不会重新打包构建
    // 执行后面的回调函数
    print();
  })
}
```

### source-map

开发环境调试代码问题工具——提供源代码到构建后代码映射的技术。构建后代码出错可以通过映射关系追踪源代码的错误。

```js
// webpack.config.js
devtool: 'source-map'
```

```js
[inline-|hidden-|eval-][nosource-][cheap-[module-]]source-map
```

| 前缀         | 解释                                                         |
| ------------ | ------------------------------------------------------------ |
| inline       | 内联文件：外部生成文件，**内联没有生成**；构建速度快；       |
| hidden       | 只生成一个 source-map。能提示错误代码错误原因，不能追踪源代码错误。 |
| eval         | 每一个文件会追加 source-map，都在 eval。能提示错误代码错误原因，能追踪源代码错误，多了哈希值。 |
| nosource     | 同样生成外部 source-map。能提示错误代码错误原因，不能追踪源代码错误。防止源代码泄漏。 |
| cheap        | 生成外部 source-map。能提示错误代码错误原因，能追踪源代码错误，提示到具体的一行。 |
| cheap-module | 生成外部 source-map。能提示错误代码错误原因，能追踪源代码错误，提示到具体的行列。且加上 loader 中加入。 |

开发环境选择：速度快（eval>inline>cheap）

```js
devtool: 'eval-cheap-source-map' // 精确到行速度贼快 > eval-source-map
devtool: 'cheap-module-source-map' // 调试最友好 > cheap-source-map
// 综上最好
devtool: 'eval-source-map'
```

生产环境：源代码是否隐藏？调试友好？

```js
// 内联使体积更大所以生产环境不用内联
// 下边两种隐藏源代码
nosources-source-map // 全部隐藏
hidden-source-map // 隐藏源代码不隐藏构建后代码, 会提示构建后代码错误
// 综上最好
source-map
cheap-module-source-map
```

- 生产环境优化

优化打包构建速度、优化代码运行性能（用户留存度）

### oneOf

在匹配 loader 时会进行多次匹配，使用 `oneOf` 表示一下数组中的 loader 仅会匹配一个，节省时间与功耗。

```js
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin' );
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 定义 nodejs 环境变量: 决定使用 browserslist 的哪个环境 
process.env.NODE_ENV = 'production';
// 复用 loader 
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  { 
    loader: 'postcss-loader',
    options: {
      ident: 'postcss', 
      plugins: () => [require('postcss-preset-env')()] 
    } 
  } 
];
module.exports = {
  entry: './src/js/index.js',
  output: { filename: 'js/built.js', path: resolve(__dirname, 'build') },
  module: { 
    rules: [
      {
        // 以下 loader 只会匹配一个 节省时间与内存损耗
        // 注意: 不能两个 loader 处理同一个文件
        { // 在 package.json 中 eslintConfig --> airbnb 
        		test: /\.js$/,
        		exclude: /node_modules/,
        		// 优先执行 不论放在哪里的位置!!!
        		enforce: 'pre', 
        		loader: 'eslint-loader',
        		options: { fix: true }
      		}
      },
      {
        oneOf: [
          { test: /\.css$/, use: [...commonCssLoader] },
      		{ test: /\.less$/, use: [...commonCssLoader, 'less-loader'] },
        	// 不能两个 loader 处理同一类文件 -- 提出
      		/* { // 在 package.json 中 eslintConfig --> airbnb 
        		test: /\.js$/,
        		exclude: /node_modules/,
        		// 优先执行 不论放在哪里的位置!!!
        		enforce: 'pre', 
        		loader: 'eslint-loader',
        		options: { fix: true }
      		}, */
      		{
        		test: /\.js$/,
        		exclude: /node_modules/,
        		loader: 'babel-loader',
        		options: {
          		presets: [
            		[
              		'@babel/preset-env',
              		{
                		useBuiltIns: 'usage', corejs: {version: 3},
                		targets: { chrome:'60', firefox: '50' }
              		}
            		]
          		]
        		}
      		},
      		{ 
        		test: /\.(jpg|png|gif)/,
        		loader: 'url-loader',
        		options: { limit: 8 * 1024, name: '[hash:10].[ext]', outputPath: 'imgs', esModule: false }
      		},
            { test: /\.html$/, loader: 'html-loader' },
      		{ 
        		exclude: /\.(js|css|less|html|jpg|png|gif)/,
        		loader: 'file-loader',
        		options: { outputPath: 'media' }
      		}
        ]
      }	
    ]
  },
  plugins:[ 
    new MiniCssExtractPlugin({ filename: 'css/built.css' }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({ 
      template: './src/index.html',
      minify: { collapseWhitespace: true, removeComments: true}
    })
  ],
  mode: 'production' 
};
```

### 缓存

考虑生产环境能用 HMR 功能，因为 HMR 基于 devServer 。在 babel 进行翻译时，应该时更改文件变化而其他文件不变，此时应该开启 babel 缓存，将之前编译好的文件进行缓存处理。如果文件没有变化则直接使用缓存而不是再构建一次。

```js
...{ 
  // babel 缓存
  test: /\.js$/, 
  exclude: /node_modules/, 
  loader: 'babel-loader', 
  options: { 
    presets: [ 
      [ 
        '@babel/preset-env', 
        { 
          useBuiltIns: 'usage', 
          corejs: { version: 3 },
          targets: { chrome: '60', firefox: '50' } 
        } 
      ]
    ],
    // 开启 babel 缓存 
    // 第二次构建时，会读取之前的缓存 
    cacheDirectory: true 
  } 
},...
```

文件资源缓存修改文件名——增加 hash 值。**每次构建 webpack 生成唯一的 hash 值**。那么会因为 `.js` 和 `.css` 使用唯一一个 hash 值导致所有缓存失效（改动一个文件）。那么考虑 chunkhash 值，根据 chunk 生成的 hash 值，如果打包来**源于同一个 chunk** ，那么 hash 值一样。（所有根据入口文件被引入的文件都会生成一个 chunk）。最终选择 contenthash ，**根据文件内容生成 hash 值**，不同文件 hash 值一定不一样。

```js
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin' );
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 定义 nodejs 环境变量：决定使用 browserslist 的哪个环境 
process.env.NODE_ENV = 'production'; 
// 复用 loader
const commonCssLoader = [ 
  MiniCssExtractPlugin.loader,
  'css-loader',
  { // 还需要在 package.json 中定义 browserslist
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [require('postcss-preset-env')()] } 
  }
];
module.exports = { 
  entry: './src/js/index.js',
  output: {
    // contenthash
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      { // 在 package.json 中 eslintConfig --> airbnb
        test: /\.js$/, exclude: /node_modules/,
        // 优先执行 
        enforce: 'pre',
        loader: 'eslint-loader',
        options: { fix: true } 
      },
      { 
        // 以下 loader 只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件
        oneOf: [
          { test: /\.css$/, use: [...commonCssLoader] },
          { test: /\.less$/, use: [...commonCssLoader, 'less-loader'] },
          /*正常来讲，一个文件只能被一个 loader 处理。 当一个文件要被多个 loader 处理，那么一定要指定 loader 执行的先后顺序： 先执行 eslint 在执行 babel */
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options:
            {
              presets:[
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: { version: 3 },
                    targets: { chrome: '60', firefox: '50' }
                  }
                ]
              ],
							// 开启 babel 缓存 
							// 第二次构建时，会读取之前的缓存 
              cacheDirectory: true
            }
          },
          {
            test: /\.(jpg|png|gif)/,
            loader: 'url-loader',
            options: { limit: 8 * 1024, name: '[hash:10].[ext]', outputPath: 'imgs', esModule: false } },
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            exclude: /\.(js|css|less|html|jpg|png|gif)/,
            loader: 'file-loader',
            options: { outputPath: 'media' } 
          } 
        ] 
      } 
    ] 
  },
  plugins: [
    // contenthash
    new MiniCssExtractPlugin({ filename: 'css/built.[contenthash:10].css' }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: { collapseWhitespace: true, removeComments: true } 
    }) 
  ],
  mode: 'production',
  devtool: 'source-map' 
};
```

### tree shaking

- 去除在应用程序中没有使用的代码（引用的源代码，第三方的库），使得应用体积更小。
- 前提：使用 ES6 模块化、开启 production 环境。
- 作用：减小体积，请求、加载速度更快
- 注意：可能将未经引用的 CSS 代码也忽略。如在 package.json 中设置 `"sideEffects": false` 则所有代码都无副作用（可 tree shaking）会导致去除 `.css` 文件。应当修改为 `"sideEffects": ["*.css", "*.less"]`

### code split

代码分割主要进行于 `.js` 代码，完成按需加载。

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // 单入口
  // entry: './src/js/index.js',
  entry: { // 多入口：有一个入口, 最终输出就有一个 bundle --> 有几个入口, 输出几个 bundle
    index: './src/js/index.js',
    test: './src/js/test.js' 
  },
  output: {
    // [name]: 取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html', minify: { collapseWhitespace: true, removeComments: true } })
  ],
  mode: 'production'
};
```

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // 单入口 
  // entry: './src/js/index.js',
  entry: {
    index: './src/js/index.js',
    test: './src/js/test.js'
  },
  output: {
    // [name]：取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build') 
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html', minify: { collapseWhitespace: true, removeComments: true } }) ],
  /*1. 可以将 node_modules 中代码单独打包一个 chunk 最终输出 2. 自动分析多入口 chunk 中，有没有公共的文件。如果有会打包成单独一个 chunk */
  optimization: { splitChunks: { chunks: 'all' } },
  mode: 'production'
};
```

import 动态导入语法能将文件单独打包（注：不是按需导入）。

```js
import(/*webpackChunkName: 'test'*/'./test')
.then(({mul,count}) => {
  console.log(mul(2, 5));
})
```

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // 单入口
  entry: './src/js/index.js',
  output: {
    // [name]：取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build') 
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html', minify: { collapseWhitespace: true, removeComments: true } }) ],
  /*1. 可以将 node_modules 中代码单独打包一个 chunk 最终输出 2. 自动分析多入口 chunk 中，有没有公共的文件。如果有会打包成单独一个 chunk */
  optimization: { splitChunks: { chunks: 'all' } },
  mode: 'production' 
};
```

### lazy loading

将代码分割语法放在异步函数中。

```js
// import { mul } from './test';
document.getElementById('btn').onclick = function() {
  // 懒加载 
  // prefetch 预加载: 会在使用之前提前加载 js 文件 —— 等其他资源加载完毕, 浏览器空闲, 加载其他资源
  // 正常加载可以认为并行加载
  import(/*webpackChunkName: 'test', webpackPrefetch: true*/'./test').then({ mul } => {
    console.log(mul(4, 5));
  })
}
```

### pwa

pwa 又称渐进式网络开发应用程序（Progressive Web Apps）—— 离线可访问。通常使用 workbox ，在 webpack 中使用插件 workbox-webpack-plugin 。

```js
// package.json
// 避免 eslint 不认识 window、navigator此类变量
"eslintConfig": {
  "extends": "airbnb-base",
    "env": {
      // 支持浏览器中变量
      "browser": true
    }
}
```

```js
// src/index.js
...
// 注意此处 serviceWorker 中 w 首字母大写
if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceworker.register('/service-worker.js')
    .then(() => {
      console.log('sw注册成功~')
    })
    .catch(() => {
      console.log('sw注册失败~')
    })
  })
}
```

```js
...
plugins: [
  new MiniCssExtractPlugin({ filename: 'css/built.[contenthash:10].css' }),
  new OptimizeCssAssetsWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    minify: { collapseWhitespace: true, removeComments: true }
  }),
  new WorkboxWebpackPlugin.GenerateSW({
    /*1. 帮助 serviceworker 快速启动 2. 删除旧的 serviceworker 生成一个 serviceworker 配置文件~ */
    clientsClaim: true,
    skipWaiting: true 
  })
],...
```

上述的 sw 代码必须运行在服务器上，可通过 serve 快速启动服务器

```zsh
npm i serve -g
serve -s build # 启动服务器
```

### 多进程打包

Js 主线程引擎是单线程的，同一时间只能做一件事。可以通过多进程优化打包速度。

```zsh
# 下载安装包, 通常给 babel-loader 使用
npm install --save-dev thread-loader
```

```js
...{
  test: /\.js$/,
	exclude: /node_modules/,
	use: [
    /*开启多进程打包。 进程启动大概为 600ms，进程通信也有开销。 只有工作消耗时间比较长，才需要多进程打包 */
    {
      loader: 'thread-loader',
      options: {
        workers: 2 // 进程 2 个
			}
    },...
```

多进程也是双刃剑，进程启动大概 600ms ，进程通信也有开销。只有工作时间消耗比较长，才进行多进程打包。

### externals

防止将某些包打包进最终的 bundle.js 中。

```js
mode: 'production',
externals: { 
  // 拒绝 jQuery 被打包进来 
  // 忽略库名 -- npm 包名
  jquery: 'jQuery' 
}
```

### dll

如果对第三方库（jquery、react、vue...）打包成一个文件体积会太大，通过 dll 可以将库拆开打包成不同的 chunk 文件。

```zsh
# 下载插件
npm i add-asset-html-webpack-plugin -D
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js', path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    // 告诉 webpack 哪些库不参与打包，同时使用时的名称也得变~ 
    new webpack.DllReferencePlugin({ manifest: resolve(__dirname, 'dll/manifest.json') }),
    // 将某个文件打包输出去，并在 html 中自动引入该资源 
    new AddAssetHtmlWebpackPlugin({ filepath: resolve(__dirname, 'dll/jquery.js') }) ],
  mode: 'production' 
};
```

相比于 external 彻底不打包，需要 cdn 连接进来，而 dll 需要打包一次，将来不需要重复打包。

## webpack 配置详情 

### entry

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    index: ['./src/index.js', './src/count.js'],
    add: './src/add.js' 
  },
  output: { filename: '[name].js', path: resolve(__dirname, 'build') },
  // 如果传入 template 会以某个文件为模板去创建 html; 直接写会创建空的新 html 文件
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development'
};
```

1. string --> './src/index.js'，单入口打包形成一个 chunk。 输出一个 bundle 文件。此时 chunk 的名称默认是 main。
2. array --> ['./src/index.js', './src/add.js']，多入口所有入口文件最终只会形成一个 chunk，输出出去只有一个 bundle 文件。（一般只用在 HMR 功能中让 html 热更新生效） `react:['react', 'react-dom', 'react-router-dom']`
3. object，多入口有几个入口文件就形成几个 chunk，输出几个 bundle 文件，此时 chunk 的名称是 key 值。
4. 特殊用法：多入口打包成一个 chunk，再分别打包

```js
entry: { // bundle 是由 chunk 组成
  // 最终只会形成一个chunk, 输出出去只有一个bundle文件
  index: ['./src/index.js', './src/count.js'], 
  // 形成一个chunk, 输出一个bundle文件。
  add: './src/add.js'
}
```

### output

```js
output: {
  // 文件名称（指定名称+目录）
  filename: 'js/[name].js',
  // 输出文件目录（将来所有资源输出的公共目录）
  path: resolve(__dirname, 'build'),
  // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
  publicPath: '/',
  chunkFilename: 'js/[name]_chunk.js', // 指定非入口chunk的名称
  library: '[name]', // 打包整个库后向外暴露的变量名
  libraryTarget: 'window' // 变量名添加到哪个上 browser：window
  // libraryTarget: 'global' // node：global
  // libraryTarget: 'commonjs' // conmmonjs模块 exports
},
```

### module

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: { filename: 'js/[name].js', path: resolve(__dirname, 'build') },
  module: {
    rules: [
      // loader 的配置
      { test: /\.css$/,
       // 多个 loader 用 use
       use: ['style-loader', 'css-loader']
      },
      { test: /\.js$/,
       // 排除 node_modules 下的 js 文件
       exclude: /node_modules/,
       // 只检查 src 下的 js 文件
       include: resolve(__dirname, 'src'),
       // 优先执行
       enforce: 'pre',
       // 延后执行 // enforce: 'post',
       // 单个 loader 用 loader
       loader: 'eslint-loader',
       options: {}
      },
      { // 以下配置只会生效一个
        oneOf: []
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development'
};
```

### resolve

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: { filename: 'js/[name].js', path: resolve(__dirname, 'build') },
  module: { rules: [ { test: /\.css$/, use: ['style-loader', 'css-loader'] } ] },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development',
  // 解析模块的规则
  resolve: {
    // 配置解析模块路径别名: 优点简写路径 缺点路径没有提示
    alias: { $css: resolve(__dirname, 'src/css') },
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json', '.jsx', '.css'],
    // 告诉 webpack 解析模块是去找哪个目录 -- 当前目录找不到会去上一层目录
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  }
};
```

### dev server 

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: { filename: 'js/[name].js', path: resolve(__dirname, 'build') },
  module: { rules: [ { test: /\.css$/, use: ['style-loader', 'css-loader'] } ] },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development',
  resolve: {
    alias: { $css: resolve(__dirname, 'src/css') },
    extensions: ['.js', '.json', '.jsx', '.css'],
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  },
  devServer: {
    // 运行代码的目录 contentBase: resolve(__dirname, 'build'),
    // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
    watchContentBase: true,
    watchOptions: {
      // 忽略文件 —— 高效
      ignored: /node_modules/
    },
    // 启动 gzip 压缩
    compress: true,
    // 端口号
    port: 5000,
    // 域名
    host: 'localhost',
    // 自动打开浏览器
    open: true,
    // 开启 HMR 功能
    hot: true,
    // 不要显示启动服务器日志信息
    clientLogLevel: 'none',
    // 除了一些基本启动信息以外，其他内容都不要显示
    quiet: true,
    // 如果出错了，不要全屏提示~
    overlay: false,
    // 服务器代理 --> 解决开发环境跨域问题
    proxy: {
      // 一旦 devServer(5000)服务器接受到 /api/xxx 的请求，就会把请求转发到另外一个服务器 (3000)
      '/api': { target: 'http://localhost:3000',
               // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
               pathRewrite: { '^/api': '' }
              }
    }
  }
};
```

### optimization

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
    chunkFilename: 'js/[name].[contenthash:10]_chunk.js'
  },
  module: { rules: [ { test: /\.css$/, use: ['style-loader', 'css-loader'] } ] },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'production',
  resolve: {
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    extensions: ['.js', '.json', '.jsx', '.css'],
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  },
  optimization: {
    splitChunks: {
      chunks: 'all' // 默认值，可以不写~ ,
      minSize: 30 * 1024, // 分割的 chunk 最小为 30kb
      maxSize: 0, // 最大没有限制
      minChunks: 1, // 要提取的 chunk 最少被引用 1 次
      maxAsyncRequest: 5, // 按需加载并行加载文件最大数量
      maxInitialRequests: 3, // 入口js文件最大并行请求数量
      automaticNameDelimiter: '~' , // 名称连接符
      name: true, // 可以命名规则
      cacheGroups: { // 分割chunk组
      	vendors：{ // node_modules文件被打包到 vendors 组的 chunk 中 --> vendors~xxx.js
      		test: /[||/]node_modules[\\/]/,
      		priority: -10
   			},
    		default: {
      		minChunks: 2, // 被提取的 chunk 至少被引用两次
          priority: -10,
          // 当前打包木块和之前被提取模块是同一个则可以复用
          reuseExistingChunk: true
    		}
    	}
    },
    // 将当前模块的记录其他模块的 hash 单独打包为一个文件 runtime
    // 解决：修改 a 文件导致 b 文件的 contenthash 变化 -- 某一个文件修改导致 hash 变化导致缓存失效
    runtimeChunk: { name: entrypoint => `runtime-${entrypoint.name}` },
    minimizer: [
      // 配置生产环境的压缩方案：js 和 css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动 source-map
        sourceMap: true })
    ]
  }
}; 3.
```

