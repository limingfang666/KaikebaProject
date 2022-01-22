import React from 'react';
import '../css/FriendList.css';

import Item from './Item_state_improve';

/**
 * 状态提升：
 * 所有分组同时只有一个分组展开其他分组都收缩
 * 面板的展开状态不再是组件内部私有状态了，多个组件都会受到这个状态的影响，也就是它们共享了一个状态。
 * 为了能够让多个不同组件共享同一个状态，这个时候，我们把这个状态进行提升，交给这些组件最近的公共父组件进行管理 
 * 
 * 由父组件管理state状态，并通过父组件将分组index和当前点击分组的索引n传递给子组件
 * 子组件接收父组件传递的index和num，通过展开方法回调给父组件进行更新状态
 */
class FriendList extends React.Component {
    constructor(props) {
        super(props);

        //状态提升时，将子组件的数据改变回调给父组件进行更改，因为此时不再是控制某个分组展开/收缩，所以需要记录所有分组的index
        this.state = {
            index : 0,
            // flag:true
        };
        this.onExpand = this.onExpand.bind(this)
    }

     //事件绑定：用户点击列表
    onExpand(num,flag){
        this.setState({
            index:num,
            // flag:!flag
        })
    }
   
    render() {
        let { datas } = this.props;
        
        return (
            <div className="friend-list">
                {
                    Object.keys(datas).map((item,num) => (
                        //将所有分组的index，当前分组的索引num，供子组件回调的展开方法onExpand() 传递给子组件
                        <Item data={datas[item]} key={datas[item].title} index={this.state.index} num={num} onExpand={this.onExpand}/>
                    ))
                }

            </div>
        );
    }
}

export default FriendList;