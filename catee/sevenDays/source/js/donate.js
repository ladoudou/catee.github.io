(function (win, doc, s) {
  var inputEle = doc.querySelector('input'),
    submitEle = doc.querySelector('.donate-button'),
    checkEle = doc.querySelector('.donate-isshare'),
    checkboxEle = doc.querySelector('[date-type="checkbox"]'),
    coverEle = doc.querySelector('.donate-cover'),
    deadlineEle = doc.querySelector('#deadline');

  var handler_submit = function (e) {
    var money = inputEle.value;
    if (! money) {
      inputEle.focus();
      return;
    }
    setTimeout(function () {
      coverEle.style.display = 'block';
      setTimeout(function () {
        coverEle.className = 'donate-cover';
      }, 10);
      var pt = deadlineEle.getAttribute('data-time'),
        nt = (pt.split(':')[0] >> 0) + 7,
        ntt = [nt, pt.split(':')[1], pt.split(':')[2], pt.split(':')[3]].join(':');
      deadlineEle.setAttribute('data-time', ntt);
      s.init();
    }, 800)
  },
  handler_close = function (e) {
    coverEle.className = 'donate-cover hide-cover';
    setTimeout(function () {
      coverEle.style.display = 'none';
    }, 500);
  },
  handler_ischeck = function (e) {
    checkboxEle.className = checkboxEle.className === 'checkbox' ? [checkboxEle.className, ' yes'].join('') : 'checkbox';
  };
  submitEle.addEventListener('click', handler_submit, 'false');
  checkEle.addEventListener('click', handler_ischeck, 'false');
  coverEle.addEventListener('click', handler_close, 'false');
})(window, document, s);
