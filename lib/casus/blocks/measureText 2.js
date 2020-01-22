"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BoundingBox = _interopRequireDefault(require("./BoundingBox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var measuringCTX = document.createElement('canvas').getContext('2d');

function measureText(text) {
  measuringCTX.font = '16px Arial';
  var bounds = measuringCTX.measureText(text);
  return new _BoundingBox.default(0, 0, bounds.width, bounds.fontBoundingBoxAscent + bounds.fontBoundingBoxDescent);
}

var _default = measureText;
exports.default = _default;