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
// Returns a prompt that a email confirmation was sent.
router.post('/registerUser', [
    check('userName', 'Please enter a username with 3 or more characters')
        .isLength({ min: 3 }),
    check('password', 'Please enter a password with 5 or more characters')
        .isLength({ min: 5 }),
    check('email', 'Please enter a valid email')
        .isEmail()
    ], userController.register);

// Login a User
// Route call: login
// Req must include email and password in body
// Returns a jwt upon success
router.post('/login', [
    check('email', 'Please enter a valid email')
        .isEmail(),
    check('password', 'Password is required')
        .exists()
    ], userController.login);

// Confirm a User's email
// Route call: confirmToken
// Req must include email in body provided by user
// Token should be in the body as an input from the URL
// in the email.
// Returns success prompt, then user can go login
router.get('/confirmEmail', [
    check('email', 'Please enter a valid email')
        .isEmail(),
    check('token', 'A verification token is required')
        .exists()
    ], userController.confirmToken);

// Resend a confirmation email to User's email
// Route call: resendConfirm
// Req must include email in body provided by user
// Returns success prompt that email was sent.
router.get('/resendConfirm', [
    check('email', 'Please enter a valid email')
        .isEmail()
    ], userController.resendConfirm);

// Retrieve all users
//router.get('/allUsers', userController.retrieveAll);

// Retrieve a single user based on userID
// Route call: /getUser
// Req must include the jwt as a header: x-auth-token
// Returns a JSON object containing all the user's info except the password
router.get('/getUser', auth, userController.getUser);


// Retrieve top 10 users as of rn, that can be easily changed if needed - see userController
// Route call: /leaderboard
// Req requires no info
// Returns an array of json users including the elo, _id, and userName
router.get('/leaderboard', userController.getLeaders);


module.exports = router;
