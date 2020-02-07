// @flow strict 

//========================================================================//
// TO USE ROUTES: all route calls in this file will be /tank/<Route call> //
//========================================================================//

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const tankController = require('../controllers/tankController');

// Retrieve favoriteTankId of the user
// Route call: /<userId>/getFavorite
// Req must include the userId in the url field in place of <userId>
// Returns the id of the favorited tank upon success and an error message upon failure
router.get('/getFavorite', auth, tankController.getFavorite);

// Set a favorite tank
// Route call: /<userId>/favoriteTank
// Req must include the userId in the url field in place of <userId> and the favoriteTankId in the body
// Returns the id of the favorited tank upon success and an error message upon failure
router.patch('/favoriteTank', auth, tankController.favoriteTank);

// Retrieve array of all a users tanks
// Route call: /<userId>/userTanks
// Req must include the userId in the url field in place of <userId>
// Returns array of tanks
router.get('/userTanks', auth, tankController.userTanks);

//router.post('/:userId/assignTank', tankController.assignTank);


module.exports = router;