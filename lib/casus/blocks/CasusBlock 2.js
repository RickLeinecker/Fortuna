"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BoundingBox = _interopRequireDefault(require("./BoundingBox.js"));

var _Vec = _interopRequireDefault(require("./Vec.js"));

var _generateCornerPerim = require("./generateCornerPerim.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//Casus Block is the parent class that defines
//methods that will be called on blocks by the casus editor
//
//The following methods must be implemented:
//	precompBounds() - calls precompBounds on all child blocks of this,
//		then calculates this block's bounds
//
//	precompXY(x, y) - sets the x and y coordintates of this block now that
//		its bounds are known, and sets the absolute coordinates of all child blocks
//
//	getChildBlocks() - returns all child blocks of this block
//
//	removeBlockAt(v, removeAfter) - removes and returns the deepest block that contains
//		the defined position. If there is no block at the position, returns an empty array.
//
//	drawSelf(CanvasRenderingContext2D) - renders this block. All children of this
//		block will then be rendered on top of this
//
//	getReturnType() - gets the return type of the block
//
//	(maybe):
//	getPerim() - returns an array of the perimeter of this block
//
//	(maybe):
//	tryToPlace(v, blockToPlace, ctx) - consider placing blockToPlace at
//		when it is realeased at v. Ignore call if v outside of boundingBox.
//		Return null if no change was made, or the block that replaces an empty
//		block if a change is made.
//		- If ctx is null, actually place it;
//		-	If ctx is nonnull, just draw highlights of it. 
//		- For everything other than EmptyBlock and ContainerBlock, this just needs to call
//		a dfs and maintain the set variables for all forms of children.
//
var CasusBlock =
/*#__PURE__*/
function () {
  function CasusBlock() {
    _classCallCheck(this, CasusBlock);

    _defineProperty(this, "boundingBox", void 0);

    _defineProperty(this, "highlighted", void 0);

    this.boundingBox = new _BoundingBox.default(0, 0, 0, 0);
    this.highlighted = false;
  }

  _createClass(CasusBlock, [{
    key: "renderDFS",
    value: function renderDFS(ctx) {
      this.drawSelf(ctx);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.getChildBlocks()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;
          child.renderDFS(ctx);
        } //draw outline

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var perim = this.getPerim();

      if (perim.length !== 0 && !this.highlighted) {
        ctx.beginPath();
        ctx.strokeStyle = '#444444';
        ctx.lineWidth = _generateCornerPerim.BOARDER_STROKE_WIDTH;
        ctx.moveTo(perim[0].x, perim[0].y);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = perim[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var p = _step2.value;
            ctx.lineTo(p.x, p.y);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        ctx.closePath();
        ctx.stroke();
      }
    }
  }, {
    key: "highlightDFS",
    value: function highlightDFS(ctx) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.getChildBlocks()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var child = _step3.value;
          child.highlightDFS(ctx);
        } //draw highlights

      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var perim = this.getPerim();

      if (perim.length !== 0 && this.highlighted) {
        ctx.beginPath();
        ctx.strokeStyle = '#eeeeee';
        ctx.lineWidth = _generateCornerPerim.HIGHLIGHT_STROKE_WIDTH;
        ctx.moveTo(perim[0].x, perim[0].y);
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = perim[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var p = _step4.value;
            ctx.lineTo(p.x, p.y);
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        ctx.closePath();
        ctx.stroke();
      }
    }
  }, {
    key: "unhighlightEverything",
    value: function unhighlightEverything() {
      this.highlighted = false;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.getChildBlocks()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var child = _step5.value;
          child.unhighlightEverything();
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  }, {
    key: "getDeepestChildContainingPoint",
    value: function getDeepestChildContainingPoint(v) {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.getChildBlocks()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var child = _step6.value;

          if (child.boundingBox.contains(v)) {
            return child.getDeepestChildContainingPoint(v);
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return this.boundingBox.contains(v) ? this : null;
    } //returns true if we were able to place it in some container, false otherwise

  }, {
    key: "tryToPlaceInContainer",
    value: function tryToPlaceInContainer(v, blockToPlace, ctx) {
      if (!this.boundingBox.contains(v)) {
        return false;
      }

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.getChildBlocks()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var child = _step7.value;

          if (child.tryToPlaceInContainer(v, blockToPlace, ctx)) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      return false;
    }
  }, {
    key: "draggable",
    value: function draggable() {
      return true;
    } // ----------------------- Methods to overload --------------------------

  }, {
    key: "precompBounds",
    value: function precompBounds() {
      this.boundingBox = new _BoundingBox.default(0, 0, 0, 0);
    }
  }, {
    key: "precompXY",
    value: function precompXY(x, y) {
      this.boundingBox = new _BoundingBox.default(x, y, this.boundingBox.w, this.boundingBox.h);
    }
  }, {
    key: "getChildBlocks",
    value: function getChildBlocks() {
      return [];
    }
  }, {
    key: "removeBlockAt",
    value: function removeBlockAt(v, removeAfter) {
      return [];
    }
  }, {
    key: "drawSelf",
    value: function drawSelf(ctx) {}
  }, {
    key: "getPerim",
    value: function getPerim() {
      return [new _Vec.default(this.boundingBox.x, this.boundingBox.y), new _Vec.default(this.boundingBox.x + this.boundingBox.w, this.boundingBox.y), new _Vec.default(this.boundingBox.x + this.boundingBox.w, this.boundingBox.y + this.boundingBox.h), new _Vec.default(this.boundingBox.x, this.boundingBox.y + this.boundingBox.h)];
    }
  }, {
    key: "getReturnType",
    value: function getReturnType() {
      return 'VOID';
    }
  }, {
    key: "tryToPlace",
    value: function tryToPlace(v, blockToPlace, ctx) {
      return null;
    }
  }]);

  return CasusBlock;
}();

var _default = CasusBlock;
exports.default = _default;