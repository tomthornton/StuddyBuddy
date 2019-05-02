(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/core-js/modules/_a-function.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-includes.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
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


/***/ }),

/***/ "./node_modules/core-js/modules/_array-methods.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var asc = __webpack_require__(/*! ./_array-species-create */ "./node_modules/core-js/modules/_array-species-create.js");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-constructor.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-create.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ "./node_modules/core-js/modules/_array-species-constructor.js");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_classof.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_cof.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_core.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_ctx.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
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


/***/ }),

/***/ "./node_modules/core-js/modules/_defined.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_descriptors.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_dom-create.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-bug-keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/modules/_export.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/modules/_fails.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_function-to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_function-to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('native-function-to-string', Function.toString);


/***/ }),

/***/ "./node_modules/core-js/modules/_global.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_has.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_hide.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_html.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/modules/_ie8-dom-define.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_iobject.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-create.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-define.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-step.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iterators.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/modules/_library.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/modules/_meta.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-assign.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-create.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dps.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopd.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gops.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gpo.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys-internal.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-pie.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/modules/_property-desc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var SRC = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('src');
var $toString = __webpack_require__(/*! ./_function-to-string */ "./node_modules/core-js/modules/_function-to-string.js");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/modules/_set-to-string-tag.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared-key.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/modules/_to-absolute-index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-iobject.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-length.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-primitive.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/modules/_uid.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _class_class_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./class/class.component */ "./src/app/class/class.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _core_auth_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/auth.guard */ "./src/app/core/auth.guard.ts");
/* harmony import */ var _dashboard_dashboard_resolver_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dashboard/dashboard-resolver.service */ "./src/app/dashboard/dashboard-resolver.service.ts");








var routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    { path: 'login',
        component: _login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"]
    },
    {
        path: 'dashboard',
        component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"],
        canActivate: [_core_auth_guard__WEBPACK_IMPORTED_MODULE_6__["AuthGuard"]],
        resolve: {
            dashboard: _dashboard_dashboard_resolver_service__WEBPACK_IMPORTED_MODULE_7__["DashboardResolverService"]
        }
    },
    { path: 'classes/:id', component: _class_class_component__WEBPACK_IMPORTED_MODULE_4__["ClassComponent"], canActivate: [_core_auth_guard__WEBPACK_IMPORTED_MODULE_6__["AuthGuard"]] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes /* , {enableTracing: true} */)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\n  <div class='loading'>\n    <div class=\"spinner\">\n      <div class=\"cube1\"></div>\n      <div class=\"cube2\"></div>\n    </div>\n  </div> -->\n  <div class='bg'></div>\n  <app-navbar></app-navbar>\n  <router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".loading {\n  background: rgba(0, 0, 0, 0.9);\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 100; }\n\n.spinner {\n  margin: 100px auto;\n  width: 40px;\n  height: 40px;\n  position: relative;\n  z-index: 101; }\n\n.cube1, .cube2 {\n  background-color: #333;\n  width: 15px;\n  height: 15px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 101;\n  -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;\n  animation: sk-cubemove 1.8s infinite ease-in-out; }\n\n.cube2 {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s; }\n\n@-webkit-keyframes sk-cubemove {\n  25% {\n    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5); }\n  50% {\n    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg); }\n  75% {\n    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5); }\n  100% {\n    -webkit-transform: rotate(-360deg); } }\n\n@keyframes sk-cubemove {\n  25% {\n    transform: translateX(42px) rotate(-90deg) scale(0.5);\n    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5); }\n  50% {\n    transform: translateX(42px) translateY(42px) rotate(-179deg);\n    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg); }\n  50.1% {\n    transform: translateX(42px) translateY(42px) rotate(-180deg);\n    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg); }\n  75% {\n    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5); }\n  100% {\n    transform: rotate(-360deg);\n    -webkit-transform: rotate(-360deg); } }\n\n.bg {\n  background: url('table-texture.jpg');\n  background-size: cover;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90b20vc2Nob29sL0NTQ0k0NTkvU3R1ZGR5QnVkZHkvc3R1ZGR5YnVkZHktYXBwL2FwcC9zcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDhCQUEyQjtFQUMzQixlQUFlO0VBQ2YsTUFBTTtFQUNOLE9BQU87RUFDUCxRQUFRO0VBQ1IsU0FBUztFQUNULFlBQVksRUFBQTs7QUFFZDtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixZQUFZLEVBQUE7O0FBR2Q7RUFDRSxzQkFBc0I7RUFDdEIsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLE9BQU87RUFDUCxZQUFZO0VBRVosd0RBQXdEO0VBQ3hELGdEQUFnRCxFQUFBOztBQUdsRDtFQUNFLDhCQUE4QjtFQUM5QixzQkFBc0IsRUFBQTs7QUFHeEI7RUFDRTtJQUFNLDZEQUE2RCxFQUFBO0VBQ25FO0lBQU0sb0VBQW9FLEVBQUE7RUFDMUU7SUFBTSw4RUFBOEUsRUFBQTtFQUNwRjtJQUFPLGtDQUFrQyxFQUFBLEVBQUE7O0FBRzNDO0VBQ0U7SUFDRSxxREFBcUQ7SUFDckQsNkRBQTZELEVBQUE7RUFDN0Q7SUFDQSw0REFBNEQ7SUFDNUQsb0VBQW9FLEVBQUE7RUFDcEU7SUFDQSw0REFBNEQ7SUFDNUQsb0VBQW9FLEVBQUE7RUFDcEU7SUFDQSxzRUFBc0U7SUFDdEUsOEVBQThFLEVBQUE7RUFDOUU7SUFDQSwwQkFBMEI7SUFDMUIsa0NBQWtDLEVBQUEsRUFBQTs7QUFHdEM7RUFDRSxvQ0FBOEM7RUFDOUMsc0JBQXNCO0VBQ3RCLGVBQWU7RUFDZixNQUFNO0VBQ04sT0FBTztFQUNQLFFBQVE7RUFDUixTQUFTLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubG9hZGluZyB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC45KTtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIHotaW5kZXg6IDEwMDtcbn1cbi5zcGlubmVyIHtcbiAgbWFyZ2luOiAxMDBweCBhdXRvO1xuICB3aWR0aDogNDBweDtcbiAgaGVpZ2h0OiA0MHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDEwMTtcbn1cblxuLmN1YmUxLCAuY3ViZTIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzO1xuICB3aWR0aDogMTVweDtcbiAgaGVpZ2h0OiAxNXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgei1pbmRleDogMTAxO1xuXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBzay1jdWJlbW92ZSAxLjhzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xuICBhbmltYXRpb246IHNrLWN1YmVtb3ZlIDEuOHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XG59XG5cbi5jdWJlMiB7XG4gIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC45cztcbiAgYW5pbWF0aW9uLWRlbGF5OiAtMC45cztcbn1cblxuQC13ZWJraXQta2V5ZnJhbWVzIHNrLWN1YmVtb3ZlIHtcbiAgMjUlIHsgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNDJweCkgcm90YXRlKC05MGRlZykgc2NhbGUoMC41KSB9XG4gIDUwJSB7IC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQycHgpIHRyYW5zbGF0ZVkoNDJweCkgcm90YXRlKC0xODBkZWcpIH1cbiAgNzUlIHsgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMjcwZGVnKSBzY2FsZSgwLjUpIH1cbiAgMTAwJSB7IC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTM2MGRlZykgfVxufVxuXG5Aa2V5ZnJhbWVzIHNrLWN1YmVtb3ZlIHtcbiAgMjUlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNDJweCkgcm90YXRlKC05MGRlZykgc2NhbGUoMC41KTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MnB4KSByb3RhdGUoLTkwZGVnKSBzY2FsZSgwLjUpO1xuICB9IDUwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQycHgpIHRyYW5zbGF0ZVkoNDJweCkgcm90YXRlKC0xNzlkZWcpO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQycHgpIHRyYW5zbGF0ZVkoNDJweCkgcm90YXRlKC0xNzlkZWcpO1xuICB9IDUwLjElIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNDJweCkgdHJhbnNsYXRlWSg0MnB4KSByb3RhdGUoLTE4MGRlZyk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNDJweCkgdHJhbnNsYXRlWSg0MnB4KSByb3RhdGUoLTE4MGRlZyk7XG4gIH0gNzUlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMjcwZGVnKSBzY2FsZSgwLjUpO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCkgdHJhbnNsYXRlWSg0MnB4KSByb3RhdGUoLTI3MGRlZykgc2NhbGUoMC41KTtcbiAgfSAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMzYwZGVnKTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC0zNjBkZWcpO1xuICB9XG59XG4uYmcge1xuICBiYWNrZ3JvdW5kOiB1cmwoJy4uL2Fzc2V0cy90YWJsZS10ZXh0dXJlLmpwZycpO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var AppComponent = /** @class */ (function () {
    function AppComponent(router) {
        var _this = this;
        this.router = router;
        this.loading = false;
        this.router.events.subscribe(function (event) {
            switch (true) {
                case event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationStart"]: {
                    _this.loading = true;
                    break;
                }
                case event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]:
                case event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationCancel"]:
                case event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationError"]: {
                    _this.loading = false;
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire */ "./node_modules/@angular/fire/index.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/auth/index.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/esm5/button-toggle.es5.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/esm5/expansion.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/esm5/stepper.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var _core_auth_guard__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./core/auth.guard */ "./src/app/core/auth.guard.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _class_class_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./class/class.component */ "./src/app/class/class.component.ts");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/navbar/navbar.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _class_grades_grades_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./class/grades/grades.component */ "./src/app/class/grades/grades.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _dashboard_dashdialog_dashdialog_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./dashboard/dashdialog/dashdialog.component */ "./src/app/dashboard/dashdialog/dashdialog.component.ts");
/* harmony import */ var _class_classdialog_classdialog_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./class/classdialog/classdialog.component */ "./src/app/class/classdialog/classdialog.component.ts");
/* harmony import */ var _class_grades_gradedialog_gradedialog_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./class/grades/gradedialog/gradedialog.component */ "./src/app/class/grades/gradedialog/gradedialog.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _class_chat_chat_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./class/chat/chat.component */ "./src/app/class/chat/chat.component.ts");































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_19__["AppComponent"],
                _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_20__["DashboardComponent"],
                _class_class_component__WEBPACK_IMPORTED_MODULE_21__["ClassComponent"],
                _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_22__["NavbarComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_23__["LoginComponent"],
                _class_grades_grades_component__WEBPACK_IMPORTED_MODULE_24__["GradesComponent"],
                _dashboard_dashdialog_dashdialog_component__WEBPACK_IMPORTED_MODULE_26__["DashDialogComponent"],
                _class_classdialog_classdialog_component__WEBPACK_IMPORTED_MODULE_27__["ClassDialogComponent"],
                _class_grades_gradedialog_gradedialog_component__WEBPACK_IMPORTED_MODULE_28__["GradeDialogComponent"],
                _class_chat_chat_component__WEBPACK_IMPORTED_MODULE_30__["ChatComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_fire__WEBPACK_IMPORTED_MODULE_4__["AngularFireModule"].initializeApp(_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].firebase),
                _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__["AngularFirestoreModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIconModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButtonModule"],
                _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_10__["MatButtonToggleModule"],
                _angular_material_expansion__WEBPACK_IMPORTED_MODULE_11__["MatExpansionModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_12__["MatDialogModule"],
                _angular_material_stepper__WEBPACK_IMPORTED_MODULE_13__["MatStepperModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_25__["BrowserAnimationsModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_14__["MatInputModule"],
                _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_29__["MatNativeDateModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_15__["MatMenuModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_16__["MatSelectModule"]
            ],
            providers: [_angular_fire_auth__WEBPACK_IMPORTED_MODULE_7__["AngularFireAuth"], _core_auth_guard__WEBPACK_IMPORTED_MODULE_18__["AuthGuard"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__["MatDatepickerModule"]],
            entryComponents: [_dashboard_dashdialog_dashdialog_component__WEBPACK_IMPORTED_MODULE_26__["DashDialogComponent"], _class_classdialog_classdialog_component__WEBPACK_IMPORTED_MODULE_27__["ClassDialogComponent"], _class_grades_gradedialog_gradedialog_component__WEBPACK_IMPORTED_MODULE_28__["GradeDialogComponent"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_19__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/class/chat/chat.component.html":
/*!************************************************!*\
  !*** ./src/app/class/chat/chat.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class='chat-wrapper'>\n  <div class='messages'>\n    <div [ngClass]='message.id === user.uid ? \"myMessage\" : \"theirMessage\"' class='chat-message' *ngFor='let message of chats'>\n      <span class='chat-userName'>{{message.name}}</span>\n      <div class='chat-message-wrapper'>\n        {{message.content}}\n      </div>\n      </div>\n    </div>\n  </div>\n<div class='chat-container'>\n  <div class='chat-enter-wrapper'>\n    <input class='chat-input' #chatMessage />\n  </div>\n  <a class='chat-enter'>\n    <mat-icon class='chat-enter-icon' (click)=\"this.sendChat(chatMessage.value)\">send</mat-icon>\n  </a>\n</div>\n"

/***/ }),

/***/ "./src/app/class/chat/chat.component.scss":
/*!************************************************!*\
  !*** ./src/app/class/chat/chat.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".chat-container {\n  position: absolute;\n  bottom: 1px;\n  left: 1px;\n  right: 2px;\n  height: 50px;\n  background: rgba(0, 0, 0, 0.9);\n  display: flex; }\n\n.chat-enter-wrapper {\n  width: calc(100% - 70px);\n  height: 100%; }\n\na.chat-enter {\n  width: 70px;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  left: 12px;\n  color: white; }\n\na.chat-enter .chat-enter-icon {\n    cursor: pointer; }\n\n.chat-input {\n  width: 100%;\n  height: calc(100% - 25px);\n  margin-top: 10px;\n  margin-left: 10px;\n  margin-bottom: 10px;\n  padding-left: 10px;\n  background: rgba(255, 255, 255, 0.5);\n  border: 1px solid white;\n  border-radius: 5px; }\n\n.chat-message {\n  padding: 15px;\n  display: flex;\n  flex-direction: column; }\n\n.myMessage {\n  justify-content: flex-end; }\n\n.myMessage .chat-userName {\n    align-self: flex-end;\n    padding-bottom: 10px;\n    font-weight: thin;\n    font-size: 12px; }\n\n.myMessage .chat-message-wrapper {\n    align-self: flex-end;\n    color: white;\n    background: linear-gradient(to top, #021B79, #0575E6); }\n\n.theirMessage .chat-userName {\n  padding-bottom: 10px;\n  font-size: 12px; }\n\n.theirMessage .chat-message-wrapper {\n  align-self: flex-start;\n  background: linear-gradient(to bottom, #d2d2d2, #757575); }\n\n.chat-message-wrapper {\n  border-radius: 5px;\n  padding: 10px;\n  min-width: 200px; }\n\n.messages {\n  overflow: scroll;\n  height: calc(100vh - 222px);\n  display: flex;\n  flex-direction: column-reverse; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90b20vc2Nob29sL0NTQ0k0NTkvU3R1ZGR5QnVkZHkvc3R1ZGR5YnVkZHktYXBwL2FwcC9zcmMvYXBwL2NsYXNzL2NoYXQvY2hhdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsU0FBUztFQUNULFVBQVU7RUFDVixZQUFZO0VBQ1osOEJBQTJCO0VBQzNCLGFBQWEsRUFBQTs7QUFHZjtFQUNFLHdCQUF3QjtFQUN4QixZQUFZLEVBQUE7O0FBR2Q7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsWUFBWSxFQUFBOztBQVJkO0lBU29CLGVBQWUsRUFBQTs7QUFHbkM7RUFDRSxXQUFXO0VBQ1gseUJBQXlCO0VBQ3pCLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixvQ0FBaUM7RUFDakMsdUJBQXVCO0VBQ3ZCLGtCQUFrQixFQUFBOztBQUdwQjtFQUNFLGFBQWE7RUFDYixhQUFhO0VBQ2Isc0JBQXNCLEVBQUE7O0FBR3hCO0VBQ0UseUJBQXlCLEVBQUE7O0FBRDNCO0lBR0ksb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUNwQixpQkFBaUI7SUFDakIsZUFBZSxFQUFBOztBQU5uQjtJQVNJLG9CQUFvQjtJQUNwQixZQUFZO0lBQ1oscURBQXFELEVBQUE7O0FBSXpEO0VBRUksb0JBQW9CO0VBQ3BCLGVBQWUsRUFBQTs7QUFIbkI7RUFNSSxzQkFBc0I7RUFDdEIsd0RBQXdELEVBQUE7O0FBSTVEO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixnQkFBZ0IsRUFBQTs7QUFHbEI7RUFDRSxnQkFBZ0I7RUFDaEIsMkJBQTJCO0VBQzNCLGFBQWE7RUFDYiw4QkFBOEIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2NsYXNzL2NoYXQvY2hhdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jaGF0LWNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAxcHg7XG4gIGxlZnQ6IDFweDtcbiAgcmlnaHQ6IDJweDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuOSk7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5jaGF0LWVudGVyLXdyYXBwZXIge1xuICB3aWR0aDogY2FsYygxMDAlIC0gNzBweCk7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuYS5jaGF0LWVudGVyIHtcbiAgd2lkdGg6IDcwcHg7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbGVmdDogMTJweDtcbiAgY29sb3I6IHdoaXRlO1xuICAuY2hhdC1lbnRlci1pY29ueyBjdXJzb3I6IHBvaW50ZXJ9XG59XG5cbi5jaGF0LWlucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogY2FsYygxMDAlIC0gMjVweCk7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC41KTtcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLmNoYXQtbWVzc2FnZXtcbiAgcGFkZGluZzogMTVweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLm15TWVzc2FnZXtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgLmNoYXQtdXNlck5hbWUge1xuICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICAgIGZvbnQtd2VpZ2h0OiB0aGluO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgfVxuICAuY2hhdC1tZXNzYWdlLXdyYXBwZXIge1xuICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCAjMDIxQjc5LCAjMDU3NUU2KTtcbiAgfVxufVxuXG4udGhlaXJNZXNzYWdle1xuICAuY2hhdC11c2VyTmFtZXtcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gIH1cbiAgLmNoYXQtbWVzc2FnZS13cmFwcGVyIHtcbiAgICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICNkMmQyZDIsICM3NTc1NzUpO1xuICB9XG59XG5cbi5jaGF0LW1lc3NhZ2Utd3JhcHBlcntcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiAxMHB4O1xuICBtaW4td2lkdGg6IDIwMHB4O1xufVxuXG4ubWVzc2FnZXMge1xuICBvdmVyZmxvdzogc2Nyb2xsO1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAyMjJweCk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/class/chat/chat.component.ts":
/*!**********************************************!*\
  !*** ./src/app/class/chat/chat.component.ts ***!
  \**********************************************/
/*! exports provided: ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return ChatComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/auth/index.js");




var ChatComponent = /** @class */ (function () {
    function ChatComponent(db, auth) {
        this.db = db;
        this.auth = auth;
    }
    ChatComponent.prototype.sendChat = function (val) {
        var message = {
            content: val,
            id: this.user.uid,
            name: this.user.displayName,
            time: new Date()
        };
        this.db.collection('classes/' + this.classID + '/chat').add(message);
    };
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.user.subscribe(function (val) {
            _this.user = val;
            console.log(val);
            _this.db.collection('classes/' + _this.classID + '/chat').valueChanges()
                .subscribe(function (messages) {
                _this.chats = messages;
                console.log(messages.sort(function (a, b) {
                    return b.time._compareTo(a.time);
                }));
            });
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ChatComponent.prototype, "classID", void 0);
    ChatComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-chat',
            template: __webpack_require__(/*! ./chat.component.html */ "./src/app/class/chat/chat.component.html"),
            styles: [__webpack_require__(/*! ./chat.component.scss */ "./src/app/class/chat/chat.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"], _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__["AngularFireAuth"]])
    ], ChatComponent);
    return ChatComponent;
}());



/***/ }),

/***/ "./src/app/class/class.component.html":
/*!********************************************!*\
  !*** ./src/app/class/class.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class='class-view'>\n  <div class='class-header'>\n    <div class='class-title' (click)='editClass()' *ngIf='classData'>\n      {{classData.name}}\n      <mat-icon class='class-edit-icon'>edit</mat-icon>\n    </div>\n      <mat-button-toggle-group class='class-nav' (valueChange)='changeView($event)'>\n        <mat-button-toggle value=\"Grades\" checked='true'>\n          Grades\n        </mat-button-toggle>\n        <mat-button-toggle value=\"Chat\">\n          Chat\n        </mat-button-toggle>\n      </mat-button-toggle-group>\n    </div>\n  <app-grades [classData]='classData' [userID]='userID' *ngIf='classView; else chatView'></app-grades>\n  <ng-template #chatView>\n    <app-chat class='class-chat' [classID]='classData.dbID'></app-chat>\n  </ng-template>\n</div>\n"

/***/ }),

