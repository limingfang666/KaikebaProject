const http = require("http");
//通过get方法获取爬虫爬到的是整个页面,需要使用cheerio模块进行处理（类似JQuery）
const cheerio = require("cheerio");//注意需要使用 npm i cheerio -S 按照cheerio模块到运行环境

const fs = require("fs");

let newsData = '';
//http的get 方法会并自动调用 req.end()
http.get("http://news.ifeng.com/", (res) => {
    res.on("data", chunk => {
        newsData += chunk;
    });
    res.on("end", () => {

        //数据必须在end里面处理，否则获取不到数据
         //使用cheerio加载整个数据
        let $ = cheerio.load(newsData);

        //用于存json数据
        let data = [];
        
        //新闻标题
        let titles = $(".news-stream-newsStream-news-item-infor h2 a");
        titles.each((index,ele)=>{
            data.push({
                "id":index+1,
                "title":ele.attribs['title']
            });
        });
        
        //发布者
        let publisher = $(".news-stream-newsStream-news-item-infor .clearfix span");
        publisher.each((index,ele)=>{
            data[index].publisher = ele.children[0]['data'];
        });
        
        //发布时间
        let time = $(".news-stream-newsStream-news-item-infor .clearfix time");
        time.each((index,ele)=>{
            data[index].time = ele.children[0]['data'];
        });

        //将得到的数据写入到json文件中
        let dataJson = fs.createWriteStream("data.json");
        //注意需要使用write()，并且将数据转成字符串格式才能进行写出
        dataJson.write(JSON.stringify(data));
        res.pipe(dataJson);
    });


});