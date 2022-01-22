// console.log("a.js");
let b = 20;

// define定义无依赖模块
// define({
//     name: "LMF",
//     age: 28,
//     method1: function () {
//         console.log("method1...");
//     },
//     method2: function () {
//         console.log("method2...");
//     }
// });

// define定义有依赖模块
define(['b'], {
    method3: function () {
        console.log("a.js中的有依赖模块method3执行");
        // methodFn();//b.js 文件中的methodFn执行
        
    }
});



