// @flow strict

//========================================================================//
// TO USE ROUTES: all route calls in this file will be /user/<Route call> //
//========================================================================//

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

//Middleware
const auth = require('../middleware/auth');

const userController = require('../controllers/userController');

// Create a new user
// Route call: registerUser
// Req must include userName and password in body
// Returns a jwt upon success
router.post('/registerUser', [
    check('userName', 'Please enter a username with 3 or more characters')
        .isLength(3),
    check('password', 'Please enter a password with 5 or more characters')
        .isLength({ min: 5})
    ], userController.register);


// Login a User
// Route call: login
// Req must include username and password in body
// Returns a jwt upon success
router.post('/login', [
    check('userName', 'Please enter a username with 3 or more characters')
        .isLength(3),
    check('password', 'Password is required')
        .exists()
    ], userController.login);

router.get('/auth', auth, userController.checkAuth);

// Retrieve a single user based on userID
// Route call: /<userId>/retrieve
// Req must include the userId in the param
// Returns a JSON object containing all the user's info
router.get('/:userId/retrieve', userController.getUser);

module.exports = router;
