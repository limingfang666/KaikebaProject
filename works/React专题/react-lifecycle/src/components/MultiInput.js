import React from 'react';
import './mail.css';

/**
 * 收件人列表组件（子组件）——DOM操作方式清空input框:
 * 在输入框输入邮箱地址并按enter键时，将地址显示在上方
 */
class MultiInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        this.keyDown = this.keyDown.bind(this);
    }

    //添加好友方法（收入邮箱地址后添加到输入框上方）
    keyDown({ keyCode, target, target: { value } }) {
        //判断当按下enter键时执行添加操作,keyCode从事件对象Event中解构出来
        if (13 === keyCode) {
            this.setState({
                users: [...this.state.users, {
                    name: '',
                    email: value
                }]
            });
            //操作DOM方式清空输入框
            target.value = '';
        }
    }

    //注意静态方法只能调用静态方法，所以此方法也必须是静态方法
    static addNewUser(user,users){
        //判断email不相等时进行添加
        if ( !users.find(u => u.email === user.email) ) {
            users.push(user);
        }
        // users.push(user);
        return users;
    }

    //将父级props数据和私有state数据更新都会影响的数据用此方法进行处理
    //注意静态方法中没有this，所以不能直接使用this.state改变users
    static getDerivedStateFromProps(props,state){
        if(props.user){
            //将父组件传递的好友和输入的邮箱地址进行累加（注意静态方法中没有this），静态方法调用时必须使用类名进行调用
            MultiInput.addNewUser(props.user,state.users);   
        } 
        //此方法返回值即更新state,返回null不进行更新
        return null;
    }


    render() {
        let { users } = this.state;
        return (
            <div className="multi-input">
                {
                    Object.keys(users).map(item => (
                        <div key={item}>{users[item].name} {users[item].email};</div>
                    ))
                }
                <div>
                    <input type="text" onKeyDown={this.keyDown} />
                </div>
            </div>
        );
    }
}

export default MultiInput;