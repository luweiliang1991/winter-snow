(function(w){
    //小鸟构造函数
    function Bird(ctx, img, x, y, sizeW, sizeH, index, speed, speedPlus){
        this.ctx = ctx;
        this.img = img;
        this.width = img.width / 3;
        this.height = img.height;
        this.x = x || 15;
        this.y = y || 15;
        this.sizeW = sizeW || this.width;
        this.sizeH = sizeH || this.height;
        this.index = index || 0;//控制三张不同小鸟切换
        this.speed = speed || 1;//小鸟竖直方向的速度

        this.speedPlus = speedPlus || 0.1;//小鸟竖直方向的加速度

        this._bind();//创建小鸟实例就有点击事件
    }

    util.extend(Bird.prototype, {
        //绘制小鸟在画布上
        draw: function(){
            this.ctx.save();//保存当前属性
            //把坐标系的原点移动到小鸟的中心点
            this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            //速度每增加1，坐标系旋转10度,但是不能超过90度
            var angle = this.speed * 10;
            angle = angle > 90 ? 90 : angle;
            var rad = util.angleToRad(angle);//把角度转为弧度
            this.ctx.rotate(rad);//旋转坐标系
            this.index = ++this.index > 2 ? 0 : this.index;
            //绘制小鸟中心点与坐标系原点重合，那么要x轴坐标是负的宽度一半，y轴是负的高度一半
            this.ctx.drawImage(this.img, this.index * this.width, 0, this.width, this.height,
                -this.sizeW / 2, -this.sizeH / 2, this.sizeW, this.sizeH);

            //回滚为原来的状态，保证上述坐标的移动和旋转只是对小鸟有作用，对其他的代码没有影响
            this.ctx.restore()
        },
        //更新下一帧小鸟的数据
        update: function(){
            //小鸟在竖直方向运动要改变y轴坐标
            this.y += this.speed;

            //小鸟越往下速度越快所以速度在变大
            this.speed += this.speedPlus;
        },
        //给画布添加点击事件，点击画布时小鸟向上飞
        _bind: function(){
            var self = this;//记录小鸟实例的这个this
            //this.ctx.canvas这才是画布
            this.ctx.canvas.addEventListener('click', function(){
                //当小鸟的速度为负数时y轴坐标会减小这是小鸟就会往上飞了
                self.speed = -2;
            });
        }
    });

    //对外公开Bird
    w.Bird = Bird;
})(window);
