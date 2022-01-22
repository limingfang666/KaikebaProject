//将爬虫得到的数据，渲染到页面，需要进行页面路由
const http = require("http");
const fs = require("fs");
const cheerio = require("cheerio");
const url = require("url");//处理地址
const path = require("path");//处理地址后缀名
const mime = require("./mime.json");//处理后缀名文件
const dataJson = require("./data.json");//新闻数据

let server = http.createServer((req, res) => {
    //地址栏加上页码后，会有queryString ：pathname:/index ; search: '?pageNum=2';query: 'pageNum=2'
    let pathname = url.parse(req.url).pathname;
    
    if (pathname === "/" || pathname === "/index") {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        //方法一：读取到index文件，获取文件标签，设置文件标签内容
        let index = fs.readFileSync("index.html");
        let $ = cheerio.load(index);
        //分页实现：总页数=总数据条数/每页多少条
        //当点击某页时，需要获取到传过来的页码（通过path可以获取到queryString参数）
        //url.parse(req.url, true).query 当没有参数时[Object: null prototype] {}，有参数时：[Object: null prototype] { pageNum: '2' }
        let pageNum = url.parse(req.url, true).query.pageNum || 1;//第几页（默认第一页）


        let pageSize = 5;//每页多少条
        let pageTotal = Math.ceil(dataJson.length/pageSize);//总共多少页
        //通过数组slice方法进行分页（如果是数据库，需要调数据库）0-4 5-10 11-14 =>(pageNum-1)*pageSize , pageNum*pageSize
        let pageData = dataJson.slice((pageNum-1)*pageSize,pageNum*pageSize);

        //读取到json文件新闻数据
        //获取ul 将HTML设置进去
        let ulHtml = '';
        pageData.forEach(item => {
            ulHtml += `
                <li class="news">
                    <a href="javascript:;">
                        <img src="./img/img.png" alt="">
                    </a>
                    <div>
                        <h3>
                            <a href="/detail?id=${item.id}">${item.title}</a>
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

        //渲染分页按钮
        //cheerio没有事件，所以上下页切换不能绑定点击事件，只能通过操作pageNum实现,注意需要将pageNum转为Number类型
        let p = parseInt(pageNum);
        let pagerHtml = `<a href="/index?pageNum=${Math.max(1,p-1)}" class="prev">⌜</a>`;
        for(let i=1;i<=pageTotal;i++){
            //点击每页还是跳转到本页面，这是页码变化
            pagerHtml += `<a href="/index?pageNum=${i}">${i}</a>`;
        }
        pagerHtml += `<a href="/index?pageNum=${Math.min(pageTotal,p+1)}" class="next">⌝</a>`;
        $(".pagination").html(pagerHtml);

        //点击事件:设置数组中某个元素的样式，.eq(pageNum)
        $(".pagination a").each((index,item)=>{
            if(pageNum == index){
                $(".pagination a").eq(pageNum).addClass('active')
            }
        });

        res.end($.html());

    }else if(pathname === "/detail"){
        //跳转到详情页
        //使用id重新查找对应数据
        let id = url.parse(req.url, true).query.id;
        let detailData = dataJson.find(item=>id==item.id);
        let detail = fs.readFileSync("detail.html");
        let $ = cheerio.load(detail);
        let detailHtml = `
            <h1 class="title">${detailData.title}</h1>
            <div class="article-info"> 类型：纵火 时间：${detailData.time}</div>
            <p class="content">
                ${detailData.title}
            </p>
        `;

        $(".text").html(detailHtml);  
        //一定要使用res.end()方式时响应结束
        res.end($.html());      

    } else if (pathname !== "/favicon.ico") {
        let extname = path.extname(req.url);
        res.writeHead(200, { 'Content-Type': mime[extname] });
        let static = fs.createReadStream("." + req.url);
        static.pipe(res);
    }
});
server.listen(3000);

