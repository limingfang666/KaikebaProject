const Koa = require("koa");
const App = require("koa-router");
const static = require("koa-static");
const body = require("koa-body");

let app = new Koa();
let router = new App();

app.use(static(__dirname+"/static"));

router.get("/",(ctx,next)=>{
    ctx.body = "页面成功";
});

app.use(router.routes());
app.listen("8989");