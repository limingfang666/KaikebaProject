import React from 'react';

import './mail.css';
import MultiInput from './MultiInput.js';

/**
 * 好友列表组件（父组件）：
 * 点击好友列表某个好友时，以prop传入数据给收件人列表组件，并和收件人列表组件中原有邮箱地址进行累加显示
 */
class Mail extends React.Component{
    constructor(props){
        super(props);
        //在constructor()方法中设置初始化数据
        this.state = {
            friends: [
                {id: 1, name: '张三', email: 'zhangsan@email.com'},
                {id: 2, name: '李四', email: 'lisi@email.com'},
                {id: 3, name: '王五', email: 'wangwu@email.com'}
            ],
            user:null
        };

        this.selectFriend = this.selectFriend.bind(this);
    }

    //此处直接将数据设置到user中，而prop数据更改会直接重新渲染自身及子组件，同时渲染时会调用static getDerivedStateFromProps()
    //所以可以在子组件中通过此方法的props参数将更改后的user数据传递过去(一定要通过组件将user传递过去)
    selectFriend(friend){
        //将点击的数据设置到user中
        this.setState({
            user:friend
        });
    }
    render(){
        //获取好友列表数据
        let {friends,user} = this.state;

        return (
            <div className="clear">
                <h1>发送邮件</h1>
                <hr/>
                <ul className="box fr">
                    {/* 好友列表 */}
                    {
                        /*el => this.selectFriend(friends) 由于此处需要传参friends，而直接使用this.selectFriend(friends)会直接执行
                         所以使用箭头函数方式，点击时会调用箭头函数，箭头函数执行时才会执行this.selectFriend(friends)方法并传参
                         */
                        Object.keys(friends).map(item=> <li onClick={el => this.selectFriend(friends[item])} key={friends[item].id}>{friends[item].name}</li>)
                    }
                </ul>
                <div className="fl">
                    {/* 收件人列表组件(子组件)：收件人输入框   一定要通过组件将user传递过去,子组件中方法getDerivedStateFromProps需要用到*/}
                    <MultiInput user={user}/>
                </div>
            </div>
        );
    }
}

export default Mail;
