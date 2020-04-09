//@flow strict
// Document Schema for the Verification Token Model
// for email verification

// Required Imports
import Mongoose from 'mongoose';

const Token = new Mongoose.model('Token', new Mongoose.Schema({
    // _id field made upon creation
    
    // Reference to User
    _userId: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // The actual verification token
    token: {
        type: String,
        required: true
    },
    // Date property to track the life of the token and to set expiration in 12 hrs.
    issueDate: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 43200
    }
}));

module.exports = Token;
