//@flow strict

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Home page')
})

module.exports = router;