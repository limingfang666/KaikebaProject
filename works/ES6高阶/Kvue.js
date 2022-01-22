/**
 * 模拟实现vue功能
 * 功能一：实现页面数据初次渲染
 */

 class Kvue{
    //options表示
    constructor(options) {
        this.options = options;
        this.data = this.options.data;
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
            if(node.nodeType==1){
                 // 判断nodes.length>0则表示还有子节点，需要递归找到下一个节点直到找到的是文本；nodes.length不大于0表示只有一个文本节点，直接匹配显示
                if(node.childNodes.length>0){
                    this.compileNode(node.childNodes);
                }
            } else if(node.nodeType === 3){
                let reg = /\{\{\s*(\S+)\s*\}\}/g;//\{ \}表示精确匹配{},\s*表示message前后可能会有任意个空格，(\S+)表示用组匹配message
                let textContent = node.textContent;
                let test = reg.test(textContent);//注意要使用test方法测试是否匹配再替换
                if (test) {
                    // 初次渲染；
                    let $1 = RegExp.$1;
                    node.textContent = textContent.replace(reg, this.options.data[$1]);
                }
            }
        });
    }
}