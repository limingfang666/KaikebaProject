const path = require("path");
module.exports = {
    //模式 : "production" | "development" | "none"
    mode:'production',
    // //单个入口文件，单个出口文件
    // //入口文件
    // entry:'./src/js/index.js',
    // output:{
    //     //指定打包后输出文件路径，会自动生成文件夹名
    //     //注意：由于使用了path模块，所以必须引入path模块
    //     path: path.resolve(__dirname, "dist"),
    //     //打包输出文件名
    //     filename:'[name]-test.js'
    // }

    // //多个入口文件（数组方式），单个出口文件(将两个入口文件合并到一个文件中)
    // entry:[
    //     './src/js/index.js',
    //     './src/js/m1.js'
    // ],
    // output:{
    //     path: path.resolve(__dirname, "dist"),
    //     filename:'[name]-test.js'
    // }

    //多个入口文件，多个出口文件(要获得多个出口文件时，多个入口文件必须采用对象形式)
    entry:{
           index1: './src/js/index.js',
           m1:'./src/js/m1.js'
    },
    output:{
        path: path.resolve(__dirname, "dist"),
        //多个入口多个出口文件时：[name]占位符为entry中的key
        filename:'[name]-test.js'
    }
}