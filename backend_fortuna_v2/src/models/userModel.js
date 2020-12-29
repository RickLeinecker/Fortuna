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
        required: true
    },
    // Password required upon creation.
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    // User starts with 1000 money by default. This can be changed as needed
    money: {
        type: Number,
        default: 1000
    },
    wager: {
        type: Number,
        default: 0
    },
    wager3v3: {
        type: Number,
        default: 0
    },
    // Date the last time user made a wager that gave them a stipend. Null default
    wagerDate: {
        type: Date,
        default: null
    },
    // Keeping the old 1v1 tank listings here so the current implementations won't break.
    // ObjectId of tank that is marked as favorite. Null default
    favoriteTank: {
        type: Mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Tank'
    },
     // Array of ObjectId of tanks that are marked as favorite.
    favoriteTanks: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Tank'
    }],
    // User's inventory. Separate sections for tank components and Casus blocks
    inventory: {
        // Tracks number of tank components a user has.
        tankComponents: {
            // Chassis components
            moddableLight: {
                type: Number,
                default: 0
            },
            light: {
                type: Number,
                default: 0
            },
            moddable: {
                type: Number,
                default: 0
            },
            heavy: {
                type: Number,
                default: 0
            },
            moddableHeavy: {
                type: Number,
                default: 0
            },           
            // Weapons
            machineGun: {
                type: Number,
                default: 0
            },        
            grenadeLauncher: {
                type: Number,
                default: 0
            },              
            missile: {
                type: Number,
                default: 0
            },     
            shotgun: {
                type: Number,
                default: 0
            },     
            vulcanCannon: {
                type: Number,
                default: 0
            },          
            laser: {
                type: Number,
                default: 0
            },   
            plasma: {
                type: Number,
                default: 0
            },    
            pulseLaser: {
                type: Number,
                default: 0
            },        
            lancer: {
                type: Number,
                default: 0
            },    
            deathRay: {
                type: Number,
                default: 0
            },  
            // Scanners
            shortRangeScanner: {
                type: Number,
                default: 0
            },               
            mediumRangeScanner: {
                type: Number,
                default: 0
            },                
            longRangeScanner: {
                type: Number,
                default: 0
            },              
            itemScanner: {
                type: Number,
                default: 0
            },         
            antiJammerScanner: {
                type: Number,
                default: 0
            },
            // Jammers
            shortRangeJammer: {
                type: Number,
                default: 0
            },
            mediumRangeJammer: {
                type: Number,
                default: 0
            },
            longRangeJammer: {
                type: Number,
                default: 0
            },
            // Treads
            advancedTreads: {
                type: Number,
                default: 0
            },
            fastTreads: {
                type: Number,
                default: 0
            },
            armoredTreads: {
                type: Number,
                default: 0
            },
            heavilyArmoredTreads: {
                type: Number,
                default: 0
            },
            // Single-use Items
            mine: {
                type: Number,
                default: 0
            },
            c4: {
                type: Number,
                default: 0
            },
            nitroRepair: {
                type: Number,
                default: 0
            },
            overdrive: {
                type: Number,
                default: 0
            },
            missileTrackingBeacon: {
                type: Number,
                default: 0
            }
        },
        // Casus inventory, tracks number of types of Casus blocks owned by a user.
        // Likely not going to be used in v1.0 but remains here for implementation
        // if it is desired to track an inventory of Casus blocks.
        casusBlocks: {
            and: {
                type: Number,
                default: 0
            },
            doubleAbs: {
                type: Number,
                default: 0
            },
            doubleAdd: {
                type: Number,
                default: 0
            },
            doubleDivide: {
                type: Number,
                default: 0
            },
            doubleEquals: {
                type: Number,
                default: 0
            },
            doubleGreaterThan: {
                type: Number,
                default: 0
            },
            doubleGreaterThanOrEqual: {
                type: Number,
                default: 0
            },
            doubleLessThan: {
                type: Number,
                default: 0
            },
            doubleLessThanOrEqual: {
                type: Number,
                default: 0
            },
            doubleMax: {
                type: Number,
                default: 0
            },
            doubleMin: {
                type: Number,
                default: 0
            },
            doubleMultiply: {
                type: Number,
                default: 0
            },
            doubleRound: {
                type: Number,
                default: 0
            },
            doubleSubtract: {
                type: Number,
                default: 0
            },
            doubleTruncate: {
                type: Number,
                default: 0
            },
            for: {
                type: Number,
                default: 0
            },
            getListAt: {
                type: Number,
                default: 0
            },
            getVariable: {
                type: Number,
                default: 0
            },
            if: {
                type: Number,
                default: 0
            },
            ifElse: {
                type: Number,
                default: 0
            },
            intAbs: {
                type: Number,
                default: 0
            },
            intAdd: {
                type: Number,
                default: 0
            },
            intDivide: {
                type: Number,
                default: 0
            },
            intEquals: {
                type: Number,
                default: 0
            },
            intGreaterThan: {
                type: Number,
                default: 0
            },
            intGreaterThanOrEqual: {
                type: Number,
                default: 0
            },
            intLessThan: {
                type: Number,
                default: 0
            },
            intLessThanOrEqual: {
                type: Number,
                default: 0
            },
            intMax: {
                type: Number,
                default: 0
            },
            intMin: {
                type: Number,
                default: 0
            },
            intModulo: {
                type: Number,
                default: 0
            },
            intMultiply: {
                type: Number,
                default: 0
            },
            intSubtract: {
                type: Number,
                default: 0
            },
            intToDouble: {
                type: Number,
                default: 0
            },
            listAppend: {
                type: Number,
                default: 0
            },
            listSize: {
                type: Number,
                default: 0
            },
            mathAcos: {
                type: Number,
                default: 0
            },
            mathAsin: {
                type: Number,
                default: 0
            },
            mathAtan: {
                type: Number,
                default: 0
            },
            mathCos: {
                type: Number,
                default: 0
            },
            mathPow: {
                type: Number,
                default: 0
            },
            mathSin: {
                type: Number,
                default: 0
            },
            mathSqrt: {
                type: Number,
                default: 0
            },
            mathTan: {
                type: Number,
                default: 0
            },
            or: {
                type: Number,
                default: 0
            },
            print: {
                type: Number,
                default: 0
            },
            setListAt: {
                type: Number,
                default: 0
            },
            setVariable: {
                type: Number,
                default: 0
            },
            unaryOperation: {
                type: Number,
                default: 0
            },
            while: {
                type: Number,
                default: 0
            },
            xOr: {
                type: Number,
                default: 0
            }                                                     
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
        elo: { // elo starts at 1400
            type: Number,
            default: 1400
        },
        // Fields for first daily win streak goes up to 3 days 
        firstWinOfDayStreak: {
            type: Number,
            default: 0
        },
        lastFirstWinOfDay: {
            type: Date,
            default: null
        }
    },
    // Records date/time when user was created.
    dateCreated: {
        type: Date,
        default: Date.now
    },
    // Records last date when user logged in
    lastLogin: {
        type: Date,
        default: null
    },
    // Records user expiration date, unverified accounts get removed after
    // 24 hours, this is cleared by verifying account.
    expirationDate: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
}));

module.exports = User;
