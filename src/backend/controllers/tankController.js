// @flow strict

const User = require('../../models/userModel');
const Tank = require('../../models/tankModel');

const { validationResult } = require('express-validator');

// Flow type import
import type { Request, Response } from 'express';


exports.getFavorite = async (req: $Request, res: $Response) => {
	await User.findById(req.user.id, 'favoriteTankId', (err: Error, myUser: User) => {
		if(err) {
			return res
				.status(500)
				.send(err);
		} 
		else {
			return res
				.status(200)
				.send(myUser.favoriteTankId);
		}
	});
}

exports.favoriteTank = async (req: $Request, res: $Response) => {
	// the 'new' option means return the document after it has been updated
	// the 'useFindAndModify' is just so it doesnt throw a deprecation warning
	await User.findOneAndUpdate( { _id: req.user.id }, {favoriteTank : req.body.favoriteTankId}, {'new':true}, (err: Error, result: User) => {
		if(err) {
			return res
				.status(500)
				.send(err);
		} 
		else {
			return res
				.status(200)
				.send(result.favoriteTank);
		}
	});
}

exports.userTanks = async (req: $Request, res: $Response) => {
	await Tank.find({ userId: req.user.id }, (err: Error, tanks: Array<Tank>) => {
		if(err) {
			res.send(err);
		} 
		else {
			res.send(tanks);
		}
	});
}

exports.assignTank = async (req: $Request, res: $Response) => {
	const tank = new Tank();
	tank.userId = req.user.id;
	tank.tankName = req.body.tankName;
	await tank.save((err: Error) => {
        if (err){
            return res
                .status(500)
                .json({ msg: 'Unable to save tank to DB.' });
		} 
		else {
            return res
                .status(200)
                .send(tank)
                .json({ msg: 'Tank successfully saved to DB!'});
        }
    });
}

exports.tankUpdate = async (req: $Request, res: $Response) => {

	// Check if all the fields are input correctly from the frontend
	const errors = validationResult(req);

	if(!errors.isEmpty()){
		// 400 is a bad request
		return res
			.status(400)
			.json({ errors: errors.array() });
	}

	const tank = Tank.findById(req.params.tankId);

	if(!tank){
		return res
			.status(400)
			.json({ msg: 'Could not find tank in DB' });
	}
	else {
		tank.tankName = req.body.tankName;
		tank.userId = req.body.userId;
		tank.components = req.body.components;
		tank.isBot = req.body.isBot;
		await tank.save((err: Error) => {
			if (err) {
				return res
					.status(500)
					.json({ msg: 'Failed to update tank' });
			}
			else {
				return res
					.status(200)
					.send(tank)
					.json({ msg: 'Tank successfuly updated!'});
			}
		});
	}
}

exports.casusUpdate = async (req: $Request, res: $Response) => {

	//check if all the fields are input correctly from the frontend
	const errors = validationResult(req);

	if(!errors.isEmpty()){
		// 400 is a bad request
		return res
			.status(400)
			.json({ errors: errors.array() });
	}

	const tank = Tank.findById(req.params.tankId);

	if (!tank){
		return res
			.status(400)
			.json({ msg: 'Could not find tank in DB' });
	}
	else {
		tank.casusCode = req.body.casusCode;
		await tank.save((err: Error) => {
			if (err) {
				return res
					.status(500)
					.json({ msg: 'Failed to save casusCode to DB.' });
			}
			else {
				return res
					.status(200)
					.send(tank)
					.json({ msg: 'casusCode successfully updated!'});
			}
		});
	}
}
