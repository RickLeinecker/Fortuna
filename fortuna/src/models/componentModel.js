//@flow strict
// Document Schema for the Component Model

// Required Imports
import Mongoose from 'mongoose';

const Component = new Mongoose.Model('Component', new Mongoose.Schema({
    // _id field made upon creation
    
    // Name of component required on creation
    componentName: {
        type: String,
        required: true
    },
    // UserID of owner required on creation. String representation of ObjectID for user.
    userId: {
        type: String,
        required: true
    },
    // Enum classification for component required on creation.
    componentType: {
        type: String,
        enum: ['weapon', 'armor', 'treads', 'scanner', 'jammer', 'shield', 'item'],
        required: true
    }
}));

module.exports = Component;
