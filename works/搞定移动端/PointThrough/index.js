const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");

let app = new Koa();
let router = new Router();
app.use(static(__dirname+"/static"));

app.use(router.routes());
app.listen("8989");
