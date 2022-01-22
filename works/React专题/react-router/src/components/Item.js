import React from 'react';

class Item extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        //此处可得到所有传过来的history,match,location,items所有数据
        // let {history,match:{params:{id}},location,items} = this.props;
        let {match:{params:{id}},items:{items}} = this.props;
        //通过传递过来的id匹配到数据中的数据,注意从match.params中获得的id是string，必须转为数字类型
        let itemInfo = items.find(item=>item.id === Number(id));
             
        return itemInfo ? (
            <div>
              <h2>商品详情 - {itemInfo.name}</h2>
              <dt>ID</dt>
              <dd>{itemInfo.id}</dd>
              <dt>名称</dt>
              <dd>{itemInfo.name}</dd>
              <dt>价格</dt>
              <dd>￥ {(itemInfo.price/100).toFixed(2)}</dd>
            </div>
          ) : <div>获取商品详情出错</div>;
    }
}

export default Item;