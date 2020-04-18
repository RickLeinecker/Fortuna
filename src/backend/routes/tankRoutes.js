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
router.patch('/favoriteTank', [
	check('favoriteTank', 'A valid MongoId is required.').isMongoId()
], auth, tankController.favoriteTank);

// Sets favorite tank to null and wager to 0
// Route call: /unfavoriteTank
// Header: x-auth-token
// Body: N/A
// Returns a success message on success and an error message on failure.
router.patch('/unfavoriteTank', auth, tankController.unfavoriteTank);

// Retrieve favoriteTankTeam of the user
// Route call: /getFavoriteTankTeam
// Header: x-auth-token
// Body: N/A
// Returns the array of ids of the favorited tank team upon success and an 
// error message upon failure
router.get('/getFavoriteTankTeam', auth, tankController.getFavoriteTankTeam);

// Set a favorite tank team
// Route call: /setFavoriteTankTeam
// Header: x-auth-token
// Body: Array of three tank ids of Tanks to add to team.
// Returns the array of the tank team upon success and an error message upon failure
router.patch('/setFavoriteTankTeam', [
	check('tankTeam', 'Need array 3 Tank MongoIds')
		.isArray({ min: 3, max: 3 })
], auth, tankController.setFavoriteTankTeam);

// Sets favorite tank team to empty array and wager to 0
// Route call: /unfavoriteTankTeam
// Header: x-auth-token
// Body: N/A
// Returns a success message on success and an error message on failure.
router.patch('/unfavoriteTankTeam', auth, tankController.unfavoriteTankTeam);

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
router.post('/assignTank', [
	check('tankName', 'tankName is required').isString(),
	check('userId', 'A valid MongoId is required.').isMongoId(),
	check('components', 'components is required').isArray()
], auth, tankController.assignTank);

// Updates the entire document of the tank
// Route Call: /tankUpdate/<tankId>
// Headers: x-auth-token
// Body: tankName, userId, components, isBot
// Returns the updated tank
router.put('/tankUpdate/:tankId', [ 
	check('tankName', 'tankName is required').isString(),
	check('userId', 'A valid MongoId is required.').isMongoId(),
	check('components', 'components is required').isArray(),
	check('isBot', 'isBot is required').isBoolean()
], auth, tankController.tankUpdate);

// Updates only the casusCode of the tank
// Route Call: /casusUpdate/<tankId>
// Headers: x-auth-token
// Body: casusCode
// Returns tank with updated casusCode
router.put('/casusUpdate/:tankId', [ 
	check('casusCode', 'casusCode is required').exists(),
], auth, tankController.casusUpdate);

// Deletes tank from DB
// Route Call: /deleteTank/<tankId>
// Req must contain the tankId within the uri of the api call in place of <tankId>
// Returns confirmation message that tank was deleted.
router.delete('/deleteTank/:tankId', [
	check('tankId', 'A valid MongoId is required.').isMongoId()
], auth, tankController.deleteTank);

// Retrieve array of bot tanks
// Route call: /getBotTanks
// Body: N/A
// Returns the array of bot tanks
router.get('/getBotTanks', auth, tankController.getBotTanks);

// Retrieve tank objects
// Route call: /getTankById/<tankId>
// Body: N/A
// Takes an array of tank ids
// returns the tank objects
router.get('/getTanksById', [
	check('array', 'A JSON array of MongoIds is required.').isJSON()
], auth, tankController.getTanksById);

module.exports = router;
