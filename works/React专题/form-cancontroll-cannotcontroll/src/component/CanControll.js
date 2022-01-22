import React from 'react';

/**
 * input输入框的非受控组件
 */
class CanControll extends React.Component{
    constructor(props){
        super(props);
        //1.创建state状态，使val与input的value值进行绑定
        this.state = {
            val:'kaikeba'
        }
        this.changeVal = this.changeVal.bind(this);
    }

    //2.监听组件onChange事件来更新state
    //将target解构出来，再对里面的对象进行解构，赋值给别名val
    changeVal({target:{value:val}}){
        // const user = {
        //     id: 123,
        //     name: 'hehe',
        //     education: {
        //       degree: 'Masters'
        //     }
        //   };
        //   const {education: {degree:vala}} = user;
        //   console.log(vala); //prints: Masters
        
        //注意setState()是方法
        this.setState({
            val
        })
    }

    // changeVal(e) {
    //     this.setState({
    //         val: e.target.value
    //     });
    // }

    render(){
        return(
            <div>
                <input type="text" value={this.state.val} onChange={this.changeVal} />
                <hr/>
                {this.state.val}      
            </div>
        );
    }
}

export default CanControll;