/***/ "./src/app/class/class.component.scss":
/*!********************************************!*\
  !*** ./src/app/class/class.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".class-view {\n  margin-top: 44px;\n  width: 100vw;\n  bottom: 0;\n  padding-left: 50px;\n  padding-right: 50px;\n  box-sizing: border-box;\n  padding-top: 25px;\n  overflow: scroll;\n  position: relative; }\n\n.mat-button-toggle-label-content {\n  line-height: 40px !important; }\n\n.mat-button-toggle-checked .mat-button-toggle-focus-overlay {\n  border-bottom: none !important; }\n\n.class-header {\n  font-family: roboto mono;\n  padding-bottom: 20px;\n  font-size: 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  cursor: pointer; }\n\n.class-header .class-edit-icon {\n    font-size: 16px;\n    display: none;\n    justify-content: center;\n    align-items: center;\n    margin-left: 10px; }\n\n.class-title {\n  display: flex;\n  padding: 5px;\n  border-radius: 5px;\n  align-items: center; }\n\n.class-title:hover {\n  background: rgba(255, 255, 255, 0.5); }\n\n.class-title:hover .class-edit-icon {\n    display: flex; }\n\n.class-nav {\n  font-size: 14px; }\n\n.mat-button-toggle-group {\n  border: 1px solid rgba(0, 0, 0, 0.5); }\n\n.mat-button-toggle:not(:last-child) {\n  border-right: 1px solid rgba(0, 0, 0, 0.5); }\n\n.mat-button-toggle-checked {\n  background: rgba(0, 0, 0, 0.8);\n  color: white; }\n\n.class-chat {\n  width: 100%;\n  height: calc(100vh - 170px);\n  background: rgba(255, 255, 255, 0.8);\n  display: block;\n  border: 2px solid rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n  position: relative; }\n\n@media only screen and (max-width: 600px) {\n  .class-view {\n    padding-left: 20px !important;\n    padding-right: 20px !important; }\n  .class-title {\n    width: calc(100% - 177px);\n    font-size: 16px; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90b20vc2Nob29sL0NTQ0k0NTkvU3R1ZGR5QnVkZHkvc3R1ZGR5YnVkZHktYXBwL2FwcC9zcmMvYXBwL2NsYXNzL2NsYXNzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixTQUFTO0VBQ1Qsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixzQkFBc0I7RUFDdEIsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixrQkFBa0IsRUFBQTs7QUFHcEI7RUFDRSw0QkFBNEIsRUFBQTs7QUFHOUI7RUFDRSw4QkFBOEIsRUFBQTs7QUFHaEM7RUFDRSx3QkFBd0I7RUFDeEIsb0JBQW9CO0VBQ3BCLGVBQWU7RUFDZixhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixlQUFlLEVBQUE7O0FBUGpCO0lBU0ksZUFBZTtJQUNmLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLGlCQUFpQixFQUFBOztBQUlyQjtFQUNFLGFBQWE7RUFDYixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLG1CQUFtQixFQUFBOztBQUdyQjtFQUNFLG9DQUFpQyxFQUFBOztBQURuQztJQUdJLGFBQWEsRUFBQTs7QUFJakI7RUFDRSxlQUFlLEVBQUE7O0FBR2pCO0VBQ0Usb0NBQWlDLEVBQUE7O0FBR25DO0VBQ0UsMENBQXVDLEVBQUE7O0FBR3pDO0VBQ0UsOEJBQTJCO0VBQzNCLFlBQVksRUFBQTs7QUFHZDtFQUNFLFdBQVc7RUFDWCwyQkFBMkI7RUFDM0Isb0NBQWlDO0VBQ2pDLGNBQWM7RUFDZCxvQ0FBaUM7RUFDakMsa0JBQWtCO0VBQ2xCLGtCQUFrQixFQUFBOztBQUdwQjtFQUNFO0lBQ0ksNkJBQTZCO0lBQzdCLDhCQUE4QixFQUFBO0VBRWxDO0lBQ0kseUJBQXlCO0lBQ3pCLGVBQWUsRUFBQSxFQUNsQiIsImZpbGUiOiJzcmMvYXBwL2NsYXNzL2NsYXNzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNsYXNzLXZpZXcge1xuICBtYXJnaW4tdG9wOiA0NHB4O1xuICB3aWR0aDogMTAwdnc7XG4gIGJvdHRvbTogMDtcbiAgcGFkZGluZy1sZWZ0OiA1MHB4O1xuICBwYWRkaW5nLXJpZ2h0OiA1MHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBwYWRkaW5nLXRvcDogMjVweDtcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ubWF0LWJ1dHRvbi10b2dnbGUtbGFiZWwtY29udGVudHtcbiAgbGluZS1oZWlnaHQ6IDQwcHggIWltcG9ydGFudDtcbn1cblxuLm1hdC1idXR0b24tdG9nZ2xlLWNoZWNrZWQgLm1hdC1idXR0b24tdG9nZ2xlLWZvY3VzLW92ZXJsYXl7XG4gIGJvcmRlci1ib3R0b206IG5vbmUgIWltcG9ydGFudDtcbn1cblxuLmNsYXNzLWhlYWRlciB7XG4gIGZvbnQtZmFtaWx5OiByb2JvdG8gbW9ubztcbiAgcGFkZGluZy1ib3R0b206IDIwcHg7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIC5jbGFzcy1lZGl0LWljb257XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgfVxufVxuXG4uY2xhc3MtdGl0bGV7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBhZGRpbmc6IDVweDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uY2xhc3MtdGl0bGU6aG92ZXJ7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC41KTtcbiAgLmNsYXNzLWVkaXQtaWNvbntcbiAgICBkaXNwbGF5OiBmbGV4O1xuICB9XG59XG5cbi5jbGFzcy1uYXZ7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLm1hdC1idXR0b24tdG9nZ2xlLWdyb3VwIHtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLDAsMCwwLjUpXG59XG5cbi5tYXQtYnV0dG9uLXRvZ2dsZTpub3QoOmxhc3QtY2hpbGQpIHtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSgwLDAsMCwwLjUpO1xufVxuXG4ubWF0LWJ1dHRvbi10b2dnbGUtY2hlY2tlZHtcbiAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjgpO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5jbGFzcy1jaGF0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDE3MHB4KTtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjgpO1xuICBkaXNwbGF5OiBibG9jaztcbiAgYm9yZGVyOiAycHggc29saWQgcmdiYSgwLDAsMCwwLjUpO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCl7XG4gIC5jbGFzcy12aWV3IHtcbiAgICAgIHBhZGRpbmctbGVmdDogMjBweCAhaW1wb3J0YW50O1xuICAgICAgcGFkZGluZy1yaWdodDogMjBweCAhaW1wb3J0YW50O1xuICB9XG4gIC5jbGFzcy10aXRsZXtcbiAgICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAxNzdweCk7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cblxufVxuIl19 */"

/***/ }),

/***/ "./src/app/class/class.component.ts":
/*!******************************************!*\
  !*** ./src/app/class/class.component.ts ***!
  \******************************************/
/*! exports provided: ClassComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassComponent", function() { return ClassComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _class_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./class.service */ "./src/app/class/class.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _classdialog_classdialog_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./classdialog/classdialog.component */ "./src/app/class/classdialog/classdialog.component.ts");






