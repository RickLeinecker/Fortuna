// @flow strict

const user = require('../../models/userModel');
const tank = require('../../models/tankModel');

import type {
    $Request,
    $Response,
    NextFunction,
    Middleware,
  } from 'express';

exports.getFavorite = (req: $Request, res: $Response) => {
    user.findById(req.params.userId, 'favoriteTankId', function(err: Error, myUser: user){
        if(err){
            res.send(err);
            console.log('could not find user');
        } 
        res.send(myUser.favoriteTankId);
    });
    //res.sendStatus(200);
}

exports.favoriteTank = async (req: $Request, res: $Response) => {
    await user.findOneAndUpdate( { _id: req.params.userId }, {favoriteTankId : req.body.favoriteTankId}, {'new':true}, function(err: Error, result: user){
        if(err){
            res.send(err);
        }
        else{
            res.send(result.favoriteTankId);
        }
    });
}

exports.userTanks = async (req: $Request, res: $Response) => {
    await user.find({ userId: req.params.userId }, function(err: Error, tanks: user){
        if(err){
            res.send(err);
        }
        else{
            res.send(tanks);
        }
    });
}
