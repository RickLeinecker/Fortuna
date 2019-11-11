const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


// User Model
const User = require('../../../models/userModel');

// Get the signup page
router.get('/', (req, res) => {
    res.send('Welcome to the login page')
})

// Register a new User
router.post('/', (req, res) => {

    //console.log(req.body);
    
    // bcyrpt hash passwords
    bcrypt.hash(req.body.password, 5, async function(err, hash) {
        const newUser = new User({
            // Access the fields and store them in our model
            userName: req.body.userName,
            password: hash
        });

        // Saves to db
        try {
            const savedUser = await newUser.save();
            res.json(savedUser);
        } 
        catch (err) {
            res.json({ message: err });
        }

        
    });
    
});

module.exports = router;