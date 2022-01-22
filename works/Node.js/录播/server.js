//引入http模块
let http = require("http");
//创建一个服务器
let serve = http.createServer((req, res) => {
    console.log("hello");
    res.end("hello world111");
})

//设置端口号
serve.listen(3000);