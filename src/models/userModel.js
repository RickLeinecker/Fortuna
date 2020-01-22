//@flow strict
// Document Schema for the User Model

// Required Imports
import Mongoose from 'mongoose';

// model('NameOfAreaInDB', Mongoose Schema)
const User = new Mongoose.model('User', new Mongoose.Schema ({
    // NOTE: _id fields are made upon User creation

    // Username required upon creation. Checks for uniqueness done via API call
    userName: {
        type: String,
        required: true
    },
    // Email required upon creation. Checks for uniqueness done via API call
    email: {
        type: String,
        // Might be overkill pattern to match. I'll remove it if needed
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true
    },
    // Password required upon creation.
    password: {
        type: String,
        required: true
    },
    // User starts with 0 money by default. This can be changed as needed
    currentCurrency: {
        type: Number,
        default: 0
    },
    // String is the ObjectId of tank that is marked as favorite
    favoriteTankId: {
        type: String
    },
    // Casus inventory
    casusInventory: {
        andBlocks: {
            type: Number,
            default: 0
        },
        forBlocks: {
            type: Number,
            default: 0
        },
        ifBlocks: {
            type: Number,
            default: 0
        },
        ifElseBlocks: {
            type: Number,
            default: 0
        },
        intEqualsBlocks: {
            type: Number,
            default: 0
        },
        intGreaterThanBlocks: {
            type: Number,
            default: 0
        },
        intLessThanBlocks: {
            type: Number,
            default: 0
        },
        orBlocks: {
            type: Number,
            default: 0
        },
        setVariableBlocks: {
            type: Number,
            default: 0
        },
        variableBlocks: {
            type: Number,
            default: 0
        },
        whileBlocks: {
            type: Number,
            default: 0
        }                                                        
    },
    // Created users start with clean slate of stats. Defaults can be changed as needed
    stats: {
        wins: {
            type: Number,
            default: 0
        },
        losses: {
            type: Number,
            default: 0
        },
        ties: {
            type: Number,
            default: 0
        },
        elo: {
            type: Number,
            default: 0
        }
    },
    // Records date/time when user was created.
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
