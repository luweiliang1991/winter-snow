(function(w){
    //通过图片路径获取图片对象并传给要使用的函数
    function getImage(imgPath, callback){
        //传入的图片路径对象没有length这个属性就抛出异常，length的值是路径的个数
        if(!imgPath.length){
            throw 'imgPath没有length属性';
        }

        /*
        * 定义全局变量
        * imgObj：存储图片对象的对象
        * img：通过Image()构造函数创建一个实例化对象
        * count：计数变量
        * */
        var imgObj = {}, img, count = 0;

        for(var key in imgPath){
            //当循环到length属性时，停止当前循环继续下一次循环，不要把length属性存入到imgObj对象当中
            if(key === 'length'){
                continue;
            }
            img = new Image();
            img.src = imgPath[key];

            imgObj[key] = img;
            /*
            * 给没有图片对象添加一个onload事件，当图片每次加载时，count+1
            * 当count与length相同时，说明图片全部加载完成了
            * 把imgObj传入参数函数调用
            * */
            img.addEventListener('load', function(){
                count++;
                if(count === imgPath.length){
                    callback(imgObj);
                }
            })
        }
    }

    //对外公开getImage
    w.getImage = getImage;
})(window);
