// @flow strict

import type { Request, Response } from 'express';

const { validationResult } = require('express-validator');

// npm library for elo calculations
const Elo = require('elo-js');
const eloRating = new Elo();

const User = require('../../models/userModel');
const BattleRecord = require('../../models/battleRecordModel');
const Tank = require('../../models/tankModel');

exports.prepareMatch1v1 = async (req: Request, res: Response) => {

	// Contains errors for failed validation.
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// Return 400 for a bad request
		return res
			.status(400)
			.json({ errors: errors.array() });
	}
	const { personBeingChallengedId, challengerTankId } = req.body;

	try {
		// Need to do query explicityly so that the returned doc isn't local to the try catch
		const personBeingChallengedUserDoc = await User.findById(personBeingChallengedId, 'money wager favoriteTank');

		if(personBeingChallengedUserDoc == null){
			return res
				.status(404)
				.json({ msg: 'Could not find the personBeingChallenged in DB'})
		}
		else if (personBeingChallengedUserDoc.wager === 0) { // Check that they have a wager set
			console.log('personBeingChallenged does not have a wager set')
			return res
				.status(400)
				.json({ msg: 'personBeingChallenged does not have a wager set'});
		}

		const personBeingChallengedTank = await Tank.findById(personBeingChallengedUserDoc.favoriteTank);

		if (personBeingChallengedTank == null) {
			return res
				.status(404)
				.json({ msg: "Could not find the personBeingChallenged's tank in DB"});
		}

		const challengerTank = await Tank.findById(challengerTankId);

		if (challengerTank == null) {
			return res
				.status(404)
				.json({ msg: "Could not find the challenger's Tank in DB"});
		}

		if (challengerTank.userId === personBeingChallengedId) {
			console.log('Cannot challenge self');
			return res
				.status(400)
				.json({ msg: 'Cannot challenge self'});
		}


		// Query the amount of money the challenger has
		const challengerUserDoc = await User.findById(challengerTank.userId, 'money');

		if (challengerUserDoc == null) {
			console.log('Could not find the challenger in DB');
			return res
				.status(404)
				.json({ msg: 'Could not find the challenger in DB'});
		}

		if (challengerUserDoc.money < personBeingChallengedUserDoc.wager) {
			console.log('Challenger does not have enough money to wager');
			return res
				.status(401)
				.json({ msg: 'Challenger does not have enough money to wager'});
		}

		const newRecord = new BattleRecord({
			userOne: personBeingChallengedId,
			userTwo: challengerTank.userId,
			'tankOne.tankName': personBeingChallengedTank.tankName,
			'tankOne.components': personBeingChallengedTank.components,
			'tankOne.casusCode': personBeingChallengedTank.casusCode,
			'tankTwo.tankName': challengerTank.tankName,
			'tankTwo.components': challengerTank.components,
			'tankTwo.casusCode': challengerTank.casusCode,
			winner: -1,
			prizeMoney: (personBeingChallengedUserDoc.wager * 2), // Each person puts in for the wager
			eloExchanged: 0
		});

		// Take the wager amount from the challenger's money
		const challengerBalance = challengerUserDoc.money - personBeingChallengedUserDoc.wager;
		challengerUserDoc.money = challengerBalance;

		// Disable the personBeingChallenged wager
		personBeingChallengedUserDoc.wager = 0;
		await personBeingChallengedUserDoc.save();

		// Save the updated balance to the db
		await challengerUserDoc.save();

		await newRecord.save ((err: Error) => {
			if (err) {
				console.error(err.message);
				return res
					.status(500)
					.json({ msg: 'Unable to save battle record to DB.' });
			}
			else{
				console.log('Match successfully created!');
				return res
					.status(200)
					.send(newRecord._id);
			}
		});
	} catch (err) {
		return res
			.status(500)
			.json({ msg: 'Server Error'});
	}
}

