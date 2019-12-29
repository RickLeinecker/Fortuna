

const User = require('../../models/userModel');
const tank = require('../../models/tankModel');

exports.favoriteTank = (req, res) => {
    const favTank = User.findById(req.params.userId, 'favoriteTankId');
    res.json(favTank);
}