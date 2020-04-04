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
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // Array of string identifiers of tank components. Default no component array on creation.
    components: {
        type: [String],
        default: ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty']
    },
    // Casus code in the form of a JSON object. Default Empty Bounding Box on creation.
    casusCode: {
        type: Object,
        default: { 
			boundingBox: { x: 0, y: 0, w: 64, h: 23 }, 
			highlighted: false, 
			blockClass: "ContainerBlock", 
			children: [{ 
				boundingBox: { x: 0, y: 0, w: 64, h: 23 }, 
				highlighted: true, 
				blockClass: "EmptyBlock", 
				dataType: "VOID" }] 
			}
    },
    // Boolean field for if a tank is a bot. Default false on creation.
    isBot: {
        type: Boolean,
        default: false
    }
}));

module.exports = Tank;
