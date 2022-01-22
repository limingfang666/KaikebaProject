import React from 'react';
import '../css/dialog.css';
import PropTypes from 'prop-types';

class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: "这是input框非受控组件默认值",
            checkboxVal: "这是checkbox非受控组件默认值"
        }
    }
    //ES6 静态属性默认值——基于static的写法
    static defaultProps = {
        title: "这是静态属性默认值——ES6基于static的写法"
    }

    //prop-types验证
    static propTypes = {
        title: PropTypes.string.isRequired
    }
    render() {
        return (
            <div className="dialog">
                <i className="dialog_close_btn"></i>
                <div className="dialog_header">
                    <span className="dialog_title">{this.props.title}</span>
                </div>
                <div className="dialog_content">
                    {this.props.children}
                    <input type="text" defaultValue={this.state.inputVal}/>
                    <input type="checkbox" defaultChecked={this.state.checkboxVal} />
                </div>
            </div>
        );
    }
}

//ES5静态属性默认值写法
// Dialog.defaultProps = {
//     title:"这个静态属性默认值——ES5写法"
// }

export default Dialog;