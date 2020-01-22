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

var ForBlock =
/*#__PURE__*/
function (_CasusBlock) {
  _inherits(ForBlock, _CasusBlock);

  function ForBlock() {
    var _this;

    _classCallCheck(this, ForBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ForBlock).call(this));

    _defineProperty(_assertThisInitialized(_this), "initializationBlock", void 0);

    _defineProperty(_assertThisInitialized(_this), "expressionBlock", void 0);

    _defineProperty(_assertThisInitialized(_this), "incrementBlock", void 0);

    _defineProperty(_assertThisInitialized(_this), "contents", void 0);

    _defineProperty(_assertThisInitialized(_this), "headerBoundingBox", void 0);

    _this.initializationBlock = new _EmptyBlock.default('VOID');
    _this.expressionBlock = new _EmptyBlock.default('BOOLEAN');
    _this.incrementBlock = new _EmptyBlock.default('VOID');
    _this.contents = new _ContainerBlock.default();
    return _this;
  }

  _createClass(ForBlock, [{
    key: "precompBounds",
    value: function precompBounds() {
      this.initializationBlock.precompBounds();
      this.expressionBlock.precompBounds();
      this.incrementBlock.precompBounds();
      var width = _generateCornerPerim.FOR_BLOCK_FOR_WIDTH + this.initializationBlock.boundingBox.w + _generateCornerPerim.FOR_BLOCK_SEMICOLON_WIDTH + this.expressionBlock.boundingBox.w + _generateCornerPerim.FOR_BLOCK_SEMICOLON_WIDTH + this.incrementBlock.boundingBox.w + _generateCornerPerim.RAMP_WIDTH;

      var height = _generateCornerPerim.VPADDING + Math.max(this.initializationBlock.boundingBox.h, Math.max(this.expressionBlock.boundingBox.h, this.incrementBlock.boundingBox.h)) + _generateCornerPerim.VPADDING;

      this.contents.precompBounds();
      width = Math.max(width, this.contents.boundingBox.w + _generateCornerPerim.RAMP_WIDTH);
      this.headerBoundingBox = new _BoundingBox.default(0, 0, width, height);
      height += this.contents.boundingBox.h;
      height += _generateCornerPerim.RAMP_WIDTH;
      this.boundingBox = new _BoundingBox.default(0, 0, width, height);
    }
  }, {
    key: "getPerim",
    value: function getPerim() {
      var toReturn = [];
      var header = this.headerBoundingBox;
      var bounding = this.boundingBox;
      toReturn.push(new _Vec.default(header.x, header.y));
      toReturn.push(new _Vec.default(header.x + header.w, header.y));
      toReturn.push(new _Vec.default(header.x + header.w, header.y + header.h));
      toReturn.push(new _Vec.default(header.x + _generateCornerPerim.RAMP_WIDTH, header.y + header.h));
      toReturn.push(new _Vec.default(header.x + _generateCornerPerim.RAMP_WIDTH, bounding.y + bounding.h - _generateCornerPerim.RAMP_WIDTH));
      toReturn.push(new _Vec.default(bounding.x + bounding.w, bounding.y + bounding.h - _generateCornerPerim.RAMP_WIDTH));
      toReturn.push(new _Vec.default(bounding.x + bounding.w, bounding.y + bounding.h));
      toReturn.push(new _Vec.default(bounding.x, bounding.y + bounding.h));
      return toReturn;
    }
  }, {
    key: "precompXY",
    value: function precompXY(x, y) {
      this.headerBoundingBox.x = x;
      this.headerBoundingBox.y = y;
      this.boundingBox.x = x;
      this.boundingBox.y = y;
      var curX = x + _generateCornerPerim.FOR_BLOCK_FOR_WIDTH;
      var curY = y;
      var vSpace = this.headerBoundingBox.h - this.initializationBlock.boundingBox.h;
      this.initializationBlock.precompXY(curX, curY + vSpace / 2);
      curX += this.initializationBlock.boundingBox.w + _generateCornerPerim.FOR_BLOCK_SEMICOLON_WIDTH;
      vSpace = this.headerBoundingBox.h - this.expressionBlock.boundingBox.h;
      this.expressionBlock.precompXY(curX, curY + vSpace / 2);
      curX += this.expressionBlock.boundingBox.w + _generateCornerPerim.FOR_BLOCK_SEMICOLON_WIDTH;
      vSpace = this.headerBoundingBox.h - this.incrementBlock.boundingBox.h;
      this.incrementBlock.precompXY(curX, curY + vSpace / 2);
      curX = x + _generateCornerPerim.RAMP_WIDTH;
      curY = y + this.headerBoundingBox.h;
      this.contents.precompXY(curX, curY);
      curY += this.contents.boundingBox.h;
    }
  }, {
    key: "getChildBlocks",
    value: function getChildBlocks() {
      return [this.initializationBlock, this.expressionBlock, this.incrementBlock, this.contents];
    }
  }, {
    key: "removeBlockAt",
    value: function removeBlockAt(v, removeAfter) {
      var initializationRes = this.initializationBlock.removeBlockAt(v, removeAfter);

      if (initializationRes.length > 0) {
        return initializationRes;
      }

      if (this.initializationBlock.boundingBox.contains(v) && this.initializationBlock.draggable()) {
        var toReturn = [this.initializationBlock];
        this.initializationBlock = new _EmptyBlock.default('VOID');
        return toReturn;
      }

      var expressionRes = this.expressionBlock.removeBlockAt(v, removeAfter);

      if (expressionRes.length > 0) {
        return expressionRes;
      }

      if (this.expressionBlock.boundingBox.contains(v) && this.expressionBlock.draggable()) {
        var _toReturn = [this.expressionBlock];
        this.expressionBlock = new _EmptyBlock.default('BOOLEAN');
        return _toReturn;
      }

      var incrementRes = this.incrementBlock.removeBlockAt(v, removeAfter);

      if (incrementRes.length > 0) {
        return incrementRes;
      }

      if (this.incrementBlock.boundingBox.contains(v) && this.incrementBlock.draggable()) {
        var _toReturn2 = [this.incrementBlock];
        this.incrementBlock = new _EmptyBlock.default('VOID');
        return _toReturn2;
      }

      return this.contents.removeBlockAt(v, removeAfter);
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
      ctx.fillText('for', curX + _generateCornerPerim.FOR_BLOCK_FOR_WIDTH / 2, this.headerBoundingBox.y + this.headerBoundingBox.h / 2);
      curX += _generateCornerPerim.FOR_BLOCK_FOR_WIDTH + this.initializationBlock.boundingBox.w;
      ctx.fillText(';', curX + _generateCornerPerim.FOR_BLOCK_SEMICOLON_WIDTH / 2, this.boundingBox.y + this.headerBoundingBox.h / 2);
      curX += _generateCornerPerim.FOR_BLOCK_SEMICOLON_WIDTH + this.expressionBlock.boundingBox.w;
      ctx.fillText(';', curX + _generateCornerPerim.FOR_BLOCK_SEMICOLON_WIDTH / 2, this.boundingBox.y + this.headerBoundingBox.h / 2);
    }
  }, {
    key: "getReturnType",
    value: function getReturnType() {
      return 'VOID';
    }
  }, {
    key: "tryToPlace",
    value: function tryToPlace(v, blockToPlace, ctx) {
      var _this$initializationB, _this$expressionBlock, _this$incrementBlock$;

      if (!this.boundingBox.contains(v)) {
        return null;
      }

      this.initializationBlock = (_this$initializationB = this.initializationBlock.tryToPlace(v, blockToPlace, ctx)) !== null && _this$initializationB !== void 0 ? _this$initializationB : this.initializationBlock;
      this.expressionBlock = (_this$expressionBlock = this.expressionBlock.tryToPlace(v, blockToPlace, ctx)) !== null && _this$expressionBlock !== void 0 ? _this$expressionBlock : this.expressionBlock;
      this.incrementBlock = (_this$incrementBlock$ = this.incrementBlock.tryToPlace(v, blockToPlace, ctx)) !== null && _this$incrementBlock$ !== void 0 ? _this$incrementBlock$ : this.incrementBlock;
      var result = this.contents.tryToPlace(v, blockToPlace, ctx);

      if (result != null) {
        console.log('ERROR! placing block in for loop contents returned non-null meaning it got replaced!');
      }

      return null;
    }
  }]);

  return ForBlock;
}(_CasusBlock2.default);

var _default = ForBlock;
exports.default = _default;