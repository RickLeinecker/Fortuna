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
    user.findById(req.params.userId, 'favoriteTankId', function(err, myUser){
        if(err){
            res.send(err);
            console.log('could not find user');
        } 
        res.send(myUser.favoriteTankId);
    });
    //res.sendStatus(200);
}

exports.favoriteTank = async (req: $Request, res: $Response) => {
    const favoriteTankId = req.body;
    await user.findOneAndUpdate( { _id: req.params.userId }, {favoriteTankId : favoriteTankId}, function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result.favoriteTankId);
        }
    });
}
//asdfasdf
exports.userTanks = async (req: $Request, res: $Response) => {
    await user.find({ userId: req.params.userId }, function(err, tanks){
        if(err){
            res.send(err);
        }
        else{
            res.send(tanks);
        }
    });
}

/*exports.assignTank = (req: $Request, res: $Response) => {

}*/