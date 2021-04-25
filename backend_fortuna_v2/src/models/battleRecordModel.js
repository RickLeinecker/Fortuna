//@flow strict
// Document Schema for the Battle Record
// Used for Battles and Replays

// Required Imports
import Mongoose from 'mongoose';

const BattleRecord = new Mongoose.model('BattleRecord', new Mongoose.Schema({
    // _id field made upon creation
    
    // ID of users
    userOne: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    userTwo: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    map: {
        type: String,
        required: true,
        enum: [ 'DIRT', 'HEX', 'LUNAR', 'CANDEN' ]
    },
    // -1 = Battle not evaluated, 0 = Tie, 1 = User one victory, 2 = User two victory
    winner: {
        type: Number,
        required: true,
        enum: [-1, 0, 1, 2]
    },
    // Total of money wagered
    prizeMoney: {
        type: Number,
        required: true
    },
    // Amount of Elo exchanged between players
    eloExchanged: {
        type: Number,
        required: true
    },
    // Distinguish difference between bot and regular match
    botMatch: {
        type: Boolean,
        default: false
    },
    // Keeping the old 1v1 tank listings here so the current implementations won't break.
    // User one's tank state for this battle
    tankOne: {
        tankName: {
            type: String
        },
        components: [{
            type: String
        }],
        casusCode: {
            type: Object
        }
    },
    // User two's tank state for this battle
    tankTwo: {
        tankName: {
            type: String
        },
        components: [{
            type: String
        }],
        casusCode: {
            type: Object
        }
    },
    // User one's tank team's state for this battle
    tankTeamOne: [{
        tankName: {
            type: String
        },
        components: [{
            type: String
        }],
        casusCode: {
            type: Object
        }
    }],
    // User two's tank team's state for this battle
    tankTeamTwo: [{
        tankName: {
            type: String
        },
        components: [{
            type: String
        }],
        casusCode: {
            type: Object
        }
    }],
}));

module.exports = BattleRecord;
