/**
 * Created by lvtianyu on 16/9/2.
 */

export default  {
  bind : function() {

  },
  update : function(fn) {
    var self = this; //存下this，方便以后用
    //在directive上绑定的属性和方法
    //都可通过self.xxx   self.touchstart()获取
    self.tapObj = {}; //初始化我们的tap对象
    if(typeof fn !== 'function') {
      //你别给我搞事！
      return console.error('The param of directive "v-tap" must be a function!');
    }

    //把我们的start和end剥离出来，写在directive上
    //由于只有tap事件，所以我们在move过程就不需要做处理
    this.el.addEventListener('touchstart',function(e) {
      //  e.stopPropagation();
      self.touchstart(e,self);
    },false);

    this.el.addEventListener('touchend',function(e) {
            //  e.stopPropagation();
      self.touchend(e,self,fn);
    },false);

  },
  unbind : function() {},
  isTap : function() {
    var tapObj = this.tapObj;
    return this.time < 150 && Math.abs(tapObj.distanceX) < 2 && Math.abs(tapObj.distanceY) < 2;
  },
  touchstart : function(e,self) {
    var touches = e.touches[0];
    var tapObj = self.tapObj;
    tapObj.pageX = touches.pageX;
    // tapObj.pageY = touches.pageY;
    tapObj.clientX = touches.clientX;
    // tapObj.clientY = touches.clientY;
    self.time = +new Date();
  },
  touchend : function(e,self,fn) {
    var touches = e.changedTouches[0];
    var tapObj = self.tapObj;
    self.time = +new Date() - self.time;
    tapObj.distanceX = tapObj.pageX - touches.pageX;
    // tapObj.distanceY = tapObj.pageY - touches.pageY;
    var fnObj = fn();
    if(tapObj.distanceX >50){
      // alert(tapObj.distanceX )
      fnObj.add(fnObj.that);
    }else if(tapObj.distanceX <-50){
      // console.log('像右移动');
            // alert(tapObj.distanceX )
      fnObj.reduce(fnObj.that);
    }
    
  }
}





