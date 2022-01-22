//stream 流
//读取文件home.js的数据
const fs = require("fs");
// let data = fs.readFileSync("home.js");
// console.log(data);//<Buffer 0d 0a 2f 2f 20 63 6f 6e 73 6f 6c 65 2e 6c 6f 67 28 22 e8 bf 99 e6 98 af 68 6f 6d 65 e4 b8 bb e9 a1 b5 4a 53 e6 96 87 e4 bb b6 22 29 3b 0d 0a 2f 2f 20 ... >

//使用可读流进行读取
// let re = fs.createReadStream("home.js");
// re.on("data",chunk=>{
//     console.log(chunk.toString());
// });

//创建一个65kb大小的buffer，再通过createReadStream()读取
let buffer = Buffer.alloc(64*1024);
fs.writeFile("64kb.txt",buffer,err=>{
    if(err){
        return console.log(err);
    }
});
// let res = fs.createReadStream("65kb.txt");
// let num = 0;
// res.on("data",chunk=>{
//     num++;
//     console.log(chunk);//发现会打印两次
//     console.log(num);
    
//     /*
//         <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... >
//         <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... >
//     */
// });

//再读取64kb文件时，发现只会打印一次
let res = fs.createReadStream("home.js");
let num = 0;
let str = "";
res.on("data",chunk=>{
    num++;
    str += chunk;
    console.log(chunk);//发现会打印两次
    console.log(num);
    /*
        <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... >
        1
    */
});

//end监控文件是否读取完成，并可以得到读取完成后的数据
// res.on("end",()=>{
//     console.log(str);
    
// });

//pipe管道，将读到的数据，通过pipe()写入到文件
let pipeTxt = fs.createWriteStream("pipe.txt");
res.pipe(pipeTxt);