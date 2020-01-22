"use strict";

exports.__esModule = true;
exports.setSourceFile = setSourceFile;
exports.error = error;

var _options = require("./options");

var _path = _interopRequireDefault(require("path"));

var _codeFrame = require("@babel/code-frame");

var _highlight = require("@babel/highlight");

var _errorMessage = require("./errors/error-message");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sourceFile = {
  current: null
};

function setSourceFile(file) {
  sourceFile.current = file;
}

function error(node, message) {
  if ((0, _options.opts)().quiet) return;
  const options = {
    highlightCode: true,
    message: (0, _errorMessage.printErrorMessage)(message)
  };
  const chalk = (0, _highlight.getChalk)(options);

  if (sourceFile.current !== null) {
    const currentSourceFile = sourceFile.current;
    const code = currentSourceFile.text;
    const tsStartLocation = currentSourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile.current));
    const tsEndLocation = currentSourceFile.getLineAndCharacterOfPosition(node.getEnd());
    const babelLocation = {
      start: {
        line: tsStartLocation.line + 1,
        column: tsStartLocation.character + 1
      },
      end: {
        line: tsEndLocation.line + 1,
        column: tsEndLocation.character + 1
      }
    };
    const result = (0, _codeFrame.codeFrameColumns)(code, babelLocation, options);
    const position = `:${babelLocation.start.line}:${babelLocation.start.column}`;

    const fileName = _path.default.relative(process.cwd(), currentSourceFile.fileName);

    console.log(chalk.red.bold(`Error ${"-".repeat(process.stdout.columns - 7 - fileName.length - position.length)} ${fileName}${position}`));
    console.log("\n");
    console.log(result);
    console.log("\n");
  } else {
    console.log((0, _errorMessage.printErrorMessage)(message));
  }
}