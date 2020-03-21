//@flow strict

// NOTE: This functionality is not implemented in v1.0
// The route is here to support that function down the line if desired.

const casusController = require('../controllers/casusController');

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

//=============================================================================//
// TO USE ROUTES: all route calls in this file will be /api/casus/<Route call> //
//=============================================================================//

// Update the amount of casus blocks a player has
// Route call: /update
// Req must include the user jwt in the header: x-auth-token
// the body should specify which 'block' is being updated and the 'value' it should be set to
// Returns a json object of the user with updated counts
router.patch('/update', casusController.update);

module.exports = router;
