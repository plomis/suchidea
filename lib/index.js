"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _suit = require("./suit");

var _catcher = _interopRequireDefault(require("./suit/catcher"));

var _compose = _interopRequireDefault(require("./suit/compose"));

var _getConfig = _interopRequireDefault(require("./getConfig"));

var _stage = _interopRequireDefault(require("./stage"));

var _default = (0, _catcher.default)((0, _compose.default)((0, _suit.map)(_stage.default), (0, _suit.birth)(_getConfig.default)), function (error) {
  console.error(error);
});

exports.default = _default;
module.exports = exports["default"];