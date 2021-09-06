//这是包的入口文件
const date = require('./src/dateFormat')
const escape = require('./src/htmlEscape')

// 向外暴露需要的成员
module.exports = {
    // ...是ES6新特性-展开运算符
    ...date,
    ...escape
}

