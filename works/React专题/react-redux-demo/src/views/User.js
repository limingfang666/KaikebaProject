import React from 'react';
import { connect } from 'react-redux';

class User extends React.Component{
    constructor(props){
        super(props);
        this.addUser = this.addUser.bind(this);
        //通过ref属性的createRef()获取用户名
        this.username = React.createRef();
    }
    addUser(){
        let {value} = this.username.current;
        
        //判断value不为空时，新增
        if(value!==""){
            let {dispatch} = this.props;
            dispatch({
                type:'USER_ADD',
                payload:{
                    username:value,
                    password:'888888'
                }
            });
            
        }
        //清空输入框
        this.username.current.value = '';
    }

    render(){
        // let idMax = 4;
        return(
            <div>
                用户名：<input ref={this.username} type="text" ></input><button onClick={this.addUser}>新增</button>
                <ul>
                        {
                            this.props.users.map(user=>{
                            return <li key={user.id}>#{user.username}/{user.password}</li>
                            })
                        }
                </ul>
            </div>
        );
    }
}
// 该函数的第一个参数就是 store 中的 state : store.getState()
// 该函数的返回值将被解构赋值给 props : this.props.items
export default connect(state=>{
    return {
        users:state.users
    }
})(User);

// function connect(callback){
//     return function(Component){
//         //执行过程中会调用callback函数,然后获取User组件中的数据id：1 
//         let obj = callback(store.state);
//         for(let k in obj){
//             //然后把获得的数据注入到组件的props属性中
//             Component.props[k] = obj[k];
//         }
//     }
// }

// connect(function(state){
//     return {
//         id:1
//     }
// })(User)