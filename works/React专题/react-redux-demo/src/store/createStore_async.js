//引入Redux相关方法createStore和combineReducers（React中不能直接引入Redux）
import { createStore, combineReducers, applyMiddleware } from 'redux';
//测试异步时数据从后端获取,但是纯函数还需要使用
// import users from '../data/users';
import users from '../data/users_async';
import items from '../data/items';

// 引入redux-chunk的applyMiddleware 方法
// import chunk from 'redux-chunk';
// 高版本redux-chunk引入方式，且要使用redux-devtools-extension插件需要引入
import { middleware as apiMiddleware } from 'redux-chunk';
import {composeWithDevTools} from 'redux-devtools-extension';

//调用融合函数,并创建仓库
let reducer = combineReducers({
    users,
    items
});
//注意要在此处给初始化数据的话，因为combineReducers函数中初始化了数据为{}，所以需要在调用dispatch()且调用store.getState()后才能获得数据
// 但如果直接在combineReducers()给出初始化数据，首次创建时就能获取store数据
const store = createStore(
    reducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    composeWithDevTools(applyMiddleware(apiMiddleware))
    //  applyMiddleware(chunk)
);
export default store;