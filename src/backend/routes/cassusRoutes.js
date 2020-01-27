const cassusController = require('../controllers/cassusController');

const express = require('express');
const router = express.Router();

//==========================================================================//
// TO USE ROUTES: all route calls in this file will be /cassus/<Route call> //
//==========================================================================//

// Update the amount of cassus blocks a player has
// Route call: /<userId>/update
// Req must include the userId in the url field in place of <userId> and in the body
// it should have 'body' value specifying which block you would like to update and 'value'
// specifying what value you would like to set
// Returns a json object of the user with updated counts
router.patch('/:userId/update', cassusController.update);

module.exports = router;