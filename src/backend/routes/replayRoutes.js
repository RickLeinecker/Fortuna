// @flow strict

//==============================================================================//
// TO USE ROUTES: all route calls in this file will be /api/replay/<Route call> //
//==============================================================================//

// Required imports
import express from 'express';
import replayController from '../controllers/replayController';
import auth from '../middleware/auth';

// Import Constants
const router = express.Router();

// Get list of battle records for a user for replays
// Route call: getReplayList
// Header: x-auth-token
// Returns: List of all battle records for the user
// is associated with.
router.get('/getReplayList', auth, replayController.getReplayList);

module.exports = router;
