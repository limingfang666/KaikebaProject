class MyAjax {
    constructor(options) {
        // 将传入的配置和默认配置进行合并
        this.options = this.ajax(options);
    }
    ajax(options) {
        let xhr = new XMLHttpRequest();
        // 注意assign()方法是将后面的输入配置合并前面的默认配合(注意需要opts接收后才是合并后的对象)
        let opts = Object.assign({
            // 因为get/post请求不同带参方式不同，所以需要拼接url
            url: '',
            method: 'get',
            data: '',
            headers:{
                "content-type":"application/x-www-form-urlencoded",
            },
            success(res) {}
        }, options);
        // 判断get请求时拼接url
        if (opts.method === "get") {
            opts.url = olUrl(opts);
        }
        // 发送请求
        xhr.open(opts.method, opts.url, true);

        // 循环设置头部(可能会有不同的头部信息，不只是content-type)，注意设置头部必须在open()方法之后
        for(let header in opts.headers){
            xhr.setRequestHeader(header, opts.headers[header]);
        }
        // 根据不同头部信息，发送请求不同
        let sendData;
        
        switch(opts.headers['content-type']){
            // 如果请求头content-type为application/x-www-form-urlencoded直接拼接参数
            case 'application/x-www-form-urlencoded':
                sendData = olUrl(opts);
                break;
            case 'application/json':
                sendData = JSON.stringify(opts.data);
                break;
        }

        // 获取返回数据(需要设置到options中的success，在调用时才能使用success()获得返回数据)
        xhr.onload = function(){
            // 用户名密码都正确时会返回页面
            if(xhr.responseText.startsWith("<!DOCTYPE html>")){
                opts.success({
                    msg:"校验成功",
                    code:4
                });
            }else{
                opts.success(JSON.parse(xhr.responseText));//返回数据全部转为对象
            }
        }

        // 判断如果是post请求需要将请求数据一并发送
        if (opts.method === "get") {
            xhr.send();
        } else {
            xhr.send(sendData);
        }

        // 拼接url(只有get请求需要拼接)
        function olUrl(options) {
            let keys = Object.keys(options.data);
            let values = Object.values(options.data);
            let queryString = keys.map((key, index) => {
                return key + '=' + values[index];
            }).join("&");
            return options.url + "?" + queryString;
        }
    }
}
// 通过定义函数new MyAjax(options)，返回MyAjax对象
function ajax(options) {
    return new MyAjax(options);
}
export default ajax;