var ClassComponent = /** @class */ (function () {
    function ClassComponent(classService, route, dialog) {
        this.classService = classService;
        this.route = route;
        this.dialog = dialog;
        this.classView = true;
        this.gradesView = true;
    }
    ClassComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (data) {
            _this.classID = data.id;
            console.log(data);
            _this.classService.getClass(data.id)
                .subscribe(function (classData) {
                classData.grades.forEach(function (gradeType) {
                    gradeType.assignments.obs.subscribe(function (assignment) {
                        gradeType.assignments['data'] = [];
                        assignment.subscribe(function (val) {
                            var assignmentData = val.payload.doc.data();
                            assignmentData['dbID'] = val.payload.doc.id;
                            assignmentData['timestamp'] = assignmentData.date.toDate();
                            assignmentData['hours'] = _this.formatHour(assignmentData.timestamp.getHours());
                            assignmentData['minutes'] = _this.formatMinutes(assignmentData.timestamp.getMinutes());
                            var dateArray = assignmentData.timestamp.toString().split(' ');
                            assignmentData.date = dateArray[0] + ' ' + dateArray[1] + ' ' + dateArray[2];
                            _this.classService.getAssignments(val.payload.doc.ref.path)
                                .subscribe((function (assignmentGrades) {
                                _this.classService.getUserID().subscribe(function (id) {
                                    var found = false;
                                    assignmentGrades.forEach(function (studentGrade) {
                                        if (studentGrade.studentID === id && !found) {
                                            assignmentData['grade'] = studentGrade.grade;
                                            found = true;
                                        }
                                    });
                                });
                            }));
                            gradeType.assignments.data.push(assignmentData);
                        });
                    });
                });
                _this.classData = classData;
                console.log(classData);
            });
        });
        this.classService.getUserID()
            .subscribe(function (val) { return _this.userID = val; });
    };
    ClassComponent.prototype.editClass = function () {
        var dialogRef = this.dialog.open(_classdialog_classdialog_component__WEBPACK_IMPORTED_MODULE_5__["ClassDialogComponent"], {
            width: '600px',
            data: {
                classData: this.classData
            }
        });
    };
    ClassComponent.prototype.changeView = function (button) {
        if (button === 'Chat') {
            this.classView = false;
        }
        else if (button === 'Grades') {
            this.classView = true;
        }
    };
    ClassComponent.prototype.formatHour = function (num) {
        if (num === 0) {
            return 12;
        }
        else if (num <= 12) {
            return num;
        }
        else {
            return num - 12;
        }
    };
    ClassComponent.prototype.formatMinutes = function (num) {
        return num <= 9 ? '0' + num : num;
    };
    ClassComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-class',
            template: __webpack_require__(/*! ./class.component.html */ "./src/app/class/class.component.html"),
            styles: [__webpack_require__(/*! ./class.component.scss */ "./src/app/class/class.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_class_service__WEBPACK_IMPORTED_MODULE_3__["ClassService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"]])
    ], ClassComponent);
    return ClassComponent;
}());



/***/ }),

/***/ "./src/app/class/class.service.ts":
/*!****************************************!*\
  !*** ./src/app/class/class.service.ts ***!
  \****************************************/
/*! exports provided: ClassService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassService", function() { return ClassService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/auth/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var ClassService = /** @class */ (function () {
    function ClassService(db, afAuth) {
        this.db = db;
        this.afAuth = afAuth;
        this.classes = [];
    }
    ClassService.prototype.getClassList = function () {
        var _this = this;
        return this.getUserID().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (userID) {
            return _this.db.collection('users/' + userID + '/classes').valueChanges();
        }));
    };
    ClassService.prototype.allClasses = function () {
        return this.db.collection('classes').valueChanges();
    };
    ClassService.prototype.getClass = function (id) {
        var _this = this;
        var courseData = {};
        return this.db.collection('classes', function (ref) { return ref.where('id', '==', id); }).snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (courseRef) { return courseRef[0].payload.doc; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["mergeMap"])(function (course) {
            courseData = course.data();
            courseData.dbID = course.id;
            return _this.db.collection('classes/' + course.id + '/grades').snapshotChanges();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["mergeMap"])(function (grades) {
            courseData.grades = [];
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(grades);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (grade) {
            var gradeType = grade.payload.doc.data();
            gradeType.dbID = grade.payload.doc.id;
            gradeType.refString = 'classes/' + courseData.dbID + '/grades/' + gradeType.dbID;
            // tslint:disable-next-line:max-line-length
            gradeType.assignments = { obs: _this.db.collection('classes/' + courseData.dbID + '/grades/' + gradeType.dbID + '/assignments')
                    .snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (val) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(val); })) };
            courseData.grades.push(gradeType);
            return courseData;
        }));
    };
    ClassService.prototype.getGrades = function (id) {
        return this.db.collection('classes').doc(id).collection('assignments').snapshotChanges();
    };
    ClassService.prototype.getUserID = function () {
        return this.afAuth.user.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (user) { return user.uid; }));
    };
    ClassService.prototype.addCourse = function (course) {
        var _this = this;
        this.getUserID()
            .subscribe(function (userID) {
            _this.db.collection('users/' + userID + '/classes').add(course);
        });
    };
    ClassService.prototype.removeCourse = function (courseID) {
        var _this = this;
        this.getUserID()
            .subscribe(function (userID) {
            _this.db.collection('users/' + userID + '/classes', function (ref) { return ref.where('id', '==', courseID); }).get().subscribe(function (ref) {
                ref.docs[0].ref.delete();
            });
        });
    };
    ClassService.prototype.getAssignments = function (ref) {
        return this.db.doc(ref).collection('student_grades').valueChanges();
    };
    ClassService.prototype.newClass = function (classData) {
        this.db.collection('classes').add(classData);
    };
    ClassService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"], _angular_fire_auth__WEBPACK_IMPORTED_MODULE_4__["AngularFireAuth"]])
    ], ClassService);
    return ClassService;
}());



/***/ }),

/***/ "./src/app/class/classdialog/classdialog.component.html":
/*!**************************************************************!*\
  !*** ./src/app/class/classdialog/classdialog.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class='class-dialog-wrapper'>\n<h1 class='dialog-title'mat-dialog-title >\n  <div class='class-id'>{{data.classData.id}}</div>\n    \n  <div class='class-name'> {{data.classData.name}}</div>\n  <mat-icon class='dialog-close' (click)='closeDialog()'>close</mat-icon>\n</h1>\n<div class='dialog-content'mat-dialog-content>\n  <div class='class-options'>\n    <mat-form-field class='class-dialog'>\n      <input matInput placeholder=\"Course ID\" [value]=\"data.classData.id\">\n    </mat-form-field>\n    <mat-form-field class='class-dialog'>\n      <input matInput placeholder=\"Course Name\" [value]=\"data.classData.name\">\n    </mat-form-field>\n  </div>\n</div>\n<div class='dialog-actions'mat-dialog-actions >\n  <button class='dialog-button' mat-raised-button>Save Course</button>\n</div>\n</div>\n"

/***/ }),

/***/ "./src/app/class/classdialog/classdialog.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/class/classdialog/classdialog.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dialog-button {\n  background: #0575E6;\n  /* fallback for old browsers */\n  /* Chrome 10-25, Safari 5.1-6 */\n  background: linear-gradient(to top, #021B79, #0575E6);\n  color: white;\n  transition: opacity 0.4s ease-in-out; }\n\n.dialog-title {\n  display: flex;\n  align-items: center;\n  font-size: 14px;\n  justify-content: space-between;\n  position: relative; }\n\n.class-title {\n  display: flex;\n  align-items: center;\n  border-radius: 4px;\n  overflow: hidden; }\n\n.class-id {\n  background: #0575E6;\n  /* fallback for old browsers */\n  /* Chrome 10-25, Safari 5.1-6 */\n  background: linear-gradient(to top, #021B79, #0575E6);\n  color: white;\n  padding: 5px 10px;\n  border-radius: 5px; }\n\n.grades-wrapper {\n  height: 100%;\n  border: 2px solid rgba(0, 0, 0, 0.5);\n  box-sizing: border-box;\n  overflow: scroll; }\n\n.class-name {\n  color: black;\n  font-weight: 100;\n  position: absolute;\n  width: 100%;\n  text-align: center;\n  font-size: 16px; }\n\n.grade-type-title {\n  padding: 10px;\n  color: white;\n  background: linear-gradient(to bottom, #b5b5b5, #4a4a4a);\n  font-size: 14px; }\n\n.assignment {\n  padding: 10px;\n  font-size: 14px; }\n\n.assignment:not(:last-child) {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.3); }\n\n.class-title {\n  display: flex;\n  font-size: 16px; }\n\n.dialog-close {\n  color: black;\n  position: relative; }\n\n.dialog-close {\n  cursor: pointer; }\n\n.class-dialog {\n  width: 100%; }\n\n.dialog-actions {\n  display: flex;\n  justify-content: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90b20vc2Nob29sL0NTQ0k0NTkvU3R1ZGR5QnVkZHkvc3R1ZGR5YnVkZHktYXBwL2FwcC9zcmMvYXBwL2NsYXNzL2NsYXNzZGlhbG9nL2NsYXNzZGlhbG9nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0VBQ0UsbUJBQW1CO0VBQUcsOEJBQUE7RUFDMEMsK0JBQUE7RUFDaEUscURBQXFEO0VBQ3JELFlBQVk7RUFDWixvQ0FBb0MsRUFBQTs7QUFHdEM7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZiw4QkFBOEI7RUFDOUIsa0JBQWtCLEVBQUE7O0FBRXBCO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsZ0JBQWdCLEVBQUE7O0FBRWxCO0VBQ0UsbUJBQW1CO0VBQUcsOEJBQUE7RUFDMEMsK0JBQUE7RUFDaEUscURBQXFEO0VBQ3JELFlBQVk7RUFDWixpQkFBaUI7RUFDakIsa0JBQWtCLEVBQUE7O0FBSXBCO0VBQ0UsWUFBWTtFQUNaLG9DQUFpQztFQUNqQyxzQkFBc0I7RUFDdEIsZ0JBQWdCLEVBQUE7O0FBSWxCO0VBQ0UsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixlQUFlLEVBQUE7O0FBR2pCO0VBQ0UsYUFBYTtFQUNiLFlBQVk7RUFDWix3REFBd0Q7RUFDeEQsZUFBZSxFQUFBOztBQUdqQjtFQUNFLGFBQWE7RUFDYixlQUFlLEVBQUE7O0FBR25CO0VBQ0ksMkNBQXdDLEVBQUE7O0FBRzFDO0VBQ0ksYUFBYTtFQUNiLGVBQWUsRUFBQTs7QUFHakI7RUFDRSxZQUFZO0VBQ1osa0JBQWtCLEVBQUE7O0FBR3RCO0VBQ0UsZUFBZSxFQUFBOztBQUdqQjtFQUNFLFdBQVcsRUFBQTs7QUFHYjtFQUNFLGFBQWE7RUFDYix1QkFBdUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2NsYXNzL2NsYXNzZGlhbG9nL2NsYXNzZGlhbG9nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIC5kaWFsb2ctYnV0dG9ue1xuICAgIGJhY2tncm91bmQ6ICMwNTc1RTY7ICAvKiBmYWxsYmFjayBmb3Igb2xkIGJyb3dzZXJzICovXG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG8gdG9wLCAjMDIxQjc5LCAjMDU3NUU2KTsgIC8qIENocm9tZSAxMC0yNSwgU2FmYXJpIDUuMS02ICovXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwgIzAyMUI3OSwgIzA1NzVFNik7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC40cyBlYXNlLWluLW91dDtcbiAgfVxuXG4gIC5kaWFsb2ctdGl0bGUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuICAuY2xhc3MtdGl0bGV7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG4gIC5jbGFzcy1pZHtcbiAgICBiYWNrZ3JvdW5kOiAjMDU3NUU2OyAgLyogZmFsbGJhY2sgZm9yIG9sZCBicm93c2VycyAqL1xuICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvIHRvcCwgIzAyMUI3OSwgIzA1NzVFNik7ICAvKiBDaHJvbWUgMTAtMjUsIFNhZmFyaSA1LjEtNiAqL1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsICMwMjFCNzksICMwNTc1RTYpO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBwYWRkaW5nOiA1cHggMTBweDtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG5cbiAgfVxuXG4gIC5ncmFkZXMtd3JhcHBlciB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIHJnYmEoMCwwLDAsMC41KTtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIG92ZXJmbG93OiBzY3JvbGw7XG4gIH1cblxuXG4gIC5jbGFzcy1uYW1le1xuICAgIGNvbG9yOiBibGFjaztcbiAgICBmb250LXdlaWdodDogMTAwO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICB9XG5cbiAgLmdyYWRlLXR5cGUtdGl0bGUge1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICNiNWI1YjUsICM0YTRhNGEpO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgfVxuXG4gIC5hc3NpZ25tZW50e1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uYXNzaWdubWVudDpub3QoOmxhc3QtY2hpbGQpe1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMyk7XG59XG5cbiAgLmNsYXNzLXRpdGxle1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxuXG4gICAgLmRpYWxvZy1jbG9zZXtcbiAgICAgIGNvbG9yOiBibGFjaztcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG5cbiAgLmRpYWxvZy1jbG9zZXtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cblxuICAuY2xhc3MtZGlhbG9ne1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLmRpYWxvZy1hY3Rpb25ze1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIH0iXX0= */"

/***/ }),

/***/ "./src/app/class/classdialog/classdialog.component.ts":
/*!************************************************************!*\
  !*** ./src/app/class/classdialog/classdialog.component.ts ***!
  \************************************************************/
/*! exports provided: ClassDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassDialogComponent", function() { return ClassDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");



var ClassDialogComponent = /** @class */ (function () {
    function ClassDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ClassDialogComponent.prototype.ngOnInit = function () {
    };
    ClassDialogComponent.prototype.closeDialog = function () {
        this.dialogRef.close();
    };
    ClassDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-classdialog',
            template: __webpack_require__(/*! ./classdialog.component.html */ "./src/app/class/classdialog/classdialog.component.html"),
            styles: [__webpack_require__(/*! ./classdialog.component.scss */ "./src/app/class/classdialog/classdialog.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], ClassDialogComponent);
    return ClassDialogComponent;
}());



/***/ }),

/***/ "./src/app/class/grades/grade.service.ts":
/*!***********************************************!*\
  !*** ./src/app/class/grades/grade.service.ts ***!
  \***********************************************/
/*! exports provided: GradeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GradeService", function() { return GradeService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");



var GradeService = /** @class */ (function () {
    function GradeService(db) {
        this.db = db;
    }
    GradeService.prototype.addAssignment = function (type, ref) {
    };
    GradeService.prototype.updateData = function (data, refString) {
        this.db.doc(refString).update(data);
    };
    GradeService.prototype.addData = function (data, refString) {
        this.db.collection(refString).add(data);
    };
    GradeService.prototype.deleteData = function (data, refString) {
        this.db.doc(refString).delete();
    };
    GradeService.prototype.updateGrade = function (data, refString) {
        var _this = this;
        this.db.collection(refString).get().subscribe(function (studentGrades) {
            if (studentGrades.size === 0) {
                _this.db.collection(refString).add(data);
            }
            else {
                var found_1 = false;
                studentGrades.docs.forEach(function (grade) {
                    if (grade.data().studentID === data.studentID) {
                        grade.ref.update(data);
                        found_1 = true;
                    }
                });
                if (!found_1) {
                    _this.db.collection(refString).add(data);
                }
            }
        });
    };
    GradeService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"]])
    ], GradeService);
    return GradeService;
}());



