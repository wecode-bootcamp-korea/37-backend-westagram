const userService = require("../services/userService");

const signUp = async (req, res) => {
    try {
        const { name, email, profileImage, password } = req.body;

        if ( !name || !email || !profileImage || !password ) {
            return res.status(400).json({ message:"KEY_ERROR" });
        }

        await userService.signUp( name, email, profileImage, password );

        res.status(201).json({ message:"SIGNUP_SUCCESS" });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message:err.message });
    }
};

module.exports = {
    signUp
}