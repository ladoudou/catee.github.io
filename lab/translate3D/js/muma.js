(function (win, doc, $) {
  console.log('start...');
  var cateeCircle3d = $('#catee_circle_3d'), r = 0;
  setInterval(function () {
    r = r + 24;
    console.log(r);
    cateeCircle3d.attr('style', '-webkit-transform:rotateY(' + r + 'deg)');
  }, 1000);
})(window, document, jQuery);
