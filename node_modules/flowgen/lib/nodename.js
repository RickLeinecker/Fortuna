"use strict";

exports.__esModule = true;
exports.default = getNodeName;

var _typescript = require("typescript");

function getNodeName(node) {
  return _typescript.SyntaxKind[node.kind] || node.constructor + "";
}