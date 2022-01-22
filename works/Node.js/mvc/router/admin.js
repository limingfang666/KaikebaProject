//后台管理路由
// node中引入json后会自动处理成对象
let newsData = require("../data/data.json");
let adminController = require("../controller/admin.js");
const Router = require("koa-router");
let adminRouter = new Router({
    prefix:"/admin"
});

adminRouter.get("/admin",adminController.showAdmin);
adminRouter.get("/addNews",adminController.addNews);
// 因为添加新闻是通过post提交，所以必须使用post请求方式,而添加成功后需要再次跳转到addNewsInfo页面,所以需要使用all請求方式
adminRouter.post("/addNewsInfo",adminController.addNewsInfo);
// adminRouter.all("/addNewsInfo",adminController.addNewsInfo);
adminRouter.get("/newsList",adminController.newsList);
// 删除新闻
adminRouter.get("/delete",adminController.deleteNews);
module.exports = adminRouter;