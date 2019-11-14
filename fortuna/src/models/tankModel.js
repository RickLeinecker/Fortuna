//@flow strict
// Document Schema for the Tank Model

// Required Imports
const mongoose = require('mongoose');

// model('NameOfAreaInDB', Mongoose Schema)
const Tank = new mongoose.model('Tank', new mongoose.Schema ({
    // Name of tank
    tankName: {
        type: String,
        required: true
    },
    // List of ids/string identifiers of tank components
    // May need to expand this field down the line
    tankComponents: {
        type: [String],
        default: []
    },
    // Id string of the user who owns it
    tankOwner: {
        type: String,
        required: true
    },
    // Placeholder for tank AI, will replace with whatever structure
    // needed down the line.
    tankAi: {
        type: String,
        default: null
    }
}));

module.exports = Tank;
