//仅指定文件夹未指定具体js文件也生效
const zaire = require('./zaire-tools/index')
// 格式化时间的功能
const dtStr = zaire.dateFormat(new Date())
console.log(dtStr)
console.log('----------')
const htmlStr = '<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>'
const str = zaire.htmlescape(htmlStr)
console.log(str)
console.log('----------')
const str2 = zaire.htmlunescape(str)
console.log(str2)