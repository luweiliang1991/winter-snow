(function(w){
    //管子的构造函数
    function Pipe(ctx, pipeUp, pipeDown, x, yUp, yDown, speed, space){
        this.ctx = ctx;
        this.pipeUp = pipeUp;//上管子对象
        this.pipeDown = pipeDown//下管子对象
        this.width = pipeUp.width;//管子的实际宽度
        this.height = pipeUp.height;//管子的实际高度
        this.x = x;//管子在画布中x轴的坐标，上下管子的x轴坐标一样
        this.yUp = yUp;//上管子在画布中的y轴坐标
        this.yDown = yDown;//下管子在画布中的y轴坐标
        this.speed = speed || 2;//管子移动的速度
        this.space = space || 150;//上下管子之间的距离

        this._updateHeight();//每一个管子实例高度都不一样
    }

    //往原型上扩展方法
    util.extend(Pipe.prototype, {
        //绘制管子
        draw: function(){
            this.ctx.drawImage(this.pipeUp, this.x, this.yUp);
            this.ctx.drawImage(this.pipeDown, this.x, this.yDown);
            this._drawPath();//每创建一个管子的同时也创建了其自身的路径
        },
        //根据管子的宽度和高度绘制路径
        _drawPath: function(){
            //this.ctx.strokeStyle = 'red';//测试管子路径是否添加成功
            this.ctx.rect(this.x, this.yUp, this.width, this.height);
            this.ctx.rect(this.x, this.yDown, this.width, this.height);
            //this.ctx.stroke();
        },
        //更新下一帧管子的数据
        update: function(){
            this.x -= this.speed;

            if(this.x < -this.width){
                //一共6个管子，管子之间的x轴坐标之间的距离是3个管子的宽度
                this.x += this.width * 6 * 3;
                this._updateHeight();//管子再次返回去重新进入画布中时，再次生成新的高度
            }
        },
        //随机生成管子在画布显示出来的高度，范围是50到300
        _updateHeight: function(){
            var randomHeight = Math.random() * 250 + 50;
            //上管子的y轴坐标
            this.yUp = randomHeight - this.height;
            //下管子在y轴的坐标
            this.yDown = randomHeight + this.space;
        }
    });
    //对外公开Pipe
    w.Pipe = Pipe;
})(window);
