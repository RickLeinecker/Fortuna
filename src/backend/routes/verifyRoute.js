// @flow strict

//=================================================================//
// TO USE ROUTES: all route calls in this file will be /api/verify //
//=================================================================//

const express = require('express');
const router = express.Router();

const verifyController = require('../controllers/verifyController');

router.get('/', verifyController.verify);


module.exports = router;
