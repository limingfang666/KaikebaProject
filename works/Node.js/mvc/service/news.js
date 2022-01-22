//新闻列表：处理数据逻辑controllor
let newsData = require("../data/data.json");
module.exports = {
    newsData,
    //获取分页数据
    getSliceData(pageNum,pageSize){
        return newsData.slice((pageNum-1)*pageSize,pageNum*pageSize);
    },
    getDetailDataById(id){
        return newsData.find(item=>id == item.id);
    }
};