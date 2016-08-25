(function(w){
    //大地构造函数
    function Land(ctx, img, x, y, speed){
        Sky.apply(this,arguments);//继承天空构造函数中所有属性,并改变Sky内部的this指向
    }

    /*
    * 让Land的原型指向Sky的实例化对象，那么Land的实例化对象就可以访问Sky原型上的方法
    * */
    Land.prototype = Object.create(Sky.prototype);

    //在Land原型上扩展update方法,把原来的update的方法覆盖掉
    util.extend(Land.prototype, {
        update: function(){
            this.x -= this.speed;
            //之所以要四张大地的图片，也是为了让大地可以在画布上无缝连续的移动
            if(this.x < -this.width){
                this.x += this.width * 4;
            }
        }
    });

    //对外公开Land
    w.Land = Land;
})(window);
