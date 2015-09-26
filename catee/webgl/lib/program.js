var extend = function (src, obj) {
  if (typeof src !== 'object' || typeof obj !== 'object') {
    return src;
  }
  var list = Object.getOwnPropertyNames(obj);
  var len = list.length - 1;
  if (len < 0 ) {
    return src;
  }
  do {
    src[list[len]] = obj[list[len]];
  } while (len --)
  return src;
}

var Canvas, WGL, State;

Canvas = function (opts) {
  var canvas = querySelector(opts.canvas || 'canvas'),
    wrap = canvas.parentNode; 
  extend(this, {
    config: {},
    data: {},
    canvas: canvas,
    wrap: wrap,
    timer: []
  });
  this.init();
};

Canvas.prototype = {

  constructor: Canvas,

  init: function () {
  },



}
