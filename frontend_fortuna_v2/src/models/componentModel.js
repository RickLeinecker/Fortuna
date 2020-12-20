//@flow strict
// Document Schema for the Component Model

// Required Imports
import Mongoose from 'mongoose';

const Component = new Mongoose.model('Component', new Mongoose.Schema({
    // _id field made upon creation
    
    // Name of component required on creation
    componentName: {
        type: String,
        required: true
    },
    // User ObjectId of owner required on creation.
    userId: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // Enum classification for component required on creation.
    componentType: {
        type: String,
        enum: ['weapon', 'chassis', 'treads', 'scanner', 'jammer', 'shield', 'item', 'addon'],
        required: true
    }
}));

module.exports = Component;
