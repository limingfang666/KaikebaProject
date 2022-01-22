import React from 'react';

/**
 * 用户登录：通过ref回调方式，获取并设置非受控组件的值
 */
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);

        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    login() {
        let {onLogin, history: {push}} = this.props;

        if (typeof onLogin === 'function') {
            onLogin({
                username: this.usernameRef.current.value,
                password: this.passwordRef.current.value
            }).then(msg=>{
                alert(msg);
                push('/');
            }).catch(e=>alert(e));
        } 
    }
    render() {
        return (
            <div>
                用户名：<input ref={this.usernameRef} type="text" name="username" /><br />
                    密码：<input ref={this.passwordRef} type="password" name="password" /><br />
                <button onClick={this.login}>登录</button>
            </div>
        );
    }
}
export default Login;