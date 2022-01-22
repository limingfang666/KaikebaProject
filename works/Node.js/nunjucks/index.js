const App = require("koa");
const Router = require("koa-router");
// 注意nunjucks不再使用koa-views引入静态文件，而是使用koa-nunjucks-2
const nunjucks = require("koa-nunjucks-2");

const app = new App();
const router = new Router();
// 注意nunjucks代替views的写法及配置
app.use(nunjucks({
    ext:".njk", //nunjucks推荐使用.njk后缀，但是也可以使用html
    path:__dirname+"/views", //页面路径
    nunjucksConfig:{
        trimBlocks:true //用于防止页面xss攻击
    }
}));

router.get("/index",async cxt=>{
    // cxt.body = "hello";
    // 注意：nunjucks和pug不一样，此处render方法中，因为设置了ext后缀，所以不需要再写文件后缀
    await cxt.render("index",{
        num:4,
        data:"这是数据",
        // 将数据推送给pug
        users:[{name:"zs",age:25},{name:"ls",age:26},{name:"ww",age:28}],
        str:"hello world!"
    });
});

app.use(router.routes());
app.listen("8989");