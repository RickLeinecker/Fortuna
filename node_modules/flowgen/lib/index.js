"use strict";

exports.__esModule = true;
exports.default = exports.beautify = exports.compiler = void 0;

var _compiler = _interopRequireDefault(require("./cli/compiler"));

exports.compiler = _compiler.default;

var _beautifier = _interopRequireDefault(require("./cli/beautifier"));

exports.beautify = _beautifier.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  beautify: _beautifier.default,
  compiler: _compiler.default
};
exports.default = _default;