//将爬虫得到的数据，渲染到页面，需要进行页面路由
const http = require("http");
const fs = require("fs");
const cheerio = require("cheerio");
const url = require("url");//处理地址
const path = require("path");//处理地址后缀名
const mime = require("./mime.json");//处理后缀名文件
const dataJson = require("./data.json");//新闻数据

let server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    if (req.url === "/" || req.url === "/index") {
        //方法一：读取到index文件，获取文件标签，设置文件标签内容
        let index = fs.readFileSync("index.html");
        let $ = cheerio.load(index);
        //读取到json文件新闻数据
        //获取ul 将HTML设置进去
        let ulHtml = '';
        dataJson.forEach(item => {
            ulHtml += `
                <li class="news">
                    <a href="javascript:;">
                        <img src="./img/img.png" alt="">
                    </a>
                    <div>
                        <h3>
                            <a href="javascript:;">${item.title}</a>
                        </h3>
                        <div class="info">
                            <span class="tips"><span>纵火</span><span${item.publisher}</span><span>逮捕</span></span>
                            <!-- <span class="line"></span> -->
                            <span class="time">| &nbsp;&nbsp;${item.time}</span>
                        </div>
                    </div>
                </li>
             `;
        });
        $(".news-list").html(ulHtml);
        res.end($.html());

        // //方法二：如果要使用createReadStream()流方式读取文件，就必须使用on("data")和on("end")监控页面读取完后再操作DOM
        // let index = fs.createReadStream("index.html");
        // let oldIndex = '';
        // index.on("data", chunk => {
        //     oldIndex += chunk;
        // });
        // index.on('end', () => {
        //     console.log(oldIndex);
        //     let $ = cheerio.load(oldIndex);
        //     let ulHtml = '';
        //     dataJson.forEach(item => {
        //         ulHtml += `
        //         <li class="news">
        //             <a href="javascript:;">
        //                 <img src="./img/img.png" alt="">
        //             </a>
        //             <div>
        //                 <h3>
        //                     <a href="javascript:;">${item.title}</a>
        //                 </h3>
        //                 <div class="info">
        //                     <span class="tips"><span>纵火</span><span${item.publisher}</span><span>逮捕</span></span>
        //                     <!-- <span class="line"></span> -->
        //                     <span class="time">| &nbsp;&nbsp;${item.time}</span>
        //                 </div>
        //             </div>
        //         </li>
        //      `;
        //     });
        //     $(".news-list").html(ulHtml);
        //     res.end($.html());
        // });

    } else if (req.url !== "/favicon.ico") {
        let extname = path.extname(req.url);
        res.writeHead(200, { 'Content-Type': mime[extname] });
        let static = fs.createReadStream("." + req.url);
        static.pipe(res);
    }

});
server.listen(4000);

