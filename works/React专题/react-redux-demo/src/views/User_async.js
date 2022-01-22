import React from 'react';
import { connect } from 'react-redux';
// 引入axios发送异步请求
import axios from 'axios';
// 模拟redux-chunk实现不用多次调用实现多次发送异步请求
// import {selectUser} from '../store/chunk';

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

    //通过发送异步请求获取数据，React发送异步请求在componentDidMount()方法，使用axios发送异步请求到后端
    // 注意：需要使用异步async和await
    async componentDidMount(){
        let rs = await axios({
            //package.json中加上 "proxy": "http://localhost:8989"
            // url:'/getUser'
            // 当前端和后台系统请求地址需要使用/api进行区分时,使用proxy
            url:'/api/getUser'
        });
        //获取数据后，通过dispatch将数据进行显示USER_GET
        let {dispatch} = this.props;
        dispatch({
            type:'USER_GET',
            payload:rs.data
        });

        //模拟实现chunk
        // let {dispatch} = this.props;
        // dispatch(selectUser());
    }

    render(){
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