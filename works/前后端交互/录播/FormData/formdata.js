const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const koaBody = require("koa-body");
const fs = require("fs");

let app = new Koa();
let router = new Router();
app.use(static(__dirname + "/static"));
//上传文件时，必须设置允许文件上传，否则接收不了
app.use(koaBody({
    multipart:true
}));

//上传文件
router.post("/upload",ctx=>{
    //通过前端append()中的name属性即可获取到对应数据或文件
    // console.log(ctx.request.body);//{ username: '张三' }
    // console.log(ctx.request.files.img);
    //通过fs模块对相应文件进行转存即可
    //ctx.request.files.img.path即文件的临时路径，对临时路径中的文件转存到服务器下路径即可
    
    let fileData = fs.readFileSync(ctx.request.files.img.path);
    //文件转存时有可能出现文件夹权限问题，需要手动开启权限
    //判断文件夹不存在，需要先创建文件夹
    if(!fs.existsSync("static/imgs")){
        fs.mkdirSync("static/imgs/");
    }
    fs.writeFileSync("static/imgs/"+ctx.request.files.img.name,fileData);
    
    ctx.body = {
        status:1,
        msg:"文件上传成功"
    };
});

//监控文件上传进度
router.post("/fileUpload",(ctx,next)=>{
    //通过前端append()中的name属性即可获取到对应数据或文件
    //ctx.request.files.imgFile.path即文件的临时路径，对临时路径中的文件转存到服务器下路径即可
    let fileData = fs.readFileSync(ctx.request.files.imgFile.path);
    
    //判断文件夹不存在，需要先创建文件夹
    if(!fs.existsSync("static/imgs")){
        fs.mkdirSync("static/imgs/");
    }
    fs.writeFileSync("static/imgs/"+ctx.request.files.imgFile.name,fileData);
    
    ctx.body = {
        status:1,
        msg:"文件上传成功"
    };
});

app.use(router.routes());
app.listen("8888");