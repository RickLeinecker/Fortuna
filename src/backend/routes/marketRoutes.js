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
    check('sellerId', 'Enter a sellerId')
        .isString(),
    check('salePrice', 'Enter a salePrice')
        .isNumeric(),
    check('itemId', 'Enter an itemId')
        .isString(),
    check('itemType', 'Enter an itemType')
        .isString(),
    check('amount', 'Enter an item amount')
        .isNumeric()
    ], marketController.addMarketSale);

// Get the list of all Market Sales
// Route call: getMarketSales
// Req needs userId
// Returns list of all Market Sales or an error
// Check messages can be edited
router.get('/getMarketSales', [
    check('userId', 'userId is required')
        .isString()
    ], marketController.getMarketSales);

// Get a single market sale by ID
// Route call: getMarketSale
// Req needs saleId in body
// Returns the Marketplace Sale with that ID or an error
router.get('/getMarketsale', marketController.getMarketSale);

// Market Transaction
// Route call: marketTransaction
// Req body needs buyer ID, seller ID, sale ID
// Returns updated buyer (ie logged in user)
router.put('/marketTransaction', [
    check('buyerId', 'Missing buyerId')
        .isString(),
    check('sellerId', 'Missing sellerId')
        .isString(),
    check('saleId', 'Missing saleId')
        .isString()
    ], marketController.marketTransaction);

module.exports = router;
