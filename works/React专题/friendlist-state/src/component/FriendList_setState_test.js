import React from 'react';
import '../css/FriendList.css';

/**
 * setState异步修改
 */
class FriendList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //此处手动控制expanded为true/false时，好友列表会展开/收缩
            expanded : true,
            val:0
        };
        //将改变this绑定挂载到实例上，在onClick时就可以直接使用this.expand了
        this.expand = this.expand.bind(this)
    }

    //事件绑定：用户点击列表
    expand(){
        
        //如果直接将this.state.expanded = !this.state.expanded;取反，会报错，因为react中时间绑定中，this默认指向undefined，所以需要调用时绑定this指向为这个实例
        //React的state控制私有数据，但是需要调用setState()方法才能进行状态更新
        this.setState({
            expanded : !this.state.expanded,
            val: this.state.val + 1
        })

        this.setState({
            val: this.state.val + 1
        })
        this.setState({
            val: this.state.val + 2
        })
        this.setState({
            val: this.state.val + 3
        })
        console.log("setState:"+this.state.val);
    }

    render() {
        //注意解构后的变量名一定要和对象props中已存在的变量名一致
        let { datas } = this.props;
        //通过解构获得expanded标识
        let {expanded} = this.state;

        //发现此处的val永远都是0
        console.log(this.state.val);
        
        return (
            <div className="friend-list">
                {
                    Object.keys(datas).map(item => (
                        // 此处使用JSX中数组输出方式设置多个className的值
                        <div className={["friend-group",expanded && "expanded"].join(' ')} key={item}>
                            <dt onClick={this.expand}>{datas[item].title}</dt>
                            {
                                datas[item].list.map(key=><dd key={key.name}>{key.name}</dd>)
                            }
                        </div>
                    ))
                }

            </div>
        );
    }
}

export default FriendList;