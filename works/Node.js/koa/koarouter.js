//中间件koa-router
const Koa = require("koa");
const Router = require("koa-router");

let app = new Koa();
let router = new Router();

//请求方式：get / post /put /delete 等
//直接打印"/"和什么都不输入一样
router.get("/",async (cxt,next)=>{
    cxt.body = "hello world";
});

//传输对象格式数据（cxt.body会将对象数据直接转换为json数据）
//{"name":"lmf","age":23}
router.get("/getData", async (cxt,next)=>{
    //cxt.status设置状态码
    //302临时跳转，会跳转到设置的地址
    cxt.status = 302;
    // 设置头部
    cxt.set("location","http://www.baidu.com");
    // koa会直接将对象转为json
    cxt.body = {
        name:'lmf',
        age:23
    };
});

// 通过此句将app和router进行关联
app.use(router.routes());
app.listen("5000");