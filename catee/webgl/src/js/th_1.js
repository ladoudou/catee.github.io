;(function (win, doc) {
  // alert(3);
  /*var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, win.innerWidth / win.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(win.innerWidth, win.innerHeight);
  doc.body.appendChild(renderer.domElement);
  var geometry = new THREE.CubeGeometry(2, 1, 1);
  var material = new THREE.MeshBasicMaterial({
    color: 0x234012
  });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;
  function render () {
    requestAnimationFrame(render);
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    cube.rotation.z += 0.1;
    renderer.render(scene, camera);
  }
  render();*/

  var wgEle = doc.getElementById('threejs');
  var stats, renderer, camera, scene, objects = {}, light = {}, tweens = {},
    shulterx = -1, shultery = -1,
    width, height;

  function initThree () {
    width = wgEle.clientWidth;
    height = wgEle.clientHeight;
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(width, height);
    wgEle.appendChild(renderer.domElement);
    renderer.setClearColor(0xeeeeee, 1.0);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    wgEle.appendChild(stats.domElement);
  }

  function initCamera () {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 1000;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt({
      x: 0,
      y: 0,
      z: 0
    })
  }

  function initScene () {
    scene = new THREE.Scene();
  }

  function initLight () {
    light = new THREE.DirectionalLight(0xff0000, 1.0, 0);
    light.position.set(100, 100, 200);
    scene.add(light);
  }

  function initObjects () {

    // 1
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({
      vertexColors: false,
      color: 0xff0000,
      lineWidth: 15,
      // lineCap: 
      lineJoin: 'round', 
      fog: true
    });
    var color1 = new THREE.Color(0x4004f4), color2 = new THREE.Color(0xff0000);
    var p1 = new THREE.Vector3(-100, 0, 0);
    var p2 = new THREE.Vector3(100, 0, 0);
    //var p3 = new THREE.Vector3(100, 100, 0);
    //geometry.vertices.push(p1, p2, p3);
    geometry.vertices.push(p1, p2);
    //geometry.colors.push(color1, color2, color1);
    geometry.colors.push(color1, color2);
    objects['line'] = new THREE.Line(geometry, material, THREE.LinePieces);
    objects['line'].position = new THREE.Vector3(0, 0, 0);

    // 2
    var geometry = new THREE.CylinderGeometry(100, 100, 100);
    var material = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    objects['mesh'] = new THREE.Mesh(geometry, material);
    objects['mesh'].position = new THREE.Vector3(0, 0, 0);

    for (var o in objects) {
      scene.add(objects[o]);
    }
  }

  function render() {
    renderer.clear();
    // camera.position.x =camera.position.x +1;
    // var x = objects['line'].position.x;
    // var y = objects['line'].position.y;
    // shulterx = x < -550 ? 1 : (x > 550 ? -1 : shulterx);
    // shultery = y < -350 ? 1 : (y > 350 ? -1 : shultery);
    // console.log(objects['line'].position.x);
    // objects['line'].position.x += shulterx * 13;
    // objects['line'].position.y += shultery * 7;
    // objects['mesh'].position.y += shulterx * 23;
    // objects['mesh'].position.x += shultery * 17;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
    stats.update();
  }

  function initTween () {
    tweens['mesh'] = createjs.Tween.get(objects['mesh'].position);
    tweens['mesh'].loop = true;
    tweens['mesh'].passive = true;
    tweens['mesh'].wait(500).to({
        x: -550,
        y: 550
    }, 3000).to({
        x: 0,
        y: 0
    }, 1000);
    console.log(tweens['mesh']);
  }

  (function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObjects();
    initTween();
    render();
  })();


})(window, document);

















