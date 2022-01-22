/**
 * 使用node环境及koa框架建立后台服务器
 */
//注意import是ES6语法，如果想直接在node环境下运行该文件需要安装babel编译，否则会报错。可以使用require()语法即可
// const Koa = require("Koa");
// const Router = require("koa-router");
// const users = require('../data/users.js');

import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
import users from './userData';

//注意此处不能使用const声明
let app = new Koa();
let router = new Router();
console.log(users);

app.use(koaBody({
    multipart:true
}));

router.get("/getUser",ctx=>{
    console.log(users);
    ctx.body = users;

});

app.use(router.routes());
app.listen("8989",function(){
    console.log("8989服务器已开启。。。。。。。");
    
});