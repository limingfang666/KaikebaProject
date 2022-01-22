//自动监控storage,如果数据有更新，自动更新视图
window.addEventListener("storage",function(){
  renderPug();
})

window.onload = function () {
  /*
  将是否打开状态存到localStorage中，localStorage.setItem("isOpen",true)，
  当页面关闭时清除开启状态，监听beforeunload事件，当关闭之前先清除开启状态。
  localStorage缓存多个页面可以共享，所以在list中判断如果已经开启就不打开新页面。
  */

  // 因为点击添加按钮，都会打开新窗口，所以需要将是否打开状态存到localStorage中，每次点击时先获取是否打开已经打开就不再打开新窗口
  localStorage.setItem("isOpen", true);
  // 打开窗口同时，将点击的歌曲数据存到localStorage中，detail页面可以进行共享
  if (localStorage.getItem("musicData")) {
    renderPug();
  }


  // 删除和清空列表
  let headContainer = document.querySelector(".headContainer");
  let deleteItemBtn = headContainer.querySelector(".deleteItem");
  let deleteAllBtn = headContainer.querySelector(".deleteAll");
  // console.log(deleteItem.checked);
  deleteItemBtn.addEventListener("click",deleteItem);
  deleteAllBtn.addEventListener("click",deleteAll);
  
}
// 删除歌曲
function deleteItem(){
  let musicData = JSON.parse(localStorage.getItem("musicData"));
  // 找到所有checkbox为checked的项，然后removeItem
  let myUls = document.querySelectorAll(".exchange ul");
  myUls.forEach((ul,index)=>{
    let input = ul.querySelector("input");
    // 删除musicData中对应checked项
    if(input.checked){
       // ul和input的索引值 === musicData数据的索引值（删除时可利用）
      let deleteData = musicData.filter((item,key)=>index!==key);
      localStorage.setItem("musicData",JSON.stringify(deleteData));
      // 注意更改localStorage后，要重新渲染视图
      renderPug();
    }
  });
}
// 清空所有歌曲列表(即清空所有musicData数据，注意localStorage中还有其他数据，所以不能使用clear())
function deleteAll(){
  localStorage.removeItem("musicData");
  renderPug();
}

//渲染详细页歌曲列表
function renderPug(){
  let musicData = JSON.parse(localStorage.getItem("musicData"));
  // 注意html render的位置在.exchange的div中
  let exchange = document.querySelector(".exchange");
  let innerHTML = '';
  musicData && musicData.forEach(music => {
    let content = `
      <ul class="myul">
        <input type='checkbox'/>
        <li>${music.songName}</li>
        <li>${music.album}</li>
        <li>${music.time}</li>
      </ul>
    `;
    innerHTML += content;
  });
  exchange.innerHTML = innerHTML;
}

//    需要在detail页面关闭时需要监听beforeunload关闭事件(注意不是beforeonload)，清除isOpen状态，list页面才知道detail页面是否已经打开
window.addEventListener("beforeunload", function () {
  localStorage.removeItem("isOpen");
});