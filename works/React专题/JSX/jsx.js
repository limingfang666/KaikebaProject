
let name = "kaikeba";
let title = "welcome to kaikeba";

const App = (
    <div>
        {/*这是单行注释*/}
        {/*
            这是多行注释
        */}
        <h1>{name}</h1>
        <p>{title}</p>
        {/*JSX输出数据类型：数组*/}
        <p>{arr}</p>
    </div>
);

ReactDOM.render(
    App,
    document.querySelector("#app")
);

{/*JSX输出数据类型：数组*/}
let arr = [2,7,3,4];
const App1 = (
    <div>
        <p>{arr}</p>
    </div>
);

ReactDOM.render(
    App1,
    document.querySelector("#app")
);

{/*JSX输出数据类型：其他对象*/}
let obj = {name:'lmf',age:23};
const App2 = (
    <div>
        <p>{Object.keys(obj).map((k,v)=>{
            return k+':'+obj[k]+'  ';
        })}</p>
    </div>
);

ReactDOM.render(
    App2,
    document.querySelector("#app")
);

{/*JSX输出数据类型：布尔值，空或未定义*/}
const App3 = (
    <div>
        true:{true}
        <br/>
        undefined:{undefined}
        <br/>
        空:{}
    </div>
);

ReactDOM.render(
    App3,
    document.querySelector("#app")
);

{/*在属性上使用表达式*/}
let id = "box";
const App4 = (
    <div id={id}></div>
);

ReactDOM.render(
    App4,
    document.querySelector("#app")
);

{/*JSX更偏向JavaScript， 所以对于一些特殊的属性，使用的是JavaScript中的属性名风格。如className*/}
let class1 = "box";
const App5 = (
    <div className={class1}></div>
);

ReactDOM.render(
    App5,
    document.querySelector("#app")
);

{/*为了更加方便的操作元素的style，针对style这个属性有特殊的处理方式*/}
let styleObj = {width:'200px',height:'200px',background:'red'};
{/*<div style={{width:'200px',height:'200px',background:'red'}}></div>*/}
const App6 = (
    <div style={styleObj}></div>
);

ReactDOM.render(
    App6,
    document.querySelector("#app")
);
