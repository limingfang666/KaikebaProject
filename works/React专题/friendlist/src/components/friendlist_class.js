import React from "react";

class FriendListClass extends React.Component{
    //类式组件外部传入的数据，需要通过构造函数的参数进行接收
    constructor(props){
        // 当子类重写constructor ，则必须调用父类super类的知识点
        super(props);

        // 把接收到的参数传入父类构造函数，父类构造函数中会创建一个对象属性：<u>props</u> 类存储传入的参数数据
        this.props = props;
    }
    //注意render(){ return () }结构不能写错
    render(){
        let {data} = this.props;
        
        return (
            <div className="friend-list">
                {
                    Object.keys(data).map(key => (
                        <div className="friend-group" key={key}>
                            <dt>{data[key].title}</dt>
                                {
                                    data[key].list.map(item=>(
                                    <dd key={item.name}>{item.name}</dd>
                                    ))
                                }
                        </div>
                    ))
                }
            
            </div>
        );
    }
}

//不管是函数组件还是类式组件都需要导出
export default FriendListClass;