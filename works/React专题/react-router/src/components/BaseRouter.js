import React from 'react';

// import RouterSwitch from './RouterSwitch';
//场景三：排序
// import RouterSwitch from './sort/RouterSwitch_sort';
//场景四：导航高亮
// import  RouterSwitch from './highlight/RouterSwitch_highlight';
// 场景五：404页面
// import  RouterSwitch from './notfound/RouterSwitch_notfound';
// 场景六：购物车——用户登录鉴权认证
// import  RouterSwitch from './cart/RouterSwitch_cart';
// 场景七：分页
import  RouterSwitch from './pagenation/RouterSwitch_pagenation';
class BaseRouter extends React.Component{
    render(){
        return(
            <div>
                {/* 场景一：页面切换 */}
                <RouterSwitch />
            </div>
        );
    }
}

export default BaseRouter;