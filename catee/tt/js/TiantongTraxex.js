;(function (win, doc, utils) {
  var timingEgg = utils.$('timing_egg'),
    timingEggTop = utils.getPosition(timingEgg).y;
  utils.addEvent(win, 'scroll', function (e) {
    var e = utils.fixEvent(e);
    if (utils.viewData().scrollTop > timingEggTop) {
      utils.addClass(timingEgg, 'timing-egg-fixed');
    } else {
      utils.removeClass(timingEgg, 'timing-egg-fixed');

    }
  })
})(window, document, utils);
