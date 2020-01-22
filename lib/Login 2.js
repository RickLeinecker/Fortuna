"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

require("bootstrap/dist/css/bootstrap.min.css");

var _LoginPopup = _interopRequireDefault(require("./LoginPopup.js"));

require("./Login.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//const PORT = 3000;
//This is the Login Page Display
var Login =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Login);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Login)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      response: '',
      userName: '',
      password: '',
      responseToPost: ''
    });

    _defineProperty(_assertThisInitialized(_this), "callApi",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var response, body;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch('/routes/api/signup');

            case 2:
              response = _context.sent;
              _context.next = 5;
              return response.json();

            case 5:
              body = _context.sent;

              if (!(response.status !== 200)) {
                _context.next = 8;
                break;
              }

              throw Error(body.message);

            case 8:
              return _context.abrupt("return", body);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "handleLoginClick",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(e) {
        var response, body;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                e.preventDefault();
                _context2.next = 3;
                return fetch('/routes/api/signup', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    userName: _this.state.userName,
                    password: _this.state.password
                  })
                });

              case 3:
                response = _context2.sent;
                _context2.next = 6;
                return response.text();

              case 6:
                body = _context2.sent;
                console.log(body);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    return _this;
  }

  _createClass(Login, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.callApi().then(function (res) {
        return _this2.setState({
          response: res.express
        });
      }).catch(function (err) {
        return console.log(err);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement("div", {
        id: "Parent"
      }, React.createElement("div", {
        className: "row"
      }, React.createElement("h4", {
        className: "col-md-4"
      }, "LeaderBoard"), React.createElement("h1", {
        className: "col-md-4 text-center"
      }, "Fortuna"), React.createElement("h4", {
        className: "col-md-4 text-right"
      }, "What is Fortuna?")), React.createElement("div", {
        className: "row styleForRow"
      }, React.createElement("div", {
        className: "container h-100"
      }, React.createElement("div", {
        className: "row h-100 justify-content-center align-items-center"
      }, React.createElement("div", {
        className: "card"
      }, React.createElement("h4", {
        className: "card-header"
      }, "Login"), React.createElement("div", {
        className: "card-body"
      }, React.createElement("form", {
        "data-toggle": "validator",
        role: "form",
        method: "post",
        action: "#"
      }, React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "col-md-12"
      }, React.createElement("div", {
        className: "form-group"
      }, React.createElement("label", null, "UserName"), React.createElement("div", {
        className: "input-group"
      }, React.createElement("input", {
        type: "text",
        className: "form-control",
        name: "loginUserName",
        value: this.state.userName,
        onChange: function onChange(e) {
          return _this3.setState({
            userName: e.target.value
          });
        }
      }))))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "col-md-12"
      }, React.createElement("div", {
        className: "form-group"
      }, React.createElement("label", null, "Password"), React.createElement("div", {
        className: "input-group"
      }, React.createElement("input", {
        type: "password",
        name: "loginPassword",
        className: "form-control"
      })), React.createElement("div", {
        className: "help-block with-errors text-danger"
      })))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "col-md-12"
      }, React.createElement(_reactRouterDom.Link, {
        to: "/MainMenu"
      }, React.createElement("button", {
        type: "button",
        className: "btn btn-primary btn-lg btn-block",
        onClick: this.handleLoginClick
      }, "Login"))))), React.createElement("div", {
        className: "row styleForRow"
      }, React.createElement("div", {
        className: "col text-center"
      }, React.createElement("button", {
        type: "button",
        className: "btn btn-secondary btn-sm"
      }, "Signup")))))))));
    }
  }]);

  return Login;
}(React.Component);

var _default = Login;
exports.default = _default;