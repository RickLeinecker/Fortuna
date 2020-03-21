// @flow strict

// Required imports
import { validationResult } from 'express-validator';
import type { Request, Response } from 'express';

// Model imports
import User from '../../models/userModel';
import BattleRecord from '../../models/battleRecordModel';

exports.getReplayList = async (req: Request, res: Response) => {
    // Gather any errors from the route checking
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Return 400 as a bad request
        return res
            .status(400)
            .json({ errors: errors.array() })
    }

    // Deconstruct body
    const { userId } = req.body;
    
    // Check if user exists
    const userCheck = await User.findById(userId);
    if (!userCheck) {
        return res
            .status(400)
            .json({ msg: 'Cannot find user.' })
    }

    // If user exists, can attempt to get list of records
    // Note: query and use populate('field that has the ObjectID', [array of properties to only show])
    try {
        const records = await BattleRecord.find({ $or: [{ userOne: userId }, { userTwo: userId }] })
            .populate('userOne userTwo', 'userName');
        if (!records) {
            return res
                .status(400)
                .json({ msg: 'Unable to find any battle records for user.' })
        }

        // Return the list of records
        res.status(200).json(records);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });        
    }
}