/***/ }),

/***/ "./src/app/class/grades/gradedialog/gradedialog.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/class/grades/gradedialog/gradedialog.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 class='dialog-title'mat-dialog-title >{{data.title}} <mat-icon class='dialog-close' (click)='closeDialog()'>close</mat-icon></h1>\n<div class='dialog-content'mat-dialog-content>\n  <div class='dialog-alert'>{{alertMessage}}</div>\n    <div *ngIf='data.options'>\n    <mat-form-field class=\"dialog-option\"\n      *ngFor='let option of data.options'\n      [ngStyle]='{\"width\": data.type === \"assignment\" && option.name ===\"name\" ? \"100%\" : \"\"}'\n      >\n      <mat-label>{{option.name}}</mat-label>\n      <span matSuffix *ngIf='option.suffix'>{{option.suffix}}</span>\n      <span *ngIf='option.name === \"time\"' class='time-select'>\n          <select\n            (click)=\"timeSelect($event)\"\n            (change)='updateData(\"AMPM\", $event.target.value)'\n            [value]='option.AMPM'>\n              <option>AM</option>\n              <option>PM</option>\n            </select>\n      </span>\n      <div class='dialog-color' *ngIf='option.name == \"Color\"' [ngStyle] ='{\"background\": option.value}'></div>\n      <mat-select *ngIf='option.type === \"select\"' [value]='option.value' (selectionChange)='updateData(option.name, $event.value)'>\n        <mat-option *ngFor=\"let selectOption of option.options\" [value]=\"selectOption\">\n          {{selectOption}}\n          <div class='dialog-color' *ngIf='option.name == \"Color\"' [ngStyle] ='{\"background\": selectOption}'></div>\n        </mat-option>\n      </mat-select>\n      <div *ngIf='option.type == \"date\"'>\n          <input matInput [matDatepicker]=\"picker3\" [value]='option.value'(dateInput)='updateData(\"date\", $event.target.value)'>\n          <mat-datepicker-toggle class='date-toggle' matSuffix [for]=\"picker3\"></mat-datepicker-toggle>\n          <mat-datepicker #picker3></mat-datepicker>\n        </div>\n      <input matInput [value]=\"option.value\"\n      (input)='updateData(option.name, $event.target.value)'\n      *ngIf='option.type === \"input\"'>\n    </mat-form-field>\n    </div>\n    <div class='dialog-confirm' *ngIf='data.confirm'>{{data.confirm}}</div>\n  </div>\n<div class='dialog-actions'mat-dialog-actions >\n  <button class='dialog-button' mat-raised-button *ngFor='let button of data.buttons' (click)='gradeActions(button.method)'>\n    {{button.text}}\n  </button>\n</div>\n"

/***/ }),

/***/ "./src/app/class/grades/gradedialog/gradedialog.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/class/grades/gradedialog/gradedialog.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dialog-color {\n  position: absolute;\n  width: 11px;\n  height: 11px;\n  border-radius: 15px;\n  right: 25px;\n  bottom: 15px; }\n\n.date-toggle {\n  width: 1em !important;\n  position: absolute;\n  right: 24px;\n  bottom: -4px; }\n\n.dialog-close {\n  cursor: pointer; }\n\n.time-select {\n  position: absolute;\n  right: 10px;\n  bottom: 6px; }\n\n.dialog-actions {\n  display: flex;\n  justify-content: space-around; }\n\n.dialog-confirm {\n  margin-bottom: 30px;\n  margin-top: 25px;\n  text-align: center; }\n\n.dialog-button {\n  background: #0575E6;\n  /* fallback for old browsers */\n  /* Chrome 10-25, Safari 5.1-6 */\n  background: linear-gradient(to top, #021B79, #0575E6);\n  color: white; }\n\n.dialog-title {\n  display: flex;\n  justify-content: space-between;\n  align-items: center; }\n\n.dialog-alert {\n  color: red;\n  text-align: center;\n  font-size: 14px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90b20vc2Nob29sL0NTQ0k0NTkvU3R1ZGR5QnVkZHkvc3R1ZGR5YnVkZHktYXBwL2FwcC9zcmMvYXBwL2NsYXNzL2dyYWRlcy9ncmFkZWRpYWxvZy9ncmFkZWRpYWxvZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsWUFBWSxFQUFBOztBQUdkO0VBQ0UscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsWUFBWSxFQUFBOztBQUVkO0VBQ0UsZUFBZSxFQUFBOztBQUdqQjtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsV0FBVyxFQUFBOztBQUdiO0VBQ0UsYUFBYTtFQUNiLDZCQUE2QixFQUFBOztBQUcvQjtFQUNFLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsa0JBQWtCLEVBQUE7O0FBR3BCO0VBQ0UsbUJBQW1CO0VBQUcsOEJBQUE7RUFDMEMsK0JBQUE7RUFDaEUscURBQXFEO0VBQ3JELFlBQVksRUFBQTs7QUFHZDtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUJBQW1CLEVBQUE7O0FBR3JCO0VBQ0UsVUFBVTtFQUNWLGtCQUFrQjtFQUNsQixlQUFlLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jbGFzcy9ncmFkZXMvZ3JhZGVkaWFsb2cvZ3JhZGVkaWFsb2cuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGlhbG9nLWNvbG9yIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMTFweDtcbiAgaGVpZ2h0OiAxMXB4O1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICByaWdodDogMjVweDtcbiAgYm90dG9tOiAxNXB4O1xufVxuXG4uZGF0ZS10b2dnbGV7XG4gIHdpZHRoOiAxZW0gIWltcG9ydGFudDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMjRweDtcbiAgYm90dG9tOiAtNHB4O1xufVxuLmRpYWxvZy1jbG9zZXtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4udGltZS1zZWxlY3Qge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAxMHB4O1xuICBib3R0b206IDZweDtcbn1cblxuLmRpYWxvZy1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG59XG5cbi5kaWFsb2ctY29uZmlybSB7XG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gIG1hcmdpbi10b3A6IDI1cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmRpYWxvZy1idXR0b257XG4gIGJhY2tncm91bmQ6ICMwNTc1RTY7ICAvKiBmYWxsYmFjayBmb3Igb2xkIGJyb3dzZXJzICovXG4gIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvIHRvcCwgIzAyMUI3OSwgIzA1NzVFNik7ICAvKiBDaHJvbWUgMTAtMjUsIFNhZmFyaSA1LjEtNiAqL1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCAjMDIxQjc5LCAjMDU3NUU2KTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uZGlhbG9nLXRpdGxle1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5kaWFsb2ctYWxlcnR7XG4gIGNvbG9yOiByZWQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/class/grades/gradedialog/gradedialog.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/class/grades/gradedialog/gradedialog.component.ts ***!
  \*******************************************************************/
/*! exports provided: GradeDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GradeDialogComponent", function() { return GradeDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _grade_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../grade.service */ "./src/app/class/grades/grade.service.ts");




var GradeDialogComponent = /** @class */ (function () {
    function GradeDialogComponent(gradeService, dialogRef, data) {
        this.gradeService = gradeService;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    GradeDialogComponent.prototype.ngOnInit = function () {
    };
    GradeDialogComponent.prototype.timeSelect = function (event) {
        event.stopPropagation();
    };
    GradeDialogComponent.prototype.updateDate = function () {
        var date = new Date();
        var time = '';
        var AMPM = '';
        this.data.options.forEach(function (option) {
            switch (option.name) {
                case 'timestamp':
                    date = new Date(option.value);
                    break;
                case 'time':
                    time = option.value.split(':');
                    AMPM = option.AMPM;
                    break;
            }
        });
        // tslint:disable-next-line:radix
        date.setHours(AMPM === 'PM' ? parseInt(time[0]) * 2 : parseInt(time[0]));
        // tslint:disable-next-line:radix
        date.setMinutes(parseInt(time[1]));
        this.data.options.forEach(function (option) {
            if (option.name === 'timestamp') {
                option.value = date;
            }
        });
    };
    GradeDialogComponent.prototype.updateData = function (name, value) {
        this.data.options.forEach(function (option) {
            if (option.name === name) {
                option.value = value;
            }
            if (name === 'AMPM' && option.name === 'time') {
                option.AMPM = value;
            }
        });
        switch (name) {
            case 'date':
                this.updateDate();
                break;
            case 'time':
                var timeRegEx = new RegExp(/^(0?[1-9]|1[0-2]):[0-5][0-9]$/);
                if (timeRegEx.test(value)) {
                    this.updateDate();
                }
                break;
            case 'AMPM':
                this.updateDate();
                break;
        }
    };
    GradeDialogComponent.prototype.gradeActions = function (method) {
        if (method === 'create' || method === 'update') {
            var data = this.updateValues();
            if (method === 'create') {
                this.gradeService.addData(data, this.data.refString);
            }
            else {
                this.gradeService.updateData(data, this.data.refString);
            }
            this.dialogRef.close();
        }
        else {
            this.gradeService.deleteData(this.data.dbID, this.data.refString);
        }
    };
    GradeDialogComponent.prototype.updateValues = function () {
        var data = {};
        this.data.options.forEach(function (option) {
            switch (option.name) {
                case ('time'):
                    data['AMPM'] = option.AMPM;
                    break;
                case ('Weight (%)'):
                    data['percentage'] = option.value;
                    break;
                default:
                    data[option.name] = option.value;
            }
        });
        return data;
    };
    GradeDialogComponent.prototype.closeDialog = function () {
        this.dialogRef.close();
    };
    GradeDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-gradedialog',
            template: __webpack_require__(/*! ./gradedialog.component.html */ "./src/app/class/grades/gradedialog/gradedialog.component.html"),
            styles: [__webpack_require__(/*! ./gradedialog.component.scss */ "./src/app/class/grades/gradedialog/gradedialog.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_grade_service__WEBPACK_IMPORTED_MODULE_3__["GradeService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], GradeDialogComponent);
    return GradeDialogComponent;
}());



/***/ }),

/***/ "./src/app/class/grades/grades.component.html":
/*!****************************************************!*\
  !*** ./src/app/class/grades/grades.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class='class-grades' *ngIf='classData.grades'>\n    <div class='class-gradebar' *ngIf='classData.grades'>\n      <div\n        class='gradebar-section'\n        *ngFor=\"let grade of classData.grades\"\n        [ngStyle]='{\n          \"width\": grade.percentage + \"%\",\n          \"background\": grade.color\n        }'\n        >\n        <div class='gradebar-info'><span>{{grade.type}} - {{grade.percentage}}%</span></div>\n      </div>\n    </div>\n    <div class='class-grades-wrapper'>\n      <div class='class-grades-title' *ngIf=\"this.classView === 'grades'\">\n        Grades\n        <div>\n          <button mat-button [matMenuTriggerFor]=\"gradesOptions\" class='class-grades-options'>\n            <mat-icon>more_horiz</mat-icon>\n          </button>\n          <mat-menu #gradesOptions=\"matMenu\">\n            <button mat-menu-item (click)='dataActions({\"type\": \"grade type\", \"action\": \"create\"}, classData.refString)'>Add Grade Type</button>\n          </mat-menu>\n        </div>\n      </div>\n      <div class='class-grade' *ngFor='let gradeType of classData.grades'>\n        <div class='class-grade-title'>\n          <span [ngStyle]='{\"position\": \"relative\", \"z-index\": 10}'>{{gradeType.name}}</span>\n          <div class='class-grade-title-overlay' [ngStyle]='{\"background\":gradeType.color}'></div>\n          <div>\n            <button mat-button [matMenuTriggerFor]=\"gradesOptions\" class='class-grades-options'>\n              <mat-icon>more_horiz</mat-icon>\n            </button>\n            <mat-menu #gradesOptions=\"matMenu\">\n              <button mat-menu-item (click)='dataActions({\"type\": \"assignment\", \"action\": \"create\"}, gradeType.refString)'>Add Assignment</button>\n              <button mat-menu-item (click)='dataActions({\"type\": \"grade type\", \"action\": \"update\", \"data\": gradeType}, gradeType.refString)'>Edit Grade Type</button>\n            </mat-menu>\n          </div>\n        </div>\n        <div class='class-assignment' *ngFor='let assignment of gradeType.assignments.data'\n          >\n          <div class='class-assignment-title'>\n            {{assignment.name}}\n          </div>\n          <div class='class-assignment-datetime'>\n            <div class='assignment-date'>{{assignment.date}}</div>\n            <div class='assignment-time'>{{assignment.hours + ':' + assignment.minutes}}</div>\n            <div class='assigment-AMPM'>{{assignment.AMPM}}</div>\n            <div class='assignment-grade'>\n              <input (keyup)='updateGrade($event, assignment.dbID, gradeType.refString)' class='assignment-grade-input' [value]='assignment.grade'/>\n              <span class='percent-sign'>%</span>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n"

/***/ }),

