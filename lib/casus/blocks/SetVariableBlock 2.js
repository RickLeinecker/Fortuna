"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BoundingBox = _interopRequireDefault(require("./BoundingBox.js"));

var _CasusBlock2 = _interopRequireDefault(require("./CasusBlock.js"));

var _EmptyBlock = _interopRequireDefault(require("./EmptyBlock.js"));

var _measureText = _interopRequireDefault(require("./measureText.js"));

var _Vec = _interopRequireDefault(require("./Vec.js"));

var _generateCornerPerim = require("./generateCornerPerim.js");

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

var SetVariableBlock =
/*#__PURE__*/
function (_CasusBlock) {
  _inherits(SetVariableBlock, _CasusBlock);

  function SetVariableBlock(variableName, paramType) {
    var _this;

    _classCallCheck(this, SetVariableBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SetVariableBlock).call(this));

    _defineProperty(_assertThisInitialized(_this), "variableName", void 0);

    _defineProperty(_assertThisInitialized(_this), "expressionBlock", void 0);

    _defineProperty(_assertThisInitialized(_this), "_variableNameBoundingBox", void 0);

    _this.variableName = variableName;
    _this.expressionBlock = new _EmptyBlock.default(paramType);
    _this._variableNameBoundingBox = (0, _measureText.default)(variableName);
    return _this;
  }

  _createClass(SetVariableBlock, [{
    key: "precompBounds",
    value: function precompBounds() {
      this.expressionBlock.precompBounds();
      var width = _generateCornerPerim.RAMP_WIDTH + _generateCornerPerim.SET_VARIABLE_SET_WIDTH + this._variableNameBoundingBox.w + _generateCornerPerim.SET_VARIABLE_TO_WIDTH + this.expressionBlock.boundingBox.w + _generateCornerPerim.RAMP_WIDTH;
      var height = _generateCornerPerim.VPADDING + this.expressionBlock.boundingBox.h + _generateCornerPerim.VPADDING;
      this.boundingBox = new _BoundingBox.default(0, 0, width, height);
    }
  }, {
    key: "precompXY",
    value: function precompXY(x, y) {
      this.boundingBox.x = x;
      this.boundingBox.y = y;
      var expressionX = x + _generateCornerPerim.RAMP_WIDTH + _generateCornerPerim.SET_VARIABLE_SET_WIDTH + this._variableNameBoundingBox.w + _generateCornerPerim.SET_VARIABLE_TO_WIDTH;
      var expressionY = y + _generateCornerPerim.VPADDING;
      this.expressionBlock.precompXY(expressionX, expressionY);
    }
  }, {
    key: "getChildBlocks",
    value: function getChildBlocks() {
      return [this.expressionBlock];
    }
  }, {
    key: "removeBlockAt",
    value: function removeBlockAt(v, removeAfter) {
      var expressionRes = this.expressionBlock.removeBlockAt(v, removeAfter);

      if (expressionRes.length > 0) {
        return expressionRes;
      }

      if (this.expressionBlock.boundingBox.contains(v) && this.expressionBlock.draggable()) {
        return [this.expressionBlock];
      }

      return [];
    }
  }, {
    key: "getPerim",
    value: function getPerim() {
      var toReturn = [];
      var bounds = this.boundingBox;
      toReturn.push(new _Vec.default(bounds.x, bounds.y));
      toReturn.push(new _Vec.default(bounds.x + bounds.w, bounds.y));
      toReturn.push(new _Vec.default(bounds.x + bounds.w, bounds.y + bounds.h));
      toReturn.push(new _Vec.default(bounds.x, bounds.y + bounds.h));
      return toReturn;
    }
  }, {
    key: "drawSelf",
    value: function drawSelf(ctx) {
      ctx.fillStyle = '#ee22aa';
      ctx.fillRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.w, this.boundingBox.h);
      ctx.fillStyle = '#000000';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('set', this.boundingBox.x + _generateCornerPerim.RAMP_WIDTH + _generateCornerPerim.SET_VARIABLE_SET_WIDTH / 2, this.boundingBox.y + this.boundingBox.h / 2);
      ctx.fillText(this.variableName, this.boundingBox.x + _generateCornerPerim.RAMP_WIDTH + _generateCornerPerim.SET_VARIABLE_SET_WIDTH + this._variableNameBoundingBox.w / 2, this.boundingBox.y + this.boundingBox.h / 2);
      ctx.fillText('to', this.boundingBox.x + _generateCornerPerim.RAMP_WIDTH + _generateCornerPerim.SET_VARIABLE_SET_WIDTH + this._variableNameBoundingBox.w + _generateCornerPerim.SET_VARIABLE_TO_WIDTH / 2, this.boundingBox.y + this.boundingBox.h / 2);
    }
  }, {
    key: "getReturnType",
    value: function getReturnType() {
      return 'VOID';
    }
  }, {
    key: "tryToPlace",
    value: function tryToPlace(v, blockToPlace, ctx) {
      var _this$expressionBlock;

      if (!this.boundingBox.contains(v)) {
        return null;
      }

      this.expressionBlock = (_this$expressionBlock = this.expressionBlock.tryToPlace(v, blockToPlace, ctx)) !== null && _this$expressionBlock !== void 0 ? _this$expressionBlock : this.expressionBlock;
      return null;
    }
  }]);

  return SetVariableBlock;
}(_CasusBlock2.default);

var _default = SetVariableBlock;
exports.default = _default;