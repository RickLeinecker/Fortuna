// @flow strict

// Flow type import
import type { Request, Response } from 'express';

const User = require('../../models/userModel');
const Tank = require('../../models/tankModel');

const { validationResult } = require('express-validator');

exports.getFavorite = async (req: Request, res: Response) => {
	await User.findById(req.user.id, 'favoriteTankId', (err: Error, myUser: User) => {
		if(err) {
			res.send(err);
			console.log('could not find user');
		} 
		else {
			res.send(myUser.favoriteTankId);
			console.log('Retrieved Favorite Tank.');
		};
	});
}

exports.favoriteTank = async (req: Request, res: Response) => {
	// the 'new' option means return the document after it has been updated
	await User.findOneAndUpdate( { _id: req.user.id }, {favoriteTankId : req.body.favoriteTankId}, {'new':true }, (err: Error, result: User) => {
		if(err) {
			res.status(500).send(err);
			console.error(err);
		}
		else {
			res.send(result.favoriteTankId);
			console.log('Updated favorite tank.');
		}
	});
}

exports.userTanks = async (req: Request, res: Response) => {
	await Tank.find({ userId: req.user.id }, (err: Error, tanks: Array<Tank>) => {
		if(err) {
			res.send(err);
			console.error(err.message);
		}
		else {
			res.send(tanks);
			console.log('Retrieved user\'s tanks.');
		}
	});
}

exports.assignTank = async (req: Request, res: Response) => {
	const tank = new Tank();
	tank.userId = req.user.id;
	tank.tankName = req.body.tankName;
	await tank.save((err: Error) => {
		if (err) {
			res.send(err);
			console.error(err.message);
		}
	});
	res.status(201).send(tank);
	console.log('Successfully created a tank.')
}

exports.tankUpdate = async (req: Request, res: Response) => {

	// Check if all the fields are input correctly from the frontend
	const errors = validationResult(req);

	if(!errors.isEmpty()){
		// 400 is a bad request
		return res
			.status(400)
			.json({ errors: errors.array() });
	}

	await Tank.findById(req.params.tankId, function (err, tank) {
		if (err){
			console.error(err.message);
			res.send(err);
		}
		// Update all fields of the tank except casus code
		tank.tankName = req.body.tankName;
		tank.userId = req.body.userId;
		tank.components = req.body.components;
		tank.isBot = req.body.isBot;
		tank.save((err: Error) => {
			if (err) {
				console.error(err.message);
				res.send(err);
			}
		});
		res.status(200).send(tank);
		console.log('Successfully updated tank.')
	});
}

exports.casusUpdate = async (req: Request, res: Response) => {

	//check if all the fields are input correctly from the frontend
	const errors = validationResult(req);

	if(!errors.isEmpty()){
		// 400 is a bad request
		return res
			.status(400)
			.json({ errors: errors.array() });
	}

	await Tank.findById(req.params.tankId, function (err, tank) {
		if (err){
			console.error(err.message);
			res.send(err);
		}
		// Update the casus code
		tank.casusCode = req.body.casusCode;
		tank.save((err: Error) => {
			if (err) {
				console.error(err.message);
				res.send(err);
			}
		});
		res.status(200).send(tank);
		console.log('Successfully updated tank Casus code.')
	});

}
