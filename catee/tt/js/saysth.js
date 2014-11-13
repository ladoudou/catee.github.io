// fake data

var SDC_data = {
  sdc_info: {
    type: 'test',
    itemid: '140926',
    like_num: 255,
    share_num: 127,
    sdc_num: 5
  },
  sdc_list: [
    {
      angel: {
        aid: '604800000',
        portrait: 'http://catee.github.io/catee/tt/img/husky.jpg',
        nick: 'Lucy'
      },
      content: {
        txt: '怎么领养？可以上门看吗？',
        ptime: 1415260602823
      }
    },
    {
      angel: {
        aid: '604800000',
        portrait: 'http://catee.github.io/catee/tt/img/husky.jpg',
        nick: '爱生活的小熊'
      },
      content: {
        txt: '好可伶的狗狗，希望有人能领养它。',
        ptime: 1415260602823
      }
    },
    {
      angel: {
        aid: '604800000',
        portrait: 'http://catee.github.io/catee/tt/img/husky.jpg',
        nick: '刘烨'
      },
      content: {
        txt: '好巧啊，我们都是同一个时间发的评论呢~~``，那为什么我不是沙发？',
        ptime: 1415260602823
      }
    },
    {
      angel: {
        aid: '604800000',
        portrait: 'http://catee.github.io/catee/tt/img/husky.jpg',
        nick: '汪峰'
      },
      content: {
        txt: '我的梦想就是养一只狗 ...',
        ptime: 1415260602823
      }
    },
    {
      angel: {
        aid: '604800000',
        portrait: 'http://catee.github.io/catee/tt/img/husky.jpg',
        nick: '章子怡'
      },
      content: {
        txt: '顶楼上',
        ptime: 1415260602823
      }
    }
  ]
},
SD_login = {
  islogin: true,
  angel: {
    aid: '604800000',
    portrait: 'http://catee.github.io/catee/tt/img/husky.jpg',
    nick: '七日'
  }
};




