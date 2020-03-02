// @flow strict

//========================================================================//
// TO USE ROUTES: all route calls in this file will be /api/user/<Route call> //
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
// Route call: /login
// Req must include username and password in body
// Returns a jwt upon success
router.post('/login', [
    check('userName', 'Please enter a username with 3 or more characters')
        .isLength(3),
    check('password', 'Password is required')
        .exists()
    ], userController.login);


// Retrieve all users
// Route call: /allUsers
// Req doesnt need anything
// Currently returns the entire document of each user
router.get('/allUsers', userController.allUsers);

// Retrieve a single user based on userID
// Route call: /getUser
// Req must include the jwt as a header: x-auth-token
// Returns a JSON object containing all the user's info except the password
router.get('/getUser', auth, userController.getUser);

// Retrieve a single user using the userId rather than the auth token
// routecall: /userNoAuth/<userId>
// Req must include the user id in the <userId> field of the route
// Returns a JSON object with all the user's info except the pass
router.get('/retrieveUser/:userId', userController.retrieveUser);


// Retrieve top 10 users as of rn, that can be easily changed if needed - see userController
// Route call: /leaderboard
// Req requires no info
// Returns an array of json users including the elo, _id, and userName
router.get('/leaderboard', userController.getLeaders);



module.exports = router;
