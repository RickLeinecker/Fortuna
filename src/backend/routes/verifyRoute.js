// @flow strict

//=================================================================//
// TO USE ROUTES: all route calls in this file will be /api/verify //
//=================================================================//

const express = require('express');
const router = express.Router();

const verifyController = require('../controllers/verifyController');

// Checks if a token is valid
// Route Call: just call explicitly /api/verify - thats it, nothing else
// Header: x-auth-token
// Body: N/A
// returns either token valid or invalid
router.get('/', verifyController.verify);


module.exports = router;
