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

webpack 自身只理解 JavaScript，故需让 webpack 能够去处理那些非 `.js` 文件。

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

- 生产环境优化

优化打包构建速度、优化代码运行性能（用户留存度）

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

