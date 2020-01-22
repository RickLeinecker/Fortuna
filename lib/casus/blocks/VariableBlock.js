"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CasusBlock2 = _interopRequireDefault(require("./CasusBlock.js"));

var _BoundingBox = _interopRequireDefault(require("./BoundingBox.js"));

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

var VariableBlock =
/*#__PURE__*/
function (_CasusBlock) {
  _inherits(VariableBlock, _CasusBlock);

  function VariableBlock(dataType, name) {
    var _this;

    _classCallCheck(this, VariableBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VariableBlock).call(this));

    _defineProperty(_assertThisInitialized(_this), "dataType", void 0);

    _defineProperty(_assertThisInitialized(_this), "name", void 0);

    _this.dataType = dataType;
    _this.name = name;
    return _this;
  }

  _createClass(VariableBlock, [{
    key: "precompBounds",
    value: function precompBounds() {
      var mainWidth = (0, _measureText.default)(this.name);
      this.boundingBox = new _BoundingBox.default(0, 0, _generateCornerPerim.RAMP_WIDTH + mainWidth.w + _generateCornerPerim.RAMP_WIDTH, _generateCornerPerim.EMPTY_STATEMENT_HEIGHT);
    }
  }, {
    key: "precompXY",
    value: function precompXY(x, y) {
      this.boundingBox = new _BoundingBox.default(x, y, this.boundingBox.w, this.boundingBox.h);
    }
  }, {
    key: "getChildBlocks",
    value: function getChildBlocks() {
      return [];
    }
  }, {
    key: "getPerim",
    value: function getPerim() {
      return (0, _generateCornerPerim.default)(this.boundingBox, this.dataType);
    }
  }, {
    key: "drawSelf",
    value: function drawSelf(ctx) {
      ctx.fillStyle = '#ee5522';
      ctx.beginPath();
      var perim = this.getPerim();
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
      ctx.fillText(this.name, this.boundingBox.x + this.boundingBox.w / 2, this.boundingBox.y + this.boundingBox.h / 2);
    }
  }, {
    key: "getReturnType",
    value: function getReturnType() {
      return this.dataType;
    }
  }, {
    key: "tryToPlace",
    value: function tryToPlace(v, blockToPlace, ctx) {
      return null;
    }
  }]);

  return VariableBlock;
}(_CasusBlock2.default);

var _default = VariableBlock;
exports.default = _default;