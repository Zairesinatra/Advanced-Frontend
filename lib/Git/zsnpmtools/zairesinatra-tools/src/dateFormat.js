//定义初始化时间的函数
function dateFormat(dateStr){
    const dt = new Date(dateStr)
    const y = dt.getFullYear()
    // 注意padZero是外部
    const m = padZero(dt.getMonth()+1)
    const d = padZero(dt.getDay())
    const hh = padZero(dt.getHours())
    const mm = padZero(dt.getMinutes())
    const ss = padZero(dt.getSeconds())
    // 注意此处是`不是‘
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}
//定义一个补零函数
function padZero(n){
    return n>9?n:'0'+n
}

module.exports = {
    dateFormat
}