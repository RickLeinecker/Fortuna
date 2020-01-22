"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

require("bootstrap/dist/css/bootstrap.min.css");

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

// Marketplace component.
var Marketplace =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Marketplace, _React$Component);

  function Marketplace() {
    _classCallCheck(this, Marketplace);

    return _possibleConstructorReturn(this, _getPrototypeOf(Marketplace).apply(this, arguments));
  }

  _createClass(Marketplace, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "Parent"
      }, React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "col-md-4"
      }, React.createElement(_reactRouterDom.Link, {
        to: "/MainMenu"
      }, React.createElement("button", {
        type: "button",
        className: "btn btn-secondary btn-lg"
      }, "<- Back to Main Menu"))), React.createElement("h1", {
        className: "col-md-4 text-center"
      }, "Marketplace"), React.createElement("h4", {
        className: "col-md-4 text-right"
      }, "Currency: $9432")), React.createElement("div", {
        className: "row mt-5"
      }, React.createElement("div", {
        className: "col-md-4"
      }, React.createElement("h2", null, "Available Tanks"), React.createElement("h6", null, "Tank One"), React.createElement("h6", null, "Tank Two"), React.createElement("h6", null, "Tank Three"), React.createElement("h6", null, "Tank Four"), React.createElement("h6", null, "Tank Five"), React.createElement("h6", null, "Tank Six"), React.createElement("h6", null, "Tank Seven"), React.createElement("h6", null, "Tank Eight")), React.createElement("div", {
        className: "col-md-4"
      }, React.createElement("h2", {
        className: "text-center"
      }, "Selected Tank")), React.createElement("div", {
        className: "col-md-4"
      }, React.createElement("h2", {
        className: "text-right"
      }, "Components"), React.createElement("h6", {
        className: "text-right"
      }, "Tank One Cannon"), React.createElement("h6", {
        className: "text-right"
      }, "Tank One Tracks"), React.createElement("h6", {
        className: "text-right"
      }, "Tank One Scanner"), React.createElement("h6", {
        className: "text-right"
      }, "Tank One Jammer"), React.createElement("h6", {
        className: "text-right"
      }, "Tank One Base"))));
    }
  }]);

  return Marketplace;
}(React.Component);

var _default = Marketplace;
exports.default = _default;