(function (win, doc) {

  var WGL = function (opts) {
    var canvasWrap = doc.getElementById(opts.wrap),
      canvas = doc.getElementById(opts.canvas);

    this.extend({
      data: {},
      config: {},
      wrap: canvasWrap,
      canvas: canvas,
      autoResizeTimer: null,
      afterResize: opts.afterResize || function () {
      }
    }, this);

    this.extend({
      wrapHeight: 0,
      wrapWidth: 0,
      isAutoResize: true
    }, this.config);

    this.init();
  }

  WGL.prototype = {

    constructor: WGL,

    init: function () {
      this.resize(this)();
      this.bind();
    },

    bind: function () {
      var self = this,
        config = self.config;

      config.isAutoResize && win.addEventListener('resize', self.resize(self, 100), false);
    },

    resize: function (that, time) {
      return function () {
        if (time) {
          clearTimeout(that.autoResizeTimer);
          that.autoResizeTimer = setTimeout(function () {
            that.doResize();
          }, time);
        } else {
          that.doResize();
        }
      }
    },

    doResize: function () {
      var self = this,
        wrap = self.wrap,
        canvas = self.canvas,
        config = self.config;
      var canvasWrapHeight = wrap.offsetHeight,
        canvasWrapWidth = wrap.offsetWidth;
      canvas.setAttribute('height', canvasWrapHeight);
      canvas.setAttribute('width', canvasWrapWidth);
      self.extend({
        wrapHeight: canvasWrapHeight,
        wrapWidth: canvasWrapWidth
      }, config);
      self.afterResize && self.afterResize();
    },

    extend: function (s, t) {
      if (! (s instanceof Object)) {
        return t;
      }
      var list = Object.getOwnPropertyNames(s),
        len = list.length;
      if (! len) {
        return;
      }
      var t = t || this.data;
      var i = len - 1;
      do {
        t[list[i]] = s[list[i]];
      } while (list[i --])
      return t;
    }

  };

  win.WGL = WGL;

})(window, document);