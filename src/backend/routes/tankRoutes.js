// @flow strict 

//========================================================================//
// TO USE ROUTES: all route calls in this file will be /tank/<Route call> //
//========================================================================//

const express = require('express');
const router = express.Router();

const tankController = require('../controllers/tankController');

// Retrieve favoriteTankId of the user
// Route call: /<userId>/getFavorite
// Req must include the userId in the url field in place of <userId>
// Returns the id of the favorited tank upon success and an error message upon failure
router.get('/:userId/getFavorite', tankController.getFavorite);

// Set a favorite tank
// Route call: /<userId>/favoriteTank
// Req must include the userId in the url field and the favoriteTankId in the body
// returns the id of the favorited tank upon success and an error message upon failure
router.patch('/:userId/favoriteTank', tankController.favoriteTank);

// Retrieve array of all a users tanks
// Route call: /<userId>/userTanks
// Req must include the userId in the url
// Returns array of tanks
router.get('/:userId/userTanks', tankController.userTanks);

//router.post('/:userId/assignTank', tankController.assignTank);


module.exports = router;