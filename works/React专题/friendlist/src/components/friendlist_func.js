// 注意写组件时只要用到了JSX都需要引入react
import React from 'react';
import '../css/FriendList.css';

//函数式组件外部传入数据是通过函数参数进行接收
function FriendListFunc(props){
    // 将外部传入的数据进行结构
    let {data} = props;
    
    //注意一个组件中只能有一个return
    return (
        <div className="friend-list">
            {
                Object.keys(data).map(key=>(
                    <div className="friend-group" key={key}>
                        <dt>{data[key].title}</dt>
                        {
                            // 注意map()括号中由于只有一个参数所以可以直接跟返回值，而JSX代码不止一行需要使用()括号括起来方便代码查看，不括起来也不会出错
                            data[key].list.map(dd=>(
                                <dd key={dd.name}>{dd.name}</dd>
                            ))
                        }
                    </div>
                ))
            }
          
      </div>
  );
}

export default FriendListFunc;