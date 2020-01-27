// @flow strict

const User = require('../../models/userModel');
const Tank = require('../../models/tankModel');

import type {
    $Request,
    $Response,
    NextFunction,
    Middleware,
  } from 'express';

exports.getFavorite = async (req: $Request, res: $Response) => {
    await User.findById(req.params.userId, 'favoriteTankId', function(err: Error, myUser: user){
        if(err){
            res.send(err);
            console.log('could not find user');
        } 
        res.send(myUser.favoriteTankId);
    });
}

exports.favoriteTank = async (req: $Request, res: $Response) => {
    const favoriteTankId = req.body;
    await User.findOneAndUpdate( { _id: req.params.userId }, {favoriteTankId : favoriteTankId}, function(err: Error, result: user){
        if(err){
            res.send(err);
        }
        else{
            res.send(result.favoriteTankId);
        }
    });
}

exports.userTanks = async (req: $Request, res: $Response) => {
    await Tank.find({ userId: req.params.userId }, function(err: Error, tanks: user){
        if(err){
            res.send(err);
        }
        else{
            res.send(tanks);
        }
    });
}

//exports.giveTank = async (req: $Request, res: $Response) => {

//}
//exports.takeTank
//exports.giveComponent