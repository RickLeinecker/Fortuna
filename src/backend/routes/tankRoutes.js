// @flow strict 

//========================================================================//
// TO USE ROUTES: all route calls in this file will be /tank/<Route call> //
//========================================================================//

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

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


router.patch('/tankTrade', auth, tankController.tankTrade);


module.exports = router;