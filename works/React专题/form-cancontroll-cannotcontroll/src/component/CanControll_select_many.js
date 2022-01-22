import React from 'react';

/**
 * select（多选：从多个选项中选择一个）的非受控组件
 */
class CanControll extends React.Component {
    constructor(props) {
        super(props);
        //1.创建state状态，使val与input的value值进行绑定
        this.state = {
            //select多选时，对应的 value 就是一个数组
            val: ['html','js']
        }
        this.changeVal = this.changeVal.bind(this);
    }

    //2.监听组件onChange事件来更新state
    changeVal({ target: { options } }) {
        this.setState({
            //因为select多选对应的value是数组，所以通过扩展运算符，将options中所有值展开到数组中
            val:  [...options].filter(o=>o.selected).map(o=>o.value)
        })
    }

    render() {
        return (
            <div>
                <select value={this.state.val} onChange={this.changeVal} multiple>
                    <option value="html">html</option>
                    <option value="css">css</option>
                    <option value="javascript">javascript</option>
                </select>
                <hr />
                {this.state.val.join(',')}

            </div>
        );
    }
}

export default CanControll;