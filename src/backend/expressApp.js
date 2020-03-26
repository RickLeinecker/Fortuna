//@flow strict
// Main file for the Express server and the API

// Required imports
const express = require('express');

// API routes
const userRoutes = require('./routes/userRoutes');
const tankRoutes = require('./routes/tankRoutes');
const marketRoutes = require('./routes/marketRoutes');
const casusRoutes = require('./routes/casusRoutes');
const replayRoutes = require('./routes/replayRoutes');
const verifyRoute = require('./routes/verifyRoute');

// API Express server instance
const app = express();

// As of express v4.16, npm body-parser is bundled with express again
app.use(express.json());

// Giving the routes to the Express server
app.use('/api/tank', tankRoutes);
app.use('/api/user', userRoutes);
app.use('/api/marketplace', marketRoutes);
app.use('/api/casus', casusRoutes);
app.use('/api/replay', replayRoutes);
app.use('/api/verify', verifyRoute);

// Export the Express server
module.exports = app;
