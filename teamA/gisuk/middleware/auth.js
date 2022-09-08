const jwt = require("jsonwebtoken");
const KEY = process.env.KEY;

const validateToken = async (req, res, next) => {
    try {
        const userToken = req.header("token");
        if ( !userToken ) {
            return res.status(400).json({ message: "KEY_ERROR" })
        }
        const decoded = jwt.verify(userToken, KEY);
        const { user_id } = decoded;
        req.userId = user_id;
        return next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid Access Token" })
    }
}

module.exports = {
    validateToken
}