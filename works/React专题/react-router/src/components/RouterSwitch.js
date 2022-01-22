import React from 'react';
import { Route, Link } from 'react-router-dom';

import Home from './Home';
import About from './About';
import Item from './Item';

// 注意：所有用到的数据都需要进行导出
import items from '../data/items.js';
/**
 * 场景一：使用路由无刷新切换页面
 */
class RouterSwitch extends React.Component {
    render() {
        return (
            <div>
                {/* <Link>路由组件： 相当于a标签功能；to属性相当于a标签的href属性；拦截了a标签中点击后刷新跳转*/}
                <nav>
                    <Link to="/">首页</Link>
                    <span> | </span>
                    <Link to="/about">关于我们</Link>
                </nav>
                <br />
                {/* Route 组件：用于设置路由信息，path属性匹配路径；component设置要显示的组件；exact表示精确匹配，非 exact 模式下 '/' 匹配所有以 '/' 开头的路由（注意/前不要加点./） */}
                {/* <Route path="/" exact component={Home} />
                <Route path="/about" component={About} /> */}

                {/* 场景二：商品展示主页。*/}
                {/* 如果Route组件需要传递数据，就不能使用compoment属性，而是需要使用render属性 
                render 属性值是一个函数,当路由匹配的时候指定该函数进行渲染
                */}
                <Route path="/" exact render={el => <Home items={items} />} />
                <Route path="/about" component={About} />

                {/* 注意Item的Route组件因为是和主页及关于我们页面一样，所以应该在此组件中切换 */}
                {/* /item/:id(\d+)表示id后只能是数字，params是path路径下的可变部分，如/item/1 */}
                {/* 也需要将数据items传递到Item页面，这里是路由组件，所以props属性会自动添加几个与路由有关的几个属性history:对象，location:对象，match:对象
                通过...props将props属性中所有对象传递到Item组件，且传入items*/}
                <Route path='/Item/:id(\d+)' render={(props)=><Item {...props} items={items} />} />
            </div>
        );
    }
}

export default RouterSwitch;