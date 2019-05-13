"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.choice = choice;
exports.isInclude = exports.Cat = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.object.assign");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _whatitis = _interopRequireDefault(require("whatitis"));

var Cat = function Cat(properties) {
  (0, _classCallCheck2.default)(this, Cat);
  _whatitis.default.Object(properties) ? Object.assign(this, properties) : this.value = properties;
};

exports.Cat = Cat;

function getValue(cat) {
  return cat.value;
}

var isInclude = [].includes(1);
exports.isInclude = isInclude;

function choice(yesCallback, noCallback) {
  return function (cat) {
    return (getValue(cat) ? yesCallback : noCallback)(cat);
  };
}