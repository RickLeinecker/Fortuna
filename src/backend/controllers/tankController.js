// @flow strict

const User = require('../../models/userModel');
const Tank = require('../../models/tankModel');

const { validationResult } = require('express-validator');

// Flow type import
import type { Request, Response } from 'express';


exports.getFavorite = async (req: Request, res: Response) => {
	await User.findById(req.user.id, 'favoriteTank', (err: Error, foundUser: User) => {
		if (err) {
			console.error(err.message);

			return res
				.status(500)
				.json({ msg: 'Could not find user in DB'});
		} 
		else {
			console.log('Favorite retrieved');
			return res
				.status(200)
				.send(foundUser.favoriteTank);
		}
	});
}

exports.favoriteTank = async (req: Request, res: Response) => {
	// the 'new' option means return the document after it has been updated
	await User.findOneAndUpdate( { _id: req.user.id }, {favoriteTank : req.body.favoriteTank }, {new :true}, (err: Error, foundUser: User) => {
		if (err) {
			console.error(err.message);

			return res
				.status(500)
				.json({ msg: 'Could not update user favoriteTank'});
		} 
		else {
			console.log('Tank favorited!');
			return res
				.status(200)
				.send(foundUser.favoriteTank);
		}
	});
}

exports.userTanks = async (req: Request, res: Response) => {
	await Tank.find({ userId: req.user.id }, (err: Error, tanks: Array<Tank>) => {
		if (err) {
			console.error(err.message)

			return res
				.status(404)
				.json({ msg: 'tank not found in DB'});
		} 
		else {
			console.log("Here are that user's tanks");

			return res
				.status(200)
				.send(tanks);
		}
	});
}

exports.assignTank = async (req: Request, res: Response) => {
	const tank = new Tank();
	tank.userId = req.user.id;
	tank.tankName = req.body.tankName;
	await tank.save((err: Error) => {
        if (err) {
			console.error(err.message);

            return res
                .status(500)
                .json({ msg: 'Unable to save tank to DB.' });
		} 
		else {
			console.log('Tank successfully saved to DB');
			return res
				.status(200)
				.send(tank);
        }
    });
}

exports.tankUpdate = async (req: Request, res: Response) => {

	// Check if all the fields are input correctly from the frontend
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// 400 is a bad request
		console.log('bad request');

		return res
			.status(400)
			.json({ errors: errors.array() });
	}
	
	// Parse body
	const { tankName, userId, components, isBot } = req.body;

	await Tank.findByIdAndUpdate(req.params.tankId, { tankName: tankName, userId: userId, components: components, isBot: isBot }, {new: true}, (err: Error, tank: Tank) => {
		if (err) {
			console.error(err.message);

			return res
				.status(404)
				.json({ msg: 'Could not update tank'})
		}
		else {
			console.log('Tank successfully updated!');

			return res
				.status(200)
				.send(tank);
		}
	});
}

exports.casusUpdate = async (req: Request, res: Response) => {

	//check if all the fields are input correctly from the frontend
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// 400 is a bad request
		console.log('Bad request');

		return res
			.status(400)
			.json({ errors: errors.array() });
	}

	await Tank.findByIdAndUpdate(req.params.tankId, { casusCode: req.body.casusCode }, {new: true}, (err: Error, tank: Tank) => {
		if (err) {
			console.error(err.message);

			return res
				.status(404)
				.json({ msg: 'Could not update casusCode'})
		}
		else {
			console.log('casusCode successfully updated!');

			return res
				.status(200)
				.send(tank);
		}
	});
}
