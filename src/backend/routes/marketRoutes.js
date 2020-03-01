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
// Req in body: sellerID, salePrice, itemID, itemType, amount
// Returns a confirmation message or an error
// Check messages can be edited
router.post('/addMarketSale', [
    check('sellerId', 'Enter a sellerId'),
    check('salePrice', 'Enter a salePrice'),
    check('itemId', 'Enter an itemId'),
    check('itemType', 'Enter an itemType'),
    check('amount', 'Enter an item amount')
    ], marketController.addMarketSale);

// Get the list of all Market Sales
// Route call: getMarketSales
// Req does not need anything
// Returns list of all Market Sales or an error
// Check messages can be edited
router.get('/getMarketSales', marketController.getMarketSales);

// Get a single market sale by ID
// Route call: getMarketSale
// Req needs saleId in body
// Returns the Marketplace Sale with that ID or an error
router.get('/getMarketsale', marketController.getMarketSale);

// Market Transaction
// Route call: marketTransaction
// Req body needs buyer ID, seller ID, 
// item ID, item type, sale price, sale ID
// Returns updated buyer (ie logged in user)
router.put('/marketTransaction', [
    check('buyerId', 'Missing buyerId'),
    check('sellerId', 'Missing sellerId'),
    check('itemId', 'Missing itemId'),
    check('saleId', 'Missing saleId'),
    check('itemType', 'Missing itemType'),
    check('salePrice', 'Missing salePrice'),
    ], marketController.marketTransaction);

module.exports = router;
