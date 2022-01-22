//新闻列表路由
//在Controller层进行路由调用控制
const indexController = require("../controller/news.js");
//获取koa-router后，得到的相当于一个Router类，实例化Router类并传入参数
const Router = require("koa-router");
let newsRouter = new Router({
    // 配置路由前缀，页面使用.../news/index即可路由到新闻列表页面
    prefix:"/news"
});
// 路由不同路径
newsRouter.get("/index",indexController.showIndex);
newsRouter.get("/detail",indexController.showDetail);
module.exports = newsRouter;