// @flow strict

// Required imports
import type { Request, Response } from 'express';

// Model imports
import User from '../../models/userModel';
import BattleRecord from '../../models/battleRecordModel';

exports.getReplayList = async (req: Request, res: Response) => {

	// Check if user exists
	const userCheck = await User.findById(req.user.id);
	if (!userCheck) {
		return res
			.status(400)
			.json({ msg: 'Cannot find user.' })
	}

	// If user exists, can attempt to get list of records
	// Note: query and use populate('field that has the ObjectID', [array of properties to only show])
	try {
		const records = await BattleRecord.find({ $or: [{ userOne: req.user.id }, { userTwo: req.user.id }] })
			.populate('userOne userTwo', 'userName');
		if (!records) {
			return res
				.status(400)
				.json({ msg: 'Unable to find any battle records for user.' })
		}

		// Return the list of records
		return res.status(200).json(records);

	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server Error' });        
	}
}
