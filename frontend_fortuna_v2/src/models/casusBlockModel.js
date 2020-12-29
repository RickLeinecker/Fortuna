//@flow strict
// Document Schema for the Casus Block Model

// Required Imports
import Mongoose from 'mongoose';

const CasusBlock = new Mongoose.model('CasusBlock', new Mongoose.Schema({
    // _id field made on creation

    // Block name required on creation.
    blockName: {
        type: String,
        required: true
    },
    // User ObjectId of owner required on creation.
    userId: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}));

module.exports = CasusBlock;
