"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Document Schema for the Marketplace Sale Model
// Required Imports
var MarketSale = new _mongoose.default.model('MarketplaceSale', new _mongoose.default.Schema({
  // _id field made on creation
  // SellerID required on creation. String representation of seller's ObjectID.
  sellerID: {
    type: String,
    required: true
  },
  // Date sale was created. Defaulted to date of creation.
  dateCreated: {
    type: Date,
    default: Date.now
  },
  // Sale price required on creation.
  salePrice: {
    type: Number,
    required: true
  },
  // ItemID is required on creation. String representation of ObjectID of item being sold.
  itemID: {
    type: String,
    required: true
  },
  // Enum item category required on creation.
  itemType: {
    type: String,
    enum: ['component', 'tank', 'casusblock'],
    required: true
  }
}));
module.exports = MarketSale;