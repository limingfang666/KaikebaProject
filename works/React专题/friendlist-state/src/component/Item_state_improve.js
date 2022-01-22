import React from 'react';

/**
 * 状态提升子组件
 */
class Item extends React.Component {
    constructor(props) {
        super(props);
        //子组件的this指向绑定到子组件上
        this.expand = this.expand.bind(this);
    }

    //子组件自身展开/收缩方法
    expand(e){
        //子组件自身不能更改状态，而是回调给父组件统一控制，所以需要调用父组件的展开/收缩方法（父组件通过props属性传递过来）
        //**this.props.num是父级传递过来的分组索引，通过子组件点击后将当前索引回调给父组件控制展开
        this.props.onExpand && this.props.onExpand(this.props.num);
        //通过classList切换展开和收缩
        e.target.parentNode.classList.toggle("expanded");
    }

    render() {
        let { data,index,num,flag } = this.props;
        
        return (
            // 只有当分组索引index和当前点击分组num一致时才展开
            <div className={["friend-group", (index===num)? "expanded":""].join(' ')} key={data.title}>
                <dt onClick={this.expand}>{data.title}</dt>
                {
                    data.list.map(key => <dd key={key.name}>{key.name}</dd>)
                }
            </div>
        );
    }
}

export default Item;