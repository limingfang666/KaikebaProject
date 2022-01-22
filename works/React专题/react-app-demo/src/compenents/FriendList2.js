import React from 'react';
import './FriendList.css';

class FriendList2 extends React.Component {
    // 类式组件：通过类的构造函数第一个参数来接收
    constructor(props){
        super(props);
        this.props = props;
    }
    render(){
        let {datas} = this.props;
        return (
            <div className="friend-list">
                <div className="friend-group">
                    {Object.keys(datas).map((key, index) => (
                    <div className="friend-group" key={key}>
                        <dt>{datas[key].title}</dt>
                		{datas[key].list.map(list => <dd key={list.name}>{list.name}</dd>)}
                    </div>
                ))}
                </div>
            </div>
        );
    }
}


export default FriendList2;