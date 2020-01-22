"use strict";

exports.__esModule = true;
exports.print = void 0;
const types = {
  VoidKeyword: "void",
  StringKeyword: "string",
  AnyKeyword: "any",
  NumberKeyword: "number",
  BooleanKeyword: "boolean",
  NullKeyword: "null",
  UndefinedKeyword: "void",
  ObjectKeyword: "{[key: string]: any}",
  FalseKeyword: "false",
  TrueKeyword: "true",
  NeverKeyword: "empty",
  UnknownKeyword: "mixed"
};

const print = kind => {
  return types[kind];
};

exports.print = print;