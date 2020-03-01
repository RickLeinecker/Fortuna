// @flow strict

// Package Imports
import type {
    $Request,
    $Response,
    NextFunction,
    Middleware
} from 'express';
import { validationResult } from 'express-validator';

// MarketplaceSale Model, User Model, Tank Model
import MarketSale from '../../models/marketSaleModel';
import User from '../../models/userModel';
import Tank from '../../models/tankModel';

// Adds a Marketplace Sale
// Different branches depending the itemType
exports.addMarketSale = async (req: $Request, res: $Response) => {
    // Contains errors for failed validation.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Return 400 for a bad request
        return res
            .status(400)
            .json({ errors: errors.array() });
    }
    
    // Deconstructing information from request body
    const { sellerId, salePrice, itemId, itemType, amount } = req.body;

    // If the item is a tank
    if (itemType === 'tank') {
        try { 
            // Check if tank is actually owned by user
            let tank = await Tank.findOne({ id: itemId, userId: sellerId });
            if (!tank) {
                return res
                    .status(400)
                    .json({ msg: 'Tank does not exist under this user.' })
            }            

            // Make a new Marketplace Sale
            // if it exists
            const sale = new MarketSale({
                sellerId,
                salePrice,
                itemId,
                itemType,
                amount 
            });

            // Mark tank as being sold and save change to DB
            tank.userId = 'Marketplace';
            await tank.save();

            // Save the sale to DB
            await sale.save();

            // Send back success confirmation
            res.status(201).json({ msg: 'Successfully created Market Sale.' })           

        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Unable to add Market Sale.' });
        }
    } else { // If the item is a component or casus block

    }

    try {
        // Make new Marketplace Sale
        let sale = new MarketSale({
            sellerId,
            salePrice,
            itemId,
            itemType
        });

        // Save a Marketplace Sale to the DB
        await sale.save();

        // Send back success confirmation
        res.status(201).json({ msg: 'Successfully created Market Sale.' })
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            msg: 'Unable to add Market Sale.',
            errors: err.message
        });
    }
}

// Gets all Marketplace Sales
exports.getMarketSales = async (req: $Request, res: $Response) => {
    try {
        const salesList = await MarketSale.find();
        res.json(salesList);
    }
    catch (err) {
        res.status(500).json({ 
            msg: 'Unable to find list of Sales.',
            errors: err.message 
        });
    }
}

// Gets a single Marketplace Sale
exports.getMarketSale = async (req: $Request, res: $Response) => {
    try {
        const sale = await MarketSale.findById(req.params.saleID);
        res.json(sale);
    }
    catch (err) {
        res.status(500).json({
            msg: 'Cannot retrieve Marketplace Sale.',
            errors: err.message
        });
    }
}

// Transaction between players
// Only implemented for tank transactions at the moment, will update later
exports.marketTransaction = async (req: $Request, res: $Response) => {
    // Validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Return 400 for a bad request
        return res
            .status(400)
            .json({ errors: errors.array() });
    }

    // Deconstruct request body
    const { buyerId, sellerId, 
            saleId, itemId, 
            salePrice, itemType } = req.body;
    
    try {
        // Internal check for user's currency
        const user = await User.findById(buyerId);
        if (user.money < salePrice) {
            throw "Not enough money for this transaction."
        }

        // Initiate transaction
        const buyer = await User.findByIdAndUpdate(buyerId, { $inc: { money: (salePrice * -1) } }, { new: true });
        await User.findByIdAndUpdate(sellerId, { $inc: { money: salePrice } });
        await Tank.findByIdAndUpdate(itemId, { $set: { userId: buyerId } });

        // Return current buyer
        res.status(201).json(buyer);
    }   
    catch (err) {
        res.status(500).json({
            msg: 'Cannot make Market Transaction.',
            errors: err.message
        });
    }
}