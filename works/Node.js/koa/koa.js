//node.js的框架koa
const Koa = require("koa");
const app = new Koa();

const middleWare3 = require("./m3");

//中间件
let middleWare1 = (cxt, next) => {
    console.log("one start......");

    cxt.body = "hello world11111";
    //当前表示中间件转交给下一个中间件，有next()函数才会执行下一个中间件。如此处next()调用后才会执行中间件，不调用则不会执行
    next();
    console.log("one end......");
}


let middleWare2 = (cxt, next) => {
    console.log("two start......");
    cxt.body = "hello world22222";
    next();
    console.log("two end......");
}

app.use(middleWare1);
app.use(middleWare2);
// 中间件也可以是引入方式
app.use(middleWare3);
/*
    中间件执行结果：
    one start......
    two start......
    three start........
    three end ..........
    two end......
    one end......
 */

//  错误处理
 app.on("error",(err)=>{
     console.log(err);
 });
app.listen(4000);