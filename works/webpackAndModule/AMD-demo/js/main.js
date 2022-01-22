//导入模块化文件时，通过方法的参数获取到模块中导出的数据
//注意导入时，文件名需要使用中括号
// define(['./m1'],function(Cart){
//     let cart = new Cart()
//         return cart.add({name: 'iphoneXX', price: 1000000})
//     }
// );

//CommonJS风格导入导出模块化数据
define(function(require) {
    //注意如果导出的是类，则需要将对象中的类解构出来才能用
    let {Cart} = require('./m2');
    let cart = new Cart();
    
    cart.add({name: 'iphoneXX', price: 1000000})
  })
