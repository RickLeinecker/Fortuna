"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Document Schema for the Component Model
// Required Imports
var Component = new _mongoose.default.model('Component', new _mongoose.default.Schema({
  // _id field made upon creation
  // Name of component required on creation
  componentName: {
    type: String,
    required: true
  },
  // UserID of owner required on creation. String representation of ObjectID for user.
  userId: {
    type: String,
    required: true
  },
  // Enum classification for component required on creation.
  componentType: {
    type: String,
    enum: ['weapon', 'armor', 'treads', 'scanner', 'jammer', 'shield', 'item'],
    required: true
  }
}));
module.exports = Component;