const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const koaBody = require("koa-body");

let app = new Koa();
let router = new Router();
app.use(koaBody());
app.use(static("static"));

router.get("/",(ctx,next)=>{
    ctx.body = "请求成功";
});
router.get("/getInfo",(ctx,next)=>{
    // 推送变量（使用script直接引入问题：直接推送变量会造成变量污染）
    let a = 20;
    // ctx.body = "var a = 20";
    // ctx.body = "getInfo请求成功";

    // 服务端通过ctx.query.cb接收到回调函数
    // let cb = ctx.query.cb;
    // 再通过ctx.body返回给客户端执行(注意a的取值方式)
    // ctx.body = `${cb}(${a})`;

    // 注意返回数据必须是字符串，如果返回数据是对象，需要通过JSON.stringfy()转为字符串后才能进行传递
    let obj = {
        a:20,
        b:30
    }
    let cb = ctx.query.callback;
    ctx.body = `${cb}(${JSON.stringify(obj)})`;
});

app.use(router.routes());
app.listen("4000");
 