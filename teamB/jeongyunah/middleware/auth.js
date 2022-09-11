const jwt = require('jsonwebtoken');
const KEY = process.env.SECRETKEY;

const validateToken = async (req, res, next) => {
    try{
        const inputToken = req.headers.token;
        const decoded = await jwt.verify(inputToken, KEY);
        next();
    }
    catch(err){
        return res.status(400).json({ message: "Invalid Token" });
    }
}

module.exports = {validateToken}