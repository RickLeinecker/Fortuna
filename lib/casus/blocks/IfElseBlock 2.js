"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BoundingBox = _interopRequireDefault(require("./BoundingBox.js"));

var _CasusBlock2 = _interopRequireDefault(require("./CasusBlock.js"));

var _EmptyBlock = _interopRequireDefault(require("./EmptyBlock.js"));

var _ContainerBlock = _interopRequireDefault(require("./ContainerBlock.js"));

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

var IfElseBlock =
/*#__PURE__*/
function (_CasusBlock) {
  _inherits(IfElseBlock, _CasusBlock);

  function IfElseBlock() {
    var _this;

    _classCallCheck(this, IfElseBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IfElseBlock).call(this));

    _defineProperty(_assertThisInitialized(_this), "conditionBlock", void 0);

    _defineProperty(_assertThisInitialized(_this), "ifContents", void 0);

    _defineProperty(_assertThisInitialized(_this), "elseContents", void 0);

    _defineProperty(_assertThisInitialized(_this), "ifHeaderBoundingBox", void 0);

    _defineProperty(_assertThisInitialized(_this), "elseHeaderBoundingBox", void 0);

    _this.conditionBlock = new _EmptyBlock.default('BOOLEAN');
    _this.ifContents = new _ContainerBlock.default();
    _this.elseContents = new _ContainerBlock.default();
    return _this;
  }

  _createClass(IfElseBlock, [{
    key: "precompBounds",
    value: function precompBounds() {
      this.conditionBlock.precompBounds();
      this.ifContents.precompBounds();
      this.elseContents.precompBounds();
      var width = Math.max(_generateCornerPerim.IF_BLOCK_IF_WIDTH + this.conditionBlock.boundingBox.w + _generateCornerPerim.RAMP_WIDTH, this.ifContents.boundingBox.w + _generateCornerPerim.RAMP_WIDTH, _generateCornerPerim.IF_ELSE_BLOCK_ELSE_WIDTH, this.elseContents.boundingBox.w + _generateCornerPerim.RAMP_WIDTH);
      var height = _generateCornerPerim.VPADDING + this.conditionBlock.boundingBox.h + _generateCornerPerim.VPADDING;
      this.ifHeaderBoundingBox = new _BoundingBox.default(0, 0, width, height);
      this.elseHeaderBoundingBox = new _BoundingBox.default(0, 0, width, _generateCornerPerim.VPADDING + _generateCornerPerim.EMPTY_STATEMENT_HEIGHT + _generateCornerPerim.VPADDING);
      height += this.ifContents.boundingBox.h;
      height += this.elseHeaderBoundingBox.h;
      height += this.elseContents.boundingBox.h;
      height += _generateCornerPerim.RAMP_WIDTH;
      this.boundingBox = new _BoundingBox.default(0, 0, width, height);
    }
  }, {
    key: "getPerim",
    value: function getPerim() {
      var toReturn = [];
      var ifHeader = this.ifHeaderBoundingBox;
      var elseHeader = this.elseHeaderBoundingBox;
      var bounding = this.boundingBox;
      toReturn.push(new _Vec.default(ifHeader.x, ifHeader.y));
      toReturn.push(new _Vec.default(ifHeader.x + ifHeader.w, ifHeader.y));
      toReturn.push(new _Vec.default(ifHeader.x + ifHeader.w, ifHeader.y + ifHeader.h));
      toReturn.push(new _Vec.default(ifHeader.x + _generateCornerPerim.RAMP_WIDTH, ifHeader.y + ifHeader.h));
      toReturn.push(new _Vec.default(elseHeader.x + _generateCornerPerim.RAMP_WIDTH, elseHeader.y));
      toReturn.push(new _Vec.default(elseHeader.x + elseHeader.w, elseHeader.y));
      toReturn.push(new _Vec.default(elseHeader.x + elseHeader.w, elseHeader.y + elseHeader.h));
      toReturn.push(new _Vec.default(elseHeader.x + _generateCornerPerim.RAMP_WIDTH, elseHeader.y + elseHeader.h));
      toReturn.push(new _Vec.default(elseHeader.x + _generateCornerPerim.RAMP_WIDTH, bounding.y + bounding.h - _generateCornerPerim.RAMP_WIDTH));
      toReturn.push(new _Vec.default(bounding.x + bounding.w, bounding.y + bounding.h - _generateCornerPerim.RAMP_WIDTH));
      toReturn.push(new _Vec.default(bounding.x + bounding.w, bounding.y + bounding.h));
      toReturn.push(new _Vec.default(bounding.x, bounding.y + bounding.h));
      return toReturn;
    }
  }, {
    key: "precompXY",
    value: function precompXY(x, y) {
      this.ifHeaderBoundingBox.x = x;
      this.ifHeaderBoundingBox.y = y;
      this.boundingBox.x = x;
      this.boundingBox.y = y;
      var curX = x + _generateCornerPerim.IF_BLOCK_IF_WIDTH;
      var curY = y + _generateCornerPerim.VPADDING;
      this.conditionBlock.precompXY(curX, curY);
      curX = x + _generateCornerPerim.RAMP_WIDTH;
      curY = y + this.ifHeaderBoundingBox.h;
      this.ifContents.precompXY(curX, curY);
      curY += this.ifContents.boundingBox.h;
      this.elseHeaderBoundingBox.x = x;
      this.elseHeaderBoundingBox.y = curY;
      curY += this.elseHeaderBoundingBox.h;
      this.elseContents.precompXY(curX, curY);
    }
  }, {
    key: "getChildBlocks",
    value: function getChildBlocks() {
      return [this.conditionBlock, this.ifContents, this.elseContents];
    }
  }, {
    key: "removeBlockAt",
    value: function removeBlockAt(v, removeAfter) {
      var conditionRes = this.conditionBlock.removeBlockAt(v, removeAfter);

      if (conditionRes.length > 0) {
        return conditionRes;
      }

      if (this.conditionBlock.boundingBox.contains(v) && this.conditionBlock.draggable()) {
        var toReturn = [this.conditionBlock];
        this.conditionBlock = new _EmptyBlock.default('BOOLEAN');
        return toReturn;
      }

      var ifContentsRes = this.ifContents.removeBlockAt(v, removeAfter);

      if (ifContentsRes.length > 0) {
        return ifContentsRes;
      }

      return this.elseContents.removeBlockAt(v, removeAfter);
    }
  }, {
    key: "drawSelf",
    value: function drawSelf(ctx) {
      ctx.fillStyle = '#3322ee';
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
      var curX = this.boundingBox.x;
      ctx.fillText('if', curX + _generateCornerPerim.IF_BLOCK_IF_WIDTH / 2, this.ifHeaderBoundingBox.y + this.ifHeaderBoundingBox.h / 2);
      ctx.fillText('else', curX + _generateCornerPerim.IF_ELSE_BLOCK_ELSE_WIDTH / 2, this.elseHeaderBoundingBox.y + this.elseHeaderBoundingBox.h / 2);
    }
  }, {
    key: "getReturnType",
    value: function getReturnType() {
      return 'VOID';
    }
  }, {
    key: "tryToPlace",
    value: function tryToPlace(v, blockToPlace, ctx) {
      var _this$conditionBlock$;

      if (!this.boundingBox.contains(v)) {
        return null;
      }

      this.conditionBlock = (_this$conditionBlock$ = this.conditionBlock.tryToPlace(v, blockToPlace, ctx)) !== null && _this$conditionBlock$ !== void 0 ? _this$conditionBlock$ : this.conditionBlock;
      var result = this.ifContents.tryToPlace(v, blockToPlace, ctx);
      var result2 = this.elseContents.tryToPlace(v, blockToPlace, ctx);

      if (result != null || result2 != null) {
        console.log('ERROR! placing block in contents returned non-null meaning it got replaced!');
      }

      return null;
    }
  }]);

  return IfElseBlock;
}(_CasusBlock2.default);

var _default = IfElseBlock;
exports.default = _default;