const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const koaBody = require("koa-body");
const userData = require("./data/user.json");
//此案例没有使用模板引擎，页面路由，只有获取数据的路由地址

let app = new Koa();
let router = new Router();

app.use(static(__dirname + "/static"));
//前面页面直接放到static里时，只能通过login.html访问，不能通过/直接访问
router.get("/checkUser", (ctx, next) => {
    // 注意接收queryString参数通过cxt.query获得；如果是post传参需引入koa-bodyparser ，然后通过ctx.request.body接收
    let username = userData.find(item=>item.username === ctx.query.username);
    console.log(ctx.query);
    if(username){
        // node.js会自动将对象转为json传给前端，所以不用再进行转换
        ctx.body = {
            status:1,
            msg:"用户名正确"
        };
    }else{
        ctx.body = {
            status:0,
            msg:"用户名错误"
        };
    }
});

//get请求(/get/id传参方式)
router.get("getInfo","/getInfo/:id",ctx=>{
    console.log(ctx.params);//{ id: '1' }
    ctx.body = {
        status:1,
        msg:"请求成功"
    };
});

app.use(koaBody());
//post请求
router.post("/getPostInfo",ctx=>{
    console.log(ctx.request.body);//{ username: 'zs', age: '20' }
    
    ctx.body = {
        status:1,
        msg:"请求成功"
    };
});

//获取XML数据
router.get("/getXMLInfo",ctx=>{
    // ctx.set("content-type","text/xml");
    //注意这里反引号和xml内容不能换行
    ctx.body = `<?xml version='1.0' encoding='utf-8' ?>
        <books>
            <nodejs>
                <name>nodeJS实战</name>
                <price>52.0元</price>
            </nodejs>
            <react>
                <name>react进阶</name>
                <price>56.0元</price>
            </react>
        </books>`;
});

app.use(router.routes());
app.listen("9090");