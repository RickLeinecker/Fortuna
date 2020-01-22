"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Vec = function Vec(x, y) {
  _classCallCheck(this, Vec);

  _defineProperty(this, "x", void 0);

  _defineProperty(this, "y", void 0);

  this.x = x;
  this.y = y;
};

var _default = Vec;
exports.default = _default;