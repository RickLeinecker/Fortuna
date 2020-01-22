// @flow strict
const express = require('express');
const router = express.Router();

const tankController = require('../controllers/tankController');

router.get('/:userId/favoriteTank', tankController.favoriteTank);

module.exports = router;