//@flow strict
// Document Schema for the Marketplace Sale Model

// Required Imports
import Mongoose from 'mongoose';

const MarketSale = new Mongoose.model('MarketplaceSale', new Mongoose.Schema({
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
