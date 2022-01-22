import React from 'react';

/**
 * 非受控组件：Ref属性和回调refs——获取元素信息
 */
class CanControll extends React.Component {
    constructor(props) {
        super(props);
        this.selectURL = this.selectURL.bind(this);
        // Ref属性获取div信息
        this.getElementInfo = this.getElementInfo.bind(this);

        //使用React.createRef()需要在构造函数中挂载
        this.refDiv = React.createRef();
    }

    //获取复制信息
    selectURL(){
        //选中input的内容
        this.refInput.select();
        console.log(this.refInput.value);
    }

    //获取元素信息
    getElementInfo(){
        console.log(this.refDiv.current.offsetHeight);
        
    }


    render() {
        return (
            <div>
                {/* 此处el=>this.refInput = el 相当于方法
                    function(el){
                        this.refInput = el;//将当前元素el复制给this.refInput,但是此处this指向undefined，所以需要使用箭头函数
                    }
                */}
                <input ref={el=>this.refInput = el} type="text" value="http://kaikeba.com" />
                <button onClick={this.selectURL}>点击复制</button>
                <hr />
                <button onClick={this.getElementInfo}>获取元素信息</button>
                <div ref={this.refDiv} style={{ width: '100px', height: '100px', background: 'red' }}></div>
            </div>

        );
    }
}

export default CanControll;