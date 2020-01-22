"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _BlockBank = _interopRequireDefault(require("./blockBank/BlockBank.js"));

var _CasusEditor = _interopRequireDefault(require("./CasusEditor.js"));

var _CasusBlock = _interopRequireDefault(require("./blocks/CasusBlock.js"));

require("./CasusContainer.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var CasusContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CasusContainer, _React$Component);

  function CasusContainer(props) {
    var _this;

    _classCallCheck(this, CasusContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CasusContainer).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onBlocksDragged", function (draggedBlocks) {
      _this.setState({
        draggedBlocks: draggedBlocks
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDraggedBlocksReleased", function () {
      _this.setState({
        draggedBlocks: null
      });
    });

    _this.state = {
      draggedBlocks: null
    };
    return _this;
  }

  _createClass(CasusContainer, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "casusContainerDiv"
      }, React.createElement(_BlockBank.default, {
        draggedBlocks: this.state.draggedBlocks,
        onBlocksDragged: this.onBlocksDragged,
        onDraggedBlocksReleased: this.onDraggedBlocksReleased
      }), React.createElement(_CasusEditor.default, {
        draggedBlocks: this.state.draggedBlocks,
        onBlocksDragged: this.onBlocksDragged,
        onDraggedBlocksReleased: this.onDraggedBlocksReleased
      }));
    }
  }]);

  return CasusContainer;
}(React.Component);

var _default = CasusContainer;
exports.default = _default;