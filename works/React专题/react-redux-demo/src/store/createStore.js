//引入Redux相关方法createStore和combineReducers（React中不能直接引入Redux）
import { createStore, combineReducers,dispatch } from 'redux';
// import users from '../data/users';
import users from '../data/users';
import items from '../data/items';

//调用融合函数,并创建仓库

let reducer = combineReducers({
    users,
    items
});
//注意要在此处给初始化数据的话，因为combineReducers函数中初始化了数据为{}，所以需要在调用dispatch()且调用store.getState()后才能获得数据
// 但如果直接在combineReducers()给出初始化数据，首次创建时就能获取store数据
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;