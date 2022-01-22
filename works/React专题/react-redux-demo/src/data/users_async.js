
let idMax = 5;

//使用箭头函数直接导出函数，将users作为初始化数据传入，创建仓库后直接获取
export default (state = [], action)=>{
    
    switch (action.type) {
        case 'USER_GET':
            //注意此处直接将所有数据返回，所以不用解构原来的state
            return action.payload;
        case 'USER_ADD':
            //每次增加时idMax需不同,可以在每次调用时将idMax+1
            return [...state,{id:++idMax,...action.payload}]
        default:
            return state;
    }
}