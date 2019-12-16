//@flow strict
// Document Schema for the User Model

// Required Imports
import mongoose from 'mongoose';

// model('NameOfAreaInDB', Mongoose Schema)
const User = new mongoose.model('User', new mongoose.Schema ({
    // NOTE: _id fields are made upon User creation

    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // Might be overkill pattern to match. I'll remove it if needed
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    currentCurrency: {
        type: Number,
        default: 0
    },
    // String is the ObjectId of tank that is marked as favorite
    favoriteTank: {
        type: String
    },
    stats: {
        wins: {
            type: Number
        },
        losses: {
            type: Number
        },
        ties: {
            type: Number
        },
        elo: {
            type: Number
        }
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    // This should be updated in the API call when a user gets updated.
    dateUpdated: {
        type: Date
    }
}));

module.exports = User;