/***/ "./src/app/class/grades/grades.component.scss":
/*!****************************************************!*\
  !*** ./src/app/class/grades/grades.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".class-gradebar {\n  height: 20px;\n  background: rgba(255, 255, 255, 0.5);\n  display: flex;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  margin-bottom: 30px;\n  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3); }\n\n.gradebar-section {\n  cursor: pointer;\n  opacity: 0.7;\n  position: relative; }\n\n.gradebar-section:hover {\n  opacity: 1; }\n\n.gradebar-section:hover .gradebar-info {\n    display: flex; }\n\n.gradebar-info {\n  display: none;\n  position: absolute;\n  top: 100%;\n  justify-content: center;\n  width: 100%; }\n\n.gradebar-info span {\n    padding: 5px;\n    font-size: 12px;\n    color: black;\n    font-weight: 100;\n    white-space: nowrap; }\n\n.grade-section {\n  background: rgba(0, 0, 0, 0.8); }\n\n.grade-section-header {\n  background: white !important;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.3); }\n\n.add-grade {\n  color: white;\n  display: flex;\n  justify-content: center;\n  padding-top: 15px; }\n\n.add-grade .mat-icon {\n    opacity: 0.6;\n    cursor: pointer; }\n\n.add-grade .mat-icon:hover {\n    opacity: 1; }\n\n.assignment {\n  display: flex;\n  cursor: pointer;\n  padding: 20px 25px;\n  color: white;\n  font-size: 14px;\n  margin-left: -25px;\n  margin-right: -25px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.5); }\n\n.assignment .assignment-title {\n    width: 33%;\n    display: flex;\n    justify-content: flex-start; }\n\n.assignment .assignment-title input {\n      text-align: left; }\n\n.assignment .assignment-duedate {\n    width: 33%;\n    display: flex;\n    justify-content: center; }\n\n.assignment .assignment-duedate input {\n      text-align: center; }\n\n.assignment .assignment-grade {\n    width: 33%;\n    display: flex;\n    justify-content: flex-end; }\n\n.assignment .assignment-grade input {\n      text-align: right; }\n\n.assignment:hover {\n  background: rgba(255, 255, 255, 0.1); }\n\n.assignment-input {\n  background: none;\n  border: none;\n  color: white;\n  font-size: 14px;\n  padding: 5px; }\n\n.class-grades-wrapper {\n  background: rgba(255, 255, 255, 0.5);\n  height: calc(100vh - 230px);\n  border: 2px solid rgba(0, 0, 0, 0.5);\n  box-sizing: border-box;\n  border-radius: 5px;\n  overflow-x: hidden;\n  overflow-y: scroll; }\n\n.class-grades-title {\n  padding: 13px;\n  background: #292929;\n  color: white;\n  font-size: 16px;\n  box-sizing: border-box;\n  border-bottom: 2px solid rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: space-between;\n  cursor: pointer;\n  align-items: center; }\n\n.class-grade {\n  cursor: pointer; }\n\n.class-grade-title {\n  padding: 10px;\n  font-size: 14px;\n  background: white;\n  color: white;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.9);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  position: relative; }\n\n.class-grade-title-overlay {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  opacity: 0.9; }\n\n.class-assignment {\n  font-size: 14px;\n  padding: 15px 30px;\n  background: white;\n  cursor: pointer;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.3);\n  display: flex;\n  justify-content: space-between; }\n\n.class-assignment:hover {\n  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);\n  position: relative; }\n\n.class-assignment-datetime {\n  display: flex; }\n\n.assignment-date {\n  margin-right: 20px; }\n\n.class-assignment:hover::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.1); }\n\n.class-grades-options {\n  padding: 0px !important;\n  min-width: 40px; }\n\n.class-grades-options:hover {\n  background: rgba(0, 0, 0, 0.3); }\n\n.assignment-grade-input {\n  width: 50px;\n  background: none;\n  padding-left: 10px;\n  padding-right: 10px;\n  border: none;\n  color: white;\n  cursor: text;\n  background: rgba(0, 0, 0, 0.9);\n  margin-left: 20px;\n  border-radius: 3px;\n  margin-top: -3px;\n  margin-bottom: -3px;\n  color: white;\n  padding-right: 5px;\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.percent-sign {\n  position: absolute;\n  color: white;\n  right: 5px; }\n\n.assignment-grade {\n  display: flex;\n  position: relative; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90b20vc2Nob29sL0NTQ0k0NTkvU3R1ZGR5QnVkZHkvc3R1ZGR5YnVkZHktYXBwL2FwcC9zcmMvYXBwL2NsYXNzL2dyYWRlcy9ncmFkZXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFZO0VBQ1osb0NBQWlDO0VBQ2pDLGFBQWE7RUFDYiwwQ0FBdUM7RUFDdkMsbUJBQW1CO0VBQ25CLDBDQUF1QyxFQUFBOztBQUd6QztFQUNFLGVBQWU7RUFDZixZQUFZO0VBQ1osa0JBQWtCLEVBQUE7O0FBRXBCO0VBQ0UsVUFBVSxFQUFBOztBQURaO0lBR0ksYUFBYSxFQUFBOztBQUlqQjtFQUNBLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsU0FBUztFQUNULHVCQUF1QjtFQUN2QixXQUFXLEVBQUE7O0FBTFg7SUFPSSxZQUFZO0lBQ1osZUFBZTtJQUNmLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsbUJBQW1CLEVBQUE7O0FBSXZCO0VBQ0UsOEJBQTJCLEVBQUE7O0FBSTdCO0VBQ0UsNEJBQTBDO0VBQzFDLDJDQUF3QyxFQUFBOztBQUcxQztFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLGlCQUFpQixFQUFBOztBQUpuQjtJQU1JLFlBQVk7SUFDWixlQUFlLEVBQUE7O0FBUG5CO0lBVUksVUFBVSxFQUFBOztBQUlkO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBRW5CLGlEQUE4QyxFQUFBOztBQVRoRDtJQVdJLFVBQVU7SUFDVixhQUFhO0lBQ2IsMkJBQTJCLEVBQUE7O0FBYi9CO01BZU0sZ0JBQWdCLEVBQUE7O0FBZnRCO0lBbUJJLFVBQVU7SUFDVixhQUFhO0lBQ2IsdUJBQXVCLEVBQUE7O0FBckIzQjtNQXVCTSxrQkFBa0IsRUFBQTs7QUF2QnhCO0lBMkJJLFVBQVU7SUFDVixhQUFhO0lBQ2IseUJBQXlCLEVBQUE7O0FBN0I3QjtNQStCTSxpQkFBaUIsRUFBQTs7QUFLdkI7RUFDRSxvQ0FBaUMsRUFBQTs7QUFHbkM7RUFDRSxnQkFBZ0I7RUFDZCxZQUFZO0VBQ1osWUFBWTtFQUNaLGVBQWU7RUFDZixZQUFZLEVBQUE7O0FBR2hCO0VBQ0Usb0NBQWlDO0VBQ2pDLDJCQUEyQjtFQUMzQixvQ0FBaUM7RUFDakMsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsa0JBQWtCLEVBQUE7O0FBR3BCO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osZUFBZTtFQUNmLHNCQUFzQjtFQUN0QiwyQ0FBd0M7RUFDeEMsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixlQUFlO0VBQ2YsbUJBQW1CLEVBQUE7O0FBR3JCO0VBQ0UsZUFBZSxFQUFBOztBQUdqQjtFQUNFLGFBQWE7RUFDYixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLFlBQVk7RUFDWiwyQ0FBd0M7RUFDeEMsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQkFBbUI7RUFDbkIsa0JBQWtCLEVBQUE7O0FBR3BCO0VBQ0Usa0JBQWtCO0VBQ2xCLE9BQU07RUFDTixRQUFPO0VBQ1AsU0FBUTtFQUNSLE1BQUs7RUFDTCxZQUFZLEVBQUE7O0FBR2Q7RUFDRSxlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsMkNBQXdDO0VBQ3hDLGFBQWE7RUFDYiw4QkFBOEIsRUFBQTs7QUFFaEM7RUFDRSwwQ0FBdUM7RUFDdkMsa0JBQWtCLEVBQUE7O0FBRXBCO0VBQ0UsYUFBYSxFQUFBOztBQUdmO0VBQ0Usa0JBQWtCLEVBQUE7O0FBR3BCO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztFQUNQLFNBQVM7RUFDVCxRQUFRO0VBQ1IsOEJBQTJCLEVBQUE7O0FBRzdCO0VBQ0UsdUJBQXVCO0VBQ3ZCLGVBQWUsRUFBQTs7QUFHakI7RUFDRSw4QkFBMkIsRUFBQTs7QUFHN0I7RUFDRSxXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLFlBQVk7RUFDWixZQUFZO0VBQ1osOEJBQTJCO0VBQzNCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osa0JBQWtCO0VBQ2hCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CLEVBQUE7O0FBR3ZCO0VBQ0Usa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixVQUFVLEVBQUE7O0FBR1o7RUFDRSxhQUFhO0VBQ2Isa0JBQWtCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jbGFzcy9ncmFkZXMvZ3JhZGVzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNsYXNzLWdyYWRlYmFyIHtcbiAgaGVpZ2h0OiAyMHB4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuNSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4zKTtcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgYm94LXNoYWRvdzogM3B4IDNweCAzcHggcmdiYSgwLDAsMCwwLjMpO1xufVxuXG4uZ3JhZGViYXItc2VjdGlvbntcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBvcGFjaXR5OiAwLjc7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5ncmFkZWJhci1zZWN0aW9uOmhvdmVye1xuICBvcGFjaXR5OiAxO1xuICAuZ3JhZGViYXItaW5mb3tcbiAgICBkaXNwbGF5OiBmbGV4O1xuICB9XG59XG5cbi5ncmFkZWJhci1pbmZve1xuZGlzcGxheTogbm9uZTtcbnBvc2l0aW9uOiBhYnNvbHV0ZTtcbnRvcDogMTAwJTtcbmp1c3RpZnktY29udGVudDogY2VudGVyO1xud2lkdGg6IDEwMCU7XG4gIHNwYW57XG4gICAgcGFkZGluZzogNXB4O1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgZm9udC13ZWlnaHQ6IDEwMDtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB9XG59XG5cbi5ncmFkZS1zZWN0aW9ue1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuOCk7XG59XG5cblxuLmdyYWRlLXNlY3Rpb24taGVhZGVye1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDEpICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMyk7XG59XG5cbi5hZGQtZ3JhZGUge1xuICBjb2xvcjogd2hpdGU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nLXRvcDogMTVweDtcbiAgLm1hdC1pY29ue1xuICAgIG9wYWNpdHk6IDAuNjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cbiAgLm1hdC1pY29uOmhvdmVye1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuLmFzc2lnbm1lbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDIwcHggMjVweDtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDE0cHg7XG4gIG1hcmdpbi1sZWZ0OiAtMjVweDtcbiAgbWFyZ2luLXJpZ2h0OiAtMjVweDtcblxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjUpO1xuICAuYXNzaWdubWVudC10aXRsZXtcbiAgICB3aWR0aDogMzMlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgIGlucHV0e1xuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICB9XG4gIH1cbiAgLmFzc2lnbm1lbnQtZHVlZGF0ZXtcbiAgICB3aWR0aDogMzMlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgaW5wdXR7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuICB9XG4gIC5hc3NpZ25tZW50LWdyYWRle1xuICAgIHdpZHRoOiAzMyU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgIGlucHV0e1xuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgfVxuICB9XG59XG5cbi5hc3NpZ25tZW50OmhvdmVye1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMSk7XG59XG5cbi5hc3NpZ25tZW50LWlucHV0e1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIHBhZGRpbmc6IDVweDtcbn1cblxuLmNsYXNzLWdyYWRlcy13cmFwcGVyIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjUpO1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAyMzBweCk7XG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYmEoMCwwLDAsMC41KTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbn1cblxuLmNsYXNzLWdyYWRlcy10aXRsZXtcbiAgcGFkZGluZzogMTNweDtcbiAgYmFja2dyb3VuZDogIzI5MjkyOTtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDE2cHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2JhKDAsMCwwLDAuNSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uY2xhc3MtZ3JhZGV7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmNsYXNzLWdyYWRlLXRpdGxlIHtcbiAgcGFkZGluZzogMTBweDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgwLDAsMCwwLjkpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmNsYXNzLWdyYWRlLXRpdGxlLW92ZXJsYXkge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6MDtcbiAgcmlnaHQ6MDtcbiAgYm90dG9tOjA7XG4gIHRvcDowO1xuICBvcGFjaXR5OiAwLjk7XG59XG5cbi5jbGFzcy1hc3NpZ25tZW50IHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBwYWRkaW5nOiAxNXB4IDMwcHg7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMyk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cbi5jbGFzcy1hc3NpZ25tZW50OmhvdmVyIHtcbiAgYm94LXNoYWRvdzogM3B4IDNweCAzcHggcmdiYSgwLDAsMCwwLjUpO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uY2xhc3MtYXNzaWdubWVudC1kYXRldGltZXtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLmFzc2lnbm1lbnQtZGF0ZXtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xufVxuXG4uY2xhc3MtYXNzaWdubWVudDpob3Zlcjo6YmVmb3JlIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuMSk7XG59XG5cbi5jbGFzcy1ncmFkZXMtb3B0aW9ucyB7XG4gIHBhZGRpbmc6IDBweCAhaW1wb3J0YW50O1xuICBtaW4td2lkdGg6IDQwcHg7XG59XG5cbi5jbGFzcy1ncmFkZXMtb3B0aW9uczpob3ZlcntcbiAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjMpO1xufVxuXG4uYXNzaWdubWVudC1ncmFkZS1pbnB1dCB7XG4gIHdpZHRoOiA1MHB4O1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gIHBhZGRpbmctcmlnaHQ6IDEwcHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IHdoaXRlO1xuICBjdXJzb3I6IHRleHQ7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC45KTtcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgbWFyZ2luLXRvcDogLTNweDtcbiAgbWFyZ2luLWJvdHRvbTogLTNweDtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nLXJpZ2h0OiA1cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ucGVyY2VudC1zaWduIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBjb2xvcjogd2hpdGU7XG4gIHJpZ2h0OiA1cHg7XG59XG5cbi5hc3NpZ25tZW50LWdyYWRle1xuICBkaXNwbGF5OiBmbGV4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/class/grades/grades.component.ts":
/*!**************************************************!*\
  !*** ./src/app/class/grades/grades.component.ts ***!
  \**************************************************/
/*! exports provided: GradesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GradesComponent", function() { return GradesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _grade_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./grade.service */ "./src/app/class/grades/grade.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _gradedialog_gradedialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gradedialog/gradedialog.component */ "./src/app/class/grades/gradedialog/gradedialog.component.ts");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");






