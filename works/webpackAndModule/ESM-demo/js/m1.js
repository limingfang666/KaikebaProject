console.log("m1模块...");

function css1(){
    console.log("m1模块下的css1方法");
}


//1.导出单个特性
export let cssFunc1 = css1;

export let cssFunc2 = function css2(){
    console.log("m1模块下的css2方法");
}

export function cssFunc3(){
    console.log("m1模块下的cssFunc3方法");
}

export class M1Class{
    constructor(){

    }
    m1ClassFunc(){
        console.log("m1模块下的m1ClassFunc");
    }
}

//2.导出列表
let a = 1,b=2,c=3;
export {a,b,c};

//3.重命名导出
let username = "张三";
let password = "1234";
export {username as name,password as pw};

//4.默认导出
let aa = 1;

// export default aa;
// export default function() { 
//     let defaultVal = 33;
//     console.log("defaultVal:"+defaultVal);
    
//  }
// export default function defaultFunc2() {
//     console.log("defaultFunc2方法");
// }
let bb = 2,cc = 3;
//不能同时导出多个。如export { bb as default,cc as default};
// export { bb as default};

// 5.模块重定向导出: from－从已经存在的模块、脚本文件…导出
export * from './m2.js';
export {v1,v2} from './m2.js';
export { v1 as value1, v2 as value2 } from './m2.js';
export { default } from './m2.js';