;(function (win, doc) {

  var SDC = function (opt) { // Seven Day Comment
    this.containerId = opt.containerId;
    this.containerEle = null;
    this.SDCId = '';
    this.data = null;
    this.btnsFrag = null;
    this.typeinFrag = null;
    this.listFrag = null;
    this.init().getData().package().render();
  }

  SDC.prototype = {
    classArr: {
      btns: ['tc-3Q', 'tc-item-1', 'fftt fs-tc', 'num', 'tc-item-2'],
      typein: ['tc-take-me', 'common-item', 'fl ci-left-img oh', 'oh ci-right', 'tm-type-in', 'tm-say-a-word'],
      list: ['tc-show-love', 'common-item have-line', 'common-item', 'fl ci-left-img oh', 'oh ci-right', 'fs-sma', 'sl-angel', 'sl-date', 'sl-time', 'fs-nor']
    },

    init: function () {
      var self = this;
      self.containerEle = self.$(self.containerId);
      if (! self.containerEle) {
        return;
      }
      self.SDCId = self.containerEle.getAttribute('data-sdcid');
      if (! /^[a-zA-Z]+-\d{6}/.test(self.SDCId)) {
        return;
      }
      self.bind('click', self.clickHandler);
      return this;
    },

    $: function (str) {
      return doc.querySelector(str);
    },

    bind: function (type, handler) {
      var self = this,
        containerEle = self.containerEle;
      containerEle.addEventListener(type, handler(self), false);
    },

    unbind: function () {
    },

    getData: function () {
      var self = this,
        containerEle = self.containerEle,
        SDCId = self.SDCId,
        date = null,
        type = SDCId.split('-');
      if (type[0] === 'test') { // get fake data        
        data = win.SDC_data;
      } else { // get data from the api
        ;
      }
      self.data = data;
      return this;
    },

    postData: function () {
    },

    package: function () {
      var self = this,
        sdc_info = self.data.sdc_info,
        sdc_list = self.data.sdc_list,
        i = 0,
        dat = null,
        sl_len = sdc_list.length,
        btnsFrag = doc.createDocumentFragment(),
        typeinFrag = doc.createDocumentFragment(),
        listFrag = doc.createDocumentFragment(),
        classArr = self.classArr;
      var btnsDiv1 = doc.createElement('div'),
        section1 = self.createSectionAndSpan('E ', sdc_info.sdc_num, classArr.btns),
        section2 = self.createSectionAndSpan('S ', sdc_info.sdc_num, classArr.btns);
      section1.setAttribute('class', classArr.btns[1]);
      section2.setAttribute('class', classArr.btns[4]);
      btnsDiv1.appendChild(section1);
      btnsDiv1.appendChild(section2);
      btnsDiv1.setAttribute('class', classArr.btns[0]);
      btnsFrag.appendChild(btnsDiv1);
      /*pleaseHTML.push('<div class="tc-3Q">',
        '<div class="tc-please">',
          '<section>',
            '<span class="fs-tt-s">E</span>',
            '<span class="num">',
              sdc_info.sdc_num,
            '</span>',
          '</section>',
          '<section>',
            '<span class="fs-tt-s">S</span>',
            '<span class="num">',
              sdc_info.share_num,
            '</span>',
          '</section>',
          '<section>',
            '<span class="fs-tt-s">H</span>',
            '<span class="num">',
              sdc_info.like_num,
            '</span>',
          '</section>',
        '</div>',
      '</div>');*/
      var typeinDiv1 = doc.createElement('div'),
        typeinDiv2 = doc.createElement('div'),
        typeinDiv3 = doc.createElement('div'),
        typeinSection = doc.createElement('section'),
        typeinImg = doc.createElement('img'),
        typeinInput1 = doc.createElement('input'),
        typeinInput2 = doc.createElement('input');
      typeinImg.setAttribute('src', win.SD_login.angel.portrait);
      typeinDiv1.setAttribute('class', classArr.typein[2]);
      typeinDiv1.appendChild(typeinImg);
      typeinInput1.setAttribute('type', 'text');
      typeinInput1.setAttribute('class', classArr.typein[4]);
      typeinInput1.setAttribute('placeholder', '我也说说...');
      typeinInput1.setAttribute('data-type', 'typein');
      typeinInput2.setAttribute('type', 'button');
      typeinInput2.setAttribute('class', classArr.typein[5]);
      typeinInput2.setAttribute('value', '评论');
      typeinInput2.setAttribute('data-type', 'submit');
      typeinDiv2.setAttribute('class', classArr.typein[3]);
      typeinDiv2.appendChild(typeinInput1);
      typeinDiv2.appendChild(typeinInput2);
      typeinSection.setAttribute('class', classArr.typein[1]);
      typeinSection.appendChild(typeinDiv1);
      typeinSection.appendChild(typeinDiv2);
      typeinDiv3.setAttribute('class', classArr.typein[0]);
      typeinDiv3.appendChild(typeinSection);
      typeinFrag.appendChild(typeinDiv3);
      /*takemeHTML.push('<div class="tc-take-me">',
        '<section class="common-item">',
          '<div class="fl ci-left-img oh">',
            '<img src="',
              win.SD_login.angel.portrait,
            '" alt="">',
          '</div>',
          '<div class="oh ci-right">',
            '<input type="text" class="tm-type-in" placeholder="我也说说..." data-type="typein"><input type="button" class="tm-say-a-word" value="评论" data-type="submit">',
          '</div>',
        '</section>',
      '</div>');*/
      var listDiv = doc.createElement('div');
      listDiv.setAttribute('class', classArr.list[0]);
      while (i < sl_len) {
        var dat = self.adjustDate(sdc_list[i].content.ptime),
          listSection = self.createsectionAndDiv(sdc_list[i].angel.portrait, sdc_list[i].angel.nick, dat.date, dat.time, sdc_list[i].content.txt, classArr.list);
        if (i ++ === sl_len - 1) {
          listSection.setAttribute('class', classArr.list[2]);
        } else {
          listSection.setAttribute('class', classArr.list[1]);
        }
        listDiv.appendChild(listSection);
      }
      listFrag.appendChild(listDiv);
      self.btnsFrag = btnsFrag;
      self.typeinFrag = typeinFrag;
      self.listFrag = listFrag;
      return this;
      /*showloveHTML.push('<div class="tc-show-love">');
      while (i < sl_len) {
        i === sl_len - 1 && (isHaveLine = '');
        dat = self.adjustDate(sdc_list[i].content.ptime);
        showloveHTML.push('<section class="common-item ',
            isHaveLine,
          '">',
          '<div class="fl ci-left-img oh">',
            '<img src="',
              sdc_list[i].angel.portrait,
            '" alt="">',
          '</div>',
          '<div class="oh ci-right">',
            '<p class="fs-nor"><span class="sl-angel">',
              sdc_list[i].angel.nick,
            '</span><span class="sl-date">',
              dat.date,
            '</span><span class="sl-time">',
              dat.time,
            '</span></p>',
            '<p class="fs-tit">',
              sdc_list[i ++].content.txt,
            '</p>',
          '</div>',
        '</section>');
      };
      showloveHTML.push('</div>');
      self.html = [pleaseHTML.join(''), takemeHTML.join(''), showloveHTML.join('')].join('');
      return this;*/
    },

    render: function () {
      var self = this,
        containerEle = self.containerEle,
        btnsFrag = self.btnsFrag;
        typeinFrag = self.typeinFrag;
        listFrag = self.listFrag;
      var frag = doc.createDocumentFragment();
      frag.appendChild(btnsFrag);
      frag.appendChild(typeinFrag);
      frag.appendChild(listFrag);
      containerEle.appendChild(frag);
      return this;
    },

    insert: function (data) {
      var self = this,
        listEle = doc.querySelector('.tc-show-love'),
        frag = doc.createDocumentFragment(),
        dat = self.adjustDate(data.content_ptime),
        section = self.createsectionAndDiv(data.portrait, data.nick, dat.date, dat.time, data.content_txt, self.classArr.list);
      section.setAttribute('class', self.classArr.list[1]);
      frag.appendChild(section);
      listEle.insertBefore(frag, listEle.firstChild);
      return this;
    },

    clickHandler: function (that) {
      return function (e) {
        var t = e.target,
          tDateType = t.getAttribute('data-type');
        switch (tDateType) {
          case 'submit':
            var content_txt = that.containerEle.querySelector('[data-type="typein"]').value;
            if (! content_txt) {
              return;
            }
            if (that.SDCId.split('-')[0] === 'test') {
              var fakeData = {
                // type: 'test',
                // itemid: '140926',
                // aid: '604800000',
                portrait: 'http://catee.github.io/catee/tt/img/husky.jpg',
                nick: '七日',
                content_txt: content_txt,
                content_ptime: + new Date()
              };
            }
            that.insert(fakeData).resetTypein();
            break;
          default:
            break;
        }
      }
    },

    resetTypein: function () {
      var self = this,
        typeinEle = self.$('[data-type="typein"]');
      typeinEle.value = '';
    },

    adjustDate: function (ptime) {
      var dat = new Date(ptime);
      return {
        date: [dat.getFullYear(), dat.getMonth() + 1, dat.getDay()].join('-'),
        time: [dat.getHours(), dat.getMinutes(), dat.getSeconds()].join(':')
      }
    },

    createSectionAndSpan: function (txt, num, classArr) {
      var span1 = doc.createElement('span'),
        text1 = doc.createTextNode(txt),
        span2 = doc.createElement('span'),
        text2 = doc.createTextNode(num),
        section = doc.createElement('section');
      span1.setAttribute('class', classArr[2]);
      span1.appendChild(text1);
      span2.setAttribute('class', classArr[3]);
      span2.appendChild(text2);
      section.appendChild(span1);
      section.appendChild(span2);
      return section;
    },

    createsectionAndDiv: function (img_src, name, date, time, content, classArr) {
      var section = doc.createElement('section'),
        div1 = doc.createElement('div'),
        div2 = doc.createElement('div'),
        img = doc.createElement('img'),
        p1 = doc.createElement('p'),
        p2 = doc.createElement('p'),
        span1 = doc.createElement('span'),
        span2 = doc.createElement('span'),
        span3 = doc.createElement('span'),
        text1 = doc.createTextNode(name),
        text2 = doc.createTextNode(date),
        text3 = doc.createTextNode(time),
        text4 = doc.createTextNode(content);
      img.setAttribute('src', img_src);
      div1.setAttribute('class', classArr[3]);
      div1.appendChild(img);
      span1.setAttribute('class', classArr[6]);
      span1.appendChild(text1);
      span2.setAttribute('class', classArr[7]);
      span2.appendChild(text2);
      span3.setAttribute('class', classArr[8]);
      span3.appendChild(text3);
      p1.setAttribute('class', classArr[5]);
      p1.appendChild(span1);
      p1.appendChild(span2);
      p1.appendChild(span3);
      p2.setAttribute('class', classArr[9]);
      p2.appendChild(text4);
      div2.setAttribute('class', classArr[4]);
      div2.appendChild(p1);
      div2.appendChild(p2);
      section.appendChild(div1);
      section.appendChild(div2);
      return section;
    }
  }

  win.SDC = SDC;

})(window, document);

new SDC({
  containerId: '#_Seven_Day_Cmnts'
});
