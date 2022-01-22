/**
 * 模拟实现vue功能
 * 功能四：通过new Proxy实现和Object.property()同样功能
 */

class Kvue extends EventTarget {
    //options表示
    constructor(options) {
        super();
        this.options = options;
        this.data = this.options.data;
        this.compile();
        // 数据劫持
        this.observe(this.options.data);
    }
    // 监听数据变化
    observe(data) {
        // new Proxy()方式时不需要再遍历通过key值劫持数据了
        // Object.keys(data).forEach(key => {//key即data中的属性名
        //     this.observeData(data, key, data[key]);
        // });
        let _this = this;
        this.data = new Proxy(data, {
            // target即传入的data原始数据
            get(target, key) {
                return target[key];
            },
            // 此处newValue即传入的改变的数据
            set(target, key, newValue) {
                console.log(target);
                let event = new CustomEvent(key, { detail: newValue });//参数一时间名，参数二传递的数据
                // 需要触发事件
                _this.dispatchEvent(event);
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

    //处理数据，渲染视图
    compile() {
        // 注意此处传入的为#app只有一个元素
        let eles = document.querySelector(this.options.el);
        this.compileNode(eles.childNodes);

    }
    compileNode(childNodes) {
        childNodes.forEach(node => {
            // 循环所有nodes,当nodeType为1时表示为节点，需找到下一个节点直到找到的是文本；为3表示为文本直接正则匹配显示
            if (node.nodeType === 1) {
                // 数据双绑定
                let attrs = node.attributes;//获取属性及属性值
                console.log(attrs);
                [...attrs].forEach(attr => {
                    let attrName = attr.name;
                    let attrValue = attr.value;
                    // 获取v-html v-model的v-后面的内容
                    attrName = attrName.substr(2);
                    console.log(attrName, attrValue);
                    // 为html时，通过innerHTML获取设置值
                    if (attrName == "html") {
                        node.innerHTML = this.data[attrValue];

                        // 为model时，是input框 通过value获取设置值
                    } else if (attrName == "model") {
                        // 注意是给当前节点设置值和加监听，所以使用node,次此处this指向EventTarget
                        // 给input数据框设置初始值
                        node.value = this.data[attrValue];
                        // 监听input更改后更新input视图
                        node.addEventListener("input", e => {
                            console.log("attrValue设置了值；", e.target.value);//此处是input框，通过e.target.value获取值
                            this.data.modelData = e.target.value;
                        });
                    }

                });

                // 判断nodes.length>0则表示还有子节点，需要递归找到下一个节点直到找到的是文本；nodes.length不大于0表示只有一个文本节点，直接匹配显示
                if (node.childNodes.length > 0) {
                    this.compileNode(node.childNodes);
                }
            } else if (node.nodeType === 3) {
                let reg = /\{\{\s*(\S+)\s*\}\}/g;//\{ \}表示精确匹配{},\s*表示message前后可能会有任意个空格，(\S+)表示用组匹配message
                let textContent = node.textContent;
                let test = reg.test(textContent);//注意要使用test方法测试是否匹配再替换
                if (test) {
                    // 初次渲染；
                    let $1 = RegExp.$1;
                    node.textContent = textContent.replace(reg, this.options.data[$1]);

                    // 页面再次渲染
                    //设置监听事件，监听$1即每个data中的key
                    // 注意：自定义事件的用法，因为此处设置了监听，所以在observeData方法中，dispatchEvent(event)触发事件时会自动被监听
                    // 所以此处的e即CustomEvent对象，所以有e.detail属性
                    // console.log(this);//EventTarget {options: {…}, data: {…}}
                    console.log("+++++++++++++");
                    this.addEventListener($1, e => {
                        console.log("设置了值；", e.detail);
                        // 获取设置的值
                        let newValue = e.detail;
                        // 原来数据中的值key ,如message
                        let oldValue = this.options.data[$1];
                        // 全局匹配所有的原有数据
                        let reg = new RegExp(oldValue, "g");
                        // 将原有数据改为更改后的值
                        node.textContent = node.textContent.replace(reg, newValue);
                    });
                }
            }
        });
    }
}