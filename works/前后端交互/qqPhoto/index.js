const Koa = require("koa");
const Router = require("koa-router");
// 使用nunjucks模板引擎
const nunjucks = require("koa-nunjucks-2");
const static = require("koa-static");
const koaBody = require("koa-body");
const fs = require("fs");

const app = new Koa();
const route = new Router();

app.use(koaBody({
    // 上传图片需设置multipart:true
    multipart: true
}));

app.use(nunjucks({
    ext: "html",
    path: __dirname + "/views",
    nunjucksConfig: {
        trimBlocks: true
    }
}));

app.use(static(__dirname + "/static"));

route.get("/", async ctx => {
    await ctx.redirect("/login");
});
route.get("/login", async ctx => {
    await ctx.render("login");
});
// 校验用户名和密码
route.post("/checkUser", async ctx => {
    // 判断如果登录用户名或密码错误，返回错误信息
    if (ctx.request.body.username === "lmf" && ctx.request.body.pwd === "000") {
        await ctx.redirect("/photo");
        return;
    }
    if (ctx.request.body.username === "") {
        ctx.body = {
            msg: "用户名不能为空",
            code: 0
        }
        return;
    } else if (ctx.request.body.username !== "lmf") {
        ctx.body = {
            msg: "用户名错误",
            code: 1
        }
        return;
    } else if (ctx.request.body.pwd === "") {
        ctx.body = {
            msg: "密码不能为空",
            code: 2
        }
        return;
    } else if (ctx.request.body.pwd !== "888") {
        ctx.body = {
            msg: "密码错误",
            code: 3
        }
        return;
    }
});
// 显示图片页面
route.get("/photo", async ctx => {
    await ctx.render("photo");
});

// 上传图片
// route.get("/upload1", (ctx, next) =>  {
//     ctx.body = {
//         msg: "444",
//         code: 3
//     }
// });

route.post("/upload", ctx => {
    let file = ctx.request.files.imgFile;
    if (file) {
        console.log(file);
        
        // 将图片转存到static/img下
        let ws = fs.createWriteStream("static/img/" + file.name);
        ctx.body = {
            status:1,
            msg:"文件上传成功"
        };
        // //读取文件发生错误事件
        // ws.on('error', (err) => {
        //     console.log('图片上传出错:', err);
        //     ctx.body = {
        //         msg: "文件上传出错",
        //         code: 1
        //     }
        // });
        // //文件写入完成事件（写入完成后需要将所有的上传图片显示在当前页）
        // ws.on('finish', () => {
        //     ctx.body = {
        //         msg: "文件上传成功",
        //         code: 0
        //     }
        // });
        // ws.end() //结束，如果调用end,会强制将内存中的内容全部写入，然后关闭文件
    } else {
        ctx.body = {
            msg: "文件加载出错",
            code: 2
        }
    }
});

app.use(route.routes());
app.listen("8989");