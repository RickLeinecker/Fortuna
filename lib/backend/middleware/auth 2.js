"use strict";

var jwt = require('jsonwebtoken');

// req: parsed as JSON
// res: JSON or error message
// next: JSON(?)
function auth(req, res, next) {
  // Get token from header
  var token = req.header('x-auth-token'); // Check if no token

  if (!token) {
    return res.status(401).json({
      msg: 'No token, authorization denied'
    });
  } // Verify token


  try {
    var decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not valid'
    });
  }
}

module.exports = auth;