var GradesComponent = /** @class */ (function () {
    function GradesComponent(db, grades, dialog) {
        this.db = db;
        this.grades = grades;
        this.dialog = dialog;
    }
    GradesComponent.prototype.ngOnInit = function () {
        console.log(this.classData);
        this.classView = 'grades';
    };
    GradesComponent.prototype.focusInput = function (event, dbID) {
        console.log('clicked');
    };
    GradesComponent.prototype.updateGrade = function (val, assignmentID, refString) {
        console.log(this.userID);
        var ref = refString + '/assignments/' + assignmentID + '/student_grades';
        this.grades.updateGrade({
            studentID: this.userID,
            grade: val.target.value
        }, ref);
    };
    GradesComponent.prototype.getOptions = function (data, method) {
        var options = [];
        switch (data.type) {
            case ('assignment'):
                options = [
                    {
                        'type': 'input',
                        'name': 'name',
                        'value': method !== 'create' ? data.data.name : ''
                    },
                    {
                        'type': 'date',
                        'name': 'date',
                        'value': method !== 'create' ? data.data.timestamp : ''
                    },
                    {
                        'type': 'input',
                        'name': 'time',
                        'value': method !== 'create' ? data.data.time : '',
                        'AMPM': method !== 'create' ? data.data.AMPM : 'AM'
                    },
                    {
                        'type': 'input',
                        'name': 'grade',
                        'value': '',
                        'suffix': '%'
                    }
                ];
                break;
            case ('grade type'):
                options = [
                    {
                        'type': 'input',
                        'name': 'name',
                        'value': method !== 'create' ? data.data.name : '',
                    },
                    {
                        'type': 'input',
                        'name': 'Weight (%)',
                        'value': method !== 'create' ? data.data.percentage : '',
                    },
                    {
                        'type': 'select',
                        'name': 'color',
                        'value': method !== 'create' ? data.data.color : '',
                        'options': ['gray', 'blue', 'red', 'green', 'orange', 'yellow', 'purple', 'teal']
                    }
                ];
                break;
        }
        return options;
    };
    GradesComponent.prototype.dataActions = function (data, refString) {
        var optionConfig = data.data ? { type: data.type, data: data.data } : { type: data.type };
        var buttons = data.action === 'create' ? [{
                text: 'Save New ' + data.type,
                method: 'create'
            }] : [
            {
                text: 'Save ' + data.type,
                method: 'update'
            },
            {
                text: 'Delete ' + data.type
            },
        ];
        var ref = '';
        if (data.action === 'create' && data.type === 'assignment') {
            ref = refString + '/assignments';
        }
        else if (data.action === 'update' && data.type === 'assignment') {
            ref = refString + '/assignments/' + data.data.dbID;
        }
        else if (data.action === 'create' && data.type === 'grade type') {
            ref = '/classes/' + this.classData.dbID + '/grades';
        }
        else if (data.action === 'update' && data.type === 'grade type') {
            ref = refString;
        }
        var dialogRef = this.dialog.open(_gradedialog_gradedialog_component__WEBPACK_IMPORTED_MODULE_4__["GradeDialogComponent"], {
            width: '600px',
            data: {
                title: data.action === 'create' ? 'New ' + data.type : 'Edit ' + data.type,
                refString: ref,
                type: data.type,
                options: this.getOptions(optionConfig, data.action),
                buttons: buttons
            }
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GradesComponent.prototype, "classData", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GradesComponent.prototype, "classID", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GradesComponent.prototype, "userID", void 0);
    GradesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-grades',
            template: __webpack_require__(/*! ./grades.component.html */ "./src/app/class/grades/grades.component.html"),
            styles: [__webpack_require__(/*! ./grades.component.scss */ "./src/app/class/grades/grades.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__["AngularFirestore"], _grade_service__WEBPACK_IMPORTED_MODULE_2__["GradeService"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]])
    ], GradesComponent);
    return GradesComponent;
}());



/***/ }),

/***/ "./src/app/core/auth.guard.ts":
/*!************************************!*\
  !*** ./src/app/core/auth.guard.ts ***!
  \************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.service */ "./src/app/core/auth.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var AuthGuard = /** @class */ (function () {
    function AuthGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        var _this = this;
        return this.auth.user.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (user) { return !!user; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (loggedIn) {
            if (!loggedIn) {
                _this.router.navigate(['/login']);
            }
            else {
                document.getElementById('navbar').style.display = 'flex';
            }
        }));
    };
    AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/core/auth.service.ts":
/*!**************************************!*\
  !*** ./src/app/core/auth.service.ts ***!
  \**************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/auth/index.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");








var AuthService = /** @class */ (function () {
    function AuthService(afAuth, afs, router) {
        var _this = this;
        this.afAuth = afAuth;
        this.afs = afs;
        this.router = router;
        //// Get auth data, then get firestore user document || null
        this.user = this.afAuth.authState.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["switchMap"])(function (user) {
            if (user) {
                return _this.afs.doc("users/" + user.uid).valueChanges();
            }
            else {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(null);
            }
        }));
    }
    AuthService.prototype.googleLogin = function () {
        var provider = new firebase_app__WEBPACK_IMPORTED_MODULE_3__["auth"].GoogleAuthProvider();
        return this.oAuthLogin(provider);
    };
    AuthService.prototype.oAuthLogin = function (provider) {
        var _this = this;
        return this.afAuth.auth.signInWithPopup(provider)
            .then(function (credential) {
            _this.updateUserData(credential.user);
            _this.router.navigate(['/dashboard']);
            document.getElementById('navbar').style.display = 'flex';
        });
    };
    AuthService.prototype.updateUserData = function (user) {
        // Sets user data to firestore on login
        var userRef = this.afs.doc("users/" + user.uid);
        var data = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        };
        return userRef.set(data, { merge: true });
    };
    AuthService.prototype.signOut = function () {
        var _this = this;
        this.afAuth.auth.signOut().then(function () {
            _this.router.navigate(['/login']);
        });
    };
    AuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_auth__WEBPACK_IMPORTED_MODULE_4__["AngularFireAuth"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__["AngularFirestore"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard-resolver.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/dashboard/dashboard-resolver.service.ts ***!
  \*********************************************************/
/*! exports provided: DashboardResolverService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardResolverService", function() { return DashboardResolverService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _class_class_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../class/class.service */ "./src/app/class/class.service.ts");
/* harmony import */ var _core_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/auth.service */ "./src/app/core/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");






var DashboardResolverService = /** @class */ (function () {
    function DashboardResolverService(auth, router, classes) {
        var _this = this;
        this.auth = auth;
        this.router = router;
        this.classes = classes;
        this.auth.user.subscribe(function (userData) {
            _this.user = userData;
        });
    }
    DashboardResolverService.prototype.resolve = function (route, state) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])({
            'classes': this.classes.getClassList()
        });
    };
    DashboardResolverService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _class_class_service__WEBPACK_IMPORTED_MODULE_2__["ClassService"]])
    ], DashboardResolverService);
    return DashboardResolverService;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class='dashboard-container'>\n  <h1 *ngIf='userName' class='greeting'>Hello, {{userName[0]}}</h1>\n  <div class='dash-wrapper'>\n    <div class='dash-section'>\n      <div class='dashboard-tab tab-title' style='justify-content: space-between;'>\n        Courses\n\n        <mat-icon (click)='editCourses()'>more_horiz</mat-icon>\n      </div>\n      <div\n        *ngFor=\"let class of myClasses | async\"\n        class='dashboard-tab'\n        [routerLink]=\"['/classes', class.id]\">\n        <div class='class-id'>{{class.id}}</div><div class='class-name'>{{class.name}}</div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.scss":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".greeting {\n  font-family: roboto mono;\n  margin-bottom: 50px;\n  position: relative; }\n\n.dash-section {\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 5px;\n  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);\n  width: 80%;\n  min-height: 362px; }\n\n.dash-wrapper {\n  display: flex;\n  width: 100%;\n  justify-content: space-evenly;\n  padding-left: 3%;\n  padding-right: 3%; }\n\n.dashboard-container {\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column; }\n\n.dashboard-tab {\n  background: rgba(255, 255, 255, 0.6);\n  position: relative;\n  padding: 15px;\n  text-align: center;\n  cursor: pointer;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n  display: flex;\n  font-size: 14px;\n  align-items: center; }\n\n.dashboard-tab .class-id {\n    padding: 5px;\n    background: white;\n    color: gray;\n    border-radius: 5px;\n    font-weight: 100;\n    margin-right: 20px; }\n\n.dashboard-tab:hover {\n  background: rgba(255, 255, 255, 0.8);\n  cursor: pointer; }\n\n.dashboard-tab:hover .class-id {\n    padding: 5px;\n    color: white;\n    background: gray; }\n\n.dashboard-tab:hover::before {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0.2;\n  background: #0575E6;\n  /* fallback for old browsers */\n  /* Chrome 10-25, Safari 5.1-6 */\n  background: linear-gradient(to top, #021B79, #0575E6);\n  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */ }\n\n.tab-title {\n  background: rgba(0, 0, 0, 0.8);\n  color: white;\n  font-family: roboto mono;\n  font-size: 14px;\n  line-height: 23px; }\n\n.tab-title:hover {\n  background: rgba(0, 0, 0, 0.8); }\n\n.tab-title:hover::before {\n  display: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90b20vc2Nob29sL0NTQ0k0NTkvU3R1ZGR5QnVkZHkvc3R1ZGR5YnVkZHktYXBwL2FwcC9zcmMvYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx3QkFBd0I7RUFDeEIsbUJBQW1CO0VBQ25CLGtCQUFrQixFQUFBOztBQUdwQjtFQUNFLG9DQUFvQztFQUNwQyxrQkFBa0I7RUFDbEIsMENBQXVDO0VBQ3ZDLFVBQVU7RUFDVixpQkFBaUIsRUFBQTs7QUFHbkI7RUFDRSxhQUFhO0VBQ2IsV0FBVztFQUNYLDZCQUE2QjtFQUM3QixnQkFBZ0I7RUFDaEIsaUJBQWlCLEVBQUE7O0FBR25CO0VBQ0UsYUFBYTtFQUNiLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLHNCQUFzQixFQUFBOztBQUd4QjtFQUNFLG9DQUFpQztFQUNqQyxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsMkNBQXdDO0VBQ3hDLGFBQWE7RUFDYixlQUFlO0VBQ2YsbUJBQW1CLEVBQUE7O0FBVHJCO0lBY0ksWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixrQkFBa0IsRUFBQTs7QUFNdEI7RUFDRSxvQ0FBaUM7RUFDakMsZUFBZSxFQUFBOztBQUZqQjtJQUlJLFlBQVk7SUFDWixZQUFZO0lBQ1osZ0JBQWdCLEVBQUE7O0FBSXBCO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixPQUFPO0VBQ1AsTUFBTTtFQUNOLFdBQVc7RUFDWCxZQUFZO0VBQ1osWUFBWTtFQUNaLG1CQUFtQjtFQUFHLDhCQUFBO0VBQzBDLCtCQUFBO0VBQ2hFLHFEQUFxRDtFQUFFLHFFQUFBLEVBQXNFOztBQUcvSDtFQUNFLDhCQUEyQjtFQUMzQixZQUFZO0VBQ1osd0JBQXdCO0VBQ3hCLGVBQWU7RUFDZixpQkFBaUIsRUFBQTs7QUFHbkI7RUFDRSw4QkFBMkIsRUFBQTs7QUFHN0I7RUFDRSxhQUFhLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmdyZWV0aW5ne1xuICBmb250LWZhbWlseTogcm9ib3RvIG1vbm87XG4gIG1hcmdpbi1ib3R0b206IDUwcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmRhc2gtc2VjdGlvbntcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJveC1zaGFkb3c6IDNweCAzcHggNHB4IHJnYmEoMCwwLDAsMC4yKTtcbiAgd2lkdGg6IDgwJTtcbiAgbWluLWhlaWdodDogMzYycHg7XG59XG5cbi5kYXNoLXdyYXBwZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICB3aWR0aDogMTAwJTtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG4gIHBhZGRpbmctbGVmdDogMyU7XG4gIHBhZGRpbmctcmlnaHQ6IDMlO1xufVxuXG4uZGFzaGJvYXJkLWNvbnRhaW5lciB7XG4gIGhlaWdodDogMTAwdmg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4uZGFzaGJvYXJkLXRhYiB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC42KTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiAxNXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4yKTtcbiAgZGlzcGxheTogZmxleDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG5cblxuICAuY2xhc3MtaWR7XG4gICAgcGFkZGluZzogNXB4O1xuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgIGNvbG9yOiBncmF5O1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICBmb250LXdlaWdodDogMTAwO1xuICAgIG1hcmdpbi1yaWdodDogMjBweDtcbiAgfVxuXG59XG5cblxuLmRhc2hib2FyZC10YWI6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuOCk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgLmNsYXNzLWlke1xuICAgIHBhZGRpbmc6IDVweDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgYmFja2dyb3VuZDogZ3JheTtcbiAgfVxufVxuXG4uZGFzaGJvYXJkLXRhYjpob3Zlcjo6YmVmb3JlIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvcGFjaXR5OiAwLjI7XG4gIGJhY2tncm91bmQ6ICMwNTc1RTY7ICAvKiBmYWxsYmFjayBmb3Igb2xkIGJyb3dzZXJzICovXG4gIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvIHRvcCwgIzAyMUI3OSwgIzA1NzVFNik7ICAvKiBDaHJvbWUgMTAtMjUsIFNhZmFyaSA1LjEtNiAqL1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCAjMDIxQjc5LCAjMDU3NUU2KTsgLyogVzNDLCBJRSAxMCsvIEVkZ2UsIEZpcmVmb3ggMTYrLCBDaHJvbWUgMjYrLCBPcGVyYSAxMissIFNhZmFyaSA3KyAqL1xufVxuXG4udGFiLXRpdGxle1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuOCk7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1mYW1pbHk6IHJvYm90byBtb25vO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAyM3B4O1xufVxuXG4udGFiLXRpdGxlOmhvdmVye1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuOCk7XG59XG5cbi50YWItdGl0bGU6aG92ZXI6OmJlZm9yZSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/auth/index.js");
/* harmony import */ var _core_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/auth.service */ "./src/app/core/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _dashdialog_dashdialog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashdialog/dashdialog.component */ "./src/app/dashboard/dashdialog/dashdialog.component.ts");







var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(afAuth, auth, route, dialog) {
        this.afAuth = afAuth;
        this.auth = auth;
        this.route = route;
        this.dialog = dialog;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.myClasses = data.dashboard.classes;
        });
        this.auth.user.subscribe(function (data) {
            _this.user = data;
            _this.userName = _this.user.displayName.split(' ');
        });
    };
    DashboardComponent.prototype.editCourses = function () {
        var dialogRef = this.dialog.open(_dashdialog_dashdialog_component__WEBPACK_IMPORTED_MODULE_6__["DashDialogComponent"], {
            width: '700px',
            data: {
                title: 'Edit Courses',
                optionList: this.myClasses,
                optionActions: [
                    {
                        icon: 'delete'
                    }
                ],
                buttons: [
                    {
                        name: 'Add Course',
                        function: 'addCourseView()'
                    }
                ],
                closeButton: true
            }
        });
    };
    DashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.scss */ "./src/app/dashboard/dashboard.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__["AngularFireAuth"],
            _core_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/dashdialog/dashdialog.component.html":
