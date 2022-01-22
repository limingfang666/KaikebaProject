//注意node.js使用的是commonjs模块化规范。导出使用module.exports
module.exports = function middleWare3(ctx,next){
    console.log("three start........");
    ctx.body = "middleWare3 three context"
    console.log("three end ..........");
}