"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IF_ELSE_BLOCK_ELSE_WIDTH = exports.WHILE_BLOCK_WHILE_WIDTH = exports.IF_BLOCK_IF_WIDTH = exports.FOR_BLOCK_SEMICOLON_WIDTH = exports.FOR_BLOCK_FOR_WIDTH = exports.SET_VARIABLE_TO_WIDTH = exports.SET_VARIABLE_SET_WIDTH = exports.EMPTY_STATEMENT_HEIGHT = exports.EMPTY_STATEMENT_WIDTH = exports.BOARDER_STROKE_WIDTH = exports.HIGHLIGHT_STROKE_WIDTH = exports.VPADDING = exports.RAMP_WIDTH = exports.CENTER_WIDTH = void 0;

var _Vec = _interopRequireDefault(require("./Vec.js"));

var _BoundingBox = _interopRequireDefault(require("./BoundingBox.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CENTER_WIDTH = 10;
exports.CENTER_WIDTH = CENTER_WIDTH;
var RAMP_WIDTH = 12;
exports.RAMP_WIDTH = RAMP_WIDTH;
var VPADDING = 3;
exports.VPADDING = VPADDING;
var HIGHLIGHT_STROKE_WIDTH = 5;
exports.HIGHLIGHT_STROKE_WIDTH = HIGHLIGHT_STROKE_WIDTH;
var BOARDER_STROKE_WIDTH = 1;
exports.BOARDER_STROKE_WIDTH = BOARDER_STROKE_WIDTH;
var EMPTY_STATEMENT_HEIGHT = 23;
exports.EMPTY_STATEMENT_HEIGHT = EMPTY_STATEMENT_HEIGHT;
var EMPTY_STATEMENT_WIDTH = 40;
exports.EMPTY_STATEMENT_WIDTH = EMPTY_STATEMENT_WIDTH;
var SET_VARIABLE_SET_WIDTH = 35;
exports.SET_VARIABLE_SET_WIDTH = SET_VARIABLE_SET_WIDTH;
var SET_VARIABLE_TO_WIDTH = 25;
exports.SET_VARIABLE_TO_WIDTH = SET_VARIABLE_TO_WIDTH;
var FOR_BLOCK_FOR_WIDTH = 35;
exports.FOR_BLOCK_FOR_WIDTH = FOR_BLOCK_FOR_WIDTH;
var FOR_BLOCK_SEMICOLON_WIDTH = 10;
exports.FOR_BLOCK_SEMICOLON_WIDTH = FOR_BLOCK_SEMICOLON_WIDTH;
var IF_BLOCK_IF_WIDTH = 25;
exports.IF_BLOCK_IF_WIDTH = IF_BLOCK_IF_WIDTH;
var WHILE_BLOCK_WHILE_WIDTH = 50;
exports.WHILE_BLOCK_WHILE_WIDTH = WHILE_BLOCK_WHILE_WIDTH;
var IF_ELSE_BLOCK_ELSE_WIDTH = 40;
exports.IF_ELSE_BLOCK_ELSE_WIDTH = IF_ELSE_BLOCK_ELSE_WIDTH;
var N_POINTS_TO_APROX_CIRCLE = 8;

function _generateBoolPerim(boundingBox) {
  var perim = [];
  perim.push(new _Vec.default(boundingBox.x, boundingBox.y + boundingBox.h / 2));
  perim.push(new _Vec.default(boundingBox.x + RAMP_WIDTH, boundingBox.y));
  perim.push(new _Vec.default(boundingBox.x + boundingBox.w - RAMP_WIDTH, boundingBox.y));
  perim.push(new _Vec.default(boundingBox.x + boundingBox.w, boundingBox.y + boundingBox.h / 2));
  perim.push(new _Vec.default(boundingBox.x + boundingBox.w - RAMP_WIDTH, boundingBox.y + boundingBox.h));
  perim.push(new _Vec.default(boundingBox.x + RAMP_WIDTH, boundingBox.y + boundingBox.h));
  return perim;
}

function _generateIntPerim(boundingBox) {
  var perim = [];

  for (var i = -N_POINTS_TO_APROX_CIRCLE; i <= N_POINTS_TO_APROX_CIRCLE; i++) {
    var centerX = boundingBox.x + boundingBox.w - RAMP_WIDTH;
    var centerY = boundingBox.y + boundingBox.h / 2;
    var angle = Math.PI / 2 * i / N_POINTS_TO_APROX_CIRCLE;
    var xOffset = RAMP_WIDTH * Math.cos(angle);
    var yOffset = boundingBox.h / 2 * Math.sin(angle);
    perim.push(new _Vec.default(centerX + xOffset, centerY + yOffset));
  }

  for (var _i = -N_POINTS_TO_APROX_CIRCLE; _i <= N_POINTS_TO_APROX_CIRCLE; _i++) {
    var _centerX = boundingBox.x + RAMP_WIDTH;

    var _centerY = boundingBox.y + boundingBox.h / 2;

    var _angle = Math.PI / 2 * _i / N_POINTS_TO_APROX_CIRCLE + Math.PI;

    var _xOffset = RAMP_WIDTH * Math.cos(_angle);

    var _yOffset = boundingBox.h / 2 * Math.sin(_angle);

    perim.push(new _Vec.default(_centerX + _xOffset, _centerY + _yOffset));
  }

  return perim;
}

function _generateDoublePerim(boundingBox) {
  var perim = [];
  perim.push(new _Vec.default(boundingBox.x + boundingBox.w, boundingBox.y));

  for (var i = 0; i <= N_POINTS_TO_APROX_CIRCLE; i++) {
    var centerX = boundingBox.x + boundingBox.w - RAMP_WIDTH;
    var centerY = boundingBox.y + boundingBox.h / 2;
    var angle = Math.PI / 2 * i / N_POINTS_TO_APROX_CIRCLE;
    var xOffset = RAMP_WIDTH * Math.cos(angle);
    var yOffset = boundingBox.h / 2 * Math.sin(angle);
    perim.push(new _Vec.default(centerX + xOffset, centerY + yOffset));
  }

  perim.push(new _Vec.default(boundingBox.x, boundingBox.y + boundingBox.h));

  for (var _i2 = 0; _i2 <= N_POINTS_TO_APROX_CIRCLE; _i2++) {
    var _centerX2 = boundingBox.x + RAMP_WIDTH;

    var _centerY2 = boundingBox.y + boundingBox.h / 2;

    var _angle2 = Math.PI / 2 * _i2 / N_POINTS_TO_APROX_CIRCLE + Math.PI;

    var _xOffset2 = RAMP_WIDTH * Math.cos(_angle2);

    var _yOffset2 = boundingBox.h / 2 * Math.sin(_angle2);

    perim.push(new _Vec.default(_centerX2 + _xOffset2, _centerY2 + _yOffset2));
  }

  return perim;
}

function _generateVoidPerim(boundingBox) {
  var perim = [];
  perim.push(new _Vec.default(boundingBox.x, boundingBox.y));
  perim.push(new _Vec.default(boundingBox.x + boundingBox.w, boundingBox.y));
  perim.push(new _Vec.default(boundingBox.x + boundingBox.w, boundingBox.y + boundingBox.h));
  perim.push(new _Vec.default(boundingBox.x, boundingBox.y + boundingBox.h));
  return perim;
}

function generateCornerPerim(boundingBox, dataType) {
  if (dataType === 'BOOLEAN') return _generateBoolPerim(boundingBox);
  if (dataType === 'INT') return _generateIntPerim(boundingBox);
  if (dataType === 'DOUBLE') return _generateDoublePerim(boundingBox);
  if (dataType === 'VOID') return _generateVoidPerim(boundingBox);
  return [];
}

var _default = generateCornerPerim;
exports.default = _default;