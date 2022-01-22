import React from 'react';
import '../../css/router.css';
import { Link, Route } from 'react-router-dom';

import Pagenation from './Pagenation';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //此处得到的数据已经是数组
        let { items: { items },match:{params:{page}} } = this.props;
        console.log(page);
        
        //每页条数
        let num = 3;
        let pageNum = Number(page);
        let itemData = items.slice((pageNum-1)*num,page*num);
        return (
            <div>
                {/* <div>主页</div> */}
                {/* 场景二：商品展示主页 */}
                <h2>商品列表</h2>
                <ul className="item-list">
                    <li className="head">
                        <span>名称</span>
                        <span>价格</span>
                    </li>
                    {
                        // 点击某行进入详情页
                        itemData.map(item => (
                            <li key={item.id}>
                                <span>
                                 {/* 注意Item的Route组件因为是和主页及关于我们页面一样切换不同页面，所以应该在RouterSwitch组件中使用Route组件 */}
                                    <Link to={'/item/'+item.id}>{item.name}</Link>
                                </span>
                                <span>￥ {(item.price / 100).toFixed(2)} </span>
                            </li>
                        ))
                    }
                </ul>
                {/*场景七： 引入分页组件 */}
                <Pagenation pages={items.length/num} page={Number(page)}/>
            </div>
        );
    }
}

export default Home;