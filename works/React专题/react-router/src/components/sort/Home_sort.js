import React from 'react';
import '../../css/router.css';
import { Link, Route } from 'react-router-dom';
import QS from 'qs';
/**
 * 应用场景三：排序并解决sort失效问题
 * 注意：获取search中sort的地方和排序的地方，是在render方法中，因为无论是首次进入首页还是排序后跳转到首页都需要重新进行获取search和排序
 */
class Home extends React.Component {
    constructor(props) {
        //商品数据通过props传递过来
        super(props);
    }

    render() {
        //注意需要此处就获取queryString并进行排序
        let { items: { items }, history, location:{search} } = this.props;
        //通过原生JS类URLSearchParams的get()方法获取sort的值,当首次进入时没有search对象，直接设置为asc，在select中也设置defaultValue="asc"
        // let sort = new URLSearchParams(search).get('sort') || 'asc';
        
        //原生URLSearchParams类只使用与一层对象的解构，多层对象解构时就必须使用qs类库
        // let sort = QS.parse(search.substring(1)).sort;
        let sort = QS.parse(search,{ignoreQueryPrefix:true}).sort;
        
        //排序
        items.sort((a,b)=>{
            return sort === 'desc'? a.price-b.price : b.price-a.price;
        });

        return (
            <div>
                {/* <div>主页</div> */}
                {/* 场景二：商品展示主页 */}
                <h2>商品列表</h2>
                排序：
                {/* 切换时直接跳转 */}
                <select defaultValue="asc" onChange={({ target: { value } }) => {
                    //注意此处不能使用return
                    history.push('/?sort=' + value);
                }}>
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
                                    <Link to={'/item/' + item.id}>{item.name}</Link>
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