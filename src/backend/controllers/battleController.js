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

    if(!challengeeUserDoc){
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

    if(!challengeeTank){
        return res
            .status(404)
            .json({ msg: "Could not find the challengee's tank in DB"});
    }

    const challengerTank = await Tank.findById(challengerTankId);

    if(!challengerTank){
        return res
            .status(404)
            .json({ msg: "Could not find the challenger's Tank in DB"});
    }

    const challengerUserDoc = await User.findById(challengerTank.userId);

    if(!challengerUserDoc){
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



exports.reportResults = async (req: Request, res: Response) => {

    // Make sure we got necessary info from frontend
    const errors = validationResult(req);

   if (!errors.isEmpty()) {
       // Return 400 for a bad request
       return res
           .status(400)
           .json({ errors: errors.array() });
   }

    try{
        const battle = await findById(req.body.recordId);

        if (!battle) {
            return res
                .status(404)
                .json({ msg: 'Could not find record in DB'});
        }

        const userOne = await findById(battle.userOne);

        if (!userOne) {
            return res
                .status(404)
                .json({ msg: 'Could not find userOne in DB'});
        }

        const userTwo = await findById(battle.userTwo);

        if (!userTwo) {
            return res
            .status(404)
            .json({ msg: 'Could not find userTwo in DB'})
        }

        if (req.body.winner == 0) { // tie
            userOne.stats.ties++;
            userTwo.stats.ties++;
        }
        else if (req.body.winner == 1) { // User 1 victory
            // Increase wins, money, and elo of userOne for victory
            userOne.money += battle.prizeMoney;
            userOne.stats.elo += battle.eloExchanged;
            userOne.stats.wins++;

            // Decrease wins, money, and elo of userTwo for loss
            userTwo.money -= battle.prizeMoney;
            userTwo.stats.elo -= battle.eloExchanged;
            userTwo.stats.wins--;
        }
        else if (req.body.winner == 2) { // User 2 victory
            // Increase wins, money, and elo of userTwo for loss
            userTwo.money += battle.prizeMoney;
            userTwo.stats.elo += battle.eloExchanged;
            userTwo.stats.wins++;

            // Decrease wins, money, and elo of userOne for victory
            userOne.money -= battle.prizeMoney;
            userOne.stats.elo -= battle.eloExchanged;
            userOne.stats.wins--;
        }
        else {
            return res
                .status(400)
                .json({ msg: 'Number not expected: please enter either 0 in the event of a tie, 1 in the event the challengee is the victor, or 2 in the event the challenger is the victor'});
        }

        // save updated userOne, userTwo, and complete battleRecord

        await userOne.save((err: Error) => {
            if (err) {
                console.error(err.message);
                return res
                    .status(500)
                    .json({ msg: 'Unable to update userOne' });
            }
            else{
                console.log('userOne updated');
            }
        });

        await userTwo.save( (err: Error) => {
            if (err) {
                console.error(err.message);
                return res
                    .status(500)
                    .json({ msg: 'Unable to update userTwo' });
            }
            else{
                console.log('userTwo updated');
            }
        });

        await BattleRecord.findByIdAndUpdate(req.body.battleId, { winner: req.body.winner }, (err: Error, updatedRecord: BattleRecord) => {
            if (err) {
                console.error(err.message);
                return res
                    .status(500)
                    .json({ msg: 'Unable to update BattleRecord'});
            }
            else {
                console.log('BattleRecord successfully updated');
                return res
                    .status(200)
                    .send(updatedRecord, userOne, userTwo);
            }

        });

    } catch (err) {
        return res
            .status(500)
            .json({ msg: 'Server Error'});
    }

}