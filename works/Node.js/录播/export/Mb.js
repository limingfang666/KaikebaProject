console.log("这是Mb.js文件");
// let Ma = require("./Ma");
// console.log(Ma.a);
// let p = new Ma.Person();
// p.hobby();

//也可以通过结构赋值方式得到值
// 或者 通过解构赋值 :注意使用解构赋值时 {hobby}结构的值必须和exports.hobby的值相同
let { hobby } = require("./Ma");
hobby();
