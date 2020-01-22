"use strict";

exports.__esModule = true;
exports.default = exports.Factory = void 0;

var _import = _interopRequireDefault(require("./import"));

var _export = _interopRequireDefault(require("./export"));

var _exportDeclaration = _interopRequireDefault(require("./export-declaration"));

var _module = _interopRequireDefault(require("./module"));

var _property = _interopRequireDefault(require("./property"));

var _namespace = _interopRequireDefault(require("./namespace"));

var _ast = require("../parse/ast");

var _checker = require("../checker");

var _node = require("../printers/node");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Factory {
  constructor() {
    _defineProperty(this, "_modules", void 0);

    _defineProperty(this, "_propDeclarations", void 0);

    _defineProperty(this, "_functionDeclarations", void 0);

    _defineProperty(this, "createNamespaceNode", (node, name, context) => {
      let contextName;

      if (context instanceof _module.default) {
        contextName = context.name + "$" + name;
      }

      if (context instanceof _namespace.default && _checker.checker.current) {
        const symbol = _checker.checker.current.getSymbolAtLocation(node.name);

        contextName = (0, _node.getFullyQualifiedName)(symbol, node, false);
      }

      if (typeof contextName !== "undefined") {
        if (this._functionDeclarations[contextName]) {
          for (const prop of this._functionDeclarations[contextName]) prop.skipNode();
        }

        if (this._propDeclarations[contextName]) {
          this._propDeclarations[contextName].skipNode();
        }

        return new _namespace.default(name, this._functionDeclarations[contextName], this._propDeclarations[contextName]);
      } else {
        return new _namespace.default(name);
      }
    });

    _defineProperty(this, "createImportNode", node => new _import.default(node));

    _defineProperty(this, "createExportNode", node => new _export.default(node));

    _defineProperty(this, "createExportDeclarationNode", node => new _exportDeclaration.default(node));

    //$todo
    this._modules = Object.create(null); //$todo

    this._propDeclarations = Object.create(null); //$todo

    this._functionDeclarations = Object.create(null);
  } // If multiple declarations are found for the same module name
  // return the memoized instance of the module instead


  createModuleNode(node, name) {
    if (Object.keys(this._modules).includes(name)) {
      return this._modules[name];
    }

    const module = new _module.default(node, name);
    this._modules[name] = module;
    return module;
  }

  createFunctionDeclaration(node, rawName, context) {
    let name = rawName;
    const propNode = new _property.default(node);

    if (context instanceof _module.default) {
      name = context.name + "$" + rawName;
    }

    if (context instanceof _namespace.default && _checker.checker.current) {
      const symbol = _checker.checker.current.getSymbolAtLocation(node.name);

      name = (0, _node.getFullyQualifiedName)(symbol, node, false);
    }

    if (!this._functionDeclarations[name]) {
      this._functionDeclarations[name] = [propNode];
    } else if (Object.keys(this._functionDeclarations).includes(name)) {
      this._functionDeclarations[name].push(propNode);
    }

    context.addChild(name + this._functionDeclarations[name].length, propNode);
  } // Some definition files (like lodash) declare the same
  // interface/type/function multiple times as a way of overloading.
  // Flow does not support that, and this is where we handle that


  createPropertyNode(node, name, context) {
    if (typeof name === "undefined") {
      return new _property.default(node);
    }

    if (context instanceof _module.default) {
      name = context.name + "$" + name;
    }

    if (context instanceof _namespace.default && _checker.checker.current) {
      const symbol = _checker.checker.current.getSymbolAtLocation(node.name);

      name = (0, _node.getFullyQualifiedName)(symbol, node, false);
    }

    if (Object.keys(this._propDeclarations).includes(name)) {
      this._propDeclarations[name].maybeAddMember((0, _ast.getMembersFromNode)(node));

      return this._propDeclarations[name];
    }

    const propNode = new _property.default(node);
    this._propDeclarations[name] = propNode;
    return propNode;
  }

}

exports.Factory = Factory;
var _default = {
  create: () => new Factory()
};
exports.default = _default;