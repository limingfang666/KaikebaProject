import React from 'react';
import '../css/router.css';
import { Link, Route } from 'react-router-dom';
/**
 * 非受控组件实现排序，问题：分享或刷新页面后，记不住state状态
 */
class Home extends React.Component {
    constructor(props) {
        //商品数据通过props传递过来
        super(props);
        this.state = {
            sort : 'desc'
        };
        this.sortItems = this.sortItems.bind(this);
    }

    //商品排序(注意select需解构直value层，注意select单选的非受控组件也是通过{target:{value}}进行解构)
    sortItems({target:{value:sort}}){
        this.setState({
            sort
        });
    }

    render() {
        //此处得到的数据已经是数组
        let { items: { items } } = this.props;
        //根据sort的值将items进行排序
        items.sort((a,b)=>{
            return this.state.sort === 'desc'?a.price - b.price : b.price-a.price;
        });

        return (
            <div>
                {/* <div>主页</div> */}
                {/* 场景二：商品展示主页 */}
                <h2>商品列表</h2>
                排序：
                <select value={this.state.sort} onChange={this.sortItems}>
                    <option value="desc">从低到高</option>
                    <option value="asc">从高到低</option>
                </select>
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
                                    <Link to={'/Item/'+item.id}>{item.name}</Link>
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