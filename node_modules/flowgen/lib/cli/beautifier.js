"use strict";

exports.__esModule = true;
exports.default = beautify;

var _prettier = _interopRequireDefault(require("prettier"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function beautify(str) {
  return _prettier.default.format(str, {
    parser: "babel-flow"
  });
}