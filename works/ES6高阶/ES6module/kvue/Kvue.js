/**
 * 数据劫持模块
 */
// 引入compile编译模块
import Compile from './Compile.js';
class Kvue {
    //options表示
    constructor(options) {
        this.options = options;
        // 因为使用到Compile模块，而Compile模块中需要使用到options数据，所以传入即可
        // 注意因为传递过去的是this.options，不是this.options.data(直接传递data后，获取节点时获取不到el),所以Compile中在addEventListener也必须将数据加在this.options上，否则二次渲染失败
        this.compile = new Compile(this.options);
        
        // 数据劫持
        this.observe(this.options.data);
    }
    // 监听数据变化
    observe(data) {
        //  new Proxy()方式时不需要再遍历通过key值劫持数据了
        // Object.keys(data).forEach(key => {//key即data中的属性名
        //     this.observeData(data, key, data[key]);
        // });
        let _this = this;
         // 注意因为传递过去的是this.options，所以此处触发监听时也必须针对的是this.options上的数据
        this.options.data = new Proxy(data, {
            // target即传入的data原始数据
            get(target, key) {
                return target[key];
            },
            // 此处newValue即传入的改变的数据
            set(target, key, newValue) {
                let event = new CustomEvent(key, { detail: newValue });//参数一时间名，参数二传递的数据
                // 需要触发事件
                // 因为EventTarget在监听及触发事件时都需要用到，所以Kvue.js和Compile.js都需要用到，而由于Kvue.js引入了Compile，所以可以使用到Compile中的监听进行触发
                _this.compile.dispatchEvent(event);
                return target[key] = newValue;
                
            }
        });
        
    }
    // 通过Object.defineProperty劫持数据变化
    // observeData(data, key, value) {
    //     let _this = this;
    //     Object.defineProperty(data, key, {
    //         configurable: true,
    //         enumerable: true,
    // get() {
    //     console.log("get----");
    //     return value;
    // },
    // set(newValue) {
    //     console.log("set----", newValue);
    //     let event = new CustomEvent(key, { detail: newValue });//参数一时间名，参数二传递的数据
    //     // 需要触发事件
    //     _this.dispatchEvent(event);
    //     return value = newValue;//set()方法返回更新后的数据
    // }
    //     });
    // }
}

export default Kvue;