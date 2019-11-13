//@flow strict
// Main file for the Node and Express server that will
// handle all the API routes

// Required Packages/Imports
const express = require('express');
const mongoose = require('mongoose');

// Port constant so we may edit as needed
const PORT = process.env.PORT || 4000;

const signups = require('./routes/api/signup');
const home = require('./routes/api/home');

// Server Instance
const app = express();
// As of express v4.16, npm body-parser is bundled with express again
app.use(express.json());

// Use the api routes as middleware
// First param is the url?uri  directory second is the api path
app.use('/', home);
app.use('/signup', signups);

// MongoDB Connection
mongoose.connect('mongodb://localhost/fortuna', { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() => console.log(`Connected to MongoDB...`))
    .catch(() => console.error('Could not connect to DB'));

// Server Listener
app.listen(PORT, () => {
    console.log(`Node and Express server listening on port ${PORT}...`);
});
