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
// Req must include the user jwt as a header: x-auth-token
// Returns the id of the favorited tank upon success and an error message upon failure
router.get('/getFavorite', auth, tankController.getFavorite);

// Set a favorite tank
// Route call: /favoriteTank
// Req must include the favoriteTankId in the body and the user jwt as a header: x-auth-token
// Returns the id of the favorited tank upon success and an error message upon failure
router.patch('/favoriteTank', auth, tankController.favoriteTank);

// Retrieve array of all a users tanks
// Route call: /userTanks
// Req must include the user jwt in the header: x-auth-token
// Returns array of tanks
router.get('/userTanks', auth, tankController.userTanks);

// Creates a new tank and assigns it to a user
// Route Call: /assignTank
// Req must contain the x-auth-token header and the name of the created tank in the body
// Returns the id of the new tank
router.post('/assignTank', auth, tankController.assignTank);

// Updates the entire document of the tank
// Route Call: /tankUpdate/<tankId>
// Req must contain the tankId within the uri of the api call in place of <tankId>
// Req must also include each component of the tank even the ones that arent to be updated to work
// Returns the updated tank
router.put('/tankUpdate/:tankId', [ 
    check('tankName', 'tankName is required')
        .isString(),
    check('userId', 'userId is required')
        .isString(),
    check('components', 'components is required')
        .isArray(),
    check('casusCode', 'casusCode is required')
        .exists(),
    check('isBot', 'isBot is required')
        .isBoolean()
    ], tankController.tankUpdate);

router.put('/casusUpdate/:tankId', [ 
    check('casusCode', 'casusCode is required')
        .exists(),
    ], tankController.casusUpdate);

// Deletes tank from DB
// Route Call: /deleteTank/<tankId>
// Req must contain the tankId within the uri of the api call in place of <tankId>
// Returns confirmation message that tank was deleted.
router.delete('/deleteTank/:tankId', [
    check('tankId', 'tankId should be a MongoId string')
        .isMongoId()
    ], tankController.deleteTank);

module.exports = router;
