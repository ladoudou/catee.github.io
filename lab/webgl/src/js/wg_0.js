
;(function (win, doc) {

  var wgl = new WGL({
    wrap: 'canvasWrap',
    canvas: 'canvas'
  });

  var canvas = wgl.canvas,
    // 获取 canvas 执行上下文
    gl = getWebGLContext(canvas),
    // 顶点着色器
    VSSHADER =
      'attribute vec4 a_Position;\n' +
      'void main () {\n' +
        'gl_Position = a_Position;\n' +
        'gl_PointSize = 10.0;\n' +
      '}',
    // 片元着色器
    FSSHADER =
      'precision mediump float;\n' +
      'uniform vec4 u_FragColor;\n' +
      'void main () {\n' +
        'gl_FragColor = u_FragColor;\n' +
      '}',
    points_position = [],
    points_color = [],

    a_Position,
    u_FragColor;


  // 初始化着色器
  initShaders(gl, VSSHADER, FSSHADER);

  // 设置背景色
  gl.clearColor(.6, .6, .6, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 获取顶点着色器中存储顶点 position 的 attribute 变量地址
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position === -1) { // 如果获取不到 attribute 变量的地址，getAttribLocation 会返回 -1
    console.log('如果获取不到 attribute 变量的地址，getAttribLocation 会返回-1');
  };

  // 获取片元着色器中存储点 color 的 uniform 变量地址
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) { // 如果获取不到 uniform 变量的地址， getUniformLocation 会返回 null，不是 -1
    console.log('如果获取不到 uniform 变量的地址， getUniformLocation 会返回 null，不是 -1');
  }

  // 设置顶点着色器中顶点 position 的值
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
  // 设置片元着色器中片元 color 的值
  gl.uniform4f(u_FragColor, 1.0, 0.4, 0.8, 1.0);

  // 画一个点
  gl.drawArrays(gl.POINTS, 0, 1);

  // 给 canvas 绑定事件
  canvas.addEventListener('click', drawPoints, false);

  function drawPoints (e) {
    var canvasHeight = wgl.config.wrapHeight,
      canvasWidth = wgl.config.wrapWidth,
      offsetX = e.clientX,
      offsetY = e.clientY,
      rect = e.target.getBoundingClientRect(),
      x = (offsetX - rect.left - canvasWidth / 2) / (canvasWidth / 2),
      y = (canvasHeight / 2 - (offsetY - rect.top)) / (canvasHeight / 2);
      r = Math.random(),
      g = Math.random(),
      b = Math.random(),
      a = 1;

    points_position.push(new Float32Array([x, y]));
    points_color.push(new Float32Array([r, g, b, a]));
    // console.log(canvasHeight);

    gl.clear(gl.COLOR_BUFFER_BIT);

    points_position.forEach(function (arr, i) {

      // 设置顶点着色器中顶点 position 的值
      gl.vertexAttrib2fv(a_Position, arr);
      // 设置片元着色器中片元 color 的值
      gl.uniform4fv(u_FragColor, points_color[i]);

      // 画一个点
      gl.drawArrays(gl.POINTS, 0, 1);
    })
  }

})(window, document);