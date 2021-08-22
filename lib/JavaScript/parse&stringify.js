// JSON.parse(str)=>将字符串解析为JSON对象
let str = '{"name":"zairesinatra","age":23}'
let zs = JSON.parse(str)
console.log(zs);
console.log(typeof zs);
// JSON.stringify()=>将JSON对象转化为字符串
let zy = JSON.stringify(zs)
console.log(zy);
console.log(typeof zy);