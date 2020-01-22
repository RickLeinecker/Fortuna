"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Vec = _interopRequireDefault(require("./Vec.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BoundingBox =
/*#__PURE__*/
function () {
  function BoundingBox(x, y, w, h) {
    _classCallCheck(this, BoundingBox);

    _defineProperty(this, "x", void 0);

    _defineProperty(this, "y", void 0);

    _defineProperty(this, "w", void 0);

    _defineProperty(this, "h", void 0);

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  _createClass(BoundingBox, [{
    key: "contains",
    value: function contains(v) {
      if (v.x < this.x || v.y < this.y || v.x > this.x + this.w || v.y > this.y + this.h) {
        return false;
      }

      return true;
    }
  }]);

  return BoundingBox;
}();

var _default = BoundingBox;
exports.default = _default;