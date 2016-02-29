var wgl = new WGL({
  wrap: 'canvasWrap',
  canvas: 'canvas'
});

var canvas = wgl.canvas,
  gl = getWebGLContext(canvas);

var Draw = function () {
  this.array = [];
};

Draw.prototype = {

  constructor: Draw,

  draw: function () {
    gl.clearColor(.6, .6, .6, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.array.forEach(function (fn) {
      fn();
    })
  }
}

var draw = new Draw();
draw.array.push(function () {

  var address = shaderNormal();

  var fragColor = new Float32Array([.2, .79, .64, 1.0]);
  withBuffer(address, fragColor);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

}, function () {

  var address = shaderTranslate();

  var fragColor = new Float32Array([.62, .19, .84, 1.0]);
  withBuffer(address, fragColor);

  var offset = new Float32Array([.5, .5, 0.0, 0.0]);
  gl.uniform4fv(address.u_Offset, offset);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

}, function () {

  var address = shaderRotation();

  var fragColor = new Float32Array([.13, .96, .54, 1.0]);
  withBuffer(address, fragColor);

  var beta = 1,
    u_Sin = Math.sin(beta),
    u_Cos = Math.cos(beta);

  gl.uniform1f(address.u_Sin, u_Sin);
  gl.uniform1f(address.u_Cos, u_Cos);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

}, function () {

  gl.clear(gl.COLOR_BUFFER_BIT);

  var address = shaderMatrix();

  var fragColor = new Float32Array([.123, .456, .789, 1.0]);
  withBuffer(address, fragColor);

  var u_transitionMatrix = new Float32Array([
    1, 0.4, 0, 0,
    .2, 1, 0, 0,
    0, 0, 1, 0,
    .7, 0, 0, 1
  ]);

  gl.uniformMatrix4fv(address.u_transitionMatrix, false, u_transitionMatrix);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

}, function () {
  
  gl.clear(gl.COLOR_BUFFER_BIT);

  var address = shaderMatrix();

  var fragColor = new Float32Array([.321, .654, .987, 1.0]);
  withBuffer(address, fragColor);

  var u_Maxtrix = new Matrix4();
  u_Maxtrix.setTranslate(.6, 0, 0) ; // 再平移
  u_Maxtrix.rotate(30, 0, 0, 1); // 先旋转

  gl.uniformMatrix4fv(address.u_transitionMatrix, false, u_Maxtrix.elements);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

}, function () {

  gl.clear(gl.COLOR_BUFFER_BIT);

  var address = shaderMatrix();

  var fragColor = new Float32Array([.321, .987, .654, 1.0]);
  withBuffer(address, fragColor);

  var v = 10,
    a = 50,
    alpha = 0,
    now = Date.now(),
    start = now;

  var rotate = function () {
    alpha = (function (alpha) {
      var _now = Date.now();
      var delta = (_now - now) / 1000;
      var t = (_now - start) / 1000;
      now = _now;
      // alpha = v * delta / 1000 + alpha;
      // alpha = v * t + 0.5 * a * t * t;
      alpha = - 180 * Math.cos(t * 5);
      return alpha %= 360;
    })(alpha);
    var u_Maxtrix = new Matrix4();
    u_Maxtrix.setRotate(alpha, 0, 0, -1);
    gl.uniformMatrix4fv(address.u_transitionMatrix, false, u_Maxtrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(rotate);
  };
  rotate();

});

draw.draw();

function shaderMatrix () {
  var VSSHADER = 
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_transitionMatrix;\n' +
    'void main () {\n' +
      'gl_Position = u_transitionMatrix * a_Position;\n' +
    '}\n',
    FSSHADER = 
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
    'void main () {\n' +
      'gl_FragColor = u_FragColor;\n' +
    '}\n';

  initShaders(gl, VSSHADER, FSSHADER);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position'),
    u_transitionMatrix = gl.getUniformLocation(gl.program, 'u_transitionMatrix'),
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

  return {
    a_Position: a_Position,
    u_transitionMatrix: u_transitionMatrix,
    u_FragColor: u_FragColor
  }
}

function shaderNormal() {
  var VSSHADER = 
    'attribute vec4 a_Position;\n' +
    'void main () {\n' +
      'gl_Position = a_Position;\n' +
    '}\n',
    FSSHADER = 
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
    'void main () {\n' +
      'gl_FragColor = u_FragColor;\n' +
    '}\n';

  // 初始化着色器
  initShaders(gl, VSSHADER, FSSHADER);

  // 获取 attribute 和 uniform 变量地址
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position'),
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

  return {
    a_Position: a_Position,
    u_FragColor: u_FragColor
  };
}

function shaderTranslate () {
  var VSSHADER = 
    'attribute vec4 a_Position;\n' +
    'uniform vec4 u_Offset;\n' +
    'void main () {\n' +
      'gl_Position = a_Position + u_Offset;\n' +
    '}\n',
    FSSHADER = 
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
    'void main () {\n' +
      'gl_FragColor = u_FragColor;\n' +
    '}\n';

  initShaders(gl, VSSHADER, FSSHADER);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position'),
    u_Offset = gl.getUniformLocation(gl.program, 'u_Offset'),
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

  return{
    a_Position: a_Position,
    u_Offset: u_Offset,
    u_FragColor: u_FragColor
  }
};

function shaderRotation () {
  var VSSHADER = 
    'attribute vec4 a_Position;\n' +
    'uniform float u_Sin, u_Cos;\n' +
    'void main () {\n' +
      'gl_Position.x = a_Position.x * u_Cos - a_Position.y * u_Sin;\n' +
      'gl_Position.y = a_Position.x * u_Sin + a_Position.y * u_Cos;\n' +
      'gl_Position.z = a_Position.z;\n' +
      'gl_Position.w = 1.0;\n' +
    '}\n',
    FSSHADER = 
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
    'void main () {\n' +
      'gl_FragColor = u_FragColor;\n' +
    '}\n';

    initShaders(gl, VSSHADER, FSSHADER);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position'),
      u_Sin = gl.getUniformLocation(gl.program, 'u_Sin'),
      u_Cos = gl.getUniformLocation(gl.program, 'u_Cos'),
      u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

    return {
      a_Position: a_Position,
      u_Sin: u_Sin,
      u_Cos: u_Cos,
      u_FragColor: u_FragColor
    }
};

function withBuffer (address, fragColor) {
  gl.uniform4fv(address.u_FragColor, fragColor);
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  var pointsArray = new Float32Array([0.0, .3, .15 * Math.sqrt(3), -.15, -.15 * Math.sqrt(3), -.15]);
  gl.bufferData(gl.ARRAY_BUFFER, pointsArray, gl.STATIC_DRAW);
  gl.vertexAttribPointer(address.a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(buffer);
}
