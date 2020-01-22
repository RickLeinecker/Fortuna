"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BoundingBox = _interopRequireDefault(require("./BoundingBox.js"));

var _CasusBlock2 = _interopRequireDefault(require("./CasusBlock.js"));

var _EmptyBlock = _interopRequireDefault(require("./EmptyBlock.js"));

var _Vec = _interopRequireDefault(require("./Vec.js"));

var _measureText = _interopRequireDefault(require("./measureText.js"));

var _generateCornerPerim = _interopRequireWildcard(require("./generateCornerPerim.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UnaryOperationBlock =
/*#__PURE__*/
function (_CasusBlock) {
  _inherits(UnaryOperationBlock, _CasusBlock);

  function UnaryOperationBlock(paramType, returnType, centerText) {
    var _this;

    _classCallCheck(this, UnaryOperationBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UnaryOperationBlock).call(this));

    _defineProperty(_assertThisInitialized(_this), "rChild", void 0);

    _defineProperty(_assertThisInitialized(_this), "paramType", void 0);

    _defineProperty(_assertThisInitialized(_this), "returnType", void 0);

    _defineProperty(_assertThisInitialized(_this), "centerText", void 0);

    _defineProperty(_assertThisInitialized(_this), "textWidth", void 0);

    _this.rChild = new _EmptyBlock.default(paramType);
    _this.paramType = paramType;
    _this.returnType = returnType;
    _this.centerText = centerText;
    _this.textWidth = (0, _measureText.default)(centerText).w + _generateCornerPerim.CENTER_WIDTH;
    return _this;
  }

  _createClass(UnaryOperationBlock, [{
    key: "precompBounds",
    value: function precompBounds() {
      this.rChild.precompBounds();
      this.boundingBox = new _BoundingBox.default(0, 0, _generateCornerPerim.RAMP_WIDTH + this.textWidth + this.rChild.boundingBox.w + _generateCornerPerim.RAMP_WIDTH, _generateCornerPerim.VPADDING + this.rChild.boundingBox.h + _generateCornerPerim.VPADDING);
    }
  }, {
    key: "precompXY",
    value: function precompXY(x, y) {
      this.boundingBox.x = x;
      this.boundingBox.y = y;
      this.rChild.precompXY(x + _generateCornerPerim.RAMP_WIDTH + this.textWidth, y + _generateCornerPerim.VPADDING);
    }
  }, {
    key: "getChildBlocks",
    value: function getChildBlocks() {
      return [this.rChild];
    }
  }, {
    key: "removeBlockAt",
    value: function removeBlockAt(v, removeAfter) {
      if (!this.boundingBox.contains(v)) {
        return [];
      }

      var rChildRes = this.rChild.removeBlockAt(v, removeAfter);

      if (rChildRes.length > 0) {
        return rChildRes;
      }

      if (this.rChild.boundingBox.contains(v) && this.rChild.draggable()) {
        var toReturn = [this.rChild];
        this.rChild = new _EmptyBlock.default(this.paramType);
        return toReturn;
      }

      return [];
    }
  }, {
    key: "getPerim",
    value: function getPerim() {
      return (0, _generateCornerPerim.default)(this.boundingBox, this.returnType);
    }
  }, {
    key: "drawSelf",
    value: function drawSelf(ctx) {
      ctx.fillStyle = '#eeee22';
      var perim = this.getPerim();
      ctx.beginPath();
      ctx.moveTo(perim[0].x, perim[0].y);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = perim[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var p = _step.value;
          ctx.lineTo(p.x, p.y);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.centerText, this.boundingBox.x + _generateCornerPerim.RAMP_WIDTH + this.textWidth / 2, this.boundingBox.y + this.boundingBox.h / 2);
    }
  }, {
    key: "getReturnType",
    value: function getReturnType() {
      return this.returnType;
    }
  }, {
    key: "tryToPlace",
    value: function tryToPlace(v, blockToPlace, ctx) {
      var _this$rChild$tryToPla;

      if (!this.boundingBox.contains(v)) {
        return null;
      }

      this.rChild = (_this$rChild$tryToPla = this.rChild.tryToPlace(v, blockToPlace, ctx)) !== null && _this$rChild$tryToPla !== void 0 ? _this$rChild$tryToPla : this.rChild;
      return null;
    }
  }]);

  return UnaryOperationBlock;
}(_CasusBlock2.default);

var _default = UnaryOperationBlock;
exports.default = _default;