exports.prepareMatch3v3 = async (req: Request, res: Response) => {
	// Checks that we have received the correct body from the frontend 
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// Return 400 for a bad request
		return res
			.status(400)
			.json({ errors: errors.array() });
	}

	const { personBeingChallengedId, challengerTankIds } = req.body;


	try {
		// Holds the array of each tank
		const tankTeamOne = [];
		const tankTeamTwo = [];
	
		const personBeingChallenged = await User.findById(personBeingChallengedId);

		if (personBeingChallenged == null) {
			console.log('Could not find personBeingChallenged in DB');
			return res
				.status()
				.json({ msg: 'Could not find user being challenged'});
		} else if (personBeingChallenged.wager === 0) { // Check that they have a wager set
			console.log('personBeingChallenged does not have a wager set')
			return res
				.status(400)
				.json({ msg: 'personBeingChallenged does not have a wager set'});
		}


		// Get the tank objects of the personBeingChallenged
		for (const tankId of personBeingChallenged.favoriteTanks) {
			const tank = await Tank.findById(tankId, 'tankName components casusCode');

			if (tank == null){
				return res
					.status(404)
					.json({ msg: 'Could not find one of the tanks of personBeingChallenged'});
			}
			tankTeamOne.push(tank);
		}
		// Get the tank objects of the challenger
		for (const tankId of challengerTankIds) {
			const tank = await Tank.findById(tankId, 'tankName components casusCode');

			if (tank == null) {
				return res
					.status(404)
					.json({ msg: 'Could not find one of the tanks of the challenger'});
			}
			tankTeamTwo.push(tank);
		}

		// Shouldnt need to check if null since we queried this earlier
		// Also we need to do this so we can query the challenger user doc
		const challengerId = await Tank.findById(challengerTankIds[0], 'userId');

		// Need to see how much money they have
		const challenger = await User.findById(challengerId.userId, 'money');

		if (challenger == null) {
			console.log('Could not find the challenger in DB');
			return res
				.status(404)
				.json({ msg: 'Could not find the challenger in DB'});
		}
		// Make sure they have enuf for the wager
		if (challenger.money < personBeingChallenged.wager) {
			console.log('Challenger does not have enough money to wager');
			return res
				.status(401)
				.json({ msg: 'Challenger does not have enough money to wager'});
		}

		const newRecord = new BattleRecord({
			userOne: personBeingChallengedId,
			userTwo: challengerId.userId,
			tankTeamOne: tankTeamOne,
			tankTeamTwo: tankTeamTwo,
			winner: -1,
			prizeMoney: (personBeingChallenged.wager * 2), // Each person puts in for the wager
			eloExchanged: 0
		});

		// Take the wager amount from the challenger's money
		const challengerBalance = challenger.money - personBeingChallenged.wager;
		challenger.money = challengerBalance;

		// Disable the personBeingChallenged wager
		personBeingChallenged.wager = 0;
		await personBeingChallenged.save();

		// Save the updated balance to the db
		await challenger.save();

		await newRecord.save ((err: Error) => {
			if (err) {
				console.error(err.message);
				return res
					.status(500)
					.json({ msg: 'Unable to save battle record to DB.' });
			}
			else{
				console.log('Match successfully created!');
				return res
					.status(200)
					.send(newRecord._id);
			}
		});
	} catch (err) {
		return res
			.status(500)
			.json({ errors: err });
	}
}

