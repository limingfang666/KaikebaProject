const Koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");//注意是koa-views
const static = require("koa-static");
const url = require("url");
//注意要使用pug，必须导入pug
const pug = require("pug");

//cheerio实现类JQuery功能
const cheerio = require("cheerio");

let data = require("./data/data.json");

let app = new Koa();
let router = new Router();

//可以再views时设置，对应的页面后缀(注意此处设置模板也是views方法的参数)
app.use(views(__dirname + "/views", {
    map: {
        html: 'pug'
    }
}));
// 使用static后，在页面再引入静态页面，css,js,img等时路劲就不需要再写到static级
app.use(static(__dirname + "/static/css"));
app.use(static(__dirname + "/static/img"));

//新闻列表显示
//注意使用cxt.render时，必须使用async await异步加载页面
router.get("/news/index", async (cxt, next) => {
    //分页
    let pageNum = url.parse(cxt.url,true).query.p || 1;
    //通过pageNum进行分页
    let pageSize = 5;
    
    let pageTotal = Math.ceil(data.length / pageSize);
    // 0-4  5-10  ((pageNum-1)*pageSize,pageNum*pageSize)
    let curData = data.slice((pageNum-1)*pageSize,pageNum*pageSize);

    //render是方法，不是属性,且文件必须写后缀
    await cxt.render("viewlist.pug", {
        curData,
        pageTotal,
        pageNum
    });
});

//新闻详细也显示
router.get("/news/detail", async (cxt, next) => {
    //分页
    let id = url.parse(cxt.url,true).query.id || 1;

    let detailData = data.find(item=>id == item.id);
    //render是方法，不是属性,且文件必须写后缀
    await cxt.render("detail.pug", {
        detailData
    });
});

app.use(router.routes());

app.listen("8989");