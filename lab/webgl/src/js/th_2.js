;(function (win, doc) {

  var WebGL = function (opts) {
    this.config = {
      wrap: doc.getElementById('canvasWrap'),
      container: doc.getElementById('canvas'),
      flag: 'catee'
    };
    this.position = {};
    opts = opts || {};
    this.extend(opts).init();
  }

  WebGL.prototype = {

    constructor: WebGL,

    init: function () {
      this.initRenderer().initScene().initCamera().initLight().build().bind();
    },

    initScene: function () {
      return this.extend({
        'scene': new THREE.Scene()
      })
    },

    initCamera: function () {
      var self = this,
        config = self.config,
        conWidth = config.container.offsetWidth,
        conHeight = config.container.offsetHeight;
      return this.extend({
        'camera': new THREE.PerspectiveCamera(45, conWidth / conHeight, 1, 1000)
      })
    },

    initRenderer: function () {
      return this.extend({
        'renderer': new THREE.WebGLRenderer({
          antialias: true,
          canvas: this.config.container
        })
      })
    },

    initLight: function () {
      return this.extend({
        'light': new THREE.DirectionalLight()
      })
    },

    addObjects: function () {
      var self = this,
        config = self.config;
      config.initObjects && config.initObjects.call(self);
      return self;
    },

    bind: function () {
      var self = this,
        container = self.config.container,
        handler = self.config.handler || {};
      for (var o in handler) {
        var obj = handler[o];
        container.addEventListener(obj.t, obj.h.call(self), false);
      }
      return self;
    },

    unbind: function (type, handler) {
      var self = this,
        container = this.config.container;
      container.removeEventListener(type, handler);
    },

    build: function () {
      var self = this,
        config = self.config,
        renderer = config.renderer,
        camera = config.camera,
        light = config.light,
        scene = config.scene,
        container = config.container,
        conWidth = container.offsetWidth,
        conHeight = container.offsetHeight;
      // renderer
      renderer.setClearColor(0xcccccc);
      renderer.setSize(conWidth, conHeight);
      // camera
      /*self.extend({
        fov: 45,
        near: 1,
        far: 1000,
        aspect: conWidth / conHeight
      }, camera);*/
      camera.position.set(0, 0, 5);
      // light
      self.extend({
        color: new THREE.Color(0xffffff),
        intensity: 1
      }, light);
      light.position.set(0, 0, 1);
      // add
      scene.add(light);
      // objects
      self.addObjects();
      return self;
    },

    /*start: function () {
      this.render()(this);
    },*/

    /*render: function () {
      return function (that) {
        config = that.config;
        config.renderer.render(config.scene, config.camera);
        config.animate && config.animate(this);
        requestAnimationFrame(that.start());
      };
    },*/

    /*render: function () {
      var config = this.config;
      config.renderer.render(config.scene, config.camera);
      config.animate && config.animate();
      requestAnimationFrame(this.render);
    },*/

    extend: function (opts) {
      var self = this;
      var obj = arguments[1] || self.config;
      // console.log(obj);
      if (opts && opts instanceof Object) {
        for (var o in opts) {
          obj[o] = opts[o];
        }
      };
      return self;
    }
  };

  win.WebGL = WebGL;

})(window, document);

// var i = 0;
var objects = {}, position = {};
var webgl = new WebGL({
  /*animate: function (that) {
    //debugger;
    i ++;
    var j = i.toString(16);
    var len = j.length;
    if (len > 6) {
      j = '';
      len = 0;
    }
    var temp = '@' + Math.pow(10, (6 - len)).toString() + j;
    temp = temp.replace(/@1/, '#');
    that.config.renderer.setClearColor(temp);
    console.log(temp);
  }*/

  animate: function () {
    objects['cube'].rotation.x -= 0.002;
    objects['cube'].rotation.y -= 0.007;
    objects['cube'].rotation.z -= 0.003;
  },

  initObjects: function () {
    // 1
    var mapUrl = 'src/img/b.jpg';
    var map = THREE.ImageUtils.loadTexture(mapUrl);
    var material = new THREE.MeshPhongMaterial({
      map: map
    });
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var cube = objects['cube'] = new THREE.Mesh(geometry, material);
    this.extend({
      x: Math.PI / 5,
      y: Math.PI / 5
    }, cube.rotation);
    this.config.scene.add(cube);
  }
});

// handler
var container = webgl.config.container;

container.addEventListener('mousedown', function (e) {
  var cubePosition = position['cube'] = {
    x: e.offsetX,
    y: e.offsetY,
    st: + new Date()
  }
  container.addEventListener('mousemove', moveHandler, false);
}, false);

container.addEventListener('mouseup', function (e) {
  var cubePosition = position['cube'] = {
    x: e.offsetX,
    y: e.offsetY,
    se: + new Date()
  }
  container.removeEventListener('mousemove', moveHandler, false);
}, false);

function moveHandler (e) {
  // console.log(e);
  var cubePosition = position['cube'] = {
    xm: e.movementX,
    ym: e.movementY
  };
  cubePosition.xm && (objects['cube'].rotation.y += Math.PI * cubePosition.xm / container.offsetWidth);
  cubePosition.ym && (objects['cube'].rotation.x += Math.PI * cubePosition.ym / container.offsetHeight);
}

// animate loop
var loop;
var run = function () {
  var config = webgl.config;
  config.renderer.render(config.scene, config.camera);
  config.animate && config.animate.call(webgl);
  loop = requestAnimationFrame(run);
  // cancelAnimationFrame
}
run();