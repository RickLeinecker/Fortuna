// @flow strict

const User = require('../../models/userModel');
const Tank = require('../../models/tankModel');

const { validationResult } = require('express-validator');

// Flow type import
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
        else
            res.send(myUser.favoriteTankId);
    });
}

exports.favoriteTank = async (req: $Request, res: $Response) => {
    // the 'new' option means return the document after it has been updated
    // the 'useFindAndModify' is just so it doesnt throw a deprecation warning
    await User.findOneAndUpdate( { _id: req.user.id }, {favoriteTankId : req.body.favoriteTankId}, {'new':true, 'useFindAndModify':false}, function(err: Error, result: User){
        if(err){
            res.status(500).send(err);
            console.error(err);
        }
        else{
            res.send(result.favoriteTankId);
        }
    });
}

exports.userTanks = async (req: $Request, res: $Response) => {
    await Tank.find({ userId: req.user.id }, function(err: Error, tanks: Array<Tank>){
        if(err){
            res.send(err);
            console.error(err.message);
        }
        else{
            res.send(tanks);
            console.log('Success!');
        }
    });
}

exports.assignTank = async (req: $Request, res: $Response) => {
    const tank = new Tank();
    tank.userId = req.user.id;
    tank.tankName = req.body.tankName;
    await tank.save();
    res.status(201).send(tank);
}

exports.tankUpdate = async (req: $Request, res: $Response) => {

    // Check if all the fields are input correctly from the frontend
    const errors = validationResult(req);

    if(!errors.isEmpty()){
            // 400 is a bad request
            return res
                .status(400)
                .json({ errors: errors.array() });
    }

    await Tank.findById(req.params.tankId, function (err, tank) {
        if (err){
            console.error(err.message);
            res.send(err);
        }
        // Update all fields of the tank
        tank.tankName = req.body.tankName;
        tank.userId = req.body.userId;
        tank.components = req.body.components;
        tank.casusCode = req.body.casusCode;
        tank.isBot = req.body.isBot;
        tank.save();
        res.status(200).send(tank);
      });
}
