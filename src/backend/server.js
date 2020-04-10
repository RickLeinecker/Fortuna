//@flow strict
// Main file to listen to the Express server
// and connect to MongoDB

// Config for environment variables using the npm dotenv package
require('dotenv').config();

// Required Imports
const mongoose = require('mongoose');

// Express Application Server
const app = require('./expressApp');

// Port constant
const API_PORT = process.env.API_PORT || 3001;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
};

// MongoDB Connection
mongoose.connect(process.env.DB_URL, options)
	.then(() => console.log(`Connected to MongoDB...`))
	.catch(() => console.error('Could not connect to DB'));

// Server Listener
app.listen(API_PORT, () => {
	console.log(`Express server listening on port ${API_PORT}...`);
});
