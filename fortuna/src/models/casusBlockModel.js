//@flow strict
// Document Schema for the Casus Block Model

// Required Imports
import Mongoose from 'mongoose';

const CasusBlock = new Mongoose.Model('CasusBlock', new Mongoose.Schema({
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
