var wgl = new WGL({
  wrap: 'canvasWrap',
  canvas: 'canvas'
});

var canvas = wgl.canvas,
  gl = getWebGLContext(canvas);

var VSSHADER = 
  'attribute vec4 a_Position;\n' +
  'void main () {\n' +
    'gl_Position = a_Position;\n' +
    'gl_PointSize = 5.0;\n' +
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

// 给 attribute/uniform 变量地址传入值
gl.vertexAttrib4f(a_Position, 0.0, 0.0, 0.0, 1.0);
gl.uniform4f(u_FragColor, .4, .2, .2, 1.0);

// 清空绘图区
gl.clearColor(.6, .6, .6, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// 画一个点
gl.drawArrays(gl.POINTS, 0, 1);

// 清空绘图区
gl.clear(gl.COLOR_BUFFER_BIT);

// 创建缓冲区
var buffer = gl.createBuffer();

// 绑定缓冲区
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

// 向缓冲区中写数据
var vertexArray = new Float32Array([-.6, .3, -.4, -.3, -.2, .3, .2, -.3, .4, .3, .6, -.3 ]);
gl.bufferData(gl.ARRAY_BUFFER, vertexArray, gl.STATIC_DRAW);

// 分配 attribute 值
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

// 开启 buffer
gl.enableVertexAttribArray(buffer);

// 绘制单个点
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.POINTS, 0, 6);

// 绘制不连接的线段
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.LINES, 0, 6);

// 绘制链接的线段(首尾不相连)
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.LINE_STRIP, 0, 6);

// 绘制链接的线段(首尾相连)
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.LINE_LOOP, 0, 6);

// 绘制单个三角形
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, 6);

// 绘制连续的三角形
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);

// 绘制连续的扇形分布的三角形
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);
