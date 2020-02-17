// @flow strict

const jwt = require('jsonwebtoken');

const jwtSecret = 'change this at deployment';

  import type {
    $Request,
    $Response,
    NextFunction,
    Middleware,
  } from 'express';

// req: parsed as JSON
// res: JSON or error message
// next: JSON(?)
function auth (req: $Request, res: $Response, next: NextFunction){
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, jwtSecret);

        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports = auth;