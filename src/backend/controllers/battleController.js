// @flow strict

const { validationResult } = require('express-validator');

const User = require('../../models/userModel');
const BattleRecord = require('../../models/battleRecordModel');
const Tank = require('../../models/tankModel');

import type {
    $Request,
    $Response,
    NextFunction,
    Middleware,
  } from 'express';

/*exports.prepareMatch = async (req: $Request, res: $Response) => {

     // Contains errors for failed validation.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Return 400 for a bad request
        return res
            .status(400)
            .json({ errors: errors.array() });
    }
    const { challengeeId, challengerTankId, wager } = req.body;

    // Need to query to get their favorite tank of the challengee for the battle record 
    try{
        // Need to do query explicityly so that the returned doc isn't local to the try catch
        // Also we must use var here so that the doc can be used out of the scope of this block
        var challengeeTankId = await User.findById(challengeeId, 'favoriteTank');
    } catch{
        return res
            .status(404)
            .json( {msg: 'Coud not find user in the db'});
    }

    // Get the tank of the challengee to save for replays
    try{
        var challengeeTank = await Tank.findById(challengeeTankId);
    }catch{
        return res
                .status(404)
                .json( { msg: 'Could not find tank in the db'});
    }

    // Need to query to get the userId of the challenger and the tank document object
    try{
        var challengerTank = await Tank.findById(challengerTankId);
    }catch{
        return res
                .status(404)
                .json( {msg: 'Could not find tank in the db'});
    }

    const newRecord = new BattleRecord({
        userOne: challengeeId,
        userTwo: challengerTank.userId,
        tankOne: challengeeTank,
        tankTwo: challengerTank,
        prizeMoney: wager
    });

    try{
        await newRecord.save();
    }catch{
        return res
                .status(500)
                .json( {msg: 'Could not save battle record to the db'});
    }
}*/

exports.prepareMatch = async (req: $Request, res: $Response) => {

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

    const newRecord = new BattleRecord({
        userOne: challengeeId,
        userTwo: challengerTank.userId,
        tankOne: challengeeTank,
        tankTwo: challengerTank,
        prizeMoney: challengeeUserDoc.wager
    });

    await newRecord.save();

   }catch(err){
       return res
               .status(500)
               .json( {msg: 'Could not save battle record to the db'});
   }
}



exports.reportResults = async() => {

}