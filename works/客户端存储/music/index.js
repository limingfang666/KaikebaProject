const Koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");
const static = require("koa-static");
// form表单提交是post请求，必须使用koa-bodyparser获取数据
const bodyparser = require("koa-bodyparser");
// md5加密登录信息
const md5 = require("md5");

// node.js通过require后，会自动将json文件中的数据转换为对象
const musicData = require("./data/music.json");

const app = new Koa();
const route = new Router();

// 注意引入的模块都需要通过app.use()将模块和router进行关联
app.use(bodyparser());

// 注意模板引擎是在views中设置
app.use(views(__dirname+"/views"),{
    map:{
        html:"pug"
    }
});
app.use(static(__dirname+"/static"));

route.get("/login",async ctx=>{
    // 每次链接到登录页面时，先检验是否有cookie登录状态，有则直接跳转至list页面
    let loginState = md5("zs"+"8888");
    if(ctx.cookies.get("isLogin") === loginState){
        ctx.redirect("/list");
    }else{
        await ctx.render("login.pug");
    }
});

// 登录页面点击登录后，校验cookie信息，成功自动登录，否则重新登录
route.post("/checkUser",async ctx=>{
    // 模拟数据库写死数据，当用户名为zs,密码为8888时登录成功，直接跳转到list页面
    if(ctx.request.body.username === "zs" && ctx.request.body.pwd === "8888"){
        // 登录信息校验成功后，判断如果点击了memberMe则将登录信息存入到cookie中
        if(ctx.request.body.memberMe === "on"){
            // 通过md5对用户名密码进行加密存到cookie中
            let loginState = md5(ctx.request.body.username+ctx.request.body.pwd);
            ctx.cookies.set("isLogin",loginState,{maxAge:36000*1000*24*7});
        }
        ctx.redirect("/list");

    // 登录失败跳转到错误页面
    }else{
        ctx.redirect("/error");
    }
});

// list歌曲列表页面
route.get("/list",async ctx=>{
    // 渲染list页面，并且推送歌曲数据
    await ctx.render("list.pug",{
        musicData
    });
});

// 详细页
route.get("/detail",async ctx=>{
    await ctx.render("detail.pug");
});

// error错误页面
route.get("/error",async ctx=>{
    await ctx.render("error.pug");
});

app.use(route.routes());
app.listen("8989");
