//@flow strict
// Main file for the Node and Express server that will
// handle all the API routes

// Required Packages/Imports
const express = require('express');

// Port constant so we may edit as needed
const PORT = process.env.PORT || 4000;

// Server Instance
const app = express();
// As of express v4.16, npm body-parser is bundled with express again
app.use(express.json());

// Server Listener
app.listen(PORT, () => {
    console.log(`Node and Express server listening on port ${PORT}...`);
});