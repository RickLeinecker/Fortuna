const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const battleController = require('../controllers/battleController');

//==============================================================================//
// TO USE ROUTES: all route calls in this file will be /api/battle/<Route call> //
//==============================================================================//

// Gets each users favorite tank
router.post('/prepareMatch', [
    check('challengerTankId', 'challengerTankId is required')
        .isMongoId(),
    check('challengeeId', 'challengeeId is required')
        .isMongoId()
], battleController.prepareMatch);

// Updates elo and currency of both players after a match is complete
router.patch('/reportResults', battleController.reportResults);

module.exports = router;