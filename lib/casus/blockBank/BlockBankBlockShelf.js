"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _ForBlock = _interopRequireDefault(require("../blocks/ForBlock.js"));

var _IfBlock = _interopRequireDefault(require("../blocks/IfBlock.js"));

var _WhileBlock = _interopRequireDefault(require("../blocks/WhileBlock.js"));

var _IfElseBlock = _interopRequireDefault(require("../blocks/IfElseBlock.js"));

var _CasusBlock = _interopRequireDefault(require("../blocks/CasusBlock.js"));

var _AndBlock = _interopRequireDefault(require("../blocks/AndBlock.js"));

var _OrBlock = _interopRequireDefault(require("../blocks/OrBlock.js"));

var _XorBlock = _interopRequireDefault(require("../blocks/XorBlock.js"));

var _IntEqualsBlock = _interopRequireDefault(require("../blocks/IntEqualsBlock.js"));

var _IntGreaterThanBlock = _interopRequireDefault(require("../blocks/IntGreaterThanBlock.js"));

var _IntGreaterThanOrEqualBlock = _interopRequireDefault(require("../blocks/IntGreaterThanOrEqualBlock.js"));

var _IntLessThanBlock = _interopRequireDefault(require("../blocks/IntLessThanBlock.js"));

var _IntLessThanOrEqualBlock = _interopRequireDefault(require("../blocks/IntLessThanOrEqualBlock.js"));

var _IntAddBlock = _interopRequireDefault(require("../blocks/IntAddBlock.js"));

var _IntSubtractBlock = _interopRequireDefault(require("../blocks/IntSubtractBlock.js"));

var _IntMultiplyBlock = _interopRequireDefault(require("../blocks/IntMultiplyBlock.js"));

var _IntDivideBlock = _interopRequireDefault(require("../blocks/IntDivideBlock.js"));

var _IntModuloBlock = _interopRequireDefault(require("../blocks/IntModuloBlock.js"));

var _IntToDoubleBlock = _interopRequireDefault(require("../blocks/IntToDoubleBlock.js"));

var _IntAbsBlock = _interopRequireDefault(require("../blocks/IntAbsBlock.js"));

var _IntMaxBlock = _interopRequireDefault(require("../blocks/IntMaxBlock.js"));

var _IntMinBlock = _interopRequireDefault(require("../blocks/IntMinBlock.js"));

var _DoubleEqualsBlock = _interopRequireDefault(require("../blocks/DoubleEqualsBlock.js"));

var _DoubleGreaterThanBlock = _interopRequireDefault(require("../blocks/DoubleGreaterThanBlock.js"));

var _DoubleGreaterThanOrEqualBlock = _interopRequireDefault(require("../blocks/DoubleGreaterThanOrEqualBlock.js"));

var _DoubleLessThanBlock = _interopRequireDefault(require("../blocks/DoubleLessThanBlock.js"));

var _DoubleLessThanOrEqualBlock = _interopRequireDefault(require("../blocks/DoubleLessThanOrEqualBlock.js"));

var _DoubleAddBlock = _interopRequireDefault(require("../blocks/DoubleAddBlock.js"));

var _DoubleSubtractBlock = _interopRequireDefault(require("../blocks/DoubleSubtractBlock.js"));

var _DoubleMultiplyBlock = _interopRequireDefault(require("../blocks/DoubleMultiplyBlock.js"));

var _DoubleDivideBlock = _interopRequireDefault(require("../blocks/DoubleDivideBlock.js"));

var _DoubleRoundBlock = _interopRequireDefault(require("../blocks/DoubleRoundBlock.js"));

var _DoubleTruncateBlock = _interopRequireDefault(require("../blocks/DoubleTruncateBlock.js"));

var _DoubleAbsBlock = _interopRequireDefault(require("../blocks/DoubleAbsBlock.js"));

var _DoubleMaxBlock = _interopRequireDefault(require("../blocks/DoubleMaxBlock.js"));

var _DoubleMinBlock = _interopRequireDefault(require("../blocks/DoubleMinBlock.js"));

var _MathCosBlock = _interopRequireDefault(require("../blocks/MathCosBlock.js"));

var _MathSinBlock = _interopRequireDefault(require("../blocks/MathSinBlock.js"));

var _MathTanBlock = _interopRequireDefault(require("../blocks/MathTanBlock.js"));

var _MathAcosBlock = _interopRequireDefault(require("../blocks/MathAcosBlock.js"));

