//@flow strict
// Document Schema for the Battle Record
// Used for Battles and Replays

// Required Imports
import Mongoose from 'mongoose';

const BattleRecord = new Mongoose.model('BattleRecord', new Mongoose.Schema({
    // _id field made upon creation
    
    // ID of users
    userOne: {
        type: String,
        required: true,
        ref: 'user'
    },
    userTwo: {
        type: String,
        required: true,
        ref: 'user'
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
    // User one's tank
    tankOne: {
        tankName: {
            type: String,
            required: true
        },
        ownerID: {
            type: String,
            required: true
        },
        components: [{
            type: String,
            required: true
        }],
        casusCode: {
            type: Object,
            required: true
        }
    },
    // User two's tank
    tankTwo: {
        tankName: {
            type: String,
            required: true
        },
        ownerID: {
            type: String,
            required: true
        },
        components: [{
            type: String,
            required: true
        }],
        casusCode: {
            type: Object,
            required: true
        }
    }
}));

module.exports = BattleRecord;
