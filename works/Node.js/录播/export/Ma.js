console.log("这是Ma.js文件");
let a = 10;
class Person{
    constructor(){
        this.name = "zhangsan";
    }
    hobby(){
        console.log("喜欢篮球");
    }
}
// module.exports = {
//     a,
//     Person
// }

// exports.a = a;
// exports.Person = Person;

//解构赋值
// exports.fn = function(){
//     console.log("我是fn函数");  
// }

exports.hobby = new Person().hobby;
