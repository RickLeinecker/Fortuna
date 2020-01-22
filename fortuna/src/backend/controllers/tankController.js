// @flow strict

const user = require('../../models/userModel');
const tank = require('../../models/tankModel');

import type {
    $Request,
    $Response,
    NextFunction,
    Middleware,
  } from 'express';

exports.favoriteTank = (req: $Request, res: $Response) => {
    user.findById(req.params.userId, 'email', function(err, myUser){
        if(err) console.log('could not find user');
        console.log(myUser.favoriteTankId);
    });
    res.sendStatus(200);
}