var _MathAsinBlock = _interopRequireDefault(require("../blocks/MathAsinBlock.js"));

var _MathAtanBlock = _interopRequireDefault(require("../blocks/MathAtanBlock.js"));

var _MathSqrtBlock = _interopRequireDefault(require("../blocks/MathSqrtBlock.js"));

var _MathPowBlock = _interopRequireDefault(require("../blocks/MathPowBlock.js"));

var _ContainerBlock = _interopRequireDefault(require("../blocks/ContainerBlock.js"));

var _Vec = _interopRequireDefault(require("../blocks/Vec.js"));

require("./BlockBankBlockShelf.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ADJACENT_BLOCK_PADDING = 10;

var BlockBankBlockShelf =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BlockBankBlockShelf, _React$Component);

  function BlockBankBlockShelf(props) {
    var _this;

    _classCallCheck(this, BlockBankBlockShelf);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BlockBankBlockShelf).call(this, props));
    _this.state = {
      blocksOnShelf: _this._getBlocksOfType(props.selectedSection),
      mouseX: 0,
      mouseY: 0,
      mouseOnScreen: false
    };
    return _this;
  }

  _createClass(BlockBankBlockShelf, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.addEventListener('resize', function () {
        return _this2._rerender();
      });
      var canvas = this.refs.canvas;

      canvas.onmousemove = function (e) {
        return _this2.onMouseMove(e);
      };

      canvas.onmouseout = function () {
        return _this2.onMouseOut();
      };

      canvas.onmouseup = function () {
        return _this2.onMouseUp();
      };

      canvas.onmousedown = function (e) {
        return _this2.onMouseDown(e);
      };

      canvas.oncontextmenu = function (e) {
        e.preventDefault();
      };

      this._rerender();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      //Good practice to prevent infinite loop: 
      //https://reactjs.org/docs/react-component.html#componentdidupdate
      if (this.props.selectedSection !== prevProps.selectedSection) {
        this.setState({
          blocksOnShelf: this._getBlocksOfType(this.props.selectedSection)
        });
      }

      if (this.state !== prevState) {
        this._rerender();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("canvas", {
        className: "blockBankBlockShelfCanvas",
        ref: "canvas"
      });
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(e) {
      var canvas = this.refs.canvas;
      var boundingBox = canvas.getBoundingClientRect();
      this.setState({
        mouseX: e.clientX - boundingBox.left,
        mouseY: e.clientY - boundingBox.top,
        mouseOnScreen: true
      });

      this._rerender();
    }
  }, {
    key: "onMouseOut",
    value: function onMouseOut() {
      this.setState({
        mouseOnScreen: false
      });

      this._rerender();
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      this.props.onDraggedBlocksReleased();

      this._rerender();
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(e) {
      var canvas = this.refs.canvas;
      var boundingBox = canvas.getBoundingClientRect();
      var eventPos = new _Vec.default(e.clientX - boundingBox.left, e.clientY - boundingBox.top);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.state.blocksOnShelf[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var block = _step.value;

          if (block.boundingBox.contains(eventPos)) {
            //then this was clicked
            this.props.onBlocksDragged([block]);
            this.setState({
              blocksOnShelf: this._getBlocksOfType(this.props.selectedSection)
            });
            break;
          }
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

      this._rerender();
    }
  }, {
    key: "_rerender",
    value: function _rerender() {
      var canvas = this.refs.canvas;
      var ctx = canvas.getContext('2d');

      this._resizeCanvas();

      this._clearBackground(ctx);

      this._renderBlocks(ctx, this.state.blocksOnShelf);

      if (this.state.mouseOnScreen && this.props.draggedBlocks != null) {
        var oldAlpha = ctx.globalAlpha;
        ctx.globalAlpha = 0.5;
        var containerBlock = new _ContainerBlock.default(this.props.draggedBlocks);
        containerBlock.precompBounds();
        containerBlock.precompXY(this.state.mouseX, this.state.mouseY);
        containerBlock.renderDFS(ctx);
        ctx.globalAlpha = oldAlpha;
      }
    }
  }, {
    key: "_clearBackground",
    value: function _clearBackground(ctx) {
      //fill background
      ctx.fillStyle = 'gray';
      ctx.fillRect(0, 0, 100000, 10000);
    }
  }, {
    key: "_resizeCanvas",
    value: function _resizeCanvas() {
      var canvas = this.refs.canvas;

      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }
    }
  }, {
    key: "_getBlocksOfType",
    value: function _getBlocksOfType(type) {
      var blocks = [];

      switch (type) {
        case 'CONTROL_FLOW':
          blocks = this._getControlFlowBlocks();
          break;

        case 'MATH':
          blocks = this._getMathBlocks();
          break;

        case 'INTS':
          blocks = this._getIntsBlocks();
          break;

        case 'DOUBLES':
          blocks = this._getDoublesBlocks();
          break;

        case 'VARIABLES':
          blocks = [];
          break;

        case 'LOGIC':
          blocks = this._getLogicBlocks();
          break;

        case 'LISTS':
          blocks = [];
          break;

        default:
          console.log('unexpected BlockBankType: ' + type + ' in getBlocksOfType!');
          break;
      }

      var x = 10;
      var y = 10;
      var nextY = y;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = blocks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var block = _step2.value;

          if (x > 940) {
            x = 10;
            y = nextY + 10;
          }

          block.precompBounds();
          nextY = Math.max(nextY, y + block.boundingBox.h);
          block.precompXY(x, y);
          x += block.boundingBox.w + ADJACENT_BLOCK_PADDING;
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

      return blocks;
    }
  }, {
    key: "_getControlFlowBlocks",
    value: function _getControlFlowBlocks() {
      var blocks = [];
      blocks.push(new _ForBlock.default());
      blocks.push(new _IfBlock.default());
      blocks.push(new _IfElseBlock.default());
      blocks.push(new _WhileBlock.default());
      return blocks;
    }
  }, {
    key: "_getMathBlocks",
    value: function _getMathBlocks() {
      var blocks = [];
      blocks.push(new _MathCosBlock.default());
      blocks.push(new _MathSinBlock.default());
      blocks.push(new _MathTanBlock.default());
      blocks.push(new _MathAcosBlock.default());
      blocks.push(new _MathAsinBlock.default());
      blocks.push(new _MathAtanBlock.default());
      blocks.push(new _MathSqrtBlock.default());
      blocks.push(new _MathPowBlock.default());
      return blocks;
    }
  }, {
    key: "_getIntsBlocks",
    value: function _getIntsBlocks() {
      var blocks = [];
      blocks.push(new _IntEqualsBlock.default());
      blocks.push(new _IntGreaterThanBlock.default());
      blocks.push(new _IntGreaterThanOrEqualBlock.default());
      blocks.push(new _IntLessThanBlock.default());
      blocks.push(new _IntLessThanOrEqualBlock.default());
      blocks.push(new _IntAddBlock.default());
      blocks.push(new _IntSubtractBlock.default());
      blocks.push(new _IntMultiplyBlock.default());
      blocks.push(new _IntDivideBlock.default());
      blocks.push(new _IntModuloBlock.default());
      blocks.push(new _IntToDoubleBlock.default());
      blocks.push(new _IntAbsBlock.default());
      blocks.push(new _IntMaxBlock.default());
      blocks.push(new _IntMinBlock.default());
      return blocks;
    }
  }, {
    key: "_getDoublesBlocks",
    value: function _getDoublesBlocks() {
      var blocks = [];
      blocks.push(new _DoubleEqualsBlock.default());
      blocks.push(new _DoubleGreaterThanBlock.default());
      blocks.push(new _DoubleGreaterThanOrEqualBlock.default());
      blocks.push(new _DoubleLessThanBlock.default());
      blocks.push(new _DoubleLessThanOrEqualBlock.default());
      blocks.push(new _DoubleAddBlock.default());
      blocks.push(new _DoubleSubtractBlock.default());
      blocks.push(new _DoubleMultiplyBlock.default());
      blocks.push(new _DoubleDivideBlock.default());
      blocks.push(new _DoubleRoundBlock.default());
      blocks.push(new _DoubleTruncateBlock.default());
      blocks.push(new _DoubleAbsBlock.default());
      blocks.push(new _DoubleMaxBlock.default());
      blocks.push(new _DoubleMinBlock.default());
      return blocks;
    }
  }, {
    key: "_getLogicBlocks",
    value: function _getLogicBlocks() {
      var blocks = [];
      blocks.push(new _AndBlock.default());
      blocks.push(new _OrBlock.default());
      blocks.push(new _XorBlock.default());
      return blocks;
    }
  }, {
    key: "_renderBlocks",
    value: function _renderBlocks(ctx, blocks) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = blocks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var block = _step3.value;
          block.renderDFS(ctx);
        }
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
    }
  }]);

  return BlockBankBlockShelf;
}(React.Component);

var _default = BlockBankBlockShelf;
exports.default = _default;