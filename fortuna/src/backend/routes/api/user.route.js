const express = require('express');
const router = express.Router();

router => {
    const user = require('../../controllers/user.controller.js')

    // Create a new user
    router.post('/user', user.register);

    // Retrieve all users
    router.get('/user'. user.find_all_users);

    // Retrieve a single user based on UserID
    router.get('/user/:userID', user.find1);

}

module.exports = router