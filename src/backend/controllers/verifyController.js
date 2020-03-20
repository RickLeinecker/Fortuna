const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;


exports.verify = async (req, res) => {
    const token = req.header('x-auth-token');
    if(!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try{
        jwt.verify(token, jwtSecret);
        res.status(200).json({ msg: 'Token valid!'});
    }catch(err){
        res.status(401).json({ msg: 'Token is not valid' });
    }
    
}