/**
 * 编译模块
 * 注意因为传递过来的是this.options，不是this.options.data,
 * 所以Compile中在addEventListener也必须将数据更新到this.options上，否则二次渲染失败
 */

 class Compile extends EventTarget{
     constructor(options){
        super();
        this.options = options;
        // 注意此处compile()方法必须挂载到Compile上
        this.compile();
     }
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
                [...attrs].forEach(attr => {
                    let attrName = attr.name;
                    let attrValue = attr.value;
                    // 获取v-html v-model的v-后面的内容
                    attrName = attrName.substr(2);
                    // 为html时，通过innerHTML获取设置值
                    if (attrName == "html") {
                        node.innerHTML = this.options.data[attrValue];

                        // 为model时，是input框 通过value获取设置值
                    } else if (attrName == "model") {
                        // 注意是给当前节点设置值和加监听，所以使用node,次此处this指向EventTarget
                        // 给input数据框设置初始值
                        node.value = this.options.data[attrValue];
                        // 监听input更改后更新input视图
                        
                        node.addEventListener("input", e => {
                            console.log("attrValue设置了值；", e.target.value);//此处是input框，通过e.target.value获取值
                            this.options.data[attrValue] = e.target.value;
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

 export default Compile;