/*!****************************************************************!*\
  !*** ./src/app/dashboard/dashdialog/dashdialog.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title class='dialog-title'>\n  {{data.title}}\n  <div class='dialog-subtitle-container'>\n    <div class='dialog-subtitle' *ngIf='data.type'>\n      {{data.type}}\n    </div>\n  </div>\n  <mat-icon class='dialog-close' *ngIf='data.closeButton' (click)='closeDialog()'>close</mat-icon>\n</h1>\n<div mat-dialog-content >\n  <form *ngIf='data.fields'>\n    <div class='dialog-input' *ngFor='let field of data.fields'>\n      <span class='dialog-input-name'>{{field.name}}</span><input value='{{field.value}}'>\n    </div>\n  </form>\n  <div class='slider-wrapper'>\n    <div class='slider-container' [ngStyle]='{\"left\": addCourse ? \"calc(-100% - 25px)\" : \"0px\" }'>\n      <div class='slide'>\n        <div class='options-list' *ngIf='data.optionList'\n        [ngStyle]='{\"min-height\": data.optionList ? \"306px\" : \"inherit\" }'>\n          <div class='options-list-item' *ngFor='let option of data.optionList | async'>\n            <div class='option-title'>\n              <span class='option-subtitle'>{{option.id}}</span>{{option.name}}\n            </div>\n            <div class='option-actions' *ngFor='let action of data.optionActions'>\n              <mat-icon class='option-action' *ngFor='let action of data.optionActions' (click)='removeCourse(option.id)'>\n                {{action.icon}}\n              </mat-icon>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class='slide'>\n        <div class='add-classes-container'>\n          <div class='add-class' *ngFor='let class of data.allClasses | async' (click)='addClass(class)'>\n            <div class='add-class-title'>\n              <span class='add-class-id'>{{class.id}}</span>{{class.name}}\n            </div>\n            <mat-icon class='add-class-button'>add</mat-icon>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<div mat-dialog-actions class='dialog-actions'>\n  <button class='dialog-button'\n  *ngFor='let button of data.buttons'\n  mat-raised-button (click)='addCourseView()'\n  [ngStyle]='{\"opacity\" : addCourse ? 0 : 1, \"display\": addCourseButtonHide ? \"none\" : \"block\"}'\n  >\n    {{button.name}}\n  </button>\n  <mat-icon class='dialog-back-button'\n  [ngStyle]='{\"color\": \"blue\", \"opacity\" : addCourse ? 1 : 0, \"display\": editCourseButtonHide ? \"none\" : \"block\"}'\n  (click)='editCourseView()'\n  >arrow_back</mat-icon>\n</div>\n"

/***/ }),

/***/ "./src/app/dashboard/dashdialog/dashdialog.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/dashboard/dashdialog/dashdialog.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dialog-title {\n  font-family: roboto mono;\n  display: flex;\n  align-items: center;\n  justify-content: space-between; }\n\n.dialog-submit {\n  color: white;\n  background: green; }\n\n.dialog-subtitle {\n  font-size: 14px;\n  background: rgba(0, 0, 0, 0.5);\n  color: white;\n  padding: 10px;\n  border-radius: 5px; }\n\n.dialog-actions {\n  padding: 20px 0px !important;\n  color: white;\n  display: flex;\n  justify-content: space-evenly; }\n\n.dialog-back-button {\n  position: absolute;\n  transition: opacity 0.4s ease-in-out;\n  cursor: pointer; }\n\n.dialog-button {\n  background: #0575E6;\n  /* fallback for old browsers */\n  /* Chrome 10-25, Safari 5.1-6 */\n  background: linear-gradient(to top, #021B79, #0575E6);\n  color: white;\n  transition: opacity 0.4s ease-in-out; }\n\n.dialog-subtitle-container {\n  display: flex;\n  justify-content: center; }\n\n.options-list-item {\n  line-height: 50px;\n  display: flex;\n  justify-content: space-between;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.3); }\n\n.option-actions {\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.option-actions .option-action {\n    cursor: pointer;\n    opacity: 0.5;\n    font-size: 18px;\n    position: relative;\n    top: 3px; }\n\n.option-actions .option-action:hover {\n    opacity: 1; }\n\n.dialog-close {\n  cursor: pointer; }\n\n.slider-wrapper {\n  height: 327px;\n  width: 652px;\n  position: relative;\n  overflow: hidden; }\n\n.slider-container {\n  position: absolute;\n  display: flex;\n  transition: left 0.4s ease-in-out; }\n\n.slide {\n  width: 652px;\n  margin-right: 25px; }\n\n.add-classes-container {\n  height: 327px;\n  width: 652px;\n  border-radius: 8px;\n  box-sizing: border-box;\n  border: 3px solid rgba(0, 0, 0, 0.5);\n  background: rgba(0, 0, 0, 0.9);\n  overflow: scroll; }\n\n.add-class {\n  padding: 15px;\n  color: white;\n  font-weight: 100;\n  font-size: 14px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.5);\n  display: flex;\n  justify-content: space-between; }\n\n.add-class .add-class-button {\n    cursor: pointer; }\n\n.add-class:hover {\n  background: rgba(0, 0, 0, 0.2);\n  cursor: pointer; }\n\n.add-class:hover .add-class-button {\n    background: rgba(255, 255, 255, 0.1);\n    border-radius: 3px; }\n\n.option-subtitle {\n  padding: 5px 10px;\n  font-size: 14px;\n  color: white;\n  font-family: roboto mono;\n  background: rgba(0, 0, 0, 0.7);\n  margin-right: 20px;\n  border-radius: 5px; }\n\n.add-class-id {\n  background: rgba(255, 255, 255, 0.8);\n  padding: 4px 5px;\n  border-radius: 3px;\n  margin-right: 15px;\n  font-size: 14px;\n  width: 65px;\n  text-align: center;\n  display: inline-block;\n  color: black; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90b20vc2Nob29sL0NTQ0k0NTkvU3R1ZGR5QnVkZHkvc3R1ZGR5YnVkZHktYXBwL2FwcC9zcmMvYXBwL2Rhc2hib2FyZC9kYXNoZGlhbG9nL2Rhc2hkaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx3QkFBd0I7RUFDeEIsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiw4QkFBOEIsRUFBQTs7QUFHaEM7RUFDRSxZQUFZO0VBQ1osaUJBQWlCLEVBQUE7O0FBR25CO0VBQ0UsZUFBZTtFQUNmLDhCQUEyQjtFQUMzQixZQUFZO0VBQ1osYUFBYTtFQUNiLGtCQUFrQixFQUFBOztBQUdwQjtFQUNFLDRCQUE0QjtFQUM1QixZQUFZO0VBQ1osYUFBYTtFQUNiLDZCQUE2QixFQUFBOztBQUcvQjtFQUNFLGtCQUFrQjtFQUNsQixvQ0FBb0M7RUFDcEMsZUFBZSxFQUFBOztBQUdqQjtFQUNFLG1CQUFtQjtFQUFHLDhCQUFBO0VBQzBDLCtCQUFBO0VBQ2hFLHFEQUFxRDtFQUNyRCxZQUFZO0VBQ1osb0NBQW9DLEVBQUE7O0FBR3RDO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QixFQUFBOztBQUd6QjtFQUNFLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLDJDQUF3QyxFQUFBOztBQUcxQztFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CLEVBQUE7O0FBSHJCO0lBS0ksZUFBZTtJQUNmLFlBQVk7SUFDWixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLFFBQVEsRUFBQTs7QUFUWjtJQVlJLFVBQVUsRUFBQTs7QUFJZDtFQUNFLGVBQWUsRUFBQTs7QUFHakI7RUFDRSxhQUFhO0VBQ2IsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixnQkFBZ0IsRUFBQTs7QUFHbEI7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLGlDQUFpQyxFQUFBOztBQUduQztFQUNFLFlBQVk7RUFDWixrQkFBa0IsRUFBQTs7QUFHcEI7RUFDRSxhQUFhO0VBQ2IsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsb0NBQWlDO0VBQ2pDLDhCQUEyQjtFQUMzQixnQkFBZ0IsRUFBQTs7QUFJbEI7RUFDRSxhQUFhO0VBQ2IsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsaURBQThDO0VBQzlDLGFBQWE7RUFDYiw4QkFBOEIsRUFBQTs7QUFQaEM7SUFTSSxlQUFlLEVBQUE7O0FBSW5CO0VBQ0UsOEJBQTJCO0VBQzNCLGVBQWUsRUFBQTs7QUFGakI7SUFJSSxvQ0FBaUM7SUFDakMsa0JBQWtCLEVBQUE7O0FBS3RCO0VBQ0UsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixZQUFZO0VBQ1osd0JBQXdCO0VBQ3hCLDhCQUEyQjtFQUMzQixrQkFBa0I7RUFDbEIsa0JBQ0YsRUFBQTs7QUFFQTtFQUNFLG9DQUFpQztFQUNqQyxnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixxQkFBcUI7RUFDckIsWUFBWSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvZGFzaGJvYXJkL2Rhc2hkaWFsb2cvZGFzaGRpYWxvZy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kaWFsb2ctdGl0bGV7XG4gIGZvbnQtZmFtaWx5OiByb2JvdG8gbW9ubztcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4uZGlhbG9nLXN1Ym1pdHtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kOiBncmVlbjtcbn1cblxuLmRpYWxvZy1zdWJ0aXRsZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjUpO1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLmRpYWxvZy1hY3Rpb25ze1xuICBwYWRkaW5nOiAyMHB4IDBweCAhaW1wb3J0YW50O1xuICBjb2xvcjogd2hpdGU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xufVxuXG4uZGlhbG9nLWJhY2stYnV0dG9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuNHMgZWFzZS1pbi1vdXQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmRpYWxvZy1idXR0b257XG4gIGJhY2tncm91bmQ6ICMwNTc1RTY7ICAvKiBmYWxsYmFjayBmb3Igb2xkIGJyb3dzZXJzICovXG4gIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvIHRvcCwgIzAyMUI3OSwgIzA1NzVFNik7ICAvKiBDaHJvbWUgMTAtMjUsIFNhZmFyaSA1LjEtNiAqL1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCAjMDIxQjc5LCAjMDU3NUU2KTtcbiAgY29sb3I6IHdoaXRlO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuNHMgZWFzZS1pbi1vdXQ7XG59XG5cbi5kaWFsb2ctc3VidGl0bGUtY29udGFpbmVye1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLm9wdGlvbnMtbGlzdC1pdGVtIHtcbiAgbGluZS1oZWlnaHQ6IDUwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4zKTtcbn1cblxuLm9wdGlvbi1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIC5vcHRpb24tYWN0aW9ue1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBvcGFjaXR5OiAwLjU7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0b3A6IDNweDtcbiAgfVxuICAub3B0aW9uLWFjdGlvbjpob3ZlcntcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG5cbi5kaWFsb2ctY2xvc2V7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnNsaWRlci13cmFwcGVyIHtcbiAgaGVpZ2h0OiAzMjdweDtcbiAgd2lkdGg6IDY1MnB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5zbGlkZXItY29udGFpbmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBkaXNwbGF5OiBmbGV4O1xuICB0cmFuc2l0aW9uOiBsZWZ0IDAuNHMgZWFzZS1pbi1vdXQ7XG59XG5cbi5zbGlkZXtcbiAgd2lkdGg6IDY1MnB4O1xuICBtYXJnaW4tcmlnaHQ6IDI1cHg7XG59XG5cbi5hZGQtY2xhc3Nlcy1jb250YWluZXJ7XG4gIGhlaWdodDogMzI3cHg7XG4gIHdpZHRoOiA2NTJweDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXI6IDNweCBzb2xpZCByZ2JhKDAsMCwwLDAuNSk7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC45KTtcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcbn1cblxuXG4uYWRkLWNsYXNzIHtcbiAgcGFkZGluZzogMTVweDtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXdlaWdodDogMTAwO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuNSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgLmFkZC1jbGFzcy1idXR0b257XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG59XG5cbi5hZGQtY2xhc3M6aG92ZXJ7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC4yKTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICAuYWRkLWNsYXNzLWJ1dHRvbntcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMSk7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICB9XG59XG5cblxuLm9wdGlvbi1zdWJ0aXRsZSB7XG4gIHBhZGRpbmc6IDVweCAxMHB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1mYW1pbHk6IHJvYm90byBtb25vO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuNyk7XG4gIG1hcmdpbi1yaWdodDogMjBweDtcbiAgYm9yZGVyLXJhZGl1czogNXB4XG59XG5cbi5hZGQtY2xhc3MtaWQge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuOCk7XG4gIHBhZGRpbmc6IDRweCA1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIHdpZHRoOiA2NXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgY29sb3I6IGJsYWNrO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/dashboard/dashdialog/dashdialog.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/dashboard/dashdialog/dashdialog.component.ts ***!
  \**************************************************************/
/*! exports provided: DashDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashDialogComponent", function() { return DashDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _class_class_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../class/class.service */ "./src/app/class/class.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");





