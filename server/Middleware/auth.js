const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    try{
        const token = req.header('Authorization');
        const result = jwt.verify(token , process.env.JWT_SECRET_KEY);
        const user = await User.findById({_id:result.userId});
        req.user = user;
        next();
    }
    catch(err){console.log(err)}
}
module.exports = authenticate;