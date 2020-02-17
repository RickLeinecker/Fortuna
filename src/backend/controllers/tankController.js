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
    await User.findById(req.user.id, 'favoriteTankId', function(err: Error, myUser: User){
        if(err){
            res.send(err);
            console.log('could not find user');
        } 
        res.send(myUser.favoriteTankId);
    });
}

exports.favoriteTank = async (req: $Request, res: $Response) => {
    await User.findOneAndUpdate( { _id: req.user.id }, {favoriteTankId : req.body.favoriteTankId}, {'new':true, 'useFindAndModify':false}, function(err: Error, result: User){
        if(err){
            res.send(err);
        }
        else{
            res.send(result.favoriteTankId);
        }
    });
}

exports.userTanks = async (req: $Request, res: $Response) => {
    await Tank.find({ userId: req.user.id }, function(err: Error, tanks: Tank){
        if(err){
            res.send(err);
        }
        else{
            res.send(tanks);
        }
    });
}

exports.assignTank = async (req: $Request, res: $Response) => {
    const tank = new Tank();
    tank.userId = req.user.id;
    tank.tankName = req.body.tankName;
    await tank.save();
    res.send(tank.id);
}

exports.tankTrade = async (req: $Request, res: $Response) => {
    await Tank.findOneAndUpdate({ _id: req.body.tankId}, {userId: req.user.id}, {'useFindAndModify':false}, function(err: Error, result: Tank){
        if(err){
            res.send(err);
        }
        else{
            res.send(result)
        }
    });
}

