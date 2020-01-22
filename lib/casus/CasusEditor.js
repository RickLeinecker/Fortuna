"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _CasusBlock = _interopRequireDefault(require("./blocks/CasusBlock.js"));

var _OrBlock = _interopRequireDefault(require("./blocks/OrBlock.js"));

var _VariableBlock = _interopRequireDefault(require("./blocks/VariableBlock.js"));

var _IntEqualsBlock = _interopRequireDefault(require("./blocks/IntEqualsBlock.js"));

var _SetVariableBlock = _interopRequireDefault(require("./blocks/SetVariableBlock.js"));

var _ForBlock = _interopRequireDefault(require("./blocks/ForBlock.js"));

var _ContainerBlock = _interopRequireDefault(require("./blocks/ContainerBlock.js"));

var _EmptyBlock = _interopRequireDefault(require("./blocks/EmptyBlock.js"));

var _Vec = _interopRequireDefault(require("./blocks/Vec.js"));

require("./CasusEditor.css");

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

var RIGHT_BUTTON_CODE = 2;

var CasusEditor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CasusEditor, _React$Component);

  function CasusEditor(props) {
    var _this;

    _classCallCheck(this, CasusEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CasusEditor).call(this, props));
    var orBlock = new _OrBlock.default();
    var orBlock2 = new _OrBlock.default();
    var testVariable = new _VariableBlock.default('DOUBLE', 'Some variable with a really long name');
    var testEquals = new _IntEqualsBlock.default();
    var setIntVariable = new _SetVariableBlock.default('answer', 'INT');
    var testForLoop = new _ForBlock.default();
    var containerBlock = new _ContainerBlock.default([]);
    orBlock.lChild = orBlock2;
    containerBlock.children.push(orBlock);
    containerBlock.children.push(testVariable);
    containerBlock.children.push(testEquals);
    containerBlock.children.push(setIntVariable);
    containerBlock.children.push(testForLoop);
    _this.state = {
      containerBlock: containerBlock,
      mouseX: 0,
      mouseY: 0,
      mouseOnScreen: false
    };
    return _this;
  }

  _createClass(CasusEditor, [{
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
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "casusEditorContainingDiv"
      }, React.createElement("canvas", {
        className: "casusEditorCanvas",
        ref: "canvas"
      }));
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
      var wouldPlaceOnEmptyVoid = this._wouldPlaceOnEmptyVoid();

      this._tryToPlace(null);

      if (!wouldPlaceOnEmptyVoid) {
        this._tryToPlaceInContainerBlock(null);
      }

      this.props.onDraggedBlocksReleased();

      this._rerender();
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(e) {
      var canvas = this.refs.canvas;
      var boundingBox = canvas.getBoundingClientRect();
      var eventPos = new _Vec.default(e.clientX - boundingBox.left, e.clientY - boundingBox.top);
      var rightButton = e.button === RIGHT_BUTTON_CODE;
      var toSelect = [];

      if (rightButton) {
        toSelect = this.state.containerBlock.removeBlockAt(eventPos, true);
      } else {
        toSelect = this.state.containerBlock.removeBlockAt(eventPos, false);
      }

      if (toSelect.length > 0) {
        this.props.onBlocksDragged(toSelect);
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

      var containerBlock = this.state.containerBlock;
      containerBlock.precompBounds();
      containerBlock.precompXY(0, 0);
      containerBlock.renderDFS(ctx); //deal with highlights

      this.state.containerBlock.unhighlightEverything();

      var wouldPlaceOnEmptyVoid = this._wouldPlaceOnEmptyVoid();

      if (this.state.mouseOnScreen) {
        this._tryToPlace(ctx);
      }

      if (!wouldPlaceOnEmptyVoid) {
        this._tryToPlaceInContainerBlock(ctx);
      }

      containerBlock.highlightDFS(ctx);

      if (this.state.mouseOnScreen && this.props.draggedBlocks != null) {
        var oldAlpha = ctx.globalAlpha;
        ctx.globalAlpha = 0.5;

        var _containerBlock = new _ContainerBlock.default(this.props.draggedBlocks);

        _containerBlock.precompBounds();

        _containerBlock.precompXY(this.state.mouseX, this.state.mouseY);

        _containerBlock.renderDFS(ctx);

        ctx.globalAlpha = oldAlpha;
      }
    }
  }, {
    key: "_clearBackground",
    value: function _clearBackground(ctx) {
      //fill background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 100000, 100000);
    }
  }, {
    key: "_resizeCanvas",
    value: function _resizeCanvas() {
      var canvas = this.refs.canvas;

      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }
    } //checks if a realeased block would be placed on an empty block with void return type

  }, {
    key: "_wouldPlaceOnEmptyVoid",
    value: function _wouldPlaceOnEmptyVoid() {
      if (this.props.draggedBlocks != null) {
        var mousePos = new _Vec.default(this.state.mouseX, this.state.mouseY);
        var deepest = this.state.containerBlock.getDeepestChildContainingPoint(mousePos);

        if (deepest instanceof _EmptyBlock.default && deepest.getReturnType() === 'VOID') {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "_tryToPlace",
    value: function _tryToPlace(ctx) {
      if (this.props.draggedBlocks != null) {
        var mousePos = new _Vec.default(this.state.mouseX, this.state.mouseY);
        var blockToTryPlace = this.props.draggedBlocks.length === 1 ? this.props.draggedBlocks[0] : new _ContainerBlock.default(this.props.draggedBlocks);
        blockToTryPlace.precompBounds();
        blockToTryPlace.precompXY(mousePos.x, mousePos.y);
        this.state.containerBlock.tryToPlace(mousePos, blockToTryPlace, ctx);
      }
    }
  }, {
    key: "_tryToPlaceInContainerBlock",
    value: function _tryToPlaceInContainerBlock(ctx) {
      if (this.props.draggedBlocks != null) {
        var mousePos = new _Vec.default(this.state.mouseX, this.state.mouseY);
        var blockToTryPlace = this.props.draggedBlocks.length === 1 ? this.props.draggedBlocks[0] : new _ContainerBlock.default(this.props.draggedBlocks);

        if (blockToTryPlace.getReturnType() !== 'VOID') {
          return;
        }

        blockToTryPlace.precompBounds();
        this.state.containerBlock.tryToPlaceInContainer(mousePos, blockToTryPlace, ctx);
      }
    }
  }]);

  return CasusEditor;
}(React.Component);

var _default = CasusEditor;
exports.default = _default;