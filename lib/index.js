"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var React = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRouterDom = require("react-router-dom");

var _App = _interopRequireDefault(require("./App.js"));

var _Login = _interopRequireDefault(require("./login/Login.js"));

var _MainMenu = _interopRequireDefault(require("./mainmenu/MainMenu.js"));

var _Marketplace = _interopRequireDefault(require("./marketplace/Marketplace.js"));

var _CasusContainer = _interopRequireDefault(require("./casus/CasusContainer.js"));

var _BattleArena = _interopRequireDefault(require("./BattleArena/BattleArena.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// The routing const holds the paths to other react components.
var routing = React.createElement(_reactRouterDom.BrowserRouter, null, React.createElement("div", null, React.createElement(_reactRouterDom.Switch, null, React.createElement(_reactRouterDom.Route, {
  exact: true,
  path: "/",
  component: _App.default
}), React.createElement(_reactRouterDom.Route, {
  path: "/Login",
  component: _Login.default
}), React.createElement(_reactRouterDom.Route, {
  path: "/MainMenu",
  component: _MainMenu.default
}), React.createElement(_reactRouterDom.Route, {
  path: "/Marketplace",
  component: _Marketplace.default
}), React.createElement(_reactRouterDom.Route, {
  path: "/Casus",
  component: _CasusContainer.default
}), React.createElement(_reactRouterDom.Route, {
  path: "/BattleArena",
  component: _BattleArena.default
})))); // Renders the page.

var rootComponent = document.getElementById('root');

if (rootComponent != null) {
  _reactDom.default.render(routing, rootComponent);
}