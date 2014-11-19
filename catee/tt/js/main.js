(function (win, doc) {
  /* 滚动图 */
  var scrollEle = doc.querySelector('#showbox_scroll'),
    scrollItemsEle = scrollEle.querySelectorAll('.showbox-item'),
    scrollLen = scrollItemsEle.length;
  scrollLen > 1 && (function(){

    var script = doc.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'js/zepto.js');
    script.onload = function () {
      (function ($) {
        $.extend($.fn, {

      /**
       * scroll card
       *
       */
        scrollCard: function(obj){
          var $self = $(this);

          var cardHTML = $self.html();
          var cardWrapHTML = '<div class="scroll-card-w"></div>';
          var cardIHTML = '<div class="scroll-card-i"></div>';

          var states = {
            count: $self.find('.showbox-item').size(),

            index: 0,

            animating: false,

            xMoving: false,
            yMoving: false,

            cX: 0,
            cY: 0,

            startTime: 0,

            touchStartX: 0,
            touchStartY: 0,

            width: $self.width(),
            height: $self.height(),

            direction: 1,

            autoPlay: true,
            autoPlayTime: 5 * 1000,
            autoPlayTimer: null
          };

          var doms = {
            card1: $(cardIHTML).append(cardHTML).attr('data-id','1'),
            card2: $(cardIHTML).append(cardHTML).attr('data-id','2'),
            card3: $(cardIHTML).append(cardHTML).attr('data-id','3'),
            cardWrap: $(cardWrapHTML),
            center: 'card2',
            left: 'card1',
            right: 'card3'
          };

          var funs = {
            init: function(obj){
              $.extend(states, obj);

              states.cX = -states.width * states.count;

              var transformValue = 'translate3d(' + states.cX + 'px,0,0)';

              $self.html(doms.cardWrap.css('-webkit-transform',transformValue).append(doms.card1).append(doms.card2).append(doms.card3));

              funs.bindEvent();

              funs.startTimer();
            },
            updateWidth: function(newWidth){

              var oldWidth = states.width;
              var oldCX = states.cX;
              var newCX = oldCX / oldWidth * newWidth;

              states.width = newWidth;
              states.cX = newCX;

              var transformValue = 'translate3d(' + states.cX + 'px,0,0)';

              doms.cardWrap.css('-webkit-transform',transformValue);
            },
            startTimer: function(){
              if(states.autoPlay){
                funs.stopTimer();

                states.autoPlayTimer = window.setTimeout(function(){
                  funs.goToLeft();
                }, states.autoPlayTime);
              }
            },
            stopTimer: function(){
              window.clearTimeout(states.autoPlayTimer);
              states.autoPlayTimer = null;
            },
            bindEvent: function(){
              $self.on({
                'touchstart': function(e){
                  funs.onTouchStart(e);
                },
                'touchmove': function(e){
                  funs.onTouchMove(e);
                },
                'touchend': function(e){
                  funs.onTouchEnd(e);
                }
              });
            },
            onTouchStart: function(e){
              funs.stopTimer();
              if(states.animating){
                return;
              }

              e.stopPropagation();

              doms.cardWrap.css('-webkit-transition','none');

              states.startTime = e.timeStamp;

              var touch = e.touches[0];

              states.touchStartX = touch.pageX;
              states.touchStartY = touch.pageY;
            },
            onTouchMove: function(e){
              if(states.animating){
                return;
              }
              e.stopPropagation();

              var touch = e.touches[0];

              var cX = Math.ceil(touch.pageX);
              var cY = Math.ceil(touch.pageY);
              var dX = Math.ceil(cX - states.touchStartX);
              var dY = Math.ceil(cY - states.touchStartY);

              if(states.xMoving){
                e.preventDefault();
                funs.move(dX, dY);
              } else {

                // 如果判断为竖直滑动，则禁用掉横向滑动
                if(states.yMoving){
                  states.xMoving = false;
                } else {

                  // 判断是竖直滑动还是横向滑动

                  // 如果竖直滑动量为0，显然是横向滑动，此时禁用默认滚动
                  if(Math.abs(dY) == 0){
                    states.xMoving = true;
                    states.yMoving = false;
                    funs.move(dX, dY);
                    e.preventDefault();
                  } else {
                    // 如果横向滑动量大于竖直滑动量的2倍，则为横向滑动，此时禁用默认滚动
                    if(Math.abs(dX) / Math.abs(dY) >= 2){
                      states.xMoving = true;
                      states.yMoving = false;
                      funs.move(dX, dY);
                      e.preventDefault();
                    } else {
                      states.xMoving = false;
                      states.yMoving = true;
                    }
                  }
                }
              }
            },
            onTouchEnd: function(e){
              states.xMoving = false;

              if(states.animating || states.yMoving){
                states.yMoving = false;
              states.animating = false;
                    return;
                  }

                  var endTime = e.timeStamp;

                  var touch = e.changedTouches[0];

                  var x = touch.pageX;
                  var dX = Math.ceil(x - states.touchStartX);

                  var duration = endTime - states.startTime;
                  var speed = Math.abs(dX) / duration;

                  if(speed > 0.3 && Math.abs(dX) > 100 || Math.abs(dX) >= states.width / 3){
                    funs.continueMove(speed, dX);
                  } else {
                    funs.backToIniPos(speed, dX);
                  }
                },
                move: function(dX, dY){
                  doms.cardWrap.css('-webkit-transform','translate3d(' + (states.cX + dX) + 'px,0,0)');
                },
                continueMove: function(speed, dX){
                  doms.cardWrap.css('-webkit-transition','all 0.2s ease');

                  states.cX = states.width * Math.abs(dX) / dX + states.cX;

                  states.animating = true;
                  var direction = Math.abs(dX) / dX;

                  doms.cardWrap.one('webkitTransitionEnd', direction, function(e){
                    states.animating = false;

                    var i = Math.abs(states.cX / (states.width * states.count) % 3);

              if(e.data == -1){
                states.index = states.index >= (states.count - 1) ? 0 : states.index + 1;
              } else {
                states.index = states.index >= 1 ? states.index - 1 : states.count - 1;
              }

                    if(i == 0 || i == 1 || i == 2){
                      if(e.data == -1){
                        doms[doms.left].remove();
                        doms.cardWrap.append(doms[doms.left]);

                        var center = doms.center;
                        doms.center = doms.right;
                        doms.right = doms.left;
                        doms.left = center;
                      } else {
                        doms[doms.right].remove();
                        doms.cardWrap.prepend(doms[doms.right]);

                        var center = doms.center;
                        doms.center = doms.left;
                        doms.left = doms.right;
                        doms.right = center;
                      }

                      doms.cardWrap.css('-webkit-transition','none');
                      states.cX = -states.width * states.count;

                      // 归位
                      window.setTimeout(function(){
                        var transformValue = 'translate3d(' + states.cX + 'px,0,0)';
                        doms.cardWrap.css('-webkit-transform', transformValue);
                      }, 10);
                    }

              if(states.callback){
                      states.callback(states);
                    }

                    funs.startTimer();
                  });
                  window.setTimeout(function(){
                    var transformValue = 'translate3d(' + states.cX + 'px,0,0)';
                    doms.cardWrap.css('-webkit-transform', transformValue);
                  }, 10);
                },
                backToIniPos: function(speed, dX){
                  doms.cardWrap.css('-webkit-transition','all 0.2s ease');

                  states.animating = true;
                  doms.cardWrap.one('webkitTransitionEnd', function(){
                    states.animating = false;
                    funs.startTimer();
                  });
                  window.setTimeout(function(){
                    var transformValue = 'translate3d(' + states.cX + 'px,0,0)';
                    doms.cardWrap.css('-webkit-transform', transformValue);
                  }, 10);
                },

                goTo: function(){

                },

                goToLeft: function(){
              if(!states.animating){
              funs.continueMove(0, -states.width);
              }
                },
                goToRight: function(){
              if(!states.animating){
              funs.continueMove(0, states.width);
              }
                }
              };

              funs.init(obj);

            $self.states = states;
            $self.goToLeft = funs.goToLeft;
            $self.goToRight = funs.goToRight;
            $self.updateWidth = funs.updateWidth;

            return $self;
          }
        });
        function updateLargeScrollPicStep(states){
          var html = [];

          for(var i = 0; i < states.count; i ++){
            if(i == states.index){
              html.push('<span class="dot1-active"></span>');
            } else {
              html.push('<span class="dot1"></span>');
            }
          }

          $('#largeScrollPicPage').html(html.join(''));
        }
        var largeScrollPic = $('#showbox_scroll').scrollCard({
          autoPlay: true,
          callback: function(states){
            updateLargeScrollPicStep(states);
          }
        });
        updateLargeScrollPicStep(largeScrollPic.states);

      })(Zepto);
    }
    doc.querySelector('body').appendChild(script);
  })();

  var removeAll = function (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
    return parent;
  },

  setButtonStatus = function () {
    var buttonEle = doc.querySelector('.showbox-button'),
      type = arguments[0],
      text,
      className;
    if (! type) {
      return;
    }
    switch (type) {
      case 'waiting':
        text = '带 TA 回家！';
        className = 'showbox-button';
        break;
      case 'checking':
        text = '审核中 ...';
        className = 'showbox-button checking';
        break;
      case 'approved':
        text = '快带 TA 回家吧！';
        className = 'showbox-button checking';
        break;
      case 'defined':
        text = arguments[1];
        className = ['showbox-button ', arguments[2]].join('');
        break;
      default:
        break;
    }
    var textNode = doc.createTextNode(text);
    buttonEle.setAttribute('class', className);
    removeAll(buttonEle).appendChild(textNode);
  },

  SevenDayController = {
    removeAll: removeAll,
    setButtonStatus: setButtonStatus
  };

  win.SevenDayController = SevenDayController;

})(window, document);


