import React from 'react';
import '../css/FriendList.css';

/**
 * 用户手动控制好友列表展开/收缩
 */
class FriendList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //此处手动控制expanded为true/false时，好友列表会展开/收缩
            expanded : true
        };
    }
    render() {
        //注意解构后的变量名一定要和对象props中已存在的变量名一致
        let { datas } = this.props;
        //通过解构获得expanded标识
        let {expanded} = this.state;

        return (
            <div className="friend-list">
                {
                    Object.keys(datas).map(item => (
                        // 此处使用JSX中数组输出方式设置多个className的值
                        <div className={["friend-group",expanded && "expanded"].join(' ')} key={item}>
                            <dt>{datas[item].title}</dt>
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