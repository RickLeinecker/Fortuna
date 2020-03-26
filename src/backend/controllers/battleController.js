// @flow strict

const { validationResult } = require('express-validator');

import type { Request, Response } from 'express';

// npm library for elo calculations
const EloRating = require('elo-rating');

const User = require('../../models/userModel');
const BattleRecord = require('../../models/battleRecordModel');
const Tank = require('../../models/tankModel');

exports.prepareMatch = async (req: Request, res: Response) => {

    // Contains errors for failed validation.
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
       // Return 400 for a bad request
       return res
           .status(400)
           .json({ errors: errors.array() });
   }
   const { challengeeId, challengerTankId } = req.body;

   try{
    // Need to do query explicityly so that the returned doc isn't local to the try catch
    const challengeeUserDoc = await User.findById(challengeeId, 'favoriteTank wager money stats.elo');

    if(challengeeUserDoc == null){
        return res
            .status(404)
            .json({ msg: 'Could not find the challengee in DB'})
    }

    if(challengeeUserDoc.money < challengeeUserDoc.wager){
        return res
            .status(401)
            .json({ msg: 'Challengee does not have enough money to wager'});
    }

    const challengeeTank = await Tank.findById(challengeeUserDoc.favoriteTank);

    if(challengeeTank == null){
        return res
            .status(404)
            .json({ msg: "Could not find the challengee's tank in DB"});
    }

    const challengerTank = await Tank.findById(challengerTankId);

    if(challengerTank == null){
        return res
            .status(404)
            .json({ msg: "Could not find the challenger's Tank in DB"});
    }

    // Query the amount of money the challenger has
    const challengerUserDoc = await User.findById(challengerTank.userId, 'money');

    if(challengerUserDoc == null){
        return res
            .status(404)
            .json({ msg: 'Could not find the challenger in DB'});
    }

    if(challengerUserDoc.money < challengeeUserDoc.wager){
        return res
            .status(401)
            .json({ msg: 'Challenger does not have enough money to wager'});
    }

    const newRecord = new BattleRecord({
        userOne: challengeeId,
        userTwo: challengerTank.userId,
        tankOne: challengeeTank,
        tankTwo: challengerTank,
        winner: -1,
        prizeMoney: challengeeUserDoc.wager
    });

    await newRecord.save((err: Error) => {
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
                .send(newRecord._id) // Can I do this?
        }
    });
   }catch(err){
       return res
               .status(500)
               .json({ msg: 'Server Error'});
   }
}

exports.reportResults = async (req, res) => 
{
    // Checks that we have received the correct body from the frontend 
    const errors = validationResult(req);

   if (!errors.isEmpty()) {
       // Return 400 for a bad request
       return res
           .status(400)
           .json({ errors: errors.array() });
   }

   const { winner, battleId } = req.body;

   try{
    const battle = await BattleRecord.findByIdAndUpdate(battleId, { winner : winner }, {new: true}, (err) => {
        if (err) {
            console.error(err.message);
            return res
             .status(500)
             .json({ msg: 'Failed up update battleRecord'});
        }
    });
 
    if (battle == null) {
        console.log('battle not found');
        return res
             .status(404)
             .json({ msg: 'Could not find battle'});
    }
 
    if (winner === 0) { // tie
        return res
            .json({ msg: 'This is a tie'});
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
        const userTwo = await User.findByIdAndUpdate(battle.userTwo, { $inc: { money : (battle.prizeMoney * -1), 'stats.losses' : 1 } }, {new: true});

        if (userTwo == null) {
            console.log('userOne not found')
            return res
                .status(404)
                .json({ msg: 'Could not find userTwo'});
        }

        // To calculate how much elo is being transferred
        const eloBefore = userOne.stats.elo;

        const elo = EloRating.calculate(userOne.stats.elo, userTwo.stats.elo);
        userOne.stats.elo = elo.playerRating;
        userTwo.stats.elo = elo.opponentRating;

        // Difference in elo from after the match and before the match
        battle.eloExchanged = userOne.stats.elo - eloBefore;

        // Save elo updates
        await battle.save();
        await userOne.save();
        await userTwo.save();
    }
    else if (winner === 2){ // userTwo victory
        // Update money and losses for user one
        const userOne = await User.findByIdAndUpdate(battle.userOne, { $inc: { money : (battle.prizeMoney * -1), 'stats.losses' : 1 } }, {new: true});

        if (userOne == null) {
            console.log('userOne not found')
            return res
                .status(404)
                .json({ msg: 'Could not find userOne'});
        }

        // Update money and wins for user two
        const userTwo = await User.findByIdAndUpdate(battle.userTwo, { $inc: { money : battle.prizeMoney, 'stats.wins' : 1 } }, {new: true});

        if (userTwo == null) {
            console.log('userOne not found')
            return res
                .status(404)
                .json({ msg: 'Could not find userTwo'});
        }

        // To calculate how much elo is being transferred
        const eloBefore = userOne.stats.elo;

        const elo = EloRating.calculate(userTwo.stats.elo, userOne.stats.elo);
        userOne.stats.elo = elo.opponentRating;
        userTwo.stats.elo = elo.playerRating;

        // Difference in elo from before the new elo was calculated and after
        battle.eloExchanged = eloBefore - userOne.stats.elo;

        // Save elo updates
        await battle.save();
        await userOne.save();
        await userTwo.save();
    }
    else { // Invalid victor
        console.error('Number not expected: please enter either 0 in the event of a tie, 1 in the event the challengee is the victor, or 2 in the event the challenger is the victor');
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