exports.reportResults = async (req: Request, res: Response) => {
	// Checks that we have received the correct body from the frontend 
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// Return 400 for a bad request
		return res
			.status(400)
			.json({ errors: errors.array() });
	}

	const { winner, battleId } = req.body;

	try {
		const battle = await BattleRecord.findById(battleId);

		if (battle == null) {
			console.log('battle not found');
			return res
				.status(404)
				.json({ msg: 'Could not find battle'});
		}
		else if (battle.winner !== -1) { // Check if battle has already been reported
			if (battle.winner === winner) {
				console.log('Match already reported');
				return res
					.status(200)
					.send(battle);
			}
			else { // Different results reported
				console.log('Uh oh, these results do not match!');
				return res
					.status(400)
					.json({ msg: 'Match results do not match'});
			}
		}

		if (winner === 0) { // tie
			// Update the ties for user stats, users get back half their wager .7 of their wager money which is .35 of the prizemoney
			const userOne = await User.findByIdAndUpdate(battle.userOne, { $inc: { money: Math.ceil(battle.prizeMoney * .35), 'stats.ties' : 1 } }, {new: true});
			const userTwo = await User.findByIdAndUpdate(battle.userTwo, { $inc: { money: Math.ceil(battle.prizeMoney * .35), 'stats.ties' : 1 } }, {new: true});

			if (userOne == null) {
				console.log('userOne not found');
				return res
					.status(404)
					.json({ msg: 'Could not find userOne'});
			}
			else if (userTwo == null){
				console.log('userTwo not found');
				return res
					.status(404)
					.json({ msg: 'Could not find userTwo'});
			}
	
			const newUserOneElo = eloRating.ifTies(userOne.stats.elo, userTwo.stats.elo);
			const newUserTwoElo = eloRating.ifTies(userTwo.stats.elo, userOne.stats.elo);
			
			// We want eloExchanged to be a positive value so we take whoever's increased and subtract 
			if (userOne.stats.elo > userTwo.stats.elo) {
				const eloExchanged = userOne.stats.elo - newUserOneElo;
				battle.eloExchanged = eloExchanged;
			} else {
				const eloExchanged = userTwo.stats.elo - newUserTwoElo;
				battle.eloExchanged = eloExchanged;

			}
			

			userOne.stats.elo = newUserOneElo;
			userTwo.stats.elo = newUserTwoElo;

			battle.winner = winner;

			// Save battle winner and users money
			await userOne.save();
			await userTwo.save();
			await battle.save();
		}
		else if (winner === 1) { // userOne victory

			// Update money and wins for user one
			const userOne = await User.findByIdAndUpdate(battle.userOne, { $inc: { money : battle.prizeMoney, 'stats.wins' : 1 } }, {new: true});

			if (userOne == null) {
				console.log('userOne not found')
				return res
					.status(404)
					.json({ msg: 'Could not find userOne'});
			}

			// Update money and losses for user two
			const userTwo = await User.findByIdAndUpdate(battle.userTwo, { $inc: { 'stats.losses' : 1 } }, {new: true});

			if (userTwo == null) {
				console.log('userTwo not found')
				return res
					.status(404)
					.json({ msg: 'Could not find userTwo'});
			}

			// Calculate new elo values, returns the value of the player in the first parameter
			const newUserOneElo = eloRating.ifWins(userOne.stats.elo, userTwo.stats.elo);
			const newUserTwoElo = eloRating.ifLoses(userTwo.stats.elo, userOne.stats.elo);

			const eloExchanged = newUserOneElo - userOne.stats.elo;

			userOne.stats.elo = newUserOneElo;
			userTwo.stats.elo = newUserTwoElo;

			battle.eloExchanged = eloExchanged;
			battle.winner = winner;

			// Save elo updates
			await battle.save();
			await userOne.save();
			await userTwo.save();
		}
		else if (winner === 2) { // userTwo victory
			// Update money and losses for user one
			const userOne = await User.findByIdAndUpdate(battle.userOne, { $inc: { 'stats.losses' : 1 } }, {new: true});

			if (userOne == null) {
				console.log('userOne not found')
				return res
					.status(404)
					.json({ msg: 'Could not find userOne'});
			}

			// Update money and wins for user two
			const userTwo = await User.findByIdAndUpdate(battle.userTwo, { $inc: { money : battle.prizeMoney, 'stats.wins' : 1 } }, {new: true});

			if (userTwo == null) {
				console.log('userTwo not found')
				return res
					.status(404)
					.json({ msg: 'Could not find userTwo'});
			}

			// Calculate new elo values, returns the value of the player in the first parameter
			const newUserOneElo = eloRating.ifLoses(userOne.stats.elo, userTwo.stats.elo);
			const newUserTwoElo = eloRating.ifWins(userTwo.stats.elo, userOne.stats.elo);

			const eloExchanged = newUserTwoElo - userTwo.stats.elo;

			userOne.stats.elo = newUserOneElo;
			userTwo.stats.elo = newUserTwoElo;

			battle.eloExchanged = eloExchanged;
			battle.winner = winner;

			// Save elo updates
			await battle.save();
			await userOne.save();
			await userTwo.save();
		}
		else { // Invalid victor
			console.error('Number not expected: please enter either 0 in the event of a tie, 1 in the event the personBeingChallenged is the victor, or 2 in the event the challenger is the victor');
			return res
				.status(400)
				.json({ msg: 'Bad Request'});
		}

		console.log('All documents updated successfully! BattleRecord complete');
		return res
			.status(200)
			.send(battle);

	} catch (err) {
		console.error('Update failed')
		return res
			.status(500)
			.json({ msg: 'Server Error'});
	}

}

exports.getMatch = async (req: Request, res: Response) => {
    // Checks that we have received the correct body from the frontend 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Return 400 for a bad request
        return res
            .status(400)
            .json({ errors: errors.array() });
    }   

    // Deconstruct
    const { matchId } = req.params;
    
    // Check if match record exists
    const match = await BattleRecord.findById(matchId);
    if (!match) {
        console.error('Could not find match');
        return res.status(400).json({ msg: 'Cannot find match.' });
    }

    // Success message and returns match
    console.log('Match successfully retrieved!');
    return res.status(200).send(match);
}
