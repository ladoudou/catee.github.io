var wgl = new WGL({
  wrap: 'canvasWrap',
  canvas: 'canvas'
});

var canvas = wgl.canvas,
    width = canvas.width,
    height = canvas.height,
    ctx = canvas.getContext('2d'),
    pi = Math.PI;

function drawArc(s, e, c, cl) {
  var x = width / 2,
    y = height / 2,
    radius = 50,
    counterClockwise = c;

  ctx.lineWidth = 16;
  ctx.strokeStyle = cl;
  ctx.beginPath();
    //ctx.moveTo(x+100, y);
  ctx.arc(x, y, radius, s, e, counterClockwise);
  ctx.stroke();

}

drawArc(- pi / 2, 0.9*pi, false, 'red');
drawArc(- pi / 2, 0.9*pi, true, 'green');