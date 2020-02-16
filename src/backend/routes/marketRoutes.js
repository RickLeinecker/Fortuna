// @flow strict

//===============================================================================//
// TO USE ROUTES: all route calls in this file will be /marketplace/<Route call> //
//===============================================================================//

// Required Imports
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// Market Sale Controller
const marketController = require('../controllers/marketController');

// Create new Market Sale
// Route call: addMarketSale
// Req must have sellerID, salePrice, itemID, and itemType in body
// Returns a confirmation message or an error
// Check messages can be edited
router.post('/addMarketSale', [
    check('sellerID', 'Missing a sellerID'),
    check('salePrice', 'Missing a salePrice'),
    check('itemID', 'Missing an itemID'),
    check('itemType', 'Missing an itemType')
    ], marketController.addMarketSale);

// Get the list of all Market Sales
// Route call: getMarketSales
// Req does not need anything (as far as I know)
// Returns list of all Market Sales or an error
// Check messages can be edited
router.get('/getMarketSales', marketController.getMarketSales);

// Get a single market sale by ID
// Route call: getMarketSale
// Req needs sale ID (MongoDB _id field)
// Returns the Marketplace Sale with that ID or an error
router.get('/getMarketsale/:saleID', marketController.getMarketSale);

module.exports = router;
