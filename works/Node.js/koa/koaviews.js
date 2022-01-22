const Koa = require("koa");
const Router = require("koa-router");
// 注意是koa-views不是koa-view 
const views = require("koa-views");

let router = new Router();
let app = new Koa();

//koa-views设置文件路径和文件类型(路径views一定要和项目中页面文件路径一致)
app.use(views(__dirname+"/views"),{
    //可以是任何类型的文件：html，也可以是模块文件（pug或nunjucks），nunjucks使用时不使用koa-views模块而是使用koa-nunjucks-2模块
    map:{
        html:"pug"
    }
});

//koa-router中加载文件（必须使用异步才能加载到文件，async await同步写法实现异步功能，await后必须返回的是promise对象，此处await后，cxt.render()底层有返回promise对象）
router.get("/",async (cxt,next)=>{
    // 注意使用pug时，一定要有pug后缀
    await cxt.render("index.pug");
});

app.use(router.routes());
app.listen(8989);