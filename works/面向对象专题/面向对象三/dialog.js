/*
    思路：封装；渲染视图；各种方法封装；事件委托实现方法封装；取消确定回调；自定义事件实现回调
*/
class Dialog {
    //传入的是调用对话框的自定义配置，当没有传入某些配置时，需要有默认配置
    constructor(options) {
        //使用Object.assign(a,b)方法将自定义配置和默认配置进行合并
        let newOptions = Object.assign({
            width: "40%",
            height: "250px",
            title: "默认标题",
            content: "默认内容",
            dragable: true, //是否可拖拽
            maskable: true, //是否有遮罩
            isCancel: true //是否有取消
        }, options);
        this.opts = newOptions;
        this.init();
    }
    //对话框显示方法:将对话框的k-wrapper和k-dialog样式设置为显示即可
    open() {
        //判断有遮罩层时k-wrapper才显示
        this.opts.maskable && (this.dialogEle.querySelector(".k-wrapper").style.display = "block");
        this.dialogEle.querySelector(".k-dialog").style.display = "block";
    }
    //取消，确定，X点击时关闭对话框
    close() {
        this.opts.maskable && (this.dialogEle.querySelector(".k-wrapper").style.display = "none");
        this.dialogEle.querySelector(".k-dialog").style.display = "none";
    }

    //取消时回调
    cancel() {
        console.log("点击取消了");
    }
    //确认时回调
    confirm() {
        console.log("点击确认了");
    }
    //组件初始化方法
    init() {
        this.renderDialog();
        
        //如果设置了可拖拽就调用
        this.opts.dragable && this.drag();

        //事件委托方法：当取消，确定，X点击时，关闭对话框
        this.dialogEle.addEventListener("click", e => {
            //注意：此处要使用箭头函数，this才会指向  实例化对象       
            switch (e.target.className) {
                case "k-close":
                    this.opts.cancel();
                    this.close();
                    break;
                case "k-default":
                    this.opts.cancel();
                    this.close();
                    break;
                case "k-primary":
                    this.opts.confirm();
                    this.close();
                    break;
            }
        });
    }
    //渲染初始化对话框样式
    renderDialog() {
        let dialogEle = document.createElement("div");
        dialogEle.innerHTML = `
            <div class="k-wrapper"></div>
            <div class="k-dialog" style="width:${this.opts.width};height:${this.opts.height}">
                <div class="k-header">
                    <span class="k-title">${this.opts.title}</span><span class="k-close">X</span>
                </div>
                <div class="k-body">
                    <span>${this.opts.content}</span>
                </div>
                <div class="k-footer">
                ${this.opts.isCancel ? '<span class="k-default">取消</span>' : ''}
                    <span class="k-primary">确定</span>
                </div>
            </div>
        `;
        document.querySelector("body").appendChild(dialogEle);
        //将生成的dialog挂载在实例化后的对象上，使用时才能通过实例化获取对应某个对话框并进行处理
        this.dialogEle = dialogEle;
    }

    //拖拽:k-dialog
    drag(){
        let dialog = this.dialogEle.querySelector(".k-dialog");
        dialog.addEventListener("mousedown",function(ev){
            let e = ev || window.event;
            let l = e.clientX - dialog.offsetLeft;
            let t = e.clientY - dialog.offsetTop;

            function move(e){
                let ev = e || window.event;
                dialog.style.left = ev.clientX - l + "px";
                dialog.style.top = ev.clientY - t + "px";
            }
            document.addEventListener("mouseover",move);
            document.addEventListener("mouseup",function(){
                document.removeEventListener("mouseover",move);
            },{
                once:true
            });
            e.preventDefault();
        });
    }
}