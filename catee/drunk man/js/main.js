;(function (win, doc, $) {

  var removeChildrenAll = function (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
    return parent;
  };

  var Background = null, DrunkMan = null;

  Background = function (opt) {
    this.bgID = opt.id;
    this.bgEle = null;
    this.timer = null;
    this.init();
  }

  Background.prototype = {

    init: function () {
      var self = this;
      self.bgEle = $('#' + self.bgID);
      self.setSubBlks();
    },

    setSubBlks: function () {
      var self = this,
        bgEle = self.bgEle,
        div = null,
        i = 300 * 300 - 1;
      removeChildrenAll(bgEle[0]);
      div = doc.createElement('div');
      div.setAttribute('class', 'catee-subBlks');
      div.setAttribute('data-gradient', '255');
      self.timer = setTimeout(function () {
        for (var i = 0, len = 300; i < len; i ++) {
          for(var j = 0; j < len; j ++) {
            var tmp = div.cloneNode(false);
            tmp.setAttribute('data-coordinate', [j, ':', i].join(''));
            bgEle.append(tmp);
          }
        }
      }, 100)
    },

    refreshPath: function (coordinate) {
      if (this.bgEle.find('.catee-subBlks').length < 90000) {
        return false;
      }
      var self = this,
        bgEle = self.bgEle,
        coordinateArr = coordinate.split(':');
        targetEle = bgEle.find(['.catee-subBlks[data-coordinate="', coordinateArr[0], ':', coordinateArr[1], '"]'].join(''))[0],
        gradient = (targetEle.getAttribute('data-gradient') >> 0) - 5;
      gradient = gradient <= 0 ? 0 : gradient;
      targetEle.setAttribute('style', ['background-color:rgb(', gradient, ', ', gradient, ', ', gradient, ');'].join(''));
      targetEle.setAttribute('data-gradient', gradient);
    },

    erasePath: function () {
      var self = this,
        bgEle = self.bgEle;
      bgEle.find('.catee-subBlks').attr('style', 'background-color:rgb(200, 201, 104)').attr('data-gradient', '255');
    }
  }

  DrunkMan = function (opt) {
    this.id = opt.id;
    this.blocksId = opt.blocksId;
    this.initialCoordinate = opt.initialCoordinate || '0:0';
    this.currentCoordinate = '';
    this.drunkmanEle = null;
    this.timeSpace = NaN;
    this.timer = null;
    this.blocks = null;
    this.init();
  }

  DrunkMan.prototype = {

    init: function () {
      var self = this;
      self.drunkmanEle = $('#' + self.id);
      self.timeSpace = 100;
      self.blocks = new Background({id: self.blocksId});
      self.ready();
    },

    ready: function () {
      var self = this,
        drunkMan = self.drunkmanEle,
        initialCoordinate = self.initialCoordinate,
        blocks = self.blocks;
      self.timer = null;
      self.currentCoordinate = initialCoordinate;
      blocks.erasePath();
      blocks.refreshPath(initialCoordinate);
      self.stepTo(initialCoordinate);
    },

    walk: function () {
      var self = this,
        timeSpace = self.timeSpace;
      self.timer = setTimeout(function () {
        self.step();
        self.timer = setTimeout(arguments.callee, timeSpace);
      }, timeSpace)
    },

    pause: function () {
      clearTimeout(this.timer);
    },

    over: function () {
      this.pause();
      this.ready();
    },

    step: function () {
      var self = this,
        currentCoordinate = self.currentCoordinate,
        blocks = self.blocks,
        x = currentCoordinate.split(':')[0] >> 0,
        y = currentCoordinate.split(':')[1] >> 0;
      var tmp = Math.random();
      // if (tmp > 0.5) {
      //   x = x + 1;
      // } else {
      //   x = x - 1;
      // }
      // var tmp = Math.random();
      // if (tmp > 0.5) {
      //   y = y + 1;
      // } else {
      //   y = y - 1;
      // }
      if (tmp < 0.25) {
        x = x + 1;
        y = y;
      } else if (tmp < 0.5) {
        x = x - 1;
        y = y;
      } else if (tmp < 0.75) {
        x = x;
        y = y + 1;
      } else {
        x = x;
        y = y - 1;
      }
      x = x < 0 ? 0 : x;
      x = x > 299 ? 299 : x;
      y = y < 0 ? 0 : y;
      y = y > 299 ? 299 : y;
      currentCoordinate = [x, ':', y].join('');
      self.currentCoordinate = currentCoordinate;
      blocks.refreshPath(currentCoordinate);
      self.stepTo(x, y);
    },

    stepTo: function (coordinate) {
      var x, y;
      coordinate = coordinate.toString();
      if (coordinate.search(':') === -1) {
        x = arguments[0] >> 0;
        y = arguments[1] >> 0;
      } else {
        x = coordinate.split(':')[0] >> 0;
        y = coordinate.split(':')[1] >> 0;
      }
      var self = this,
        drunkMan = self.drunkmanEle,
        blocks = self.blocks;
      drunkMan[0].setAttribute('style', ['left:', x * 2, 'px;top:', y * 2, 'px;'].join(''));
    }

  }

  win.DrunkMan = DrunkMan;

})(window, document, jQuery);

var a = new DrunkMan({
  id: 'catee_drunkMan',
  blocksId: 'catee_blocks',
  initialCoordinate: '150:150'
});
$('input.walk').on('click', function (e) {
  a.walk();
})
$('input.pause').on('click', function (e) {
  a.pause();
})
$('input.over').on('click', function (e) {
  a.over();
})
