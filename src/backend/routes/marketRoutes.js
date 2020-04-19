// @flow strict

//===================================================================================//
// TO USE ROUTES: all route calls in this file will be /api/marketplace/<Route call> //
//===================================================================================//

// Required Imports
import express from 'express';
import { check } from 'express-validator';

// Market Sale Controller
import marketController from '../controllers/marketController';

// Router Constant
const router = express.Router();

// Create new Market Sale
// Route call: addMarketSale
// Req in body: sellerID, salePrice, itemID, itemType, amount
// Returns a confirmation message or an error
// Check messages can be edited
router.post('/addMarketSale', [
	check('sellerId', 'A valid MongoId is required.').isMongoId(),
	check('salePrice', 'Enter a whole number price greater than 0.').isInt({ min: 0 }),
	check('itemId', 'Enter an itemId').isString(),
	check('itemType', 'Enter an itemType').isString(),
	check('amount', 'Enter a whole number amount greater than 1.').isInt({ min: 1 })
], marketController.addMarketSale);

// Get the list of all Market Sales this user has that are active
// Route call: getUsersMarketSales
// Req userId
// Returns list of all Market Sales belonging to the user that are active or an error
router.get('/getUsersMarketSales/:userId', [
	check('userId', 'A valid MongoId is required.').isMongoId()
], marketController.getUsersMarketSales);

// Get the list of all Market Sales
// Route call: getMarketSales
// Req needs userId
// Returns list of all Market Sales not belonging to the user or an error
// Check messages can be edited
router.get('/getMarketSales/:userId', [
	check('userId', 'A valid MongoId is required.').isMongoId()
], marketController.getMarketSales);

// Get the list of all Market Sales
// Route call: getTankMarketSales
// Req needs userId
// Returns list of all Tank Market Sales not belonging to the user or an error
// Check messages can be edited
router.get('/getTankMarketSales/:userId', [
	check('userId', 'A valid MongoId is required.').isMongoId()
], marketController.getTankMarketSales);

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
	check('buyerId', 'A valid MongoId is required.').isMongoId(),
	check('sellerId', 'A valid MongoId is required.').isMongoId(),
	check('saleId', 'A valid MongoId is required.').isMongoId()
], marketController.marketTransaction);

// Remove A Sale
// Route call: removeAMarketSale
// Req body needs sale ID
// Returns the status
router.delete('/removeAMarketSale', [
    check('saleId', 'A valid MongoId is required.').isMongoId()
], marketController.removeAMarketSale);

module.exports = router;
