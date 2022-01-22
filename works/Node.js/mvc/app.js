//项目单入口文件
const Koa = require("koa");
const views = require("koa-views");
const static = require("koa-static");
//一定要引入pug才能使用pug模板文件
const pug = require("pug");
//接收post参数，需要使用koa-bodyparser模块
const bodyParser = require("koa-bodyparser"); 
const koaBody = require("koa-body"); 

let app = new Koa();

// 引入路由模块
let routes = require('./router.js');

//此处页面只到views层级，在路由处理后，controller中再写具体层级
app.use(views(__dirname+"/views",{
    map:{
        html:"pug"
    }
})); 

// 注意使用koa-static以后，不用再写static这一层路径，只需要些static下的具体文件夹即可
app.use(static(__dirname+"/static/news"));
app.use(static(__dirname+"/static/admin"));

//使用koa-bodyparser
app.use(bodyParser());
// 因为涉及到文件上传，所以必须设置koa-body中的multipart:true
app.use(koaBody({
    multipart:true
}));
//获取router.js中的路由
routes(app);
app.listen("9090");
