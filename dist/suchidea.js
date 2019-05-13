(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.suchidea = factory());
}(this, function () { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document) && _isObject(document.createElement);
	var _domCreate = function (it) {
	  return is ? document.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var _functionToString = _shared('native-function-to-string', Function.toString);

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');

	var TO_STRING = 'toString';
	var TPL = ('' + _functionToString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return _functionToString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

	// https://github.com/tc39/Array.prototype.includes

	var $includes = _arrayIncludes(true);

	_export(_export.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables('includes');

	// 7.2.8 IsRegExp(argument)


	var MATCH = _wks('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	};

	// helper for String#{startsWith, endsWith, includes}



	var _stringContext = function (that, searchString, NAME) {
	  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(_defined(that));
	};

	var MATCH$1 = _wks('match');
	var _failsIsRegexp = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH$1] = false;
	      return !'/./'[KEY](re);
	    } catch (f) { /* empty */ }
	  } return true;
	};

	var INCLUDES = 'includes';

	_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~_stringContext(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$1 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$1
	};

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
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

	var toString$1 = Object.prototype.toString;

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
	  type = toString$1.call(val);
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
	var is$1 = Object.assign(itis, {
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

	var Cat = function Cat(properties) {
	  _classCallCheck(this, Cat);

	  is$1.Object(properties) ? Object.assign(this, properties) : this.value = properties;
	};

	function getValue(cat) {
	  return cat.value;
	}

	var isInclude = [].includes(1);
	function choice(yesCallback, noCallback) {
	  return function (cat) {
	    return (getValue(cat) ? yesCallback : noCallback)(cat);
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

	function stage(config_) {} // addEvents( config.dom );

	/**
	 * config {
	 *   container: dom,
	 *   plugins: array,
	 *   mode: string,
	 *   width: number,
	 *   height: number
	 * }
	 */


	function getConfig(config) {
	  return config;
	}

	function birth(func) {
	  return function (config) {
	    try {
	      return new Cat(func(config));
	    } catch (e) {
	      return new Cat({
	        value: null,
	        error: e
	      });
	    }
	  };
	}

	function throwError(cat) {
	  if (cat.error) {
	    throw cat.error;
	  }
	}

	var index = isInclude ? compose(choice(stage, throwError), birth(getConfig)) : null;

	return index;

}));
