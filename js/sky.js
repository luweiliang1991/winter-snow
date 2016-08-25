(function(w){
    //天空背景构造函数
    function Sky(ctx, img, x, y, speed){
        this.ctx = ctx;//绘制环境对象
        this.img = img;//天空背景图对象
        this.width = img.width;//天空背景图实际宽度
        this.height = img.height;//天空背景图实际高度
        this.x = x || 0;//天空背景图在画布的x轴坐标
        this.y = y || 0;//天空背景图在画布的y轴坐标
        this.speed = speed || 2;//天空背景图在画布中x轴方向向左移动的速度
    }

    //往Sky原型上扩展函数
    util.extend(Sky.prototype, {
        //绘制天空背景图到画布
        draw: function(){
            this.ctx.drawImage(this.img, this.x, this.y);
        },
        //更新下一帧背景图的数据
        update: function(){
            //图片向左移动x轴坐标在减小
            this.x -= this.speed;
            //当图片全部移除画布时，让其x轴坐标回到第二张图的后面，即距自身2个宽度的位置
            if(this.x < -this.width){
                this.x += this.width * 2;
            }
        }
    });

    //对外公开Sky
    w.Sky = Sky;
})(window);
