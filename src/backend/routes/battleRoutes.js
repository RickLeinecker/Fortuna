const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const { check } = require('express-validator');

const battleController = require('../controllers/battleController');

//==============================================================================//
// TO USE ROUTES: all route calls in this file will be /api/battle/<Route call> //
//==============================================================================//

// Note userOne is challengee & userTwo is the challenger

// Gets each users favorite tank
// Header: x-auth-token
// Body: challengerTankId (logged in user's tank id) and 
// personBeingChallengedId (opponent's user id)
// Returns battle record id -- can easily be changed to the whole record if needed
router.post('/prepareMatch', [
    check('challengerTankId', 'challengerTankId is required')
        .isMongoId(),
    check('personBeingChallengedId', 'challengeeId is required')
        .isMongoId()
], auth, battleController.prepareMatch);

// Updates elo and currency of both players after a match is complete
// Header: x-auth-token
// Body: winner (0 for a tie, 1 for userOne, 2 for user two) and the battleId
// Returns: updated match record
router.patch('/reportResults', [
    check('winner', 'Please enter 0 for a tie, 1 for userOne, 2 for userTwo')
        .isInt(),
    check('battleId', 'Please provide the associated battleId')
        .isMongoId()
], auth, battleController.reportResults);

// Gets a match via match id
// Header: x-auth-token
// Path: matchId in path
// Returns battle record associated with the id given.
router.get('/getMatch/:matchId', [
    check('matchId', 'matchId is required')
        .isMongoId()
], auth, battleController.getMatch);

module.exports = router;