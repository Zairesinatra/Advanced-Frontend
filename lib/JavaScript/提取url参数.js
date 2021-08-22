// 编写一个函数把 URL 参数解析为一个对象
// 参数即问号之后的数据
function parseQueryParams (url) {
    let obj = {};
    // 问号分隔
    let urls = url.split('?');
    // & 分隔
    let arr = urls[1].split('&');
    // 循环放入
    for(let i = 0; i<arr.length; i++){
        // console.log(arr[i].split('='));
        // zs[0]就是属性名、zs[1]就是属性值
        let zs = arr[i].split('=')
        // console.log(zs);
        obj[zs[0]] = zs[1];
    }
    return obj
}

console.log(parseQueryParams("www.google.com.hk/search?q=baidu&oq=baidu&aqs=chrome..69i57j0l9.1540j0j15&sourceid=chrome&ie=UTF-8)"))