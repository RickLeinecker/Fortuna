//@flow strict
// Main file for the Node and Express server 

// Required Packages/Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// config for environment variables using the npm dotenv package
require('dotenv').config();

// Port constant so we may edit as needed
//const PORT = process.env.PORT || 3001;
const PORT = 3001;

const auth = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const tankRoutes = require('./routes/tankRoutes');

// Server Instance
const app = express();
// As of express v4.16, npm body-parser is bundled with express again
app.use(express.json());

// Enables cross server comminications
// At production we should limit what servers it can read from
// See https://daveceddia.com/access-control-allow-origin-cors-errors-in-react-express/
// app.use(cors());

// Use the api routes as middleware
// First param is the url directory second is the api route object
app.use('/auth', auth);
app.use('/tank', tankRoutes);
app.use('/user', userRoutes);




// MongoDB Connection
mongoose.connect('mongodb://localhost/fortuna', { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() => console.log(`Connected to MongoDB...`))
    .catch(() => console.error('Could not connect to DB'));

// Server Listener
app.listen(PORT, () => {
    console.log(`Node and Express server listening on port ${PORT}...`);
});
