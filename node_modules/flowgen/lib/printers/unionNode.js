"use strict";

exports.__esModule = true;
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A way to represent multiple nodes with the same name
 * in the same scope.
 *
 * TypeScript supports declaring the same function/type/interface multiple times,
 * which flow does not. This is a representation of that data.
 */
class UnionNode {
  constructor(nodes) {
    _defineProperty(this, "_nodes", void 0);

    this._nodes = [];
    this.add(nodes);
  }

  add(nodes) {
    if (Array.isArray(nodes)) {
      nodes.forEach(node => {
        this._nodes.push(node);
      });
    } else {
      this._nodes.push(nodes);
    }
  }

  get() {
    return this._nodes;
  }

}

exports.default = UnionNode;