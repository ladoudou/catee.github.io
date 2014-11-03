;(function (win, doc, $, _) {
  var bannerEle = $('#catee_banner'),
    bannerInput1 = bannerEle.find('#catee_banner_input_1'),
    bannerPre = bannerEle.find('.catee-preview'),
    bannerImg = bannerEle.find('.catee-banner img'),
    bannerFlag = bannerEle.find('.catee-input-attachment'),
    timer = {},
    candyCardsTempIamge = new Image();


  // 事件绑定部分
  bannerInput1.on('focus', function (e) {
    bannerFlag.text('');
  })
  bannerInput1.on('blur', function (e) {
    this.value === '' && bannerFlag.text('\u586B\u5165\u56FE\u7247\u5730\u5740 ...'/* 填入图片地址 ... */) && bannerFlag.removeClass('catee-input-attachment-correct').removeClass('catee-input-attachment-error'); 
  })
  bannerInput1.on('keyup', function (e) {
    clearTimeout(timer);
    var delay = 1000;
    e.keyCode === 13 && (delay = 0);
    var that = this;
    timer = setTimeout(function () {
      var value = that.value;
      ! /^http:\/\//.test(value) && (value = ['http://', value].join(''));
      candyCardsTempIamge.onload = function () {
        bannerFlag.removeClass('catee-input-attachment-error').addClass('catee-input-attachment-correct');
        bannerImg.attr('src', value);
      }
      candyCardsTempIamge.onerror = function () {
        bannerFlag.removeClass('catee-input-attachment-correct').addClass('catee-input-attachment-error');
      }
      candyCardsTempIamge.src = value;
      // bannerImg.attr('src', value);
    }, delay);
  })


  // 存储部分
  var candyData = win.JSON.parse(win.localStorage.getItem('__CATEE_CANDYCARDS_')),
    order = bannerEle.attr('candycard-index') >> 0;
    html = (win.JSON.parse(candyData.course.sections[order])).html;
  


})(window, document, $, _);
