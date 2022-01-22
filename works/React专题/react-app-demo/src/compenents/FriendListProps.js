import React from 'react';
import './FriendList.css';
// import datas from './datas/friends1';

function FriendListProps(props){
    // 函数式组件：通过函数的第一个参数来接收
    let {datas} = props;
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

export default FriendListProps;