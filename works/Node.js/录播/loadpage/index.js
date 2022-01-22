//使用fs模块加载页面
const fs = require("fs");
const http = require("http");
const url = require("url");
const path = require("path");
//引入静态文件后缀json文件
const mime = require("./mime.json");

let server = http.createServer((req, res) => {
    //如果不设置HTML请求头会乱码(注意参数的写法不能错)
    // res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        if (req.url === "/index") {
            // res.write("这是主页");
            // //方法一：通过fs模块读取页面，再进行写入内容
            // let index = fs.readFileSync("index.html");
            // res.write(index);
            // // 监控响应结束，不写的话会一直 请求
            // res.end();

            //方法二：通过fs模块流 Stream读取文件:在文件内容很大时效率高，不会内存溢出
            let resIndex = fs.createReadStream("index.html");
            //pipe管道，将读到的数据响应到页面
            resIndex.pipe(res);

        } else if (req.url === "/product") {
            // res.write("这是产品页");
            // //通过fs模块读取页面，再进行写入内容
            // let product = fs.readFileSync("product.html");
            // res.write(product);
            // res.end();

            //注意createReadStream路由只需要读取并响应，不需要写入
            let product = fs.createReadStream("product.html");
            product.pipe(res);

        } else {
            //其他静态文件(文件的后缀不统一)，使用mime.json文件处理
            //通过path模块获取到文件后缀名 /.css => .css
            let extname = path.extname(req.url);
            //注意这里必须设置响应头，否则没有响应头页面不会显示(注意拼接形式)
            res.writeHead(200, { 'Content-Type': mime[extname]});
            //再读取到静态文件，并响应到页面
            let static = fs.createReadStream("."+req.url);
            static.pipe(res);
        }

});
server.listen("8000");