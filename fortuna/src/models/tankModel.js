//@flow strict
// Document Schema for the Tank Model

// Required Imports
import Mongoose from 'mongoose';

// model('NameOfAreaInDB', Mongoose Schema)
const Tank = new Mongoose.model('Tank', new Mongoose.Schema ({
    // _id field made upon creation
    
    // Name of tank required upon creation. Uniqueness checked using an API.
    tankName: {
        type: String,
        required: true
    },
    // UserID of tank owner required on creation. String representation of ObjectID for user.
    userId: {
        type: String,
        required: true
    },
    // Array of string identifiers of tank components. Default empty on creation.
    components: {
        type: [String],
        default: []
    },
    // Casus code in the form of a JSON object. Default null on creation.
    casusCode: {
        type: Object,
        default: null
    },
    // Boolean field for if a tank is a bot. Default false on creation.
    isBot: {
        type: Boolean,
        default: false
    }
}));

module.exports = Tank;
