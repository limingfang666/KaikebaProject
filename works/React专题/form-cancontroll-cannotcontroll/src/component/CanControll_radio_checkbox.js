import React from 'react';

/**
 * radio和checkbox的非受控组件
 */
class CanControll extends React.Component {
    constructor(props) {
        super(props);
        //1.创建state状态，使val与input的value值进行绑定
        this.state = {
            v5: '女',
            v6: ['前端', '后端'],
        }
        this.changeValue5 = this.changeValue5.bind(this);
        this.changeValue6 = this.changeValue6.bind(this);
    }

    //2.监听组件onChange事件来更新state
    changeValue5({ target: { value: v5 } }) {
        this.setState({
            v5
        });
    }

    changeValue6({ target: { value } }) {
        let { v6 } = this.state;
        if (v6.includes(value)) {
            v6 = v6.filter(v => v !== value);
        } else {
            v6.push(value)
        }
        this.setState({
            v6
        });
    }

    render() {
        return (
            <div>
                <label><input name="gender" type="radio" value="男" checked={this.state.v5 === '男'} onChange={this.changeValue5} />男</label>
                <label><input name="gender" type="radio" value="女" checked={this.state.v5 === '女'} onChange={this.changeValue5} />女</label>

                <label><input name="interest" type="checkbox" value="前端" checked={this.state.v6.includes('前端')} onChange={this.changeValue6} />前端</label>
                <label><input name="interest" type="checkbox" value="后端" checked={this.state.v6.includes('后端')} onChange={this.changeValue6} />后端</label>
            </div>
        );
    }
}

export default CanControll;