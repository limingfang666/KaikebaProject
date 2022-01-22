import React from 'react';
import './mail.css';

/**
 * 收件人列表组件（子组件）——非受控组件方式清空input框:
 * onKeyDown事件在onChange事件之前执行
 * 在输入框输入邮箱地址并按enter键时，将地址显示在上方
 */
class MultiInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            mailVal :''
        }
        this.keyDown = this.keyDown.bind(this);
        //受控组件方式清空input框需要多一个方法只用于清空input框
        this.clearVal = this.clearVal.bind(this);
    }

    //添加好友方法（收入邮箱地址后添加到输入框上方）
    //添加好友方法（收入邮箱地址后添加到输入框上方）
    keyDown({ keyCode, target: { value } }) {
        //判断当按下enter键时执行添加操作,keyCode从事件对象Event中解构出来
        if (13 === keyCode) {
            this.setState({
                users: [...this.state.users, {
                    name: '',
                    mail: value
                }], 
                //每次设置完值后将非受控组件的值设置为空
                mailVal : ''
            });
           
        }
    }
    clearVal({target:{value}}){
        this.setState({
            mailVal:value
        })
    }

    render() {
        let { users,mailVal } = this.state;
        return (
            <div className="multi-input">
                {
                    Object.keys(users).map(item => (
                        <div key={item}>{users[item].mail};</div>
                    ))
                }
                <div>
                    <input type="text" value={mailVal} onChange={this.clearVal} onKeyDown={this.keyDown}/>
                </div>
            </div>
        );
    }
}

export default MultiInput;