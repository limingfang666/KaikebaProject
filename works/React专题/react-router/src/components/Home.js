import React from 'react';
import '../css/router.css';
import { Link, Route } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        //商品数据通过props传递过来
        super(props);
    }

    render() {
        //此处得到的数据已经是数组
        let { items: { items } } = this.props;

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
                        items.map(item => (
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
            </div>
        );
    }
}

export default Home;