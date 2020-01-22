"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Document Schema for the Casus Block Model
// Required Imports
var CasusBlock = new _mongoose.default.model('CasusBlock', new _mongoose.default.Schema({
  // _id field made on creation
  // Block name required on creation.
  blockName: {
    type: String,
    required: true
  },
  // UserID of owner required on creation. String representation of owner's ObjectID.
  userId: {
    type: String,
    required: true
  }
}));
module.exports = CasusBlock;