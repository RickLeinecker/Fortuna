// @flow strict

// Package Imports
import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';

// MarketplaceSale Model, User Model, Tank Model
import MarketSale from '../../models/marketSaleModel';
import User from '../../models/userModel';
import Tank from '../../models/tankModel';

// Master Seller Account
const MASTER_ID = process.env.MASTER_SELLER;

// Adds a Marketplace Sale
// Different branches depending the itemType
exports.addMarketSale = async (req: Request, res: Response) => {
    // Contains errors for failed validation.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Return 400 for a bad request
        return res
            .status(400)
            .json({ errors: errors.array() });
    }

    // Deconstructing information from request body
    // Note: Depending on the itemType, if it is a tank,
    // itemID is the ObjectId of the tank, otherwise it is
    // the string identifier of the component/Casus block equivalent
    // to the property in the User Model.
    const { sellerId, salePrice, itemId, itemType, amount } = req.body;

    // If the item is a tank
    if (itemType === 'tank') {
        try {
            // Check if tank is actually owned by user
            // Also acts as a way to check if user is real
            let tank = await Tank.findOne({ _id: itemId, userId: sellerId });
            if (!tank) {
                return res
                    .status(400)
                    .json({ msg: 'Tank does not exist under this user.' });
            }

            // Check if this the only tank left for the user
            const tankList = await Tank.find({ userId: sellerId });
            if (!tankList) {
                console.error('Could not get list of user tanks.');
                return res.status(500).json({ msg: 'Could not find list of user tanks.' });
            }

            // tankList is an array of the objects, so you can access the length property
            if (tankList.length === 1) {
                console.error('This is the last tank of the user.');
                return res.status(500).json({ msg: 'You cannot delete your last tank.' });
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

            // Mark tank as being sold (give temporary ownership to master account) and save change to DB
            tank.userId = MASTER_ID;
            await tank.save((err: Error) => {
                if (err) {
                    console.error(err.message);
                    return res
                        .status(500)
                        .json({ msg: 'Failed to save tank to DB.' });
                }
            });

            // Save the sale to DB
            await sale.save((err: Error) => {
                if (err) {
                    console.error(err.message);
                    return res
                        .status(500)
                        .json({ msg: 'Failed to save Marketplace Sale.' });
                }
            });

            // Send back success confirmation
            return res.status(201).json({ msg: 'Successfully created Tank Market Sale.' });

        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ msg: 'Unable to add Market Sale.' });
        }
    } else { // If the item is a component or casus block
        try {
            // Check if user exists
            let user = await User.findById(sellerId);
            if (!user) {
                return res
                    .status(400)
                    .json({ msg: 'User not found in DB' });
            }

            if (itemType === 'component') { // Components
                // Check if the referenced field is valid
                const userItem = user['inventory']['tankComponents'][itemId];
                if (!userItem) {
                    return res
                        .status(400)
                        .json({ msg: 'Invalid Tank Component' });
                }

                // If field is valid, check if the user has the right number
                // of items to sell
                if (userItem < amount) {
                    return res
                        .status(400)
                        .json({ msg: 'User does not have enough of this item to sell' });
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
                await user.save((err: Error) => {
                    if (err) {
                        console.error(err.message);
                        return res
                            .status(500)
                            .json({ msg: 'Failed to save user changes to DB.' });
                    }
                });

                // Add the new sale to the DB.
                await sale.save((err: Error) => {
                    if (err) {
                        console.error(err.message);
                        return res
                            .status(500)
                            .json({ msg: 'Failed to save Marketplace Sale.' });
                    }
                });

                // Send back success confirmation
                return res.status(201).json({ msg: 'Successfully created Component Market Sale.' });
            } else { // Casus Blocks
                // Check if the referenced field is valid
                const userItem = user['inventory']['casusBlocks'][itemId];
                if (!userItem) {
                    return res
                        .status(400)
                        .json({ msg: 'Invalid Casus Block' });
                }

                // If field is valid, check if the user has the right number
                // of items to sell                
                if (userItem < amount) {
                    return res
                        .status(400)
                        .json({ msg: 'User does not have enough of this item to sell' });
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
                await user.save((err: Error) => {
                    if (err) {
                        console.error(err.message);
                        return res
                            .status(500)
                            .json({ msg: 'Failed to save user changes to DB.' });
                    }
                });

                // Add the new sale to the DB.
                await sale.save((err: Error) => {
                    if (err) {
                        console.error(err.message);
                        return res
                            .status(500)
                            .json({ msg: 'Failed to save Marketplace Sale.' });
                    }
                });

                // Send back success confirmation
                return res.status(201).json({ msg: 'Successfully created Casus Block Market Sale.' });
            }

        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ msg: 'Unable to add Market Sale.' });
        }
    }
}

