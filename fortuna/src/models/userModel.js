//@flow strict
// Document Schema for the User Model

// Required Imports
const mongoose = require('mongoose');

// model('NameOfAreaInDB', Mongoose Schema)
const User = new mongoose.model('User', new mongoose.Schema ({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // Might be overkill. I'll remove it if needed
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String
    },
    currentCurrency: {
        type: Number,
        default: 0
    },
    ownedTanks: {
        type: [String],
        default: []
    }
}));

module.exports = User;