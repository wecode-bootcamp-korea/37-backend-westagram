const jwt = require('jsonwebtoken')

const validateToken = async (req, res, next) => {
   try {
    
    const token = req.header.authorization;
    return jwt.verify(token, secretKey);

   } catch (err) {
    next(err)
   }
}

module.exports = { validateToken }