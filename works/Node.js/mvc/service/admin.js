//后台管理：处理数据逻辑controllor
let adminData = require("../data/data.json");
//引入fs模块进行数据持久化到data.json
const fs = require("fs");
module.exports = {
    adminData,
    //获取分页数据
    getSliceData(pageNum, pageSize) {
        return adminData.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    },
    //添加新闻持久化
    async addNewsInfo(request) {
        // 将ctx.request中的数据解构出来
        let { body: { title, content, country, type }, files: { imgUrl } } = request;

        // 注意添加数据时id的自增长
        let id = adminData[adminData.length - 1].id + 1;
        let date = new Date();

        // 将图片通过fs模块进行转存:文件的path路径只是临时路径，需要将文件转存到/img下
        if (typeof imgUrl !== "undefined") {
            // 通过fs.readFileSync(path)读取出临时路径中的二进制数据，然后写入到static/img/name文件中,注意存的时候需要static路径，读的时候不需要
            fs.writeFileSync("static/admin/img/" + imgUrl.name, fs.readFileSync(imgUrl.path));
            // 文件写入完成后，将文件路径进行保存
            imgUrl = "/img/" + imgUrl.name;
        }

        adminData.push({
            "id": id,
            "title": title,
            "content": content,
            "addTime": date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
            "country": country,
            "type": type,
            "imgUrl": imgUrl
        });

        //注意要将整个数据，写到data.json中才算是真正的数据持久化，写入成功或失败都需要将成功或失败状态返回给controllor
        // 注意return方式，是return Promise对象，不是在判断错误后return reject()或resolve()
        return new Promise((resolve, reject) => {
            fs.writeFile("./data/data.json", JSON.stringify(adminData), { flag: 'w' }, err => {
                if (err) {
                    // 注意因为返回的是Promise对象，所以成功或失败信息需要写到reject()或resolve()方法中
                    // reject({code:0,msg:'添加失败',p:Math.ceil(adminData.length/4)});//,通过p跳转到新闻列表最后一页，4表示每页多少条
                    reject({ code: 0, msg: '添加失败' });
                } else {
                    // resolve({code:1,msg:'添加成功',p:Math.ceil(adminData.length/4)});
                    // 仍然返回到添加新闻也是不需要p页码
                    resolve({ code: 1, msg: '添加成功' });
                }
            });
        });
    },

    //删除新闻
    async deleteNews(id, pageNum, pageSize) {
        // 删除新闻需要持久化newsData数据
        let filterData = adminData.filter(item => id != item.id);
        // 删除后需要重新分页，所以需要重新得到pageTotal和pageNum，并传递给controllor层
        let pageTotal = Math.ceil(filterData.length / pageSize);
       
        if(pageNum>pageTotal){
            pageNum = pageTotal;
        }
        let pagerData = filterData.slice((pageNum - 1) * pageSize, pageNum * pageSize);
        
        return new Promise((resolve, reject) => {
            fs.writeFile("./data/data.json", JSON.stringify(filterData), { flag: 'w' }, err => {
                if (err) {
                    reject({ code: 0, msg: '删除失败', pagerData,pageTotal,pageNum });
                }
                    resolve({ code: 1, msg: '删除成功', pagerData,pageTotal,pageNum });
            });
        });
    }
}