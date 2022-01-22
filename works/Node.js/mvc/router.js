//路由分发：新闻列表和后台管理分开路由，newsRouter和adminRouter有news.js和admin.js中module.exports导出所得
let newsRouter = require("./router/news.js");
let adminRouter = require("./router/admin.js");

// 用于设置 '/'直接重定向到"/admin/admin")
let Router = require("koa-router");
let router = new Router();

//导出路由
/* 
在app.js中不能使用router.routes()，因为真正的router是newsRouter和adminRouter，app.js中没有，只有router.js中才有
所以可以在app.js中通过routes(app);传递参数app到router.js中，通过newsRouter.routes()调用路由routes()方法，即app.use(newsRouter.routes())
注意router.js导出时导出一个函数module.exports = (app)=>{app.use(newsRouter.routes())}，在app.js中就可以调用这个函数，并传入参数app，routes(app);
*/
module.exports = (app)=>{
    // 定义 /
    router.get("/",ctx=> {ctx.redirect("/admin/admin")});
    app.use(router.routes());

    app.use(newsRouter.routes());
    app.use(adminRouter.routes());
};