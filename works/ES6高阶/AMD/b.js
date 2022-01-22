console.log("b.js");
function methodFn(){
    console.log("b.js 文件中的methodFn执行");
}
define({
    methodFn1:function(){
        console.log("b.js 文件中的methodFn1执行");
        
    }
});

// a.js和b.js，在a.js中引入后，b.js文件也可以拿到a.js文件中的变量。作用域是相互的
console.log("b.js文件中也可以获得a.js中的变量b:"+b);//b.js文件中也可以获得a.js中的变量b:20
