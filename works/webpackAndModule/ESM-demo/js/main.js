
//导入m1模块
//1.导出单个特性:因为不是默认导出，所以需要声明变量接收,且文件必须有.js结尾
import {cssFunc1,cssFunc2,cssFunc3,M1Class} from './m1.js';

// 2.导入列表：:此处a,b,c必须和导出中的变量名一一对应
import {a,b,c} from './m1.js';

//3.重命名导出：导入导出的变量名需一一对象，想在导入时使用不同名字可使用别名， 变量名 as 别名
// import {name,pw} from './m1.js'
import {name as name1,pw as pw1} from './m1.js';

//4.默认导入：注意：default导入导出都不需要加{}
// import aa from './m1.js';
// import defaultFunc from "./m1.js"
// import defaultFunc2 from './m1.js';
import bb from './m1.js';

// 5.模块重定向导出
import * as obj from './m1.js'
import {v1,v2} from './m1.js';
import {value1,value2} from './m1.js';
import {default as defaultV} from './m1.js';


// 1.导出单个特性
let a1 = 10;
let m1Class = new M1Class();
m1Class.m1ClassFunc();

console.log("main.js",a1,cssFunc1,cssFunc2,cssFunc3);

//2.导入列表
console.log(a,b,c);//1 2 3

//3.重命名导出
// console.log(name,pw);//张三 1234
console.log(name1,pw1);//张三 1234

//4.默认导入
// defaultFunc();
// defaultFunc2();
// console.log(aa);
// console.log(bb);

//5.模块重定向导出
console.log(obj);//Module {…}
console.log(v1,v2);//2 3
console.log(value1,value2);//2 3
console.log(defaultV);//ƒ m2Func(){ console.log(v1+v2); }


//6.动态导入：通过import()方法导入，返回一个promise对象进行异步延迟加载
document.onclick = function(){
    //直接通过import导入会报错
    // import obj from 'm3.js';
    // console.log(obj);
    import('./m3.js').then(obj=>{
        console.log(obj);
        
    });
}

// //使用async  await进行异步延迟加载
// document.onclick = async function(){
//     let m1 = await import('./m3.js');
//     console.log(m1);
//     m1.default();
// }






