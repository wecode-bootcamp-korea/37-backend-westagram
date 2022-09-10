const userService = require("../services/userService");

const signUp = async (req, res) => {

    const { name, email, profileImage, password } = req.body;

    if ( !name || !email || !profileImage || !password ) {
            return res.status(400).json({ message:"KEY_ERROR" });
    }

    await userService.signUp( name, email, profileImage, password );

    res.status(201).json({ message:"SIGNUP_SUCCESS" });
};

module.exports = {
    signUp
}