var DashDialogComponent = /** @class */ (function () {
    function DashDialogComponent(dialogRef, data, classService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.classService = classService;
        this.addCourse = false;
        this.newCourse = true;
        this.addCourseButtonHide = false;
        this.editCourseButtonHide = true;
    }
    DashDialogComponent.prototype.ngOnInit = function () {
    };
    DashDialogComponent.prototype.closeDialog = function () {
        this.dialogRef.close();
    };
    DashDialogComponent.prototype.newCourseView = function () {
        this.editCourseButtonHide = false;
    };
    DashDialogComponent.prototype.addCourseView = function () {
        var _this = this;
        this.editCourseButtonHide = false;
        this.addCourse = true;
        this.data.title = 'Add Courses';
        this.data.optionList.subscribe(function (data) {
            var userClasses = data;
            _this.classService.allClasses().subscribe(function (allClasses) {
                var courseArray = [];
                allClasses.forEach(function (course) {
                    var found = false;
                    userClasses.forEach(function (myCourse) {
                        if (course.id === myCourse.id) {
                            found = true;
                        }
                    });
                    if (!found) {
                        courseArray.push(course);
                    }
                });
                _this.data.allClasses = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(courseArray);
            });
        });
        setTimeout(function () {
            _this.editCourseButtonHide = false;
            _this.addCourseButtonHide = true;
        }, 400);
    };
    DashDialogComponent.prototype.editCourseView = function () {
        var _this = this;
        this.addCourseButtonHide = false;
        this.addCourse = false;
        this.data.title = 'Edit Courses';
        setTimeout(function () {
            _this.editCourseButtonHide = true;
            _this.addCourseButtonHide = false;
        }, 400);
    };
    DashDialogComponent.prototype.removeCourse = function (ID) {
        this.classService.removeCourse(ID);
    };
    DashDialogComponent.prototype.addClass = function (id) {
        console.log(id);
        this.classService.addCourse(id);
    };
    DashDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dashdialog',
            template: __webpack_require__(/*! ./dashdialog.component.html */ "./src/app/dashboard/dashdialog/dashdialog.component.html"),
            styles: [__webpack_require__(/*! ./dashdialog.component.scss */ "./src/app/dashboard/dashdialog/dashdialog.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object, _class_class_service__WEBPACK_IMPORTED_MODULE_3__["ClassService"]])
    ], DashDialogComponent);
    return DashDialogComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class='login-container'>\n<h2 class='login-header'>Studdy Buddy</h2>\n<div class='login-wrapper'>\n  <div class='login-signin'>\n    <button mat-raised-button (click)='auth.googleLogin()'>\n      <img src='../../assets/glogin.png'/>\n    </button>\n  </div>\n</div>\n</div>\n"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/*!********************************************!*\
  !*** ./src/app/login/login.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".login-container {\n  background: #0575E6;\n  /* fallback for old browsers */\n  /* Chrome 10-25, Safari 5.1-6 */\n  background: linear-gradient(to top, #021B79, #0575E6);\n  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column; }\n\n.login-header {\n  font-family: Rajdhani;\n  font-size: 40px;\n  color: white;\n  font-weight: 400px; }\n\n.login-wrapper {\n  display: flex; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90b20vc2Nob29sL0NTQ0k0NTkvU3R1ZGR5QnVkZHkvc3R1ZGR5YnVkZHktYXBwL2FwcC9zcmMvYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQW1CO0VBQUcsOEJBQUE7RUFDMEMsK0JBQUE7RUFDaEUscURBQXFEO0VBQUUscUVBQUE7RUFDdkQsZUFBZTtFQUNmLE1BQU07RUFDTixPQUFPO0VBQ1AsUUFBUTtFQUNSLFNBQVM7RUFDVCxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixzQkFBc0IsRUFBQTs7QUFHeEI7RUFDRSxxQkFBcUI7RUFDckIsZUFBZTtFQUNmLFlBQVk7RUFDWixrQkFBa0IsRUFBQTs7QUFFcEI7RUFDRSxhQUFhLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sb2dpbi1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kOiAjMDU3NUU2OyAgLyogZmFsbGJhY2sgZm9yIG9sZCBicm93c2VycyAqL1xuICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0byB0b3AsICMwMjFCNzksICMwNTc1RTYpOyAgLyogQ2hyb21lIDEwLTI1LCBTYWZhcmkgNS4xLTYgKi9cbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwgIzAyMUI3OSwgIzA1NzVFNik7IC8qIFczQywgSUUgMTArLyBFZGdlLCBGaXJlZm94IDE2KywgQ2hyb21lIDI2KywgT3BlcmEgMTIrLCBTYWZhcmkgNysgKi9cbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4ubG9naW4taGVhZGVye1xuICBmb250LWZhbWlseTogUmFqZGhhbmk7XG4gIGZvbnQtc2l6ZTogNDBweDtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXdlaWdodDogNDAwcHg7XG59XG4ubG9naW4td3JhcHBlcntcbiAgZGlzcGxheTogZmxleDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/auth.service */ "./src/app/core/auth.service.ts");



var LoginComponent = /** @class */ (function () {
    function LoginComponent(auth) {
        this.auth = auth;
    }
    LoginComponent.prototype.ngOnInit = function () {
        document.getElementById('navbar').style.display = 'flex';
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/login/login.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_core_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id='navbar' class='navbar'>\n  <div [ngStyle]='{\"display\": \"flex\"}'>\n    <a class='navlink' [routerLink]=\"['/dashboard']\">\n          <mat-icon>home</mat-icon>\n      </a>\n    <div class='current-route'>\n        <mat-menu #classNav=\"matMenu\">\n            <button mat-menu-item *ngFor='let class of classMenu' [routerLink]=\"['/classes', class.id]\">{{class.name}}</button>\n        </mat-menu>\n      <a [matMenuTriggerFor]=\"classNav\">{{route}}</a>\n    </div>\n  </div>\n  <div class='nav-links'>\n  <a (click)='showuserOptions()' class='navlink'>\n    <mat-icon>settings</mat-icon>\n    <div *ngIf='userOptionsVisible' id='nav-useroptions' class='sub-menu'>\n      <div class='sub-arrow'></div>\n      <a >My Profile</a>\n      <a [routerLink]=\"['/dashboard']\">Dashboard</a>\n      <a (click)='signOut()'>Sign Out</a>\n    </div>\n  </a>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/navbar/navbar.component.scss":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".navbar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  background: #0575E6;\n  /* fallback for old browsers */\n  /* Chrome 10-25, Safari 5.1-6 */\n  background: linear-gradient(to top, #021B79, #0575E6);\n  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\n  padding: 10px;\n  justify-content: space-between;\n  display: none;\n  z-index: 1000; }\n  .navbar .current-route {\n    color: white;\n    font-family: roboto mono;\n    font-size: 14px;\n    text-transform: capitalize;\n    display: flex; }\n  .navbar .current-route div {\n      margin-left: 10px; }\n  .navbar .current-route a {\n    padding: 2px 5px; }\n  .navbar .current-route a:hover {\n    background: rgba(255, 255, 255, 0.3);\n    border-radius: 4px;\n    cursor: pointer; }\n  .navbar .navlink {\n    margin-left: 10px;\n    margin-right: 10px;\n    position: relative; }\n  .navbar .navlink #nav-useroptions .sub-arrow {\n      right: 14px; }\n  .navbar .navlink .sub-menu {\n      display: flex;\n      flex-direction: column;\n      padding: 10px;\n      position: absolute;\n      top: calc(100% + 20px);\n      min-width: 130px;\n      right: -10px;\n      background: #313131;\n      box-sizing: border-box;\n      align-items: center;\n      justify-content: center;\n      white-space: nowrap;\n      border-radius: 5px; }\n  .navbar .navlink .sub-menu .sub-arrow {\n        width: 0;\n        height: 0;\n        border-left: 10px solid transparent;\n        border-right: 10px solid transparent;\n        border-bottom: 10px solid #313131;\n        position: absolute;\n        top: -10px; }\n  .navbar .navlink .sub-menu a {\n        color: white !important;\n        text-decoration: none !important;\n        width: 100%;\n        padding-top: 10px;\n        padding-bottom: 10px;\n        font-size: 12px;\n        font-weight: 100; }\n  .navbar .navlink .sub-menu a:not(:last-child) {\n        border-bottom: 1px solid rgba(255, 255, 255, 0.5); }\n  .navbar .nav-arrow {\n    margin-left: 10px;\n    margin-right: 10px;\n    font-size: 25px; }\n  .navbar .navbar-route {\n    color: white;\n    font-size: 14px;\n    font-weight: 100; }\n  .navbar .navbar-route a {\n      cursor: pointer;\n      position: relative;\n      bottom: 6px; }\n  .navbar .navbar-route a:hover {\n      text-decoration: underline; }\n  .mat-icon {\n  color: white;\n  cursor: pointer;\n  font-size: 20px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy90b20vc2Nob29sL0NTQ0k0NTkvU3R1ZGR5QnVkZHkvc3R1ZGR5YnVkZHktYXBwL2FwcC9zcmMvYXBwL25hdmJhci9uYXZiYXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFlO0VBQ2YsTUFBTTtFQUNOLE9BQU87RUFDUCxRQUFRO0VBQ1IsbUJBQW1CO0VBQUcsOEJBQUE7RUFDMEMsK0JBQUE7RUFDaEUscURBQXFEO0VBQUUscUVBQUE7RUFDdkQsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixhQUFhO0VBQ2IsYUFBYSxFQUFBO0VBWGY7SUFhSSxZQUFZO0lBQ1osd0JBQXdCO0lBQ3hCLGVBQWU7SUFDZiwwQkFBMEI7SUFDMUIsYUFBYSxFQUFBO0VBakJqQjtNQW1CTSxpQkFBaUIsRUFBQTtFQW5CdkI7SUF1QkksZ0JBQWdCLEVBQUE7RUF2QnBCO0lBMEJJLG9DQUFvQztJQUVwQyxrQkFBa0I7SUFDbEIsZUFBZSxFQUFBO0VBN0JuQjtJQWdDSSxpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLGtCQUFrQixFQUFBO0VBbEN0QjtNQW9DTSxXQUFXLEVBQUE7RUFwQ2pCO01BdUNNLGFBQWE7TUFDYixzQkFBc0I7TUFDdEIsYUFBYTtNQUNiLGtCQUFrQjtNQUNsQixzQkFBc0I7TUFDdEIsZ0JBQWdCO01BQ2hCLFlBQVk7TUFDWixtQkFBbUI7TUFDbkIsc0JBQXNCO01BQ3RCLG1CQUFtQjtNQUNuQix1QkFBdUI7TUFDdkIsbUJBQW1CO01BQ25CLGtCQUFrQixFQUFBO0VBbkR4QjtRQXFEUSxRQUFRO1FBQ1IsU0FBUztRQUNULG1DQUFtQztRQUNuQyxvQ0FBb0M7UUFDcEMsaUNBQWlDO1FBQ2pDLGtCQUFrQjtRQUNsQixVQUFVLEVBQUE7RUEzRGxCO1FBOERRLHVCQUF1QjtRQUN2QixnQ0FBZ0M7UUFDaEMsV0FBVztRQUNYLGlCQUFpQjtRQUNqQixvQkFBb0I7UUFDcEIsZUFBZTtRQUNmLGdCQUFnQixFQUFBO0VBcEV4QjtRQXVFUSxpREFBOEMsRUFBQTtFQXZFdEQ7SUE0RUksaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixlQUFlLEVBQUE7RUE5RW5CO0lBaUZJLFlBQVk7SUFDWixlQUFlO0lBQ2YsZ0JBQWdCLEVBQUE7RUFuRnBCO01BcUZNLGVBQWU7TUFDZixrQkFBa0I7TUFDbEIsV0FBVyxFQUFBO0VBdkZqQjtNQTBGTSwwQkFBMEIsRUFBQTtFQUtoQztFQUNFLFlBQVk7RUFDWixlQUFlO0VBQ2YsZUFBZSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvbmF2YmFyL25hdmJhci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5uYXZiYXJ7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgYmFja2dyb3VuZDogIzA1NzVFNjsgIC8qIGZhbGxiYWNrIGZvciBvbGQgYnJvd3NlcnMgKi9cbiAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG8gdG9wLCAjMDIxQjc5LCAjMDU3NUU2KTsgIC8qIENocm9tZSAxMC0yNSwgU2FmYXJpIDUuMS02ICovXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsICMwMjFCNzksICMwNTc1RTYpOyAvKiBXM0MsIElFIDEwKy8gRWRnZSwgRmlyZWZveCAxNissIENocm9tZSAyNissIE9wZXJhIDEyKywgU2FmYXJpIDcrICovXG4gIHBhZGRpbmc6IDEwcHg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZGlzcGxheTogbm9uZTtcbiAgei1pbmRleDogMTAwMDtcbiAgLmN1cnJlbnQtcm91dGV7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtZmFtaWx5OiByb2JvdG8gbW9ubztcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBkaXZ7XG4gICAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICB9XG4gIH1cbiAgLmN1cnJlbnQtcm91dGUgYXtcbiAgICBwYWRkaW5nOiAycHggNXB4O1xuICB9XG4gIC5jdXJyZW50LXJvdXRlIGE6aG92ZXJ7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xuXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuICAubmF2bGlua3tcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICNuYXYtdXNlcm9wdGlvbnMgLnN1Yi1hcnJvd3tcbiAgICAgIHJpZ2h0OiAxNHB4O1xuICAgIH1cbiAgICAuc3ViLW1lbnV7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IGNhbGMoMTAwJSArIDIwcHgpO1xuICAgICAgbWluLXdpZHRoOiAxMzBweDtcbiAgICAgIHJpZ2h0OiAtMTBweDtcbiAgICAgIGJhY2tncm91bmQ6ICMzMTMxMzE7XG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgIC5zdWItYXJyb3cge1xuICAgICAgICB3aWR0aDogMDtcbiAgICAgICAgaGVpZ2h0OiAwO1xuICAgICAgICBib3JkZXItbGVmdDogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAxMHB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkICMzMTMxMzE7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAtMTBweDtcbiAgICAgIH1cbiAgICAgIGF7XG4gICAgICAgIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIHBhZGRpbmctdG9wOiAxMHB4O1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICBmb250LXdlaWdodDogMTAwO1xuICAgICAgfVxuICAgICAgYTpub3QoOmxhc3QtY2hpbGQpe1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAubmF2LWFycm93e1xuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICBmb250LXNpemU6IDI1cHg7XG4gIH1cbiAgLm5hdmJhci1yb3V0ZXtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGZvbnQtd2VpZ2h0OiAxMDA7XG4gICAgYXtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGJvdHRvbTogNnB4O1xuICAgIH1cbiAgICBhOmhvdmVye1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgfVxuICB9XG59XG5cbi5tYXQtaWNvbntcbiAgY29sb3I6IHdoaXRlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuIl19 */"

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var _core_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/auth.service */ "./src/app/core/auth.service.ts");





var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(router, auth, db) {
        this.router = router;
        this.auth = auth;
        this.db = db;
        this.userOptionsVisible = false;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function (val) {
            /* the router will fire multiple events */
            /* we only want to react if it's the final active route */
            if (val instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]) {
                /* the variable curUrlTree holds all params, queryParams, segments and fragments from the current (active) route */
                var params = val.url.split('/');
                console.log(params.length);
                console.log(params);
                _this.route = params.length === 3 ? params[2] : params[1];
                if (params.length === 3) {
                    _this.auth.user.subscribe(function (data) {
                        _this.db.collection('users/' + data.uid + '/classes').valueChanges()
                            .subscribe(function (classes) {
                            _this.classMenu = classes;
                        });
                    });
                }
            }
        });
    };
    NavbarComponent.prototype.signOut = function () {
        this.auth.signOut();
    };
    NavbarComponent.prototype.showuserOptions = function () {
        this.userOptionsVisible ? this.userOptionsVisible = false : this.userOptionsVisible = true;
    };
    NavbarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.scss */ "./src/app/navbar/navbar.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _core_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyB7CmmGxY93kUhoxHi2swRHwbVVpE4HtZA',
        authDomain: 'gradebook-93573.firebaseapp.com',
        databaseURL: 'https://gradebook-93573.firebaseio.com',
        projectId: 'gradebook-93573',
        storageBucket: 'gradebook-93573.appspot.com',
        messagingSenderId: '379935490231'
    }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/tom/school/CSCI459/StuddyBuddy/studdybuddy-app/app/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map