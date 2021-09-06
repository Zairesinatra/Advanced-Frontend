//定义转译HTML字符的函数
function htmlescape(html){
    return html.replace(/<|>|"|&/g,(match)=>{
        switch (match){
            case'<':
                return '&lt;'
            case'>':
                return'&gt;'
            case'"':
                return '&quot;'
            case'&':
                return'&amp;'

        }
    })
}

// 定义还原HTML字符的函数
function htmlunescape(str){
    return str.replace(/&lt;|&gt;|&quot;|&quot;/g,(match)=>{
        switch (match){
            case'&lt;':
                return '<'
            case'&gt;':
                return'>'
            case'&quot;':
                return '"'
            case'&quot;':
                return'&'

        }
    })
}

module.exports={
    htmlescape,
    htmlunescape
}