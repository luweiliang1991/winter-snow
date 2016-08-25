var util = {
    //扩展属性
    extend: function(o1, o2){
        for(var key in o2){
            o1[key] = o2[key];
        }
    },
    //把角度转化为弧度
    angleToRad: function(angle){
        return Math.PI / 180 * angle;
    }
}
