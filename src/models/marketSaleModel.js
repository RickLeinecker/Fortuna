//@flow strict
// Document Schema for the Marketplace Sale Model

// Required Imports
import Mongoose from 'mongoose';

const MarketSale = new Mongoose.model('MarketplaceSale', new Mongoose.Schema({
    // _id field made on creation

    // SellerID required on creation. String representation of seller's ObjectID.
    sellerId: {
        type: String,
        required: true,
        ref: 'User'
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
    // ItemID is required on creation. String representation of ObjectID for a tank
    // or a String description of the type of component or casus block.
    itemId: {
        type: String,
        required: true
    },
    // Enum item category required on creation.
    itemType: {
        type: String,
        enum: ['component', 'tank', 'casus'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}));

module.exports = MarketSale;
