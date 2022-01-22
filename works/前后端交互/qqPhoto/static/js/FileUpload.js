/**
 * 图片处理类
 */
class FileUpload{
    constructor(file){
        this.file = file;
        // 每个图片有自己的节点
        this.ele = this.ele;
    }
    // 图片上传（一张一张上传，所以只会处理一张图片）
    uploadImg(url){
        let xhr = new XMLHttpRequest();
        // 使用FormData对象实现上传
        let formData = new FormData();
        formData.append("imgFile",this.file);
        
        xhr.open("post",url,true);

        xhr.onload = function(){
            console.log(xhr.responseText);
            return xhr.responseText;
        };
        // 没选择文件需要提示，否则会报错
        if(this.file!=null){
            xhr.send(formData);
        }else{
            alert("请选择文件");
        }
    }
}

export default FileUpload;