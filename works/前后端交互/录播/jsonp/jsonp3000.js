const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const koaBody = require("koa-body");

let app = new Koa();
let router = new Router();
app.use(koaBody());
app.use(static(__dirname + "/static"));

router.get("/",(ctx,next)=>{
    ctx.body = "hello";
    
})
router.get("/getInfo",(ctx,next)=>{
    ctx.body = "getInfo请求成功";
});

app.use(router.routes());
app.listen("3000");
 