
//通过id名获取元素
function _id(idName){
    return document.getElementById(idName);
}

//通过CSS选择器获取一个元素
function _selector(parent,selector){
    return parent.querySelector(selector);
}

//通过CSS选择器获取一组元素
function _selectorAll(parent,selectors){
    return parent.querySelectorAll(selectors);
}

//解决浏览器兼容问题：通过el.currentStyle判断返回true代表在IE浏览器下，为false就不是在IE浏览器下。在IE浏览器下必须使用el.currentStyle才行
function currStyle(el,styleName){
    // var curStyle = '';
    // if(el.currentStyle){
    //     curStyle = el.currentStyle[styleName];
    // }else{
    //     curStyle = getComputedStyle(el)[styleName];
    // }
    // return curStyle;
    //使用三元获取返回值
    return el.currentStyle?el.currentStyle[styleName]:getComputedStyle(el)[styleName];
}