// Gets all Marketplace Sales of the user that are active
exports.getUsersMarketSales = async (req: Request, res: Response) => {
    // Validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Return 400 for a bad request
        return res
            .status(400)
            .json({ errors: errors.array() });
    }

    // Deconstruct userId from parameter
    const { userId } = req.params;

    try {
        // Check if valid user
        const user = await User.findById(userId);
        if (!user) {
            return res
                .status(400)
                .json({ msg: 'User does not exist' });
        }

		// Get list of sales from DB that belong to logged in user
		const salesListOfTanks = await MarketSale.find({ sellerId: { $eq: "" + userId + "" }, itemType: { $eq: 'tank' }}).populate('itemId', 'tankName');
		const salesListOfComponents = await MarketSale.find({ sellerId: { $eq: userId }, itemType: { $eq: 'component' }});
		const salesList = [];
		salesList.push(salesListOfTanks);
		salesList.push(salesListOfComponents);
		/*for(let eachSale in salesList) {
			if(salesListOfComponents[eachSale].sellerId == userId) {
				salesListWithUserOnly.push(salesListOfComponents[eachSale]);
			}
		}*/
        if (!salesList) {
            return res
                .status(400)
                .json({ msg: 'Unable to get list of Market Sales.' });
        }

        // Return list of sales
		console.log('Retrieved User\'s Market Sales List.');
        return res.status(200).json(salesList);

    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Unable to find list of Sales.' });
    }
}

// Gets all Marketplace Sales
exports.getMarketSales = async (req: Request, res: Response) => {
    // Validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Return 400 for a bad request
        return res
            .status(400)
            .json({ errors: errors.array() });
    }

    // Deconstruct userId from parameter
    const { userId } = req.params;

    try {
        // Check if valid user
        const user = await User.findById(userId);
        if (!user) {
            return res
                .status(400)
                .json({ msg: 'User does not exist' });
        }
		
		// Get list of sales from DB that do not belong to logged in user
        const salesList = await MarketSale.find({ sellerId: { $ne: userId } });
        if (!salesList) {
            return res
                .status(400)
                .json({ msg: 'Unable to get list of Market Sales.' });
        }

        // Return list of sales
        console.log('Retrieved Market Sale List.');
        return res.status(200).json(salesList);

    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Unable to find list of Sales.' });
    }
}

// Gets all Tank Marketplace Sales not belonging to the user
exports.getTankMarketSales = async (req: Request, res: Response) => {
    // Validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Return 400 for a bad request
        return res
            .status(400)
            .json({ errors: errors.array() });
    }

    // Deconstruct userId from parameter
    const { userId } = req.params;

    try {
        // Check if valid user
        const user = await User.findById(userId);
        if (!user) {
            return res
                .status(400)
                .json({ msg: 'User does not exist' });
        }

        // Get list of tank sales from DB that do not belong to logged in user
        const salesList = await MarketSale.find({ sellerId: { $ne: userId }, itemType: { $eq: 'tank' } })
            .populate('itemId', 'tankName');
        if (!salesList) {
            return res
                .status(400)
                .json({ msg: 'Unable to get list of Tank Market Sales.' });
        }

        // Return list of sales
        console.log('Retrieved Tank Market Sale List.');
        return res.status(200).json(salesList);

    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Unable to find list of Tank Sales.' });
    }
}

// Gets a single Marketplace Sale
exports.getMarketSale = async (req: Request, res: Response) => {
    try {
        // Get market sale from DB
        const sale = await MarketSale.findById(req.body.saleId);
        if (!sale) {
            return res
                .status(400)
                .json({ msg: 'Unable to fetch Market Sale.' });
        }

        // Return sale confirmation
        console.log('Retrieved Marketplace Sale.');
        return res.status(200).json(sale);
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Cannot retrieve Marketplace Sale.' });
    }
}

