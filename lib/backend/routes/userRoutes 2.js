"use strict";

//========================================================================//
// TO USE ROUTES: all route calls in this file will be /user/<Route call> //
//========================================================================//
var express = require('express');

var router = express.Router();
//comment

var _require = require('express-validator'),
    check = _require.check; //Middleware

var auth = require('../middleware/auth');

var userController = require('../controllers/userController'); // Create a new user

// Route call: registerUser
// Req must include userName and password in body
// Returns a jwt upon success
router.post('/registerUser', [check('userName', 'Please enter a username with 3 or more characters').isLength(3), check('password', 'Please enter a password with 5 or more characters').isLength({
  min: 5
})], userController.register); // Login a User

// Route call: login
// Req must include username and password in body
// Returns a jwt upon success
router.post('/login', [check('userName', 'Please enter a username with 3 or more characters').isLength(3), check('password', 'Password is required').exists()], userController.login); // Retrieve all users

//router.get('/allUsers', userController.retrieveAll);
router.get('/auth', auth, userController.checkAuth); // Retrieve a single user based on userID

// Route call: /<userId>/Retrieve
// Req must include the userId in the param
// Returns a JSON object containing all the user's info
router.get('/:userId/Retrieve', userController.getUser); // Update a single user with the userID

//router.patch('/user/:userId/Update', userController.updateUser);

module.exports = router;