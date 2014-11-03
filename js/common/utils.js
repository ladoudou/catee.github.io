(function (win, doc) {
  var utils = {
    $: function(id){
      return doc.getElementById(id);
    },
    fixEvent: function (e) {
      var e = e || win.event;
      e.target = e.target ? e.target : e.srcElement;
      return e;
    },
    preventDefault: function (e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = null;
      }
    },
    stopPropagation: function (e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    },
    hasClass: function(elem, cls){
      var reg = new RegExp('(^|\\s)' + cls + '($|\\s)');
      return reg.test(elem.className);
    },
    removeClass: function(elem, cls){
      var reg = new RegExp('(^|\\s)' + cls + '($|\\s)', 'g');
      elem.className = elem.className.replace(reg, ' ');
    },
    addClass: function(elem, cls){
      if(!this.hasClass(elem, cls)){
        elem.className += ' ' + cls;
      }
    },
    toggleClass: function(ele, cls) {
        if (this.hasClass(ele, cls)) {
          this.removeClass(ele, cls);
        } else {
          this.addClass(ele, cls);
        }
      },
    addEvent: doc.addEventListener ?
      function (elem, type, fn) {
        elem.addEventListener(type, fn, false);
      } : function (elem, type, fn) {
        elem.attachEvent('on' + type, fn);
      },
    removeEvent: doc.removeEventListener ?
      function (elem, type, fn) {
        elem.removeEventListener(type, fn, false);
      } : function (elem, type, fn) {
        elem.detachEvent('on' + type, fn);
      },
    getRelatedTarget: function (e) {
          if (e.relatedTarget) {
              return e.relatedTarget;
          } else if (e.toElement) {
              return e.toElement;
          } else if (e.fromElement) {
              return e.fromElement;
          } else {
              return null;
          }
      },
    delegateByTag: function(ele,tag,etype,fn){
      var that = this;
      that.addEvent(ele,etype,function(ev){
        var e = that.fixEvent(ev);
        var t = e.target;
        tag = tag.toLowerCase();
        do {
          if(t.nodeName && t.nodeName.toLowerCase() === tag){
            fn(e, t);
          }
          t = t.parentNode;
        } while (t && t !== ele)
      });
    },
    bind: function(fn, context){
      return function(){
        fn.apply(context, arguments);
      };
    },
    extend: function extend(obj1, obj2){
      for(var key in obj2){
        obj1[key] = obj2[key];
      }
    },
    viewData: function(){
      var e = 0, l = 0, i = 0, g = 0, f = 0, m = 0;
      var j = win, h = doc, k = h.documentElement;
      e = k.clientWidth || h.body.clientWidth || 0;
      l = j.innerHeight || k.clientHeight || h.body.clientHeight || 0;
      g = h.body.scrollTop || k.scrollTop || j.pageYOffset || 0;
      i = h.body.scrollLeft || k.scrollLeft || j.pageXOffset || 0;
      f = Math.max(h.body.scrollWidth, k.scrollWidth || 0);
      m = Math.max(h.body.scrollHeight, k.scrollHeight || 0, l);
      return {scrollTop: g,scrollLeft: i,documentWidth: f,documentHeight: m,viewWidth: e,viewHeight: l};
    },
    parseJSON: function(str){
      if(typeof(str) === 'object') {
        return str;
      } else {
        if(win.JSON){
          return JSON.parse(str);
        } else {
          return eval('(' + str + ')');
        }
      }
    },
    twoFixNumber: function(n){
      return n > 9 ? n : ('0' + n);
    },
    dateFormat: function(d){
      var dt = new Date(win.parseInt(d, 10) * 1000);
      return (dt.getMonth() + 1) + '\u6708' + dt.getDate() + '\u65E5 ' + utils.twoFixNumber(dt.getHours()) + ':' + utils.twoFixNumber(dt.getMinutes());
    },
    appendHTML: function(ele, html){
      var divTemp = doc.createElement("div"), nodes = null, fragment = doc.createDocumentFragment();
      divTemp.innerHTML = html;
      nodes = divTemp.childNodes;
      for (var i=0, length=nodes.length; i<length; i+=1) {
         fragment.appendChild(nodes[i].cloneNode(true));
      }
      ele.appendChild(fragment);
      nodes = null;
      fragment = null;
    },
    getByClassName: function(str, root, tag) {
      if (root) {
        root = typeof root == "string" ? doc.getElementById(root) : root
      } else {
        root = doc.body
      }
      tag = tag || "*";
      var els = root.getElementsByTagName(tag), arr = [];
      for (var i = 0, n = els.length; i < n; i++) {
        for (var j = 0, k = els[i].className.split(" "), l = k.length; j < l; j++) {
           if (k[j] == str) {
           arr.push(els[i]);
           break
        }}
      }
      return arr;
    },

    getByAttributeName: function(attrName, attrValue, root, tag){
      if (root) {
        root = typeof root == "string" ? doc.getElementById(root) : root
      } else {
        root = doc.body
      }
      tag = tag || "*";
      var els = root.getElementsByTagName(tag), arr = [];
      for (var i = 0, n = els.length; i < n; i++) {
        if(els[i].getAttribute(attrName) == attrValue){
          arr.push(els[i]);
        }
      }
      return arr;
    },
    getPosition: function(ele){
      var positionX=0;
      var positionY=0;
      while(ele!=null){
        positionX+=ele.offsetLeft;
        positionY+=ele.offsetTop;
        ele=ele.offsetParent;
      }
      return {
        x : positionX,
        y : positionY
      };
    }
  }
  win.utils = utils;
})(window, document);
