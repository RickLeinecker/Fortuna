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
    isVerified: {
        type: Boolean,
        default: false
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
            andBlocks: {
                type: Number,
                default: 0
            },
            doubleAbsBlocks: {
                type: Number,
                default: 0
            },
            doubleAddBlocks: {
                type: Number,
                default: 0
            },
            doubleDivideBlocks: {
                type: Number,
                default: 0
            },
            doubleEqualsBlocks: {
                type: Number,
                default: 0
            },
            doubleGreaterThanBlocks: {
                type: Number,
                default: 0
            },
            doubleGreaterThanOrEqualBlocks: {
                type: Number,
                default: 0
            },
            doubleLessThanBlocks: {
                type: Number,
                default: 0
            },
            doubleLessThanOrEqualBlocks: {
                type: Number,
                default: 0
            },
            doubleMaxBlocks: {
                type: Number,
                default: 0
            },
            doubleMinBlocks: {
                type: Number,
                default: 0
            },
            doubleMultiplyBlocks: {
                type: Number,
                default: 0
            },
            doubleRoundBlocks: {
                type: Number,
                default: 0
            },
            doubleSubtractBlocks: {
                type: Number,
                default: 0
            },
            doubleTruncateBlocks: {
                type: Number,
                default: 0
            },
            forBlocks: {
                type: Number,
                default: 0
            },
            getListAtBlocks: {
                type: Number,
                default: 0
            },
            getVariableBlocks: {
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
            intAbsBlocks: {
                type: Number,
                default: 0
            },
            intAddBlocks: {
                type: Number,
                default: 0
            },
            intDivideBlocks: {
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
            intGreaterThanOrEqualBlocks: {
                type: Number,
                default: 0
            },
            intLessThanBlocks: {
                type: Number,
                default: 0
            },
            intLessThanOrEqualBlocks: {
                type: Number,
                default: 0
            },
            intMaxBlocks: {
                type: Number,
                default: 0
            },
            intMinBlocks: {
                type: Number,
                default: 0
            },
            intModuloBlocks: {
                type: Number,
                default: 0
            },
            intMultiplyBlocks: {
                type: Number,
                default: 0
            },
            intSubtractBlocks: {
                type: Number,
                default: 0
            },
            intToDoubleBlocks: {
                type: Number,
                default: 0
            },
            listAppendBlocks: {
                type: Number,
                default: 0
            },
            listSizeBlocks: {
                type: Number,
                default: 0
            },
            mathAcosBlocks: {
                type: Number,
                default: 0
            },
            mathAsinBlocks: {
                type: Number,
                default: 0
            },
            mathAtanBlocks: {
                type: Number,
                default: 0
            },
            mathCosBlocks: {
                type: Number,
                default: 0
            },
            mathPowBlocks: {
                type: Number,
                default: 0
            },
            mathSinBlocks: {
                type: Number,
                default: 0
            },
            mathSqrtBlocks: {
                type: Number,
                default: 0
            },
            mathTanBlocks: {
                type: Number,
                default: 0
            },
            orBlocks: {
                type: Number,
                default: 0
            },
            printBlocks: {
                type: Number,
                default: 0
            },
            setListAtBlocks: {
                type: Number,
                default: 0
            },
            setVariableBlocks: {
                type: Number,
                default: 0
            },
            unaryOperationBlocks: {
                type: Number,
                default: 0
            },
            whileBlocks: {
                type: Number,
                default: 0
            },
            XorBlocks: {
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
    lastLogin: {
        type: Date
    },
    // This should be updated in the API call when a user gets updated.
    dateUpdated: {
        type: Date
    }
}));

module.exports = User;
