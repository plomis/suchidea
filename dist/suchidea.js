(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.suchidea = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /*!
   * isobject <https://github.com/jonschlinkert/isobject>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   */

  var isobject = function isObject(val) {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
  };

  function isObjectObject(o) {
    return isobject(o) === true
      && Object.prototype.toString.call(o) === '[object Object]';
  }

  var isPlainObject = function isPlainObject(o) {
    var ctor,prot;

    if (isObjectObject(o) === false) return false;

    // If has modified constructor
    ctor = o.constructor;
    if (typeof ctor !== 'function') return false;

    // If has modified prototype
    prot = ctor.prototype;
    if (isObjectObject(prot) === false) return false;

    // If constructor does not have an Object-specific method
    if (prot.hasOwnProperty('isPrototypeOf') === false) {
      return false;
    }

    // Most likely a plain Object
    return true;
  };

  var toString = Object.prototype.toString;

  var kindOf = function kindOf(val) {
    if (val === void 0) return 'undefined';
    if (val === null) return 'null';

    var type = typeof val;
    if (type === 'boolean') return 'boolean';
    if (type === 'string') return 'string';
    if (type === 'number') return 'number';
    if (type === 'symbol') return 'symbol';
    if (type === 'function') {
      return isGeneratorFn(val) ? 'generatorfunction' : 'function';
    }

    if (isArray(val)) return 'array';
    if (isBuffer(val)) return 'buffer';
    if (isArguments(val)) return 'arguments';
    if (isDate(val)) return 'date';
    if (isError(val)) return 'error';
    if (isRegexp(val)) return 'regexp';

    switch (ctorName(val)) {
      case 'Symbol': return 'symbol';
      case 'Promise': return 'promise';

      // Set, Map, WeakSet, WeakMap
      case 'WeakMap': return 'weakmap';
      case 'WeakSet': return 'weakset';
      case 'Map': return 'map';
      case 'Set': return 'set';

      // 8-bit typed arrays
      case 'Int8Array': return 'int8array';
      case 'Uint8Array': return 'uint8array';
      case 'Uint8ClampedArray': return 'uint8clampedarray';

      // 16-bit typed arrays
      case 'Int16Array': return 'int16array';
      case 'Uint16Array': return 'uint16array';

      // 32-bit typed arrays
      case 'Int32Array': return 'int32array';
      case 'Uint32Array': return 'uint32array';
      case 'Float32Array': return 'float32array';
      case 'Float64Array': return 'float64array';
    }

    if (isGeneratorObj(val)) {
      return 'generator';
    }

    // Non-plain objects
    type = toString.call(val);
    switch (type) {
      case '[object Object]': return 'object';
      // iterators
      case '[object Map Iterator]': return 'mapiterator';
      case '[object Set Iterator]': return 'setiterator';
      case '[object String Iterator]': return 'stringiterator';
      case '[object Array Iterator]': return 'arrayiterator';
    }

    // other
    return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
  };

  function ctorName(val) {
    return val.constructor ? val.constructor.name : null;
  }

  function isArray(val) {
    if (Array.isArray) return Array.isArray(val);
    return val instanceof Array;
  }

  function isError(val) {
    return val instanceof Error || (typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number');
  }

  function isDate(val) {
    if (val instanceof Date) return true;
    return typeof val.toDateString === 'function'
      && typeof val.getDate === 'function'
      && typeof val.setDate === 'function';
  }

  function isRegexp(val) {
    if (val instanceof RegExp) return true;
    return typeof val.flags === 'string'
      && typeof val.ignoreCase === 'boolean'
      && typeof val.multiline === 'boolean'
      && typeof val.global === 'boolean';
  }

  function isGeneratorFn(name, val) {
    return ctorName(name) === 'GeneratorFunction';
  }

  function isGeneratorObj(val) {
    return typeof val.throw === 'function'
      && typeof val.return === 'function'
      && typeof val.next === 'function';
  }

  function isArguments(val) {
    try {
      if (typeof val.length === 'number' && typeof val.callee === 'function') {
        return true;
      }
    } catch (err) {
      if (err.message.indexOf('callee') !== -1) {
        return true;
      }
    }
    return false;
  }

  /**
   * If you need to support Safari 5-7 (8-10 yr-old browser),
   * take a look at https://github.com/feross/is-buffer
   */

  function isBuffer(val) {
    if (val.constructor && typeof val.constructor.isBuffer === 'function') {
      return val.constructor.isBuffer(val);
    }
    return false;
  }

  var itis = {};

  ['Array', 'Number', 'Function', 'RegExp', 'Boolean', 'Date', 'Error', 'Arguments', 'Null', 'String'].forEach(function (name) {
    itis[name] = function (v) {
      return kindOf(v) === name.toLowerCase();
    };
  });

  /**
   * 2017-08-12 rainx
   * If a variable is not equal to null or undefined, I think it is defined.
   */
  var isDefined = (function (variable) {
    return variable !== null && variable !== undefined;
  });

  /**
   * 2017-08-12 rainx
   * Be contrary to isDefined.
   */
  var isUndefined = (function (variable) {
    return variable === null || variable === undefined;
  });

  function isItClass(Cls) {
    return function (obj) {
      return obj instanceof Cls;
    };
  }

  function isWindow (win) {
    return win != null && win === win.window;
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  /**
   * nodeType 说明 http://www.w3school.com.cn/jsref/prop_node_nodetype.asp
   *
   * 1 Element  代表元素
   *   Element, Text, Comment, ProcessingInstruction, CDATASection, EntityReference
   * 2 Attr  代表属性
   *   Text, EntityReference
   * 3 Text  代表元素或属性中的文本内容
   *   None
   * 4 CDATASection  代表文档中的 CDATA 部分（不会由解析器解析的文本）
   *   None
   * 5 EntityReference  代表实体引用
   *   Element, ProcessingInstruction, Comment, Text, CDATASection, EntityReference
   * 6 Entity  代表实体
   *   Element, ProcessingInstruction, Comment, Text, CDATASection, EntityReference
   * 7 ProcessingInstruction  代表处理指令
   *   None
   * 8 Comment  代表注释
   *   None
   * 9 Document  代表整个文档（DOM 树的根节点）
   *   Element, ProcessingInstruction, Comment, DocumentType
   * 10 DocumentType  向为文档定义的实体提供接口
   *   None
   * 11 DocumentFragment  代表轻量级的 Document 对象，能够容纳文档的某个部分
   *   Element, ProcessingInstruction, Comment, Text, CDATASection, EntityReference
   * 12 Notation  代表 DTD 中声明的符号
   *   None
   */

  var isElement = (function (element) {
    return (typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && element.nodeType === 1;
  });

  var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var isDocument = (function (element) {
    return (typeof element === 'undefined' ? 'undefined' : _typeof$1(element)) === 'object' && element.nodeType === 9;
  });

  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

  function getLength(obj) {
    return isobject(obj) ? obj.length : undefined;
  }

  function isArrayLike (collection) {
    var length = getLength(collection);
    return itis.Number(length) && length >= 0 && length <= MAX_ARRAY_INDEX;
  }

  // Number, Function, RegExp, Boolean, Date, Error, Arguments,
  // PlainObject, Object, Array, ArrayLike, Element
  Object.assign(itis, {
    Undefined: isUndefined,
    Defined: isDefined,
    Element: isElement,
    Window: isWindow,
    Document: isDocument,
    PlainObject: isPlainObject,
    Object: isobject,
    ArrayLike: isArrayLike,
    isItClass: isItClass
  });

  var Cat =
  /*#__PURE__*/
  function () {
    function Cat(properties) {
      _classCallCheck(this, Cat);

      this.value = properties;
    }

    _createClass(Cat, [{
      key: "getValue",
      value: function getValue() {
        return this.value;
      }
    }]);

    return Cat;
  }();
  function map(func) {
    return function (cat) {
      return func(cat.getValue());
    };
  }
  function birth(func) {
    return function (config) {
      return new Cat(func(config));
    };
  }

  function catcher (func, callback) {
    return function (config) {
      try {
        return func(config);
      } catch (error) {
        callback(error);
      }
    };
  }

  function compose () {
    for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
      funcs[_key] = arguments[_key];
    }

    if (funcs.length === 0) {
      return function (arg) {
        return arg;
      };
    }

    if (funcs.length === 1) {
      return funcs[0];
    }

    var last = funcs[funcs.length - 1];
    var rest = funcs.slice(0, -1);
    return function () {
      return rest.reduceRight(function (composed, f) {
        return f(composed);
      }, last.apply(void 0, arguments));
    };
  }

  /**
   * config {
   *   container: dom,
   *   plugins: array,
   *   mode: string,
   *   width: number,
   *   height: number
   * }
   */
  function getConfig (config) {
    return config;
  }

  function detect(userAgent) {
    return function (regexps) {
      return regexps.reduce(function (version, regexp) {
        if (version === false) {
          var matched = userAgent.match(regexp);
          return matched ? matched[1] || true : version;
        }

        return version;
      }, false);
    };
  }

  function hasOwnProperty(object, propertyName) {
    return Object.prototype.hasOwnProperty.call(object, propertyName);
  } // 横屏


  function landscape() {
    if (screen.orientation && hasOwnProperty(window, 'onorientationchange')) {
      return screen.orientation.type.includes('landscape');
    }

    return window.innerHeight < window.innerWidth;
  } // 竖屏
  // function portrait() {
  //   return !landscape();
  // }


  function walkOnChangeOrientationList(changeOrientationList, newOrientation) {
    for (var i = 0, l = changeOrientationList.length; i < l; i++) {
      changeOrientationList[i](newOrientation);
    }
  }

  function handleOrientation(changeOrientationList, resetCache) {
    return function () {
      if (landscape()) {
        walkOnChangeOrientationList(changeOrientationList, 'landscape');
      } else {
        walkOnChangeOrientationList(changeOrientationList, 'portrait');
      }

      resetCache();
    };
  }
  /**
   * 四个层面 系统环境/浏览器环境/移动设备/软件环境
   * 系统：ios/android/macos/windows
   * 设备：phone/tablet/kindle/pc
   * 浏览器：主流浏览器 ie/chrome/firefox/opera/safari
   * 软件：wechat: ios/android
   *      alipay: ios/android
   */


  function factory() {
    var previousWhatenvis = window.whatenvis;
    var match = detect(navigator.userAgent.toLowerCase());
    var is = {
      // 系统检测
      android: match([/android\s([\d.]+)/]),
      macos: match([/\(macintosh;\sintel\smac\sos\sx\s([\d_]+)/]),
      windows: match([/windows\snt\s([\d.]+)/]),
      ios: match([/\(i[^;]+;( U;)? CPU.+Mac OS X/]),
      // 设备检测
      // phone
      ipad: match([/\(ipad.*os\s([\d_]+)/]),
      // ipod: match([/\(ipod.*os\s([\d_]+)/]),
      iphone: match([/iphone\sos\s([\d_]+)/]),
      windowsPhone: match([/windows\sphone\s([\d.]+)/]),
      // mobile 两边有空格
      // 推测安卓平板一般有 mobile 的代表可以插 sim 卡,所以这样判断不准确
      androidPhone: match([/android\s([\d.]+).*\smobile\s.*/]),
      // pad
      kindle: match([/kindle\/([\d.]+)/]),
      // 浏览器检测及版本
      ie: match([
      /* ie < 11 */
      /msie ([\d.]+)/,
      /* ie11 */
      /rv:([\d.]+)\) like gecko/]),
      edge: match([/edge\/([\d.]+)/]),
      firefox: match([/firefox\/([\d.]+)/]),
      opera: match([/(?:opera|opr).([\d.]+)/]),
      chrome: match([/chrome\/([\d.]+)/, /crios\/([\d.]+)/]),
      chromeMobile: match([/crios\/([\d.]+)/]),
      safari: match([/version\/([\d.]+).*safari/]),
      // 软件环境
      wechat: match([/micromessenger\/([\d.]+)/]),
      alipay: match([/alipayclient\/([\d.]+)/])
    }; // 小米浏览器兼容
    // "Mozilla/5.0 (Linux; U; Android 9; zh-cn; MIX 2S Build/PKQ1.180729.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.128 Mobile Safari/537.36 XiaoMi/MiuiBrowser/10.2.2"

    var adm = match([/android\s.*;\s([^;]*)\sbuild\/.*/]);
    var admTablet = adm && adm.match(/\spad\s/); // const xiaomiPhone = xiaomi && !xiaomiTablet;
    // 由于国产安卓阵营的信息比较乱,需要修正

    is.androidPhone = is.androidPhone && !admTablet; // chrome

    is.chrome = !is.edge && is.chrome; // 系统
    // is.ios = is.ipad || is.iphone; // || is.ipod;

    is.safari = !!(is.ios || is.macos || is.windows) && is.safari; // pad

    is.androidTablet = !is.androidPhone && !!is.android;
    is.windowsTablet = match([/touch/]) && !is.windowsPhone && is.windows; // 平台

    is.phone = !!(is.iphone || is.androidPhone || is.windowsPhone);
    is.tablet = !!(is.ipad || is.androidTablet || is.windowsTablet || match([/tablet/])); // 浏览器

    is.safariMobile = (is.ipad || is.iphone) && is.safari; // 软件环境

    is.iosWechat = is.ios && is.wechat;
    is.androidWechat = is.android && is.wechat;
    is.iosAlipay = is.ios && is.alipay;
    is.androidAlipay = is.android && is.alipay; // pc

    is.pc = !is.phone && !is.tablet && !is.kindle; // 移动端

    if (is.tablet || is.phone) {
      is.landscape = landscape();
      is.portrait = !is.landscape;
      var changeOrientationList = [];

      is.onChangeOrientation = function (cb) {
        if (typeof cb === 'function') {
          changeOrientationList.push(cb);
        }
      };

      var orientationEvent = 'resize';

      if (hasOwnProperty(window, 'onorientationchange')) {
        orientationEvent = 'orientationchange';
      } // Listen for changes in orientation.


      if (window.addEventListener) {
        window.addEventListener(orientationEvent, handleOrientation(changeOrientationList, function () {
          is.landscape = landscape();
          is.portrait = !is.landscape;
        }), false);
      }
    }

    is.noConflict = function () {
      window.whatenvis = previousWhatenvis;
      return is;
    };

    window.whatenvis = is;
    return is;
  }

  var env = {
    factory: factory
  };

  (function () {
    try {
      Object.assign(env, factory());
      delete env.factory;
    } catch (e) {// 啥也不干
    }
  })();

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var EventBaseObject_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function returnFalse() {
    return false;
  }

  function returnTrue() {
    return true;
  }

  function EventBaseObject() {
    this.timeStamp = Date.now();
    this.target = undefined;
    this.currentTarget = undefined;
  }

  EventBaseObject.prototype = {
    isEventObject: 1,

    constructor: EventBaseObject,

    isDefaultPrevented: returnFalse,

    isPropagationStopped: returnFalse,

    isImmediatePropagationStopped: returnFalse,

    preventDefault: function preventDefault() {
      this.isDefaultPrevented = returnTrue;
    },

    stopPropagation: function stopPropagation() {
      this.isPropagationStopped = returnTrue;
    },

    stopImmediatePropagation: function stopImmediatePropagation() {
      this.isImmediatePropagationStopped = returnTrue;
      // fixed 1.2
      // call stopPropagation implicitly
      this.stopPropagation();
    },

    halt: function halt(immediate) {
      if (immediate) {
        this.stopImmediatePropagation();
      } else {
        this.stopPropagation();
      }
      this.preventDefault();
    }
  };

  exports["default"] = EventBaseObject;
  module.exports = exports["default"];
  });

  unwrapExports(EventBaseObject_1);

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
  	if (val === null || val === undefined) {
  		throw new TypeError('Object.assign cannot be called with null or undefined');
  	}

  	return Object(val);
  }

  function shouldUseNative() {
  	try {
  		if (!Object.assign) {
  			return false;
  		}

  		// Detect buggy property enumeration order in older V8 versions.

  		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
  		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
  		test1[5] = 'de';
  		if (Object.getOwnPropertyNames(test1)[0] === '5') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test2 = {};
  		for (var i = 0; i < 10; i++) {
  			test2['_' + String.fromCharCode(i)] = i;
  		}
  		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
  			return test2[n];
  		});
  		if (order2.join('') !== '0123456789') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test3 = {};
  		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
  			test3[letter] = letter;
  		});
  		if (Object.keys(Object.assign({}, test3)).join('') !==
  				'abcdefghijklmnopqrst') {
  			return false;
  		}

  		return true;
  	} catch (err) {
  		// We don't expect any of the above to throw, but better to be safe.
  		return false;
  	}
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  	var from;
  	var to = toObject(target);
  	var symbols;

  	for (var s = 1; s < arguments.length; s++) {
  		from = Object(arguments[s]);

  		for (var key in from) {
  			if (hasOwnProperty$1.call(from, key)) {
  				to[key] = from[key];
  			}
  		}

  		if (getOwnPropertySymbols) {
  			symbols = getOwnPropertySymbols(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}

  	return to;
  };

  var EventObject = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



  var _EventBaseObject2 = _interopRequireDefault(EventBaseObject_1);



  var _objectAssign2 = _interopRequireDefault(objectAssign);

  var TRUE = true;
  var FALSE = false;
  var commonProps = ['altKey', 'bubbles', 'cancelable', 'ctrlKey', 'currentTarget', 'eventPhase', 'metaKey', 'shiftKey', 'target', 'timeStamp', 'view', 'type'];

  function isNullOrUndefined(w) {
    return w === null || w === undefined;
  }

  var eventNormalizers = [{
    reg: /^key/,
    props: ['char', 'charCode', 'key', 'keyCode', 'which'],
    fix: function fix(event, nativeEvent) {
      if (isNullOrUndefined(event.which)) {
        event.which = !isNullOrUndefined(nativeEvent.charCode) ? nativeEvent.charCode : nativeEvent.keyCode;
      }

      // add metaKey to non-Mac browsers (use ctrl for PC 's and Meta for Macs)
      if (event.metaKey === undefined) {
        event.metaKey = event.ctrlKey;
      }
    }
  }, {
    reg: /^touch/,
    props: ['touches', 'changedTouches', 'targetTouches']
  }, {
    reg: /^hashchange$/,
    props: ['newURL', 'oldURL']
  }, {
    reg: /^gesturechange$/i,
    props: ['rotation', 'scale']
  }, {
    reg: /^(mousewheel|DOMMouseScroll)$/,
    props: [],
    fix: function fix(event, nativeEvent) {
      var deltaX = undefined;
      var deltaY = undefined;
      var delta = undefined;
      var wheelDelta = nativeEvent.wheelDelta;
      var axis = nativeEvent.axis;
      var wheelDeltaY = nativeEvent.wheelDeltaY;
      var wheelDeltaX = nativeEvent.wheelDeltaX;
      var detail = nativeEvent.detail;

      // ie/webkit
      if (wheelDelta) {
        delta = wheelDelta / 120;
      }

      // gecko
      if (detail) {
        // press control e.detail == 1 else e.detail == 3
        delta = 0 - (detail % 3 === 0 ? detail / 3 : detail);
      }

      // Gecko
      if (axis !== undefined) {
        if (axis === event.HORIZONTAL_AXIS) {
          deltaY = 0;
          deltaX = 0 - delta;
        } else if (axis === event.VERTICAL_AXIS) {
          deltaX = 0;
          deltaY = delta;
        }
      }

      // Webkit
      if (wheelDeltaY !== undefined) {
        deltaY = wheelDeltaY / 120;
      }
      if (wheelDeltaX !== undefined) {
        deltaX = -1 * wheelDeltaX / 120;
      }

      // 默认 deltaY (ie)
      if (!deltaX && !deltaY) {
        deltaY = delta;
      }

      if (deltaX !== undefined) {
        /**
         * deltaX of mousewheel event
         * @property deltaX
         * @member Event.DomEvent.Object
         */
        event.deltaX = deltaX;
      }

      if (deltaY !== undefined) {
        /**
         * deltaY of mousewheel event
         * @property deltaY
         * @member Event.DomEvent.Object
         */
        event.deltaY = deltaY;
      }

      if (delta !== undefined) {
        /**
         * delta of mousewheel event
         * @property delta
         * @member Event.DomEvent.Object
         */
        event.delta = delta;
      }
    }
  }, {
    reg: /^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,
    props: ['buttons', 'clientX', 'clientY', 'button', 'offsetX', 'relatedTarget', 'which', 'fromElement', 'toElement', 'offsetY', 'pageX', 'pageY', 'screenX', 'screenY'],
    fix: function fix(event, nativeEvent) {
      var eventDoc = undefined;
      var doc = undefined;
      var body = undefined;
      var target = event.target;
      var button = nativeEvent.button;

      // Calculate pageX/Y if missing and clientX/Y available
      if (target && isNullOrUndefined(event.pageX) && !isNullOrUndefined(nativeEvent.clientX)) {
        eventDoc = target.ownerDocument || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;
        event.pageX = nativeEvent.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = nativeEvent.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
      }

      // which for click: 1 === left; 2 === middle; 3 === right
      // do not use button
      if (!event.which && button !== undefined) {
        if (button & 1) {
          event.which = 1;
        } else if (button & 2) {
          event.which = 3;
        } else if (button & 4) {
          event.which = 2;
        } else {
          event.which = 0;
        }
      }

      // add relatedTarget, if necessary
      if (!event.relatedTarget && event.fromElement) {
        event.relatedTarget = event.fromElement === target ? event.toElement : event.fromElement;
      }

      return event;
    }
  }];

  function retTrue() {
    return TRUE;
  }

  function retFalse() {
    return FALSE;
  }

  function DomEventObject(nativeEvent) {
    var type = nativeEvent.type;

    var isNative = typeof nativeEvent.stopPropagation === 'function' || typeof nativeEvent.cancelBubble === 'boolean';

    _EventBaseObject2['default'].call(this);

    this.nativeEvent = nativeEvent;

    // in case dom event has been mark as default prevented by lower dom node
    var isDefaultPrevented = retFalse;
    if ('defaultPrevented' in nativeEvent) {
      isDefaultPrevented = nativeEvent.defaultPrevented ? retTrue : retFalse;
    } else if ('getPreventDefault' in nativeEvent) {
      // https://bugzilla.mozilla.org/show_bug.cgi?id=691151
      isDefaultPrevented = nativeEvent.getPreventDefault() ? retTrue : retFalse;
    } else if ('returnValue' in nativeEvent) {
      isDefaultPrevented = nativeEvent.returnValue === FALSE ? retTrue : retFalse;
    }

    this.isDefaultPrevented = isDefaultPrevented;

    var fixFns = [];
    var fixFn = undefined;
    var l = undefined;
    var prop = undefined;
    var props = commonProps.concat();

    eventNormalizers.forEach(function (normalizer) {
      if (type.match(normalizer.reg)) {
        props = props.concat(normalizer.props);
        if (normalizer.fix) {
          fixFns.push(normalizer.fix);
        }
      }
    });

    l = props.length;

    // clone properties of the original event object
    while (l) {
      prop = props[--l];
      this[prop] = nativeEvent[prop];
    }

    // fix target property, if necessary
    if (!this.target && isNative) {
      this.target = nativeEvent.srcElement || document; // srcElement might not be defined either
    }

    // check if target is a text node (safari)
    if (this.target && this.target.nodeType === 3) {
      this.target = this.target.parentNode;
    }

    l = fixFns.length;

    while (l) {
      fixFn = fixFns[--l];
      fixFn(this, nativeEvent);
    }

    this.timeStamp = nativeEvent.timeStamp || Date.now();
  }

  var EventBaseObjectProto = _EventBaseObject2['default'].prototype;

  (0, _objectAssign2['default'])(DomEventObject.prototype, EventBaseObjectProto, {
    constructor: DomEventObject,

    preventDefault: function preventDefault() {
      var e = this.nativeEvent;

      // if preventDefault exists run it on the original event
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        // otherwise set the returnValue property of the original event to FALSE (IE)
        e.returnValue = FALSE;
      }

      EventBaseObjectProto.preventDefault.call(this);
    },

    stopPropagation: function stopPropagation() {
      var e = this.nativeEvent;

      // if stopPropagation exists run it on the original event
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        // otherwise set the cancelBubble property of the original event to TRUE (IE)
        e.cancelBubble = TRUE;
      }

      EventBaseObjectProto.stopPropagation.call(this);
    }
  });

  exports['default'] = DomEventObject;
  module.exports = exports['default'];
  });

  unwrapExports(EventObject);

  var lib = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = addEventListener;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



  var _EventObject2 = _interopRequireDefault(EventObject);

  function addEventListener(target, eventType, callback, option) {
    function wrapCallback(e) {
      var ne = new _EventObject2['default'](e);
      callback.call(target, ne);
    }

    if (target.addEventListener) {
      var _ret = (function () {
        var useCapture = false;
        if (typeof option === 'object') {
          useCapture = option.capture || false;
        } else if (typeof option === 'boolean') {
          useCapture = option;
        }

        target.addEventListener(eventType, wrapCallback, option || false);

        return {
          v: {
            remove: function remove() {
              target.removeEventListener(eventType, wrapCallback, useCapture);
            }
          }
        };
      })();

      if (typeof _ret === 'object') return _ret.v;
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, wrapCallback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, wrapCallback);
        }
      };
    }
  }

  module.exports = exports['default'];
  });

  var addEventListener = unwrapExports(lib);

  function handleWheel(e) {
    var delta = (env.firefox ? 3 : 1) * e.delta;

    if (delta > 0) {
      // 向上
      console.log("下:", delta);
    } else if (delta < 0) {
      // 向下
      console.log("上:", delta);
    }
  }

  function stage (config) {
    var container = config.dom;
    var eventName = env.firefox ? 'DOMMouseScroll' : 'mousewheel';
    var wheelListener = addEventListener(container, eventName, handleWheel);
    var handleWrap = document.createElement('div');
    container.appendChild(handleWrap);
    return {
      destory: function destory() {
        wheelListener.remove();
      }
    };
  }

  var index = catcher(compose(map(stage), birth(getConfig)), function (error) {
    console.error(error);
  });

  return index;

}));
