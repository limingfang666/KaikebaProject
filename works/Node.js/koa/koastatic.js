//koa-static 加载静态文件
const Koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");
const static = require("koa-static");

let router = new Router();
let app = new Koa();

//koa-view设置设置文件路径和文件类型
app.use(views(__dirname+"/views"),{
    map:{
        html:'pug'
    }
});

//koa-static加载静态文件(注意static不需要再写)
app.use(static(__dirname+"/static"));

//koa-router中加载文件（必须使用异步才能加载到文件）
router.get("/",async (cxt,next)=>{
    await cxt.render("index.pug");
});

app.use(router.routes());
app.listen("7000");