"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BoundingBox = _interopRequireDefault(require("./BoundingBox.js"));

var _CasusBlock2 = _interopRequireDefault(require("./CasusBlock.js"));

var _EmptyBlock = _interopRequireDefault(require("./EmptyBlock.js"));

var _Vec = _interopRequireDefault(require("./Vec.js"));

var _generateCornerPerim = _interopRequireWildcard(require("./generateCornerPerim.js"));

var _measureText = _interopRequireDefault(require("./measureText.js"));

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

var BinaryOperationBlock =
/*#__PURE__*/
function (_CasusBlock) {
  _inherits(BinaryOperationBlock, _CasusBlock);

  function BinaryOperationBlock(paramType, returnType, centerText) {
    var _this;

    var leftText = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

    _classCallCheck(this, BinaryOperationBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BinaryOperationBlock).call(this));

    _defineProperty(_assertThisInitialized(_this), "lChild", void 0);

    _defineProperty(_assertThisInitialized(_this), "rChild", void 0);

    _defineProperty(_assertThisInitialized(_this), "paramType", void 0);

    _defineProperty(_assertThisInitialized(_this), "returnType", void 0);

    _defineProperty(_assertThisInitialized(_this), "centerText", void 0);

    _defineProperty(_assertThisInitialized(_this), "centerTextWidth", void 0);

    _defineProperty(_assertThisInitialized(_this), "leftText", void 0);

    _defineProperty(_assertThisInitialized(_this), "leftTextWidth", void 0);

    _this.lChild = new _EmptyBlock.default(paramType);
    _this.rChild = new _EmptyBlock.default(paramType);
    _this.paramType = paramType;
    _this.returnType = returnType;
    _this.centerText = centerText;
    _this.centerTextWidth = (0, _measureText.default)(centerText).w + _generateCornerPerim.CENTER_WIDTH;
    _this.leftText = leftText;

    if (_this.leftText.length === 0) {
      _this.leftTextWidth = 0;
    } else {
      _this.leftTextWidth = (0, _measureText.default)(leftText).w + _generateCornerPerim.CENTER_WIDTH;
    }

    return _this;
  }

  _createClass(BinaryOperationBlock, [{
    key: "precompBounds",
    value: function precompBounds() {
      this.lChild.precompBounds();
      this.rChild.precompBounds();
      this.boundingBox = new _BoundingBox.default(0, 0, _generateCornerPerim.RAMP_WIDTH + this.leftTextWidth + this.lChild.boundingBox.w + this.centerTextWidth + this.rChild.boundingBox.w + _generateCornerPerim.RAMP_WIDTH, _generateCornerPerim.VPADDING + Math.max(this.lChild.boundingBox.h, this.rChild.boundingBox.h) + _generateCornerPerim.VPADDING);
    }
  }, {
    key: "precompXY",
    value: function precompXY(x, y) {
      this.boundingBox.x = x;
      this.boundingBox.y = y;
      var lChildX = x + _generateCornerPerim.RAMP_WIDTH + this.leftTextWidth;
      var rChildX = lChildX + this.lChild.boundingBox.w + this.centerTextWidth;
      var lChildYSpace = this.boundingBox.h - this.lChild.boundingBox.h;
      var rChildYSpace = this.boundingBox.h - this.rChild.boundingBox.h;
      var lChildY = y + lChildYSpace / 2;
      var rChildY = y + rChildYSpace / 2;
      this.lChild.precompXY(lChildX, lChildY);
      this.rChild.precompXY(rChildX, rChildY);
    }
  }, {
    key: "getChildBlocks",
    value: function getChildBlocks() {
      return [this.lChild, this.rChild];
    }
  }, {
    key: "removeBlockAt",
    value: function removeBlockAt(v, removeAfter) {
      if (!this.boundingBox.contains(v)) {
        return [];
      }

      var lChildRes = this.lChild.removeBlockAt(v, removeAfter);

      if (lChildRes.length > 0) {
        return lChildRes;
      }

      if (this.lChild.boundingBox.contains(v) && this.lChild.draggable()) {
        var toReturn = [this.lChild];
        this.lChild = new _EmptyBlock.default(this.paramType);
        return toReturn;
      }

      var rChildRes = this.rChild.removeBlockAt(v, removeAfter);

      if (rChildRes.length > 0) {
        return rChildRes;
      }

      if (this.rChild.boundingBox.contains(v) && this.rChild.draggable()) {
        var _toReturn = [this.rChild];
        this.rChild = new _EmptyBlock.default(this.paramType);
        return _toReturn;
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
      ctx.fillText(this.leftText, this.boundingBox.x + _generateCornerPerim.RAMP_WIDTH + this.leftTextWidth / 2, this.boundingBox.y + this.boundingBox.h / 2);
      ctx.fillText(this.centerText, this.boundingBox.x + _generateCornerPerim.RAMP_WIDTH + this.leftTextWidth + this.lChild.boundingBox.w + this.centerTextWidth / 2, this.boundingBox.y + this.boundingBox.h / 2);
    }
  }, {
    key: "getReturnType",
    value: function getReturnType() {
      return this.returnType;
    }
  }, {
    key: "tryToPlace",
    value: function tryToPlace(v, blockToPlace, ctx) {
      var _this$lChild$tryToPla, _this$rChild$tryToPla;

      if (!this.boundingBox.contains(v)) {
        return null;
      }

      this.lChild = (_this$lChild$tryToPla = this.lChild.tryToPlace(v, blockToPlace, ctx)) !== null && _this$lChild$tryToPla !== void 0 ? _this$lChild$tryToPla : this.lChild;
      this.rChild = (_this$rChild$tryToPla = this.rChild.tryToPlace(v, blockToPlace, ctx)) !== null && _this$rChild$tryToPla !== void 0 ? _this$rChild$tryToPla : this.rChild;
      return null;
    }
  }]);

  return BinaryOperationBlock;
}(_CasusBlock2.default);

var _default = BinaryOperationBlock;
exports.default = _default;