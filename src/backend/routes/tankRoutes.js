// @flow strict 

//============================================================================//
// TO USE ROUTES: all route calls in this file will be /api/tank/<Route call> //
//============================================================================//

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const tankController = require('../controllers/tankController');

// Retrieve favoriteTankId of the user
// Route call: /getFavorite
// Header: x-auth-token
// Body: N/A
// Returns the id of the favorited tank upon success and an error message upon failure
router.get('/getFavorite', auth, tankController.getFavorite);

// Set a favorite tank
// Route call: /favoriteTank
// Header: x-auth-token
// Body: favoriteTank (the id)
// Returns the id of the favorited tank upon success and an error message upon failure
router.patch('/favoriteTank', auth, tankController.favoriteTank);

// Retrieve array of all a users tanks
// Route call: /userTanks
// Header: x-auth-token
// Body: N/A
// Returns array of tanks
router.get('/userTanks', auth, tankController.userTanks);

// Creates a new tank and assigns it to a user
// Route Call: /assignTank
// Header: x-auth-token
// Body: tankName
// Returns the id of the new tank
router.post('/assignTank', auth, tankController.assignTank);


// Updates the entire document of the tank
// Route Call: /tankUpdate/<tankId>
// Headers: x-auth-token
// Body: tankName, userId, components, isBot
// Returns the updated tank
router.put('/tankUpdate/:tankId', [ 
    check('tankName', 'tankName is required')
        .isString(),
    check('userId', 'userId is required')
        .isString(),
    check('components', 'components is required')
        .isArray(),
    check('isBot', 'isBot is required')
        .isBoolean()
    ], auth, tankController.tankUpdate);

// Updates only the casusCode of the tank
// Route Call: /casusUpdate/<tankId>
// Headers: x-auth-token
// Body: casusCode
// Returns tank with updated casusCode
router.put('/casusUpdate/:tankId', [ 
    check('casusCode', 'casusCode is required')
        .exists(),
    ], auth, tankController.casusUpdate);

module.exports = router;