// Transaction between players
exports.marketTransaction = async (req: Request, res: Response) => {
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
            .json({ msg: 'Buyer user does not exist' });
    }

    if (!seller) {
        return res
            .status(400)
            .json({ msg: 'Seller user does not exist' });
    }

    // Check if sale exists
    const sale = await MarketSale.findById(saleId);
    if (!sale) {
        return res
            .status(400)
            .json({ msg: 'Sale post does not exist' });
    }

    // Check if buyer has enough money
    if (buyer.money < sale.salePrice) {
        return res
            .status(400)
            .json({ msg: 'Not enough money for this transaction.' });
    }

    // Buying a Tank or a Component
    // Note: Depending on the itemType, if it is a tank,
    // itemID is the ObjectId of the tank, otherwise it is
    // the string identifier of the component/Casus block equivalent
    // to the property in the User Model.
    if (sale.itemType === 'tank') {
        try {
            // Check if tank exists
            const tank = await Tank.findById(sale.itemId);
            if (!tank) {
                return res
                    .status(400)
                    .json({ msg: 'Tank does not exist' });
            }

            // Start transaction
            buyer = await User.findByIdAndUpdate(buyerId, { $inc: { money: (sale.salePrice * -1) } }, { new: true });
            if (!buyer) {
                console.error('Could not update buyer');
                return res
                    .status(500)
                    .json({ msg: 'Could not update buyer' });
            }
            await User.findByIdAndUpdate(sellerId, { $inc: { money: sale.salePrice } });
            // Update tank ownership
            await Tank.findByIdAndUpdate(sale.itemId, { $set: { userId: buyerId } }, (err: Error) => {
                if (err) {
                    console.error(err.message);
                    return res
                        .status(500)
                        .json({ msg: 'Could not update tank ownership.' });
                }
            });

            // Remove the sale from database
            await MarketSale.deleteOne({ _id: saleId }, (err: Error) => {
                if (err) {
                    console.error(err.message);
                    return res
                        .status(500)
                        .json({ msg: 'Could not delete sale from database.' });
                }
            });

            // Return current buyer
            console.log('Successfully Bought Tank.');
            return res.status(201).json(buyer);

        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ msg: 'Cannot make Market Transaction.' });
        }
    } else {
        // Component 
        if (sale.itemType === 'component') {
            try {
                // Start transaction
                buyer = await User.findByIdAndUpdate(buyerId, { $inc: { money: (sale.salePrice * -1) } }, { new: true });
                if (!buyer) {
                    console.error('Could not update buyer');
                    return res
                        .status(500)
                        .json({ msg: 'Could not update buyer' });
                }
                await User.findByIdAndUpdate(sellerId, { $inc: { money: sale.salePrice } });
                // Add items to buyer
                buyer['inventory']['tankComponents'][sale.itemId] += sale.amount;
                await buyer.save((err: Error) => {
                    if (err) {
                        console.error(err.message);
                        return res
                            .status(500)
                            .json({ msg: 'Could not update buyer inventory.' });
                    }
                });

                // Remove the sale from database if it does not belong to master account
                if (sellerId !== String(MASTER_ID)) {
                    console.log('Sale belongs to a user. Deleting.');
                    await MarketSale.deleteOne({ _id: saleId }, (err: Error) => {
                        if (err) {
                            console.error(err.message);
                            return res
                                .status(500)
                                .json({ msg: 'Could not delete market sale.' });
                        }
                    });
                } else {
                    console.log('Sale belongs to master account. Not deleting.')
                }

                // Return current buyer
                console.log('Successfully Bought Component(s)');
                return res.status(201).json(buyer);

            } catch (err) {
                console.error(err.message);
                return res.status(500).json({ msg: 'Cannot make Market Transaction.' });
            }
        } else { // Casus Block
            try {
                // Start transaction
                buyer = await User.findByIdAndUpdate(buyerId, { $inc: { money: (sale.salePrice * -1) } }, { new: true });
                if (!buyer) {
                    console.error('Could not update buyer');
                    return res
                        .status(500)
                        .json({ msg: 'Could not update buyer' });
                }
                await User.findByIdAndUpdate(sellerId, { $inc: { money: sale.salePrice } });
                // Add items to buyer
                buyer['inventory']['casusBlocks'][sale.itemId] += sale.amount;
                await buyer.save((err: Error) => {
                    if (err) {
                        console.error(err.message);
                        return res
                            .status(500)
                            .json({ msg: 'Could not update buyer inventory.' });
                    }
                });

                // Remove the sale from database if it does not belong to master account
                if (sellerId !== String(MASTER_ID)) {
                    console.log('Sale belongs to a user. Deleting.');
                    await MarketSale.deleteOne({ _id: saleId }, (err: Error) => {
                        if (err) {
                            console.error(err.message);
                            return res
                                .status(500)
                                .json({ msg: 'Could not delete market sale.' });
                        }
                    });
                } else {
                    console.log('Sale belongs to master account. Not deleting.')
                }

                // Return current buyer
                console.log('Successfully Bought Casus Block(s)');
                return res.status(201).json(buyer);

            } catch (err) {
                console.error(err.message);
                return res.status(500).json({ msg: 'Cannot make Market Transaction.' });
            }
        }
    }
}

// Removes a sale from the uses
exports.removeAMarketSale = async (req: Request, res: Response) => {
	
    // Validation
    const errors = validationResult(req);
	
    if (!errors.isEmpty()) {
        // Return 400 for a bad request
        return res
            .status(400)
            .json({ errors: errors.array() });
    }

    // Deconstruct request body
	const { saleId } = req.body;

    // Check if sale exists
    const sale = await MarketSale.findById(saleId);
    if (!sale) {
        return res
            .status(400)
            .json({ msg: 'Sale post does not exist' });
	}
	
	try {
		await MarketSale.deleteOne({ _id: saleId }, (err: Error) => {
			if (err) {
				console.error(err.message);
				return res
					.status(500)
					.json({ msg: 'Could not delete market sale.' });
			}
		});
		// Return status
		console.log('Successfully Removed Sale');
		return res.status(201).json({ msg: 'Removed Sale'});

	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Cannot Remove Sale' });
	}
}