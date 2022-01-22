import React from 'react';
import '../css/FriendList.css';

import Item from './Item';

/**
 * 子组件抽离：原本的state组件交互，只能控制整个列表的同时展开/收缩。
 * 现在需要实现点击某个分组控制自己展开/收缩
 * 状态由子组件控制
 */
class FriendList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { datas } = this.props;
        
        return (
            <div className="friend-list">
                {
                    Object.keys(datas).map(item => (
                        //注意此处Item组件也在map循环中也需要唯一key
                        <Item data={datas[item]} key={datas[item].title}/>
                    ))
                }

            </div>
        );
    }
}

export default FriendList;