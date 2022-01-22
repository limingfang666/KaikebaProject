define(function () {
    return class Cart {
        add(item) {
            console.log("m1模块");
            console.log(`添加商品：${item}`, item)
        }
    };
});