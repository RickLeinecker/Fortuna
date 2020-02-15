// @flow strict

// Package Imports
import type {
    $Request,
    $Response,
    NextFunction,
    Middleware
} from 'express';

// MarketplaceSale Model
import MarketSale from '../../models/marketSaleModel';

exports.getMarketSales = async (req: $Request, res: $Response) => {
    try {
        const salesList = await MarketSale.find();
        res.json(salesList);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Unable to find list of sales' });
    }
}