let h1 = "这个是JSX测试代码";
let p = "这是p标签内容";

// JSX字符串和数字原样输出
let num = 12;
let str = "这是字符串";

// JSX数组会转为字符串输出（==arr.join('')）
let arr = ['name', 'what', 'your', 'is'];

//JSX对象不能直接输出，需要转为数组后才能输出
let obj = { name: 'lmf', age: 23 };
let zMouse = {
    name: '子鼠',
    gender: '男',
    skills: ['JavaScript', 'Node.js'],
    interests: ['音乐', '足球', '编程']
};

function getObj(obj){
    let arr = [];
    for(let k in obj){
    arr.push(<li key={k}>{k}:{
        Array.isArray(obj[k]) ? Object.keys(obj[k]).map(item => {
            return <ul><li key={item}>{obj[k][item]}</li></ul>
        }) : obj[k]
    }</li>)//注意此处使用了JSX语法，所以取值必须使用{k}
    }
    return arr;
}

//JSX在属性上使用表达式
let styleDiv = "styleDiv";
//注意多个属性之间使用逗号隔开,驼峰式,此形式以style属性渲染
const bg = {width:'100px',height:'100px',backgroundColor:'red'};

const AppCont = (
    <div>
        {/*这是多行注释 */}
        {/**这个是文档注释 */}
        <h1>{h1}</h1>
        <p>{p}</p>
        <p>数字：{num}</p>
        <p>字符串：{str}</p>

        <p>数组：{arr}</p>


        <p>对象转为数组输出：{Object.keys(obj).map((k, v) => { return k + ': ' + obj[k] + '; ' })}</p>
        对象转为数组输出(先通过方法生成列表循环数组，再调用方法(注意也需要在{}中进行调用)进行显示)：
        {getObj(zMouse)}

        对象循环列表输出：
        {/*注意：不能使用数组作为唯一key，['JavaScript', 'Node.js']没有可作为key的，[name:'JavaScript', remark:'较难']可将arr.name或arr.remark作为唯一key*/}
        <ul>
            {Object.keys(zMouse).map((k) => {
                return <li key={k}>{k}:{
                    Array.isArray(zMouse[k]) ? Object.keys(zMouse[k]).map(item => {
                        return <ul><li key={item}>{zMouse[k][item]}</li></ul>
                    }) : zMouse[k]
                }</li>

            })}
        </ul>
        <div id={styleDiv} style={bg}></div>

    </div>
);

ReactDOM.render(
    AppCont,
    document.querySelector("#app")
);