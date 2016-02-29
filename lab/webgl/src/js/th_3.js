(function (win, doc) {

  var WebGL = function (opts) {

    var canvas = doc.getElementById(opts.canvas),
      canWidth = canvas.offsetWidth,
      canHeight = canvas.offsetHeight;

    this.extend({
      data: {},
      config: {
        canWidth: canWidth,
        canHeight: canHeight,
        clearColor: 0x333333,
        lightColor: 0xffffff,
        lightIntensity: 1
      },
      animations: [],
      canvas: canvas,
      renderer: new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas
      }),
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(45, canWidth / canHeight, 1, 1000),
      light: new THREE.DirectionalLight()
    }, this);

    this.extend(opts, this.config);

    this.init();

  };

  WebGL.prototype = {

    constructor: WebGL,

    init: function () {
      this.build();
    },

    build: function () {
      var config = this.config;
      // renderer
      this.setClearColor();
      this.setRendererSize();
      // camera
      this.setCameraPosition();
      // light
      this.setLightColor();
      this.setLightIntensity();
      this.setLightPosition();
      // add
      this.scene.add(this.light);
      this.render();
    },

    render: function () {
      var self = this instanceof WebGL ? this : win['webgl'];
      // console.log(self);
      self.renderer.render(self.scene, self.camera);
      self.animations.map(function (f) {
        (f instanceof Function) && f.call();
      });
      requestAnimationFrame(self.render);
    },

    setClearColor: function (color) {
      this.renderer.setClearColor(color || this.config.clearColor);
    },

    setRendererSize: function () {
      this.renderer.setSize(this.config.canWidth, this.config.canHeight);
    },

    setCameraRotation: function (v) {
      if (! (v instanceof Object)) {
        this.camera.rotation.set(0, 0, 0);
        return;
      }
      var pos = this.extend(pos, {
        x: 0,
        y: 0,
        z: 0
      });
      this.camera.rotation.set(v.x, v.y, v.z);
    },

    setCameraPosition: function (pos) {
      if (! (pos instanceof Object)) {
        this.camera.position.set(0, 0, 3);
        return;
      }
      var pos = this.extend(pos, {
        x: 0,
        y: 0,
        z: 3
      });
      this.camera.position.set(pos.x, pos.y, pos.z);
    },

    setCameraLookAt: function (v) {
      this.camera.lookAt(v || new THREE.Vector3(0, 0, 0));
    },

    setLightColor: function (color) {
      this.light.color = new THREE.Color(color || this.config.lightColor);
    },

    setLightIntensity: function (intensity) {
      this.light.intensity = intensity || this.config.lightIntensity;
    },

    setLightPosition: function (pos) {
      if (! (pos instanceof Object)) {
        this.light.position.set(0, 0, 1);
        return;
      }
      var pos = this.extend(pos, {
        x: 0,
        y: 0,
        z: 1
      });
      this.light.position.set(pos.x, pos.y, pos.z);
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
    
  }

  win.webgl = new WebGL({
    name: 'webgl',
    canvas: 'canvas'
  });

})(window, document);




(function (win, doc, wg) {
  
  var webgl = wg;

  win.objects = {};

  /*createCube('cube1', 'src/img/b.jpg', {
    w: 1,
    h: 1,
    d: 1
  }, function () {
    var cube = this;
    return function () {
      cube.rotation.x -= 0.001;
    }
  }, function () {
    var self = this;
    wg.extend({
      x: Math.PI / 5,
      y: Math.PI / 5
    }, self.rotation);
    wg.scene.add(self);
  });

  createCube('cube2', 'src/img/b.jpg', {
    w: 1,
    h: 1,
    d: 1
  }, function () {
    var self = this;
    wg.extend({
      x: Math.PI / 3,
      y: Math.PI / 7
    }, self.rotation);
    wg.extend({
      x: 1,
      y: 0,
      z: .5
    }, self.position);
    wg.scene.add(self);
  });*/

  createBall('ball1', 'src/img/earth_new.jpg', {
    w: 1,
    h: 1,
    d: 1
  }, function () {
    var ball = this;
    return function () {
      ball.rotation.y += 0.01;
      // ball.rotation.y += 0.01 * 1 / (Math.tan(Math.PI * 23.433 / 180));
      // ball.rotation.z += 0.005;
      // ball.rotation.z -= 0.01;
    }
  }, function () {
    var self = this;
    wg.extend({
      x: 0,
      y: 0,
      z: 0
    }, self.rotation);
    wg.extend({
      x: 0,
      y: 0,
      z: 0
    }, self.position);
    wg.scene.add(self);
  });

  /*wg.setCameraRotation({
    x: 0,
    y: 0,
    z: Math.PI * 23.433 / 180
  })*/

  wg.setCameraPosition({
    x: 0,
    y: 0,
    z: 4
  });

  wg.setCameraLookAt(new THREE.Vector3(0, 0, 0));

  wg.setLightPosition({
    x: 1,
    y: Math.tan(Math.PI * 23.433 / 180),
    z: .6
  });

  // wg.setLightColor(new THREE.Color(0xfff900));

  /*wg.setLightPosition({
    x: 1,
    y: 0,
    z: .6
  })*/

  function createBall (name, mapUrl, opts, animation, callback) {
    var texture = THREE.ImageUtils.loadTexture(mapUrl);
    var material = new THREE.MeshPhongMaterial({
      map: texture
    })
    var geometry = new THREE.SphereGeometry(1, 32, 32);
    var ball = objects[name] = new THREE.Mesh(geometry, material);
    if (callback) {
      wg.animations.push(animation.call(ball));
      callback.call(ball);
    } else {
      animation && animation.call(ball);
    }
  };

  function createCube (name, mapUrl, size, animation, callback) {
    var texture = THREE.ImageUtils.loadTexture(mapUrl);
    var material = new THREE.MeshPhongMaterial({
      map: texture
    });
    var geometry = new THREE.BoxGeometry(size.w, size.h, size.d);
    var cube = objects[name] = new THREE.Mesh(geometry, material);
    if (callback) {
      wg.animations.push(animation.call(cube));
      callback.call(cube);
    } else {
      animation && animation.call(cube);
    }
  }

})(window, document, webgl);