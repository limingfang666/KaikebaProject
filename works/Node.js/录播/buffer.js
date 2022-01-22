//buffer缓冲区创建方式一：ES6.1之前buffer缓冲区创建
// let buffer = new Buffer("大家好");
// console.log(buffer);//<Buffer e5 a4 a7 e5 ae b6 e5 a5 bd>


// //buffer缓冲区创建方式二：
// let buffer = Buffer.alloc(10);//创建一个10字节的buffer缓冲区
// console.log(buffer);//<Buffer 00 00 00 00 00 00 00 00 00 00>


//buffer缓冲区创建方式三：
// let buffer = Buffer.from("大家好");
// console.log(buffer);//<Buffer e5 a4 a7 e5 ae b6 e5 a5 bd>

//buffer缓冲区创建方式四：
// let buffer = Buffer.from([0xe5, 0xa4, 0xa7, 0xe5, 0xae, 0xb6, 0xe5, 0xa5, 0xbd]);
// console.log(buffer.toString());//大家好

//通过数组方式创建，一个中文对应3个16进制位，如果给的位数不对就会乱码
let buffer1 = Buffer.from([0xe5, 0xa4, 0xa7, 0xe5]);
let buffer2 = Buffer.from([ 0xae, 0xb6, 0xe5, 0xa5, 0xbd]);
// console.log(buffer1.toString());//大�
// console.log(buffer2.toString());//��好

//乱码解决方法一：使用concat连接多个buffer(注意参数必须是数组)，再输出
// console.log(Buffer.concat([buffer1,buffer2]).toString());

// 乱码解决方法二：
let { StringDecoder } = require("string_decoder");
let decoder = new StringDecoder();
let buf1 = decoder.write(buffer1);
let buf2 = decoder.write(buffer2);
console.log(buf1);//大
console.log(buf2);//家好



