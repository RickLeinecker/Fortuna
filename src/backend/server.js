//@flow strict
// Main file for the Node and Express server 

// Config for environment variables using the npm dotenv package
require('dotenv').config();

// Required Packages/Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Port constant
const PORT = process.env.PORT || 3001;

const userRoutes = require('./routes/userRoutes');
const tankRoutes = require('./routes/tankRoutes');
const marketRoutes = require('./routes/marketRoutes');
const casusRoutes = require('./routes/casusRoutes');

// API Server Instance
const app = express();

// As of express v4.16, npm body-parser is bundled with express again
app.use(express.json());

// Enables cross server comminications
// At production we should limit what servers it can read from
// See https://daveceddia.com/access-control-allow-origin-cors-errors-in-react-express/
// app.use(cors());

// Use the api routes as middleware
// First param is the url directory second is the api route object
app.use('/api/tank', tankRoutes);
app.use('/api/user', userRoutes);
app.use('/api/marketplace', marketRoutes);
app.use('/api/casus', casusRoutes);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};

// MongoDB Connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() => console.log(`Connected to MongoDB...`))
    .catch(() => console.error('Could not connect to DB'));

// Server Listener
app.listen(PORT, () => {
    console.log(`Node and Express server listening on port ${PORT}...`);
});
