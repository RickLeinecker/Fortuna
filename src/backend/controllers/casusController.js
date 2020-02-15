

const user = require('../../models/userModel');

import type {
    $Request,
    $Response,
    NextFunction,
    Middleware,
  } from 'express';

exports.update = async (req: $Request, res: $Response) => {

    switch(req.body.block){
        case 'andBlocks':
            await user.findByIdAndUpdate(req.params.userId, { 'casusInventory.andBlocks': req.body.value }, {'useFindAndModify':false, 'new':true}, function(err, updatedUser){
                if(err)
                    res.send(err);
                //res.send(req.body.value);
                res.send(updatedUser);
            });
            break;
        case 'forBlocks':
            await user.findByIdAndUpdate(req.params.userId, { 'casusInventory.forBlocks': req.body.value }, {'useFindAndModify':false, 'new':true}, function(err, updatedUser){
                if(err)
                    res.send(err);
                
                res.send(updatedUser);
            });
            break;
        case 'ifBlocks':
            await user.findByIdAndUpdate(req.params.userId, { 'casusInventory.ifBlocks': req.body.value }, {'useFindAndModify':false, 'new':true}, function(err, updatedUser){
                if(err)
                    res.send(err);
                
                res.send(updatedUser);
            });
            break;
        case 'ifElseBlocks':
            await user.findByIdAndUpdate(req.params.userId, { 'casusInventory.ifElseBlocks': req.body.value }, {'useFindAndModify':false, 'new':true}, function(err, updatedUser){
                if(err)
                    res.send(err);
                
                res.send(updatedUser);
            });
            break;
        case 'intEqualsBlocks':
            await user.findByIdAndUpdate(req.params.userId, { 'casusInventory.intEqualsBlocks': req.body.value }, {'useFindAndModify':false, 'new':true}, function(err, updatedUser){
                if(err)
                    res.send(err);
                
                res.send(updatedUser);
            });
            break;
        case 'intGreaterThanBlocks':
            await user.findByIdAndUpdate(req.params.userId, { 'casusInventory.intGreaterThanBlocks': req.body.value }, {'useFindAndModify':false, 'new':true}, function(err, updatedUser){
                if(err)
                    res.send(err);
                
                res.send(updatedUser);
            });
            break;
        case 'intLessThanBlocks':
            await user.findByIdAndUpdate(req.params.userId, { 'casusInventory.intLessThanBlocks': req.body.value }, {'useFindAndModify':false, 'new':true}, function(err, updatedUser){
                if(err)
                    res.send(err);
                
                res.send(updatedUser);
            });
            break;
        case 'orBlocks':
            await user.findByIdAndUpdate(req.params.userId, { 'casusInventory.orBlocks': req.body.value }, {'useFindAndModify':false, 'new':true}, function(err, updatedUser){
                if(err)
                    res.send(err);
                
                res.send(updatedUser);
            });
            break;
        case 'setVariableBlocks':
            await user.findByIdAndUpdate(req.params.userId, { 'casusInventory.setVariableBlocks': req.body.value }, {'useFindAndModify':false, 'new':true}, function(err, updatedUser){
                if(err)
                    res.send(err);
                
                res.send(updatedUser);
            });
            break;
        case 'variableBlocks':
            await user.findByIdAndUpdate(req.params.userId, { 'casusInventory.variableBlocks': req.body.value }, {'useFindAndModify':false, 'new':true}, function(err, updatedUser){
                if(err)
                    res.send(err);
                
                res.send(updatedUser);
            });
            break;
        case 'whileBlocks':
            await user.findByIdAndUpdate(req.params.userId, { 'casusInventory.whileBlocks': req.body.value }, {'useFindAndModify':false, 'new':true}, function(err, updatedUser){
                if(err)
                    res.send(err);
                
                res.send(updatedUser);
            });
            break;
    }
}
