// @flow strict

//========================================================================//
// TO USE ROUTES: all route calls in this file will be /replay/<Route call> //
//========================================================================//

// Required imports
import express from 'express';
import { check } from 'express-validator';
import replayController from '../controllers/replayController';

// Imported Models
import User from '../../models/userModel';
import Tank from '../../models/tankModel';
import BattleRecord from '../../models/battleRecordModel';

// Import Constants
const router = express.Router();

// Get list of records for a user for replays
// Route call: getReplayList
// Req body: userId
// Returns: List of all replays that the user
// is associated with.
router.get('/getReplayList', [
    check('userId', 'Please enter a valid userId')
        .isString()
    ], replayController.getReplayList);
