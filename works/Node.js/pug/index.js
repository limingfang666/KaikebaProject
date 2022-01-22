const App = require("koa");
const Router = require("koa-router");
const views = require("koa-views");

const app = new App();
const router = new Router();
// 注意views的写法和用法
app.use(views(__dirname+"/views"),{
    map:{
        html:"pug"
    }
});

router.get("/index",async cxt=>{
    // cxt.body = "hello";
    await cxt.render("index.pug",{
        // 将数据推送给pug
        users:[{name:"zs",age:25},{name:"ls",age:26},{name:"ww",age:28}]
    });
});

app.use(router.routes());
app.listen("8989");