//后台管理：调用Model层
let adminService = require("../service/admin.js");
const url = require("url");
const path = require("path");
module.exports = {
    async showAdmin(ctx) {
        await ctx.render("admin/admin.pug");
    },
    async addNews(ctx) {
        // 直接跳转到添加页面
        await ctx.render("admin/addNews.pug");
    },

    // res因为函数adminService.addNewsInfo()返回的是Promise对象，所以通过该async await即可获取结果
    async addNewsInfo(ctx) {
        //通过koa-bodyparser的ctx.request.body获取到post传过来的所有参数(app.js中app.use(bodyParser()))
        //将获取到的数据进行持久化（注意需要添加数据成功后再跳转）
        // let newsInfo = ctx.request.body;//相当于koa-body
        // console.log(ctx.request.files);//即File对象包括path文件路径，name文件名，type文件格式等属性
        // 添加数据（将获取到的参数ctx.request传入到model层）
        let res = await adminService.addNewsInfo(ctx.request);
        // 添加成功后渲染添加成功模板
        await ctx.render("admin/message.pug", {
            res
        });
    }
    ,
    async newsList(ctx) {
        //需要进行分页
        let pageNum = url.parse(ctx.url, true).query.p || 1;
        let pageSize = 4;

        let adminData = adminService.getSliceData(pageNum, pageSize);
        let pageTotal = Math.ceil(adminService.adminData.length / pageSize);

        // render()方法真正执行实在app.listen()时，而调用app.use(async func())方法时，user()方法里面的中间件并没有立即执行，而是把所有的中间件加入到队列中（数组），参考https://www.jianshu.com/p/2a11705b5de2，最终在app.listen()时通过 koa-compose模块执行队列
        await ctx.render("admin/newsList.pug", {
            adminData,
            pageNum,
            pageTotal
        });
    },
    // 删除新闻
    async deleteNews(ctx) {
        //通过url处理ctx后得到id
        let id = url.parse(ctx.url,true).query.id;  
        let pageNum = url.parse(ctx.url, true).query.p || 1;
        
        let pageSize = 4;
        // 分页后需要显示删除后的数据，所以需要等待删除完成后，再渲染页面。因为删除后需要重新分页，所以需要重新得到pageTotal和pageNum
        let res = await adminService.deleteNews(id,pageNum, pageSize);
        let adminData = res.pagerData;
        let pageTotal = res.pageTotal;
        pageNum = res.pageNum;
        
        await ctx.render("admin/newsList.pug", {
            adminData,
            pageNum,
            pageTotal
        });
    }

}