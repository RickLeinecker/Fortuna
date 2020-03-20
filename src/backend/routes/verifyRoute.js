const express = require('express');
const router = express.Router();

const verifyController = require('../controllers/verifyController');

router.get('/', verifyController.verify);


module.exports = router;