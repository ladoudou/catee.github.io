  // defs candyCard - start

;(function (win, doc, $, _) {
  function candyCard (conf) {
    this.current = conf.startCard || 0;
    //this.colorList = conf.colorList || ['rgba(255, 239, 213, 0.8)', 'rgba(240, 248, 255, 0.8)', 'rgba(255, 160, 122, 0.8)', 'rgba(107, 142, 35, 0.8)'];
    this.cardListEle = $('.' + (conf.calssName || 'catee-candyCard'));
    this.prevId = conf.prevId || 'catee_c_prev';
    this.nextId = conf.nextId || 'catee_c_next';
    this.cardNum = this.cardListEle.length;
    this.eventArray = conf.eventArray || [];
    this.timer = {};
  }
  candyCard.prototype = {
    init: function () {
      var self = this;
      self.setAttributes();
      //setTimeout(function () {
      self.setPosition();
        //self.setColors();
      //}, 200);
      self.bind(doc, 'mousewheel', self.scroll2Turn(self));
      self.bind(doc, 'click', self.click2Turn(self));
    },

    /*setColors: function () {
      var self = this,
        cardListEle = self.cardListEle;
      _.map(cardListEle, function (ele) {
        $(ele).addClass('catee-animate-color');
      })
    },*/

    setAttributes: function () {
      var self = this,
        cardListEle = self.cardListEle;
      _.map(cardListEle, function (ele, i) {
        ele.setAttribute('candyCard-index', i);
        ele.style.zIndex = 10 + i * 2;
        $(ele).addClass('catee-animate-init');
      })
    },

    setPosition: function () {
      var self = this,
        length = self.cardNum,
        current = self.current,
        cardListEle = self.cardListEle;
      _.map(cardListEle, function (ele, i) {
        i && $(ele).css('-webkit-transition-delay', (((length - i) * 0.1) + 's')).addClass('catee-init');
        i && (i < 6) && $(ele).removeClass('catee-init').addClass(['catee-showout-', i].join(''));
      })
      setTimeout(function () {
        cardListEle.css('-webkit-transition-delay', '0.1s');
      }, 100)
    },

    refreshPosition: function (type) {
      var self = this,
        current = 0,
        length = self.cardNum,
        cardListEle = self.cardListEle;
      switch (type) {
        case 1:
          current = ++ self.current;
          $(cardListEle[current - 1]).removeClass('catee-fadein').addClass('catee-fadeout').css('opacity', '0');
          $(cardListEle[current]).addClass('catee-animate-active').removeClass('catee-showout-1 catee-init');
          for (var i = 1, len = win.Math.min(6, length - 1 - current); i < len; i ++) {
            $(cardListEle[current + i]).css('-webkit-transition-delay', ((i * 0.1) + 's')).addClass(['catee-showout-', i].join('')).removeClass([['catee-showout-', i + 1].join(''), ' catee-init'].join(''));
          };
          setTimeout(function () {
            cardListEle.css('-webkit-transition-delay', '0.1s');
          }, 100);
          break;
        case 0:
          current = self.current;
          $(cardListEle[current]).addClass('catee-showout-0 catee-init').removeClass('catee-animate-active');
          $(cardListEle[current - 1]).removeClass('catee-fadeout').addClass('catee-fadein').css('opacity', '1');
          setTimeout(function () {
            for (var i = 0, len = win.Math.min(6, length - 1 - current); i < len; i ++) {
              $(cardListEle[current + i]).css('-webkit-transition-delay', (((6 - i) * 0.1) + 's')).addClass([['catee-showout-', i + 1].join(''), ' catee-init'].join('')).removeClass(['catee-showout-', i].join(''));
            };
          }, 900);
          setTimeout(function () {
            cardListEle.css('-webkit-transition-delay', '0.1s');
          }, 100);
          self.current --;
          break;
        default:
      }
    },

    setLocalStorage: function () {
    },

    getLocalStorage: function () {
    },

    checkUser: function () {
    },

    /*refreshColors: function () {
      var self = this,
        length = self.cardNum,
        cardListEle = self.cardListEle,
        colorList = self.colorList,
        colorListLength = colorList.length,
        colorIndex = self.getRandom(0, colorListLength, length);
      _.map(cardListEle, function (ele, i) {
        $(ele).css('background-color', colorList[colorIndex[i]]);
      })
    },*/

    toNext: function () {
      var self = this;
      self.refreshPosition(1);
    },

    toPrev: function () {
      var self = this;
      self.refreshPosition(0);
    },

    openDrawer: function () {
    },

    closeDrawer: function () {
    },

    bind: function (ele, type, handle) {
      var ele = typeof ele === 'string' ? $('#' + ele) : ele;
      $(ele).on(type, handle);
    },

    unbind: function (ele, type, handle) {
      var ele = typeof ele === 'string' ? $('#' + ele) : ele;
      $(ele).off(type, handle);
    },

    scroll2Turn: function (that) {
      return function (e) {
        clearTimeout(that.timer);
        that.timer = setTimeout(function () {
          e.originalEvent.wheelDelta < 0 && that.toNext();
          e.originalEvent.wheelDelta > 0 && that.toPrev();
        }, 200)
      }
    },

    click2Turn: function(that) {
      return function (e) {
        var t = e.target,
          tId = t.id;
        switch (tId) {
          case that.nextId:
            that.toNext();
            break;
          case that.prevId:
            that.toPrev();
            break;
          default:
        }
      }
    },

    getRandom: function () {
      var origin = (arguments[0] >> 0) || 0,
        range = (arguments[1] >> 0) || 1,
        length = win.Math.abs(arguments[2] >> 0) || 1,
        result = [],
        rdm = 0;
        do {
          rdm = origin + win.Math.floor((range - 1e-6) * win.Math.random());
          result.push(rdm);
        } while (-- length > 0)
        return result;
    }
    
  }
  win.candyCard = candyCard;
})(window, document, $, _)

  // defs candyCard - end

  // defs Prairie - start
  // defs Prairie - end


window.onload = function (e) {
  var a = new candyCard({});
  a.init();
}
//a.init();










