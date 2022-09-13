const jwt = require("jsonwebtoken");
const KEY = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
    try {
        const userToken = req.header("token");
        if ( !userToken ) {
            return res.status(400).json({ message: "KEY_ERROR" })
        }
        const decoded = jwt.verify(userToken, KEY);
        const { sub } = decoded;
        req.userId = sub;
        return next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid Access Token" })
    }
}

module.exports = {
    validateToken
}