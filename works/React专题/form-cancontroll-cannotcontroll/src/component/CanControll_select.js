import React from 'react';

/**
 * select的非受控组件——单选
 */
class CanControll extends React.Component {
    constructor(props) {
        super(props);
        //1.创建state状态，使val与input的value值进行绑定
        this.state = {
            val: 'html'
        }
        this.changeVal = this.changeVal.bind(this);
    }

    //2.监听组件onChange事件来更新state
    //将target解构出来，再对里面的对象进行解构，赋值给别名val
    changeVal({target:{value}}) {
        console.log(value);
        
        this.setState({
            val:value
        })
    }

    render() {
        return (
            <div>
                <select value={this.state.val} onChange={this.changeVal}>
                    <option value="html">html</option>
                    <option value="css">css</option>
                    <option value="javascript">javascript</option>
                </select>
                <hr/>
                <div>{this.state.val}</div>
                
            </div>
        );
    }
}

export default CanControll;