window.onload = function () {
    // // localStorage本地缓存测试
    // // 设置localStorage缓存
    // localStorage.setItem("test1","testValue1");
    // localStorage.setItem("test2","testValue2");
    // // 获取localStorage缓存
    // console.log(localStorage.getItem("test1"));//testValue1
    // // 删除某个localStorage缓存
    // localStorage.removeItem("test1");
    // console.log(localStorage.getItem("test1"));//null
    // console.log(localStorage.getItem("test2"));//testValue2
    // // 删除所有localStorage缓存
    // localStorage.clear();
    // console.log(localStorage.getItem("test1"));//null
    // console.log(localStorage.getItem("test2"));//null

    // // sessionStorage本地缓存测试
    // // 设置sessionStorage缓存
    // sessionStorage.setItem("session1","sessionValue1");
    // sessionStorage.setItem("session2","sessionValue2");
    // //获取sessionStorage缓存
    // console.log(sessionStorage.getItem("session1"));//sessionValue1
    // console.log(sessionStorage.getItem("session2"));//sessionValue2
    // //删除某个sessionStorage缓存
    // sessionStorage.removeItem("session1");
    // console.log(sessionStorage.getItem("session1"));//null
    // console.log(sessionStorage.getItem("session2"));//sessionValue2
    // // 删除所有sessionStorage缓存
    // sessionStorage.clear();
    // console.log(sessionStorage.getItem("session1"));//null
    // console.log(sessionStorage.getItem("session2"));//null


    // 通过点击换肤按钮后实现换肤功能
    // 注意button中使用onclick方法无法调用到此处方法，所以必须获取到button元素，再添加onclick方法
    let changeSkin = document.querySelector(".changeSkin");
    let colorArr = ["white", "rgb(204,232,207)", "rgb(200,200,169)", "rgb(114,111,128)"];
    let body = document.querySelector("body");
    let index = 0;//点击换肤按钮标志

    // 每次刷新时，判断是否存在cookie设置的index,存在则显示已有的。 document.cookie没有时为空字符串为false
    // 如果isColor没有设置，getCookie("isColor")为undefined，也为false
    // // if(document.cookie){
    // if(getCookie("isColor")){
    //     // 直接获取cookie信息
    //     // index = parseInt(document.cookie.split("=")[1]);
    //     // 通过封装方法获取cookie信息
    //     index = parseInt(getCookie("isColor"));
    //     body.style.backgroundColor = colorArr[index];
    // }

    // 通过localStorage实现换肤功能
    let indexVal = localStorage.getItem("bgColor");
    if (indexVal) {
        index = parseInt(indexVal);
        body.style.backgroundColor = colorArr[index];
    }

    changeSkin.addEventListener("click", function () {
        // 每点击一次换肤按钮，index++
        index++;
        // 当index值>colorArr数组长度时，重新回到第一个颜色
        index = index >= colorArr.length ? 0 : index;
        // 设置背景颜色
        body.style.backgroundColor = colorArr[index];
        // js中存储cookie
        // 将背景颜色(index值)保存到cookie中
        // document.cookie = "bgColor="+index+"; Max-Age="+(3600*24*7);
        // 通过自定义封装方法设置cookie
        // setCookie("bgColor",index,{
        //     "Max-Age":3600*24*7,path:"/",domin:"localhost:8989"
        // });

        // 通过localStorage实现换肤功能——设置
        localStorage.setItem("bgColor", index);
    });

    //控制listContainer移入时btnController显示，移出时隐藏
    let uls = body.querySelectorAll(".listContainer");
    uls.forEach((ul, index) => {
        let btn = ul.querySelector(".btnController");
        if (btn) {
            ul.addEventListener("mouseover", function () {
                btn.style.display = "block";
            });
            ul.addEventListener("mouseout", function () {
                btn.style.display = "none";
            });
        }
    })

}

//显示详细页
function showDetail(musicData) {
    // 页面带过来的数据才会有id
    // 如果localStorage中已经存在musicData，就获取原有数据并push进新的数据
    if (localStorage.getItem("musicData")) {
        let localData = JSON.parse(localStorage.getItem("musicData"));
        // 判断原有数据和要添加的数据一样，就不添加
        localData.forEach(item=>{
            // 没找到id相同的数据时添加(注意：等于的数据只有一条，不等的有多天，所以过滤==时效率更高)
            if(!localData.find(item=>item.id==musicData.id)){
                localData.push(musicData);
                localStorage.setItem("musicData", JSON.stringify(localData));
            }
        });
    }else{
        localStorage.setItem("musicData", JSON.stringify([musicData]));//注意localStorage中的数据是数组
    }

    // 每次点击时先判断窗口是否已经打开(如果detail关闭会removeItem(),结果为null)
    if (!localStorage.getItem("isOpen")) {
        // 在页面打开前将数据存储到localStorage中，detail页面再获取一次（数据为拼接后的html）
        // window.open是以get方式发起请求
        window.open("/detail");
    }
}

// 如果设置多个key=value获取时会相当麻烦，所以将设置和获取cookie封装成函数
//设置cookie
// name，value为自己需要设置的cookie标志，options为对cookie设置的过期时间等配置
function setCookie(name, value, options = {}) {
    console.log(name, value, options);
    let cookieData = `${name}=${value}; `;

    //循环将options对象中的数据，组装成key=value形式
    for (let key in options) {
        let str = `${key}=${options[key]}; `;
        // 将原有的name=value和str值进行连接
        cookieData += str;
    }
    document.cookie = cookieData;//bgColor=1; Max-Age=604800; path=/; domin=localhost:8989; 
}

//获取cookie
// setCookie()不管设置了多少options配置，获取到的值都只有name=value,没有options,所以只需要处理name=value即可
function getCookie(name) {
    return document.cookie.split("=")[1];
}
