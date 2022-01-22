import React from 'react';
import { Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';

// import Home from '../sort/Home_sort';
//场景七：
import Home from '../pagenation/Home_pagenation';
import About from '../About';
import Item from '../Item';
import items from '../../data/items.js';
import '../../css/router.css';

// 场景五：404错误页面
// import NotFound from './NotFound';

// 场景六：购物车——用户登录鉴权认证
// 场景七：分页
import Cart from '../cart/Cart';
import Login from '../cart/Login';
import usersData from '../../data/user';

/**
 * 场景六：购物车——用户登录鉴权认证
 */
class RouterSwitch extends React.Component {
    constructor(props){
        super(props);
        let {userInfo} = usersData;
        //需要通过state保存和更新登录用户信息
        this.state = {
            userInfo
        }
    }
    login({username, password}) {
        return new Promise( (resolve, reject) => {
          if (!username || !password) {
            reject('请输入用户名和密码');
          }
          let {users} = usersData;
          
          let user = users.find(user => user.username === username && user.password === password);
          if ( !user ) {
            reject('用户不存在或者密码错误');
          }
      
          this.setState({
            userInfo: {
              id: user.id,
              username: user.username
            }
          });
      
          resolve('登录成功');
        } );
      }

    render() {
        return (
            <div>
                {/* <Link>路由组件： 相当于a标签功能；to属性相当于a标签的href属性；拦截了a标签中点击后刷新跳转*/}
                <nav>
                    <NavLink to="/" exact activeStyle={{ 'color': 'red' }} isActive={(match, location) => {
                        return match || location.pathname.startsWith("/item");
                    }}>首页</NavLink>
                    <span> | </span>
                    <NavLink to="/about" exact activeClassName={"homeHighLight"}>关于我们</NavLink>
                    <span> | </span>
                     {/* 场景六：购物车——用户鉴权认证*/}
                     <NavLink to="/cart" exact activeClassName={"homeHighLight"}>购物车</NavLink>

                </nav>
                <br />
                {/* Route 组件：用于设置路由信息，path属性匹配路径；component设置要显示的组件；exact表示精确匹配，非 exact 模式下 '/' 匹配所有以 '/' 开头的路由（注意/前不要加点./） */}
                {/* <Route path="/" exact component={Home} />
                <Route path="/about" component={About} /> */}

                {/* 场景二：商品展示主页。*/}
                {/* 如果Route组件需要传递数据，就不能使用compoment属性，而是需要使用render属性 
                render 属性值是一个函数,当路由匹配的时候指定该函数进行渲染
                */}
                {/* <Route path="/" exact render={el => <Home items={items} />} /> */}

                {/* 场景三：排序且解决sort失效问题*/}
                {/* 跳转到Home组件时，直接带上sort排序，而Home组件是非路由组件，所以需要同时传入props属性 */}
                <Switch>
                    {/* 场景六时，注意Home组件本身不是路由组件，需要传递props对象 
                      场景七时，传入page参数和正则限定
                    */}
                    <Route path="/:page(\d*)" exact render={(props) => <Home {...props} items={items}/>} />

                    <Route path="/about" component={About} />

                    {/* 注意Item的Route组件因为是和主页及关于我们页面一样，所以应该在此组件中切换 */}
                    {/* /item/:id(\d+)表示id后只能是数字，params是path路径下的可变部分，如/item/1 */}
                    {/* 也需要将数据items传递到Item页面，这里是路由组件，所以props属性会自动添加几个与路由有关的几个属性history:对象，location:对象，match:对象
                通过...props将props属性中所有对象传递到Item组件，且传入items*/}
                    <Route path='/item/:id(\d+)' render={(props) => <Item {...props} items={items} />} />

                    {/* 场景五：404错误页面*/}
                    {/* 如果直接加入Route会每个页面都有404错误页面 */}
                    {/* <Route component={NotFound} /> */}

                     {/* 场景六：购物车——用户鉴权认证
                        判断如果userInfo中id不大于0则没有登录，需要重定向到登录页面
                     */}
                     <Route path="/login" render={(props)=><Login {...props} onLogin={this.login.bind(this)}/>}/>
                     <Route path="/cart" render={()=>{
                        //  注意此处的userInfo需要从state中取，登录后会保存进state中
                         if(this.state.userInfo.id>0){
                             console.log("购物车");
                             
                            return <Cart />
                         }else{
                             console.log("未登录");
                             
                            return <Redirect to='/login'/>
                         }
                     }} />

                </Switch>

            </div>
        );
    }
}

export default RouterSwitch;