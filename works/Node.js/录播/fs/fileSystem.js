//增删改查
//文件操作  目录操作
let fs = require("fs");

// 异步写入文件
// fs.writeFile("1.txt","456456111sdfasdf232333111111111111",{flag:'a'},function(err){
//     //如果有错误，就返回错误
//     if(err){
//         return console.log(err);
//     }
//     //写入成功
//     console.log("写入成功");
// });

//同步写入文件
// fs.writeFileSync("2.txt","sdfa",{flags:'a'});

//异步删除文件
// fs.unlink("2.txt",function(err){
//     //删除失败
//     if(err){
//         return console.log(err);
//     }
//     console.log("删除成功");
// });

// //同步删除文件
// fs.unlinkSync("1.txt");

//异步修改文件名
// fs.rename("1.txt","11.txt",err=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log("修改文件名成功");
// });

//同步修改文件名
// fs.renameSync("11.txt","2.txt");

//异步读取文件
// fs.readFile("1.txt",(err,data)=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log("读取成功"+data);

// });

//同步读取文件
// let data = fs.readFileSync("1.txt").toString();
// console.log(data);

//异步复制文件
// fs.copyFile("1.txt","3.txt",err=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log("复制成功");
// });

//同步复制文件
// fs.copyFileSync("3.txt","4.txt");

//复制文件实现原理
// function copyFile(src,dir){
//     let data = fs.readFileSync(src).toString();
//     fs.writeFileSync(dir,data);
// }

// copyFile("1.txt","5.txt");


//目录操作
//异步创建目录
// fs.mkdir("11",err=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log("创建成功");

// });
//同步创建目录
// fs.mkdirSync("22");

//异步修改目录名
// fs.rename("11","44",err=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log(修改目录成功);
// });

// fs.renameSync("44","33");

//异步读取目录中的文件和子目录
// fs.readdir("33",(err,files)=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log(files);//[ '1.txt', '2.txt', '22' ]
// })

//同步读取目录中的文件和子目录
// let data = fs.readdirSync("33");
// console.log(data);//[ '1.txt', '2.txt', '22' ]

//删除空目录
// fs.rmdir("./33/22",err=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log("删除成功");
// });

//判断文件或目录是否存在
// fs.exists("33",exists=>{
//     console.log(exists);
// });

//同步判断文件或目录是否存在
// let flag = fs.existsSync("33");
// console.log(flag);

//获取文件或目录的详细信息
// fs.stat("33",(err,stats)=>{
//     if(err){
//         return console.log(err);
//     }
//     console.log(stats);
//     //通过stas.isFile()判断是否是一个文件
//     console.log(stats.isFile());
//     //通过stats.isDirectory()判断是否是一个目录
//     console.log(stats.isDirectory());

// });
// let stats = fs.statSync("5.txt");
// console.log(stats);


//自定义删除非空文件夹
function removeDir(dir) {
    let data = fs.readdirSync(dir);
    data.forEach(item=>{
        //注意这里的路径循环出来的是原来目录的子级，所以删除时，需要加上原来目录级别才能找到
        let url = dir + "/" + item;
        let stats = fs.statSync(url);
        if(stats.isDirectory()){
            //如果是文件夹继续向下查找
            removeDir(url);
        }else{
            //如果是文件就删除文件
            console.log("是文件");

            fs.unlinkSync(url);
        }
    });
    //循环完后删除空目录
    fs.rmdirSync(dir);
}
removeDir("33");