// @flow strict

const { validationResult } = require('express-validator');

import type { Request, Response } from 'express';

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
    const challengeeUserDoc = await User.findById(challengeeId, 'favoriteTank wager money');

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

    const challengerUserDoc = await User.findById(challengerTank.userId);

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

    // elo needs to be calculated based on a complex formula which i have yet to implement =/
    const elo = 100;

    const newRecord = new BattleRecord({
        userOne: challengeeId,
        userTwo: challengerTank.userId,
        tankOne: challengeeTank,
        tankTwo: challengerTank,
        winner: -1,
        prizeMoney: challengeeUserDoc.wager,
        eloExchanged: elo
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
        const userOne = await User.findByIdAndUpdate(battle.userOne, { $inc: { money : battle.prizeMoney, 'stats.wins' : 1, 'stats.elo' : battle.eloExchanged } }, {new: true}, (err) => {
            if (err) {
                console.error(err.message);
                return res
                    .status(500)
                    .json({ msg: 'Failed to update userOne'});
            }
        });

        if (userOne == null) {
            console.log('userOne not found')
            return res
                .status(404)
                .json({ msg: 'Could not find userOne'});
        }

        const userTwo = await User.findByIdAndUpdate(battle.userTwo, { $inc: { money : (battle.prizeMoney * -1), 'stats.losses' : 1, 'stats.elo' : (battle.eloExchanged * -1) } }, {new: true}, (err) => {
            if (err) {
                console.error(err.message);
                return res
                    .status(500)
                    .json({ msg: 'Failed to update userTwo'});
            }
        });

        if (userTwo == null) {
            console.log('userOne not found')
            return res
                .status(404)
                .json({ msg: 'Could not find userTwo'});
        }

    }
    else if (winner === 2){ // userTwo victory
        const userOne = await User.findByIdAndUpdate(battle.userOne, { $inc: { money : (battle.prizeMoney * -1), 'stats.losses' : 1, 'stats.elo' : (battle.eloExchanged * -1) } }, {new: true}, (err) => {
            if (err) {
                console.error(err.message);
                return res
                    .status(500)
                    .json({ msg: 'Failed to update userOne'});
            }
        });

        if (userOne == null) {
            console.log('userOne not found')
            return res
                .status(404)
                .json({ msg: 'Could not find userOne'});
        }

        const userTwo = await User.findByIdAndUpdate(battle.userTwo, { $inc: { money : battle.prizeMoney, 'stats.wins' : 1, 'stats.elo' : battle.eloExchanged } }, {new: true}, (err) => {
            if (err) {
                console.error(err.message);
                return res
                    .status(500)
                    .json({ msg: 'Failed to update userTwo'});
            }
        });

        if (userTwo == null) {
            console.log('userOne not found')
            return res
                .status(404)
                .json({ msg: 'Could not find userTwo'});
        }
    }
    else{ // Invalid victor
        console.error('Bad Request');
        return res
            .status(400)
            .json({ msg: 'Number not expected: please enter either 0 in the event of a tie, 1 in the event the challengee is the victor, or 2 in the event the challenger is the victor'});

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