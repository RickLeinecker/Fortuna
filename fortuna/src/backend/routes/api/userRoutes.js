const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const userController = require('../../controllers/userController');

// Create a new user
router.post('/newUser', [
    check('userName', 'Please enter a username with 3 or more characters')
        .isLength(3),
    check('password', 'Please enter a password with 5 or more characters')
        .isLength({ min: 5})
    ],  userController.register);

// Retrieve all users
//router.get('/allUsers'. user.retrieveAll);

// Retrieve a single user based on userID
//router.get('/user/:userID/Retrieve', user.retrieveOne);

// Update a single user with the userID
//router.patch('/user/:userID/Update', user.updateUser);


module.exports = router;