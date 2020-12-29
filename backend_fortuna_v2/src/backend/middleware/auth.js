// @flow strict

const jwt = require('jsonwebtoken');

const User = require('../../models/userModel');

const jwtSecret = process.env.JWT_SECRET;

import type {
	Request,
	Response,
	NextFunction,
} from 'express';

// req: parsed as JSON
// res: JSON or error message
// next: JSON(?)
async function auth (req: Request, res: Response, next: NextFunction){
	// Get token from header
	const token = req.header('x-auth-token');

	// Check if no token
	if(!token) {
		return res
			.status(401)
			.json({ msg: 'No token, authorization denied' });
	}

	// Verify token
	try {
		const decoded = jwt.verify(token, jwtSecret);

		const thisUser = await User.findById(decoded.user.id, 'lastLogin');
		if	(thisUser == null)
		{
			console.log('Could not find user in DB');
			return res
				.status(404)
				.json({ msg: 'Could not find user'});
		}
		else if	(decoded.user.issued < thisUser.lastLogin)	{
			console.log('Cant sign into two places at once!');
			return res
				.status(400)
				.json({ msg: 'Token is not valid'});
		}
		req.user = decoded.user;
		next();
	} catch(err) {
		return res
			.status(401)
			.json({ msg: 'Token is not valid' });
	}
}

module.exports = auth;
