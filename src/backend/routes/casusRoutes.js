//@flow strict

const casusController = require('../controllers/casusController');

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

//==============================================================================//
// TO USE ROUTES: all route calls in this file will be /api/cassus/<Route call> //
//==============================================================================//

// Update the amount of cassus blocks a player has
// Route call: /update
// Req must include the user jwt in the header: x-auth-token
// the body should specify which 'block' is being updated and the 'value' it should be set to
// Returns a json object of the user with updated counts
router.patch('/update', casusController.update);

module.exports = router;
