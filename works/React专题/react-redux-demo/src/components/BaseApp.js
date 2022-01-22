import React from 'react';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
// import User from '../views/User';
import User from '../views/User_async';
import { Provider } from 'react-redux';
// import store from '../store/createStore';
//异步action测试
import store from '../store/createStore_async';

/**
 * 用于路由各个页面
 */
class BaseApp extends React.Component {
    render() {
        
        return (
            <div>
                {/* 使用Provider组件可以将store数据注入整个应用 */}
                <Provider store={store}>
                    <Router>
                        <Link to="/">User</Link>
                        <hr />
                        <Route path="/" component={User} />
                    </Router>
                </Provider>
            </div>

        );
    }
}

export default BaseApp;