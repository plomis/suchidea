"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _suit = require("./utils/suit");

var _compose = _interopRequireDefault(require("./utils/compose"));

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
      return new _suit.Cat(func(config));
    } catch (e) {
      return new _suit.Cat({
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

var _default = _suit.isInclude ? (0, _compose.default)((0, _suit.choice)(stage, throwError), birth(getConfig)) : null;

exports.default = _default;
module.exports = exports["default"];