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
            // Also acts as a way to check if user is real
            let tank = await Tank.findOne({ id: itemId, userId: sellerId });
            if (!tank) {
                return res
                    .status(400)
                    .json({ msg: 'Tank does not exist under this user.' })
            }            

            // Make a new Marketplace Sale
            // if tank exists
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
        try {
            // Check if user exists
            let user = await User.findById(sellerId);
            if (!user) {
                return res
                    .status(400)
                    .json({ msg: 'User not found in DB' })
            }

            if (itemType === 'component') { // Components
                // Check if they have enough
                // of the component to sell
                const userItem = user['inventory']['tankComponents'][itemId];
                if (userItem < amount) {
                    return res
                        .status(400)
                        .json({ msg: 'User does not have enough of this item to sell' })
                }

                // If they have enough to sell
                // make new Marketplace sale
                const sale = new MarketSale({
                    sellerId,
                    salePrice,
                    itemId,
                    itemType,
                    amount 
                });

                // Subtract the amount of items from the user inventory
                user['inventory']['tankComponents'][itemId] -= amount;
                await user.save();

                // Add the new sale to the DB.
                await sale.save();

                // Send back success confirmation
                res.status(201).json({ msg: 'Successfully created Market Sale.' });            
            } else { // Casus Blocks
                // Check if they have enough
                // Casus blocks to sell
                const userItem = user['inventory']['casusBlocks'][itemId];
                if (userItem < amount) {
                    return res
                        .status(400)
                        .json({ msg: 'User does not have enough of this item to sell' })
                }

                // If they have enough to sell
                // make new Marketplace sale
                const sale = new MarketSale({
                    sellerId,
                    salePrice,
                    itemId,
                    itemType,
                    amount 
                });

                // Subtract the amount of items from the user inventory
                user['inventory']['casusBlocks'][itemId] -= amount;
                await user.save();

                // Add the new sale to the DB.
                await sale.save();

                // Send back success confirmation
                res.status(201).json({ msg: 'Successfully created Market Sale.' });                    
            }

        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Unable to add Market Sale.' });
        }
    }
}

// Gets all Marketplace Sales
exports.getMarketSales = async (req: $Request, res: $Response) => {
    try {
        // Get list of sales from DB
        const salesList = await MarketSale.find();
        if (!salesList) {
            return res
                .status(400)
                .json({ msg: 'Unable to get list of Market Sales.' })
        }

        // Return list of sales
        res.status(200).json(salesList);

    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Unable to find list of Sales.' });
    }
}

// Gets a single Marketplace Sale
exports.getMarketSale = async (req: $Request, res: $Response) => {
    try {
        // Get market sale from DB
        const sale = await MarketSale.findById(req.body.saleId);
        if (!sale) {
            return res
                .status(400)
                .json({ msg: 'Unable to fetch Market Sale.' })
        }

        // Return sale confirmation
        res.status(200).json(sale);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Cannot retrieve Marketplace Sale.' });
    }
}

// Transaction between players
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
    const { buyerId, sellerId, saleId } = req.body;

    // Check if users exist
    let buyer = await User.findById(buyerId);
    const seller = await User.findById(sellerId);
    if (!buyer) {
        return res  
            .status(400)
            .json({ msg: 'Buyer user does not exist' })
    }

    if (!seller) {
        return res  
            .status(400)
            .json({ msg: 'Seller user does not exist' })
    }

    // Check if sale exists
    const sale = await MarketSale.findById(saleId);
    if (!sale) {
        return res
            .status(400)
            .json({ msg: 'Sale post does not exist' })
    }

    // Check if buyer has enough money
    if (buyer.money < sale.salePrice) {
        return res
            .status(400)
            .json({ msg: 'Not enough money for this transaction.' })
    }

    // Buying a Tank or a Component
    if (sale.itemType === 'tank') {
        try {         
            // Check if tank exists
            const tank = await Tank.findById(sale.itemId);
            if (!tank) {
                return res
                    .status(400)
                    .json({ msg: 'Tank does not exist' })
            }

            // Start transaction
            buyer = await User.findByIdAndUpdate(buyerId, { $inc: { money: (sale.salePrice * -1) } }, { new: true });
            await User.findByIdAndUpdate(sellerId, { $inc: { money: sale.salePrice } });
            await Tank.findByIdAndUpdate(sale.itemId, { $set: { userId: buyerId } });

            // Remove the sale from database
            await MarketSale.deleteOne({ id: saleId });

            // Return current buyer
            res.status(201).json(buyer);

        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Cannot make Market Transaction.' });
        }
    } else { 
        // Component 
        if (sale.itemType === 'component') {       
            try {
                // Start transaction
                buyer = await User.findByIdAndUpdate(buyerId, { $inc: { money: (sale.salePrice * -1) } }, { new: true });
                await User.findByIdAndUpdate(sellerId, { $inc: { money: sale.salePrice } });
                // Add items to buyer
                buyer['inventory']['tankComponents'][sale.itemId] += sale.amount;
                await buyer.save();

                // Remove the sale from database
                await MarketSale.deleteOne({ id: saleId });

                // Return current buyer
                res.status(201).json(buyer); 

            } catch (err) {
                console.error(err.message);
                res.status(500).json({ msg: 'Cannot make Market Transaction.' }); 
            }
        } else { // Casus Block
            try {
                // Start transaction
                buyer = await User.findByIdAndUpdate(buyerId, { $inc: { money: (sale.salePrice * -1) } }, { new: true });
                await User.findByIdAndUpdate(sellerId, { $inc: { money: sale.salePrice } });
                // Add items to buyer
                buyer['inventory']['casusBlocks'][sale.itemId] += sale.amount;
                await buyer.save();

                // Remove the sale from database
                await MarketSale.deleteOne({ id: saleId });

                // Return current buyer
                res.status(201).json(buyer); 

            } catch (err) {
                console.error(err.message);
                res.status(500).json({ msg: 'Cannot make Market Transaction.' }); 
            }            
        }
    }
}
