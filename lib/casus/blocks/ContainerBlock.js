"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BoundingBox = _interopRequireDefault(require("./BoundingBox.js"));

var _CasusBlock2 = _interopRequireDefault(require("./CasusBlock.js"));

var _EmptyBlock = _interopRequireDefault(require("./EmptyBlock.js"));

var _Vec = _interopRequireDefault(require("./Vec.js"));

var _generateCornerPerim = require("./generateCornerPerim.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ContainerBlock =
/*#__PURE__*/
function (_CasusBlock) {
  _inherits(ContainerBlock, _CasusBlock);

  function ContainerBlock() {
    var _this;

    var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [new _EmptyBlock.default('VOID')];

    _classCallCheck(this, ContainerBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContainerBlock).call(this));

    _defineProperty(_assertThisInitialized(_this), "children", void 0);

    _this.children = children;
    return _this;
  }

  _createClass(ContainerBlock, [{
    key: "precompBounds",
    value: function precompBounds() {
      //set this.boundingBox
      var w = 0;
      var h = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.getChildBlocks()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;
          child.precompBounds();
          w = Math.max(w, child.boundingBox.w);
          h += child.boundingBox.h;
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

      this.boundingBox = new _BoundingBox.default(0, 0, w, h);
    }
  }, {
    key: "precompXY",
    value: function precompXY(x, y) {
      this.boundingBox.x = x;
      this.boundingBox.y = y;
      var curY = y;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.getChildBlocks()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var child = _step2.value;
          child.precompXY(x, curY);
          curY += child.boundingBox.h;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "getChildBlocks",
    value: function getChildBlocks() {
      return this.children;
    }
  }, {
    key: "removeBlockAt",
    value: function removeBlockAt(v, removeAfter) {
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        var childRes = child.removeBlockAt(v, removeAfter);

        if (childRes.length > 0) {
          return childRes;
        }

        if (child.boundingBox.contains(v) && child.draggable()) {
          var toReturn = removeAfter ? this.children.splice(i) : this.children.splice(i, 1);

          if (this.children.length === 0) {
            this.children.push(new _EmptyBlock.default('VOID'));
          }

          return toReturn;
        }
      }

      return [];
    }
  }, {
    key: "draggable",
    value: function draggable() {
      return false;
    }
  }, {
    key: "getPerim",
    value: function getPerim() {
      return [];
    }
  }, {
    key: "drawSelf",
    value: function drawSelf(ctx) {}
  }, {
    key: "getReturnType",
    value: function getReturnType() {
      return 'VOID';
    }
  }, {
    key: "tryToPlace",
    value: function tryToPlace(v, blockToPlace, ctx) {
      if (!this.boundingBox.contains(v)) {
        return null;
      }

      for (var i = 0; i < this.children.length; i++) {
        var _this$children$i$tryT;

        this.children[i] = (_this$children$i$tryT = this.children[i].tryToPlace(v, blockToPlace, ctx)) !== null && _this$children$i$tryT !== void 0 ? _this$children$i$tryT : this.children[i];
      } //If I only had one child that was an empty block and I just replaced him with another
      //container block, then I should just comendeer the container block's children


      for (var _i = 0; _i < this.children.length; _i++) {
        if (this.children[_i] instanceof ContainerBlock) {
          var _this$children;

          (_this$children = this.children).splice.apply(_this$children, [_i, 1].concat(_toConsumableArray(this.children[_i].children)));
        }
      }
    }
  }, {
    key: "tryToPlaceInContainer",
    value: function tryToPlaceInContainer(v, blockToPlace, ctx) {
      if (!this.boundingBox.contains(v)) {
        return false;
      } //if I can place it in any of my children, don't worry about it here


      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.getChildBlocks()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _child = _step3.value;

          if (_child.tryToPlaceInContainer(v, blockToPlace, ctx)) {
            return true;
          }
        } //otherwise, we are going to place it here, so we need to find the closest y

      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var bestIndex = 0;
      var bestError = Math.abs(this.boundingBox.y - v.y);
      var bestY = this.boundingBox.y;

      for (var potentialIndex = 1; potentialIndex <= this.children.length; potentialIndex++) {
        var child = this.children[potentialIndex - 1];
        var curY = child.boundingBox.y + child.boundingBox.h;
        var curError = Math.abs(curY - v.y);

        if (curError < bestError) {
          bestError = curError;
          bestIndex = potentialIndex;
          bestY = curY;
        }
      }

      if (ctx == null) {
        //then actually place it
        if (blockToPlace instanceof ContainerBlock) {
          var _this$children2;

          var toPlace = blockToPlace.children;

          (_this$children2 = this.children).splice.apply(_this$children2, [bestIndex, 0].concat(_toConsumableArray(toPlace)));
        } else {
          this.children.splice(bestIndex, 0, blockToPlace);
        }
      } else {
        //otherwise just draw the highlight
        ctx.beginPath();
        ctx.strokeStyle = '#eeeeee';
        ctx.lineWidth = _generateCornerPerim.HIGHLIGHT_STROKE_WIDTH;
        ctx.moveTo(this.boundingBox.x, bestY);
        ctx.lineTo(this.boundingBox.x + this.boundingBox.w, bestY);
        ctx.closePath();
        ctx.stroke();
      }

      return true;
    }
  }]);

  return ContainerBlock;
}(_CasusBlock2.default);

var _default = ContainerBlock;
exports.default = _default;