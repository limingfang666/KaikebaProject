class Jq{
    constructor(ele,root){
        // preObject属性：注意preObject属性表示上一次操作的节点，如果不再有上一次操作的节点就返回document（注意也是Jq对象）,使用end()方法获取上一次操作的节点
        // 通过root标识第一次赋值document。只有第一次root没有赋值时才会为undefined，其他时候都会赋值为null
        if(root === "undefined"){
            this.preObject = new Jq(document,null);
        }
        if(root){
            this.preObject = root;
        }
        
        //$()参数通过typeof可知有三种形式：字符串，函数，NodeList。
        if(typeof ele === "string"){
            //如果为string类型，返回获取到的DOM对象（注意获取的可能为多个，所以需要循环）
            let eles = document.querySelectorAll(ele); 
            this.addDom(eles);            
                       
        }else if(typeof ele === "function"){
            // 当ele为function时，将其挂载到window的监听事件DOMContentLoaded上
            window.addEventListener("DOMContentLoaded",ele);
        }else{
            // 当参数为原生节点时:如果typeof ele.length为undefined即代表只有一个原生节点，否则类型为Object
            if(typeof ele.length === "undefined"){
                this[0] = ele;
                this.length = 1;
            }else{
                this.addDom(ele);  //有多个原生节点 
            }
            
        }
    }
    //添加节点
    addDom(eles){
         //循环将节点添加到对象上
        eles.forEach((element,index) => {
            this[index] = element;
        });
        //返回有对象的length属性
        this.length = eles.length;
    }

    //click:注意this.length代表所有的节点数，通过循环this.length即可循环执行所有节点
    click(func){
        for(let i=0;i<this.length;i++){
            this[i].addEventListener("click",func)
        }
    }
    //on():可以绑定多个事件，事件之间通过空格隔开可能存在多个空格需要去重、需要忽略事件的大小写
    on(event,func){
        // 通过replace()方法去掉多个空格，并split出所有事件
        let reg = /\s+/g;//将多个空格去重  \s代表空格
        event = event.replace(reg," ");
        let events = event.split(" ");
        // 循环给所有节点加上事件监听
        for(let i=0;i<this.length;i++){
            for(let j=0;j<events.length;j++){
                events[j] = events[j].toLowerCase();
                this[i].addEventListener(events[j],func)
            }
        }
    }

    // eq()即获取对象上的第几个节点，返回的是一个对象
    eq(index){
        return new Jq(this[index],this);//此处this代表整个Jq对象
    }

    // end()方法：用于获取上一次操作的节点即this.preObject
    end(){
        return this.preObject;
    }
    
    //css方法：参数有三种方式：一个参数（String,Object），两个参数(直接通过拓展运算符获取所有参数)
    css(...arg){
        // 一个参数
        if(arg.length === 1){
            if(typeof arg[0] === "string"){//arg[0]代表css()方法的第一个参数即"width"
                return this.getStyle(this[0],arg[0]);//this代表Jq对象，只有一个参数所以this[0]表示当前DOM节点
            }else{
                // 是对象时，循环设置样式
                for(let prop in arg[0]){
                    this.setStyle(prop,arg[0][prop]);//prop表示属性，arg[0][prop]表示属性值
                }
                

            }
        }else{
            // 两个参数(第一个参数为属性，第二个为属性值)
            this.setStyle(arg[0],arg[1]);

        }
    }
    setStyle(prop,styleVal){
        // cssNumber时判断styleVal如果为number型且不在$.cssNumber中时就加px，否则不加px
        if(typeof styleVal === "number" && !(prop in $.cssNumber)){//注意此处非!的范围 !(prop in $.cssNumber
            styleVal = styleVal+"px";
        }
        //判断所给的属性是否在$.cssHooks中，在则使用用户扩展的$.cssHooks中的set();
        // console.log(prop,styleVal);//wh 200px
        if(prop in $.cssHooks){
           $.cssHooks[prop].set(this[0],styleVal);
        }else{
            this[0].style[prop] = styleVal;//this[0]表示当前节点
        }
    }
    getStyle(ele,prop){
        // console.log(prop,styleVal);//<div id="mydiv1"></div> "wh"
         //判断所给的属性是否在$.cssHooks中，在则使用用户扩展的$.cssHooks中的get();
        if(prop in $.cssHooks){
           return $.cssHooks[prop].get(ele);
        }else{
            return getComputedStyle(ele)[prop];
        }
    }

}

// $.cssNumber
$.cssNumber = {
    animationIterationCount: true,
    columnCount: true,
    fillOpacity: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    pm: true,
    widows: true,
    zIndex: true,
    zoom: true
}
// $.cssHooks
$.cssHooks = {};
//返回的是整个Jq对象
function $(ele){
    return new Jq(ele);//$()函数返还jq对象
}
