let users = [{
    id: 1,
    username: 'baoge',
    password: '123'
},
{
    id: 2,
    username: 'MT',
    password: '123'
},
{
    id: 3,
    username: 'dahai',
    password: '123'
},
{
    id: 4,
    username: 'zMouse',
    password: '123'
}];

let idMax = 4;

//使用箭头函数直接导出函数，将users作为初始化数据传入，创建仓库后直接获取
export default (state = users, action)=>{
    switch (action.type) {
        case 'USER_ADD':
            //每次增加时idMax需不同,可以在每次调用时将idMax+1
            return [...state,{id:++idMax,...action.payload}]
        default:
            return state;
    }
}