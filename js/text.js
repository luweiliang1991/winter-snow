(function(w){
    //绘制文字的构造函数
    function Text(ctx, startTime, text, x, y, fillStyle, align, baseline, font){
        this.ctx = ctx;
        this.startTime = startTime;//小鸟开始飞行的时间
        this.text = text;//绘制到画布上的文字
        this.x = x;//绘制文字在画布上x轴的坐标
        this.y = y;//绘制文字在画布上y轴的坐标
        this.fillStyle = fillStyle;//绘制填充文字的填充色
        this.align = align || 'center';//绘制文字横向对齐方式
        this.baseline = baseline || 'bottom';//绘制文字纵向对齐方式
        this.font = font || '400 20px 宋体';//绘制文字的样式

        this.update();//保证已创建文字的实例化对象就会显示文字
    }

    //往Text原型上添加方法
    util.extend(Text.prototype, {
        //绘制填充文字
        draw: function(){
            this.ctx.save();//保存当前状态

            this.ctx.fillStyle = this.fillStyle;
            this.ctx.textAlign = this.align;
            this.ctx.textBaseline = this.baseline;
            this.ctx.font = this.font;
            this.ctx.fillText(this.text, this.x, this.y);

            this.ctx.restore();//回滚到原来状态，保证上面的设置只对填充文字有作用，不影响其他代码
        },
        //更新下一帧的显示时间
        update: function(){
            var runTime = Date.now() - this.startTime;//小鸟飞行持续的时间
            /*
            * h：1000*60*60就是一个小时的毫秒数，runTime / (1000 * 60 * 60)整数部分就是小时数
            * m：1000*60就是一分钟的毫秒数,runTime % (1000 * 60 * 60)的余数除以每分钟的毫秒数的整数部分就是分钟数
            * s：除以分钟的毫秒数之后的余数再除以1000就是秒数
            * */
            var h = Math.floor(runTime / (1000 * 60 * 60));
            var m = Math.floor(runTime % (1000 * 60 * 60) / (1000 * 60));
            var s = Math.floor(runTime % (1000 * 60) / 1000);
            s = s > 9 ? s : ('0' + s);

            this.text = '小鸟飞行了'+h+'小时'+m+'分钟'+s+'秒';
        }
    });

    //对外公开Text
    this.Text = Text;
})(window);
