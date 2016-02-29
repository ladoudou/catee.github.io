(function (win, doc) {

  var SandGlass = function (opt) {
    this.containerId = opt.containerId;
    this.goToHeaven = opt.goToHeaven || function () {};
    this.containerEle = null;
    this.timeStr = '';
    this.timeArr = [];
    this.daysEle = null;
    this.hoursEle = null;
    this.minutesEle = null;
    this.secondsEle = null;
    this.restDays = NaN;
    this.restHours = NaN;
    this.restMinutes = NaN;
    this.restSeconds = NaN;
    this.timer = null;
    this.init();
  };

  SandGlass.prototype = {

    delta: 1000,

    init: function () {
      var self = this;
        containerEle = self.$(self.containerId),
        timeStr = containerEle.getAttribute('data-time'),
        timeArr = timeStr.split(':');
      self.containerEle = containerEle;
      self.timeStr = timeStr;
      self.timeArr = timeArr;
      self.restDays = timeArr[0] >> 0,
      self.restHours = timeArr[1] >> 0,
      self.restMinutes = timeArr[2] >> 0,
      self.restSeconds = timeArr[3] >> 0;
      self.setDom().timing().resetBGB();
      return this;
    },

    timing: function () {
      var self = this;
      clearTimeout(self.timer);
      self.timer = setTimeout(function () {
        self.timer = setTimeout(arguments.callee, self.delta);
        self.stepSeconds();
      }, self.delta);
      return this;
    },

    stepSeconds: function () {
      var self = this,
        secondsEle = self.secondsEle,
        restSeconds = -- self.restSeconds;
        text = null;
      if (restSeconds === -1) {
        restSeconds = self.restSeconds = 59;
        if (! self.stepMinutes()) {
          return 0;
        }
      };
      text = doc.createTextNode(self.adjustShowRules(restSeconds));
      self.removeChildren(secondsEle).appendChild(text);
      return 1;
    },

    stepMinutes: function () {
      var self = this,
        minutesEle = self.minutesEle,
        restMinutes = -- self.restMinutes;
        text = null;
      restMinutes % 2 === 0 && self.resetBGB();
      if (restMinutes === -1) {
        restMinutes = self.restMinutes = 59;
        if (! self.stepHoures()) {
          return 0;
        }
      };
      text = doc.createTextNode(self.adjustShowRules(restMinutes));
      self.removeChildren(minutesEle).appendChild(text);
      return 1;
    },

    stepHoures: function () {
      var self = this,
        hoursEle = self.hoursEle,
        restHours = -- self.restHours;
        text = null;
      if (restHours === -1) {
        restHours = self.restHours = 23;
        if (! self.stepDays()) {
          return 0;
        }
      };
      text = doc.createTextNode(self.adjustShowRules(restHours));
      self.removeChildren(hoursEle).appendChild(text);
      return 1;
    },

    stepDays: function () {
      var self = this,
        daysEle = self.daysEle,
        restDays = -- self.restDays;
        text = null;
      if (restDays === -1) {
        clearTimeout(self.timer);
        self.goToHeaven();
        return 0;
      };
      text = doc.createTextNode(restDays);
      self.removeChildren(daysEle).appendChild(text);
      return 1;
    },

    setDom: function () {
      var self = this,
        containerEle = self.containerEle,
        restSeconds = self.restSeconds,
        restMinutes = self.restMinutes,
        restHours = self.restHours,
        restDays = self.restDays,
        txt1 = doc.createTextNode(restDays),
        txt2 = doc.createTextNode(self.adjustShowRules(restHours)),
        txt3 = doc.createTextNode(self.adjustShowRules(restMinutes)),
        txt4 = doc.createTextNode(self.adjustShowRules(restSeconds)),
        txt5 = doc.createTextNode('天'),
        txt6 = doc.createTextNode('时'),
        txt7 = doc.createTextNode('分'),
        txt8 = doc.createTextNode('秒'),
        b1 = doc.createElement('b'),
        b2 = doc.createElement('b'),
        b3 = doc.createElement('b'),
        b4 = doc.createElement('b'),
        div1 = doc.createElement('div'),
        frag = doc.createDocumentFragment();
      b1.appendChild(txt1);
      b2.appendChild(txt2);
      b3.appendChild(txt3);
      b4.appendChild(txt4);
      div1.setAttribute('class', 'deadline-rest fftt ft-ac');
      div1.appendChild(b1);
      div1.appendChild(txt5);
      div1.appendChild(b2);
      div1.appendChild(txt6);
      div1.appendChild(b3);
      div1.appendChild(txt7);
      div1.appendChild(b4);
      div1.appendChild(txt8);
      frag.appendChild(div1);
      self.removeChildren(containerEle).appendChild(frag);
      self.daysEle = b1;
      self.hoursEle = b2;
      self.minutesEle = b3;
      self.secondsEle = b4;
      return this;
    },

    resetBGB: function () {
      var self = this,
        containerEle = self.containerEle,
        restMinutes = self.restMinutes,
        restHours = self.restHours,
        restDays = self.restDays,
        totle = 7 * 24 * 60,
        passed = restDays * 24 * 60 + restHours * 60 + restMinutes,
        precent = 100 - passed * 100 / totle;
      // console.log(precent);
      containerEle.setAttribute('style', 'background-image: -webkit-linear-gradient(0deg, rgba(204, 204, 204, 0) 0%, rgba(204, 204, 204, 0) ' + precent + '%, rgba(204, 204, 204, 1) ' + precent + '%, rgba(204, 204, 204, 1) 100%), -webkit-linear-gradient(0deg, rgba(1, 173, 181, 1) 0%, rgba(6, 193, 174, 1) 100%)');
    },

    removeChildren: function (parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      };
      return parent;
    },

    adjustShowRules: function (num) {
      return num < 10 ? '0' + num : '' + num;
    },

    $: function (str) {
      return doc.querySelector(str);
    }
    
  };

  win.SandGlass = SandGlass;

})(window, document);

var s = new SandGlass({containerId:'#deadline',goToHeaven:function(){alert('它去了天堂，那里没有痛苦。')}})


